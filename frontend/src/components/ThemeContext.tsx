import React, { useState } from 'react';
import useLocalStorage from './useLocalStorage'

interface Props {
  children: React.ReactNode;
}

export const ThemeContext = React.createContext({
  darkTheme: true,
  toggleTheme: () => {}
});

const ThemeProvider = ({ children }: Props) => {
  const [darkTheme, setDarkTheme] = useLocalStorage('theme', false)

  function toggleTheme() {
    setDarkTheme((prevDarkTheme: boolean) => !prevDarkTheme);
  }

  const contextValue = {
    darkTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;