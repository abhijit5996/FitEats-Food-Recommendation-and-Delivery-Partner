import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useCart } from '../context/CartContext';
import RecipeCard from '../components/RecipeCard';
import RestaurantCard from '../components/ui/RestaurantCard';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback.jsx';
import { endpoints } from '../config/api.js';

const HomePage = () => {
  const { user } = useUser();
  const { addItem } = useCart();
  
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPersonalized, setIsPersonalized] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Check if user is logged in and has preferences
        if (user) {
          try {
            // Try to fetch personalized recommendations
            const foodsResponse = await fetch(`/api/recommendations/foods/${user.id}`);
            const restaurantsResponse = await fetch(`/api/recommendations/restaurants/${user.id}`);
            
            if (foodsResponse.ok && restaurantsResponse.ok) {
              const foodsData = await foodsResponse.json();
              const restaurantsData = await restaurantsResponse.json();
              
              if (foodsData.success && foodsData.personalized) {
                // Transform the food data
                const transformedFoods = foodsData.foods?.map(food => ({
                  id: String(food._id || food.id),
                  name: String(food.name || ''),
                  description: String(food.description || ''),
                  price: Number(food.price || 0),
                  image: String(food.image || ''),
                  rating: Number(food.rating || 4.0),
                  reviewCount: Number(food.reviewCount || 0),
                  isHealthy: Boolean(food.isHealthy),
                  restaurant: String(food.restaurantName || (food.restaurant?.name) || ''),
                  restaurantId: String(food.restaurant?._id || food.restaurant || food.restaurantId || ''),
                  category: String(food.category || '')
                })) || [];

                setFeaturedFoods(transformedFoods);
                setIsPersonalized(true);
              }
              
              if (restaurantsData.success && restaurantsData.personalized) {
                // Transform the restaurant data
                const transformedRestaurants = restaurantsData.restaurants?.map(restaurant => ({
                  id: String(restaurant._id || restaurant.id),
                  name: String(restaurant.name || ''),
                  image: String(restaurant.image || ''),
                  rating: Number(restaurant.rating || 4.0),
                  reviewCount: Number(restaurant.reviewCount || 0),
                  location: String(restaurant.location || ''),
                  deliveryTime: String(restaurant.deliveryTime || '30-40'),
                  distance: String(restaurant.distance || '2.5'),
                  cuisines: Array.isArray(restaurant.cuisines) ? restaurant.cuisines.map(c => String(c)) : [],
                  isHealthFocused: Boolean(restaurant.isHealthFocused)
                })) || [];

                setRecommendedRestaurants(transformedRestaurants);
              }
              
              setLoading(false);
              return;
            }
          } catch (error) {
            console.log('Could not fetch personalized recommendations, falling back to all items:', error);
          }
        }
        
        // Fallback: Fetch all foods and restaurants
        const foodsResponse = await fetch(endpoints.foods.getAll());
        const foodsData = await foodsResponse.json();
        
        const transformedFoods = foodsData.foods?.map(food => ({
          id: String(food._id || food.id),
          name: String(food.name || ''),
          description: String(food.description || ''),
          price: Number(food.price || 0),
          image: String(food.image || ''),
          rating: Number(food.rating || 4.0),
          reviewCount: Number(food.reviewCount || 0),
          isHealthy: Boolean(food.isHealthy),
          restaurant: String(food.restaurantName || (food.restaurant?.name) || ''),
          restaurantId: String(food.restaurant?._id || food.restaurant || food.restaurantId || ''),
          category: String(food.category || '')
        })) || [];

        const restaurantsResponse = await fetch(endpoints.restaurants.getAll());
        const restaurantsData = await restaurantsResponse.json();
        
        const transformedRestaurants = restaurantsData.restaurants?.map(restaurant => ({
          id: String(restaurant._id || restaurant.id),
          name: String(restaurant.name || ''),
          image: String(restaurant.image || ''),
          rating: Number(restaurant.rating || 4.0),
          reviewCount: Number(restaurant.reviewCount || 0),
          location: String(restaurant.location || ''),
          deliveryTime: String(restaurant.deliveryTime || '30-40'),
          distance: String(restaurant.distance || '2.5'),
          cuisines: Array.isArray(restaurant.cuisines) ? restaurant.cuisines.map(c => String(c)) : [],
          isHealthFocused: Boolean(restaurant.isHealthFocused)
        })) || [];

        setFeaturedFoods(transformedFoods);
        setRecommendedRestaurants(transformedRestaurants);
        setIsPersonalized(false);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setFeaturedFoods([]);
        setRecommendedRestaurants([]);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [user]);
  
  // Filter restaurants based on search query
  const filteredRestaurants = recommendedRestaurants.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Food categories data
  const categories = [
    { name: 'Pizza', count: 25, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop' },
    { name: 'Broast', count: 18, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop' },
    { name: 'Chicken', count: 32, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop' },
    { name: 'Burgers', count: 22, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
    { name: 'Shakes', count: 15, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop' },
    { name: 'Sandwiches', count: 19, image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=200&h=200&fit=crop' },
    { name: 'Pasta', count: 28, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d364?w=200&h=200&fit=crop' },
    { name: 'Desserts', count: 21, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop' },
  ];

  // Popular restaurant logos
  const restaurantLogos = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=60&h=60&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=60&h=60&fit=crop',
    'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=60&h=60&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=60&h=60&fit=crop',
    'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=60&h=60&fit=crop',
  ];
  
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-[#1a1a2e]">
        {/* Background with wave */}
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor" className="text-[#2c2c54]"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor" className="text-[#2c2c54]"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor" className="text-[#2c2c54]"></path>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-block bg-[#ff6b35] text-white px-4 py-2 rounded-full text-sm font-medium">
                Easy way to order your food
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                Order Healthy And Fresh Food Any Time
              </h1>
              
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                Italian food makes people think of big family dinners. So you may want to position your restaurant as a place to bring the whole family.
              </p>

              {/* Search Bar */}
              <div className="flex max-w-md">
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 rounded-l-lg border-0 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button className="bg-[#ffc107] text-[#1a1a2e] px-6 py-3 rounded-r-lg font-medium hover:bg-[#e6ac00] transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Popular Restaurants */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-300">Popular Restaurant</p>
                <div className="flex space-x-3">
                  {restaurantLogos.map((logo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600 hover:border-[#ffc107] transition-colors cursor-pointer"
                    >
                      <ImageWithFallback
                        src={logo}
                        alt={`Restaurant ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Content - Food Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Main Pizza Image */}
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-[#ffc107] shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1563273941-b3d0e0129ec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJchwxfHxwaXp6YSUyMGluZ3JlZGllbnRzJTIwZnJlc2glMjBiYXNpbCUyMHRvbWF0b2VzfGVufDF8fHx8MTc1NzY5NDkwMHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Delicious Pizza"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating ingredients */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -left-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg text-2xl"
                >
                  🍅
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute top-4 -right-8 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg text-xl"
                >
                  🌿
                </motion.div>
                <motion.div
                  animate={{ y: [-5, 15, -5] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -bottom-2 left-8 w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center shadow-lg text-xl"
                >
                  🍄
                </motion.div>
                <motion.div
                  animate={{ y: [15, -5, 15] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                  className="absolute bottom-8 -right-6 w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg text-lg"
                >
                  🫒
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-[#ffc107] text-[#1a1a2e] px-4 py-2 rounded-full text-sm font-bold mb-4">
              TOP FOODS
            </div>
            <h2 className="text-4xl font-bold text-[#1a1a2e] mb-4">Our Categories</h2>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.count} items</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Foods Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1a1a2e]"
            >
              {isPersonalized ? 'Recommended for You' : 'Featured Foods'}
            </motion.h2>
            <Link to="/foods" className="text-[#ffc107] hover:text-[#e6ac00] font-medium flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffc107]"></div>
            </div>
          ) : featuredFoods.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-gray-400 text-lg mb-2">No food items available</p>
              <p className="text-gray-500 text-sm">Check back later for new delicious items!</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredFoods.slice(0, 6).map(food => (
                <motion.div key={food.id} variants={itemVariants}>
                  <RecipeCard food={food} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Popular Restaurants Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-[#ffc107] text-[#1a1a2e] px-4 py-2 rounded-full text-sm font-bold mb-4">
              TOP RESTAURANTS
            </div>
            <h2 className="text-4xl font-bold text-[#1a1a2e] mb-4">Popular Restaurant</h2>
          </div>

          {/* Restaurants Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffc107]"></div>
            </div>
          ) : filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏪</div>
              <p className="text-gray-400 text-lg mb-2">No restaurants found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or check back later!</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {filteredRestaurants.map((restaurant, index) => (
                <motion.div key={restaurant.id} variants={itemVariants}>
                  <RestaurantCard restaurant={restaurant} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#ffc107] to-[#ff6b35]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a2e]"
          >
            Ready to Eat Healthier?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-10 max-w-2xl mx-auto text-[#1a1a2e]"
          >
            Join FitEats today and discover food that's not just delicious but also good for your health.
          </motion.p>
          {!user ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link to="/register" className="bg-[#1a1a2e] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors">
                Sign Up Now
              </Link>
              <Link to="/login" className="border-2 border-[#1a1a2e] text-[#1a1a2e] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1a1a2e] hover:text-white transition-colors">
                Login
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/preferences" className="bg-[#1a1a2e] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors">
                Update Your Preferences
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;