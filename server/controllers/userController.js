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

    console.log('📝 Save preferences request received');
    console.log('User ID:', clerkUserId);
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Preferences:', preferences);

    if (!clerkUserId || !email) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'User ID and email are required' });
    }

    // Find user or create new one
    let user = await User.findOne({ clerkUserId });
    console.log('🔍 Existing user found:', !!user);

    if (user) {
      // Update existing user
      console.log('🔄 Updating existing user');
      user.preferences = preferences;
      user.hasCompletedPreferences = true;
      if (name) user.name = name;
    } else {
      // Create new user
      console.log('✨ Creating new user');
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
    console.log('✅ User saved successfully');
    console.log('User document:', user);
    
    res.status(200).json({ message: 'Preferences saved successfully', user });
  } catch (error) {
    console.error('💥 Error saving preferences:', error);
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

    console.log('🔍 Check preferences request for user:', clerkUserId);

    const user = await User.findOne({ clerkUserId });
    
    if (!user) {
      console.log('❌ User not found in database');
      return res.status(200).json({ hasCompletedPreferences: false });
    }

    console.log('✅ User found:', { 
      id: user.clerkUserId, 
      hasCompletedPreferences: user.hasCompletedPreferences,
      hasPreferences: !!user.preferences
    });

    res.status(200).json({ 
      hasCompletedPreferences: user.hasCompletedPreferences,
      preferences: user.preferences
    });
  } catch (error) {
    console.error('💥 Error checking preferences:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};