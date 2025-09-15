// src/utils/cartUtils.js
export const getCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { items: [], totalItems: 0, totalAmount: 0 };
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return { items: [], totalItems: 0, totalAmount: 0 };
  }
};

export const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const clearLocalStorageCart = () => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error);
  }
};

export const addItemToLocalStorageCart = (item) => {
  const cart = getCartFromLocalStorage();
  
  const existingItemIndex = cart.items.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex > -1) {
    // Item exists, update quantity
    cart.items[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item
    cart.items.push(item);
  }
  
  cart.totalItems += item.quantity;
  cart.totalAmount += item.price * item.quantity;
  
  saveCartToLocalStorage(cart);
  return cart;
};

export const updateItemQuantityInLocalStorage = (id, quantity) => {
  const cart = getCartFromLocalStorage();
  const itemIndex = cart.items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) return cart;
  
  const item = cart.items[itemIndex];
  const quantityDifference = quantity - item.quantity;
  
  cart.items[itemIndex].quantity = quantity;
  cart.totalItems += quantityDifference;
  cart.totalAmount += item.price * quantityDifference;
  
  saveCartToLocalStorage(cart);
  return cart;
};

export const removeItemFromLocalStorageCart = (id) => {
  const cart = getCartFromLocalStorage();
  const itemIndex = cart.items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) return cart;
  
  const item = cart.items[itemIndex];
  cart.items.splice(itemIndex, 1);
  cart.totalItems -= item.quantity;
  cart.totalAmount -= item.price * item.quantity;
  
  saveCartToLocalStorage(cart);
  return cart;
};