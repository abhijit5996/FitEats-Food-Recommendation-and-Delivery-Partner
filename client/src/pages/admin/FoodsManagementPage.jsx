import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { endpoints } from '../../config/api';

// Import all available food images
import {
  // North Indian
  PaneerTikkaMasala, PalakPaneer, DalMakhani, CholeBhature, AlooGobi, MalaiKofta, NavratanKorma, ShahiPaneer,
  VegPulao, JeeraRice, TandooriRoti, ButterNaan, PaneerBhurji, RajmaChawal, MushroomMatar, KadhiPakora, StuffedParatha, VegetableBiryani,
  // South Indian
  MasalaDosa, IdliSambar, MeduVada, Pongal, Uttapam, RavaDosa, BisiBeleBath, LemonRice, CurdRice, Avial, Poriyal, EggDosa,
  // Indo-Chinese
  VegManchurian, GobiManchurian, ChilliPaneer, VegHakkaNoodles, VegFriedRice, SpringRolls, StirFriedTofu, SweetSourVegetables,
  AmericanChopsuey, ChilliChicken, ChickenManchurian, SchezwanFriedRice, ChickenHakkaNoodles, SweetSourChicken, DragonChicken, EggFriedRice, FishHotGarlicSauce,
  // Western
  MargheritaPizza, VeggieDelightPizza, PastaArrabiata, PastaAlfredo, PestoPasta, GarlicBreadCheese, MushroomRisotto, VegLasagna,
  Bruschetta, PepperoniPizza, ChickenSausagePizza, SpaghettiBolognese, ChickenLasagna, GrilledChickenPasta, VegAuGratin,
  // Bengali/Eastern
  AlooPosto, Shukto, DhokarDalna, CholarDal, Luchi, MacherJhol, ShorsheIlish, ChingriMalaiCurry, KoshaMangsho, KolkataChickenBiryani,
  // Street Food
  Samosa, VadaPav, PavBhaji, PaniPuri, BhelPuri, Dhokla, Khandvi, FrenchFries, PaneerPakora, Chicken65, ChilliPotato, Momos,
  // Desserts
  GulabJamun, Rasgulla, Jalebi, Kheer, GajarKaHalwa, Kulfi, ChocolateBrownie, Cheesecake, Tiramisu, FruitSalad,
} from '../../assets/images';

