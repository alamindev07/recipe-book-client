import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content pt-10 pb-6 px-10 lg:px-20 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-30">

        {/* Logo & Description */}
        <div>
          <Link to="/" className="text-2xl font-bold text-primary">Recipe Book</Link>
          <p className="mt-2 text-sm text-gray-500">
            Discover, create, and share delicious recipes. Join our community of food lovers!
          </p>
        </div>

    
       

        {/* Contact Info */}
        <div>
          <h4 className="footer-title text-primary">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> Sherpur Sadar, Sherpur. Mymennshing, Bangladesh</li>
            <li className="flex items-center gap-2"><FaPhoneAlt /> 01830604806</li>
            <li className="flex items-center gap-2"><FaEnvelope /> alamin.dev07@gmail.com</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="footer-title text-primary">Subscribe</h4>
          <p className="text-sm mb-2">Get delicious recipes in your inbox</p>
          <div className="form-control w-full">
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered input-sm mb-2 w-full"
            />
            <button className="btn btn-primary btn-sm w-full">Subscribe</button>
          </div>
          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://facebook.com/babu.al.amin.07" className="hover:text-blue-600"><FaFacebookF /></a>
            <a href="https://twitter.com" className="hover:text-blue-500"><FaTwitter /></a>
            <a href="https://instagram.com" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://linkedin.com" className="hover:text-blue-700"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Recipe Book. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
