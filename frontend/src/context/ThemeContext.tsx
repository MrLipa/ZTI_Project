import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Props {
  children: React.ReactNode;
}
const themes = [
  {
    backgroundColor: "#e9ecf2",
    navbarColor: ["#2C84F7", "#bbcdf6"],
    fontColor: "#000000",
  },
  {
    backgroundColor: "#00040b",
    navbarColor: ["#084da1", "#010f26"],
    fontColor: "#ffffff",
  },
];
type ThemeContextType = {
  theme: number;
  currentTheme: {
    backgroundColor: string;
    navbarColor: string[];
    fontColor: string;
  };
  toggleTheme: (newTheme: number) => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 0,
  currentTheme: themes[0],
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useLocalStorage("theme", 0);

  function toggleTheme(newTheme: number) {
    setTheme(newTheme);
    console.log(newTheme);
  }

  const currentTheme = themes[theme];

  const contextValue = {
    theme,
    currentTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
