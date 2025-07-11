
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../../pages/ThemeToggle";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Failed to log out");
      console.error(err);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold underline-offset-4 bg-orange-400 p-1 rounded-md  border-b-2 border-primary"
      : "hover:text-white transition-colors";

  const navLinks = (
    <>
      <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/all-recipes" onClick={() => setIsMenuOpen(false)} className={linkClass}>
        All Recipes
      </NavLink>
      {user && (
        <>
          <NavLink to="/add-recipe" onClick={() => setIsMenuOpen(false)} className={linkClass}>
            Add Recipe
          </NavLink>
          <NavLink to="/my-recipes" onClick={() => setIsMenuOpen(false)} className={linkClass}>
            My Recipes
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 bg-base-200 shadow-md px-4 py-2 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          🍽️ RecipeBook
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks}
          
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <img
                  className="w-10 rounded-full"
                  src={user.photoURL || "/user.png"}
                  alt="user avatar"
                />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <p className="text-center font-semibold">{user.displayName}</p>
                </li>
                <li>
                  <button className="btn btn-sm btn-error" onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="btn btn-outline btn-accent btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-success">
                Register
              </Link>
            </div>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            className="btn btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-base-100 p-4 rounded-lg shadow space-y-2">
          <div className="flex flex-col space-y-2">{navLinks}</div>
          
          {user ? (
            <>
              <p className="text-center font-semibold">{user.displayName}</p>
              <button className="btn btn-sm btn-error" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link onClick={() => setIsMenuOpen(false)} to="/login" className="btn  btn-sm btn-outline btn-info">
                Login
              </Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/register" className="btn btn-sm btn-success">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
