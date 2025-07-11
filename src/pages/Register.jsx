import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const { registerWithEmailPassword, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(form.password);
    if (passwordError) return setError(passwordError);

    try {
      const userCredential = await registerWithEmailPassword(
        form.email,
        form.password
      );
      await updateUserProfile({
        displayName: form.name,
        photoURL: form.photoURL,
      });

      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-orange-50">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Panel */}
        <div className="md:w-1/2 bg-gradient-to-b from-orange-400 to-orange-500 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4">Join Us!</h2>
          <p className="text-center mb-6">
            Create an account to start saving your favorite recipes and explore culinary inspiration.
          </p>
          <p className="mb-2">Already have an account?</p>
          <Link
            to="/login"
            className="bg-white text-orange-500 font-semibold px-6 py-2 rounded hover:bg-orange-100 transition"
          >
            Login
          </Link>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 w-full p-8 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-orange-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Your email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-orange-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Photo URL</label>
              <input
                type="text"
                placeholder="Photo URL (optional)"
                value={form.photoURL}
                onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
                className="w-full border border-orange-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Password</label>
              <input
                type="password"
                placeholder="Your password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-orange-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-2 rounded hover:opacity-90 transition"
            >
              Register
            </button>
          </form>

          <div className="my-6 text-center text-gray-500">Or continue with</div>

          <button
            onClick={handleGoogle}
            className="w-full border rounded px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
