import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const cuisineTypes = ["Italian", "Mexican", "Indian", "Chinese", "Others"];
const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

const AddRecipe = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisineType: "Italian",
    preparationTime: "",
    categories: [],
  });

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

    const recipe = {
      ...formData,
      preparationTime: parseInt(formData.preparationTime),
      likeCount: 0,
      user: {
        name: user?.displayName || "Anonymous",
        email: user?.email,
        photo: user?.photoURL,
      },
    };

    try {
      const res = await axios.post(
        "https://recipe-book-server-five.vercel.app/recipes",
        recipe
      );
      if (res.data?.insertedId) {
        Swal.fire({
          title: "Recipe added successfully!",
          icon: "success",
          draggable: true,
        });
        setFormData({
          image: "",
          title: "",
          ingredients: "",
          instructions: "",
          cuisineType: "Italian",
          preparationTime: "",
          categories: [],
        });
      }
    } catch (err) {
      toast.error("Failed to add recipe");
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-5">
      <Helmet>
        <title>AddRecipe -Recipe Book</title>
      </Helmet>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-t-lg text-center text-white shadow-lg">
        <h2 className="text-3xl font-bold">Add New Recipe</h2>
        <p className="mt-1">Share your culinary masterpiece with the world</p>
        <p className="text-sm">
          Posting as:{" "}
          <span className="font-semibold text-blue-600">
            {user?.displayName || "Guest"}
          </span>
        </p>
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
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5h18M9 3v2m6-2v2m-7 10l2 2 4-4m5 2a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              <p>Recipe image preview</p>
              <p className="text-sm">Enter URL below</p>
            </>
          )}
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">
              <span>📷 Image URL</span>
            </label>
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
            <label className="label font-semibold">
              <span>🍽️ Recipe Title</span>
            </label>
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
            <p className="text-xs text-gray-500 mt-1">
              List each ingredient on a new line
            </p>
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
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 bg-orange-50 p-4 rounded-lg">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="categories"
                  value={cat}
                  checked={formData.categories.includes(cat)}
                  onChange={handleChange}
                  className="checkbox checkbox-warning"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="btn btn-warning text-white font-semibold">
            ➕ Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
