// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";
// import { Heart } from "lucide-react";
// import { useParams } from "react-router-dom";


// const MyRecipes = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const [myRecipes, setMyRecipes] = useState([]);
//   const [editingRecipe, setEditingRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//    const [likeCount, setLikeCount] = useState(0);
//    const [liked, setLiked] = useState(false);
//      const [isOwner, setIsOwner] = useState(false);
      

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`http://localhost:5000/recipes?email=${user.email}`)
//         .then((res) => setMyRecipes(res.data))
//         .catch((err) => console.error("Failed to fetch recipes:", err))
//         .finally(() => setLoading(false));
//     }
//   }, [user?.email]);



//   const handleLike = async (recipe) => {
//   if (!recipe || !recipe._id) {
//     toast.error("Invalid recipe ID.");
//     return;
//   }

//   const isOwner = recipe.user?.email === user?.email;

//   if (isOwner) {
//     toast.error("You can't like your own recipe.");
//     return;
//   }

//   if (liked) return;

//   try {
//     await axios.patch(`http://localhost:5000/recipes/like/${recipe._id}`);
//     setLikeCount((prev) => prev + 1);
//     setLiked(true);
//     toast.success("Thanks for your interest!");
//   } catch (err) {
//     console.error("Like failed:", err);
//     toast.error("Failed to like. Please try again.");
//   }
// };

  

//   const handleDelete = async (id) => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete this recipe?"
//     );
//     if (!confirm) return;

//     try {
//       await axios.delete(`http://localhost:5000/recipes/${id}`);
//       setMyRecipes(myRecipes.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };






//   const handleUpdate = async (e) => {
//   e.preventDefault();
//   const form = e.target;

//   const updatedRecipe = {
//     title: form.title.value,
//     image: form.image.value,
//     preparationTime: form.preparationTime.value,
//     cuisineType: form.cuisineType.value,
//     ingredients: form.ingredients.value.split(",").map(i => i.trim()),
//     instructions: form.instructions.value.split(",").map(i => i.trim()),
//     categories: form.categories.value.split(",").map(c => c.trim()),
//   };

//   try {
//     await axios.put(
//       `http://localhost:5000/recipes/${editingRecipe._id}`,
//       updatedRecipe
//     );
//     setMyRecipes((prev) =>
//       prev.map((r) =>
//         r._id === editingRecipe._id ? { ...r, ...updatedRecipe } : r
//       )
//     );
//     setEditingRecipe(null);
//     Swal.fire({
//       title: "Recipe updated successfully!",
//       icon: "success",
//     });
//   } catch (err) {
//     console.error("Update failed:", err);
//     toast.error("Failed to update recipe!");
//   }
// };


//   // const handleUpdate = async (e) => {
//   //   e.preventDefault();
//   //   const form = e.target;

//   //   const updatedRecipe = {
//   //     title: form.title.value,
//   //     image: form.image.value,
//   //     preparationTime: form.preparationTime.value,
//   //     cuisineType: form.cuisineType.value,
//   //   };

//   //   try {
//   //     await axios.put(
//   //       `http://localhost:5000/recipes/${editingRecipe._id}`,
//   //       updatedRecipe
//   //     );
//   //     setMyRecipes((prev) =>
//   //       prev.map((r) =>
//   //         r._id === editingRecipe._id ? { ...r, ...updatedRecipe } : r
//   //       )
//   //     );
//   //     setEditingRecipe(null);
//   //     Swal.fire({
//   //       title: "Recipe updated successfully!",
//   //       icon: "success",
//   //       draggable: true,
//   //     });
//   //   } catch (err) {
//   //     console.error("Update failed:", err);
//   //     toast.error("Failed to update recipe!");
//   //   }
//   // };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6">
//         My Recipes ({myRecipes.length})
//       </h2>

