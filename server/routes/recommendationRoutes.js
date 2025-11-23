import express from 'express';
import {
  getPersonalizedFoods,
  getPersonalizedRestaurants,
  getRecommendationSummary
} from '../controllers/recommendationController.js';

const router = express.Router();

// Get personalized food recommendations
router.get('/foods/:clerkUserId', getPersonalizedFoods);

// Get personalized restaurant recommendations
router.get('/restaurants/:clerkUserId', getPersonalizedRestaurants);

// Get recommendation summary
router.get('/summary/:clerkUserId', getRecommendationSummary);

export default router;
