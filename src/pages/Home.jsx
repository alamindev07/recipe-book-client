
import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
import { MdOutlineRestaurant } from "react-icons/md";
import { FaFireAlt } from "react-icons/fa";

import image1 from "../assets/babu.jpg";
import image2 from "../assets/alamin.jpg";

import BannerSlider from "./BannerSlider";
import { useTheme } from "../context/ThemeContext";







const testimonials = [
  { name: "Babu", message: "This site helped me cook better!", avatar: image1 },
  { name: "AL-Amin", message: "Amazing recipes and great UI!", avatar: image2 },
];

const Home = () => {
  const [topRecipes, setTopRecipes] = useState([]);
 const { homeTheme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/recipes/top-liked")
      .then((res) => setTopRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);








  return (

    <div className={`min-h-screen transition-all duration-300 ${
        homeTheme === "dark" ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
      }`}>
 <div className="flex justify-end p-4">
 
      </div>

        <div>


          {/* banner section start */}
      <BannerSlider />
     
    </div>

      {/* Top Recipes Section */}
      <div className="my-12 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">🔥 Top Recipes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="card bg-base-500 shadow-xl"
              data-aos="fade-up"
            >
              <figure>
                <img src={recipe.image} alt={recipe.title} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p>Cuisine: {recipe.cuisineType}</p>
                <p>Likes: ❤️ {recipe.likeCount}</p>
                  <Link
                    to={`/recipes/${recipe._id}`}
                    className="btn btn-outline btn-sm mt-1 hover:bg-orange-500 "
                  >
                   View Details
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>


       <div className="text-center my-10">
        <Link to="/all-recipes" className="btn btn-outline btn-primary rounded-full bg-orange-500 text-black">
          See All Recipes
        </Link>
      </div>


      {/* Testimonials Section */}
      <div className="my-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">What Users Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-4 rounded shadow" data-aos="zoom-in">
              <div className="flex items-center gap-4">
                <img src={t.avatar} className="w-12 h-12 rounded-full" alt={t.name} />
                <div>
                  <p className="font-semibold text-orange-400">{t.name}</p>
                  <p className="text-sm  text-blue-600">{t.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      
      {/* Extra Section 1: About */}
      <div className="my-16 text-center rounded-xl py-10 px-4 shadow-sm bg-white">
        <h3 className="text-2xl font-semibold mb-3 text-orange-500">Why Choose Recipe Book?</h3>
        <p className="max-w-2xl mx-auto  text-green-400">
          Recipe Book is your personal kitchen companion! Store, share, and discover delicious
          recipes from all around the world with a beautiful and easy-to-use interface.
        </p>
      </div>

      {/* Extra Section 2: Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-10">
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <MdOutlineRestaurant className="text-4xl text-primary mx-auto mb-3" />
          <h4 className="font-bold text-lg mb-1 text-orange-500">1000+ Recipes</h4>
          <p className="text-sm text-gray-600">Explore cuisines and meals from around the globe.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <FaFireAlt className="text-4xl text-red-500 mx-auto mb-3" />
          <h4 className="font-bold text-lg mb-1 text-orange-500">Trending Now</h4>
          <p className="text-sm text-gray-600">Like and discover the most popular recipes.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <MdOutlineRestaurant className="text-4xl text-green-500 mx-auto mb-3" />
          <h4 className="font-bold text-lg mb-1 text-orange-500">Your Recipe Vault</h4>
          <p className="text-sm text-gray-600">Save and manage your personal recipe collection.</p>
        </div>
      </div>
    

    </div>
  );
};

export default Home;

