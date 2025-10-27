import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import RecipeCard from '../components/RecipeCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { endpoints } from '../config/api';


const FoodPage = () => {
  const { addItem } = useCart();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(endpoints.foods.getAll());
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched foods:', data.foods);
          console.log('Number of foods:', data.foods?.length);
          console.log('First food item:', data.foods?.[0]);
          console.log('Full first food item:', JSON.stringify(data.foods?.[0], null, 2));
          setFoods(data.foods || []);
        } else {
          console.error('Failed to fetch foods');
          // Fallback to empty array if API fails
          setFoods([]);
        }
      } catch (error) {
        console.error('Error fetching foods:', error);
        // Fallback to empty array if API fails
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = filter === 'all' 
    ? foods 
    : filter === 'healthy' 
      ? foods.filter(food => food.isHealthy)
      : foods.filter(food => !food.isHealthy);

  console.log('Filter:', filter);
  console.log('Foods state:', foods);
  console.log('Filtered foods:', filteredFoods);
  console.log('Loading state:', loading);

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
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-8 text-white"
        >
          All Foods
        </motion.h1>

        {/* Filter Options */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-4 mb-8"
        >
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            All Foods
          </button>
          <button 
            onClick={() => setFilter('healthy')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'healthy' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Healthy Options
          </button>
          <button 
            onClick={() => setFilter('treat')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'treat' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Occasional Treats
          </button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-400">Loading delicious food items...</p>
            </div>
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-400 text-lg mb-2">No food items found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or check back later for new items!</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredFoods.map((food, index) => {
              console.log(`Food item ${index}:`, food);
              
              // Transform food data to match RecipeCard expectations
              const transformedFood = {
                id: String(food._id || food.id || `food-${index}`),
                name: String(food.name || 'Unknown Food'),
                description: String(food.description || 'No description available'),
                price: Number(food.price || 0),
                image: String(food.image || '/api/placeholder/300/200'),
                rating: Number(food.rating || 4.0),
                reviewCount: Number(food.reviewCount || 0),
                restaurant: String(food.restaurant?.name || food.restaurant || 'Unknown Restaurant'),
                isHealthy: Boolean(food.isHealthy || false),
                category: String(food.category || 'Food'),
                cuisine: String(food.cuisine || ''),
                spiceLevel: String(food.spiceLevel || ''),
                dietType: String(food.dietType || '')
              };
              
              console.log(`Transformed food item ${index}:`, transformedFood);
              
              return (
                <motion.div key={transformedFood.id} variants={itemVariants}>
                  <RecipeCard 
                    food={transformedFood}
                    showRestaurant={true}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FoodPage;