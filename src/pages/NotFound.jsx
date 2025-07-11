import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

// Use your own local image or an external one
import NotFoundImage from "../assets/3737258.jpg"; // <-- Make sure the image exists
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-100 to-pink-100 px-4 text-center">
      
       <Helmet>
              <title>NotFound -Recipe Book</title>
            </Helmet>
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="w-full max-w-md mb-8 animate-float"
        data-aos="zoom-in"
      />
      <h1
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        data-aos="fade-up"
      >
        Oops! Page Not Found
      </h1>
      <p
        className="text-gray-600 text-lg md:text-xl mb-6 max-w-xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
      
      >
        <FaArrowLeft />
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
