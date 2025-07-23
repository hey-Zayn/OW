"use client";
import React from 'react';
import { useTheme } from '../ThemeContext';

const themeOptions = [
  {
    name: 'Default',
    key: 'default',
    colors: ['#ffffff', '#FDC435', '#171717'],
  },
  {
    name: 'Dark',
    key: 'dark',
    colors: ['#171717', '#FDC435', '#ffffff'],
  },
  {
    name: 'Blue',
    key: 'blue',
    colors: ['#e3f0ff', '#3b82f6', '#171717'],
  },
  {
    name: 'Green',
    key: 'green',
    colors: ['#e6f9e6', '#22c55e', '#171717'],
  },
];

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '2px solid var(--primary-color)',
  borderRadius: '8px',
  padding: '1.5rem',
  margin: '1rem',
  cursor: 'pointer',
  minWidth: '160px',
  transition: 'transform 0.2s',
};

const colorRowStyle = {
  display: 'flex',
  marginBottom: '1rem',
};

const colorCircleStyle = (color) => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: color,
  margin: '0 0.25rem',
  border: '1px solid #ccc',
});

export default function ThemePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Choose a Theme</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {themeOptions.map((option) => (
          <div
            key={option.key}
            style={{
              ...cardStyle,
              boxShadow: theme === option.key ? '0 0 0 4px var(--primary-color)' : 'none',
              transform: theme === option.key ? 'scale(1.05)' : 'scale(1)',
            }}
            onClick={() => setTheme(option.key)}
          >
            <div style={colorRowStyle}>
              {option.colors.map((color, idx) => (
                <div key={idx} style={colorCircleStyle(color)} />
              ))}
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{option.name}</span>
            {theme === option.key && <span style={{ color: 'var(--primary-color)', marginTop: '0.5rem' }}>Selected</span>}
          </div>
        ))}
      </div>
    </div>
  );
} 