import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
      <img src={recipe.image} alt={recipe.title} className="w-full rounded" />
      <h2 className="text-3xl font-bold mt-4">{recipe.title}</h2>
      <p className="mt-2"><strong>Cuisine:</strong> {recipe.cuisineType}</p>
      <p><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
      <p><strong>Likes:</strong> {recipe.likeCount}</p>
      <p className="mt-4"><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p className="mt-2"><strong>Instructions:</strong> {recipe.instructions}</p>
      <p className="mt-2"><strong>Categories:</strong> {recipe.categories.join(", ")}</p>
    </div>
  );
};

export default RecipeDetails;
