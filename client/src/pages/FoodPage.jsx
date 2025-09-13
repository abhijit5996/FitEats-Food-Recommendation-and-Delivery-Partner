import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import RecipeCard from '../components/RecipeCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Import all food images (same as in HomePage)
import BajraKhichdi from '../assets/images/Bajra-Khichdi.jpg';

const FoodPage = () => {
  const { addItem } = useCart();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      
      // Same food items array as in HomePage
      const foodItems = [
        {
          id: 1,
          name: 'Bajra Khichdi',
          description: 'Healthy millet-based khichdi with vegetables and spices.',
          price: 180,
          image: BajraKhichdi,
          rating: 4.3,
          reviewCount: 89,
          isHealthy: true,
          restaurant: 'Healthy Bites',
          restaurantId: 1,
        },
      ];
      
      setFoods(foodItems);
      setLoading(false);
    };
    
    fetchFoods();
  }, []);

  const filteredFoods = filter === 'all' 
    ? foods 
    : filter === 'healthy' 
      ? foods.filter(food => food.isHealthy)
      : foods.filter(food => !food.isHealthy);

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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredFoods.map(food => (
              <motion.div key={food.id} variants={itemVariants}>
                <RecipeCard 
                  food={food}
                  showRestaurant={true}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FoodPage;