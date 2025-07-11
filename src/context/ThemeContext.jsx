// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [homeTheme, setHomeTheme] = useState("light"); // local control for Home

  return (
    <ThemeContext.Provider value={{ homeTheme, setHomeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