// Image mapping for selection
const foodImages = {
  // North Indian
  'paneer-tikka-masala': PaneerTikkaMasala,
  'palak-paneer': PalakPaneer,
  'dal-makhani': DalMakhani,
  'chole-bhature': CholeBhature,
  'aloo-gobi': AlooGobi,
  'malai-kofta': MalaiKofta,
  'navratan-korma': NavratanKorma,
  'shahi-paneer': ShahiPaneer,
  'veg-pulao': VegPulao,
  'jeera-rice': JeeraRice,
  'tandoori-roti': TandooriRoti,
  'butter-naan': ButterNaan,
  'paneer-bhurji': PaneerBhurji,
  'rajma-chawal': RajmaChawal,
  'mushroom-matar': MushroomMatar,
  'kadhi-pakora': KadhiPakora,
  'stuffed-paratha': StuffedParatha,
  'vegetable-biryani': VegetableBiryani,
  // South Indian
  'masala-dosa': MasalaDosa,
  'idli-sambar': IdliSambar,
  'medu-vada': MeduVada,
  'pongal': Pongal,
  'uttapam': Uttapam,
  'rava-dosa': RavaDosa,
  'bisi-bele-bath': BisiBeleBath,
  'lemon-rice': LemonRice,
  'curd-rice': CurdRice,
  'avial': Avial,
  'poriyal': Poriyal,
  'egg-dosa': EggDosa,
  // Indo-Chinese
  'veg-manchurian': VegManchurian,
  'gobi-manchurian': GobiManchurian,
  'chilli-paneer': ChilliPaneer,
  'veg-hakka-noodles': VegHakkaNoodles,
  'veg-fried-rice': VegFriedRice,
  'spring-rolls': SpringRolls,
  'stir-fried-tofu': StirFriedTofu,
  'sweet-sour-vegetables': SweetSourVegetables,
  'american-chopsuey': AmericanChopsuey,
  'chilli-chicken': ChilliChicken,
  'chicken-manchurian': ChickenManchurian,
  'schezwan-fried-rice': SchezwanFriedRice,
  'chicken-hakka-noodles': ChickenHakkaNoodles,
  'sweet-sour-chicken': SweetSourChicken,
  'dragon-chicken': DragonChicken,
  'egg-fried-rice': EggFriedRice,
  'fish-hot-garlic-sauce': FishHotGarlicSauce,
  // Western
  'margherita-pizza': MargheritaPizza,
  'veggie-delight-pizza': VeggieDelightPizza,
  'pasta-arrabiata': PastaArrabiata,
  'pasta-alfredo': PastaAlfredo,
  'pesto-pasta': PestoPasta,
  'garlic-bread-cheese': GarlicBreadCheese,
  'mushroom-risotto': MushroomRisotto,
  'veg-lasagna': VegLasagna,
  'bruschetta': Bruschetta,
  'pepperoni-pizza': PepperoniPizza,
  'chicken-sausage-pizza': ChickenSausagePizza,
  'spaghetti-bolognese': SpaghettiBolognese,
  'chicken-lasagna': ChickenLasagna,
  'grilled-chicken-pasta': GrilledChickenPasta,
  'veg-au-gratin': VegAuGratin,
  // Bengali/Eastern
  'aloo-posto': AlooPosto,
  'shukto': Shukto,
  'dhokar-dalna': DhokarDalna,
  'cholar-dal': CholarDal,
  'luchi': Luchi,
  'macher-jhol': MacherJhol,
  'shorshe-ilish': ShorsheIlish,
  'chingri-malai-curry': ChingriMalaiCurry,
  'kosha-mangsho': KoshaMangsho,
  'kolkata-chicken-biryani': KolkataChickenBiryani,
  // Street Food
  'samosa': Samosa,
  'vada-pav': VadaPav,
  'pav-bhaji': PavBhaji,
  'pani-puri': PaniPuri,
  'bhel-puri': BhelPuri,
  'dhokla': Dhokla,
  'khandvi': Khandvi,
  'french-fries': FrenchFries,
  'paneer-pakora': PaneerPakora,
  'chicken-65': Chicken65,
  'chilli-potato': ChilliPotato,
  'momos': Momos,
  // Desserts
  'gulab-jamun': GulabJamun,
  'rasgulla': Rasgulla,
  'jalebi': Jalebi,
  'kheer': Kheer,
  'gajar-ka-halwa': GajarKaHalwa,
  'kulfi': Kulfi,
  'chocolate-brownie': ChocolateBrownie,
  'cheesecake': Cheesecake,
  'tiramisu': Tiramisu,
  'fruit-salad': FruitSalad,
};

