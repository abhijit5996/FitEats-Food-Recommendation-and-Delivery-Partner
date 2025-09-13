import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const RecipeCard = ({ food, showRestaurant }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add quantity field if missing
    const itemToAdd = {
      ...food,
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
    <div className="card overflow-hidden bg-white">
      <div className="cursor-pointer">
        <Link to={`/recipe/${createSlug(food.name)}`}>
          <div className="relative overflow-hidden">
            <img 
              src={food.image} 
              alt={food.name}
              className="w-full h-48 object-cover"
            />
            {food.isHealthy && (
              <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Healthy
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-[#1a1a2e] text-lg line-clamp-1">{food.name}</h3>
              <span className="text-[#ffc107] font-bold">₹{food.price}</span>
            </div>
            
            <p className="text-[#6c757d] text-sm mb-3 line-clamp-2">{food.description}</p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-[#1a1a2e] text-sm">{food.rating}</span>
                <span className="text-[#6c757d] text-sm ml-1">({food.reviewCount})</span>
              </div>
              <span className="text-[#6c757d] text-sm">{food.restaurant}</span>
            </div>
          </div>
        </Link>
        
        <div className="p-4 pt-0">
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 py-2 text-sm"
            >
              Add to Cart
            </button>
            <Link 
              to={`/recipe/${createSlug(food.name)}`}
              className="btn btn-outline px-4 py-2 text-sm"
            >
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;