import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Save, ArrowRight, ChefHat, Heart, AlertCircle } from 'lucide-react';

const PreferencesForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    dietaryRestrictions: [],
    favoriteCuisines: [],
    healthGoals: '',
    allergies: [],
    spiceTolerance: 'medium',
    mealPreferences: [],
    customMedicalCondition: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Options for form fields
  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Low-Carb', 'Low-Fat'
  ];
  
  const cuisineOptions = [
    'Indian', 'Italian', 'Chinese', 'Mexican', 'Thai', 'Mediterranean', 'American', 'Japanese'
  ];
  
  const healthGoalOptions = [
    'Weight Loss',
    'Muscle Gain',
    'Maintain Weight',
    'Improve Energy',
    'Better Digestion',
    'Manage Medical Condition'
  ];
  
  const allergyOptions = [
    'Nuts', 'Shellfish', 'Eggs', 'Soy', 'Wheat', 'Dairy', 'Fish', 'Sesame'
  ];
  
  const mealOptions = [
    'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [field]: currentValues.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [field]: [...currentValues, value]
        };
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.healthGoals) {
      alert('Please select a health goal');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/preferences/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          dietaryRestrictions: formData.dietaryRestrictions,
          favoriteCuisines: formData.favoriteCuisines,
          healthGoals: formData.healthGoals,
          allergies: formData.allergies
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        navigate('/');
      } else {
        console.error('Error saving preferences:', data.message);
        alert(`Failed to save preferences: ${data.message}`);
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Tell Us About Your Preferences</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Help us recommend the perfect meals and restaurants tailored to your tastes and health needs.
          </p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Personalization Section */}
          <motion.div variants={itemVariants} className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6 flex items-center">
              <ChefHat className="w-6 h-6 mr-2 text-[#ffc107]" />
              Food Preferences
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Dietary Restrictions */}
              <div>
                <h3 className="text-lg font-medium text-[#1a1a2e] mb-4">Dietary Restrictions</h3>
                <div className="space-y-3">
                  {dietaryOptions.map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.dietaryRestrictions.includes(option)}
                        onChange={() => handleCheckboxChange('dietaryRestrictions', option)}
                        className="rounded border-gray-300 text-[#ffc107] focus:ring-[#ffc107] h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Cuisine Preferences */}
              <div>
                <h3 className="text-lg font-medium text-[#1a1a2e] mb-4">Favorite Cuisines</h3>
                <div className="space-y-3">
                  {cuisineOptions.map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.favoriteCuisines.includes(option)}
                        onChange={() => handleCheckboxChange('favoriteCuisines', option)}
                        className="rounded border-gray-300 text-[#ffc107] focus:ring-[#ffc107] h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Spice Tolerance */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-[#1a1a2e] mb-4">Spice Tolerance</h3>
              <div className="flex space-x-4">
                {['mild', 'medium', 'hot', 'very-hot'].map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="spiceTolerance"
                      checked={formData.spiceTolerance === level}
                      onChange={() => setFormData({...formData, spiceTolerance: level})}
                      className="h-4 w-4 border-gray-300 text-[#ffc107] focus:ring-[#ffc107]"
                    />
                    <span className="ml-2 text-gray-700 capitalize">{level.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Meal Preferences */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-[#1a1a2e] mb-4">Preferred Meals</h3>
              <div className="flex flex-wrap gap-4">
                {mealOptions.map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.mealPreferences.includes(option)}
                      onChange={() => handleCheckboxChange('mealPreferences', option)}
                      className="rounded border-gray-300 text-[#ffc107] focus:ring-[#ffc107] h-4 w-4"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Health Section */}
          <motion.div variants={itemVariants} className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-[#ff6b35]" />
              Health Goals
            </h2>
            
            {/* Health Goals */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-[#1a1a2e] mb-4">Primary Health Goal *</h3>
              <div className="space-y-3">
                {healthGoalOptions.map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="healthGoals"
                      checked={formData.healthGoals === option}
                      onChange={() => setFormData({...formData, healthGoals: option})}
                      className="h-4 w-4 border-gray-300 text-[#ff6b35] focus:ring-[#ff6b35]"
                      required
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Medical Considerations */}
          <motion.div variants={itemVariants} className="p-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-[#dc3545]" />
              Allergies & Medical Considerations
            </h2>
            
            {/* Allergies */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-[#1a1a2e] mb-4">Food Allergies</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {allergyOptions.map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.allergies.includes(option)}
                      onChange={() => handleCheckboxChange('allergies', option)}
                      className="rounded border-gray-300 text-[#dc3545] focus:ring-[#dc3545] h-4 w-4"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Custom Medical Condition */}
            <div className="mt-4">
              <label htmlFor="customCondition" className="block text-sm font-medium text-gray-700 mb-2">
                Other medical considerations (optional)
              </label>
              <input
                type="text"
                id="customCondition"
                value={formData.customMedicalCondition}
                onChange={(e) => setFormData({...formData, customMedicalCondition: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any other medical considerations"
              />
            </div>
          </motion.div>
          
          {/* Form Actions */}
          <motion.div variants={itemVariants} className="px-8 py-6 bg-gray-50 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
              Skip for Now
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.healthGoals}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Preferences
                </>
              )}
            </button>
          </motion.div>
        </motion.form>
        
        {/* Info Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl text-white"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-[#ffc107]" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">How we use your information</h3>
              <p className="mt-2 text-sm opacity-90">
                Your preferences help us recommend restaurants and meals that match your dietary needs and taste preferences.
                We never share your medical information with restaurants. You can update these preferences anytime in your account settings.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreferencesForm;