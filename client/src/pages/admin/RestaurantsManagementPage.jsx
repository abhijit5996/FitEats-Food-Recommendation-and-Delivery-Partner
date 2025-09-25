import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { endpoints } from '../../config/api';

const RestaurantsManagementPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { getAuthHeaders } = useAdmin();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    location: '',
    deliveryTime: '',
    distance: '',
    cuisines: '',
    isHealthFocused: false
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const restaurantData = {
      ...formData,
      cuisines: formData.cuisines.split(',').map(c => c.trim())
    };

    try {
      const url = editingRestaurant 
        ? endpoints.restaurants.update(editingRestaurant._id)
        : endpoints.restaurants.create();
      
      const response = await fetch(url, {
        method: editingRestaurant ? 'PUT' : 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantData),
      });

      if (response.ok) {
        fetchRestaurants();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving restaurant:', error);
    }
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      image: restaurant.image,
      location: restaurant.location,
      deliveryTime: restaurant.deliveryTime,
      distance: restaurant.distance,
      cuisines: restaurant.cuisines.join(', '),
      isHealthFocused: restaurant.isHealthFocused
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        const response = await fetch(endpoints.restaurants.delete(id), {
          method: 'DELETE',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          fetchRestaurants();
        }
      } catch (error) {
        console.error('Error deleting restaurant:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      location: '',
      deliveryTime: '',
      distance: '',
      cuisines: '',
      isHealthFocused: false
    });
    setEditingRestaurant(null);
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Restaurant Management</h1>
            <p className="text-gray-300 mt-2">Manage your restaurant listings</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-[#ffc107] to-[#ff6b35] text-[#1a1a2e] px-6 py-3 rounded-xl font-bold hover:from-[#e6ac00] hover:to-[#e55a2b] transition-all transform hover:scale-105 shadow-lg"
          >
            Add Restaurant
          </button>
        </div>

        {/* Search */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl shadow-xl mb-6">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-[#ffc107] backdrop-blur-sm"
          />
        </div>

        {/* Restaurants List */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ffc107] mx-auto"></div>
              <p className="text-gray-300 mt-4">Loading restaurants...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/20">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Restaurant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Cuisines
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
                  {filteredRestaurants.map((restaurant) => (
                    <tr key={restaurant._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={restaurant.image}
                            alt={restaurant.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-100">
                              {restaurant.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {restaurant.deliveryTime} • {restaurant.distance} km
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        {restaurant.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {restaurant.cuisines.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        ⭐ {restaurant.rating} ({restaurant.reviewCount})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(restaurant)}
                          className="text-[#ffc107] hover:text-[#e6ac00] mr-4 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(restaurant._id)}
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
            <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1a1a2e] to-[#2c2c54] border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#ffc107] to-[#ff6b35] px-6 py-4">
                <h3 className="text-xl font-bold text-[#1a1a2e]">
                  {editingRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}
                </h3>
              </div>
              
              {/* Modal Body */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Restaurant Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      placeholder="Enter restaurant name"
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
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      placeholder="City, Area"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Delivery Time *
                      </label>
                      <input
                        type="text"
                        name="deliveryTime"
                        value={formData.deliveryTime}
                        onChange={handleInputChange}
                        required
                        placeholder="30-40 min"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Distance (km) *
                      </label>
                      <input
                        type="text"
                        name="distance"
                        value={formData.distance}
                        onChange={handleInputChange}
                        required
                        placeholder="2.5"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Cuisines (comma separated) *
                    </label>
                    <input
                      type="text"
                      name="cuisines"
                      value={formData.cuisines}
                      onChange={handleInputChange}
                      required
                      placeholder="Indian, Chinese, Italian"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isHealthFocused"
                      checked={formData.isHealthFocused}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-[#ffc107] bg-white/10 border-white/20 rounded focus:ring-[#ffc107] focus:ring-2"
                    />
                    <label className="ml-3 block text-sm text-gray-200">
                      Health Focused Restaurant
                    </label>
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
                      {editingRestaurant ? 'Update Restaurant' : 'Create Restaurant'}
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

export default RestaurantsManagementPage;