const FoodsManagementPage = () => {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRestaurant, setFilterRestaurant] = useState('');
  const { getAuthHeaders } = useAdmin();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    selectedImageKey: '',
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

  const [recipeData, setRecipeData] = useState({
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 2,
    difficulty: 'Medium',
    instructions: '',
    tips: '',
    cuisine: 'Indian'
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

  const handleRecipeChange = (e) => {
    const { name, value } = e.target;
    setRecipeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const foodData = {
      ...formData,
      price: parseFloat(formData.price),
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(i => i),
      allergens: formData.allergens.split(',').map(a => a.trim()).filter(a => a),
      // Set image to the selected image path
      image: formData.selectedImageKey ? foodImages[formData.selectedImageKey] : formData.image,
      nutritionalInfo: {
        calories: formData.nutritionalInfo.calories ? parseFloat(formData.nutritionalInfo.calories) : undefined,
        protein: formData.nutritionalInfo.protein ? parseFloat(formData.nutritionalInfo.protein) : undefined,
        carbs: formData.nutritionalInfo.carbs ? parseFloat(formData.nutritionalInfo.carbs) : undefined,
        fat: formData.nutritionalInfo.fat ? parseFloat(formData.nutritionalInfo.fat) : undefined,
        fiber: formData.nutritionalInfo.fiber ? parseFloat(formData.nutritionalInfo.fiber) : undefined,
      },
      // Recipe fields
      prepTime: recipeData.prepTime,
      cookTime: recipeData.cookTime,
      servings: parseInt(recipeData.servings),
      difficulty: recipeData.difficulty,
      instructions: recipeData.instructions.split('\n').map(i => i.trim()).filter(i => i),
      tips: recipeData.tips.split('\n').map(t => t.trim()).filter(t => t),
      cuisine: recipeData.cuisine
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
      selectedImageKey: '',
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
    setRecipeData({
      prepTime: food.prepTime || '15 mins',
      cookTime: food.cookTime || '30 mins',
      servings: food.servings || 2,
      difficulty: food.difficulty || 'Medium',
      instructions: food.instructions ? food.instructions.join('\n') : '',
      tips: food.tips ? food.tips.join('\n') : '',
      cuisine: food.cuisine || 'Indian'
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
      selectedImageKey: '',
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
    setRecipeData({
      prepTime: '15 mins',
      cookTime: '30 mins',
      servings: 2,
      difficulty: 'Medium',
      instructions: '',
      tips: '',
      cuisine: 'Indian'
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

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <h3 className="text-lg font-medium text-white">Recipe Details</h3>
                      <p className="text-sm text-gray-400">Add cooking instructions, ingredients, and tips</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRecipeModal(true)}
                      className="px-6 py-2 bg-[#ffc107] text-[#1a1a2e] font-medium rounded-lg hover:bg-[#ffc107]/90 transition-all flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Recipe
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Select Food Image *
                    </label>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-4 max-h-60 overflow-y-auto bg-white/5 p-3 rounded-lg">
                      {Object.entries(foodImages).map(([key, imagePath]) => (
                        <div
                          key={key}
                          onClick={() => setFormData(prev => ({ ...prev, selectedImageKey: key, image: imagePath }))}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            formData.selectedImageKey === key
                              ? 'border-[#ffc107] ring-2 ring-[#ffc107]/50'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <img
                            src={imagePath}
                            alt={key.replace(/-/g, ' ')}
                            className="w-full h-16 object-cover"
                          />
                          {formData.selectedImageKey === key && (
                            <div className="absolute inset-0 bg-[#ffc107]/20 flex items-center justify-center">
                              <svg className="w-6 h-6 text-[#ffc107]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {formData.selectedImageKey && (
                      <div className="text-sm text-gray-300">
                        Selected: <span className="text-[#ffc107] font-medium">{formData.selectedImageKey.replace(/-/g, ' ')}</span>
                      </div>
                    )}
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

      {/* Recipe Modal */}
      {showRecipeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1a1a2e] to-[#2c2c54] border border-white/20 shadow-2xl rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#ffc107] to-[#ff6b35] px-6 py-4 sticky top-0">
              <h3 className="text-xl font-bold text-[#1a1a2e]">
                Add Recipe Details
              </h3>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); setShowRecipeModal(false); }} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Prep Time (minutes)
                    </label>
                    <input
                      type="number"
                      name="prepTime"
                      value={recipeData.prepTime}
                      onChange={handleRecipeChange}
                      min="0"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Cook Time (minutes)
                    </label>
                    <input
                      type="number"
                      name="cookTime"
                      value={recipeData.cookTime}
                      onChange={handleRecipeChange}
                      min="0"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Servings
                    </label>
                    <input
                      type="number"
                      name="servings"
                      value={recipeData.servings}
                      onChange={handleRecipeChange}
                      min="1"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                      placeholder="4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Difficulty
                    </label>
                    <select
                      name="difficulty"
                      value={recipeData.difficulty}
                      onChange={handleRecipeChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                    >
                      <option value="" className="bg-gray-800">Select difficulty</option>
                      <option value="Easy" className="bg-gray-800">Easy</option>
                      <option value="Medium" className="bg-gray-800">Medium</option>
                      <option value="Hard" className="bg-gray-800">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Cuisine Type
                  </label>
                  <input
                    type="text"
                    name="cuisine"
                    value={recipeData.cuisine}
                    onChange={handleRecipeChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all"
                    placeholder="Italian, Mexican, Asian, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Instructions (one per line)
                  </label>
                  <textarea
                    name="instructions"
                    value={recipeData.instructions}
                    onChange={handleRecipeChange}
                    rows="6"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all resize-vertical"
                    placeholder="1. Preheat oven to 375°F&#10;2. Mix ingredients in a bowl&#10;3. Bake for 25 minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Tips (one per line, optional)
                  </label>
                  <textarea
                    name="tips"
                    value={recipeData.tips}
                    onChange={handleRecipeChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all resize-vertical"
                    placeholder="For extra crispiness, use parchment paper&#10;Can be made ahead and reheated"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowRecipeModal(false)}
                    className="px-6 py-3 text-sm font-medium text-gray-300 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-[#1a1a2e] bg-gradient-to-r from-[#ffc107] to-[#ff6b35] rounded-lg hover:from-[#e6ac00] hover:to-[#e55a2b] transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Save Recipe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodsManagementPage;