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