"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const themes = {
  default: {
    '--bg-color': '#ffffff',
    '--primary-color': '#FDC435',
    '--text-color': '#171717',
  },
  dark: {
    '--bg-color': '#171717',
    '--primary-color': '#FDC435',
    '--text-color': '#ffffff',
  },
  blue: {
    '--bg-color': '#e3f0ff',
    '--primary-color': '#3b82f6',
    '--text-color': '#171717',
  },
  green: {
    '--bg-color': '#e6f9e6',
    '--primary-color': '#22c55e',
    '--text-color': '#171717',
  },
};

const ThemeContext = createContext({
  theme: 'default',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState('default');

  // Memoize applyTheme to avoid stale closure issues
  const applyTheme = useCallback((themeName) => {
    const themeVars = themes[themeName] || themes.default;
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      Object.entries(themeVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }, []);

  // On mount, set theme from localStorage or default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && themes[savedTheme]) {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        setThemeState('default');
        applyTheme('default');
      }
    }
    // eslint-disable-next-line
  }, [applyTheme]);

  // When theme changes, apply it
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const setTheme = (themeName) => {
    if (!themes[themeName]) return;
    setThemeState(themeName);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};