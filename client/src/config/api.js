// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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
    get: (userId) => `${API_BASE_URL}/api/cart/${userId}`,
    add: (userId) => `${API_BASE_URL}/api/cart/${userId}`,
    update: (userId, itemId) => `${API_BASE_URL}/api/cart/${userId}/${itemId}`,
    remove: (userId, itemId) => `${API_BASE_URL}/api/cart/${userId}/${itemId}`,
    clear: (userId) => `${API_BASE_URL}/api/cart/${userId}`,
  },
  
  // Order endpoints
  orders: {
    create: (userId) => `${API_BASE_URL}/api/orders/${userId}`,
    getHistory: (userId) => `${API_BASE_URL}/api/orders/${userId}`,
    getDetails: (userId, orderId) => `${API_BASE_URL}/api/orders/${userId}/${orderId}`,
  },
  
  // User endpoints
  user: {
    create: () => `${API_BASE_URL}/api/user`,
    get: (userId) => `${API_BASE_URL}/api/user/${userId}`,
    update: (userId) => `${API_BASE_URL}/api/user/${userId}`,
  },

  // Admin endpoints
  admin: {
    login: () => `${API_BASE_URL}/api/admin/login`,
    verify: () => `${API_BASE_URL}/api/admin/verify`,
    dashboard: () => `${API_BASE_URL}/api/admin/dashboard`,
    orders: () => `${API_BASE_URL}/api/admin/orders`,
    users: () => `${API_BASE_URL}/api/admin/users`,
    updateOrderStatus: (orderId) => `${API_BASE_URL}/api/admin/orders/${orderId}/status`,
    updateUserStatus: (userId) => `${API_BASE_URL}/api/admin/users/${userId}/status`,
    deleteUser: (userId) => `${API_BASE_URL}/api/admin/users/${userId}`,
  },

  // Restaurant endpoints
  restaurants: {
    getAll: () => `${API_BASE_URL}/api/restaurants`,
    getById: (id) => `${API_BASE_URL}/api/restaurants/${id}`,
    create: () => `${API_BASE_URL}/api/restaurants`,
    update: (id) => `${API_BASE_URL}/api/restaurants/${id}`,
    delete: (id) => `${API_BASE_URL}/api/restaurants/${id}`,
    getMenu: (id) => `${API_BASE_URL}/api/restaurants/${id}/menu`,
  },

  // Food endpoints
  foods: {
    getAll: () => `${API_BASE_URL}/api/foods`,
    getById: (id) => `${API_BASE_URL}/api/foods/${id}`,
    create: () => `${API_BASE_URL}/api/foods`,
    update: (id) => `${API_BASE_URL}/api/foods/${id}`,
    delete: (id) => `${API_BASE_URL}/api/foods/${id}`,
    getCategories: () => `${API_BASE_URL}/api/foods/categories`,
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