//       {loading ? (
//         <div className="text-center mt-10">
//           <span className="loading loading-spinner text-error"></span>Loading
//           recipes...
//         </div>
//       ) : myRecipes.length === 0 ? (
//         <p className="text-center text-lg lg:text-2xl text-red-600">
//           No recipes found.
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {myRecipes.map((recipe) => (
//             <div key={recipe._id} className="card bg-base-100 shadow-xl">
//               <figure>
//                 <img
//                   src={recipe.image}
//                   alt={recipe.title}
//                   className="h-48 w-full object-cover"
//                 />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title">{recipe.title}</h2>

//                  <div className="mb-4">
//         <h4 className="font-bold text-lg mb-1">Ingredients</h4>
//         <p className="text-gray-700 leading-relaxed font-bold">
//           {recipe.ingredients || "No ingredients provided."}
//         </p>
//       </div>

//       <div className="mb-4">
//         <h4 className="font- text-lg mb-1 font-bold">Description</h4>
//         <p className="text-gray-700 leading-relaxed">
//           {recipe.instructions || "No description provided."}
//         </p>
//       </div>


//                 <p>Preparaion Time: {recipe.preparationTime} mins</p>
//                 <p>Cuisine: {recipe.cuisineType}</p>


                
//       {recipe.categories?.length > 0 && (
//         <div className="mt-4">
//           <h4 className="font-semibold mb-2">Categories:</h4>
//           <div className="flex flex-wrap gap-2">
//             {recipe.categories.map((cat, idx) => (
//               <span key={idx} className="badge badge-info text-white">
//                 {cat}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//                 <div className="card-actions justify-between mt-4">
//                    <button
//                     className={`btn btn-sm flex items-center gap-2 ${
//                       liked ? "btn-success" : "btn-outline"
//                     }`}
//                    onClick={() => handleLike(recipe)}

//                   >
//                     <Heart size={18} className={liked ? "text-red-500" : ""} />
//                     {likeCount}
//                   </button>
//                   <button
//                     className="btn btn-sm btn-warning"
//                     onClick={() => setEditingRecipe(recipe)}
//                   >
                
//                     Update
//                   </button>
//                   <button
//                     className="btn btn-sm btn-error"
//                     onClick={() => handleDelete(recipe._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Update Modal */}
// {/* 
//       {editingRecipe && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 1.0 }}
//             className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
//           >
//             <h3 className="text-xl font-bold mb-4 text-center text-blue-600">
//               ✏️ Update Recipe
//             </h3>
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <div>
//                 <label className="label">
//                   <span className="label-text">Title</span>
//                 </label>
//                 <input
//                   name="title"
//                   defaultValue={editingRecipe.title}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="label">
//                   <span className="label-text">Image URL</span>
//                 </label>
//                 <input
//                   name="image"
//                   defaultValue={editingRecipe.image}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="label">
//                   <span className="label-text">Preparation Time (mins)</span>
//                 </label>
//                 <input
//                   name="preparationTime"
//                   type="number"
//                   defaultValue={editingRecipe.preparationTime}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="label">
//                   <span className="label-text">Cuisine Type</span>
//                 </label>
//                 <input
//                   name="cuisineType"
//                   defaultValue={editingRecipe.cuisineType}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setEditingRecipe(null)}
//                   className="btn btn-outline"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       )} */}


//       {editingRecipe && (
//   <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//     <motion.div
//       initial={{ scale: 0.8, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       exit={{ scale: 0.8, opacity: 0 }}
//       transition={{ duration: 1.0 }}
//       className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]"
//     >
//       <h3 className="text-xl font-bold mb-4 text-center text-blue-600">
//         ✏️ Update Recipe
//       </h3>
//       <form onSubmit={handleUpdate} className="space-y-4">
//         <div>
//           <label className="label">
//             <span className="label-text">Title</span>
//           </label>
//           <input
//             name="title"
//             defaultValue={editingRecipe.title}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>

//         <div>
//           <label className="label">
//             <span className="label-text">Image URL</span>
//           </label>
//           <input
//             name="image"
//             defaultValue={editingRecipe.image}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>

//         <div>
//           <label className="label">
//             <span className="label-text">Preparation Time (mins)</span>
//           </label>
//           <input
//             name="preparationTime"
//             type="number"
//             defaultValue={editingRecipe.preparationTime}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>

//         <div>
//           <label className="label">
//             <span className="label-text">Cuisine Type</span>
//           </label>
//           <select
//             name="cuisineType"
//             defaultValue={editingRecipe.cuisineType}
//             className="select select-bordered w-full"
//             required
//           >
//             <option value="">Select Cuisine</option>
//             <option value="Italian">Italian</option>
//             <option value="Mexican">Mexican</option>
//             <option value="Indian">Indian</option>
//             <option value="Chinese">Chinese</option>
//             <option value="American">American</option>
//           </select>
//         </div>

//         {/* Ingredients */}
//         <div>
//           <label className="label">
//             <span className="label-text">Ingredients (comma-separated)</span>
//           </label>
//           <input
//             name="ingredients"
//             defaultValue={editingRecipe.ingredients?.join(", ")}
//             className="input input-bordered w-full"
//           />
//         </div>

//         {/* Instructions */}
//         <div>
//           <label className="label">
//             <span className="label-text">Instructions (comma-separated)</span>
//           </label>
//           <input
//             name="instructions"
//             defaultValue={editingRecipe.instructions?.join(", ")}
//             className="input input-bordered w-full"
//           />
//         </div>

//         {/* Categories */}
//         <div>
//           <label className="label">
//             <span className="label-text">Categories (comma-separated)</span>
//           </label>
//           <input
//             name="categories"
//             defaultValue={editingRecipe.categories?.join(", ")}
//             className="input input-bordered w-full"
//           />
//         </div>

//         <div className="flex justify-end gap-3 pt-4">
//           <button
//             type="button"
//             onClick={() => setEditingRecipe(null)}
//             className="btn btn-outline"
//           >
//             Cancel
//           </button>
//           <button type="submit" className="btn btn-primary">
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   </div>
// )}

//     </div>
//   );
// };

// export default MyRecipes;







import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";

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
        .get(`http://localhost:5000/recipes?email=${user.email}`)
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
      await axios.patch(`http://localhost:5000/recipes/like/${recipe._id}`);
      setLikeCount((prev) => prev + 1);
      setLiked(true);
      toast.success("Thanks for your interest!");
    } catch (err) {
      console.error("Like failed:", err);
      toast.error("Failed to like. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
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
      categories: Array.from(form.categories.selectedOptions).map((o) => o.value),
    };

    try {
      await axios.put(
        `http://localhost:5000/recipes/${editingRecipe._id}`,
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
      <h2 className="text-3xl font-bold mb-6">My Recipes ({myRecipes.length})</h2>

      {loading ? (
        <div className="text-center mt-10">
          <span className="loading loading-spinner text-error"></span> Loading recipes...
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
                
                  {myRecipes.map((item) => (
  <div key={item._id}>
    <Link to={`/update-recipe/${item._id}`}>
      <button className="btn btn-sm btn-warning">Update</button>
    </Link>
  </div>
))}
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

     
      {/* {editingRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-4 text-center text-blue-600">
              ✏️ Update Recipe
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="label">Title</label>
                <input
                  name="title"
                  defaultValue={editingRecipe.title}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Image URL</label>
                <input
                  name="image"
                  defaultValue={editingRecipe.image}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Preparation Time (mins)</label>
                <input
                  name="preparationTime"
                  type="number"
                  defaultValue={editingRecipe.preparationTime}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Cuisine Type</label>
                <select
                  name="cuisineType"
                  defaultValue={editingRecipe.cuisineType}
                  className="select select-bordered w-full"
                  required
                >
                  {["Chinese", "Italian", "Mexican", "Indian", "Thai", "French"].map(
                    (type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="label">Ingredients (comma-separated)</label>
                <input
                  name="ingredients"
                  defaultValue={
                    Array.isArray(editingRecipe.ingredients)
                      ? editingRecipe.ingredients.join(", ")
                      : editingRecipe.ingredients || ""
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Instructions (comma-separated)</label>
                <input
                  name="instructions"
                  defaultValue={
                    Array.isArray(editingRecipe.instructions)
                      ? editingRecipe.instructions.join(", ")
                      : editingRecipe.instructions || ""
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Categories</label>
                <select
                  name="categories"
                  multiple
                  className="select select-bordered w-full"
                  defaultValue={editingRecipe.categories}
                >
                  {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan", "Gluten-Free"].map(
                    (cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    )
                  )}
                </select>
              </div>

          

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingRecipe(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )} */}




    </div>
  );
};

export default MyRecipes;
