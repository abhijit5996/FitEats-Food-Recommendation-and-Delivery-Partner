import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import RestaurantCard from '../components/ui/RestaurantCard';
import { motion, AnimatePresence } from 'framer-motion';
import { endpoints } from '../config/api';

const RestaurantsPage = () => {
  const { user } = useUser();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    healthFocused: false,
    rating: 0,
    dietaryOptions: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Get user preferences from Clerk user metadata
  const preferences = user?.unsafeMetadata?.preferences || {};
  
  // Fetch restaurants from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(endpoints.restaurants.getAll());
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched restaurants:', data.restaurants);
          
          // Transform restaurant data to ensure consistent ID field
          const transformedRestaurants = data.restaurants?.map(restaurant => ({
            id: String(restaurant._id || restaurant.id),
            name: String(restaurant.name || ''),
            image: String(restaurant.image || ''),
            rating: Number(restaurant.rating || 4.0),
            reviewCount: Number(restaurant.reviewCount || 0),
            location: String(restaurant.location || ''),
            deliveryTime: String(restaurant.deliveryTime || '30-40'),
            distance: String(restaurant.distance || '2.5'),
            cuisines: Array.isArray(restaurant.cuisines) ? restaurant.cuisines : [],
            isHealthFocused: Boolean(restaurant.isHealthFocused)
          })) || [];
          
          console.log('Transformed restaurants:', transformedRestaurants);
          setRestaurants(transformedRestaurants);
        } else {
          console.error('Failed to fetch restaurants');
          // Fallback to sample data if API fails
          setRestaurants(getSampleRestaurants());
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        // Fallback to sample data if API fails
        setRestaurants(getSampleRestaurants());
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Sample restaurant data as fallback
  const getSampleRestaurants = () => [
      // Popular Chains (QSR)
{
  id: 1,
  name: 'Domino\'s Pizza',
  image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
  rating: 4.2,
  reviewCount: 12500,
  location: 'Italian, Fast Food',
  deliveryTime: '30-40',
  distance: '1.8',
  cuisines: ['Italian', 'Pizza', 'Fast Food'],
  isHealthFocused: false,
},
{
  id: 2,
  name: 'Pizza Hut',
  image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop',
  rating: 4.1,
  reviewCount: 9800,
  location: 'Italian, Fast Food',
  deliveryTime: '35-45',
  distance: '2.1',
  cuisines: ['Italian', 'Pizza', 'Fast Food'],
  isHealthFocused: false,
},
{
  id: 3,
  name: 'McDonald\'s',
  image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
  rating: 4.0,
  reviewCount: 15000,
  location: 'Fast Food, Burgers',
  deliveryTime: '20-30',
  distance: '1.5',
  cuisines: ['Fast Food', 'Burgers', 'American'],
  isHealthFocused: false,
},
{
  id: 4,
  name: 'Burger King',
  image: 'https://images.unsplash.com/photo-1571091655780-56dbb90e0948?w=400&h=300&fit=crop',
  rating: 4.0,
  reviewCount: 8700,
  location: 'Fast Food, Burgers',
  deliveryTime: '25-35',
  distance: '2.3',
  cuisines: ['Fast Food', 'Burgers'],
  isHealthFocused: false,
},
{
  id: 5,
  name: 'KFC',
  image: 'https://images.unsplash.com/photo-1513639776629-7b61f0a2c2db?w=400&h=300&fit=crop',
  rating: 4.1,
  reviewCount: 11200,
  location: 'Fast Food, Chicken',
  deliveryTime: '30-40',
  distance: '2.0',
  cuisines: ['Fast Food', 'Chicken'],
  isHealthFocused: false,
},
{
  id: 6,
  name: 'Subway',
  image: 'https://images.unsplash.com/photo-1477617722074-45613a51bf6d?w=400&h=300&fit=crop',
  rating: 4.0,
  reviewCount: 7600,
  location: 'Healthy, Sandwiches',
  deliveryTime: '20-30',
  distance: '1.2',
  cuisines: ['Healthy', 'Sandwiches', 'Salads'],
  isHealthFocused: true,
},
{
  id: 7,
  name: 'Wow! Momo',
  image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=400&h=300&fit=crop',
  rating: 4.3,
  reviewCount: 5400,
  location: 'Chinese, Tibetan',
  deliveryTime: '25-35',
  distance: '1.7',
  cuisines: ['Chinese', 'Tibetan', 'Momos'],
  isHealthFocused: false,
},
{
  id: 8,
  name: 'Faasos / EatSure',
  image: 'https://images.unsplash.com/photo-1642165380129-2cbeb5ed8b89?w=400&h=300&fit=crop',
  rating: 4.2,
  reviewCount: 6500,
  location: 'Wraps, Bowls',
  deliveryTime: '30-40',
  distance: '2.4',
  cuisines: ['Wraps', 'North Indian', 'Bowls'],
  isHealthFocused: true,
},
{
  id: 9,
  name: 'Behrouz Biryani',
  image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop',
  rating: 4.5,
  reviewCount: 8900,
  location: 'North Indian, Biryani',
  deliveryTime: '40-50',
  distance: '3.1',
  cuisines: ['North Indian', 'Biryani', 'Mughlai'],
  isHealthFocused: false,
},
{
  id: 10,
  name: 'OvenStory Pizza',
  image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop',
  rating: 4.3,
  reviewCount: 4800,
  location: 'Italian, Pizza',
  deliveryTime: '35-45',
  distance: '2.8',
  cuisines: ['Italian', 'Pizza', 'Gourmet'],
  isHealthFocused: false,
},
{
  id: 11,
  name: 'Bikanervala',
  image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d7?w=400&h=300&fit=crop',
  rating: 4.4,
  reviewCount: 10200,
  location: 'Sweets, Snacks',
  deliveryTime: '25-35',
  distance: '1.9',
  cuisines: ['North Indian', 'South Indian', 'Sweets', 'Snacks'],
  isHealthFocused: false,
},
{
  id: 12,
  name: 'Haldiram\'s',
  image: 'https://images.unsplash.com/photo-1585937421610-8d33b5b5933d?w=400&h=300&fit=crop',
  rating: 4.5,
  reviewCount: 13500,
  location: 'Sweets, Snacks',
  deliveryTime: '20-30',
  distance: '1.4',
  cuisines: ['North Indian', 'South Indian', 'Sweets', 'Snacks'],
  isHealthFocused: false,
},
{
  id: 13,
  name: 'Taco Bell',
  image: 'https://images.unsplash.com/photo-1551504734-b464e32a163a?w=400&h=300&fit=crop',
  rating: 4.1,
  reviewCount: 6100,
  location: 'Mexican, Fast Food',
  deliveryTime: '20-30',
  distance: '2.5',
  cuisines: ['Mexican', 'Fast Food', 'Tex-Mex'],
  isHealthFocused: false,
},
{
  id: 14,
  name: 'Cafe Coffee Day',
  image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
  rating: 4.0,
  reviewCount: 9500,
  location: 'Cafe, Snacks',
  deliveryTime: '25-35',
  distance: '0.8',
  cuisines: ['Cafe', 'Snacks', 'Beverages'],
  isHealthFocused: false,
},
{
  id: 15,
  name: 'Starbucks',
  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
  rating: 4.3,
  reviewCount: 7800,
  location: 'Cafe, Snacks',
  deliveryTime: '30-40',
  distance: '1.1',
  cuisines: ['Cafe', 'Snacks', 'Beverages'],
  isHealthFocused: false,
},

// Premium & Casual Dining
{
  id: 16,
  name: 'Barbeque Nation',
  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
  rating: 4.4,
  reviewCount: 11200,
  location: 'Buffet, Grills',
  deliveryTime: '50-60',
  distance: '4.2',
  cuisines: ['Buffet', 'North Indian', 'Grills', 'Barbecue'],
  isHealthFocused: false,
},
{
  id: 17,
  name: 'Pirates of Grill',
  image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=400&h=300&fit=crop',
  rating: 4.3,
  reviewCount: 4500,
  location: 'Buffet, Grills',
  deliveryTime: '50-60',
  distance: '3.8',
  cuisines: ['Buffet', 'North Indian', 'Grills'],
  isHealthFocused: false,
},
{
  id: 18,
  name: 'Nando\'s',
  image: 'https://images.unsplash.com/photo-1602881912224-5bb0bd5a01e1?w=400&h=300&fit=crop',
  rating: 4.5,
  reviewCount: 3200,
  location: 'Portuguese, Grilled Chicken',
  deliveryTime: '40-50',
  distance: '3.5',
  cuisines: ['Portuguese', 'African', 'Grilled Chicken'],
  isHealthFocused: true,
},
{
  id: 19,
  name: 'Chili\'s Grill & Bar',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
  rating: 4.4,
  reviewCount: 2900,
  location: 'American, Mexican',
  deliveryTime: '35-45',
  distance: '2.9',
  cuisines: ['American', 'Mexican', 'Tex-Mex'],
  isHealthFocused: false,
},
{
  id: 20,
  name: 'Mamagoto',
  image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop',
  rating: 4.6,
  reviewCount: 3800,
  location: 'Pan-Asian',
  deliveryTime: '40-50',
  distance: '4.0',
  cuisines: ['Pan-Asian', 'Chinese', 'Thai', 'Japanese'],
  isHealthFocused: true,
},
{
  id: 21,
  name: 'Punjab Grill',
  image: 'https://images.unsplash.com/photo-1585937421610-8d33b5b5933d?w=400&h=300&fit=crop',
  rating: 4.7,
  reviewCount: 2100,
  location: 'North Indian, Mughlai',
  deliveryTime: '45-55',
  distance: '3.2',
  cuisines: ['North Indian', 'Mughlai', 'Kebabs'],
  isHealthFocused: false,
},
{
  id: 22,
  name: 'Mainland China',
  image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
  rating: 4.5,
  reviewCount: 5400,
  location: 'Chinese',
  deliveryTime: '40-50',
  distance: '2.7',
  cuisines: ['Chinese', 'Asian'],
  isHealthFocused: true,
},
{
  id: 23,
  name: 'Oh! Calcutta',
  image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
  rating: 4.6,
  reviewCount: 3300,
  location: 'Bengali',
  deliveryTime: '45-55',
  distance: '4.5',
  cuisines: ['Bengali', 'Seafood'],
  isHealthFocused: true,
},
{
  id: 24,
  name: 'Social',
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
  rating: 4.4,
  reviewCount: 6700,
  location: 'Multi-cuisine, Bar',
  deliveryTime: '50-60',
  distance: '1.5',
  cuisines: ['Continental', 'American', 'North Indian', 'Bar Food'],
  isHealthFocused: false,
},
{
  id: 25,
  name: 'Farzi Cafe',
  image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
  rating: 4.7,
  reviewCount: 2500,
  location: 'Modern Indian, Fusion',
  deliveryTime: '40-50',
  distance: '3.0',
  cuisines: ['Modern Indian', 'Fusion', 'Gourmet'],
  isHealthFocused: false,
},
{
  id: 26,
  name: 'Smoke House Deli',
  image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
  rating: 4.5,
  reviewCount: 1800,
  location: 'European, Continental',
  deliveryTime: '35-45',
  distance: '2.6',
  cuisines: ['European', 'Continental', 'Cafe'],
  isHealthFocused: true,
},
{
  id: 27,
  name: 'The Big Chill Creamery',
  image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
  rating: 4.8,
  reviewCount: 4200,
  location: 'Italian, Desserts',
  deliveryTime: '30-40',
  distance: '1.3',
  cuisines: ['Italian', 'Desserts', 'Ice Cream', 'Pasta'],
  isHealthFocused: false,
},

// Regional Gems
{
  id: 28,
  name: 'Karim\'s',
  image: 'https://images.unsplash.com/photo-1631898039994-6032ed28c4ae?w=400&h=300&fit=crop',
  rating: 4.6,
  reviewCount: 8900,
  location: 'Mughlai, North Indian',
  deliveryTime: '45-55',
  distance: '5.2',
  cuisines: ['Mughlai', 'North Indian', 'Kebabs'],
  isHealthFocused: false,
},
{
  id: 29,
  name: 'Paradise Food Court',
  image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop',
  rating: 4.4,
  reviewCount: 15000,
  location: 'Biryani, Hyderabadi',
  deliveryTime: '50-60',
  distance: '6.0',
  cuisines: ['Biryani', 'Hyderabadi'],
  isHealthFocused: false,
},
{
  id: 30,
  name: 'Saravana Bhavan',
  image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=400&h=300&fit=crop',
  rating: 4.5,
  reviewCount: 11000,
  location: 'South Indian, Vegetarian',
  deliveryTime: '30-40',
  distance: '2.2',
  cuisines: ['South Indian', 'Vegetarian'],
  isHealthFocused: true,
},
{
  id: 31,
  name: 'CTR - Central Tiffin Room',
  image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=400&h=300&fit=crop',
  rating: 4.7,
  reviewCount: 8500,
  location: 'South Indian, Breakfast',
  deliveryTime: '25-35',
  distance: '3.5',
  cuisines: ['South Indian', 'Breakfast'],
  isHealthFocused: true,
},
{
  id: 32,
  name: 'Peter Cat',
  image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop',
  rating: 4.6,
  reviewCount: 4800,
  location: 'Continental, North Indian',
  deliveryTime: '40-50',
  distance: '4.8',
  cuisines: ['Continental', 'North Indian', 'Kebabs'],
  isHealthFocused: false,
},
{
  id: 33,
  name: 'Leopold Cafe',
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
  rating: 4.3,
  reviewCount: 7200,
  location: 'Multi-cuisine, Bar',
  deliveryTime: '45-55',
  distance: '7.1',
  cuisines: ['Multi-cuisine', 'Bar Food', 'Continental'],
  isHealthFocused: false,
},
{
  id: 34,
  name: 'Indian Coffee House',
  image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
  rating: 4.2,
  reviewCount: 6500,
  location: 'South Indian, Coffee',
  deliveryTime: '30-40',
  distance: '2.0',
  cuisines: ['South Indian', 'Snacks', 'Coffee'],
  isHealthFocused: true,
},
{
  id: 35,
  name: 'Kuremal Mohanlal Kulfi Wale',
  image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
  rating: 4.8,
  reviewCount: 2900,
  location: 'Desserts, Kulfi',
  deliveryTime: '20-30',
  distance: '1.5',
  cuisines: ['Desserts', 'Kulfi'],
  isHealthFocused: false,
},
{
  id: 36,
  name: 'Anand Sweets & Savouries',
  image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d7?w=400&h=300&fit=crop',
  rating: 4.5,
  reviewCount: 5100,
  location: 'Sweets, Snacks',
  deliveryTime: '25-35',
  distance: '2.8',
  cuisines: ['Sweets', 'Snacks', 'South Indian'],
  isHealthFocused: false,
},
{
  id: 37,
  name: 'Kayani Bakery',
  image: 'https://images.unsplash.com/photo-1555507036-ab794f24f6f6?w=400&h=300&fit=crop',
  rating: 4.7,
  reviewCount: 2300,
  location: 'Bakery, Desserts',
  deliveryTime: '40-50',
  distance: '5.5',
  cuisines: ['Bakery', 'Desserts', 'Cakes'],
  isHealthFocused: false,
}
      
    ];

  // Apply filters when restaurants or filters change
  useEffect(() => {
    applyFilters(restaurants, filters);
  }, [restaurants, filters]);

  // Apply user preferences as initial filters if available
  useEffect(() => {
    if (preferences && Object.keys(preferences).length > 0) {
      const userFilters = {
        ...filters,
        dietaryOptions: preferences.dietaryRestrictions || [],
        healthFocused: preferences.healthConscious || false,
      };
      setFilters(userFilters);
    }
  }, [user, preferences]);
  
  const applyFilters = (restaurantList, currentFilters) => {
    let filtered = [...restaurantList];
    
    // Apply search filter
    if (currentFilters.search) {
      const searchTerm = currentFilters.search.toLowerCase();
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(searchTerm)) ||
        restaurant.location.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply cuisine filter
    if (currentFilters.cuisine) {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisines.some(cuisine => 
          cuisine.toLowerCase() === currentFilters.cuisine.toLowerCase()
        )
      );
    }
    
    // Apply health-focused filter
    if (currentFilters.healthFocused) {
      filtered = filtered.filter(restaurant => restaurant.isHealthFocused);
    }
    
    // Apply rating filter
    if (currentFilters.rating > 0) {
      filtered = filtered.filter(restaurant => restaurant.rating >= currentFilters.rating);
    }
    
    // Apply dietary options filter
    if (currentFilters.dietaryOptions.length > 0) {
      filtered = filtered.filter(restaurant => {
        // If restaurant has dietaryOptions property, check against it
        if (restaurant.dietaryOptions && Array.isArray(restaurant.dietaryOptions)) {
          return currentFilters.dietaryOptions.every(option => 
            restaurant.dietaryOptions.includes(option)
          );
        }
        // Otherwise, assume basic dietary compatibility based on cuisines/health focus
        return restaurant.isHealthFocused || restaurant.cuisines.some(cuisine => 
          ['Vegetarian', 'Vegan', 'Healthy', 'Salads'].includes(cuisine)
        );
      });
    }
    
    setFilteredRestaurants(filtered);
  };
  
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let newValue;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (name === 'rating') {
      newValue = parseFloat(value);
    } else {
      newValue = value;
    }
    
    const updatedFilters = { ...filters, [name]: newValue };
    setFilters(updatedFilters);
    applyFilters(restaurants, updatedFilters);
  };
  
  const handleDietaryOptionChange = (option) => {
    let updatedOptions;
    if (filters.dietaryOptions.includes(option)) {
      updatedOptions = filters.dietaryOptions.filter(item => item !== option);
    } else {
      updatedOptions = [...filters.dietaryOptions, option];
    }
    
    const updatedFilters = { ...filters, dietaryOptions: updatedOptions };
    setFilters(updatedFilters);
    applyFilters(restaurants, updatedFilters);
  };
  
  const clearFilters = () => {
    const resetFilters = {
      search: '',
      cuisine: '',
      healthFocused: false,
      rating: 0,
      dietaryOptions: [],
    };
    setFilters(resetFilters);
    setFilteredRestaurants(restaurants);
  };
  
  // Get unique cuisines from all restaurants
  const allCuisines = [...new Set(restaurants.flatMap(restaurant => restaurant.cuisines))];
  
  // Get unique dietary options from all restaurants
  const allDietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb', 'Organic'];
  
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
    <div className="py-12">
      <div className="container-custom">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Discover Restaurants</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find the perfect restaurant that matches your taste and dietary preferences.
            {preferences && preferences.dietaryRestrictions?.length > 0 && (
              <span> We've applied your dietary preferences to help you find suitable options.</span>
            )}
          </p>
        </motion.div>
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-72 card p-6 h-fit lg:sticky top-24 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary/80"
              >
                Clear All
              </button>
            </div>
            
            {/* Search Filter */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-gray-400 font-medium mb-2">
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Restaurant or cuisine..."
                className="input-field"
              />
            </div>
            
            {/* Cuisine Filter */}
            <div className="mb-6">
              <label htmlFor="cuisine" className="block text-gray-400 font-medium mb-2">
                Cuisine
              </label>
              <select
                id="cuisine"
                name="cuisine"
                value={filters.cuisine}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">All Cuisines</option>
                {allCuisines.map((cuisine, index) => (
                  <option key={index} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
            
            {/* Health-Focused Filter */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="healthFocused"
                  checked={filters.healthFocused}
                  onChange={handleFilterChange}
                  className="h-5 w-5 text-primary focus:ring-primary rounded"
                />
                <span className="ml-2 text-gray-400">Health-Focused Restaurants</span>
              </label>
            </div>
            
            {/* Rating Filter */}
            <div className="mb-6">
              <label htmlFor="rating" className="block text-gray-400 font-medium mb-2">
                Minimum Rating: {filters.rating > 0 ? filters.rating : 'Any'}
              </label>
              <input
                type="range"
                id="rating"
                name="rating"
                min="0"
                max="5"
                step="0.5"
                value={filters.rating}
                onChange={handleFilterChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Any</span>
                <span>5 ★</span>
              </div>
            </div>
            
            {/* Dietary Options Filter */}
            <div>
              <h4 className="text-gray-400 font-medium mb-2">Dietary Options</h4>
              <div className="space-y-2">
                {allDietaryOptions.map((option, index) => (
                  <label key={index} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.dietaryOptions.includes(option)}
                      onChange={() => handleDietaryOptionChange(option)}
                      className="h-5 w-5 text-primary focus:ring-primary rounded"
                    />
                    <span className="ml-2 text-gray-400">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Restaurant List */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {filteredRestaurants.length > 0 ? (
                <motion.div 
                  key="has-results"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredRestaurants.map(restaurant => (
                    <motion.div key={restaurant.id} variants={itemVariants}>
                      <RestaurantCard restaurant={restaurant} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="card p-8 text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">No Restaurants Found</h3>
                  <p className="text-gray-400 mb-4">
                    We couldn't find any restaurants matching your filters. Try adjusting your search criteria.
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="btn btn-primary px-6 py-2"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;