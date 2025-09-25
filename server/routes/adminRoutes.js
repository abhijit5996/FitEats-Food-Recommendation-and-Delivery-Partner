import express from 'express';
import {
  adminLogin,
  verifyAdminToken,
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUserStatus,
  deleteUser
} from '../controllers/adminController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Admin authentication routes
router.post('/login', adminLogin);
router.get('/verify', verifyAdminToken);

// Protected admin routes
router.get('/dashboard', adminAuth, getDashboardStats);

// Orders management routes
router.get('/orders', adminAuth, getAllOrders);
router.put('/orders/:orderId/status', adminAuth, updateOrderStatus);

// Users management routes
router.get('/users', adminAuth, getAllUsers);
router.put('/users/:userId/status', adminAuth, updateUserStatus);
router.delete('/users/:userId', adminAuth, deleteUser);

export default router;