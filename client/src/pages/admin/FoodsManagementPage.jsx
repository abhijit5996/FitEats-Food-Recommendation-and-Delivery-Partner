import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { endpoints } from '../../config/api';

const FoodsManagementPage = () => {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRestaurant, setFilterRestaurant] = useState('');
  const { getAuthHeaders } = useAdmin();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    isHealthy: false,
    category: '',
    restaurant: '',
    ingredients: '',
    allergens: '',
    spiceLevel: 'medium',
    nutritionalInfo: {
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: ''
    }
  });

  useEffect(() => {
    fetchFoods();
    fetchRestaurants();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await fetch(endpoints.foods.getAll(), {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFoods(data.foods);
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(endpoints.restaurants.getAll(), {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRestaurants(data.restaurants);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('nutritionalInfo.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        nutritionalInfo: {
          ...prev.nutritionalInfo,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const foodData = {
      ...formData,
      price: parseFloat(formData.price),
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(i => i),
      allergens: formData.allergens.split(',').map(a => a.trim()).filter(a => a),
      nutritionalInfo: {
        calories: formData.nutritionalInfo.calories ? parseFloat(formData.nutritionalInfo.calories) : undefined,
        protein: formData.nutritionalInfo.protein ? parseFloat(formData.nutritionalInfo.protein) : undefined,
        carbs: formData.nutritionalInfo.carbs ? parseFloat(formData.nutritionalInfo.carbs) : undefined,
        fat: formData.nutritionalInfo.fat ? parseFloat(formData.nutritionalInfo.fat) : undefined,
        fiber: formData.nutritionalInfo.fiber ? parseFloat(formData.nutritionalInfo.fiber) : undefined,
      }
    };

    try {
      const url = editingFood 
        ? endpoints.foods.update(editingFood._id)
        : endpoints.foods.create();
      
      const response = await fetch(url, {
        method: editingFood ? 'PUT' : 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (response.ok) {
        fetchFoods();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving food:', error);
    }
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price.toString(),
      image: food.image,
      isHealthy: food.isHealthy,
      category: food.category,
      restaurant: food.restaurant._id || food.restaurant,
      ingredients: food.ingredients ? food.ingredients.join(', ') : '',
      allergens: food.allergens ? food.allergens.join(', ') : '',
      spiceLevel: food.spiceLevel || 'medium',
      nutritionalInfo: {
        calories: food.nutritionalInfo?.calories?.toString() || '',
        protein: food.nutritionalInfo?.protein?.toString() || '',
        carbs: food.nutritionalInfo?.carbs?.toString() || '',
        fat: food.nutritionalInfo?.fat?.toString() || '',
        fiber: food.nutritionalInfo?.fiber?.toString() || ''
      }
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        const response = await fetch(endpoints.foods.delete(id), {
          method: 'DELETE',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          fetchFoods();
        }
      } catch (error) {
        console.error('Error deleting food:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      isHealthy: false,
      category: '',
      restaurant: '',
      ingredients: '',
      allergens: '',
      spiceLevel: 'medium',
      nutritionalInfo: {
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        fiber: ''
      }
    });
    setEditingFood(null);
  };

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRestaurant = !filterRestaurant || food.restaurant?._id === filterRestaurant;
    return matchesSearch && matchesRestaurant;
  });

  return (
    <div className="h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Food Management</h1>
            <p className="text-gray-300 mt-2">Manage your food items</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-[#ffc107] to-[#ff6b35] text-[#1a1a2e] px-6 py-3 rounded-xl font-bold hover:from-[#e6ac00] hover:to-[#e55a2b] transition-all transform hover:scale-105 shadow-lg"
          >
            Add Food Item
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl shadow-xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-[#ffc107] backdrop-blur-sm"
            />
            <select
              value={filterRestaurant}
              onChange={(e) => setFilterRestaurant(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-gray-100 focus:ring-2 focus:ring-[#ffc107] focus:border-[#ffc107] backdrop-blur-sm"
            >
              <option value="" className="bg-[#1a1a2e] text-gray-100">All Restaurants</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant._id} value={restaurant._id} className="bg-[#1a1a2e] text-gray-100">
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Foods List */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ffc107] mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading food items...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/20">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Food Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Restaurant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-white/10">
                  {filteredFoods.map((food) => (
                    <tr key={food._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={food.image}
                            alt={food.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-100">
                              {food.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {food.isHealthy && '🥗 Healthy'} {food.spiceLevel === 'spicy' && '🌶️ Spicy'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        {food.restaurant?.name || food.restaurantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {food.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        ₹{food.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        ⭐ {food.rating} ({food.reviewCount})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(food)}
                          className="text-[#ffc107] hover:text-[#e6ac00] mr-4 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(food._id)}
                          className="text-[#ff6b35] hover:text-[#e55a2b] transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#1a1a2e] to-[#2c2c54] border border-white/20 shadow-2xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#ffc107] to-[#ff6b35] px-6 py-4 sticky top-0">
                <h3 className="text-xl font-bold text-[#1a1a2e]">
                  {editingFood ? 'Edit Food Item' : 'Add Food Item'}
                </h3>
              </div>
              
              {/* Modal Body */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                        placeholder="Enter food item name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all resize-none"
                      placeholder="Describe the food item..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      placeholder="https://example.com/food-image.jpg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Category *
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., main-course"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Restaurant *
                      </label>
                      <select
                        name="restaurant"
                        value={formData.restaurant}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      >
                        <option value="" className="bg-[#1a1a2e] text-white">Select Restaurant</option>
                        {restaurants.map((restaurant) => (
                          <option key={restaurant._id} value={restaurant._id} className="bg-[#1a1a2e] text-white">
                            {restaurant.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Spice Level
                      </label>
                      <select
                        name="spiceLevel"
                        value={formData.spiceLevel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      >
                        <option value="mild" className="bg-[#1a1a2e] text-white">Mild</option>
                        <option value="medium" className="bg-[#1a1a2e] text-white">Medium</option>
                        <option value="spicy" className="bg-[#1a1a2e] text-white">Spicy</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Ingredients (comma separated)
                      </label>
                      <input
                        type="text"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleInputChange}
                        placeholder="tomatoes, onions, spices"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Allergens (comma separated)
                      </label>
                      <input
                        type="text"
                        name="allergens"
                        value={formData.allergens}
                        onChange={handleInputChange}
                        placeholder="nuts, dairy, gluten"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isHealthy"
                      checked={formData.isHealthy}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-[#ffc107] bg-white/10 border-white/20 rounded focus:ring-[#ffc107] focus:ring-2"
                    />
                    <label className="ml-3 block text-sm text-gray-200">
                      Healthy Option
                    </label>
                  </div>

                  {/* Nutritional Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-200 mb-3">Nutritional Information (optional)</h4>
                    <div className="grid grid-cols-5 gap-3">
                      <input
                        type="number"
                        name="nutritionalInfo.calories"
                        value={formData.nutritionalInfo.calories}
                        onChange={handleInputChange}
                        placeholder="Calories"
                        className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      />
                      <input
                        type="number"
                        name="nutritionalInfo.protein"
                        value={formData.nutritionalInfo.protein}
                        onChange={handleInputChange}
                        placeholder="Protein (g)"
                        className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      />
                      <input
                        type="number"
                        name="nutritionalInfo.carbs"
                        value={formData.nutritionalInfo.carbs}
                        onChange={handleInputChange}
                        placeholder="Carbs (g)"
                        className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      />
                      <input
                        type="number"
                        name="nutritionalInfo.fat"
                        value={formData.nutritionalInfo.fat}
                        onChange={handleInputChange}
                        placeholder="Fat (g)"
                        className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      />
                      <input
                        type="number"
                        name="nutritionalInfo.fiber"
                        value={formData.nutritionalInfo.fiber}
                        onChange={handleInputChange}
                        placeholder="Fiber (g)"
                        className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-3 text-sm font-medium text-gray-300 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 text-sm font-medium text-[#1a1a2e] bg-gradient-to-r from-[#ffc107] to-[#ff6b35] rounded-lg hover:from-[#e6ac00] hover:to-[#e55a2b] transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      {editingFood ? 'Update Food Item' : 'Create Food Item'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodsManagementPage;