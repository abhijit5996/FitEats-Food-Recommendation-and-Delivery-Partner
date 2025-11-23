import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const RecipeCard = ({ food, showRestaurant }) => {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);
  
  // Safe data extraction with fallbacks
  const safeFood = {
    _id: food?._id || food?.id || 'unknown',
    id: food?.id || food?._id || 'unknown',
    name: String(food?.name || 'Unnamed Item'),
    description: String(food?.description || 'No description available'),
    price: Number(food?.price || 0),
    image: String(food?.image || 'https://placehold.co/300x200/1a1a2e/ffc107?text=No+Image'),
    rating: Number(food?.rating || 4.0),
    reviewCount: Number(food?.reviewCount || 0),
    restaurant: String(food?.restaurant || 'Restaurant'),
    isHealthy: Boolean(food?.isHealthy),
    category: String(food?.category || 'Food'),
    cuisine: String(food?.cuisine || '')
  };
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add quantity field if missing
    const itemToAdd = {
      ...safeFood,
      quantity: 1 // Default quantity
    };
    
    addItem(itemToAdd);
  };

  // Create a URL-friendly slug from the food name
  const createSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  return (
    <div className="card overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="cursor-pointer">
        <Link to={`/recipe/${safeFood.id}`}>
          <div className="relative overflow-hidden">
            <img 
              src={safeFood.image} 
              alt={safeFood.name}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                if (!imageError) {
                  setImageError(true);
                  e.target.src = 'https://placehold.co/300x200/1a1a2e/ffc107?text=No+Image';
                }
              }}
            />
            {safeFood.isHealthy && (
              <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                ✓ Healthy
              </div>
            )}
            {safeFood.cuisine && (
              <div className="absolute top-2 right-2 bg-[#1a1a2e] text-white px-2 py-1 rounded-full text-xs">
                {safeFood.cuisine}
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-[#1a1a2e] text-lg line-clamp-1 hover:text-[#ffc107] transition-colors">
                {safeFood.name}
              </h3>
              <span className="text-[#ffc107] font-bold text-lg">₹{safeFood.price.toFixed(2)}</span>
            </div>
            
            <p className="text-[#6c757d] text-sm mb-3 line-clamp-2">{safeFood.description}</p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-[#1a1a2e] text-sm font-medium">{safeFood.rating.toFixed(1)}</span>
                <span className="text-[#6c757d] text-sm ml-1">({safeFood.reviewCount} reviews)</span>
              </div>
              {showRestaurant && (
                <span className="text-[#6c757d] text-sm bg-gray-100 px-2 py-1 rounded">
                  {safeFood.restaurant}
                </span>
              )}
            </div>
            
            {safeFood.category && (
              <div className="mb-3">
                <span className="text-xs text-[#ffc107] bg-[#ffc107]/10 px-2 py-1 rounded-full">
                  {safeFood.category}
                </span>
              </div>
            )}
          </div>
        </Link>
        
        <div className="p-4 pt-0">
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 py-2 text-sm hover:bg-[#ff6b35] transition-colors"
            >
              Add to Cart
            </button>
            <Link 
              to={`/recipe/${createSlug(safeFood.name)}`}
              className="btn btn-outline px-4 py-2 text-sm hover:bg-[#1a1a2e] hover:text-white transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;