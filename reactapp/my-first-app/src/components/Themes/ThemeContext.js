import React, { createContext, useContext, useState } from 'react';

// Define a context for theme management
const ThemeContext = createContext();

// Define a provider component
export function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => setIsDarkTheme(prevTheme => !prevTheme);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the ThemeContext
export function useTheme() {
  return useContext(ThemeContext);
}
