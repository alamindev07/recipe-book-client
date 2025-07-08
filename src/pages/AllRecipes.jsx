// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaFireAlt } from "react-icons/fa";

// const mockRecipes = [
//   {
//     _id: 1,
//     title: "Spaghetti Bolognese",
//     image: "https://source.unsplash.com/400x300/?spaghetti",
//     cuisine: "Italian",
//     likes: 105,
//   },
//   {
//     _id: 2,
//     title: "Chicken Tikka Masala",
//     image: "https://source.unsplash.com/400x300/?indian-food",
//     cuisine: "Indian",
//     likes: 98,
//   },
//   {
//     _id: 3,
//     title: "Tacos",
//     image: "https://source.unsplash.com/400x300/?tacos",
//     cuisine: "Mexican",
//     likes: 90,
//   },
//   {
//     _id: 4,
//     title: "Chow Mein",
//     image: "https://source.unsplash.com/400x300/?chinese-food",
//     cuisine: "Chinese",
//     likes: 87,
//   },
//   {
//     _id: 5,
//     title: "Vegan Bowl",
//     image: "https://source.unsplash.com/400x300/?vegan-food",
//     cuisine: "Others",
//     likes: 70,
//   },
//   {
//     _id: 6,
//     title: "Pancakes",
//     image: "https://source.unsplash.com/400x300/?pancakes",
//     cuisine: "Others",
//     likes: 65,
//   },
// ];

// const AllRecipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cuisine, setCuisine] = useState("All");

//   useEffect(() => {
//     // Simulate fetch
//     const timer = setTimeout(() => {
//       setRecipes(mockRecipes);
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const filteredRecipes =
//     cuisine === "All"
//       ? recipes
//       : recipes.filter((r) => r.cuisine === cuisine);

//   return (
//     <div className="px-4 lg:px-10 py-10">
//       <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
//         <h2 className="text-3xl font-bold">🍽️ All Recipes</h2>
//         <select
//           value={cuisine}
//           onChange={(e) => setCuisine(e.target.value)}
//           className="select select-bordered max-w-xs"
//         >
//           <option value="All">All Cuisines</option>
//           <option value="Italian">Italian</option>
//           <option value="Indian">Indian</option>
//           <option value="Mexican">Mexican</option>
//           <option value="Chinese">Chinese</option>
//           <option value="Others">Others</option>
//         </select>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <span className="loading loading-dots loading-lg text-primary"></span>
//         </div>
//       ) : filteredRecipes.length === 0 ? (
//         <div className="text-center text-gray-500 mt-10">
//           No recipes found for <strong>{cuisine}</strong>.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredRecipes.map((recipe) => (
//             <div key={recipe._id} className="card bg-base-100 shadow-md">
//               <figure>
//                 <img
//                   src={recipe.image}
//                   alt={recipe.title}
//                   className="h-48 w-full object-cover"
//                 />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title">{recipe.title}</h2>
//                 <p className="text-sm text-gray-500">Cuisine: {recipe.cuisine}</p>
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-red-500 flex items-center gap-1">
//                     <FaFireAlt /> {recipe.likes}
//                   </span>
//                   <Link
//                     to={`/recipes/${recipe._id}`}
//                     className="btn btn-sm btn-primary"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllRecipes;






import { useEffect, useState } from "react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to load recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = cuisineFilter
    ? recipes.filter((r) => r.cuisine === cuisineFilter)
    : recipes;

  const cuisines = [...new Set(recipes.map((r) => r.cuisine))];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">All Recipes</h2>

      <div className="mb-4">
        <select
          className="select select-bordered"
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
        >
          <option value="">All Cuisines</option>
          {cuisines.map((cuisine, idx) => (
            <option key={idx} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              <p className="text-sm text-gray-500">{recipe.cuisine}</p>
              <p>{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
