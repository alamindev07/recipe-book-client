


import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/recipes?email=${user.email}`)
        .then((res) => setMyRecipes(res.data))
        .catch((err) => console.error("Failed to fetch recipes:", err))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

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
    };

    try {
      await axios.put(`http://localhost:5000/recipes/${editingRecipe._id}`, updatedRecipe);
      setMyRecipes((prev) =>
        prev.map((r) =>
          r._id === editingRecipe._id ? { ...r, ...updatedRecipe } : r
        )
      );
      setEditingRecipe(null);
      
    } catch (err) {
      console.error("Update failed:", err);
   
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Recipes ({myRecipes.length})</h2>

      {loading? (        <div className="text-center mt-10"><span className="loading loading-spinner text-error"></span>Loading recipes...</div>
): myRecipes.length === 0 ? (
        <p className="text-center text-lg lg:text-2xl text-red-600" >No recipes found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRecipes.map((recipe) => (
            <div key={recipe._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={recipe.image} alt={recipe.title} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p>Prep Time: {recipe.preparationTime} mins</p>
                <p>Cuisine: {recipe.cuisineType}</p>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-warning" onClick={() => setEditingRecipe(recipe)}>
                    Update
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(recipe._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {editingRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Recipe</h3>
            <form onSubmit={handleUpdate}>
              <input
                name="title"
                defaultValue={editingRecipe.title}
                className="input input-bordered w-full mb-2"
                required
              />
              <input
                name="image"
                defaultValue={editingRecipe.image}
                className="input input-bordered w-full mb-2"
                required
              />
              <input
                name="preparationTime"
                defaultValue={editingRecipe.preparationTime}
                type="number"
                className="input input-bordered w-full mb-2"
                required
              />
              <input
                name="cuisineType"
                defaultValue={editingRecipe.cuisineType}
                className="input input-bordered w-full mb-4"
                required
              />
              <div className="flex justify-end gap-2">
                <button type="button" className="btn" onClick={() => setEditingRecipe(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
