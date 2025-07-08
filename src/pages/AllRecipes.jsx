import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaClock, FaHeart, FaUtensils } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [search, setSearch] = useState("");




  // before useEffect
const fetchRecipes = async () => {
  try {
    const res = await axios.get("http://localhost:5000/recipes");
    setRecipes(res.data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    setLoading(false);
  }
};

useEffect(() => {
  fetchRecipes();
}, []);



  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCuisine =
      !selectedCuisine || recipe.cuisine === selectedCuisine;
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  const cuisineTypes = ["Italian", "Mexican", "Indian", "Chinese", "Others"];

  const handleLike = async (id) => {
  try {
    // await axios.patch(`http://localhost:5000/recipe/like/${id}`);
    await axios.patch(`http://localhost:5000/recipes/like/${id}`);

Swal.fire({
  title: "Liked!",
  icon: "success",
  draggable: true
});
    // Refresh data after like
    fetchRecipes();
  } catch (error) {
    toast.error("Failed to like");
  }
};

  return (
    <div className="px-4 py-2">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl p-4 md:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-white">All Recipes</h1>
          <Link to="/add-recipe" className="btn btn-primary text-white btn-sm">
            + Add Recipe
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Cuisine Filter */}
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn bg-white text-orange-600 font-semibold">
              <MdFilterList className="mr-1" /> All Cuisines
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
              <li><button onClick={() => setSelectedCuisine("")}>All</button></li>
              {cuisineTypes.map((cuisine) => (
                <li key={cuisine}>
                  <button onClick={() => setSelectedCuisine(cuisine)}>{cuisine}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search recipes..."
            className="input input-sm rounded-full w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <p className="text-white font-semibold">
            {filteredRecipes.length} recipes found
          </p>
        </div>
      </div>

      {/* Recipe Grid */}
      {loading ? (
        <div className="text-center mt-10"><span className="loading loading-spinner text-error"></span>Loading recipes...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="card bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-bold">{recipe.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><FaClock /> {recipe.preparationTime} mins</span>
                  <span className="flex items-center gap-1"><FaUtensils /> {recipe.cuisineType}</span>
                </div>
                <p className="text-sm text-gray-500 font-medium">By: {recipe?.user?.name || "Unknown"}</p>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {recipe.categories?.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-orange-100 text-orange-600 px-2 py-1 text-xs rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/recipes/${recipe._id}`}
                    className="btn btn-sm bg-orange-500 text-white"
                  >
                    Details
                  </Link>
                 

                  <button onClick={() => handleLike(recipe._id)} className="btn btn-sm bg-orange-100 text-orange-600">
                    <FaHeart className="mr-1" /> {recipe.likeCount || 0}
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

export default AllRecipes;
