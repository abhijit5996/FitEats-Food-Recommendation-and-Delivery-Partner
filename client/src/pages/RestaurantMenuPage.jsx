import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import FoodCard from '../components/ui/FoodCard';
import { motion } from 'framer-motion';

// Import all food images (keep your existing imports)
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


const RestaurantMenuPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  
  const preferences = user?.unsafeMetadata?.preferences || {};
  
  // Sample restaurant data with their specific menu items
  const restaurantsData = [
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
      menuItems: [
        {
          id: 101,
          name: 'Margherita Pizza',
          description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil',
          price: 199,
          image: MargheritaPizza,
          rating: 4.5,
          reviewCount: 1200,
          isHealthy: false,
          category: 'pizza'
        },
        {
          id: 102,
          name: 'Pepperoni Pizza',
          description: 'Classic pizza topped with tomato sauce, mozzarella, and spicy pepperoni',
          price: 299,
          image: PepperoniPizza,
          rating: 4.7,
          reviewCount: 1850,
          isHealthy: false,
          category: 'pizza'
        },
        {
          id: 103,
          name: 'Veggie Supreme Pizza',
          description: 'Pizza loaded with fresh vegetables and cheese',
          price: 349,
          image: VeggieDelightPizza,
          rating: 4.4,
          reviewCount: 950,
          isHealthy: true,
          category: 'pizza'
        },
        {
          id: 104,
          name: 'Garlic Bread',
          description: 'Toasted bread topped with garlic butter and herbs',
          price: 99,
          image: GarlicBreadCheese,
          rating: 4.6,
          reviewCount: 2100,
          isHealthy: false,
          category: 'sides'
        },
        {
          id: 105,
          name: 'Choco Lava Cake',
          description: 'Warm chocolate cake with a molten chocolate center',
          price: 149,
          image: ChocolateBrownie,
          rating: 4.8,
          reviewCount: 1750,
          isHealthy: false,
          category: 'desserts'
        }
      ]
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
      menuItems: [
        {
          id: 201,
          name: 'Pan Pizza',
          description: 'Thick, chewy crust pizza with your choice of toppings',
          price: 349,
          image: PepperoniPizza,
          rating: 4.3,
          reviewCount: 1450,
          isHealthy: false,
          category: 'pizza'
        },
        {
          id: 202,
          name: 'Stuffed Crust Pizza',
          description: 'Pizza with cheese-filled crust',
          price: 449,
          image: VeggieDelightPizza,
          rating: 4.5,
          reviewCount: 1650,
          isHealthy: false,
          category: 'pizza'
        },
        {
          id: 203,
          name: 'Pasta Alfredo',
          description: 'Creamy pasta with parmesan cheese sauce',
          price: 249,
          image: PastaAlfredo,
          rating: 4.2,
          reviewCount: 850,
          isHealthy: false,
          category: 'pasta'
        },
        {
          id: 204,
          name: 'Cheesy Breadsticks',
          description: 'Soft breadsticks topped with melted cheese',
          price: 149,
          image: GarlicBreadCheese,
          rating: 4.4,
          reviewCount: 1200,
          isHealthy: false,
          category: 'sides'
        }
      ]
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
      menuItems: [
        {
          id: 301,
          name: 'Big Mac',
          description: 'The iconic burger with two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun',
          price: 199,
          image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=300&fit=crop',
          rating: 4.5,
          reviewCount: 3200,
          isHealthy: false,
          category: 'burgers'
        },
        {
          id: 302,
          name: 'McChicken',
          description: 'Crispy chicken patty with mayonnaise and shredded lettuce',
          price: 149,
          image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
          rating: 4.2,
          reviewCount: 1850,
          isHealthy: false,
          category: 'burgers'
        },
        {
          id: 303,
          name: 'French Fries',
          description: 'World famous golden fries, perfectly salted',
          price: 99,
          image: FrenchFries,
          rating: 4.8,
          reviewCount: 4500,
          isHealthy: false,
          category: 'sides'
        },
        {
          id: 304,
          name: 'Apple Pie',
          description: 'Warm, crispy apple pie dessert',
          price: 79,
          image: 'https://images.unsplash.com/photo-1561620626-7e93c6b0e6ef?w=400&h=300&fit=crop',
          rating: 4.3,
          reviewCount: 1250,
          isHealthy: false,
          category: 'desserts'
        }
      ]
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
      menuItems: [
        {
          id: 401,
          name: 'Whopper',
          description: 'Flame-grilled beef patty with tomatoes, lettuce, mayo, ketchup, pickles, and onions on a sesame seed bun',
          price: 219,
          image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
          rating: 4.6,
          reviewCount: 2450,
          isHealthy: false,
          category: 'burgers'
        },
        {
          id: 402,
          name: 'Chicken Royale',
          description: 'Crispy chicken fillet with fresh lettuce and creamy mayo',
          price: 179,
          image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
          rating: 4.3,
          reviewCount: 1650,
          isHealthy: false,
          category: 'burgers'
        },
        {
          id: 403,
          name: 'Onion Rings',
          description: 'Crispy battered onion rings',
          price: 129,
          image: 'https://images.unsplash.com/photo-1632773686826-1ca60c4fdf3d?w=400&h=300&fit=crop',
          rating: 4.2,
          reviewCount: 950,
          isHealthy: false,
          category: 'sides'
        }
      ]
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
      menuItems: [
        {
          id: 501,
          name: 'Original Recipe Chicken',
          description: 'KFC\'s signature chicken with 11 herbs and spices',
          price: 299,
          image: TandooriChicken,
          rating: 4.7,
          reviewCount: 3250,
          isHealthy: false,
          category: 'chicken'
        },
        {
          id: 502,
          name: 'Hot & Crispy Chicken',
          description: 'Spicy, crispy chicken with a kick',
          price: 279,
          image: Chicken65,
          rating: 4.5,
          reviewCount: 2150,
          isHealthy: false,
          category: 'chicken'
        },
        {
          id: 503,
          name: 'Chicken Zinger Burger',
          description: 'Crispy chicken fillet with mayo and lettuce in a soft bun',
          price: 189,
          image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
          rating: 4.4,
          reviewCount: 1850,
          isHealthy: false,
          category: 'burgers'
        },
        {
          id: 504,
          name: 'Coleslaw',
          description: 'Creamy cabbage and carrot salad',
          price: 99,
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
          rating: 4.1,
          reviewCount: 1250,
          isHealthy: true,
          category: 'sides'
        }
      ]
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
      menuItems: [
        {
          id: 601,
          name: 'Veggie Delite Sandwich',
          description: 'Fresh vegetables on your choice of bread',
          price: 179,
          image: CornSpinachSandwich,
          rating: 4.2,
          reviewCount: 1450,
          isHealthy: true,
          category: 'sandwiches'
        },
        {
          id: 602,
          name: 'Chicken Teriyaki Sandwich',
          description: 'Grilled chicken with teriyaki glaze and vegetables',
          price: 249,
          image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
          rating: 4.5,
          reviewCount: 1850,
          isHealthy: true,
          category: 'sandwiches'
        },
        {
          id: 603,
          name: 'Turkey Breast Sandwich',
          description: 'Lean turkey breast with fresh vegetables',
          price: 229,
          image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
          rating: 4.3,
          reviewCount: 1250,
          isHealthy: true,
          category: 'sandwiches'
        },
        {
          id: 604,
          name: 'Fresh Salads',
          description: 'Customizable salads with your choice of ingredients',
          price: 199,
          image: ChickenCaesarSalad,
          rating: 4.4,
          reviewCount: 950,
          isHealthy: true,
          category: 'salads'
        }
      ]
    },
    {
    "id": 7,
    "name": "Wow! Momo",
    "image": "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=400&h=300&fit=crop",
    "rating": 4.3,
    "reviewCount": 5400,
    "location": "Chinese, Tibetan",
    "deliveryTime": "25-35",
    "distance": "1.7",
    "cuisines": ["Chinese", "Tibetan", "Momos"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 112,
        "name": "Momos (Veg/Chicken)",
        "description": "Steamed or fried dumplings filled with vegetables or chicken, served with spicy chutney.",
        "price": 150,
        "image": "Momos",
        "rating": 4.8,
        "reviewCount": 225,
        "isHealthy": true,
        "category": "momos"
      },
      {
        "id": 47,
        "name": "Veg Manchurian (Dry/Gravy)",
        "description": "Vegetable balls in a spicy, tangy, and slightly sweet Manchurian sauce.",
        "price": 260,
        "image": "VegManchurian",
        "rating": 4.5,
        "reviewCount": 155,
        "isHealthy": true,
        "category": "chinese"
      },
      {
        "id": 48,
        "name": "Gobi Manchurian",
        "description": "Crispy cauliflower florets tossed in a spicy, tangy Manchurian sauce.",
        "price": 240,
        "image": "GobiManchurian",
        "rating": 4.8,
        "reviewCount": 178,
        "isHealthy": false,
        "category": "chinese"
      },
      {
        "id": 49,
        "name": "Chilli Paneer",
        "description": "Crispy fried paneer cubes tossed with onions, capsicum in a spicy sauce.",
        "price": 280,
        "image": "ChilliPaneer",
        "rating": 4.7,
        "reviewCount": 162,
        "isHealthy": true,
        "category": "chinese"
      },
      {
        "id": 50,
        "name": "Veg Hakka Noodles",
        "description": "Stir-fried noodles with fresh vegetables and classic Chinese seasonings.",
        "price": 200,
        "image": "VegHakkaNoodles",
        "rating": 4.3,
        "reviewCount": 135,
        "isHealthy": true,
        "category": "noodles"
      },
      {
        "id": 51,
        "name": "Veg Fried Rice",
        "description": "Stir-fried rice with a mix of vegetables, seasoned with soy sauce.",
        "price": 190,
        "image": "VegFriedRice",
        "rating": 4.2,
        "reviewCount": 128,
        "isHealthy": true,
        "category": "rice"
      }
    ]
  },
  {
    "id": 8,
    "name": "Faasos / EatSure",
    "image": "https://images.unsplash.com/photo-1642165380129-2cbeb5ed8b89?w=400&h=300&fit=crop",
    "rating": 4.2,
    "reviewCount": 6500,
    "location": "Wraps, Bowls",
    "deliveryTime": "30-40",
    "distance": "2.4",
    "cuisines": ["Wraps", "North Indian", "Bowls"],
    "isHealthFocused": true,
    "menuItems": [
      {
        "id": 83,
        "name": "Corn and Spinach Sandwich",
        "description": "A healthy and delicious sandwich filled with sweet corn and spinach.",
        "price": 170,
        "image": "CornSpinachSandwich",
        "rating": 4.3,
        "reviewCount": 102,
        "isHealthy": true,
        "category": "wraps"
      },
      {
        "id": 90,
        "name": "Chicken Caesar Salad",
        "description": "Crisp romaine lettuce with grilled chicken, parmesan, croutons, and Caesar dressing.",
        "price": 280,
        "image": "ChickenCaesarSalad",
        "rating": 4.5,
        "reviewCount": 132,
        "isHealthy": true,
        "category": "salads"
      },
      {
        "id": 1,
        "name": "Paneer Tikka Masala",
        "description": "Cubes of paneer marinated and grilled, simmered in a rich, creamy tomato gravy.",
        "price": 320,
        "image": "PaneerTikkaMasala",
        "rating": 4.6,
        "reviewCount": 125,
        "isHealthy": true,
        "category": "bowls"
      },
      {
        "id": 3,
        "name": "Dal Makhani",
        "description": "Creamy black lentils and kidney beans slow-cooked with butter and spices.",
        "price": 250,
        "image": "DalMakhani",
        "rating": 4.7,
        "reviewCount": 142,
        "isHealthy": true,
        "category": "bowls"
      },
      {
        "id": 14,
        "name": "Rajma Chawal",
        "description": "Red kidney bean curry in a thick gravy, served with steamed rice.",
        "price": 230,
        "image": "RajmaChawal",
        "rating": 4.8,
        "reviewCount": 175,
        "isHealthy": true,
        "category": "bowls"
      },
      {
        "id": 122,
        "name": "Fruit Salad",
        "description": "A refreshing mix of fresh seasonal fruits, a healthy and light dessert option.",
        "price": 150,
        "image": "FruitSalad",
        "rating": 4.5,
        "reviewCount": 132,
        "isHealthy": true,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 9,
    "name": "Behrouz Biryani",
    "image": "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop",
    "rating": 4.5,
    "reviewCount": 8900,
    "location": "North Indian, Biryani",
    "deliveryTime": "40-50",
    "distance": "3.1",
    "cuisines": ["North Indian", "Biryani", "Mughlai"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 27,
        "name": "Chicken Biryani",
        "description": "Layered rice dish with marinated chicken, fragrant spices, and saffron.",
        "price": 350,
        "image": "ChickenBiryani",
        "rating": 4.9,
        "reviewCount": 222,
        "isHealthy": true,
        "category": "biryani"
      },
      {
        "id": 44,
        "name": "Hyderabadi Mutton Biryani",
        "description": "A world-famous layered biryani with marinated mutton and long-grained rice.",
        "price": 450,
        "image": "HyderabadiMuttonBiryani",
        "rating": 4.9,
        "reviewCount": 195,
        "isHealthy": false,
        "category": "biryani"
      },
      {
        "id": 100,
        "name": "Kolkata Chicken Biryani",
        "description": "Fragrant biryani with chicken, potatoes, and eggs, flavored with rose water.",
        "price": 370,
        "image": "KolkataChickenBiryani",
        "rating": 4.9,
        "reviewCount": 195,
        "isHealthy": false,
        "category": "biryani"
      },
      {
        "id": 18,
        "name": "Vegetable Biryani",
        "description": "Fragrant basmati rice layered with marinated vegetables and cooked to perfection.",
        "price": 270,
        "image": "VegetableBiryani",
        "rating": 4.4,
        "reviewCount": 121,
        "isHealthy": true,
        "category": "biryani"
      },
      {
        "id": 22,
        "name": "Tandoori Chicken",
        "description": "Chicken marinated in yogurt and spices, grilled to perfection in a tandoor.",
        "price": 350,
        "image": "TandooriChicken",
        "rating": 4.8,
        "reviewCount": 187,
        "isHealthy": true,
        "category": "starters"
      },
      {
        "id": 113,
        "name": "Gulab Jamun",
        "description": "Soft, deep-fried milk solids dumplings soaked in a sweet, rose-flavored sugar syrup.",
        "price": 120,
        "image": "GulabJamun",
        "rating": 4.9,
        "reviewCount": 198,
        "isHealthy": false,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 10,
    "name": "OvenStory Pizza",
    "image": "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop",
    "rating": 4.3,
    "reviewCount": 4800,
    "location": "Italian, Pizza",
    "deliveryTime": "35-45",
    "distance": "2.8",
    "cuisines": ["Italian", "Pizza", "Gourmet"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 64,
        "name": "Margherita Pizza",
        "description": "Classic pizza with tomato sauce, fresh mozzarella, basil, and a thin crust.",
        "price": 300,
        "image": "MargheritaPizza",
        "rating": 4.5,
        "reviewCount": 167,
        "isHealthy": true,
        "category": "pizza"
      },
      {
        "id": 65,
        "name": "Veggie Delight Pizza",
        "description": "Pizza topped with a delicious mix of fresh vegetables and cheese.",
        "price": 330,
        "image": "VeggieDelightPizza",
        "rating": 4.4,
        "reviewCount": 145,
        "isHealthy": true,
        "category": "pizza"
      },
      {
        "id": 73,
        "name": "Pepperoni Pizza",
        "description": "Classic pizza topped with tomato sauce, mozzarella, and spicy pepperoni.",
        "price": 380,
        "image": "PepperoniPizza",
        "rating": 4.9,
        "reviewCount": 205,
        "isHealthy": false,
        "category": "pizza"
      },
      {
        "id": 74,
        "name": "Chicken Sausage Pizza",
        "description": "Tasty pizza topped with grilled chicken sausages, onions, and bell peppers.",
        "price": 360,
        "image": "ChickenSausagePizza",
        "rating": 4.5,
        "reviewCount": 148,
        "isHealthy": true,
        "category": "pizza"
      },
      {
        "id": 66,
        "name": "Pasta in Arrabiata Sauce (Red)",
        "description": "Pasta in a spicy tomato sauce with garlic and red chilies.",
        "price": 270,
        "image": "PastaArrabiata",
        "rating": 4.6,
        "reviewCount": 132,
        "isHealthy": true,
        "category": "pasta"
      },
      {
        "id": 68,
        "name": "Pesto Pasta",
        "description": "Pasta tossed in a fresh sauce made from basil, pine nuts, garlic, and parmesan.",
        "price": 310,
        "image": "PestoPasta",
        "rating": 4.5,
        "reviewCount": 128,
        "isHealthy": true,
        "category": "pasta"
      },
      {
        "id": 121,
        "name": "Tiramisu",
        "description": "An Italian coffee-flavored dessert with layers of ladyfingers and mascarpone cheese.",
        "price": 220,
        "image": "Tiramisu",
        "rating": 4.9,
        "reviewCount": 185,
        "isHealthy": false,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 11,
    "name": "Bikanervala",
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d7?w=400&h=300&fit=crop",
    "rating": 4.4,
    "reviewCount": 10200,
    "location": "Sweets, Snacks",
    "deliveryTime": "25-35",
    "distance": "1.9",
    "cuisines": ["North Indian", "South Indian", "Sweets", "Snacks"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 101,
        "name": "Samosa",
        "description": "Crispy, fried pastry filled with spiced potatoes and peas.",
        "price": 60,
        "image": "Samosa",
        "rating": 4.8,
        "reviewCount": 255,
        "isHealthy": false,
        "category": "snacks"
      },
      {
        "id": 104,
        "name": "Pani Puri / Golgappe",
        "description": "Hollow, crispy puris filled with spicy flavored water, tamarind chutney, and potatoes.",
        "price": 80,
        "image": "PaniPuri",
        "rating": 4.9,
        "reviewCount": 300,
        "isHealthy": false,
        "category": "snacks"
      },
      {
        "id": 105,
        "name": "Bhel Puri",
        "description": "A tangy and crunchy Mumbai street snack made with puffed rice, chutneys, and sev.",
        "price": 90,
        "image": "BhelPuri",
        "rating": 4.7,
        "reviewCount": 185,
        "isHealthy": true,
        "category": "snacks"
      },
      {
        "id": 106,
        "name": "Dhokla",
        "description": "Soft, steamed, and savory cakes made from fermented rice and chickpea batter.",
        "price": 110,
        "image": "Dhokla",
        "rating": 4.6,
        "reviewCount": 165,
        "isHealthy": true,
        "category": "snacks"
      },
      {
        "id": 113,
        "name": "Gulab Jamun",
        "description": "Soft, deep-fried milk solids dumplings soaked in a sweet, rose-flavored sugar syrup.",
        "price": 120,
        "image": "GulabJamun",
        "rating": 4.9,
        "reviewCount": 198,
        "isHealthy": false,
        "category": "sweets"
      },
      {
        "id": 114,
        "name": "Rasgulla",
        "description": "Soft, spongy cheese balls soaked in light sugar syrup, a Bengali classic.",
        "price": 110,
        "image": "Rasgulla",
        "rating": 4.8,
        "reviewCount": 175,
        "isHealthy": false,
        "category": "sweets"
      },
      {
        "id": 115,
        "name": "Jalebi",
        "description": "Deep-fried maida flour batter coiled into shapes, soaked in sugar syrup.",
        "price": 100,
        "image": "Jalebi",
        "rating": 4.7,
        "reviewCount": 162,
        "isHealthy": false,
        "category": "sweets"
      },
      {
        "id": 116,
        "name": "Kheer / Payasam",
        "description": "A creamy rice pudding made with milk, sugar, and flavored with cardamom and nuts.",
        "price": 130,
        "image": "Kheer",
        "rating": 4.7,
        "reviewCount": 155,
        "isHealthy": false,
        "category": "sweets"
      }
    ]
  },
  {
    "id": 12,
    "name": "Haldiram's",
    "image": "https://images.unsplash.com/photo-1585937421610-8d33b5b5933d?w=400&h=300&fit=crop",
    "rating": 4.5,
    "reviewCount": 13500,
    "location": "Sweets, Snacks",
    "deliveryTime": "20-30",
    "distance": "1.4",
    "cuisines": ["North Indian", "South Indian", "Sweets", "Snacks"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 101,
        "name": "Samosa",
        "description": "Crispy, fried pastry filled with spiced potatoes and peas.",
        "price": 60,
        "image": "Samosa",
        "rating": 4.8,
        "reviewCount": 255,
        "isHealthy": false,
        "category": "snacks"
      },
      {
        "id": 102,
        "name": "Vada Pav",
        "description": "A Mumbai street food staple: spicy potato fritter in a bread bun with chutneys.",
        "price": 50,
        "image": "VadaPav",
        "rating": 4.9,
        "reviewCount": 278,
        "isHealthy": false,
        "category": "snacks"
      },
      {
        "id": 103,
        "name": "Pav Bhaji",
        "description": "A spicy mashed vegetable curry served with soft buttered bread rolls.",
        "price": 150,
        "image": "PavBhaji",
        "rating": 4.9,
        "reviewCount": 245,
        "isHealthy": true,
        "category": "snacks"
      },
      {
        "id": 104,
        "name": "Pani Puri / Golgappe",
        "description": "Hollow, crispy puris filled with spicy flavored water, tamarind chutney, and potatoes.",
        "price": 80,
        "image": "PaniPuri",
        "rating": 4.9,
        "reviewCount": 300,
        "isHealthy": false,
        "category": "snacks"
      },
      {
        "id": 105,
        "name": "Bhel Puri",
        "description": "A tangy and crunchy Mumbai street snack made with puffed rice, chutneys, and sev.",
        "price": 90,
        "image": "BhelPuri",
        "rating": 4.7,
        "reviewCount": 185,
        "isHealthy": true,
        "category": "snacks"
      },
      {
        "id": 113,
        "name": "Gulab Jamun",
        "description": "Soft, deep-fried milk solids dumplings soaked in a sweet, rose-flavored sugar syrup.",
        "price": 120,
        "image": "GulabJamun",
        "rating": 4.9,
        "reviewCount": 198,
        "isHealthy": false,
        "category": "sweets"
      },
      {
        "id": 114,
        "name": "Rasgulla",
        "description": "Soft, spongy cheese balls soaked in light sugar syrup, a Bengali classic.",
        "price": 110,
        "image": "Rasgulla",
        "rating": 4.8,
        "reviewCount": 175,
        "isHealthy": false,
        "category": "sweets"
      },
      {
        "id": 115,
        "name": "Jalebi",
        "description": "Deep-fried maida flour batter coiled into shapes, soaked in sugar syrup.",
        "price": 100,
        "image": "Jalebi",
        "rating": 4.7,
        "reviewCount": 162,
        "isHealthy": false,
        "category": "sweets"
      }
    ]
  },
  {
    "id": 13,
    "name": "Taco Bell",
    "image": "https://images.unsplash.com/photo-1551504734-b464e32a163a?w=400&h=300&fit=crop",
    "rating": 4.1,
    "reviewCount": 6100,
    "location": "Mexican, Fast Food",
    "deliveryTime": "20-30",
    "distance": "2.5",
    "cuisines": ["Mexican", "Fast Food", "Tex-Mex"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 108,
        "name": "French Fries",
        "description": "Crispy, golden, and deep-fried potato strips, salted to perfection.",
        "price": 130,
        "image": "FrenchFries",
        "rating": 4.8,
        "reviewCount": 210,
        "isHealthy": false,
        "category": "sides"
      },
      {
        "id": 111,
        "name": "Chilli Potato",
        "description": "Crispy fried potato fingers tossed in a spicy, tangy, and sweet sauce.",
        "price": 160,
        "image": "ChilliPotato",
        "rating": 4.6,
        "reviewCount": 135,
        "isHealthy": false,
        "category": "sides"
      },
      {
        "id": 112,
        "name": "Momos (Veg/Chicken)",
        "description": "Steamed or fried dumplings filled with vegetables or chicken, served with spicy chutney.",
        "price": 150,
        "image": "Momos",
        "rating": 4.8,
        "reviewCount": 225,
        "isHealthy": true,
        "category": "snacks"
      },
      {
        "id": 47,
        "name": "Veg Manchurian (Dry/Gravy)",
        "description": "Vegetable balls in a spicy, tangy, and slightly sweet Manchurian sauce.",
        "price": 260,
        "image": "VegManchurian",
        "rating": 4.5,
        "reviewCount": 155,
        "isHealthy": true,
        "category": "mexican"
      },
      {
        "id": 48,
        "name": "Gobi Manchurian",
        "description": "Crispy cauliflower florets tossed in a spicy, tangy Manchurian sauce.",
        "price": 240,
        "image": "GobiManchurian",
        "rating": 4.8,
        "reviewCount": 178,
        "isHealthy": false,
        "category": "mexican"
      },
      {
        "id": 56,
        "name": "Chilli Chicken (Dry/Gravy)",
        "description": "Crispy chicken chunks tossed with onions, peppers in a hot and spicy sauce.",
        "price": 320,
        "image": "ChilliChicken",
        "rating": 4.8,
        "reviewCount": 188,
        "isHealthy": true,
        "category": "mexican"
      },
      {
        "id": 113,
        "name": "Gulab Jamun",
        "description": "Soft, deep-fried milk solids dumplings soaked in a sweet, rose-flavored sugar syrup.",
        "price": 120,
        "image": "GulabJamun",
        "rating": 4.9,
        "reviewCount": 198,
        "isHealthy": false,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 14,
    "name": "Cafe Coffee Day",
    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    "rating": 4.0,
    "reviewCount": 9500,
    "location": "Cafe, Snacks",
    "deliveryTime": "25-35",
    "distance": "0.8",
    "cuisines": ["Cafe", "Snacks", "Beverages"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 83,
        "name": "Corn and Spinach Sandwich",
        "description": "A healthy and delicious sandwich filled with sweet corn and spinach.",
        "price": 170,
        "image": "CornSpinachSandwich",
        "rating": 4.3,
        "reviewCount": 102,
        "isHealthy": true,
        "category": "sandwiches"
      },
      {
        "id": 101,
        "name": "Samosa",
        "description": "Crispy, fried pastry filled with spiced potatoes and peas.",
        "price": 60,
        "image": "Samosa",
        "rating": 4.8,
        "reviewCount": 255,
        "isHealthy": false,
        "category": "snacks"
      },
      {
        "id": 108,
        "name": "French Fries",
        "description": "Crispy, golden, and deep-fried potato strips, salted to perfection.",
        "price": 130,
        "image": "FrenchFries",
        "rating": 4.8,
        "reviewCount": 210,
        "isHealthy": false,
        "category": "snacks"
      },
      {
        "id": 119,
        "name": "Chocolate Brownie",
        "description": "A rich, dense, and fudgy chocolate dessert, often served with ice cream.",
        "price": 160,
        "image": "ChocolateBrownie",
        "rating": 4.8,
        "reviewCount": 178,
        "isHealthy": false,
        "category": "desserts"
      },
      {
        "id": 120,
        "name": "Cheesecake",
        "description": "A sweet dessert with a creamy cheese filling on a biscuit or crust base.",
        "price": 200,
        "image": "Cheesecake",
        "rating": 4.9,
        "reviewCount": 192,
        "isHealthy": false,
        "category": "desserts"
      },
      {
        "id": 121,
        "name": "Tiramisu",
        "description": "An Italian coffee-flavored dessert with layers of ladyfingers and mascarpone cheese.",
        "price": 220,
        "image": "Tiramisu",
        "rating": 4.9,
        "reviewCount": 185,
        "isHealthy": false,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 15,
    "name": "Starbucks",
    "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    "rating": 4.3,
    "reviewCount": 7800,
    "location": "Cafe, Snacks",
    "deliveryTime": "30-40",
    "distance": "1.1",
    "cuisines": ["Cafe", "Snacks", "Beverages"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 83,
        "name": "Corn and Spinach Sandwich",
        "description": "A healthy and delicious sandwich filled with sweet corn and spinach.",
        "price": 170,
        "image": "CornSpinachSandwich",
        "rating": 4.3,
        "reviewCount": 102,
        "isHealthy": true,
        "category": "sandwiches"
      },
      {
        "id": 108,
        "name": "French Fries",
        "description": "Crispy, golden, and deep-fried potato strips, salted to perfection.",
        "price": 130,
        "image": "FrenchFries",
        "rating": 4.8,
        "reviewCount": 210,
        "isHealthy": false,
        "category": "snacks"
      },
      {
        "id": 119,
        "name": "Chocolate Brownie",
        "description": "A rich, dense, and fudgy chocolate dessert, often served with ice cream.",
        "price": 160,
        "image": "ChocolateBrownie",
        "rating": 4.8,
        "reviewCount": 178,
        "isHealthy": false,
        "category": "desserts"
      },
      {
        "id": 120,
        "name": "Cheesecake",
        "description": "A sweet dessert with a creamy cheese filling on a biscuit or crust base.",
        "price": 200,
        "image": "Cheesecake",
        "rating": 4.9,
        "reviewCount": 192,
        "isHealthy": false,
        "category": "desserts"
      },
      {
        "id": 121,
        "name": "Tiramisu",
        "description": "An Italian coffee-flavored dessert with layers of ladyfingers and mascarpone cheese.",
        "price": 220,
        "image": "Tiramisu",
        "rating": 4.9,
        "reviewCount": 185,
        "isHealthy": false,
        "category": "desserts"
      },
      {
        "id": 122,
        "name": "Fruit Salad",
        "description": "A refreshing mix of fresh seasonal fruits, a healthy and light dessert option.",
        "price": 150,
        "image": "FruitSalad",
        "rating": 4.5,
        "reviewCount": 132,
        "isHealthy": true,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 16,
    "name": "Barbeque Nation",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    "rating": 4.4,
    "reviewCount": 11200,
    "location": "Buffet, Grills",
    "deliveryTime": "50-60",
    "distance": "4.2",
    "cuisines": ["Buffet", "North Indian", "Grills", "Barbecue"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 22,
        "name": "Tandoori Chicken",
        "description": "Chicken marinated in yogurt and spices, grilled to perfection in a tandoor.",
        "price": 350,
        "image": "TandooriChicken",
        "rating": 4.8,
        "reviewCount": 187,
        "isHealthy": true,
        "category": "grills"
      },
      {
        "id": 24,
        "name": "Mutton Seekh Kebab",
        "description": "Minced mutton seasoned with spices, skewered and grilled.",
        "price": 320,
        "image": "MuttonSeekhKebab",
        "rating": 4.7,
        "reviewCount": 145,
        "isHealthy": true,
        "category": "grills"
      },
      {
        "id": 29,
        "name": "Chicken Seekh Kebab",
        "description": "Minced chicken mixed with herbs and spices, skewered and grilled.",
        "price": 280,
        "image": "ChickenSeekhKebab",
        "rating": 4.6,
        "reviewCount": 132,
        "isHealthy": true,
        "category": "grills"
      },
      {
        "id": 1,
        "name": "Paneer Tikka Masala",
        "description": "Cubes of paneer marinated and grilled, simmered in a rich, creamy tomato gravy.",
        "price": 320,
        "image": "PaneerTikkaMasala",
        "rating": 4.6,
        "reviewCount": 125,
        "isHealthy": true,
        "category": "main course"
      },
      {
        "id": 19,
        "name": "Butter Chicken",
        "description": "Tender chicken pieces in a smooth, creamy, and mildly sweet tomato-based gravy.",
        "price": 380,
        "image": "ButterChicken",
        "rating": 4.9,
        "reviewCount": 245,
        "isHealthy": false,
        "category": "main course"
      },
      {
        "id": 27,
        "name": "Chicken Biryani",
        "description": "Layered rice dish with marinated chicken, fragrant spices, and saffron.",
        "price": 350,
        "image": "ChickenBiryani",
        "rating": 4.9,
        "reviewCount": 222,
        "isHealthy": true,
        "category": "biryani"
      },
      {
        "id": 113,
        "name": "Gulab Jamun",
        "description": "Soft, deep-fried milk solids dumplings soaked in a sweet, rose-flavored sugar syrup.",
        "price": 120,
        "image": "GulabJamun",
        "rating": 4.9,
        "reviewCount": 198,
        "isHealthy": false,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 17,
    "name": "Pirates of Grill",
    "image": "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=400&h=300&fit=crop",
    "rating": 4.3,
    "reviewCount": 4500,
    "location": "Buffet, Grills",
    "deliveryTime": "50-60",
    "distance": "3.8",
    "cuisines": ["Buffet", "North Indian", "Grills"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 22,
        "name": "Tandoori Chicken",
        "description": "Chicken marinated in yogurt and spices, grilled to perfection in a tandoor.",
        "price": 350,
        "image": "TandooriChicken",
        "rating": 4.8,
        "reviewCount": 187,
        "isHealthy": true,
        "category": "grills"
      },
      {
        "id": 24,
        "name": "Mutton Seekh Kebab",
        "description": "Minced mutton seasoned with spices, skewered and grilled.",
        "price": 320,
        "image": "MuttonSeekhKebab",
        "rating": 4.7,
        "reviewCount": 145,
        "isHealthy": true,
        "category": "grills"
      },
      {
        "id": 29,
        "name": "Chicken Seekh Kebab",
        "description": "Minced chicken mixed with herbs and spices, skewered and grilled.",
        "price": 280,
        "image": "ChickenSeekhKebab",
        "rating": 4.6,
        "reviewCount": 132,
        "isHealthy": true,
        "category": "grills"
      },
      {
        "id": 1,
        "name": "Paneer Tikka Masala",
        "description": "Cubes of paneer marinated and grilled, simmered in a rich, creamy tomato gravy.",
        "price": 320,
        "image": "PaneerTikkaMasala",
        "rating": 4.6,
        "reviewCount": 125,
        "isHealthy": true,
        "category": "main course"
      },
      {
        "id": 19,
        "name": "Butter Chicken",
        "description": "Tender chicken pieces in a smooth, creamy, and mildly sweet tomato-based gravy.",
        "price": 380,
        "image": "ButterChicken",
        "rating": 4.9,
        "reviewCount": 245,
        "isHealthy": false,
        "category": "main course"
      },
      {
        "id": 27,
        "name": "Chicken Biryani",
        "description": "Layered rice dish with marinated chicken, fragrant spices, and saffron.",
        "price": 350,
        "image": "ChickenBiryani",
        "rating": 4.9,
        "reviewCount": 222,
        "isHealthy": true,
        "category": "biryani"
      },
      {
        "id": 113,
        "name": "Gulab Jamun",
        "description": "Soft, deep-fried milk solids dumplings soaked in a sweet, rose-flavored sugar syrup.",
        "price": 120,
        "image": "GulabJamun",
        "rating": 4.9,
        "reviewCount": 198,
        "isHealthy": false,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 18,
    "name": "Nando's",
    "image": "https://images.unsplash.com/photo-1602881912224-5bb0bd5a01e1?w=400&h=300&fit=crop",
    "rating": 4.5,
    "reviewCount": 3200,
    "location": "Portuguese, Grilled Chicken",
    "deliveryTime": "40-50",
    "distance": "3.5",
    "cuisines": ["Portuguese", "African", "Grilled Chicken"],
    "isHealthFocused": true,
    "menuItems": [
      {
        "id": 22,
        "name": "Tandoori Chicken",
        "description": "Chicken marinated in yogurt and spices, grilled to perfection in a tandoor.",
        "price": 350,
        "image": "TandooriChicken",
        "rating": 4.8,
        "reviewCount": 187,
        "isHealthy": true,
        "category": "grilled chicken"
      },
      {
        "id": 85,
        "name": "Chicken Steak with Mashed Potatoes",
        "description": "Grilled chicken steak served with creamy mashed potatoes and gravy.",
        "price": 380,
        "image": "ChickenSteakMashedPotatoes",
        "rating": 4.7,
        "reviewCount": 148,
        "isHealthy": true,
        "category": "grilled chicken"
      },
      {
        "id": 77,
        "name": "Grilled Chicken with Pasta",
        "description": "Succulent grilled chicken breast served with a side of pasta in your choice of sauce.",
        "price": 390,
        "image": "GrilledChickenPasta",
        "rating": 4.6,
        "reviewCount": 142,
        "isHealthy": true,
        "category": "grilled chicken"
      },
      {
        "id": 81,
        "name": "Mashed Potatoes",
        "description": "Creamy, buttery mashed potatoes, perfectly seasoned.",
        "price": 150,
        "image": "MashedPotatoes",
        "rating": 4.1,
        "reviewCount": 95,
        "isHealthy": true,
        "category": "sides"
      },
      {
        "id": 82,
        "name": "Sautéed Vegetables",
        "description": "Fresh seasonal vegetables lightly sautéed in olive oil and herbs.",
        "price": 180,
        "image": "SauteedVegetables",
        "rating": 4.0,
        "reviewCount": 78,
        "isHealthy": true,
        "category": "sides"
      },
      {
        "id": 122,
        "name": "Fruit Salad",
        "description": "A refreshing mix of fresh seasonal fruits, a healthy and light dessert option.",
        "price": 150,
        "image": "FruitSalad",
        "rating": 4.5,
        "reviewCount": 132,
        "isHealthy": true,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 19,
    "name": "Chili's Grill & Bar",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    "rating": 4.4,
    "reviewCount": 2900,
    "location": "American, Mexican",
    "deliveryTime": "35-45",
    "distance": "2.9",
    "cuisines": ["American", "Mexican", "Tex-Mex"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 85,
        "name": "Chicken Steak with Mashed Potatoes",
        "description": "Grilled chicken steak served with creamy mashed potatoes and gravy.",
        "price": 380,
        "image": "ChickenSteakMashedPotatoes",
        "rating": 4.7,
        "reviewCount": 148,
        "isHealthy": true,
        "category": "american"
      },
      {
        "id": 87,
        "name": "Fish and Chips",
        "description": "Beer-battered fish fillets, deep-fried until golden, served with fries and tartar sauce.",
        "price": 340,
        "image": "FishAndChips",
        "rating": 4.5,
        "reviewCount": 165,
        "isHealthy": false,
        "category": "american"
      },
      {
        "id": 108,
        "name": "French Fries",
        "description": "Crispy, golden, and deep-fried potato strips, salted to perfection.",
        "price": 130,
        "image": "FrenchFries",
        "rating": 4.8,
        "reviewCount": 210,
        "isHealthy": false,
        "category": "sides"
      },
      {
        "id": 47,
        "name": "Veg Manchurian (Dry/Gravy)",
        "description": "Vegetable balls in a spicy, tangy, and slightly sweet Manchurian sauce.",
        "price": 260,
        "image": "VegManchurian",
        "rating": 4.5,
        "reviewCount": 155,
        "isHealthy": true,
        "category": "mexican"
      },
      {
        "id": 48,
        "name": "Gobi Manchurian",
        "description": "Crispy cauliflower florets tossed in a spicy, tangy Manchurian sauce.",
        "price": 240,
        "image": "GobiManchurian",
        "rating": 4.8,
        "reviewCount": 178,
        "isHealthy": false,
        "category": "mexican"
      },
      {
        "id": 56,
        "name": "Chilli Chicken (Dry/Gravy)",
        "description": "Crispy chicken chunks tossed with onions, peppers in a hot and spicy sauce.",
        "price": 320,
        "image": "ChilliChicken",
        "rating": 4.8,
        "reviewCount": 188,
        "isHealthy": true,
        "category": "mexican"
      },
      {
        "id": 119,
        "name": "Chocolate Brownie",
        "description": "A rich, dense, and fudgy chocolate dessert, often served with ice cream.",
        "price": 160,
        "image": "ChocolateBrownie",
        "rating": 4.8,
        "reviewCount": 178,
        "isHealthy": false,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 20,
    "name": "Mamagoto",
    "image": "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    "rating": 4.6,
    "reviewCount": 3800,
    "location": "Pan-Asian",
    "deliveryTime": "40-50",
    "distance": "4.0",
    "cuisines": ["Pan-Asian", "Chinese", "Thai", "Japanese"],
    "isHealthFocused": true,
    "menuItems": [
      {
        "id": 47,
        "name": "Veg Manchurian (Dry/Gravy)",
        "description": "Vegetable balls in a spicy, tangy, and slightly sweet Manchurian sauce.",
        "price": 260,
        "image": "VegManchurian",
        "rating": 4.5,
        "reviewCount": 155,
        "isHealthy": true,
        "category": "chinese"
      },
      {
        "id": 48,
        "name": "Gobi Manchurian",
        "description": "Crispy cauliflower florets tossed in a spicy, tangy Manchurian sauce.",
        "price": 240,
        "image": "GobiManchurian",
        "rating": 4.8,
        "reviewCount": 178,
        "isHealthy": false,
        "category": "chinese"
      },
      {
        "id": 49,
        "name": "Chilli Paneer",
        "description": "Crispy fried paneer cubes tossed with onions, capsicum in a spicy sauce.",
        "price": 280,
        "image": "ChilliPaneer",
        "rating": 4.7,
        "reviewCount": 162,
        "isHealthy": true,
        "category": "chinese"
      },
      {
        "id": 50,
        "name": "Veg Hakka Noodles",
        "description": "Stir-fried noodles with fresh vegetables and classic Chinese seasonings.",
        "price": 200,
        "image": "VegHakkaNoodles",
        "rating": 4.3,
        "reviewCount": 135,
        "isHealthy": true,
        "category": "noodles"
      },
      {
        "id": 51,
        "name": "Veg Fried Rice",
        "description": "Stir-fried rice with a mix of vegetables, seasoned with soy sauce.",
        "price": 190,
        "image": "VegFriedRice",
        "rating": 4.2,
        "reviewCount": 128,
        "isHealthy": true,
        "category": "rice"
      },
      {
        "id": 56,
        "name": "Chilli Chicken (Dry/Gravy)",
        "description": "Crispy chicken chunks tossed with onions, peppers in a hot and spicy sauce.",
        "price": 320,
        "image": "ChilliChicken",
        "rating": 4.8,
        "reviewCount": 188,
        "isHealthy": true,
        "category": "chinese"
      },
      {
        "id": 57,
        "name": "Chicken Manchurian",
        "description": "Deep-fried chicken balls in a spicy, tangy, and slightly sweet brown sauce.",
        "price": 340,
        "image": "ChickenManchurian",
        "rating": 4.7,
        "reviewCount": 165,
        "isHealthy": true,
        "category": "chinese"
      },
      {
        "id": 122,
        "name": "Fruit Salad",
        "description": "A refreshing mix of fresh seasonal fruits, a healthy and light dessert option.",
        "price": 150,
        "image": "FruitSalad",
        "rating": 4.5,
        "reviewCount": 132,
        "isHealthy": true,
        "category": "desserts"
      }
    ]
  },
  {
    "id": 21,
    "name": "Punjab Grill",
    "image": "https://images.unsplash.com/photo-1585937421610-8d33b5b5933d?w=400&h=300&fit=crop",
    "rating": 4.7,
    "reviewCount": 2100,
    "location": "North Indian, Mughlai",
    "deliveryTime": "45-55",
    "distance": "3.2",
    "cuisines": ["North Indian", "Mughlai", "Kebabs"],
    "isHealthFocused": false,
    "menuItems": [
      {
        "id": 1,
        "name": "Paneer Tikka Masala",
        "description": "Cubes of paneer marinated and grilled, simmered in a rich, creamy tomato gravy.",
        "price": 320,
        "image": "PaneerTikkaMasala",
        "rating": 4.6,
        "reviewCount": 125,
        "isHealthy": true,
        "category": "main course"
      },
      {
        "id": 19,
        "name": "Butter Chicken",
        "description": "Tender chicken pieces in a smooth, creamy, and mildly sweet tomato-based gravy.",
        "price": 380,
        "image": "ButterChicken",
        "rating": 4.9,
        "reviewCount": 245,
        "isHealthy": false,
        "category": "main course"
      },
      {
        "id": 22,
        "name": "Tandoori Chicken",
        "description": "Chicken marinated in yogurt and spices, grilled to perfection in a tandoor.",
        "price": 350,
        "image": "TandooriChicken",
        "rating": 4.8,
        "reviewCount": 187,
        "isHealthy": true,
        "category": "kebabs"
      },
      {
        "id": 24,
        "name": "Mutton Seekh Kebab",
        "description": "Minced mutton seasoned with spices, skewered and grilled.",
        "price": 320,
        "image": "MuttonSeekhKebab",
        "rating": 4.7,
        "reviewCount": 145,
        "isHealthy": true,
        "category": "kebabs"
      },
      {
        "id": 29,
        "name": "Chicken Seekh Kebab",
        "description": "Minced chicken mixed with herbs and spices, skewered and grilled.",
        "price": 280,
        "image": "ChickenSeekhKebab",
        "rating": 4.6,
        "reviewCount": 132,
        "isHealthy": true,
        "category": "kebabs"
      },
      {
        "id": 27,
        "name": "Chicken Biryani",
        "description": "Layered rice dish with marinated chicken, fragrant spices, and saffron.",
        "price": 350,
        "image": "ChickenBiryani",
        "rating": 4.9,
        "reviewCount": 222,
        "isHealthy": true,
        "category": "biryani"
      },
      {
        "id": 113,
        "name": "Gulab Jamun",
        "description": "Soft, deep-fried milk solids dumplings soaked in a sweet, rose-flavored sugar syrup.",
        "price": 120,
        "image": "GulabJamun",
        "rating": 4.9,
        "reviewCount": 198,
        "isHealthy": false,
        "category": "desserts"
      }
    ]
  },
  ];
  
  useEffect(() => {
    const fetchRestaurantAndMenu = () => {
      setLoading(true);
      
      // Find the restaurant by ID from URL params
      const restaurantId = parseInt(id);
      const foundRestaurant = restaurantsData.find(r => r.id === restaurantId);
      
      // If restaurant not found, use a default one
      const targetRestaurant = foundRestaurant || restaurantsData[0];
      
      if (targetRestaurant) {
        setRestaurant(targetRestaurant);
        setMenuItems(targetRestaurant.menuItems || []);
        setFilteredItems(targetRestaurant.menuItems || []);
      }
      setLoading(false);
    };
    
    fetchRestaurantAndMenu();
  }, [id]);
  
  useEffect(() => {
    let baseItems = activeCategory === 'all' 
      ? menuItems 
      : menuItems.filter(item => item.category === activeCategory);
    
    if (preferences && Object.keys(preferences).length > 0) {
      let filtered = [...baseItems];
      
      // Apply dietary restrictions filter
      if (preferences.dietaryRestrictions?.length > 0) {
        filtered = filtered.filter(item => 
          preferences.dietaryRestrictions.every(restriction => 
            restriction === 'Vegetarian' ? 
            (item.dietaryInfo?.includes('Vegetarian') || item.dietaryInfo?.includes('Vegan')) : 
            item.dietaryInfo?.includes(restriction)
          )
        );
      }
      
      // Apply spice level filter
      if (preferences.spiceLevel) {
        const spiceLevels = { 'None': 0, 'Mild': 1, 'Medium': 2, 'Hot': 3, 'Very Hot': 4 };
        const userSpiceLevel = spiceLevels[preferences.spiceLevel] || 0;
        filtered = filtered.filter(item => (spiceLevels[item.spiceLevel] || 0) <= userSpiceLevel);
      }
      
      // Apply medical conditions filter
      if (preferences.medicalConditions?.length > 0) {
        filtered = filtered.filter(item => {
          if (preferences.medicalConditions.includes('Diabetes')) 
            return item.dietaryInfo?.includes('Low-Carb') || (item.nutritionalInfo && item.nutritionalInfo.carbs < 30);
          if (preferences.medicalConditions.includes('Heart Disease')) 
            return item.dietaryInfo?.includes('Low-Fat') || (item.nutritionalInfo && item.nutritionalInfo.fat < 15);
          return true;
        });
      }
      
      setFilteredItems(filtered);
    } else {
      setFilteredItems(baseItems);
    }
  }, [preferences, menuItems, activeCategory]);

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };

  // Get unique categories from menu items
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="card p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Restaurant Not Found</h2>
            <p>The restaurant you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg">
            <div className="h-64 w-full bg-black">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2 text-gray-200">
                  <span className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-yellow-400 mr-1" 
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {restaurant.rating} ({restaurant.reviewCount} reviews)
                  </span>
                  <span className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {restaurant.location}
                  </span>
                  <span className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 01118 0z" />
                    </svg>
                    {restaurant.deliveryTime} min
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3 mt-3">
                  {restaurant.cuisines.map((cuisine, index) => (
                    <span key={index} className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold">
                      {cuisine}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 max-w-2xl">{restaurant.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-primary/50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {filteredItems.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { staggerChildren: 0.1 } 
              }
            }}
          >
            {filteredItems.map(item => (
              <motion.div 
                key={item.id} 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <FoodCard food={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="card p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">No Menu Items Found</h3>
            <p className="text-gray-400 mb-4">
              {activeCategory !== 'all' 
                ? `No items found in the "${activeCategory}" category.` 
                : 'No items match your dietary preferences.'
              }
            </p>
            {activeCategory !== 'all' && (
              <button 
                onClick={() => handleCategoryFilter('all')} 
                className="btn btn-primary px-6 py-2"
              >
                View All Items
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuPage;