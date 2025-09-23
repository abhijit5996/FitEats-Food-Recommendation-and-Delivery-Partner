import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import RecipeCard from '../components/RecipeCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { endpoints } from '../config/api';

// Import all food images (same as in HomePage)
// Import all food images
import PaneerTikkaMasala from '../assets/images/paneer-tikka-masala.jpg';
import PalakPaneer from '../assets/images/palak-paneer.jpg';
import DalMakhani from '../assets/images/dal-makhani.jpg';
import CholeBhature from '../assets/images/chole-bhature.jpg';
import AlooGobi from '../assets/images/aloo-gobi.jpg';
import MalaiKofta from '../assets/images/malai-kofta.jpg';
import NavratanKorma from '../assets/images/navratan-korma.jpg';
import ShahiPaneer from '../assets/images/shahi-paneer.jpg';
import VegPulao from '../assets/images/veg-pulao.jpg';
import JeeraRice from '../assets/images/jeera-rice.jpg';
import TandooriRoti from '../assets/images/tandoori-roti.jpg';
import ButterNaan from '../assets/images/butter-naan.jpg';
import PaneerBhurji from '../assets/images/paneer-bhurji.jpg';
import RajmaChawal from '../assets/images/rajma-chawal.jpg';
import MushroomMatar from '../assets/images/mushroom-matar.jpg';
import KadhiPakora from '../assets/images/kadhi-pakora.jpg';
import StuffedParatha from '../assets/images/stuffed-paratha.jpg';
import VegetableBiryani from '../assets/images/vegetable-biryani.jpg';
import ButterChicken from '../assets/images/butter-chicken.jpg';
import ChickenTikkaMasala from '../assets/images/chicken-tikka-masala.jpg';
import RoganJosh from '../assets/images/rogan-josh.jpg';
import TandooriChicken from '../assets/images/tandoori-chicken.jpg';
import ChickenKorma from '../assets/images/chicken-korma.jpg';
import MuttonSeekhKebab from '../assets/images/mutton-seekh-kebab.jpg';
import FishAmritsari from '../assets/images/fish-amritsari.jpg';
import KeemaMatar from '../assets/images/keema-matar.jpg';
import ChickenBiryani from '../assets/images/chicken-biryani.jpg';
import EggCurry from '../assets/images/egg-curry.jpg';
import ChickenSeekhKebab from '../assets/images/chicken-seekh-kebab.jpg';
import MasalaDosa from '../assets/images/masala-dosa.jpg';
import IdliSambar from '../assets/images/idli-sambar.jpg';
import MeduVada from '../assets/images/medu-vada.jpg';
import Pongal from '../assets/images/pongal.jpg';
import Uttapam from '../assets/images/uttapam.jpg';
import RavaDosa from '../assets/images/rava-dosa.jpg';
import BisiBeleBath from '../assets/images/bisi-bele-bath.jpg';
import LemonRice from '../assets/images/lemon-rice.jpg';
import CurdRice from '../assets/images/curd-rice.jpg';
import Avial from '../assets/images/avial.jpg';
import Poriyal from '../assets/images/poriyal.jpg';
import ChickenChettinad from '../assets/images/chicken-chettinad.jpg';
import AndhraChilliChicken from '../assets/images/andhra-chilli-chicken.jpg';
import MalabarFishCurry from '../assets/images/malabar-fish-curry.jpg';
import HyderabadiMuttonBiryani from '../assets/images/hyderabadi-mutton-biryani.jpg';
import KeralaPrawnCurry from '../assets/images/kerala-prawn-curry.jpg';
import EggDosa from '../assets/images/egg-dosa.jpg';
import VegManchurian from '../assets/images/veg-manchurian.jpg';
import GobiManchurian from '../assets/images/gobi-manchurian.jpg';
import ChilliPaneer from '../assets/images/chilli-paneer.jpg';
import VegHakkaNoodles from '../assets/images/veg-hakka-noodles.jpg';
import VegFriedRice from '../assets/images/veg-fried-rice.jpg';
import SpringRolls from '../assets/images/spring-rolls.jpg';
import StirFriedTofu from '../assets/images/stir-fried-tofu.jpg';
import SweetSourVegetables from '../assets/images/sweet-sour-vegetables.jpg';
import AmericanChopsuey from '../assets/images/american-chopsuey.jpg';
import ChilliChicken from '../assets/images/chilli-chicken.jpg';
import ChickenManchurian from '../assets/images/chicken-manchurian.jpg';
import SchezwanFriedRice from '../assets/images/schezwan-fried-rice.jpg';
import ChickenHakkaNoodles from '../assets/images/chicken-hakka-noodles.jpg';
import SweetSourChicken from '../assets/images/sweet-sour-chicken.jpg';
import DragonChicken from '../assets/images/dragon-chicken.jpg';
import EggFriedRice from '../assets/images/egg-fried-rice.jpg';
import FishHotGarlicSauce from '../assets/images/fish-hot-garlic-sauce.jpg';
import MargheritaPizza from '../assets/images/margherita-pizza.jpg';
import VeggieDelightPizza from '../assets/images/veggie-delight-pizza.jpg';
import PastaArrabiata from '../assets/images/pasta-arrabiata.jpg';
import PastaAlfredo from '../assets/images/pasta-alfredo.jpg';
import PestoPasta from '../assets/images/pesto-pasta.jpg';
import GarlicBreadCheese from '../assets/images/garlic-bread-cheese.jpg';
import MushroomRisotto from '../assets/images/mushroom-risotto.jpg';
import VegLasagna from '../assets/images/veg-lasagna.jpg';
import Bruschetta from '../assets/images/bruschetta.jpg';
import PepperoniPizza from '../assets/images/pepperoni-pizza.jpg';
import ChickenSausagePizza from '../assets/images/chicken-sausage-pizza.jpg';
import SpaghettiBolognese from '../assets/images/spaghetti-bolognese.jpg';
import ChickenLasagna from '../assets/images/chicken-lasagna.jpg';
import GrilledChickenPasta from '../assets/images/grilled-chicken-pasta.jpg';
import VegAuGratin from '../assets/images/veg-au-gratin.jpg';
import CreamMushroomSoup from '../assets/images/cream-mushroom-soup.jpg';
import VegStroganoff from '../assets/images/veg-stroganoff.jpg';
import MashedPotatoes from '../assets/images/mashed-potatoes.jpg';
import SauteedVegetables from '../assets/images/sauteed-vegetables.jpg';
import CornSpinachSandwich from '../assets/images/corn-spinach-sandwich.jpg';
import GrilledFishLemonButter from '../assets/images/grilled-fish-lemon-butter.jpg';
import ChickenSteakMashedPotatoes from '../assets/images/chicken-steak-mashed-potatoes.jpg';
import ShepherdsPie from '../assets/images/shepherds-pie.jpg';
import FishAndChips from '../assets/images/fish-and-chips.jpg';
import Omelette from '../assets/images/omelette.jpg';
import ScrambledEggs from '../assets/images/scrambled-eggs.jpg';
import ChickenCaesarSalad from '../assets/images/chicken-caesar-salad.jpg';
import AlooPosto from '../assets/images/aloo-posto.jpg';
import Shukto from '../assets/images/shukto.jpg';
import DhokarDalna from '../assets/images/dhokar-dalna.jpg';
import CholarDal from '../assets/images/cholar-dal.jpg';
import Luchi from '../assets/images/luchi.jpg';
import MacherJhol from '../assets/images/macher-jhol.jpg';
import ShorsheIlish from '../assets/images/shorshe-ilish.jpg';
import ChingriMalaiCurry from '../assets/images/chingri-malai-curry.jpg';
import KoshaMangsho from '../assets/images/kosha-mangsho.jpg';
import KolkataChickenBiryani from '../assets/images/kolkata-chicken-biryani.jpg';
import Samosa from '../assets/images/samosa.jpg';
import VadaPav from '../assets/images/vada-pav.jpg';
import PavBhaji from '../assets/images/pav-bhaji.jpg';
import PaniPuri from '../assets/images/pani-puri.jpg';
import BhelPuri from '../assets/images/bhel-puri.jpg';
import Dhokla from '../assets/images/dhokla.jpg';
import Khandvi from '../assets/images/khandvi.jpg';
import FrenchFries from '../assets/images/french-fries.jpg';
import PaneerPakora from '../assets/images/paneer-pakora.jpg';
import Chicken65 from '../assets/images/chicken-65.jpg';
import ChilliPotato from '../assets/images/chilli-potato.jpg';
import Momos from '../assets/images/momos.jpg';
import GulabJamun from '../assets/images/gulab-jamun.jpg';
import Rasgulla from '../assets/images/rasgulla.jpg';
import Jalebi from '../assets/images/jalebi.jpg';
import Kheer from '../assets/images/kheer.jpg';
import GajarKaHalwa from '../assets/images/gajar-ka-halwa.jpg';
import Kulfi from '../assets/images/kulfi.jpg';
import ChocolateBrownie from '../assets/images/chocolate-brownie.jpg';
import Cheesecake from '../assets/images/cheesecake.jpg';
import Tiramisu from '../assets/images/tiramisu.jpg';
import FruitSalad from '../assets/images/fruit-salad.jpg';

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