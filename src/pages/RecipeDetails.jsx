

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";



import { Heart } from "lucide-react";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);


  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`http://localhost:5000/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
        setLikeCount(res.data.likeCount || 0);
      })
      .catch((err) => console.error("Error loading recipe:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    if (liked) return;
    try {
      await axios.patch(`http://localhost:5000/recipes/like/${id}`);
      setLikeCount((prev) => prev + 1);
      setLiked(true);
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse space-y-4">
        <div className="h-10 bg-gray-300 rounded w-3/4" />
        <div className="h-64 bg-gray-300 rounded" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-full" />
      </div>
    );
  }

  if (!recipe) {
    return <p className="text-center py-10 text-red-500">Recipe not found</p>;
  }

  return (

    


  

    <motion.div
      className="max-w-4xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        
     <div className="flex justify-between">
           <button
  className="btn btn-outline mb-4 hover:bg-blue-500 bg-amber-400"
  onClick={() => navigate(-1)} // Go back to previous page
>
  ← Back
</button>


      <h2 className="text-4xl font-bold mb-4">{recipe.title}</h2>
     </div>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded mb-6 shadow-md"
      />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <p className="text-gray-600">
            <strong>Prep Time:</strong> {recipe.preparationTime} mins
          </p>
          <p className="text-gray-600">
            <strong>Cuisine:</strong>{" "}
            <span className="badge badge-outline">{recipe.cuisineType}</span>
          </p>
          <p className="text-gray-600">
            <strong>Author:</strong> {recipe.user?.name || "Unknown"}
          </p>
        </div>

        <button
          className={`btn btn-sm flex items-center gap-2 ${
            liked ? "btn-success" : "btn-outline"
          }`}
          onClick={handleLike}
          disabled={liked}
        >
          <Heart size={18} className={liked ? "text-red-500" : ""} />
          {likeCount}
        </button>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-lg mb-1">Description</h4>
        <p className="text-gray-700 leading-relaxed">
          {recipe.description || "No description provided."}
        </p>
      </div>

      {recipe.categories?.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Categories:</h4>
          <div className="flex flex-wrap gap-2">
            {recipe.categories.map((cat, idx) => (
              <span key={idx} className="badge badge-info text-white">
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RecipeDetails;
