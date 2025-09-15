const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  dietaryRestrictions: {
    type: [String],
    default: []
  },
  favoriteCuisines: {
    type: [String],
    default: []
  },
  healthGoals: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Preferences', preferencesSchema);