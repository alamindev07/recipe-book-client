

// import { useEffect, useState } from "react";

// const AllRecipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [cuisineFilter, setCuisineFilter] = useState("");

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/recipes");
//         const data = await res.json();
//         setRecipes(data);
//       } catch (err) {
//         console.error("Failed to load recipes:", err);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const filteredRecipes = cuisineFilter
//     ? recipes.filter((r) => r.cuisine === cuisineFilter)
//     : recipes;

//   const cuisines = [...new Set(recipes.map((r) => r.cuisine))];

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-4">All Recipes</h2>

//       <div className="mb-4">
//         <select
//           className="select select-bordered"
//           value={cuisineFilter}
//           onChange={(e) => setCuisineFilter(e.target.value)}
//         >
//           <option value="">All Cuisines</option>
//           {cuisines.map((cuisine, idx) => (
//             <option key={idx} value={cuisine}>
//               {cuisine}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         {filteredRecipes.map((recipe) => (
//           <div key={recipe._id} className="card bg-base-100 shadow-xl">
//             <figure>
//               <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">{recipe.title}</h2>
//               <p className="text-sm text-gray-500">{recipe.cuisine}</p>
//               <p>{recipe.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllRecipes;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/recipes")
      .then(res => {
        setRecipes(res.data);
        setFiltered(res.data);
      });
  }, []);

  useEffect(() => {
    if (cuisineFilter === "") {
      setFiltered(recipes);
    } else {
      const filteredData = recipes.filter(recipe => recipe.cuisine === cuisineFilter);
      setFiltered(filteredData);
    }
  }, [cuisineFilter, recipes]);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Recipes</h1>

      {/* Cuisine Filter */}
      <div className="mb-6 text-center">
        <select
          onChange={(e) => setCuisineFilter(e.target.value)}
          className="select select-bordered w-full max-w-xs"
          defaultValue=""
        >
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(recipe => (
          <div key={recipe._id} className="card bg-base-100 shadow-md border border-gray-100">
            <figure><img src={recipe.image} alt={recipe.title} className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
              <p><strong>Time:</strong> {recipe.prepTime} mins</p>
              <p><strong>Likes:</strong> {recipe.likes}</p>
              <div className="card-actions justify-end">
                <Link to={`/recipes/${recipe._id}`} className="btn btn-sm btn-primary">See Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
