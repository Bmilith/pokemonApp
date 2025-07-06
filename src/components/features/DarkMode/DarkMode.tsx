import { useEffect, useState } from 'react';
import { NightMode, LightMode } from '@/assets';

export const DarkMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const element = document.documentElement;

    if (theme === 'dark') {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="relative w-6 h-6">
      <img
        onClick={() => setTheme('dark')}
        src={NightMode}
        alt="Switch to Dark Mode"
        className={`absolute top-0 left-0 w-6 h-6 cursor-pointer transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />
      <img
        onClick={() => setTheme('light')}
        src={LightMode}
        alt="Switch to Light Mode"
        className={`absolute top-0 left-0 w-6 h-6 cursor-pointer transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </div>
  );
};
