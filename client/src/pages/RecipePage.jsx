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
  slug: 'paneer-tikka-masala',
  foodName: 'Paneer Tikka Masala',
  image: 'https://images.unsplash.com/photo-1633793561126-4e85e7f0532f',
  description: 'Cubes of paneer marinated and grilled, simmered in a rich, creamy tomato gravy.',
  prepTime: '20 mins (plus 30 mins marination)',
  cookTime: '30 mins',
  servings: 3,
  difficulty: 'Medium',
  nutritionalInfo: { calories: 420, protein: 18, carbs: 20, fat: 30, fiber: 4 },
  ingredients: [
    'For Marinade:',
    '250g Paneer, cubed',
    '1/2 cup thick yogurt',
    '1 tbsp ginger-garlic paste',
    '1 tsp Kashmiri red chili powder',
    '1/2 tsp turmeric powder',
    '1 tsp garam masala',
    '1 tbsp lemon juice',
    '1 tbsp oil',
    'Salt to taste',
    '1 capsicum, cubed',
    '1 onion, cubed',
    '',
    'For Gravy:',
    '2 tbsp butter',
    '1 bay leaf',
    '1 tsp cumin seeds',
    '1 large onion, finely chopped',
    '1 tbsp ginger-garlic paste',
    '2 large tomatoes, pureed',
    '1 tbsp tomato paste',
    '1 tsp red chili powder',
    '1 tsp coriander powder',
    '1/2 tsp turmeric powder',
    '1 tsp kasuri methi (dried fenugreek leaves)',
    '1/2 cup fresh cream',
    '1/4 cup water',
    'Salt to taste',
    '1 tsp sugar (optional)',
    'Fresh coriander for garnish'
  ],
  instructions: [
    '1. Marinate Paneer: In a bowl, mix yogurt, ginger-garlic paste, chili powder, turmeric, garam masala, lemon juice, oil, and salt. Add paneer, capsicum, and onion cubes. Mix gently. Cover and marinate for at least 30 minutes.',
    '2. Cook Tikka: Skewer the marinated paneer and vegetables. Grill on a stovetop pan or in an oven at 200°C (400°F) for 10-15 minutes, turning occasionally, until charred at the edges. Set aside.',
    '3. Make Gravy: Heat butter in a pan. Add bay leaf and cumin seeds. Once they splutter, add finely chopped onion and sauté until golden brown.',
    '4. Add ginger-garlic paste and cook for a minute until fragrant. Add tomato puree, tomato paste, and all spice powders (except kasuri methi). Cook for 8-10 minutes until the oil separates from the masala.',
    '5. Finish Gravy: Add water and simmer for 2-3 minutes. Crush kasuri methi between your palms and add it. Stir in the fresh cream. Add sugar if using. Simmer for another 2 minutes.',
    '6. Combine: Gently add the grilled paneer tikka to the hot gravy. Do not overcook. Garnish with fresh coriander and a drizzle of cream. Serve hot with naan or rice.'
  ],
  tips: [
    'Do not overcook the paneer in the gravy, as it can become rubbery. Just warm it through.',
    'For a smoother gravy, let the cooked masala cool slightly and then blend it before adding cream.',
    'Kashmiri red chili powder gives a vibrant color without too much heat.'
  ],
  dietaryInfo: ['Vegetarian', 'Gluten-Free'],
},
{
  id: 2,
  slug: 'palak-paneer',
  foodName: 'Palak Paneer',
  image: 'https://images.unsplash.com/photo-1585937421610-8d33dcd0c5c3',
  description: 'Soft paneer cubes in a smooth, flavorful spinach gravy with spices.',
  prepTime: '15 mins',
  cookTime: '25 mins',
  servings: 3,
  difficulty: 'Easy',
  nutritionalInfo: { calories: 350, protein: 15, carbs: 12, fat: 28, fiber: 5 },
  ingredients: [
    '250g Paneer, cubed',
    '2 large bunches spinach (palak), washed thoroughly',
    '1 tbsp oil',
    '1 tbsp ghee',
    '1 tsp cumin seeds',
    '1 onion, finely chopped',
    '1 tbsp ginger-garlic paste',
    '1 green chili, chopped',
    '1 tomato, chopped',
    '1/2 tsp turmeric powder',
    '1 tsp coriander powder',
    '1/2 tsp garam masala',
    '1/4 cup cream (optional)',
    'Salt to taste',
    '1 tbsp lemon juice'
  ],
  instructions: [
    '1. Blanch Spinach: Bring a large pot of water to a boil. Add spinach and blanch for 2 minutes. Immediately transfer to ice-cold water. This retains the green color. Drain and blend into a smooth puree.',
    '2. Sauté Aromatics: Heat oil and ghee in a pan. Add cumin seeds. Once they splutter, add onions and sauté until golden. Add ginger-garlic paste and green chili, cook for a minute.',
    '3. Cook Tomatoes: Add tomatoes and cook until soft and mushy. Add turmeric, coriander powder, and salt. Cook until the oil starts to separate.',
    '4. Combine: Add the spinach puree to the pan. Mix well and simmer for 5-7 minutes.',
    '5. Add Paneer: Gently stir in the paneer cubes and garam masala. Simmer for another 3-4 minutes. If the gravy is too thick, add a little water.',
    '6. Finish: Turn off the heat. Stir in cream (if using) and lemon juice. Serve hot with naan or roti.'
  ],
  tips: [
    'Blanching the spinach is crucial to remove any raw taste and to get a vibrant green color.',
    'For a richer version, you can add a paste of cashews along with the spinach.',
    'To make the paneer soft, you can soak the cubes in warm water for 10 minutes before adding.'
  ],
  dietaryInfo: ['Vegetarian', 'Gluten-Free'],
},
{
  id: 3,
  slug: 'dal-makhani',
  foodName: 'Dal Makhani',
  image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40',
  description: 'Creamy black lentils and kidney beans slow-cooked with butter and spices.',
  prepTime: '10 mins (plus soaking overnight)',
  cookTime: '45 mins (or 15 mins pressure cook)',
  servings: 4,
  difficulty: 'Medium',
  nutritionalInfo: { calories: 380, protein: 18, carbs: 45, fat: 15, fiber: 20 },
  ingredients: [
    '1 cup whole black lentils (sabut urad dal)',
    '1/4 cup kidney beans (rajma)',
    '1 large onion, finely chopped',
    '2 tomatoes, pureed',
    '1 tbsp ginger-garlic paste',
    '2 tbsp butter',
    '1 tbsp ghee',
    '1 tsp cumin seeds',
    '2 bay leaves',
    '1 tbsp red chili powder',
    '1/2 tsp turmeric powder',
    '1 tbsp garam masala',
    '1/4 cup fresh cream',
    'Salt to taste',
    '4 cups water',
    'Fresh coriander for garnish'
  ],
  instructions: [
    '1. Soak & Cook: Soak urad dal and rajma overnight. Drain and rinse. Pressure cook with 4 cups of water and salt for 5-6 whistles until completely soft and mushy.',
    '2. Tempering: In a large pot, heat butter and ghee. Add cumin seeds and bay leaves. Let them splutter.',
    '3. Sauté: Add onions and sauté until golden brown. Add ginger-garlic paste and cook for a minute.',
    '4. Add Spices: Add tomato puree, red chili powder, and turmeric. Cook for 5-7 minutes until the oil separates.',
    '5. Combine: Add the cooked dal and rajma to the pot. Mix well. Simmer on low heat for at least 20-30 minutes, stirring occasionally. The longer it simmers, the better it tastes.',
    '6. Finish: Stir in garam masala and fresh cream. Simmer for another 5 minutes. Garnish with a dollop of butter and fresh coriander. Serve hot with rice or naan.'
  ],
  tips: [
    'The key to great Dal Makhani is slow cooking. If short on time, pressure cook the dal, then simmer on the stove for as long as possible.',
    'For a smoky flavor (tadka), heat a piece of charcoal until red hot, place it in a small bowl in the pot, drizzle with ghee, and cover immediately for 5 minutes.',
    'Mashing the dal slightly with the back of a spoon helps thicken the gravy.'
  ],
  dietaryInfo: ['Vegetarian', 'Gluten-Free', 'High-Fiber', 'High-Protein'],
},
{
  id: 4,
  slug: 'chole-bhature',
  foodName: 'Chole Bhature',
  image: 'https://images.unsplash.com/photo-1552766442-1b43d5b16d2f',
  description: 'Spicy, tangy, and flavorful chickpea curry.',
  prepTime: '10 mins (plus soaking overnight)',
  cookTime: '40 mins',
  servings: 4,
  difficulty: 'Medium',
  nutritionalInfo: { calories: 280, protein: 12, carbs: 45, fat: 6, fiber: 15 },
  ingredients: [
    '1.5 cups chickpeas (kabuli chana), soaked overnight',
    '2 black tea bags or 1 tbsp black tea leaves (for color)',
    '2 tbsp oil',
    '1 large onion, finely chopped',
    '1 tbsp ginger-garlic paste',
    '2 tomatoes, pureed',
    '1 tbsp coriander powder',
    '1.5 tbsp chole masala',
    '1/2 tsp turmeric powder',
    '1 tsp red chili powder',
    '1 tsp amchur (dry mango powder)',
    '1 tsp cumin seeds',
    '2 bay leaves',
    '1-inch cinnamon stick',
    '2 cloves',
    '2 green cardamoms',
    'Salt to taste',
    'Fresh coriander and sliced onions for garnish'
  ],
  instructions: [
    '1. Cook Chickpeas: Drain the soaked chickpeas. Place them in a pressure cooker with enough water to cover them, the tea bags (for a dark color), and a pinch of salt. Cook for 5-6 whistles until tender. Discard the tea bags.',
    '2. Prepare Masala: Heat oil in a pan. Add whole spices (cumin, bay leaf, cinnamon, cloves, cardamom). Let them splutter.',
    '3. Sauté: Add onions and sauté until golden. Add ginger-garlic paste and cook for a minute.',
    '4. Cook Tomatoes: Add tomato puree and all dry spice powders (coriander, chole masala, turmeric, red chili). Cook for 7-8 minutes until the oil separates from the masala.',
    '5. Combine: Add the cooked chickpeas along with the water they were cooked in. Mix well. Simmer for 15-20 minutes until the gravy thickens.',
    '6. Finish: Mash a few chickpeas with the back of a spoon to thicken the gravy. Stir in amchur powder. Adjust salt and spices. Garnish with fresh coriander and sliced onions. Serve with bhatura or poori.'
  ],
  tips: [
    'Using baking soda while soaking (a pinch) can help soften the chickpeas faster, but it\'s optional.',
    'The tea bags are a traditional trick to give chole its characteristic dark color.',
    'Amchur (dry mango powder) gives the tangy flavor. Lemon juice can be used as a substitute.'
  ],
  dietaryInfo: ['Vegetarian', 'Vegan', 'Gluten-Free', 'High-Fiber'],
},
{
  id: 5,
  slug: 'aloo-gobi',
  foodName: 'Aloo Gobi',
  image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
  description: 'A classic dry dish made with potatoes and cauliflower, sautéed with Indian spices.',
  prepTime: '15 mins',
  cookTime: '25 mins',
  servings: 3,
  difficulty: 'Easy',
  nutritionalInfo: { calories: 210, protein: 6, carbs: 35, fat: 6, fiber: 8 },
  ingredients: [
    '1 medium cauliflower (gobi), cut into florets',
    '2 medium potatoes (aloo), peeled and cubed',
    '2 tbsp oil',
    '1 tsp cumin seeds',
    '1 pinch asafoetida (hing)',
    '1 onion, finely chopped',
    '1 tbsp ginger-garlic paste',
    '1 green chili, slit',
    '1 tomato, finely chopped',
    '1/2 tsp turmeric powder',
    '1 tsp coriander powder',
    '1/2 tsp red chili powder',
    '1/2 tsp garam masala',
    '1/2 tsp dry mango powder (amchur)',
    'Salt to taste',
    'Fresh coriander for garnish'
  ],
  instructions: [
    '1. Par-cook Veggies: You can steam or microwave the cauliflower and potato cubes for 5-7 minutes until partially cooked. This prevents them from becoming mushy while sautéing.',
    '2. Tempering: Heat oil in a large kadai or pan. Add cumin seeds and asafoetida. Let them splutter.',
    '3. Sauté Aromatics: Add onions and sauté until translucent. Add ginger-garlic paste and green chili. Sauté for another minute.',
    '4. Add Tomatoes: Add tomatoes and cook until soft. Add all the dry spices (turmeric, coriander powder, red chili powder) and salt. Cook until the oil starts to separate.',
    '5. Cook Veggies: Add the par-cooked potato and cauliflower florets. Gently mix until well coated with the masala.',
    '6. Simmer: Cover and cook on low heat for 10-15 minutes, stirring occasionally, until the vegetables are tender. Sprinkle a little water if it starts to stick.',
    '7. Finish: Once cooked, add garam masala and amchur powder. Mix well. Garnish with fresh coriander. Serve hot with roti or paratha.'
  ],
  tips: [
    'Do not overcook the cauliflower initially, or it will become mushy. It should still have a slight bite.',
    'For a different flavor, you can add 1/2 cup of green peas.',
    'Cooking on low heat with the lid on ensures the vegetables cook evenly without burning.'
  ],
  dietaryInfo: ['Vegetarian', 'Vegan', 'Gluten-Free'],
},
{
  id: 6,
  slug: 'malai-kofta',
  foodName: 'Malai Kofta',
  image: 'https://images.unsplash.com/photo-1630019850648-ec5ef78a5019',
  description: 'Deep-fried paneer and potato balls in a rich, creamy and mildly sweet gravy.',
  prepTime: '30 mins',
  cookTime: '30 mins',
  servings: 4,
  difficulty: 'Hard',
  nutritionalInfo: { calories: 480, protein: 14, carbs: 30, fat: 35, fiber: 5 },
  ingredients: [
    'For Koftas:',
    '200g Paneer, grated',
    '2 medium potatoes, boiled and mashed',
    '2 tbsp cornflour',
    '2 tbsp raisins',
    '2 tbsp chopped cashews',
    '1 tbsp finely chopped coriander',
    '1/2 tsp garam masala',
    'Salt to taste',
    'Oil for deep frying',
    '',
    'For Gravy:',
    '2 tbsp ghee or butter',
    '2 bay leaves',
    '1 onion, finely chopped',
    '10-12 cashews, soaked for 30 mins',
    '1 tbsp ginger-garlic paste',
    '2 tomatoes, pureed',
    '1 tsp red chili powder',
    '1 tsp coriander powder',
    '1/2 tsp turmeric powder',
    '1/2 cup fresh cream',
    '1 tsp sugar',
    '1/2 tsp garam masala',
    '1 tsp kasuri methi (dried fenugreek leaves)',
    'Salt to taste'
  ],
  instructions: [
    '1. Make Koftas: In a large bowl, combine grated paneer, mashed potatoes, cornflour, raisins, cashews, coriander, garam masala, and salt. Mix well. Shape into smooth, firm balls. If the mixture is too soft, add a little more cornflour.',
    '2. Fry Koftas: Heat oil for deep frying on medium heat. Gently slide in the koftas and fry until golden brown and crisp. Drain on paper towels and set aside.',
    '3. Make Gravy Base: Blend the soaked cashews with a little water into a smooth paste. Heat ghee in a pan. Add bay leaves, then onions. Sauté until golden. Add ginger-garlic paste and cook for a minute.',
    '4. Cook Masala: Add tomato puree and cook for 5-6 minutes. Add all dry spices (red chili, coriander, turmeric) and salt. Cook until the oil separates.',
    '5. Finish Gravy: Add the cashew paste and 1 cup of water. Simmer for 5-7 minutes until the gravy thickens. Add sugar, garam masala, and kasuri methi. Stir in fresh cream. Do not boil after adding cream.',
    '6. Serve: Just before serving, gently place the fried koftas in the warm gravy. Garnish with more cream and coriander. Serve immediately to prevent koftas from becoming soggy.'
  ],
  tips: [
    'The kofta mixture must be firm. If it\'s too soft, the koftas will break while frying.',
    'You can add a tiny piece of khoya (milk solid) inside each kofta for a surprise center.',
    'Always add the koftas to the gravy just before serving to maintain their texture.'
  ],
  dietaryInfo: ['Vegetarian', 'Gluten-Free'],
},
{
  id: 7,
  slug: 'navratan-korma',
  foodName: 'Navratan Korma',
  image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
  description: 'A rich, creamy curry with nine gems - mixed vegetables and nuts in a mild gravy.',
  prepTime: '20 mins',
  cookTime: '25 mins',
  servings: 4,
  difficulty: 'Medium',
  nutritionalInfo: { calories: 380, protein: 10, carbs: 35, fat: 25, fiber: 8 },
  ingredients: [
    '1/2 cup mixed vegetables (carrots, beans, peas, corn), chopped',
    '1/2 cup cauliflower florets',
    '1/4 cup paneer, cubed',
    '2 tbsp oil or ghee',
    '1 bay leaf',
    '1 tsp cumin seeds',
    '1 onion, finely chopped',
    '1 tbsp ginger-garlic paste',
    '1/4 cup cashews, soaked',
    '1/4 cup melon seeds or almonds, soaked',
    '1 tbsp poppy seeds (khus khus), soaked',
    '1 cup milk',
    '1/2 cup fresh cream',
    '1/2 tsp turmeric powder',
    '1 tsp garam masala',
    '1 tsp sugar',
    'Salt to taste',
    '1/4 cup fruits (apple, pineapple, grapes), chopped',
    '2 tbsp raisins',
    '2 tbsp nuts (cashews, almonds) for garnish'
  ],
  instructions: [
    '1. Par-cook Veggies: Boil or steam the mixed vegetables and cauliflower until tender yet crisp. Set aside.',
    '2. Make Nut Paste: Drain the soaked cashews, melon seeds, and poppy seeds. Blend them with a little milk into a very smooth paste.',
    '3. Sauté Base: Heat oil in a pan. Add bay leaf and cumin seeds. Add onions and sauté until translucent. Add ginger-garlic paste and cook for a minute.',
    '4. Create Gravy: Add the nut paste to the pan. Sauté for 2-3 minutes. Add milk, turmeric, garam masala, sugar, and salt. Simmer for 5-7 minutes until the gravy thickens.',
    '5. Combine: Add the par-cooked vegetables, paneer cubes, raisins, and fresh fruits. Gently mix and simmer for another 3-4 minutes until everything is heated through.',
    '6. Finish: Stir in fresh cream. Do not boil. Garnish with fried nuts and a drizzle of cream. Serve hot with naan or pulao.'
  ],
  tips: [
    'The "navratan" or nine gems typically include a mix of vegetables, fruits, nuts, and paneer.',
    'For a vegan version, use coconut cream instead of dairy cream and omit paneer.',
    'Do not overcook the fruits; add them at the end to just warm through.'
  ],
  dietaryInfo: ['Vegetarian', 'Gluten-Free'],
},
{
  id: 8,
  slug: 'shahi-paneer',
  foodName: 'Shahi Paneer',
  image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d7',
  description: 'Paneer cubes in a decadent, creamy, nut-based gravy with a royal taste.',
  prepTime: '15 mins',
  cookTime: '25 mins',
  servings: 3,
  difficulty: 'Medium',
  nutritionalInfo: { calories: 450, protein: 16, carbs: 15, fat: 38, fiber: 3 },
  ingredients: [
    '250g Paneer, cubed',
    '2 tbsp ghee',
    '2 green cardamoms',
    '1-inch cinnamon stick',
    '2 cloves',
    '1 onion, roughly chopped',
    '10-12 cashews, soaked',
    '1 tbsp melon seeds, soaked',
    '1 tbsp ginger-garlic paste',
    '2 tomatoes, roughly chopped',
    '1/2 tsp turmeric powder',
    '1 tsp red chili powder',
    '1 tsp coriander powder',
    '1/2 cup fresh cream',
    '1/4 cup milk',
    '1/2 tsp garam masala',
    '1 tsp sugar',
    'Salt to taste',
    '1 tbsp kasuri methi (dried fenugreek leaves)',
    'Sliced almonds and silvered varq for garnish (optional)'
  ],
  instructions: [
    '1. Prepare Base: Blend the soaked cashews and melon seeds with a little water into a smooth paste. Blend the onions and tomatoes separately into smooth purees.',
    '2. Tempering: Heat ghee in a pan. Add whole spices (cardamom, cinnamon, cloves). Sauté for 30 seconds.',
    '3. Cook Purees: Add the onion puree and cook for 4-5 minutes until the raw smell disappears. Add ginger-garlic paste and cook for another minute. Add tomato puree and cook for 5-6 minutes until the oil separates.',
    '4. Add Nut Paste: Add the cashew-melon seed paste to the pan. Sauté for 2-3 minutes. Add all dry spices (turmeric, red chili, coriander powder) and salt. Cook for another 2 minutes.',
    '5. Simmer: Add milk and water as needed to achieve a gravy consistency. Simmer for 5 minutes.',
    '6. Finish: Reduce heat. Add paneer cubes, sugar, and garam masala. Simmer for 2 minutes. Stir in fresh cream and crushed kasuri methi. Do not boil. Garnish with cream, almonds, and varq. Serve immediately.'
  ],
  tips: [
    'The richness comes from the nut paste. Ensure you sauté it well to cook out the raw flavor.',
    'For an even richer taste, you can add a tablespoon of ground khoya (milk solid) to the gravy.',
    'Soaking the nuts helps in creating a smooth, creamy texture for the gravy.'
  ],
  dietaryInfo: ['Vegetarian', 'Gluten-Free'],
},
{
  id: 9,
  slug: 'veg-pulao',
  foodName: 'Veg Pulao',
  image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0',
  description: 'Fragrant basmati rice cooked with mixed vegetables and whole spices.',
  prepTime: '15 mins',
  cookTime: '20 mins',
  servings: 3,
  difficulty: 'Easy',
  nutritionalInfo: { calories: 320, protein: 7, carbs: 60, fat: 7, fiber: 5 },
  ingredients: [
    '1 cup basmati rice, soaked for 30 mins',
    '1 tbsp ghee',
    '1 tbsp oil',
    '1 bay leaf',
    '1-inch cinnamon stick',
    '2 green cardamoms',
    '2 cloves',
    '1 star anise',
    '1 tsp cumin seeds',
    '1 onion, sliced',
    '1 tbsp ginger-garlic paste',
    '1/2 cup mixed vegetables (carrots, peas, beans, corn)',
    '1/2 tsp turmeric powder',
    '1 tsp garam masala',
    '2 cups water',
    'Salt to taste',
    'Fresh coriander and fried onions for garnish'
  ],
  instructions: [
    '1. Sauté Spices: Heat ghee and oil in a pressure cooker or pot. Add all whole spices (bay leaf, cinnamon, cardamom, cloves, star anise, cumin). Let them splutter for 30 seconds.',
    '2. Sauté Aromatics: Add sliced onions and sauté until golden brown. Add ginger-garlic paste and sauté for a minute until fragrant.',
    '3. Add Veggies: Add the mixed vegetables. Sauté for 2-3 minutes. Add turmeric powder and garam masala. Mix well.',
    '4. Cook Rice: Drain the soaked rice and add it to the pot. Gently sauté for 2 minutes until the rice is well coated with the oils and spices.',
    '5. Pressure Cook: Add water and salt. Give it a stir. Close the lid and cook for 2 whistles on medium heat. Let the pressure release naturally for 5 minutes, then open.',
    '6. Serve: Fluff the rice gently with a fork. Garnish with fresh coriander and fried onions. Serve hot with raita or any curry.'
  ],
  tips: [
    'Soaking basmati rice ensures longer, fluffier grains after cooking.',
    'The water-to-rice ratio for pulao is generally 2:1.',
    'For a more intense flavor, you can use vegetable stock instead of water.'
  ],
  dietaryInfo: ['Vegetarian', 'Vegan', 'Gluten-Free'],
},
{
  id: 10,
  slug: 'jeera-rice',
  foodName: 'Jeera Rice',
  image: 'https://images.unsplash.com/photo-1603133872878-684e2087ffed',
  description: 'Simple, flavorful rice tempered with cumin seeds.',
  prepTime: '5 mins (plus 30 mins soaking)',
  cookTime: '15 mins',
  servings: 3,
  difficulty: 'Easy',
  nutritionalInfo: { calories: 250, protein: 5, carbs: 48, fat: 4, fiber: 1 },
  ingredients: [
    '1 cup basmati rice, soaked for 30 mins',
    '2 tbsp ghee or oil',
    '1.5 tsp cumin seeds (jeera)',
    '1 black cardamom (optional)',
    '2 cups water',
    'Salt to taste',
    'Fresh coriander for garnish'
  ],
  instructions: [
    '1. Temper Cumin: Drain the soaked rice completely. Heat ghee in a pressure cooker or pot. Add cumin seeds and black cardamom. Sauté until the cumin seeds crackle and become fragrant.',
    '2. Sauté Rice: Add the drained rice to the pot. Gently sauté on low heat for 2-3 minutes. This toasts the rice and gives it a nutty flavor.',
    '3. Cook: Add water and salt. Stir once. Increase the heat and bring it to a full boil.',
    '4. Pressure Cook: Close the lid and cook for 2 whistles on medium heat. Turn off the heat and let the pressure release naturally for 5-10 minutes.',
    '5. Serve: Open the lid and fluff the rice gently with a fork. Garnish with fresh coriander. Serve hot as a side dish with any dal or curry.'
  ],
  tips: [
    'Do not skip sautéing the rice in ghee after tempering. This step is key to non-sticky, flavorful jeera rice.',
    'For a stronger cumin flavor, you can crush a few cumin seeds coarsely before adding them to the oil.',
    'Always fluff the rice with a fork, not a spoon, to avoid breaking the grains.'
  ],
  dietaryInfo: ['Vegetarian', 'Vegan', 'Gluten-Free'],
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