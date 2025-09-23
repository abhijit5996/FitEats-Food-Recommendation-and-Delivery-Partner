import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantMenu
} from '../controllers/restaurantController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/menu', getRestaurantMenu);

// Protected admin routes
router.post('/', adminAuth, createRestaurant);
router.put('/:id', adminAuth, updateRestaurant);
router.delete('/:id', adminAuth, deleteRestaurant);

export default router;