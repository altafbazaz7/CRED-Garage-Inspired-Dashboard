import { useAppSelector, useAppDispatch } from '../store';
import { toggleTheme, setTheme } from '../store/slices/themeSlice';
import { useEffect } from 'react';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    // Initialize theme on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
    
    // Set initial class
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dispatch, mode]);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const setMode = (newMode: 'light' | 'dark') => {
    dispatch(setTheme(newMode));
  };

  return {
    mode,
    toggle,
    setMode,
    isDark: mode === 'dark',
    isLight: mode === 'light',
  };
};
