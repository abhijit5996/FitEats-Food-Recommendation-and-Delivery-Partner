import User from '../models/User.js';

// Create or get user
export const createOrGetUser = async (req, res) => {
  try {
    const { clerkUserId, email, name } = req.body;

    if (!clerkUserId || !email) {
      return res.status(400).json({ message: 'User ID and email are required' });
    }

    // Find user or create new one
    let user = await User.findOne({ clerkUserId });

    if (!user) {
      // Create new user
      user = new User({
        clerkUserId,
        email,
        name: name || email.split('@')[0], // Use email prefix as fallback name
        isActive: true
      });
      await user.save();
    }

    res.status(200).json({ message: 'User created/found successfully', user });
  } catch (error) {
    console.error('Error creating/getting user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Save user preferences
export const savePreferences = async (req, res) => {
  try {
    const { clerkUserId, email, name, preferences } = req.body;

    if (!clerkUserId || !email) {
      return res.status(400).json({ message: 'User ID and email are required' });
    }

    // Find user or create new one
    let user = await User.findOne({ clerkUserId });

    if (user) {
      // Update existing user
      user.preferences = preferences;
      user.hasCompletedPreferences = true;
      if (name) user.name = name;
    } else {
      // Create new user
      user = new User({
        clerkUserId,
        email,
        name: name || email.split('@')[0],
        preferences,
        hasCompletedPreferences: true,
        isActive: true
      });
    }

    await user.save();
    res.status(200).json({ message: 'Preferences saved successfully', user });
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user preferences
export const getPreferences = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const user = await User.findOne({ clerkUserId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    console.error('Error getting preferences:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check if user has completed preferences
export const checkPreferences = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const user = await User.findOne({ clerkUserId });
    
    if (!user) {
      return res.status(200).json({ hasCompletedPreferences: false });
    }

    res.status(200).json({ 
      hasCompletedPreferences: user.hasCompletedPreferences,
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Error checking preferences:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};