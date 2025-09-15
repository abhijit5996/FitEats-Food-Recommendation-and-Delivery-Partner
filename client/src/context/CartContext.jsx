// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';
import { endpoints, apiRequest } from '../config/api';
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
  clearLocalStorageCart,
  addItemToLocalStorageCart,
  updateItemQuantityInLocalStorage,
  removeItemFromLocalStorageCart
} from '../utils/cartUtils';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isLoading: true,
  orders: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'LOAD_CART': {
      const cart = action.payload || {};
      return {
        ...state,
        items: cart.items || [],
        totalItems: cart.totalItems || 0,
        totalAmount: cart.totalAmount || 0,
        isLoading: false,
      };
    }

    case 'ADD_ITEM': {
      const updatedItems = [...state.items];
      const existing = updatedItems.find(item => item.id === action.payload.id);

      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        updatedItems.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalAmount: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalAmount: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalAmount: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], totalItems: 0, totalAmount: 0 };

    case 'LOAD_ORDERS':
      return { ...state, orders: action.payload || [] };

    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isLoaded } = useUser();

  // Load cart from backend when user logs in, or localStorage when guest
  useEffect(() => {
    const loadCart = async () => {
      if (!isLoaded) return;

      if (user) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          const cartData = await apiRequest(endpoints.cart.get(user.id), {
            credentials: 'include',
          });

          dispatch({
            type: 'LOAD_CART',
            payload: cartData ?? { items: [], totalItems: 0, totalAmount: 0 },
          });
        } catch (error) {
          console.error('Error loading cart from backend:', error);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        const savedCart = getCartFromLocalStorage() ?? {
          items: [],
          totalItems: 0,
          totalAmount: 0,
        };

        dispatch({ type: 'LOAD_CART', payload: savedCart });

        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
          try {
            const parsedOrders = JSON.parse(savedOrders);
            dispatch({ type: 'LOAD_ORDERS', payload: parsedOrders });
          } catch (error) {
            console.error('Failed to parse orders from localStorage:', error);
          }
        }

        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadCart();
  }, [user, isLoaded]);

  // Sync cart to backend when logged in
  useEffect(() => {
    const syncCartToBackend = async () => {
      if (!user || state.isLoading) return;

      try {
        await apiRequest(endpoints.cart.get(user.id), {
          credentials: 'include',
        });
      } catch (error) {
        // If no backend cart, sync local items
        for (const item of state.items) {
          await apiRequest(endpoints.cart.add(user.id), {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(item),
          });
        }
      }
    };

    if (!state.isLoading && user) {
      syncCartToBackend();
    }
  }, [state.items, user, state.isLoading]);

  // Save to localStorage when guest
  useEffect(() => {
    if (!user && !state.isLoading) {
      saveCartToLocalStorage({
        items: state.items,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
      });

      if (state.orders.length > 0) {
        localStorage.setItem('orders', JSON.stringify(state.orders));
      }
    }
  }, [state.items, state.totalItems, state.totalAmount, state.orders, user, state.isLoading]);

  // Cart actions
  const addItem = async (item) => {
    if (user) {
      try {
        await apiRequest(endpoints.cart.add(user.id), {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(item),
        });

        dispatch({ type: 'ADD_ITEM', payload: item });
        toast.success(`${item.name} added to cart successfully!`);
      } catch (error) {
        console.error('Error adding item to cart:', error);
        toast.error(error.message || 'Failed to add item to cart');
      }
    } else {
      const updatedCart = addItemToLocalStorageCart(item);
      dispatch({ type: 'LOAD_CART', payload: updatedCart });
      toast.success(`${item.name} added to cart successfully!`);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (user) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    } else {
      const updatedCart = updateItemQuantityInLocalStorage(id, quantity);
      dispatch({ type: 'LOAD_CART', payload: updatedCart });
    }
  };

  const removeItem = async (id) => {
    if (user) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      const updatedCart = removeItemFromLocalStorageCart(id);
      dispatch({ type: 'LOAD_CART', payload: updatedCart });
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await apiRequest(endpoints.cart.clear(user.id), {
          method: 'DELETE',
          credentials: 'include',
        });
      } catch (error) {
        console.error('Error clearing cart from backend:', error);
      }
    } else {
      clearLocalStorageCart();
    }

    dispatch({ type: 'CLEAR_CART' });
  };

  const placeOrder = async (orderDetails = {}) => {
    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...state.items],
      totalAmount: state.totalAmount,
      status: 'pending',
      ...orderDetails,
    };

    dispatch({ type: 'ADD_ORDER', payload: order });
    await clearCart();
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
