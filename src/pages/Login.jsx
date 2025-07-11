import { useContext, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import { Helmet } from "react-helmet-async";

const auth = getAuth(app);

const Login = () => {
  const { loginWithEmailPassword, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginWithEmailPassword(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      // console.error("Firebase Error Code:", err.code);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-email"
      ) {
        setError("Please check your Email & Password and Try again");
      } else if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Please check your Email & Password and Try again");
      } else {
        setError("Login failed! Please try again with correct Email and Password.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center px-4 bg-orange-50">
       <Helmet>
        <title>Login - Recipe Book</title>
      </Helmet>
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Panel */}
        <div className="md:w-1/2 bg-gradient-to-b from-orange-400 to-orange-500 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center mb-6">
            Sign in to continue to your Recipe Book and discover amazing culinary creations.
          </p>
          <p className="mb-2">Don't have an account?</p>
          <Link
            to="/register"
            className="bg-white text-orange-500 font-semibold px-6 py-2 rounded hover:bg-orange-100 transition"
          >
            Create Account
          </Link>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 w-full p-8 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Email address</label>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-orange-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Password</label>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-orange-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded flex items-center justify-center gap-2 transition ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-400 to-orange-500 hover:opacity-90"
              }`}
            >
              <span className="material-icons">login</span>
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </form>

          <div className="my-6 text-center text-gray-500">Or continue with</div>

          <button
            onClick={handleGoogleLogin}
            className="w-full border rounded px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
