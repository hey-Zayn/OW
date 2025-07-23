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


  // Professional Theme Combos
  slate: {
    '--bg-color': '#f8fafc',
    '--primary-color': '#64748b',
    '--text-color': '#0f172a',
  },
  gold: {
    '--bg-color': '#fffbea',
    '--primary-color': '#bfa14a',
    '--text-color': '#2d2a32',
  },
  rose: {
    '--bg-color': '#fff1f2',
    '--primary-color': '#e11d48',
    '--text-color': '#3b0828',
  },
  graphite: {
    '--bg-color': '#23272f',
    '--primary-color': '#8e8e93',
    '--text-color': '#f5f7fa',
  },
  emerald: {
    '--bg-color': '#e6f4ea',
    '--primary-color': '#10b981',
    '--text-color': '#134e4a',
  },
  royal: {
    '--bg-color': '#f5f7ff',
    '--primary-color': '#3b3b98',
    '--text-color': '#22223b',
  },
  sand: {
    '--bg-color': '#fdf6e3',
    '--primary-color': '#e1b382',
    '--text-color': '#2d2a32',
  },
  crimson: {
    '--bg-color': '#fff5f5',
    '--primary-color': '#b91c1c',
    '--text-color': '#1a1a1a',
  },
  steel: {
    '--bg-color': '#e2e8f0',
    '--primary-color': '#334155',
    '--text-color': '#0f172a',
  },
  mint: {
    '--bg-color': '#e6fff7',
    '--primary-color': '#2dd4bf',
    '--text-color': '#134e4a',
  },
  plum: {
    '--bg-color': '#f3e8ff',
    '--primary-color': '#a21caf',
    '--text-color': '#3b0764',
  },
  copper: {
    '--bg-color': '#fff7ed',
    '--primary-color': '#b87333',
    '--text-color': '#3e2723',
  },
  onyx: {
    '--bg-color': '#18181b',
    '--primary-color': '#27272a',
    '--text-color': '#f4f4f5',
  },
  arctic: {
    '--bg-color': '#e0f7fa',
    '--primary-color': '#00bcd4',
    '--text-color': '#263238',
  },
  blush: {
    '--bg-color': '#fff0f6',
    '--primary-color': '#ff6f91',
    '--text-color': '#3d1c2e',
  },

  sunset: {
    '--bg-color': '#ffecd2',
    '--primary-color': '#fc6767',
    '--text-color': '#2d1e2f',
  },
  ocean: {
    '--bg-color': '#e0f7fa',
    '--primary-color': '#0077b6',
    '--text-color': '#023047',
  },
  lavender: {
    '--bg-color': '#f3e8ff',
    '--primary-color': '#8f5fd7',
    '--text-color': '#2d1e2f',
  },
  forest: {
    '--bg-color': '#e6f4ea',
    '--primary-color': '#166534',
    '--text-color': '#102a13',
  },
  peach: {
    '--bg-color': '#fff0e5',
    '--primary-color': '#ff9472',
    '--text-color': '#3e2723',
  },
  midnight: {
    '--bg-color': '#18122b',
    '--primary-color': '#635985',
    '--text-color': '#f5e8c7',
  },
  citrus: {
    '--bg-color': '#f7ffe0',
    '--primary-color': '#fbbf24',
    '--text-color': '#3a3a1a',
  },
  sky: {
    '--bg-color': '#e0f2fe',
    '--primary-color': '#38bdf8',
    '--text-color': '#0c223a',
  },
  flamingo: {
    '--bg-color': '#fff5f7',
    '--primary-color': '#ff5e62',
    '--text-color': '#2d142c',
  },
  moss: {
    '--bg-color': '#f4fff8',
    '--primary-color': '#4caf50',
    '--text-color': '#1b3a2b',
  },
  cocoa: {
    '--bg-color': '#f5e9da',
    '--primary-color': '#7b3f00',
    '--text-color': '#2d1e12',
  },
  denim: {
    '--bg-color': '#e3eafc',
    '--primary-color': '#2563eb',
    '--text-color': '#1e293b',
  },
  coral: {
    '--bg-color': '#fff6f0',
    '--primary-color': '#ff7f50',
    '--text-color': '#2e1a12',
  },
  lemon: {
    '--bg-color': '#ffffe0',
    '--primary-color': '#ffe066',
    '--text-color': '#3a3a1a',
  },
  orchid: {
    '--bg-color': '#f9f4ff',
    '--primary-color': '#da77f2',
    '--text-color': '#3d1c2e',
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