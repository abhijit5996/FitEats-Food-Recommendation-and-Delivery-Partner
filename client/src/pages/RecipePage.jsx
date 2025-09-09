import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecipe = () => {
      setLoading(true);
      
      // Sample recipes with slugs
      const sampleRecipes = [
       {
    id: 1,
    slug: 'bajra-khichdi',
    foodName: 'Bajra Khichdi',
    image: 'https://images.unsplash.com/photo-1609505848915-81dd1b3c731c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Healthy millet-based khichdi with vegetables and spices.',
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 3,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 320, protein: 8, carbs: 55, fat: 6, fiber: 10 },
    ingredients: [
      '1 cup bajra (pearl millet), soaked overnight',
      '1/2 cup moong dal (split yellow lentils)',
      '1 onion, finely chopped',
      '1 tomato, chopped',
      '1/2 cup mixed vegetables (carrots, peas, beans)',
      '1 tbsp ghee',
      '1 tsp cumin seeds',
      '1/2 tsp turmeric powder',
      '1 tsp red chili powder',
      '1 tbsp ginger-garlic paste',
      'Salt to taste',
      'Fresh coriander for garnish',
      '4 cups water'
    ],
    instructions: [
      'Drain the soaked bajra and rinse the moong dal.',
      'Heat ghee in a pressure cooker, add cumin seeds and let them splutter.',
      'Add onions and sauté until translucent. Add ginger-garlic paste and cook for a minute.',
      'Add tomatoes and cook until soft. Add all spices and mixed vegetables, sauté for 2 minutes.',
      'Add drained bajra and moong dal. Mix well and sauté for 2-3 minutes.',
      'Add water and salt. Pressure cook for 4-5 whistles on medium heat.',
      'Let the pressure release naturally. Garnish with fresh coriander and serve hot with yogurt.'
    ],
    tips: [
      'Soaking bajra overnight ensures it cooks perfectly and is easy to digest.',
      'You can add a dollop of ghee on top before serving for extra flavor.'
    ],
    dietaryInfo: ['Vegetarian', 'Gluten-Free', 'High-Fiber'],
  },
  {
    id: 2,
    slug: 'besan-chilla',
    foodName: 'Besan Chilla',
    image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Savory gram flour pancakes with herbs and spices.',
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: 2,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 180, protein: 9, carbs: 20, fat: 7, fiber: 5 },
    ingredients: [
      '1 cup besan (gram flour)',
      '1 small onion, finely chopped',
      '1 green chili, finely chopped',
      '2 tbsp coriander leaves, chopped',
      '1/2 tsp cumin seeds',
      '1/4 tsp turmeric powder',
      '1/4 tsp asafoetida (hing)',
      'Salt to taste',
      'Water as needed',
      'Oil for cooking'
    ],
    instructions: [
      'In a bowl, mix besan with all the ingredients except oil.',
      'Add water gradually to make a smooth, pouring consistency batter.',
      'Heat a non-stick pan and drizzle a few drops of oil.',
      'Pour a ladleful of batter and spread it into a thin circle.',
      'Cook on medium heat until the bottom is golden brown. Drizzle oil around the edges.',
      'Flip and cook the other side until golden and crisp.',
      'Serve hot with green chutney or tomato ketchup.'
    ],
    tips: [
      'Let the batter rest for 10 minutes for softer chillas.',
      'You can add grated vegetables like carrots or zucchini for more nutrition.'
    ],
    dietaryInfo: ['Vegetarian', 'Gluten-Free', 'High-Protein'],
  },
  {
    id: 3,
    slug: 'channa-saag',
    foodName: 'Channa Saag',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Chickpeas cooked with spinach and traditional spices.',
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 290, protein: 12, carbs: 40, fat: 9, fiber: 11 },
    ingredients: [
      '1 cup chickpeas (kabuli chana), soaked overnight and boiled',
      '2 bunches spinach (saag), washed and chopped',
      '1 onion, finely chopped',
      '2 tomatoes, pureed',
      '1 tbsp ginger-garlic paste',
      '1 green chili, slit',
      '1 tsp cumin seeds',
      '1 tsp coriander powder',
      '1/2 tsp turmeric powder',
      '1 tsp garam masala',
      '2 tbsp oil',
      'Salt to taste',
      '1 tbsp cream (optional)'
    ],
    instructions: [
      'Heat oil in a pan, add cumin seeds and let them splutter.',
      'Add onions and sauté until golden brown. Add ginger-garlic paste and green chili, cook for a minute.',
      'Add tomato puree and cook until the oil separates.',
      'Add all dry spices and salt. Cook for 2 minutes.',
      'Add chopped spinach and cook until it wilts and reduces in volume.',
      'Add boiled chickpeas and 1 cup of water. Mix well, cover, and simmer for 10-15 minutes.',
      'Garnish with garam masala and a swirl of cream. Serve hot with roti or rice.'
    ],
    tips: [
      'You can use canned chickpeas to save time. Just rinse them well before using.',
      'Blanch the spinach in hot water for 2 minutes and then blend into a puree for a smoother texture.'
    ],
    dietaryInfo: ['Vegetarian', 'Vegan', 'High-Fiber'],
  },
  {
    id: 4,
    slug: 'dahi-ke-kebab',
    foodName: 'Dahi Ke Kebab',
    image: 'https://images.unsplash.com/photo-1609505848912-8359c2a23489?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Yogurt-based kebabs with a crispy exterior and soft interior.',
    prepTime: '20 mins (plus 2 hours hanging time)',
    cookTime: '20 mins',
    servings: 4,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 210, protein: 8, carbs: 15, fat: 12, fiber: 2 },
    ingredients: [
      '2 cups hung yogurt (Greek yogurt)',
      '4 tbsp besan (gram flour)',
      '1 onion, finely chopped',
      '2 green chilies, finely chopped',
      '1 tbsp ginger, grated',
      '2 tbsp coriander leaves, chopped',
      '1/2 tsp red chili powder',
      '1/2 tsp garam masala',
      '1/2 tsp roasted cumin powder',
      'Salt to taste',
      'Oil for shallow frying',
      'Breadcrumbs for coating'
    ],
    instructions: [
      'Hang yogurt in a muslin cloth for 2-3 hours to remove all water.',
      'In a pan, dry roast the besan for 4-5 minutes until fragrant. Let it cool.',
      'In a bowl, mix hung yogurt, roasted besan, onions, green chilies, ginger, coriander, and all spices.',
      'Mix well to form a dough-like mixture. Refrigerate for 30 minutes.',
      'Shape the mixture into round patties and coat lightly with breadcrumbs.',
      'Heat oil in a pan and shallow fry the kebabs on medium heat until golden brown on both sides.',
      'Serve hot with mint chutney.'
    ],
    tips: [
      'Ensure the yogurt is hung properly; otherwise, the kebabs might break.',
      'Be gentle while flipping the kebabs as they are delicate.'
    ],
    dietaryInfo: ['Vegetarian'],
  },
  {
    id: 5,
    slug: 'dal-khichdi',
    foodName: 'Dal Khichdi',
    image: 'https://images.unsplash.com/photo-1589302168067-4c95e1a5c63a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Comforting lentil and rice porridge with ghee and spices.',
    prepTime: '10 mins',
    cookTime: '25 mins',
    servings: 3,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 350, protein: 10, carbs: 60, fat: 7, fiber: 8 },
    ingredients: [
      '1 cup rice',
      '1/2 cup moong dal (split yellow lentils)',
      '1 onion, finely chopped (optional)',
      '1 tbsp ghee',
      '1 tsp cumin seeds',
      '1/2 tsp turmeric powder',
      '1/2 tsp asafoetida (hing)',
      '1-inch ginger, grated',
      'Salt to taste',
      '4 cups water',
      'For tempering (optional): 1 tbsp ghee, 1/2 tsp cumin seeds, 2 dry red chilies'
    ],
    instructions: [
      'Wash rice and dal together until water runs clear.',
      'Heat ghee in a pressure cooker. Add cumin seeds and asafoetida. Let them splutter.',
      'If using, add onions and sauté until pink. Add grated ginger and sauté for 30 seconds.',
      'Add turmeric powder and washed rice-dal mixture. Sauté for 2 minutes.',
      'Add water and salt. Pressure cook for 4-5 whistles.',
      'Let the pressure release naturally. Mash the khichdi slightly with the back of a spoon.',
      'For tempering, heat ghee in a small pan. Add cumin and red chilies. Pour over the khichdi before serving.',
      'Serve hot with papad, pickle, or yogurt.'
    ],
    tips: [
      'The consistency of khichdi is personal preference. Add more water for a porridge-like texture.',
      'Khichdi is a perfect comfort food when you are feeling under the weather.'
    ],
    dietaryInfo: ['Vegetarian', 'Gluten-Free', 'Easy to Digest'],
  },
  {
    id: 6,
    slug: 'egg-curry',
    foodName: 'Egg Curry',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Hard-boiled eggs in a rich and spicy gravy.',
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 380, protein: 18, carbs: 15, fat: 27, fiber: 3 },
    ingredients: [
      '6 eggs, hard-boiled and peeled',
      '2 onions, finely chopped',
      '2 tomatoes, pureed',
      '1 tbsp ginger-garlic paste',
      '1/2 cup coconut milk',
      '2 tbsp oil',
      '1 tsp cumin seeds',
      '1 bay leaf',
      '1 tsp red chili powder',
      '1 tsp coriander powder',
      '1/2 tsp turmeric powder',
      '1 tsp garam masala',
      'Salt to taste',
      'Fresh coriander for garnish'
    ],
    instructions: [
      'Make slight slits on the hard-boiled eggs for the gravy to seep in.',
      'Heat oil in a pan. Add cumin seeds and bay leaf.',
      'Add onions and sauté until golden brown. Add ginger-garlic paste and cook for a minute.',
      'Add tomato puree and cook until the oil separates.',
      'Add all dry spices (red chili, coriander, turmeric) and salt. Cook for 2-3 minutes.',
      'Add coconut milk and 1 cup of water. Bring the gravy to a boil.',
      'Gently add the boiled eggs. Simmer for 8-10 minutes on low heat.',
      'Sprinkle garam masala and garnish with coriander. Serve hot with rice or roti.'
    ],
    tips: [
      'Frying the boiled eggs lightly in oil before adding to the gravy gives them a nice texture.',
      'Adjust the consistency of the gravy by adding more or less water.'
    ],
    dietaryInfo: ['High-Protein'],
  },
  {
    id: 7,
    slug: 'grilled-paneer-tikka',
    foodName: 'Grilled Paneer Tikka',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Marinated cottage cheese grilled to perfection.',
    prepTime: '20 mins (plus 1 hour marination)',
    cookTime: '15 mins',
    servings: 3,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 280, protein: 15, carbs: 8, fat: 21, fiber: 2 },
    ingredients: [
      '250g paneer, cut into cubes',
      '1 capsicum, cut into squares',
      '1 onion, cut into squares',
      '1/2 cup thick yogurt',
      '1 tbsp besan (gram flour)',
      '1 tbsp ginger-garlic paste',
      '1 tbsp lemon juice',
      '1 tsp red chili powder',
      '1 tsp garam masala',
      '1/2 tsp turmeric powder',
      '1 tsp kasuri methi (dried fenugreek leaves)',
      'Salt to taste',
      '2 tbsp oil',
      'Skewers for grilling'
    ],
    instructions: [
      'In a bowl, mix yogurt, besan, ginger-garlic paste, lemon juice, all spices, kasuri methi, oil, and salt.',
      'Add paneer cubes, capsicum, and onion pieces to the marinade. Mix gently.',
      'Cover and refrigerate for at least 1 hour.',
      'Preheat the grill or oven to 200°C (400°F).',
      'Thread the marinated paneer and vegetables onto skewers.',
      'Grill for 10-15 minutes, turning occasionally, until slightly charred.',
      'Serve hot with mint chutney and onion rings.'
    ],
    tips: [
      'Soak wooden skewers in water for 30 minutes before using to prevent burning.',
      'You can also cook them on a stovetop grill pan or in an air fryer.'
    ],
    dietaryInfo: ['Vegetarian', 'High-Protein'],
  },
  {
    id: 8,
    slug: 'gujarati-methi-thepla',
    foodName: 'Gujarati Methi Thepla',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Fenugreek-flavored flatbread from Gujarat.',
    prepTime: '20 mins',
    cookTime: '20 mins',
    servings: 4,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 120, protein: 4, carbs: 18, fat: 4, fiber: 3 },
    ingredients: [
      '2 cups whole wheat flour',
      '1/2 cup besan (gram flour)',
      '1 cup fresh fenugreek leaves (methi), finely chopped',
      '1 tbsp yogurt',
      '1 tbsp oil',
      '1 tbsp ginger-green chili paste',
      '1/2 tsp turmeric powder',
      '1/2 tsp red chili powder',
      '1/2 tsp cumin seeds',
      'Salt to taste',
      'Water as needed',
      'Ghee or oil for cooking'
    ],
    instructions: [
      'In a large bowl, combine wheat flour, besan, chopped methi leaves, ginger-chili paste, all spices, cumin seeds, and salt.',
      'Add yogurt and 1 tbsp oil. Mix well.',
      'Knead into a firm dough using water as needed. Cover and rest for 15-20 minutes.',
      'Divide the dough into equal-sized balls.',
      'Roll each ball into a thin circle (approx 6-7 inches in diameter).',
      'Heat a tawa or griddle. Cook each thepla on medium heat, applying ghee/oil on both sides until golden brown spots appear.',
      'Serve hot with yogurt, pickle, or chundo.'
    ],
    tips: [
      'The dough should be firm, not soft, for perfect theplas.',
      'Theplas have a long shelf life and are perfect for travel.'
    ],
    dietaryInfo: ['Vegetarian'],
  },
  {
    id: 9,
    slug: 'idli-sambar',
    foodName: 'Idli and Sambar',
    image: 'https://images.unsplash.com/photo-1634047090011-1df9960005e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Steamed rice cakes served with lentil stew and chutney.',
    prepTime: '8 hours (for fermentation)',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 250, protein: 8, carbs: 45, fat: 4, fiber: 6 },
    ingredients: [
      'For Idli: 2 cups idli rice, 1/2 cup urad dal, 1/2 tsp fenugreek seeds, Salt to taste',
      'For Sambar: 1/2 cup toor dal, 1 cup mixed vegetables (drumsticks, carrot, pumpkin), 1 small onion, 1 tomato, Tamarind pulp, Sambar powder, Salt, For tempering: mustard seeds, curry leaves, asafoetida'
    ],
    instructions: [
      '**For Idli:** Soak rice and urad dal with fenugreek seeds separately for 6 hours.',
      'Grind urad dal to a fluffy batter. Grind rice to a slightly coarse batter. Mix both, add salt, and ferment overnight.',
      'Grease idli molds. Pour batter and steam for 10-12 minutes.',
      '**For Sambar:** Pressure cook toor dal until mushy.',
      'In a pot, cook vegetables in water with sambar powder, turmeric, and salt.',
      'Add cooked dal, tamarind pulp, and let it simmer for 10 minutes.',
      'Prepare tempering with oil, mustard seeds, curry leaves, and asafoetida. Pour over the sambar.',
      'Serve soft idlis hot with sambar and coconut chutney.'
    ],
    tips: [
      'The consistency of the idli batter is key. It should be thick and fluffy.',
      'A pinch of baking soda can be added to the batter if it hasn\'t fermented well (though not traditional).'
    ],
    dietaryInfo: ['Vegetarian', 'Gluten-Free'],
  },
  {
    id: 10,
    slug: 'kadai-paneer',
    foodName: 'Kadai Paneer',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Spicy cottage cheese curry with capsicum and onions.',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 380, protein: 14, carbs: 20, fat: 27, fiber: 4 },
    ingredients: [
      '250g paneer, cubed',
      '1 onion, cut into cubes',
      '1 capsicum, cut into cubes',
      '2 tomatoes, pureed',
      '1 tbsp ginger-garlic paste',
      '2 tbsp oil',
      '1 tsp cumin seeds',
      '1 tbsp coriander seeds, crushed',
      '1 tbsp dry red chili, crushed',
      '1 tsp kasuri methi',
      '1/2 tsp turmeric powder',
      '1 tsp garam masala',
      'Salt to taste',
      'Fresh cream (optional)',
      'Coriander leaves for garnish'
    ],
    instructions: [
      'Heat oil in a kadai (wok). Add cumin seeds.',
      'Add onion and capsicum cubes. Sauté on high heat for 2 minutes. Remove and set aside.',
      'In the same kadai, add crushed coriander seeds and red chili. Sauté for 30 seconds.',
      'Add ginger-garlic paste and cook for a minute.',
      'Add tomato puree and cook until oil separates. Add turmeric and salt.',
      'Add the sautéed onions and capsicum back to the kadai. Mix well.',
      'Add paneer cubes and garam masala. Gently mix. Sprinkle kasuri methi.',
      'Add a splash of water if needed. Simmer for 5 minutes.',
      'Garnish with coriander leaves and a drizzle of cream. Serve hot with naan or roti.'
    ],
    tips: [
      'For an authentic taste, dry roast and coarsely grind whole coriander seeds and dry red chilies to make your own kadai masala.',
      'To prevent paneer from breaking, add it at the end and avoid over-stirring.'
    ],
    dietaryInfo: ['Vegetarian', 'High-Protein'],
  },
  {
    id: 11,
    slug: 'keto-butter-chicken',
    foodName: 'Keto Butter Chicken',
    image: 'https://images.unsplash.com/photo-1603893662176-98edbb5dc1a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Low-carb version of the classic butter chicken.',
    prepTime: '15 mins (plus 1 hour marination)',
    cookTime: '30 mins',
    servings: 3,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 450, protein: 30, carbs: 8, fat: 35, fiber: 3 },
    ingredients: [
      '500g chicken thighs, boneless and cut into pieces',
      '1/2 cup plain Greek yogurt',
      '1 tbsp lemon juice',
      '1 tbsp ginger-garlic paste',
      '1 tsp turmeric powder',
      '2 tsp Kashmiri red chili powder',
      'Salt to taste',
      'For Gravy: 1/2 cup onion, finely chopped, 10-12 cashews (soaked), 2 tomatoes, pureed, 1 tsp garam masala, 2 tbsp butter, 1/2 cup heavy cream'
    ],
    instructions: [
      'Marinate chicken with yogurt, lemon juice, ginger-garlic paste, turmeric, 1 tsp chili powder, and salt for 1 hour.',
      'Grill or pan-fry the marinated chicken until cooked through. Set aside.',
      'In a blender, make a smooth paste of soaked cashews with a little water.',
      'Heat butter in a pan. Sauté onions until soft.',
      'Add tomato puree and cook until thick and oil separates.',
      'Add the cashew paste, remaining chili powder, and garam masala. Cook for 5 minutes.',
      'Add the cooked chicken pieces and simmer for 5-7 minutes.',
      'Turn off the heat and stir in the heavy cream.',
      'Garnish with more cream and coriander. Serve with cauliflower rice.'
    ],
    tips: [
      'Soaking cashews in hot water for 20 minutes makes them easier to blend into a smooth paste.',
      'Do not boil the gravy after adding cream to prevent curdling.'
    ],
    dietaryInfo: ['High-Protein', 'Low-Carb', 'Keto'],
  },
  {
    id: 12,
    slug: 'khaman-dhokla',
    foodName: 'Khaman Dhokla',
    image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Steamed savory chickpea flour cakes from Gujarat.',
    prepTime: '10 mins',
    cookTime: '20 mins',
    servings: 4,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 180, protein: 7, carbs: 25, fat: 5, fiber: 3 },
    ingredients: [
      '1 cup besan (gram flour)',
      '1 tbsp semolina (sooji)',
      '1 tbsp lemon juice',
      '1 tbsp sugar',
      '1 tsp ginger-green chili paste',
      '1/2 tsp turmeric powder',
      '1 Eno fruit salt packet',
      'Salt to taste',
      'For tempering: 2 tbsp oil, 1 tsp mustard seeds, 2 green chilies slit, curry leaves, pinch of asafoetida, 2 tbsp water, 1 tbsp sugar',
      'Fresh coriander and grated coconut for garnish'
    ],
    instructions: [
      'In a bowl, mix besan, semolina, ginger-chili paste, turmeric, lemon juice, 1 tbsp sugar, salt.',
      'Add water gradually to make a smooth, pouring consistency batter.',
      'Grease a steaming plate or thali.',
      'Just before steaming, add Eno fruit salt to the batter and mix gently. You will see bubbles forming.',
      'Pour the batter immediately into the greased plate.',
      'Steam for 12-15 minutes until a toothpick inserted comes out clean.',
      'Let it cool slightly. Cut into squares.',
      'Prepare tempering: heat oil, add mustard seeds, let them pop. Add green chilies, curry leaves, asafoetida. Add 2 tbsp water and 1 tbsp sugar. Pour this over the dhoklas.',
      'Garnish with coriander and coconut. Serve with green chutney.'
    ],
    tips: [
      'Do not overmix the batter after adding Eno, or the air bubbles will break.',
      'The batter should be of pouring consistency, not too thick or thin.'
    ],
    dietaryInfo: ['Vegetarian', 'Gluten-Free'],
  },
  {
    id: 13,
    slug: 'kheer',
    foodName: 'Kheer',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Traditional rice pudding with nuts and cardamom.',
    prepTime: '5 mins',
    cookTime: '40 mins',
    servings: 6,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 320, protein: 8, carbs: 45, fat: 12, fiber: 1 },
    ingredients: [
      '1/4 cup basmati rice',
      '1 liter full-fat milk',
      '1/2 cup sugar (adjust to taste)',
      '1/4 tsp cardamom powder',
      'A pinch of saffron strands (soaked in 1 tbsp milk)',
      '2 tbsp mixed nuts (almonds, pistachios, cashews), chopped',
      '1 tbsp raisins',
      '1 tbsp ghee'
    ],
    instructions: [
      'Wash the rice and soak it in water for 30 minutes. Drain.',
      'In a heavy-bottomed pan, bring milk to a boil.',
      'Add the drained rice. Cook on low-medium heat, stirring frequently, for 30-35 minutes until the rice is cooked and the milk reduces to about 2/3rd.',
      'In a small pan, heat ghee and lightly fry the nuts and raisins. Set aside.',
      'Once the rice is cooked, add sugar and mix well.',
      'Add cardamom powder, saffron milk, and fried nuts (reserve some for garnish).',
      'Cook for another 5 minutes until the sugar dissolves and the kheer thickens slightly.',
      'Serve warm or chilled, garnished with reserved nuts.'
    ],
    tips: [
      'Stir the kheer frequently to prevent the milk from sticking to the bottom of the pan.',
      'The kheer will thicken as it cools. Add a little milk when serving if it becomes too thick.'
    ],
    dietaryInfo: ['Vegetarian'],
  },
  {
    id: 14,
    slug: 'lauki-chana-dal',
    foodName: 'Lauki Chana Dal',
    image: 'https://images.unsplash.com/photo-1547516505-4fce0fd5c8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Bottle gourd cooked with split chickpeas and spices.',
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 220, protein: 9, carbs: 35, fat: 5, fiber: 10 },
    ingredients: [
      '1 cup chana dal (split chickpeas), soaked for 30 minutes',
      '2 cups bottle gourd (lauki/doodhi), peeled and cubed',
      '1 onion, finely chopped',
      '2 tomatoes, chopped',
      '1 tbsp ginger-garlic paste',
      '1 green chili, slit',
      '1 tsp cumin seeds',
      '1/2 tsp turmeric powder',
      '1 tsp red chili powder',
      '1 tsp garam masala',
      '2 tbsp oil',
      'Salt to taste',
      'Fresh coriander for garnish'
    ],
    instructions: [
      'Drain the soaked chana dal.',
      'Heat oil in a pressure cooker. Add cumin seeds.',
      'Add onions and sauté until translucent. Add ginger-garlic paste and green chili, cook for a minute.',
      'Add tomatoes and cook until soft. Add all spices and sauté for 2 minutes.',
      'Add cubed bottle gourd and drained chana dal. Mix well.',
      'Add 2.5 cups of water and salt. Pressure cook for 3-4 whistles.',
      'Let the pressure release naturally. If the curry is too watery, simmer without the lid for a few minutes.',
      'Garnish with fresh coriander. Serve hot with roti or rice.'
    ],
    tips: [
      'Do not overcook the dal, or it will become mushy.',
      'You can add a spoonful of ghee at the end for extra flavor.'
    ],
    dietaryInfo: ['Vegetarian', 'High-Fiber'],
  },
  {
    id: 15,
    slug: 'masala-chai',
    foodName: 'Masala Chai',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Spiced Indian tea with milk and aromatic spices.',
    prepTime: '2 mins',
    cookTime: '10 mins',
    servings: 2,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 80, protein: 4, carbs: 10, fat: 2, fiber: 0 },
    ingredients: [
      '2 cups water',
      '1 cup milk',
      '2 tsp loose black tea leaves or 2 tea bags',
      '2 tbsp sugar (adjust to taste)',
      '2-3 green cardamom pods, crushed',
      '1 small piece of ginger, crushed',
      '1 small cinnamon stick',
      '2 cloves',
      'A pinch of fennel seeds (optional)',
      'A pinch of black peppercorns (optional)'
    ],
    instructions: [
      'In a saucepan, add water and all the whole spices (cardamom, ginger, cinnamon, cloves, fennel, peppercorns).',
      'Bring to a boil. Let it simmer for 3-4 minutes to infuse the water with the spices.',
      'Add tea leaves and sugar. Boil for 1 minute.',
      'Add milk. Bring to a boil again.',
      'Reduce heat and simmer for 2-3 minutes until the tea is fragrant and reaches your desired color.',
      'Strain into cups and serve hot.'
    ],
    tips: [
      'Let the water and spices boil well to extract the maximum flavor.',
      'Adjust the milk and sugar quantity as per your preference.'
    ],
    dietaryInfo: ['Vegetarian'],
  },
  {
    id: 16,
    slug: 'masala-oats',
    foodName: 'Masala Oats',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Spiced oats with vegetables and herbs.',
    prepTime: '5 mins',
    cookTime: '15 mins',
    servings: 2,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 200, protein: 7, carbs: 35, fat: 4, fiber: 6 },
    ingredients: [
      '1 cup rolled oats',
      '1 small onion, finely chopped',
      '1 small tomato, chopped',
      '1/4 cup mixed vegetables (peas, carrots, corn)',
      '1 green chili, chopped',
      '1 tsp oil',
      '1/2 tsp mustard seeds',
      '1/2 tsp cumin seeds',
      '1/4 tsp turmeric powder',
      '1/2 tsp red chili powder',
      '1 tsp coriander powder',
      'Salt to taste',
      '2.5 cups water',
      'Lemon juice and coriander for garnish'
    ],
    instructions: [
      'Dry roast the oats in a pan for 2-3 minutes until fragrant. Set aside.',
      'Heat oil in the same pan. Add mustard and cumin seeds. Let them splutter.',
      'Add onions and green chili. Sauté until onions are translucent.',
      'Add tomatoes and cook until soft. Add all spices and salt. Cook for a minute.',
      'Add mixed vegetables and water. Bring to a boil.',
      'Add the roasted oats. Mix well and cook on medium heat for 5-7 minutes, stirring occasionally, until the oats are cooked and the water is absorbed.',
      'Garnish with lemon juice and fresh coriander. Serve hot.'
    ],
    tips: [
      'Dry roasting the oats prevents them from becoming mushy.',
      'You can use quick-cooking oats for a faster version.'
    ],
    dietaryInfo: ['Vegetarian', 'Vegan', 'High-Fiber'],
  },
  {
    id: 17,
    slug: 'millet-khichdi',
    foodName: 'Millet Khichdi',
    image: 'https://images.unsplash.com/photo-1609505848915-81dd1b3c731c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Nutritious millet khichdi with vegetables.',
    prepTime: '10 mins',
    cookTime: '30 mins',
    servings: 3,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 300, protein: 7, carbs: 50, fat: 8, fiber: 9 },
    ingredients: [
      '1 cup millet (e.g., foxtail, little, or barnyard), washed',
      '1/2 cup moong dal, washed',
      '1 small onion, chopped',
      '1 small tomato, chopped',
      '1/2 cup mixed vegetables',
      '1 tbsp ghee',
      '1 tsp cumin seeds',
      '1/2 tsp turmeric powder',
      '1 tsp ginger-garlic paste',
      'Salt to taste',
      '4 cups water',
      'Coriander for garnish'
    ],
    instructions: [
      'Heat ghee in a pressure cooker. Add cumin seeds.',
      'Add onions and sauté until pink. Add ginger-garlic paste, cook for 30 sec.',
      'Add tomatoes and vegetables. Sauté for 2 mins.',
      'Add turmeric and drained millet and dal. Sauté for 2 minutes.',
      'Add water and salt. Pressure cook for 3-4 whistles.',
      'Let the pressure release naturally. Fluff it up with a fork.',
      'Garnish with coriander. Serve hot with yogurt or pickle.'
    ],
    tips: [
      'You can use any single millet or a mix of millets.',
      'The water ratio may vary slightly depending on the type of millet used.'
    ],
    dietaryInfo: ['Vegetarian', 'Gluten-Free', 'High-Fiber'],
  },
  {
    id: 18,
    slug: 'moong-dal-halwa',
    foodName: 'Moong Dal Halwa',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Sweet lentil pudding with ghee and nuts.',
    prepTime: '15 mins (plus 4 hours soaking)',
    cookTime: '45 mins',
    servings: 6,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 450, protein: 8, carbs: 55, fat: 22, fiber: 5 },
    ingredients: [
      '1 cup moong dal (split yellow gram), soaked for 4 hours',
      '1 cup ghee',
      '1 cup sugar',
      '3 cups water',
      '1/2 tsp cardamom powder',
      'A pinch of saffron strands (soaked in 2 tbsp milk)',
      '1/4 cup mixed nuts (almonds, cashews), chopped',
      '2 tbsp raisins'
    ],
    instructions: [
      'Drain the soaked dal completely. Grind it into a coarse paste without adding any water.',
      'Heat ghee in a heavy-bottomed kadai or pan.',
      'Add the ground dal paste. Cook on low-medium heat, stirring continuously, for 25-30 minutes until the dal turns golden brown and fragrant.',
      'In a separate pot, heat water and sugar to make a sugar syrup. Let it simmer until the sugar dissolves completely.',
      'Once the dal is cooked, carefully add the hot sugar syrup to it. Be careful as it may splutter.',
      'Add cardamom powder and saffron milk. Mix well.',
      'Continue to cook on low heat, stirring continuously, until the halwa thickens and starts to leave the sides of the pan (about 10-15 minutes).',
      'In a small pan, fry the nuts and raisins in a little ghee and add to the halwa.',
      'Serve hot.'
    ],
    tips: [
      'Stirring continuously is the key to preventing the halwa from burning.',
      'The halwa thickens as it cools. Add a little more water or milk when reheating if needed.'
    ],
    dietaryInfo: ['Vegetarian'],
  },
  {
    id: 19,
    slug: 'mutter-mushroom',
    foodName: 'Mutter Mushroom',
    image: 'https://images.unsplash.com/photo-1570194065313-1862e47db986?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Peas and mushrooms in a creamy tomato gravy.',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 280, protein: 10, carbs: 25, fat: 16, fiber: 6 },
    ingredients: [
      '200g button mushrooms, sliced',
      '1 cup green peas (fresh or frozen)',
      '1 onion, finely chopped',
      '2 tomatoes, pureed',
      '1 tbsp ginger-garlic paste',
      '1/2 cup cream',
      '2 tbsp oil',
      '1 tsp cumin seeds',
      '1 bay leaf',
      '1 tsp red chili powder',
      '1 tsp coriander powder',
      '1/2 tsp garam masala',
      'Salt to taste',
      'Coriander for garnish'
    ],
    instructions: [
      'Heat oil in a pan. Add cumin seeds and bay leaf.',
      'Add onions and sauté until golden. Add ginger-garlic paste, cook for a minute.',
      'Add tomato puree and cook until oil separates.',
      'Add all dry spices and salt. Cook for 2 minutes.',
      'Add mushrooms and peas. Mix well and cook for 5-7 minutes until mushrooms release water and are cooked.',
      'Add cream and simmer for another 5 minutes on low heat.',
      'Garnish with garam masala and coriander. Serve hot with naan or roti.'
    ],
    tips: [
      'Do not wash mushrooms under running water. Wipe them with a damp cloth to clean.',
      'You can use cashew paste instead of cream for a richer, vegan gravy.'
    ],
    dietaryInfo: ['Vegetarian'],
  },
  {
    id: 20,
    slug: 'nutrela-soy-chunk-curry',
    foodName: 'Nutrela Soy Chunk Curry',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Protein-rich soy chunks in a spicy curry.',
    prepTime: '10 mins',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 250, protein: 20, carbs: 15, fat: 12, fiber: 8 },
    ingredients: [
      '1 cup soy chunks (nutrela)',
      '1 onion, finely chopped',
      '2 tomatoes, pureed',
      '1 tbsp ginger-garlic paste',
      '2 tbsp oil',
      '1 tsp cumin seeds',
      '1 tsp red chili powder',
      '1 tsp coriander powder',
      '1/2 tsp turmeric powder',
      '1 tsp garam masala',
      'Salt to taste',
      'Coriander for garnish'
    ],
    instructions: [
      'Soak soy chunks in hot water for 10 minutes. Squeeze out all the water and rinse well. Set aside.',
      'Heat oil in a pan. Add cumin seeds.',
      'Add onions and sauté until golden. Add ginger-garlic paste, cook for a minute.',
      'Add tomato puree and cook until oil separates.',
      'Add all dry spices and salt. Cook for 2 minutes.',
      'Add the squeezed soy chunks. Mix well to coat with the masala.',
      'Add 1 cup of water. Cover and simmer for 10-15 minutes.',
      'Garnish with garam masala and coriander. Serve hot with rice or roti.'
    ],
    tips: [
      'Squeezing the soy chunks thoroughly removes any raw smell and helps them absorb the gravy.',
      'You can marinate the squeezed soy chunks in a little yogurt and spices for 15 minutes for extra flavor.'
    ],
    dietaryInfo: ['Vegetarian', 'Vegan', 'High-Protein'],
  },
  {
    id: 21,
    slug: 'quinoa-upma',
    foodName: 'Quinoa Upma',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Healthy quinoa preparation with vegetables and spices.',
    prepTime: '10 mins',
    cookTime: '20 mins',
    servings: 3,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 280, protein: 9, carbs: 45, fat: 7, fiber: 7 },
    ingredients: [
      '1 cup quinoa, rinsed well',
      '1 onion, finely chopped',
      '1/2 cup mixed vegetables (peas, carrots, beans)',
      '1 green chili, chopped',
      '1 tbsp oil',
      '1 tsp mustard seeds',
      '1 tsp urad dal',
      '1 tsp chana dal',
      'A few curry leaves',
      '1/2 tsp turmeric powder',
      '1 tbsp lemon juice',
      'Salt to taste',
      '2.5 cups water',
      'Coriander for garnish'
    ],
    instructions: [
      'Dry roast the rinsed quinoa in a pan for 3-4 minutes until fragrant. Set aside.',
      'Heat oil in the same pan. Add mustard seeds, let them pop. Add urad dal, chana dal, and curry leaves.',
      'Add onions and green chili. Sauté until onions are translucent.',
      'Add mixed vegetables and turmeric powder. Sauté for 2-3 minutes.',
      'Add water and salt. Bring to a boil.',
      'Add the roasted quinoa. Mix well, reduce heat, cover, and simmer for 15 minutes until the quinoa is cooked and water is absorbed.',
      'Fluff it up with a fork. Drizzle lemon juice and garnish with coriander.',
      'Serve hot.'
    ],
    tips: [
      'Rinsing quinoa thoroughly removes its natural coating (saponin) which can be bitter.',
      'You can use vegetable broth instead of water for more flavor.'
    ],
    dietaryInfo: ['Vegetarian', 'Gluten-Free', 'High-Protein'],
  },
  {
    id: 22,
    slug: 'rajma-chawal',
    foodName: 'Rajma Chawal',
    image: 'https://images.unsplash.com/photo-1589302168067-4c95e1a5c63a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Kidney bean curry served with steamed rice.',
    prepTime: '10 mins (plus 8 hours soaking)',
    cookTime: '45 mins',
    servings: 6,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 420, protein: 15, carbs: 70, fat: 8, fiber: 15 },
    ingredients: [
      '1 cup rajma (kidney beans), soaked overnight',
      '2 large onions, finely chopped',
      '2 tomatoes, pureed',
      '1 tbsp ginger-garlic paste',
      '2 tbsp oil',
      '1 tsp cumin seeds',
      '2 bay leaves',
      '1 tbsp rajma masala',
      '1 tsp red chili powder',
      '1/2 tsp turmeric powder',
      'Salt to taste',
      'Coriander for garnish',
      'Steamed rice for serving'
    ],
    instructions: [
      'Drain the soaked rajma. Pressure cook with 4 cups of water and salt for 5-6 whistles until very soft.',
      'Heat oil in a pan. Add cumin seeds and bay leaves.',
      'Add onions and sauté until golden brown. Add ginger-garlic paste, cook for a minute.',
      'Add tomato puree and cook until oil separates.',
      'Add all spices and cook for 2 minutes.',
      'Add the cooked rajma along with its water. Mix well.',
      'Simmer for 15-20 minutes until the gravy thickens.',
      'Mash a few rajma beans with the back of a spoon to thicken the gravy.',
      'Garnish with coriander. Serve hot with steamed rice.'
    ],
    tips: [
      'Soaking rajma overnight is essential for even cooking.',
      'Using a pressure cooker is the best way to get perfectly soft rajma.'
    ],
    dietaryInfo: ['Vegetarian', 'Vegan', 'High-Fiber'],
  },
  {
    id: 23,
    slug: 'saag-paneer',
    foodName: 'Saag Paneer',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Spinach curry with cottage cheese cubes.',
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 320, protein: 15, carbs: 15, fat: 22, fiber: 5 },
    ingredients: [
      '250g paneer, cubed',
      '1 large bunch spinach (palak), washed',
      '1 onion, chopped',
      '2 tomatoes, chopped',
      '1 tbsp ginger-garlic paste',
      '2 green chilies',
      '2 tbsp oil',
      '1 tsp cumin seeds',
      '1/2 tsp turmeric powder',
      '1 tsp garam masala',
      '1/2 cup cream (optional)',
      'Salt to taste'
    ],
    instructions: [
      'Blanch spinach in hot water for 2 minutes. Drain and immediately transfer to ice water. Blend into a smooth puree.',
      'Heat oil in a pan. Lightly fry the paneer cubes until golden. Set aside.',
      'In the same pan, add cumin seeds. Add onions and sauté until translucent.',
      'Add ginger-garlic paste and green chilies. Cook for a minute.',
      'Add tomatoes and cook until soft. Add turmeric and salt.',
      'Add the spinach puree and cook for 8-10 minutes on medium heat.',
      'Add garam masala and cream (if using). Mix well.',
      'Gently add the fried paneer cubes. Simmer for 5 minutes.',
      'Serve hot with naan or roti.'
    ],
    tips: [
      'Blanching spinach helps retain its bright green color.',
      'Soak the fried paneer cubes in warm water for 10 minutes to make them soft before adding to the gravy.'
    ],
    dietaryInfo: ['Vegetarian', 'High-Protein'],
  },
  {
    id: 24,
    slug: 'sprouted-moong-salad',
    foodName: 'Sprouted Moong Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Healthy salad with sprouted mung beans and vegetables.',
    prepTime: '15 mins (plus 2 days for sprouting)',
    cookTime: '5 mins',
    servings: 2,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 180, protein: 12, carbs: 30, fat: 2, fiber: 10 },
    ingredients: [
      '2 cups sprouted moong (mung beans)',
      '1 cucumber, finely chopped',
      '1 tomato, deseeded and chopped',
      '1 onion, finely chopped',
      '1 green chili, finely chopped (optional)',
      '2 tbsp coriander leaves, chopped',
      '1 tbsp lemon juice',
      '1/2 tsp roasted cumin powder',
      '1/2 tsp chaat masala',
      'Salt to taste',
      'A pinch of black salt (kala namak)'
    ],
    instructions: [
      'If you prefer, you can steam the sprouted moong for 5 minutes or leave it raw for a crunchier texture. Let it cool if steamed.',
      'In a large bowl, combine the sprouted moong, cucumber, tomato, onion, and green chili.',
      'Add lemon juice, all spices, and salt.',
      'Toss everything well. Garnish with coriander leaves.',
      'Serve immediately.'
    ],
    tips: [
      'To sprout moong: Soak whole moong overnight. Drain, tie in a muslin cloth, and keep in a dark place for 24 hours. Rinse once in between.',
      'You can add pomegranate seeds or boiled corn for a sweet crunch.'
    ],
    dietaryInfo: ['Vegetarian', 'Vegan', 'Gluten-Free', 'High-Protein'],
  },
  {
    id: 25,
    slug: 'sprouted-ragi-dosa',
    foodName: 'Sprouted Ragi Dosa',
    image: 'https://images.unsplash.com/photo-1634047090011-1df9960005e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Fermented crepe made with sprouted ragi flour.',
    prepTime: '8 hours (fermentation)',
    cookTime: '20 mins',
    servings: 4,
    difficulty: 'Medium',
    nutritionalInfo: { calories: 150, protein: 5, carbs: 25, fat: 3, fiber: 6 },
    ingredients: [
      '1 cup sprouted ragi flour',
      '1/2 cup urad dal',
      '1/4 cup poha (flattened rice)',
      '1/2 tsp fenugreek seeds',
      'Salt to taste',
      'Oil for cooking'
    ],
    instructions: [
      'Soak urad dal and fenugreek seeds together for 4-6 hours.',
      'Soak poha in water for 30 minutes before grinding.',
      'Grind urad dal and fenugreek seeds into a smooth, fluffy batter.',
      'Add the soaked poha and sprouted ragi flour to the batter. Add salt and enough water to make a dosa batter consistency.',
      'Mix well, cover, and let it ferment overnight or for 8 hours.',
      'Heat a dosa tawa. Pour a ladleful of batter and spread in a circular motion to make a thin dosa.',
      'Drizzle oil around the edges. Cook until the bottom is crisp and golden.',
      'Flip and cook the other side for a minute. Serve hot with chutney and sambar.'
    ],
    tips: [
      'Fermentation time depends on the weather. It might take longer in cold climates.',
      'The batter should be of pouring consistency, not too thick.'
    ],
    dietaryInfo: ['Vegetarian', 'Gluten-Free', 'High-Fiber'],
  },
  {
    id: 26,
    slug: 'sweet-potato-chaat',
    foodName: 'Sweet Potato Chaat',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Spicy and tangy sweet potato street food.',
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: 3,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 200, protein: 3, carbs: 40, fat: 4, fiber: 6 },
    ingredients: [
      '2 large sweet potatoes, boiled and cubed',
      '1 onion, finely chopped',
      '1 tomato, deseeded and chopped',
      '2 tbsp coriander leaves, chopped',
      '1 green chili, finely chopped',
      '1 tbsp lemon juice',
      '1/2 tsp roasted cumin powder',
      '1 tsp chaat masala',
      '1/2 tsp red chili powder',
      'Salt to taste',
      'Sev (gram flour noodles) and pomegranate for garnish (optional)'
    ],
    instructions: [
      'In a large bowl, combine boiled sweet potato cubes, onion, tomato, green chili, and coriander.',
      'Add lemon juice, cumin powder, chaat masala, red chili powder, and salt.',
      'Toss gently to mix everything without breaking the sweet potatoes.',
      'Garnish with more chaat masala, sev, and pomegranate seeds.',
      'Serve immediately.'
    ],
    tips: [
      'You can steam or roast the sweet potatoes instead of boiling for a different flavor.',
      'Adjust the spices according to your taste preference.'
    ],
    dietaryInfo: ['Vegetarian', 'Vegan', 'Gluten-Free'],
  },
  {
    id: 27,
    slug: 'tandoori-chicken-salad',
    foodName: 'Tandoori Chicken Salad',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Grilled chicken with fresh vegetables and dressing.',
    prepTime: '15 mins (plus 1 hour marination)',
    cookTime: '20 mins',
    servings: 2,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 320, protein: 35, carbs: 15, fat: 14, fiber: 5 },
    ingredients: [
      '200g chicken breast, cut into strips',
      '2 tbsp yogurt',
      '1 tbsp tandoori masala',
      '1 tbsp lemon juice',
      '4 cups mixed salad greens (lettuce, spinach, arugula)',
      '1 cucumber, sliced',
      '1 bell pepper, sliced',
      '1/2 cup cherry tomatoes, halved',
      'For dressing: 2 tbsp olive oil, 1 tbsp lemon juice, 1 tsp honey, salt, and pepper'
    ],
    instructions: [
      'Marinate chicken strips with yogurt, tandoori masala, and lemon juice for 1 hour.',
      'Grill or pan-fry the chicken until cooked through and slightly charred. Let it rest for 5 minutes, then slice.',
      'In a large bowl, combine all the salad vegetables.',
      'Whisk together all the dressing ingredients.',
      'Add the sliced tandoori chicken to the salad.',
      'Drizzle the dressing over the salad and toss gently.',
      'Serve immediately.'
    ],
    tips: [
      'Do not overcook the chicken to keep it juicy.',
      'You can add other vegetables like red onion, olives, or avocado.'
    ],
    dietaryInfo: ['High-Protein', 'Low-Carb'],
  },
  {
    id: 28,
    slug: 'tandoori-fish-tikka',
    foodName: 'Tandoori Fish Tikka',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Marinated fish grilled in tandoor.',
    prepTime: '15 mins (plus 1 hour marination)',
    cookTime: '15 mins',
    servings: 3,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 280, protein: 30, carbs: 5, fat: 15, fiber: 1 },
    ingredients: [
      '500g firm fish fillets (like salmon, kingfish, or tuna), cut into cubes',
      '1/2 cup yogurt',
      '1 tbsp ginger-garlic paste',
      '1 tbsp lemon juice',
      '1 tbsp tandoori masala',
      '1/2 tsp turmeric powder',
      '1 tsp red chili powder',
      '1 tbsp mustard oil',
      'Salt to taste',
      'Lemon wedges and onion rings for serving'
    ],
    instructions: [
      'Pat dry the fish cubes completely.',
      'In a bowl, mix yogurt, ginger-garlic paste, lemon juice, all spices, mustard oil, and salt.',
      'Add the fish cubes to the marinade. Gently coat them. Marinate for at least 1 hour in the refrigerator.',
      'Preheat the grill or oven to 200°C (400°F).',
      'Thread the marinated fish onto skewers.',
      'Grill for 10-12 minutes, turning occasionally, until the fish is cooked and has a slight char.',
      'Serve hot with lemon wedges and onion rings.'
    ],
    tips: [
      'Do not over-marinate the fish as the acids in the marinade can start to "cook" it, making it mushy.',
      'If using wooden skewers, soak them in water for 30 minutes before use.'
    ],
    dietaryInfo: ['High-Protein', 'Low-Carb'],
  },
  {
    id: 29,
    slug: 'veg-pulao',
    foodName: 'Veg Pulao',
    image: 'https://images.unsplash.com/photo-1589302168067-4c95e1a5c63a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Fragrant rice cooked with vegetables and spices.',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    difficulty: 'Easy',
    nutritionalInfo: { calories: 350, protein: 7, carbs: 65, fat: 8, fiber: 5 },
    ingredients: [
      '1.5 cups basmati rice, soaked for 30 minutes',
      '1 cup mixed vegetables (carrots, peas, beans, cauliflower)',
      '1 onion, sliced',
      '2 tbsp ghee or oil',
      'Whole spices: 1 bay leaf, 2 green cardamom, 1 black cardamom, 1-inch cinnamon, 4 cloves',
      '1 tsp cumin seeds',
      '1 tbsp ginger-garlic paste',
      '1/2 tsp turmeric powder',
      'Salt to taste',
      '3 cups water',
      'Coriander and fried onions for garnish'
    ],
    instructions: [
      'Drain the soaked rice.',
      'Heat ghee/oil in a pressure cooker or pot. Add whole spices and cumin seeds.',
      'Add onions and sauté until golden. Add ginger-garlic paste, cook for a minute.',
      'Add mixed vegetables and turmeric. Sauté for 2-3 minutes.',
      'Add drained rice. Gently sauté for 2 minutes.',
      'Add water and salt. Bring to a boil.',
      'If using a pot, cover and cook on low heat until rice is done. If using a pressure cooker, cook for 2 whistles on low heat.',
      'Let the pressure release naturally. Fluff the rice with a fork.',
      'Garnish with coriander and fried onions. Serve hot with raita.'
    ],
    tips: [
      'Soaking rice ensures long, separate grains.',
      'You can use vegetable stock instead of water for more flavor.'
    ],
    dietaryInfo: ['Vegetarian'],
  },
  {
    id: 30,
    slug: 'veg-thali',
    foodName: 'Veg Thali',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Complete meal with various dishes, bread, rice, and dessert.',
    prepTime: '1 hour',
    cookTime: '1 hour 30 mins',
    servings: 4,
    difficulty: 'Hard',
    nutritionalInfo: { calories: 650, protein: 18, carbs: 95, fat: 22, fiber: 15 },
    ingredients: [
      '**For Dal:** 1 cup tuvar dal, spices, tempering',
      '**For Sabzi:** 2 vegetables of choice (e.g., Aloo Gobi, Bhindi), spices',
      '**For Roti:** 2 cups whole wheat flour, water',
      '**For Rice:** 1 cup basmati rice',
      '**For Raita:** 1 cup yogurt, cucumber/tomato, roasted cumin',
      '**For Salad:** Onion, cucumber, tomato, lemon',
      '**For Dessert:** A small portion of sweet (e.g., halwa, shrikhand)',
      '**For Papad:** 4 papads',
      '**For Pickle:** Mixed pickle',
      'Ghee, oil, salt, and spices as required'
    ],
    instructions: [
      '**Plan:** This is an assembly of dishes. Prepare components that take the longest first (e.g., dal, dessert).',
      '**Cook Dal:** Pressure cook dal with turmeric. Prepare a tempering with ghee, cumin, garlic, and red chili. Mix into the cooked dal.',
      '**Make Sabzi:** Choose 2 quick-cooking vegetables. Sauté with spices to make dry or semi-dry curries.',
      '**Prepare Rice:** Cook basmati rice with a few whole spices until fluffy.',
      '**Make Roti:** Knead wheat dough. Roll and cook on a tawa until puffed and golden.',
      '**Whisk Raita:** Whisk yogurt until smooth. Add grated cucumber/chopped tomato, salt, and roasted cumin powder.',
      '**Assemble Salad:** Chop vegetables and keep them fresh with a squeeze of lemon.',
      '**Fry/Roast Papad:** Fry or microwave papads until crisp.',
      '**Arrange Thali:** Place small portions of each component (dal, sabzi, rice, roti, raita, salad, papad, pickle, dessert) in a large plate (thali).',
      'Serve immediately.'
    ],
    tips: [
      'Mise en place is key! Chop all vegetables and measure spices before you start cooking.',
      'You can prepare the dal and some sabzis a few hours in advance to manage time.'
    ],
    dietaryInfo: ['Vegetarian', 'Balanced Meal'],
  }
      ];
      
      // Find recipe by slug (id parameter)
      const foundRecipe = sampleRecipes.find(r => r.slug === id);
      setRecipe(foundRecipe);
      setLoading(false);
    };
    
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  
  if (!recipe) return (
    <div className="py-12">
      <div className="container-custom">
        <div className="card p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
          <p className="text-gray-300 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn btn-primary px-6 py-3">Back to Home</Link>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="py-8 text-white">
      <div className="container-custom">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <Link to="/" className="text-primary hover:text-primary/80 font-medium flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.foodName} Recipe</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.dietaryInfo.map((info, index) => (
                <span key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  {info}
                </span>
              ))}
            </div>
            <p className="text-gray-300 mb-6">{recipe.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                {label: 'Prep Time', value: recipe.prepTime}, 
                {label: 'Cook Time', value: recipe.cookTime}, 
                {label: 'Servings', value: recipe.servings}, 
                {label: 'Difficulty', value: recipe.difficulty}
              ].map(item => (
                <div key={item.label} className="bg-white/10 p-4 rounded-lg text-center">
                  <span className="block text-gray-400 text-sm">{item.label}</span>
                  <span className="block text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div className="mb-8 rounded-xl overflow-hidden shadow-lg" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <img src={recipe.image} alt={recipe.foodName} className="w-full h-96 object-cover"/>
          </motion.div>
          
          <motion.div className="mb-8 card p-6" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <h2 className="text-2xl font-bold mb-4">Nutritional Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-primary">{value}{key !== 'calories' && 'g'}</div>
                  <div className="text-gray-400 text-sm capitalize">{key}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div className="card p-6" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-3 text-gray-300">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2 mt-1">&#10003;</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div className="card p-6" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary font-bold text-sm mr-4">
                      {i + 1}
                    </span>
                    <span className="text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
          
          {recipe.tips && recipe.tips.length > 0 && (
            <motion.div className="card p-6" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <h2 className="text-2xl font-bold mb-4">Chef's Tips</h2>
              <ul className="space-y-3">
                {recipe.tips.map((tip, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-yellow-400 mr-3 mt-1">&#9733;</span>
                    <span className="text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RecipePage;