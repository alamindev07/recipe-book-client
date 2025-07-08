
// // import { useState, useContext } from "react";
// // import { AuthContext } from "../context/AuthContext";
// // import { toast } from "react-toastify";

// // const AddRecipe = () => {
// //   const { user } = useContext(AuthContext);
// //   const [formData, setFormData] = useState({
// //     image: "",
// //     title: "",
// //     ingredients: "",
// //     instructions: "",
// //     cuisine: "Italian",
// //     prepTime: "",
// //     categories: [],
// //   });

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     if (type === "checkbox") {
// //       setFormData((prev) => ({
// //         ...prev,
// //         categories: checked
// //           ? [...prev.categories, value]
// //           : prev.categories.filter((c) => c !== value),
// //       }));
// //     } else {
// //       setFormData((prev) => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const recipeData = {
// //       ...formData,
// //       email: user.email,
// //       author: user.displayName,
// //       likeCount: 0,
// //     };

// //     try {
// //       const res = await fetch("http://localhost:5000/recipes", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(recipeData),
// //       });

// //       const data = await res.json();
// //       if (data.insertedId) {
// //         toast.success("Recipe added successfully!");
// //         setFormData({
// //           image: "",
// //           title: "",
// //           ingredients: "",
// //           instructions: "",
// //           cuisine: "Italian",
// //           prepTime: "",
// //           categories: [],
// //         });
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Something went wrong!");
// //     }
// //   };

// //   return (
// //     <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded my-10">
// //       <h2 className="text-2xl font-semibold mb-4">Add New Recipe</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input name="image" type="text" placeholder="Image URL" className="input input-bordered w-full" value={formData.image} onChange={handleChange} required />
// //         <input name="title" type="text" placeholder="Title" className="input input-bordered w-full" value={formData.title} onChange={handleChange} required />
// //         <textarea name="ingredients" placeholder="Ingredients" className="textarea textarea-bordered w-full" value={formData.ingredients} onChange={handleChange} required />
// //         <textarea name="instructions" placeholder="Instructions" className="textarea textarea-bordered w-full" value={formData.instructions} onChange={handleChange} required />
        
// //         <select name="cuisine" className="select select-bordered w-full" value={formData.cuisine} onChange={handleChange}>
// //           <option>Italian</option>
// //           <option>Mexican</option>
// //           <option>Indian</option>
// //           <option>Chinese</option>
// //           <option>Others</option>
// //         </select>

// //         <input name="prepTime" type="number" placeholder="Preparation Time (minutes)" className="input input-bordered w-full" value={formData.prepTime} onChange={handleChange} required />
        
// //         <label className="font-medium block">Categories</label>
// //         <div className="flex flex-wrap gap-3">
// //           {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((cat) => (
// //             <label key={cat} className="flex items-center gap-2">
// //               <input
// //                 type="checkbox"
// //                 name="categories"
// //                 value={cat}
// //                 checked={formData.categories.includes(cat)}
// //                 onChange={handleChange}
// //               />
// //               {cat}
// //             </label>
// //           ))}
// //         </div>

// //         <button className="btn btn-primary w-full">Add Recipe</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddRecipe;








// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const cuisineTypes = ["Italian", "Mexican", "Indian", "Chinese", "Others"];
// const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

// const AddRecipe = () => {
//   const { user } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     image: "",
//     title: "",
//     ingredients: "",
//     instructions: "",
//     cuisineType: "",
//     preparationTime: "",
//     categories: [],
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       const updatedCategories = checked
//         ? [...formData.categories, value]
//         : formData.categories.filter((cat) => cat !== value);
//       setFormData({ ...formData, categories: updatedCategories });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const recipe = {
//       ...formData,
//       preparationTime: parseInt(formData.preparationTime),
//       likeCount: 0,
//       user: {
//         name: user?.displayName || "Anonymous",
//         email: user?.email,
//         photo: user?.photoURL,
//       },
//     };

//     try {
//       const res = await axios.post("http://localhost:5000/recipes", recipe);
//       if (res.data?.insertedId) {
//         toast.success("Recipe added successfully!");
//         setFormData({
//           image: "",
//           title: "",
//           ingredients: "",
//           instructions: "",
//           cuisineType: "",
//           preparationTime: "",
//           categories: [],
//         });
//       }
//     } catch (err) {
//       toast.error("Failed to add recipe");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required className="input input-bordered w-full" />

//         <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="input input-bordered w-full" />

//         <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients" required className="textarea textarea-bordered w-full" />

//         <textarea name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Instructions" required className="textarea textarea-bordered w-full" />

//         <select name="cuisineType" value={formData.cuisineType} onChange={handleChange} required className="select select-bordered w-full">
//           <option value="" disabled>Select Cuisine Type</option>
//           {cuisineTypes.map(type => <option key={type} value={type}>{type}</option>)}
//         </select>

//         <input type="number" name="preparationTime" value={formData.preparationTime} onChange={handleChange} placeholder="Preparation Time (mins)" required className="input input-bordered w-full" />

//         <div className="flex flex-wrap gap-4">
//           {categories.map((cat) => (
//             <label key={cat} className="flex items-center space-x-2">
//               <input type="checkbox" name="categories" value={cat} checked={formData.categories.includes(cat)} onChange={handleChange} />
//               <span>{cat}</span>
//             </label>
//           ))}
//         </div>

//         <button type="submit" className="btn btn-primary w-full">Add Recipe</button>
//       </form>
//     </div>
//   );
// };

// export default AddRecipe;



import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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
      const res = await axios.post("http://localhost:5000/recipes", recipe);
      if (res.data?.insertedId) {
    
        Swal.fire({
          title: "Recipe added successfully!",
          icon: "success",
          draggable: true
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
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-t-lg text-center text-white shadow-lg">
        <h2 className="text-3xl font-bold">Add New Recipe</h2>
        <p className="mt-1">Share your culinary masterpiece with the world</p>
        <p className="text-sm">Posting as: <span className="font-semibold text-blue-600">{user?.displayName || "Guest"}</span></p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-b-lg space-y-6"
      >
        {/* Image Preview */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
          {formData.image ? (
            <img src={formData.image} alt="Recipe preview" className="mx-auto max-h-60 rounded-md object-cover" />
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
            <p className="text-xs text-gray-500 mt-1">List each ingredient on a new line</p>
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
