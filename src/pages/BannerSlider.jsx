import { useEffect } from "react";
import Slider from "react-slick";
// import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import Typed from "react-typed";

// Custom arrows
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
  >
    <FaArrowRight className="text-white text-xl" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
  >
    <FaArrowLeft className="text-white text-xl" />
  </div>
);

// Banner images
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";
import { ReactTyped, Typed } from "react-typed";

const banners = [
  { id: 1, img: banner1, title: "Discover Tasty Recipes" },
  { id: 2, img: banner2, title: "Cook Like a Pro" },
  { id: 3, img: banner3, title: "Easy & Quick Meals" },
  { id: 4, img: banner4, title: "Healthy & Fresh Dishes" },
  { id: 5, img: banner5, title: "Flavors from Every Culture" },
];

// Animated phrases
const animatedPhrases = [
  "1000+ Recipes Available",
  "Loved by Foodies",
  "Add, Like & Share Recipes",
  "Create Your Personal Cookbook",
];

const BannerSlider = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative">
      <Slider {...sliderSettings}>
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden"
          >
            <img
              src={banner.img}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex flex-col items-center justify-center text-center px-4">
              <h2
                data-aos="fade-up"
                className="text-white text-3xl md:text-5xl font-extrabold leading-tight"
              >
                {banner.title}
              </h2>
              <ReactTyped
                strings={animatedPhrases}
                typeSpeed={40}
                backSpeed={30}
                backDelay={2000}
                loop
              >
                <span className="text-white mt-4 text-lg md:text-xl font-medium block" />
              </ReactTyped>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
