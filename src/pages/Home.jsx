import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFireAlt } from "react-icons/fa";
import { MdOutlineRestaurant } from "react-icons/md";
import { toast } from "react-toastify";
import bannerimg from "../assets/5704472.jpg"

const mockRecipes = [
  {
    _id: 1,
    title: "Spaghetti Bolognese",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636",
    cuisine: "Italian",
    likes: 105,
  },
  {
    _id: 2,
    title: "Chicken Tikka Masala",
   image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636",
    cuisine: "Indian",
    likes: 98,
  },
  {
    _id: 3,
    title: "Tacos",
   image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636",
    cuisine: "Mexican",
    likes: 90,
  },
  {
    _id: 4,
    title: "Chow Mein",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636",
    cuisine: "Chinese",
    likes: 87,
  },
  {
    _id: 5,
    title: "Vegan Bowl",
   image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636",
    cuisine: "Others",
    likes: 70,
  },
  {
    _id: 6,
    title: "Pancakes",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636",
    cuisine: "Others",
    likes: 65,
  },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    // simulate API call
    const timer = setTimeout(() => {
      setTopRecipes(mockRecipes);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 lg:px-10 py-8">
      {/* Slider / Banner */}
      <div className="carousel w-full h-[200px] lg:h-[400px] rounded-xl overflow-hidden mb-10 shadow-lg">
        <div className="carousel-item w-full">
          <img
            src={bannerimg}
            className="w-full object-cover"
            alt="Food Banner"
          />
        </div>
      </div>

      {/* Top Recipes */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">🔥 Top Recipes</h2>
        <p className="text-gray-500">Discover the most loved recipes from our community.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecipes.map((recipe) => (
            <div key={recipe._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={recipe.image} alt={recipe.title} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p>Cuisine: {recipe.cuisine}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-red-500 flex items-center gap-1"><FaFireAlt /> {recipe.likes}</span>
                  <Link to={`/recipes/${recipe._id}`} className="btn btn-sm btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* See All Recipes */}
      <div className="text-center my-10">
        <Link to="/all-recipes" className="btn btn-outline btn-primary">
          See All Recipes
        </Link>
      </div>

      {/* Extra Section 1: About */}
      <div className="my-16 text-center bg-base-200 rounded-xl py-10 px-4">
        <h3 className="text-2xl font-semibold mb-3">Why Choose Recipe Book?</h3>
        <p className="max-w-2xl mx-auto text-gray-600">
          Recipe Book is your personal kitchen companion! Store, share, and discover delicious
          recipes from all around the world with a beautiful and easy-to-use interface.
        </p>
      </div>

      {/* Extra Section 2: Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-10">
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <MdOutlineRestaurant className="text-4xl text-primary mx-auto mb-3" />
          <h4 className="font-bold text-lg mb-1">1000+ Recipes</h4>
          <p className="text-sm text-gray-600">Explore cuisines and meals from around the globe.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <FaFireAlt className="text-4xl text-red-500 mx-auto mb-3" />
          <h4 className="font-bold text-lg mb-1">Trending Now</h4>
          <p className="text-sm text-gray-600">Like and discover the most popular recipes.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <MdOutlineRestaurant className="text-4xl text-green-500 mx-auto mb-3" />
          <h4 className="font-bold text-lg mb-1">Your Recipe Vault</h4>
          <p className="text-sm text-gray-600">Save and manage your personal recipe collection.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
