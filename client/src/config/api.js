// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// API endpoints
export const endpoints = {
  // Cart endpoints
  cart: {
    get: (userId) => `${API_BASE_URL}/cart/${userId}`,
    add: (userId) => `${API_BASE_URL}/cart/${userId}`,
    update: (userId, itemId) => `${API_BASE_URL}/cart/${userId}/${itemId}`,
    remove: (userId, itemId) => `${API_BASE_URL}/cart/${userId}/${itemId}`,
    clear: (userId) => `${API_BASE_URL}/cart/${userId}`,
  },
  
  // Order endpoints
  orders: {
    create: (userId) => `${API_BASE_URL}/orders/${userId}`,
    getHistory: (userId) => `${API_BASE_URL}/orders/${userId}`,
    getDetails: (userId, orderId) => `${API_BASE_URL}/orders/${userId}/${orderId}`,
  },
  
  // User endpoints
  user: {
    create: () => `${API_BASE_URL}/user`,
    get: (userId) => `${API_BASE_URL}/user/${userId}`,
    update: (userId) => `${API_BASE_URL}/user/${userId}`,
  },

  // Admin endpoints
  admin: {
    login: () => `${API_BASE_URL}/admin/login`,
    verify: () => `${API_BASE_URL}/admin/verify`,
    dashboard: () => `${API_BASE_URL}/admin/dashboard`,
    orders: () => `${API_BASE_URL}/admin/orders`,
    users: () => `${API_BASE_URL}/admin/users`,
    updateOrderStatus: (orderId) => `${API_BASE_URL}/admin/orders/${orderId}/status`,
    updateUserStatus: (userId) => `${API_BASE_URL}/admin/users/${userId}/status`,
    deleteUser: (userId) => `${API_BASE_URL}/admin/users/${userId}`,
  },

  // Restaurant endpoints
  restaurants: {
    getAll: () => `${API_BASE_URL}/restaurants`,
    getById: (id) => `${API_BASE_URL}/restaurants/${id}`,
    create: () => `${API_BASE_URL}/restaurants`,
    update: (id) => `${API_BASE_URL}/restaurants/${id}`,
    delete: (id) => `${API_BASE_URL}/restaurants/${id}`,
    getMenu: (id) => `${API_BASE_URL}/restaurants/${id}/menu`,
  },

  // Food endpoints
  foods: {
    getAll: () => `${API_BASE_URL}/foods`,
    getById: (id) => `${API_BASE_URL}/foods/${id}`,
    create: () => `${API_BASE_URL}/foods`,
    update: (id) => `${API_BASE_URL}/foods/${id}`,
    delete: (id) => `${API_BASE_URL}/foods/${id}`,
    getCategories: () => `${API_BASE_URL}/foods/categories`,
  },
};

// Helper function to make API requests
export const apiRequest = async (url, options = {}) => {
  const config = {
    ...apiConfig,
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
