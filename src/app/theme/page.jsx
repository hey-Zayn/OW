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
  {
    name: 'Slate Modern',
    key: 'slate',
    colors: ['#f8fafc', '#64748b', '#0f172a'],
    description: 'Clean, professional, and easy on the eyes.',
    icon: '🪨',
  },
  {
    name: 'Golden Hour',
    key: 'gold',
    colors: ['#fffbea', '#bfa14a', '#2d2a32'],
    description: 'Elegant, luxurious, and radiant.',
    icon: '🏆',
  },
  {
    name: 'Rose Petal',
    key: 'rose',
    colors: ['#fff1f2', '#e11d48', '#3b0828'],
    description: 'Romantic, soft, and full of charm.',
    icon: '🌹',
  },
  {
    name: 'Graphite Night',
    key: 'graphite',
    colors: ['#23272f', '#8e8e93', '#f5f7fa'],
    description: 'Dark, sleek, and ultra-modern.',
    icon: '🖤',
  },
  {
    name: 'Emerald Isle',
    key: 'emerald',
    colors: ['#e6f4ea', '#10b981', '#134e4a'],
    description: 'Lush, vibrant, and full of life.',
    icon: '💚',
  },
  {
    name: 'Royal Blue',
    key: 'royal',
    colors: ['#f5f7ff', '#3b3b98', '#22223b'],
    description: 'Regal, bold, and sophisticated.',
    icon: '👑',
  },
  {
    name: 'Sandy Beach',
    key: 'sand',
    colors: ['#fdf6e3', '#e1b382', '#2d2a32'],
    description: 'Warm, relaxed, and sun-kissed.',
    icon: '🏖️',
  },
  {
    name: 'Crimson Red',
    key: 'crimson',
    colors: ['#fff5f5', '#b91c1c', '#1a1a1a'],
    description: 'Passionate, energetic, and striking.',
    icon: '🟥',
  },
  {
    name: 'Steel Cool',
    key: 'steel',
    colors: ['#e2e8f0', '#334155', '#0f172a'],
    description: 'Industrial, strong, and reliable.',
    icon: '🛠️',
  },
  {
    name: 'Mint Fresh',
    key: 'mint',
    colors: ['#e6fff7', '#2dd4bf', '#134e4a'],
    description: 'Refreshing, light, and invigorating.',
    icon: '🌱',
  },
  {
    name: 'Plum Velvet',
    key: 'plum',
    colors: ['#f3e8ff', '#a21caf', '#3b0764'],
    description: 'Rich, deep, and luxurious.',
    icon: '🍇',
  },
  {
    name: 'Copper Glow',
    key: 'copper',
    colors: ['#fff7ed', '#b87333', '#3e2723'],
    description: 'Warm, metallic, and earthy.',
    icon: '🥉',
  },
  {
    name: 'Onyx Black',
    key: 'onyx',
    colors: ['#18181b', '#27272a', '#f4f4f5'],
    description: 'Bold, mysterious, and timeless.',
    icon: '🪨',
  },
  {
    name: 'Arctic Chill',
    key: 'arctic',
    colors: ['#e0f7fa', '#00bcd4', '#263238'],
    description: 'Cool, crisp, and refreshing.',
    icon: '❄️',
  },
  {
    name: 'Blush Pink',
    key: 'blush',
    colors: ['#fff0f6', '#ff6f91', '#3d1c2e'],
    description: 'Gentle, sweet, and uplifting.',
    icon: '🌸',
  },
  {
    name: 'Sunset Glow',
    key: 'sunset',
    colors: ['#ffecd2', '#fc6767', '#2d1e2f'],
    description: 'Warm, radiant, and dreamy.',
    icon: '🌅',
  },
  {
    name: 'Ocean Blue',
    key: 'ocean',
    colors: ['#e0f7fa', '#0077b6', '#023047'],
    description: 'Deep, calm, and refreshing.',
    icon: '🌊',
  },
  {
    name: 'Lavender Dream',
    key: 'lavender',
    colors: ['#f3e8ff', '#8f5fd7', '#2d1e2f'],
    description: 'Soft, floral, and relaxing.',
    icon: '💜',
  },
  {
    name: 'Forest Green',
    key: 'forest',
    colors: ['#e6f4ea', '#166534', '#102a13'],
    description: 'Natural, lush, and tranquil.',
    icon: '🌲',
  },
  {
    name: 'Peach Fuzz',
    key: 'peach',
    colors: ['#fff0e5', '#ff9472', '#3e2723'],
    description: 'Sweet, soft, and inviting.',
    icon: '🍑',
  },
  {
    name: 'Midnight',
    key: 'midnight',
    colors: ['#18122b', '#635985', '#f5e8c7'],
    description: 'Dark, moody, and elegant.',
    icon: '🌙',
  },
  {
    name: 'Citrus Pop',
    key: 'citrus',
    colors: ['#f7ffe0', '#fbbf24', '#3a3a1a'],
    description: 'Bright, zesty, and energetic.',
    icon: '🍋',
  },
  {
    name: 'Sky Blue',
    key: 'sky',
    colors: ['#e0f2fe', '#38bdf8', '#0c223a'],
    description: 'Airy, open, and optimistic.',
    icon: '☁️',
  },
  {
    name: 'Flamingo',
    key: 'flamingo',
    colors: ['#fff5f7', '#ff5e62', '#2d142c'],
    description: 'Vivid, playful, and bold.',
    icon: '🦩',
  },
  {
    name: 'Moss Green',
    key: 'moss',
    colors: ['#f4fff8', '#4caf50', '#1b3a2b'],
    description: 'Earthy, calm, and grounded.',
    icon: '🌿',
  },
  {
    name: 'Cocoa',
    key: 'cocoa',
    colors: ['#f5e9da', '#7b3f00', '#2d1e12'],
    description: 'Rich, cozy, and comforting.',
    icon: '🍫',
  },
  {
    name: 'Denim',
    key: 'denim',
    colors: ['#e3eafc', '#2563eb', '#1e293b'],
    description: 'Classic, cool, and casual.',
    icon: '👖',
  },
  {
    name: 'Coral',
    key: 'coral',
    colors: ['#fff6f0', '#ff7f50', '#2e1a12'],
    description: 'Lively, warm, and cheerful.',
    icon: '🪸',
  },
  {
    name: 'Lemon',
    key: 'lemon',
    colors: ['#ffffe0', '#ffe066', '#3a3a1a'],
    description: 'Fresh, bright, and tangy.',
    icon: '🍋',
  },
  {
    name: 'Orchid',
    key: 'orchid',
    colors: ['#f9f4ff', '#da77f2', '#3d1c2e'],
    description: 'Exotic, elegant, and vibrant.',
    icon: '🌸',
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