import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-recipes">All Recipes</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-recipe">Add Recipe</NavLink></li>
          <li><NavLink to="/my-recipes">My Recipes</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">Recipe Book</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 hidden md:flex">
          {navLinks}
        </ul>
        {user ? (
          <div className="dropdown dropdown-end ml-4">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <img className="w-10 rounded-full" src={user.photoURL} alt="user" />
            </div>
            <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><p className="font-semibold text-center">{user.displayName}</p></li>
              {/* <li><button onClick={logout}>Logout</button></li> */}
              <li>
  <button
    onClick={async () => {
      try {
        await logout();
        toast.success("Logged out successfully");
      } catch (err) {
        toast.error("Failed to log out");
        console.error(err);
      }
    }}
  >
    Logout
  </button>
</li>
            </ul>
          </div>
        ) : (
          <div className="space-x-2 ml-4">
            <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
            <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
