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
