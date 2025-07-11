
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyRecipes = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://recipe-book-server-five.vercel.app/recipes?email=${user.email}`
        )
        .then((res) => setMyRecipes(res.data))
        .catch((err) => console.error("Failed to fetch recipes:", err))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  const handleLike = async (recipe) => {
    if (!recipe || !recipe._id) {
      toast.error("Invalid recipe ID.");
      return;
    }

    const isOwner = recipe.user?.email === user?.email;
    if (isOwner) {
      toast.error("You can't like your own recipe.");
      return;
    }

    if (liked) return;

    try {
      await axios.patch(
        `https://recipe-book-server-five.vercel.app/recipes/like/${recipe._id}`
      );
      setLikeCount((prev) => prev + 1);
      setLiked(true);
      toast.success("Thanks for your interest!");
    } catch (err) {
      console.error("Like failed:", err);
      toast.error("Failed to like. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirm) return;

    try {
      await axios.delete(
        `https://recipe-book-server-five.vercel.app/recipes/${id}`
      );
      setMyRecipes(myRecipes.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedRecipe = {
      title: form.title.value,
      image: form.image.value,
      preparationTime: form.preparationTime.value,
      cuisineType: form.cuisineType.value,
      ingredients: form.ingredients.value.split(",").map((i) => i.trim()),
      instructions: form.instructions.value.split(",").map((i) => i.trim()),
      categories: Array.from(form.categories.selectedOptions).map(
        (o) => o.value
      ),
    };

    try {
      await axios.put(
        `https://recipe-book-server-five.vercel.app/recipes/${editingRecipe._id}`,
        updatedRecipe
      );
      setMyRecipes((prev) =>
        prev.map((r) =>
          r._id === editingRecipe._id ? { ...r, ...updatedRecipe } : r
        )
      );
      setEditingRecipe(null);
      Swal.fire({
        title: "Recipe updated successfully!",
        icon: "success",
        draggable: true,
      });
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update recipe!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Helmet>
        <title>MyRecipes -Recipe Book</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6">
        My Recipes ({myRecipes.length})
      </h2>

      {loading ? (
        <div className="text-center mt-10">
          <span className="loading loading-spinner text-error"></span> Loading
          recipes...
        </div>
      ) : myRecipes.length === 0 ? (
        <p className="text-center text-lg lg:text-2xl text-red-600">
          No recipes found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRecipes.map((recipe) => (
            <div key={recipe._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>

                <div className="mb-4">
                  <h4 className="font-bold text-lg mb-1">Ingredients</h4>
                  <p className="text-gray-700 leading-relaxed font-bold">
                    {Array.isArray(recipe.ingredients)
                      ? recipe.ingredients.join(", ")
                      : recipe.ingredients || "No ingredients provided."}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-lg mb-1">Description</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {Array.isArray(recipe.instructions)
                      ? recipe.instructions.join(", ")
                      : recipe.instructions || "No instructions provided."}
                  </p>
                </div>

                <p>Preparation Time: {recipe.preparationTime} mins</p>
                <p>Cuisine: {recipe.cuisineType}</p>

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

                <div className="card-actions justify-between mt-4">
                  <button
                    className={`btn btn-sm flex items-center gap-2 ${
                      liked ? "btn-success" : "btn-outline"
                    }`}
                    onClick={() => handleLike(recipe)}
                  >
                    <Heart size={18} className={liked ? "text-red-500" : ""} />
                    {likeCount}
                  </button>

                  <Link to={`/update-recipe/${recipe._id}`}>
                    <button className="btn btn-sm btn-warning">Update</button>
                  </Link>

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(recipe._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
