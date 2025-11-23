import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isHealthy: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  restaurantName: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  ingredients: [{
    type: String
  }],
  allergens: [{
    type: String
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium', 'spicy'],
    default: 'medium'
  },
  // Recipe-specific fields
  prepTime: {
    type: String,
    default: '15 mins'
  },
  cookTime: {
    type: String,
    default: '30 mins'
  },
  servings: {
    type: Number,
    default: 2
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  instructions: [{
    type: String
  }],
  tips: [{
    type: String
  }],
  cuisine: {
    type: String,
    default: 'Indian'
  }
}, {
  timestamps: true
});

// Index for better search performance
foodSchema.index({ name: 'text', description: 'text' });
foodSchema.index({ restaurant: 1 });
foodSchema.index({ category: 1 });

const Food = mongoose.model('Food', foodSchema);

export default Food;