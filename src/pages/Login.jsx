



import { useContext, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const { loginWithEmailPassword, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginWithEmailPassword(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true }); // 🔥 Place this HERE
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Google login successful!");
      navigate(from, { replace: true }); // 🔥 Place this here too
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="input input-bordered w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input input-bordered w-full mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-full mb-3" type="submit">
          Login
        </button>
      </form>

      <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
        Continue with Google
      </button>

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
