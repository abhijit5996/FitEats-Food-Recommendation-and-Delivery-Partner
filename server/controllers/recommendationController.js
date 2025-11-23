import Food from '../models/Food.js';
import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';

/**
 * Get personalized food recommendations based on user preferences
 */
export const getPersonalizedFoods = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    const { page = 1, limit = 20, category = '' } = req.query;

    // Get user preferences
    const user = await User.findOne({ clerkUserId });
    
    if (!user || !user.hasCompletedPreferences) {
      // If no preferences, return all active foods
      return getAllFoodsWithoutPreferences(req, res);
    }

    const { preferences } = user;
    
    // Build query based on preferences
    let query = { isActive: true };
    
    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Apply dietary restrictions
    if (preferences.dietaryRestrictions && preferences.dietaryRestrictions.length > 0) {
      const restrictions = preferences.dietaryRestrictions.map(r => r.toLowerCase());
      
      // Add logic to filter foods based on dietary restrictions
      if (restrictions.includes('vegetarian')) {
        query.$or = [
          { category: { $regex: 'vegetarian', $options: 'i' } },
          { name: { $regex: 'veg', $options: 'i' } }
        ];
      }
      
      if (restrictions.includes('vegan')) {
        query.$or = [
          { category: { $regex: 'vegan', $options: 'i' } },
          { name: { $regex: 'vegan', $options: 'i' } }
        ];
      }
    }

    // Filter by allergies (exclude foods with allergens)
    if (preferences.allergies && preferences.allergies.length > 0) {
      query.allergens = { 
        $not: { 
          $elemMatch: { 
            $in: preferences.allergies.map(a => new RegExp(a, 'i'))
          }
        }
      };
    }

    // Filter by spice level
    if (preferences.spiceLevel) {
      const spiceLevels = {
        'mild': ['mild'],
        'medium': ['mild', 'medium'],
        'spicy': ['mild', 'medium', 'spicy'],
        'hot': ['mild', 'medium', 'spicy'],
        'very-hot': ['mild', 'medium', 'spicy']
      };
      
      const allowedLevels = spiceLevels[preferences.spiceLevel] || ['mild', 'medium', 'spicy'];
      query.spiceLevel = { $in: allowedLevels };
    }

    // Prioritize healthy foods if user is health conscious
    if (preferences.healthConscious) {
      query.isHealthy = true;
    }

    // Get foods
    const foods = await Food.find(query)
      .populate('restaurant', 'name cuisines isHealthFocused')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1, createdAt: -1 });

    const total = await Food.countDocuments(query);

    // Filter by cuisine preferences at the restaurant level
    let filteredFoods = foods;
    if (preferences.cuisinePreferences && preferences.cuisinePreferences.length > 0) {
      filteredFoods = foods.filter(food => {
        if (!food.restaurant || !food.restaurant.cuisines) return true;
        
        const restaurantCuisines = food.restaurant.cuisines.map(c => c.toLowerCase());
        const userCuisines = preferences.cuisinePreferences.map(c => c.toLowerCase());
        
        return restaurantCuisines.some(rc => 
          userCuisines.some(uc => rc.includes(uc) || uc.includes(rc))
        );
      });
    }

    res.status(200).json({
      success: true,
      foods: filteredFoods,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
      personalized: true,
      message: 'Showing foods based on your preferences'
    });
  } catch (error) {
    console.error('Get personalized foods error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

/**
 * Get personalized restaurant recommendations based on user preferences
 */
export const getPersonalizedRestaurants = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    const { page = 1, limit = 10, search = '' } = req.query;

    // Get user preferences
    const user = await User.findOne({ clerkUserId });
    
    if (!user || !user.hasCompletedPreferences) {
      // If no preferences, return all active restaurants
      return getAllRestaurantsWithoutPreferences(req, res);
    }

    const { preferences } = user;
    
    // Build query based on preferences
    let query = { isActive: true };
    
    // Apply search if provided
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Get all restaurants first
    const restaurants = await Restaurant.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1, createdAt: -1 });

    // Filter restaurants based on cuisine preferences
    let filteredRestaurants = restaurants;
    if (preferences.cuisinePreferences && preferences.cuisinePreferences.length > 0) {
      filteredRestaurants = restaurants.filter(restaurant => {
        if (!restaurant.cuisines || restaurant.cuisines.length === 0) return false;
        
        const restaurantCuisines = restaurant.cuisines.map(c => c.toLowerCase());
        const userCuisines = preferences.cuisinePreferences.map(c => c.toLowerCase());
        
        return restaurantCuisines.some(rc => 
          userCuisines.some(uc => rc.includes(uc) || uc.includes(rc))
        );
      });
    }

    // Prioritize health-focused restaurants if user is health conscious
    if (preferences.healthConscious) {
      filteredRestaurants = filteredRestaurants.sort((a, b) => {
        if (a.isHealthFocused && !b.isHealthFocused) return -1;
        if (!a.isHealthFocused && b.isHealthFocused) return 1;
        return b.rating - a.rating;
      });
    }

    const total = await Restaurant.countDocuments(query);

    res.status(200).json({
      success: true,
      restaurants: filteredRestaurants,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
      personalized: true,
      message: 'Showing restaurants based on your preferences'
    });
  } catch (error) {
    console.error('Get personalized restaurants error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

/**
 * Helper function to get all foods without preferences
 */
const getAllFoodsWithoutPreferences = async (req, res) => {
  try {
    const { page = 1, limit = 20, category = '' } = req.query;
    
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }

    const foods = await Food.find(query)
      .populate('restaurant', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Food.countDocuments(query);

    res.status(200).json({
      success: true,
      foods,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
      personalized: false,
      message: 'Showing all foods'
    });
  } catch (error) {
    console.error('Get all foods error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

/**
 * Helper function to get all restaurants without preferences
 */
const getAllRestaurantsWithoutPreferences = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    const query = search 
      ? { name: { $regex: search, $options: 'i' }, isActive: true }
      : { isActive: true };

    const restaurants = await Restaurant.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Restaurant.countDocuments(query);

    res.status(200).json({
      success: true,
      restaurants,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
      personalized: false,
      message: 'Showing all restaurants'
    });
  } catch (error) {
    console.error('Get all restaurants error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

/**
 * Get recommendation summary for a user
 */
export const getRecommendationSummary = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    // Get user preferences
    const user = await User.findOne({ clerkUserId });
    
    if (!user || !user.hasCompletedPreferences) {
      return res.status(200).json({
        success: true,
        hasPreferences: false,
        message: 'User has not completed preferences'
      });
    }

    const { preferences } = user;

    // Count matching restaurants
    const restaurantCount = await Restaurant.countDocuments({ isActive: true });

    // Count matching foods (basic count, can be refined)
    const foodCount = await Food.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      hasPreferences: true,
      preferences,
      stats: {
        totalRestaurants: restaurantCount,
        totalFoods: foodCount
      },
      message: 'Recommendations are personalized based on your preferences'
    });
  } catch (error) {
    console.error('Get recommendation summary error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};
