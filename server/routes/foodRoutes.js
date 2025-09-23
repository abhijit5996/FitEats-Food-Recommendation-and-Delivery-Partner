import express from 'express';
import {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  getFoodCategories
} from '../controllers/foodController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getAllFoods);
router.get('/categories', getFoodCategories);
router.get('/:id', getFoodById);

// Protected admin routes
router.post('/', adminAuth, createFood);
router.put('/:id', adminAuth, updateFood);
router.delete('/:id', adminAuth, deleteFood);

export default router;