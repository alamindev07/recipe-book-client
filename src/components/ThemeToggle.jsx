// src/components/ThemeToggle.jsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // ✅ Adjust path if needed

const ThemeToggle = () => {
  const { homeTheme, setHomeTheme } = useTheme();

  const toggleTheme = () => {
    setHomeTheme(homeTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      title="Toggle Home Theme"
    >
      {homeTheme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
