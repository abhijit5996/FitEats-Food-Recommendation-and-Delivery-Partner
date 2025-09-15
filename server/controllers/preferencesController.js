const Preferences = require('../models/preferencesModel');

// Save or update user preferences
const savePreferences = async (req, res) => {
  try {
    const { userId, dietaryRestrictions, favoriteCuisines, healthGoals } = req.body;

    if (!userId || !healthGoals) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID and health goals are required' 
      });
    }

    // Upsert the preferences
    const preferences = await Preferences.findOneAndUpdate(
      { userId },
      { 
        dietaryRestrictions, 
        favoriteCuisines, 
        healthGoals,
        createdAt: new Date()
      },
      { 
        upsert: true, 
        new: true 
      }
    );

    res.status(200).json({ 
      success: true, 
      message: 'Preferences saved successfully',
      data: preferences 
    });
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Check if preferences exist for a user
const checkPreferences = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }

    const preferences = await Preferences.findOne({ userId });

    res.status(200).json({ 
      success: true, 
      exists: !!preferences 
    });
  } catch (error) {
    console.error('Error checking preferences:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

module.exports = {
  savePreferences,
  checkPreferences
};