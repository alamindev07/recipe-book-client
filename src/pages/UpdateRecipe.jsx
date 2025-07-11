import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";

const cuisineTypes = ["Italian", "Mexican", "Indian", "Chinese", "Others"];
const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

const UpdateRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisineType: "Italian",
    preparationTime: "",
    categories: [],
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/recipes/${id}`);
        const recipe = res.data;

        setFormData({
          image: recipe.image || "",
          title: recipe.title || "",
          ingredients: Array.isArray(recipe.ingredients)
            ? recipe.ingredients.join("\n")
            : recipe.ingredients || "",
          instructions: recipe.instructions || "",
          cuisineType: recipe.cuisineType || "Italian",
          preparationTime: recipe.preparationTime || "",
          categories: recipe.categories || [],
        });
      } catch (err) {
        toast.error("Failed to load recipe data");
        console.error(err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((cat) => cat !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      ...formData,
      preparationTime: parseInt(formData.preparationTime),
      ingredients: formData.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/recipes/${id}`,
        updatedRecipe
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Recipe updated successfully!", "success");
        navigate("/my-recipes");
      }
    } catch (err) {
      toast.error("Failed to update recipe");
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-t-lg text-center text-white shadow-lg">
        <h2 className="text-3xl font-bold">Update Recipe</h2>
        <p className="mt-1">Make changes to your existing recipe</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-b-lg space-y-6"
      >
        {/* Image Preview */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
          {formData.image ? (
            <img
              src={formData.image}
              alt="Recipe preview"
              className="mx-auto max-h-60 rounded-md object-cover"
            />
          ) : (
            <p>Recipe image preview</p>
          )}
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">📷 Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div>
            <label className="label font-semibold">🍽️ Recipe Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter recipe title"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">🧂 Ingredients</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Enter ingredients (one per line)"
              className="textarea textarea-bordered w-full h-32"
              required
            />
          </div>
          <div>
            <label className="label font-semibold">📝 Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Enter cooking instructions"
              className="textarea textarea-bordered w-full h-32"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">🌍 Cuisine Type</label>
            <select
              name="cuisineType"
              value={formData.cuisineType}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              {cuisineTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label font-semibold">⏱️ Prep Time (mins)</label>
            <input
              type="number"
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter time"
              required
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="label font-semibold">🏷️ Categories</label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 bg-blue-50 p-4 rounded-lg">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="categories"
                  value={cat}
                  checked={formData.categories.includes(cat)}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="btn btn-primary text-white font-semibold rounded-full bg-green-500">
            <FaUpload></FaUpload> Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecipe;
