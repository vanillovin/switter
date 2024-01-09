import { createContext, useState, useContext, ReactNode } from 'react';

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
  setBodyBackgroundColor: (darkMode: boolean) => void;
};

const initialThemeContext: ThemeContextType = {
  darkMode: false,
  toggleTheme: () => {},
  setBodyBackgroundColor: () => {},
};

const ThemeContext = createContext<ThemeContextType>(initialThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
    setBodyBackgroundColor(!darkMode);
  };

  const setBodyBackgroundColor = (isDarkMode: boolean) => {
    document.body.style.backgroundColor = isDarkMode ? '#193446' : '#fff8e5';
  };

  const contextValue: ThemeContextType = {
    darkMode,
    toggleTheme,
    setBodyBackgroundColor,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
