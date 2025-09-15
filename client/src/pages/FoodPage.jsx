import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import RecipeCard from '../components/RecipeCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

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
      setLoading(true);
      
      // Same food items array as in HomePage
      const foodItems = [
        {
    id: 1,
    name: 'Paneer Tikka Masala',
    description: 'Cubes of paneer marinated and grilled, simmered in a rich, creamy tomato gravy.',
    price: 320,
    image: PaneerTikkaMasala,
    rating: 4.6,
    reviewCount: 125,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 2,
    name: 'Palak Paneer',
    description: 'Soft paneer cubes in a smooth, flavorful spinach gravy with spices.',
    price: 290,
    image: PalakPaneer,
    rating: 4.5,
    reviewCount: 118,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 3,
    name: 'Dal Makhani',
    description: 'Creamy black lentils and kidney beans slow-cooked with butter and spices.',
    price: 250,
    image: DalMakhani,
    rating: 4.7,
    reviewCount: 142,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 4,
    name: 'Chole Bhature',
    description: 'Spicy chickpea curry served with deep-fried, fluffy bread.',
    price: 180,
    image: CholeBhature,
    rating: 4.8,
    reviewCount: 205,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 5,
    name: 'Aloo Gobi',
    description: 'A classic dry dish made with potatoes and cauliflower, sautéed with Indian spices.',
    price: 220,
    image: AlooGobi,
    rating: 4.3,
    reviewCount: 95,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 6,
    name: 'Malai Kofta',
    description: 'Deep-fried vegetable or paneer balls in a rich, creamy and mildly sweet gravy.',
    price: 330,
    image: MalaiKofta,
    rating: 4.6,
    reviewCount: 110,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 7,
    name: 'Navratan Korma',
    description: 'A rich, creamy curry with nine gems - mixed vegetables and nuts in a mild gravy.',
    price: 310,
    image: NavratanKorma,
    rating: 4.4,
    reviewCount: 87,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 8,
    name: 'Shahi Paneer',
    description: 'Paneer cubes in a decadent, creamy, nut-based gravy with a royal taste.',
    price: 340,
    image: ShahiPaneer,
    rating: 4.7,
    reviewCount: 130,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 9,
    name: 'Veg Pulao',
    description: 'Fragrant basmati rice cooked with mixed vegetables and whole spices.',
    price: 200,
    image: VegPulao,
    rating: 4.2,
    reviewCount: 78,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 10,
    name: 'Jeera Rice',
    description: 'Simple, flavorful rice tempered with cumin seeds.',
    price: 150,
    image: JeeraRice,
    rating: 4.1,
    reviewCount: 65,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 11,
    name: 'Tandoori Roti',
    description: 'Whole wheat bread baked in a clay oven, soft and fluffy.',
    price: 40,
    image: TandooriRoti,
    rating: 4.0,
    reviewCount: 200,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 12,
    name: 'Butter Naan',
    description: 'Leavened white flour bread baked in a tandoor, brushed with butter.',
    price: 70,
    image: ButterNaan,
    rating: 4.5,
    reviewCount: 189,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 13,
    name: 'Paneer Bhurji',
    description: 'Scrambled cottage cheese sautéed with onions, tomatoes, and spices.',
    price: 260,
    image: PaneerBhurji,
    rating: 4.4,
    reviewCount: 102,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 14,
    name: 'Rajma Chawal',
    description: 'Red kidney bean curry in a thick gravy, served with steamed rice.',
    price: 230,
    image: RajmaChawal,
    rating: 4.8,
    reviewCount: 175,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 15,
    name: 'Mushroom Matar',
    description: 'Mushrooms and green peas cooked in a spiced tomato-onion gravy.',
    price: 240,
    image: MushroomMatar,
    rating: 4.3,
    reviewCount: 88,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 16,
    name: 'Kadhi Pakora',
    description: 'Chickpea flour dumplings in a spiced yogurt-based gravy.',
    price: 210,
    image: KadhiPakora,
    rating: 4.5,
    reviewCount: 96,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 17,
    name: 'Stuffed Paratha (Aloo/Gobi/Paneer)',
    description: 'Whole wheat flatbread stuffed with your choice of spiced filling.',
    price: 120,
    image: StuffedParatha,
    rating: 4.6,
    reviewCount: 155,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 18,
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice layered with marinated vegetables and cooked to perfection.',
    price: 270,
    image: VegetableBiryani,
    rating: 4.4,
    reviewCount: 121,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 19,
    name: 'Butter Chicken',
    description: 'Tender chicken pieces in a smooth, creamy, and mildly sweet tomato-based gravy.',
    price: 380,
    image: ButterChicken,
    rating: 4.9,
    reviewCount: 245,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 20,
    name: 'Chicken Tikka Masala',
    description: 'Grilled chicken chunks (tikka) in a rich, spiced tomato and cream sauce.',
    price: 360,
    image: ChickenTikkaMasala,
    rating: 4.7,
    reviewCount: 198,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 21,
    name: 'Rogan Josh (Mutton)',
    description: 'Aromatic lamb curry from Kashmir, known for its rich red color and flavorful gravy.',
    price: 420,
    image: RoganJosh,
    rating: 4.8,
    reviewCount: 134,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 22,
    name: 'Tandoori Chicken',
    description: 'Chicken marinated in yogurt and spices, grilled to perfection in a tandoor.',
    price: 350,
    image: TandooriChicken,
    rating: 4.8,
    reviewCount: 187,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 23,
    name: 'Chicken Korma',
    description: 'Mild, creamy, and nutty chicken curry, slow-cooked for a delicate flavor.',
    price: 370,
    image: ChickenKorma,
    rating: 4.5,
    reviewCount: 112,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 24,
    name: 'Mutton Seekh Kebab',
    description: 'Minced mutton seasoned with spices, skewered and grilled.',
    price: 320,
    image: MuttonSeekhKebab,
    rating: 4.7,
    reviewCount: 145,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 25,
    name: 'Fish Amritsari',
    description: 'Boneless fish pieces marinated in gram flour and spices, deep-fried to a golden crisp.',
    price: 340,
    image: FishAmritsari,
    rating: 4.6,
    reviewCount: 128,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 26,
    name: 'Keema Matar',
    description: 'Spiced minced meat cooked with green peas in a rich gravy.',
    price: 330,
    image: KeemaMatar,
    rating: 4.5,
    reviewCount: 105,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 27,
    name: 'Chicken Biryani',
    description: 'Layered rice dish with marinated chicken, fragrant spices, and saffron.',
    price: 350,
    image: ChickenBiryani,
    rating: 4.9,
    reviewCount: 222,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 28,
    name: 'Egg Curry',
    description: 'Hard-boiled eggs in a spicy and tangy onion-tomato gravy.',
    price: 220,
    image: EggCurry,
    rating: 4.4,
    reviewCount: 98,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 29,
    name: 'Chicken Seekh Kebab',
    description: 'Minced chicken mixed with herbs and spices, skewered and grilled.',
    price: 280,
    image: ChickenSeekhKebab,
    rating: 4.6,
    reviewCount: 132,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 30,
    name: 'Masala Dosa',
    description: 'Crispy fermented crepe filled with a spiced potato filling, served with sambar and chutney.',
    price: 150,
    image: MasalaDosa,
    rating: 4.7,
    reviewCount: 210,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 31,
    name: 'Idli Sambar',
    description: 'Soft steamed rice cakes served with a lentil-based vegetable stew and coconut chutney.',
    price: 120,
    image: IdliSambar,
    rating: 4.5,
    reviewCount: 185,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 32,
    name: 'Medu Vada',
    description: 'Savory, doughnut-shaped lentil fritters, crispy outside and soft inside.',
    price: 110,
    image: MeduVada,
    rating: 4.4,
    reviewCount: 165,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 33,
    name: 'Pongal',
    description: 'Comforting dish of rice and lentils, tempered with black pepper, cumin, and ghee.',
    price: 130,
    image: Pongal,
    rating: 4.3,
    reviewCount: 120,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 34,
    name: 'Uttapam (Onion/Tomato)',
    description: 'Thick, savory pancake topped with onions, tomatoes, and cilantro.',
    price: 140,
    image: Uttapam,
    rating: 4.2,
    reviewCount: 95,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 35,
    name: 'Rava Dosa',
    description: 'Crispy, lacy crepe made from semolina, served with sambar and chutney.',
    price: 160,
    image: RavaDosa,
    rating: 4.5,
    reviewCount: 110,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 36,
    name: 'Bisi Bele Bath',
    description: 'A spicy, hearty rice dish from Karnataka with lentils and vegetables.',
    price: 220,
    image: BisiBeleBath,
    rating: 4.6,
    reviewCount: 101,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 37,
    name: 'Lemon Rice',
    description: 'Tangy and flavorful rice tempered with mustard seeds, turmeric, and lemon juice.',
    price: 150,
    image: LemonRice,
    rating: 4.3,
    reviewCount: 87,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 38,
    name: 'Curd Rice',
    description: 'A cooling and comforting dish of rice mixed with yogurt and tempered with spices.',
    price: 130,
    image: CurdRice,
    rating: 4.2,
    reviewCount: 79,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 39,
    name: 'Avial',
    description: 'A thick mixture of vegetables cooked with a coconut and yogurt gravy.',
    price: 240,
    image: Avial,
    rating: 4.4,
    reviewCount: 92,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 40,
    name: 'Poriyal (Cabbage/Beans)',
    description: 'A simple, dry South Indian vegetable stir-fry with coconut and spices.',
    price: 170,
    image: Poriyal,
    rating: 4.1,
    reviewCount: 65,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 41,
    name: 'Chicken Chettinad',
    description: 'A famous spicy chicken curry from Tamil Nadu with a robust flavor of ground spices.',
    price: 380,
    image: ChickenChettinad,
    rating: 4.8,
    reviewCount: 145,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 42,
    name: 'Andhra Chilli Chicken',
    description: 'Extremely spicy and tangy chicken fry from Andhra Pradesh.',
    price: 360,
    image: AndhraChilliChicken,
    rating: 4.7,
    reviewCount: 128,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 43,
    name: 'Malabar Fish Curry',
    description: 'Fish cooked in a traditional Kerala style coconut milk gravy with kodampuli.',
    price: 350,
    image: MalabarFishCurry,
    rating: 4.6,
    reviewCount: 118,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 44,
    name: 'Hyderabadi Mutton Biryani',
    description: 'A world-famous layered biryani with marinated mutton and long-grained rice.',
    price: 450,
    image: HyderabadiMuttonBiryani,
    rating: 4.9,
    reviewCount: 195,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 45,
    name: 'Kerala Prawn Curry',
    description: 'Juicy prawns cooked in a flavorful gravy of coconut milk and spices.',
    price: 390,
    image: KeralaPrawnCurry,
    rating: 4.7,
    reviewCount: 135,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 46,
    name: 'Egg Dosa',
    description: 'A crispy dosa with a layer of egg spread on top, served with chutney.',
    price: 140,
    image: EggDosa,
    rating: 4.4,
    reviewCount: 102,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 47,
    name: 'Veg Manchurian (Dry/Gravy)',
    description: 'Vegetable balls in a spicy, tangy, and slightly sweet Manchurian sauce.',
    price: 260,
    image: VegManchurian,
    rating: 4.5,
    reviewCount: 155,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 48,
    name: 'Gobi Manchurian',
    description: 'Crispy cauliflower florets tossed in a spicy, tangy Manchurian sauce.',
    price: 240,
    image: GobiManchurian,
    rating: 4.8,
    reviewCount: 178,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 49,
    name: 'Chilli Paneer',
    description: 'Crispy fried paneer cubes tossed with onions, capsicum in a spicy sauce.',
    price: 280,
    image: ChilliPaneer,
    rating: 4.7,
    reviewCount: 162,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 50,
    name: 'Veg Hakka Noodles',
    description: 'Stir-fried noodles with fresh vegetables and classic Chinese seasonings.',
    price: 200,
    image: VegHakkaNoodles,
    rating: 4.3,
    reviewCount: 135,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 51,
    name: 'Veg Fried Rice',
    description: 'Stir-fried rice with a mix of vegetables, seasoned with soy sauce.',
    price: 190,
    image: VegFriedRice,
    rating: 4.2,
    reviewCount: 128,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 52,
    name: 'Spring Rolls',
    description: 'Crispy rolls filled with shredded vegetables, served with a dipping sauce.',
    price: 180,
    image: SpringRolls,
    rating: 4.4,
    reviewCount: 145,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 53,
    name: 'Stir-Fried Tofu with Vegetables',
    description: 'Tofu cubes and fresh vegetables stir-fried in a light savory sauce.',
    price: 250,
    image: StirFriedTofu,
    rating: 4.3,
    reviewCount: 98,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 54,
    name: 'Sweet and Sour Vegetables',
    description: 'Assorted vegetables in a tangy, sweet, and vibrant red sauce.',
    price: 230,
    image: SweetSourVegetables,
    rating: 4.1,
    reviewCount: 85,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 55,
    name: 'American Chopsuey (Veg)',
    description: 'A crispy noodle base topped with a sweet and sour vegetable gravy.',
    price: 220,
    image: AmericanChopsuey,
    rating: 4.0,
    reviewCount: 77,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 56,
    name: 'Chilli Chicken (Dry/Gravy)',
    description: 'Crispy chicken chunks tossed with onions, peppers in a hot and spicy sauce.',
    price: 320,
    image: ChilliChicken,
    rating: 4.8,
    reviewCount: 188,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 57,
    name: 'Chicken Manchurian',
    description: 'Deep-fried chicken balls in a spicy, tangy, and slightly sweet brown sauce.',
    price: 340,
    image: ChickenManchurian,
    rating: 4.7,
    reviewCount: 165,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 58,
    name: 'Schezwan Fried Rice (Chicken/Egg)',
    description: 'Spicy and flavorful fried rice made with Schezwan sauce and your choice of protein.',
    price: 270,
    image: SchezwanFriedRice,
    rating: 4.6,
    reviewCount: 142,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 59,
    name: 'Chicken Hakka Noodles',
    description: 'Stir-fried noodles with chicken and vegetables, seasoned with soy sauce.',
    price: 250,
    image: ChickenHakkaNoodles,
    rating: 4.5,
    reviewCount: 130,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 60,
    name: 'Sweet and Sour Chicken',
    description: 'Crispy chicken pieces tossed in a classic sweet, tangy, and red sauce.',
    price: 330,
    image: SweetSourChicken,
    rating: 4.4,
    reviewCount: 115,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 61,
    name: 'Dragon Chicken',
    description: 'Spicy, deep-fried chicken with a bold flavor of red chilies and schezwan peppers.',
    price: 350,
    image: DragonChicken,
    rating: 4.7,
    reviewCount: 125,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 62,
    name: 'Egg Fried Rice',
    description: 'Classic fried rice with scrambled eggs, spring onions, and light soy sauce.',
    price: 200,
    image: EggFriedRice,
    rating: 4.3,
    reviewCount: 110,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 63,
    name: 'Fish in Hot Garlic Sauce',
    description: 'Tender fish fillets in a spicy, pungent, and savory garlic-based sauce.',
    price: 370,
    image: FishHotGarlicSauce,
    rating: 4.6,
    reviewCount: 118,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 64,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, fresh mozzarella, basil, and a thin crust.',
    price: 300,
    image: MargheritaPizza,
    rating: 4.5,
    reviewCount: 167,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 65,
    name: 'Veggie Delight Pizza',
    description: 'Pizza topped with a delicious mix of fresh vegetables and cheese.',
    price: 330,
    image: VeggieDelightPizza,
    rating: 4.4,
    reviewCount: 145,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 66,
    name: 'Pasta in Arrabiata Sauce (Red)',
    description: 'Pasta in a spicy tomato sauce with garlic and red chilies.',
    price: 270,
    image: PastaArrabiata,
    rating: 4.6,
    reviewCount: 132,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 67,
    name: 'Pasta in Alfredo Sauce (White)',
    description: 'Creamy, rich pasta made with butter, cream, and parmesan cheese.',
    price: 290,
    image: PastaAlfredo,
    rating: 4.7,
    reviewCount: 155,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 68,
    name: 'Pesto Pasta',
    description: 'Pasta tossed in a fresh sauce made from basil, pine nuts, garlic, and parmesan.',
    price: 310,
    image: PestoPasta,
    rating: 4.5,
    reviewCount: 128,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 69,
    name: 'Garlic Bread with Cheese',
    description: 'Toasted bread topped with garlic butter and melted cheese.',
    price: 160,
    image: GarlicBreadCheese,
    rating: 4.8,
    reviewCount: 195,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 70,
    name: 'Risotto (Mushroom)',
    description: 'Creamy Italian rice dish cooked with mushrooms, parmesan, and white wine.',
    price: 350,
    image: MushroomRisotto,
    rating: 4.6,
    reviewCount: 112,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 71,
    name: 'Lasagna (Vegetable)',
    description: 'Layers of pasta, vegetables, cheese, and tomato sauce, baked to perfection.',
    price: 340,
    image: VegLasagna,
    rating: 4.7,
    reviewCount: 138,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 72,
    name: 'Bruschetta',
    description: 'Toasted bread rubbed with garlic and topped with fresh tomatoes, basil, and olive oil.',
    price: 180,
    image: Bruschetta,
    rating: 4.4,
    reviewCount: 105,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 73,
    name: 'Pepperoni Pizza',
    description: 'Classic pizza topped with tomato sauce, mozzarella, and spicy pepperoni.',
    price: 380,
    image: PepperoniPizza,
    rating: 4.9,
    reviewCount: 205,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 74,
    name: 'Chicken Sausage Pizza',
    description: 'Tasty pizza topped with grilled chicken sausages, onions, and bell peppers.',
    price: 360,
    image: ChickenSausagePizza,
    rating: 4.5,
    reviewCount: 148,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 75,
    name: 'Spaghetti Bolognese (Chicken/Mutton)',
    description: 'Spaghetti pasta with a rich, slow-cooked meat and tomato sauce.',
    price: 320,
    image: SpaghettiBolognese,
    rating: 4.8,
    reviewCount: 172,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 76,
    name: 'Chicken Lasagna',
    description: 'Layers of pasta, shredded chicken, cheese, and sauce, baked to perfection.',
    price: 370,
    image: ChickenLasagna,
    rating: 4.7,
    reviewCount: 155,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 77,
    name: 'Grilled Chicken with Pasta',
    description: 'Succulent grilled chicken breast served with a side of pasta in your choice of sauce.',
    price: 390,
    image: GrilledChickenPasta,
    rating: 4.6,
    reviewCount: 142,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 78,
    name: 'Veg Au Gratin',
    description: 'Assorted vegetables baked in a rich, creamy white sauce with a cheese topping.',
    price: 310,
    image: VegAuGratin,
    rating: 4.4,
    reviewCount: 98,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 79,
    name: 'Cream of Mushroom Soup',
    description: 'Smooth, creamy, and comforting soup made with fresh mushrooms.',
    price: 160,
    image: CreamMushroomSoup,
    rating: 4.3,
    reviewCount: 115,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 80,
    name: 'Veg Stroganoff',
    description: 'A creamy and hearty dish with vegetables in a sour cream sauce, served with rice.',
    price: 290,
    image: VegStroganoff,
    rating: 4.2,
    reviewCount: 85,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 81,
    name: 'Mashed Potatoes',
    description: 'Creamy, buttery mashed potatoes, perfectly seasoned.',
    price: 150,
    image: MashedPotatoes,
    rating: 4.1,
    reviewCount: 95,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 82,
    name: 'Sautéed Vegetables',
    description: 'Fresh seasonal vegetables lightly sautéed in olive oil and herbs.',
    price: 180,
    image: SauteedVegetables,
    rating: 4.0,
    reviewCount: 78,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 83,
    name: 'Corn and Spinach Sandwich',
    description: 'A healthy and delicious sandwich filled with sweet corn and spinach.',
    price: 170,
    image: CornSpinachSandwich,
    rating: 4.3,
    reviewCount: 102,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 84,
    name: 'Grilled Fish with Lemon Butter Sauce',
    description: 'Fresh fish fillet grilled to perfection, drizzled with a lemon butter sauce.',
    price: 420,
    image: GrilledFishLemonButter,
    rating: 4.8,
    reviewCount: 135,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 85,
    name: 'Chicken Steak with Mashed Potatoes',
    description: 'Grilled chicken steak served with creamy mashed potatoes and gravy.',
    price: 380,
    image: ChickenSteakMashedPotatoes,
    rating: 4.7,
    reviewCount: 148,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 86,
    name: 'Shepherd\'s Pie (Mutton)',
    description: 'A classic comfort food: minced mutton in gravy, topped with mashed potatoes and baked.',
    price: 360,
    image: ShepherdsPie,
    rating: 4.6,
    reviewCount: 122,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 87,
    name: 'Fish and Chips',
    description: 'Beer-battered fish fillets, deep-fried until golden, served with fries and tartar sauce.',
    price: 340,
    image: FishAndChips,
    rating: 4.5,
    reviewCount: 165,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 88,
    name: 'Omelette (Cheese/Masala)',
    description: 'Fluffy eggs cooked with your choice of fillings like cheese, onions, and herbs.',
    price: 140,
    image: Omelette,
    rating: 4.4,
    reviewCount: 112,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 89,
    name: 'Scrambled Eggs',
    description: 'Soft, creamy, and perfectly cooked scrambled eggs, a breakfast classic.',
    price: 130,
    image: ScrambledEggs,
    rating: 4.3,
    reviewCount: 98,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 90,
    name: 'Chicken Caesar Salad',
    description: 'Crisp romaine lettuce with grilled chicken, parmesan, croutons, and Caesar dressing.',
    price: 280,
    image: ChickenCaesarSalad,
    rating: 4.5,
    reviewCount: 132,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 91,
    name: 'Aloo Posto',
    description: 'A Bengali classic: potatoes cooked in a paste of poppy seeds, light and flavorful.',
    price: 220,
    image: AlooPosto,
    rating: 4.4,
    reviewCount: 88,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 92,
    name: 'Shukto',
    description: 'A traditional Bengali bitter stew made with a variety of vegetables.',
    price: 200,
    image: Shukto,
    rating: 4.0,
    reviewCount: 65,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 93,
    name: 'Dhokar Dalna',
    description: 'Lentil cakes fried and simmered in a spiced gravy, a Bengali delicacy.',
    price: 240,
    image: DhokarDalna,
    rating: 4.5,
    reviewCount: 92,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 94,
    name: 'Cholar Dal',
    description: 'Bengali-style chana dal cooked with coconut and spices, slightly sweet.',
    price: 180,
    image: CholarDal,
    rating: 4.3,
    reviewCount: 79,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 95,
    name: 'Luchi',
    description: 'Deep-fried, puffy bread made from refined flour, a Bengali favorite.',
    price: 100,
    image: Luchi,
    rating: 4.6,
    reviewCount: 145,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 96,
    name: 'Macher Jhol (Fish Curry)',
    description: 'Light and flavorful Bengali fish curry with potatoes and spices.',
    price: 350,
    image: MacherJhol,
    rating: 4.7,
    reviewCount: 155,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 97,
    name: 'Shorshe Ilish (Hilsa in Mustard Gravy)',
    description: 'Hilsa fish cooked in a pungent and sharp mustard gravy, a Bengali masterpiece.',
    price: 480,
    image: ShorsheIlish,
    rating: 4.9,
    reviewCount: 175,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 98,
    name: 'Chingri Malai Curry (Prawn Curry)',
    description: 'Prawns cooked in a rich, creamy, and mildly spiced coconut milk gravy.',
    price: 420,
    image: ChingriMalaiCurry,
    rating: 4.8,
    reviewCount: 162,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 99,
    name: 'Kosha Mangsho (Mutton Curry)',
    description: 'A rich, dark, and intensely flavored slow-cooked Bengali mutton curry.',
    price: 450,
    image: KoshaMangsho,
    rating: 4.8,
    reviewCount: 168,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 100,
    name: 'Kolkata Chicken Biryani',
    description: 'Fragrant biryani with chicken, potatoes, and eggs, flavored with rose water.',
    price: 370,
    image: KolkataChickenBiryani,
    rating: 4.9,
    reviewCount: 195,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 101,
    name: 'Samosa',
    description: 'Crispy, fried pastry filled with spiced potatoes and peas.',
    price: 60,
    image: Samosa,
    rating: 4.8,
    reviewCount: 255,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 102,
    name: 'Vada Pav',
    description: 'A Mumbai street food staple: spicy potato fritter in a bread bun with chutneys.',
    price: 50,
    image: VadaPav,
    rating: 4.9,
    reviewCount: 278,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 103,
    name: 'Pav Bhaji',
    description: 'A spicy mashed vegetable curry served with soft buttered bread rolls.',
    price: 150,
    image: PavBhaji,
    rating: 4.9,
    reviewCount: 245,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 104,
    name: 'Pani Puri / Golgappe',
    description: 'Hollow, crispy puris filled with spicy flavored water, tamarind chutney, and potatoes.',
    price: 80,
    image: PaniPuri,
    rating: 4.9,
    reviewCount: 300,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 105,
    name: 'Bhel Puri',
    description: 'A tangy and crunchy Mumbai street snack made with puffed rice, chutneys, and sev.',
    price: 90,
    image: BhelPuri,
    rating: 4.7,
    reviewCount: 185,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 106,
    name: 'Dhokla',
    description: 'Soft, steamed, and savory cakes made from fermented rice and chickpea batter.',
    price: 110,
    image: Dhokla,
    rating: 4.6,
    reviewCount: 165,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 107,
    name: 'Khandvi',
    description: 'Gram flour rolls, soft and delicate, tempered with mustard seeds and coconut.',
    price: 120,
    image: Khandvi,
    rating: 4.5,
    reviewCount: 142,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 108,
    name: 'French Fries',
    description: 'Crispy, golden, and deep-fried potato strips, salted to perfection.',
    price: 130,
    image: FrenchFries,
    rating: 4.8,
    reviewCount: 210,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 109,
    name: 'Paneer Pakora',
    description: 'Paneer cubes dipped in spiced gram flour batter and deep-fried until crispy.',
    price: 170,
    image: PaneerPakora,
    rating: 4.7,
    reviewCount: 152,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 110,
    name: 'Chicken 65',
    description: 'Deep-fried, bite-sized chicken pieces marinated in a fiery blend of spices.',
    price: 280,
    image: Chicken65,
    rating: 4.8,
    reviewCount: 188,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 111,
    name: 'Chilli Potato',
    description: 'Crispy fried potato fingers tossed in a spicy, tangy, and sweet sauce.',
    price: 160,
    image: ChilliPotato,
    rating: 4.6,
    reviewCount: 135,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 112,
    name: 'Momos (Veg/Chicken)',
    description: 'Steamed or fried dumplings filled with vegetables or chicken, served with spicy chutney.',
    price: 150,
    image: Momos,
    rating: 4.8,
    reviewCount: 225,
    isHealthy: true,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 113,
    name: 'Gulab Jamun',
    description: 'Soft, deep-fried milk solids dumplings soaked in a sweet, rose-flavored sugar syrup.',
    price: 120,
    image: GulabJamun,
    rating: 4.9,
    reviewCount: 198,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 114,
    name: 'Rasgulla',
    description: 'Soft, spongy cheese balls soaked in light sugar syrup, a Bengali classic.',
    price: 110,
    image: Rasgulla,
    rating: 4.8,
    reviewCount: 175,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 115,
    name: 'Jalebi',
    description: 'Deep-fried maida flour batter coiled into shapes, soaked in sugar syrup.',
    price: 100,
    image: Jalebi,
    rating: 4.7,
    reviewCount: 162,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 116,
    name: 'Kheer / Payasam',
    description: 'A creamy rice pudding made with milk, sugar, and flavored with cardamom and nuts.',
    price: 130,
    image: Kheer,
    rating: 4.7,
    reviewCount: 155,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 117,
    name: 'Gajar Ka Halwa',
    description: 'A rich dessert made by slow-cooking grated carrots in milk, ghee, and sugar.',
    price: 140,
    image: GajarKaHalwa,
    rating: 4.8,
    reviewCount: 168,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 118,
    name: 'Kulfi',
    description: 'A traditional Indian ice cream, denser and creamier, often flavored with pistachio.',
    price: 90,
    image: Kulfi,
    rating: 4.6,
    reviewCount: 145,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 119,
    name: 'Chocolate Brownie',
    description: 'A rich, dense, and fudgy chocolate dessert, often served with ice cream.',
    price: 160,
    image: ChocolateBrownie,
    rating: 4.8,
    reviewCount: 178,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 120,
    name: 'Cheesecake',
    description: 'A sweet dessert with a creamy cheese filling on a biscuit or crust base.',
    price: 200,
    image: Cheesecake,
    rating: 4.9,
    reviewCount: 192,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 121,
    name: 'Tiramisu',
    description: 'An Italian coffee-flavored dessert with layers of ladyfingers and mascarpone cheese.',
    price: 220,
    image: Tiramisu,
    rating: 4.9,
    reviewCount: 185,
    isHealthy: false,
    restaurant: 'Flavor Haven',
    restaurantId: 1,
  },
  {
    id: 122,
    name: 'Fruit Salad',
    description: 'A refreshing mix of fresh seasonal fruits, a healthy and light dessert option.',
    price: 150,
    image: FruitSalad,
    rating: 4.5,
    reviewCount: 132,
    isHealthy: true,
    restaurant: 'Flavor Haven',
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