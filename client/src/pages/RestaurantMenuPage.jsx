import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import FoodCard from '../components/ui/FoodCard';
import { motion } from 'framer-motion';
import { endpoints } from '../config/api.js';

const RestaurantMenuPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const preferences = user?.unsafeMetadata?.preferences || {};

  useEffect(() => {
    fetchRestaurantData();
  }, [id]);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category?.toLowerCase() === activeCategory.toLowerCase()));
    }
  }, [menuItems, activeCategory]);

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch restaurant details
      const restaurantResponse = await fetch(endpoints.restaurants.getById(id));
      if (!restaurantResponse.ok) {
        throw new Error('Restaurant not found');
      }
      const restaurantData = await restaurantResponse.json();
      
      // Transform restaurant data
      const transformedRestaurant = {
        id: String(restaurantData.restaurant._id || restaurantData.restaurant.id),
        name: String(restaurantData.restaurant.name || ''),
        image: String(restaurantData.restaurant.image || ''),
        rating: Number(restaurantData.restaurant.rating || 4.0),
        reviewCount: Number(restaurantData.restaurant.reviewCount || 0),
        location: String(restaurantData.restaurant.location || ''),
        deliveryTime: String(restaurantData.restaurant.deliveryTime || '30-40'),
        distance: String(restaurantData.restaurant.distance || '2.5'),
        cuisines: Array.isArray(restaurantData.restaurant.cuisines) ? restaurantData.restaurant.cuisines : [],
        isHealthFocused: Boolean(restaurantData.restaurant.isHealthFocused)
      };
      
      setRestaurant(transformedRestaurant);

      // Fetch restaurant menu items
      const menuResponse = await fetch(endpoints.restaurants.getMenu(id));
      
      if (!menuResponse.ok) {
        // If no specific menu endpoint, fetch all foods filtered by restaurant
        const foodsResponse = await fetch(`${endpoints.foods.getAll()}?restaurant=${id}`);
        if (!foodsResponse.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const foodsData = await foodsResponse.json();
        
        // Transform food data
        const transformedItems = foodsData.foods?.map(food => ({
          id: String(food._id || food.id),
          name: String(food.name || ''),
          description: String(food.description || ''),
          price: Number(food.price || 0),
          image: String(food.image || ''),
          rating: Number(food.rating || 4.0),
          reviewCount: Number(food.reviewCount || 0),
          isHealthy: Boolean(food.isHealthy),
          category: String(food.category || 'other').toLowerCase(),
          restaurant: String(food.restaurantName || (food.restaurant?.name) || ''),
          restaurantId: String(food.restaurant?._id || food.restaurant || food.restaurantId || '')
        })) || [];
        
        setMenuItems(transformedItems);
      } else {
        const menuData = await menuResponse.json();
        
        // The restaurant menu endpoint returns foods in 'foods' property, not 'menuItems'
        const transformedItems = menuData.foods?.map(food => ({
          id: String(food._id || food.id),
          name: String(food.name || ''),
          description: String(food.description || ''),
          price: Number(food.price || 0),
          image: String(food.image || ''),
          rating: Number(food.rating || 4.0),
          reviewCount: Number(food.reviewCount || 0),
          isHealthy: Boolean(food.isHealthy),
          category: String(food.category || 'other').toLowerCase(),
          restaurant: String(food.restaurantName || (food.restaurant?.name) || ''),
          restaurantId: String(food.restaurant?._id || food.restaurant || food.restaurantId || '')
        })) || [];
        
        setMenuItems(transformedItems);
      }

    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setError(error.message || 'Failed to load restaurant data');
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from menu items
  const categories = ['all', ...new Set(menuItems.map(item => item.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurant menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Restaurant Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Restaurant Not Found</h2>
          <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop';
                }}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-4">{restaurant.location}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  {restaurant.rating} ({restaurant.reviewCount} reviews)
                </div>
                <div>🕒 {restaurant.deliveryTime} mins</div>
                <div>📍 {restaurant.distance} km away</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisines.map((cuisine, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {cuisine}
                  </span>
                ))}
                {restaurant.isHealthFocused && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    🌱 Health Focused
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600">
              {activeCategory === 'all' 
                ? 'This restaurant hasn\'t added any menu items yet.' 
                : `No items found in the "${activeCategory}" category.`
              }
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <FoodCard food={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuPage;
