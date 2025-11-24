import mongoose from 'mongoose';
import Food from '../models/Food.js';
import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';

// Get all foods
export const getAllFoods = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      category = '', 
      restaurant = '',
      isHealthy = '',
      clerkUserId = '' // Optional: for preference-based filtering
    } = req.query;
    
    let query = { isActive: true };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    if (restaurant) {
      query.restaurant = restaurant;
    }
    
    if (isHealthy !== '') {
      query.isHealthy = isHealthy === 'true';
    }

    // Apply user preferences if userId is provided
    if (clerkUserId) {
      const user = await User.findOne({ clerkUserId });
      
      if (user && user.hasCompletedPreferences && user.preferences) {
        const { preferences } = user;
        
        // Filter by allergies
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
            'spicy': ['mild', 'medium', 'spicy']
          };
          
          const allowedLevels = spiceLevels[preferences.spiceLevel] || ['mild', 'medium', 'spicy'];
          query.spiceLevel = { $in: allowedLevels };
        }

        // Prioritize healthy foods if user is health conscious
        if (preferences.healthConscious) {
          query.isHealthy = true;
        }
      }
    }

    const foods = await Food.find(query)
      .populate('restaurant', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Food.countDocuments(query);

    res.status(200).json({
      foods,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get foods error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get food by ID
export const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id).populate('restaurant', 'name');
    
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json(food);
  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create food item
export const createFood = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      isHealthy,
      category,
      restaurant,
      ingredients,
      allergens,
      nutritionalInfo,
      spiceLevel,
      // Recipe fields
      prepTime,
      cookTime,
      servings,
      difficulty,
      instructions,
      tips,
      cuisine
    } = req.body;

    if (!name || !description || !price || !image || !category || !restaurant) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate restaurant ID format
    if (!mongoose.Types.ObjectId.isValid(restaurant)) {
      return res.status(400).json({ message: 'Invalid restaurant ID' });
    }

    // Verify restaurant exists
    const restaurantDoc = await Restaurant.findById(restaurant);
    if (!restaurantDoc) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const food = new Food({
      name,
      description,
      price,
      image,
      isHealthy: isHealthy || false,
      category,
      restaurant,
      restaurantName: restaurantDoc.name,
      ingredients: ingredients || [],
      allergens: allergens || [],
      nutritionalInfo: nutritionalInfo || {},
      spiceLevel: spiceLevel || 'medium',
      // Recipe fields
      prepTime: prepTime || '15 mins',
      cookTime: cookTime || '30 mins',
      servings: servings || 2,
      difficulty: difficulty || 'Medium',
      instructions: instructions || [],
      tips: tips || [],
      cuisine: cuisine || 'Indian'
    });

    await food.save();
    
    res.status(201).json({
      message: 'Food item created successfully',
      food
    });
  } catch (error) {
    console.error('Create food error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update food item
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If restaurant is being updated, get the restaurant name
    if (updates.restaurant) {
      const restaurant = await Restaurant.findById(updates.restaurant);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      updates.restaurantName = restaurant.name;
    }

    const food = await Food.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('restaurant', 'name');

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({
      message: 'Food item updated successfully',
      food
    });
  } catch (error) {
    console.error('Update food error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete food item
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete - set isActive to false
    const food = await Food.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({
      message: 'Food item deleted successfully'
    });
  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get food categories
export const getFoodCategories = async (req, res) => {
  try {
    const categories = await Food.distinct('category', { isActive: true });
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};