
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisine: "Italian",
    prepTime: "",
    categories: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((c) => c !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      ...formData,
      email: user.email,
      author: user.displayName,
      likeCount: 0,
    };

    try {
      const res = await fetch("http://localhost:5000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Recipe added successfully!");
        setFormData({
          image: "",
          title: "",
          ingredients: "",
          instructions: "",
          cuisine: "Italian",
          prepTime: "",
          categories: [],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded my-10">
      <h2 className="text-2xl font-semibold mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="image" type="text" placeholder="Image URL" className="input input-bordered w-full" value={formData.image} onChange={handleChange} required />
        <input name="title" type="text" placeholder="Title" className="input input-bordered w-full" value={formData.title} onChange={handleChange} required />
        <textarea name="ingredients" placeholder="Ingredients" className="textarea textarea-bordered w-full" value={formData.ingredients} onChange={handleChange} required />
        <textarea name="instructions" placeholder="Instructions" className="textarea textarea-bordered w-full" value={formData.instructions} onChange={handleChange} required />
        
        <select name="cuisine" className="select select-bordered w-full" value={formData.cuisine} onChange={handleChange}>
          <option>Italian</option>
          <option>Mexican</option>
          <option>Indian</option>
          <option>Chinese</option>
          <option>Others</option>
        </select>

        <input name="prepTime" type="number" placeholder="Preparation Time (minutes)" className="input input-bordered w-full" value={formData.prepTime} onChange={handleChange} required />
        
        <label className="font-medium block">Categories</label>
        <div className="flex flex-wrap gap-3">
          {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="categories"
                value={cat}
                checked={formData.categories.includes(cat)}
                onChange={handleChange}
              />
              {cat}
            </label>
          ))}
        </div>

        <button className="btn btn-primary w-full">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
