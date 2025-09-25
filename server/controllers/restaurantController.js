import Restaurant from '../models/Restaurant.js';
import Food from '../models/Food.js';

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
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
      restaurants,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json({ restaurant });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create restaurant
export const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      image,
      location,
      deliveryTime,
      distance,
      cuisines,
      isHealthFocused
    } = req.body;

    if (!name || !image || !location || !deliveryTime || !distance || !cuisines) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const restaurant = new Restaurant({
      name,
      image,
      location,
      deliveryTime,
      distance,
      cuisines,
      isHealthFocused: isHealthFocused || false
    });

    await restaurant.save();
    
    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant
    });
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update restaurant
export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json({
      message: 'Restaurant updated successfully',
      restaurant
    });
  } catch (error) {
    console.error('Update restaurant error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete - set isActive to false
    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Also deactivate all foods from this restaurant
    await Food.updateMany(
      { restaurant: id },
      { isActive: false }
    );

    res.status(200).json({
      message: 'Restaurant deleted successfully'
    });
  } catch (error) {
    console.error('Delete restaurant error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get restaurant menu
export const getRestaurantMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const foods = await Food.find({ restaurant: id, isActive: true })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Food.countDocuments({ restaurant: id, isActive: true });

    res.status(200).json({
      restaurant,
      foods,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get restaurant menu error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};