
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [homeTheme, setHomeTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ homeTheme, setHomeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
