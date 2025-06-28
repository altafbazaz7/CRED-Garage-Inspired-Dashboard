import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../../store/slices/themeSlice';
import { useTheme } from '../../hooks/useTheme';

const createMockStore = (initialTheme = 'light') => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: {
      theme: {
        mode: initialTheme as 'light' | 'dark',
      },
    },
  });
};

const wrapper = ({ children, store }: { children: React.ReactNode; store: any }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useTheme', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    
    // Reset document class
    document.documentElement.classList.remove('dark');
    
    // Reset mocks
    jest.clearAllMocks();
  });

  test('should return initial theme state', () => {
    const store = createMockStore('light');
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    expect(result.current.mode).toBe('light');
    expect(result.current.isLight).toBe(true);
    expect(result.current.isDark).toBe(false);
  });

  test('should toggle theme from light to dark', () => {
    const store = createMockStore('light');
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.mode).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(result.current.isLight).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('should toggle theme from dark to light', () => {
    const store = createMockStore('dark');
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.mode).toBe('light');
    expect(result.current.isLight).toBe(true);
    expect(result.current.isDark).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  test('should set specific theme mode', () => {
    const store = createMockStore('light');
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    act(() => {
      result.current.setMode('dark');
    });

    expect(result.current.mode).toBe('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('should apply dark class to document when dark mode', () => {
    const store = createMockStore('light');
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    act(() => {
      result.current.setMode('dark');
    });

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('should remove dark class from document when light mode', () => {
    // Start with dark mode
    document.documentElement.classList.add('dark');
    
    const store = createMockStore('dark');
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    act(() => {
      result.current.setMode('light');
    });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('should initialize from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    
    const store = createMockStore('light'); // Store starts as light
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    // The hook should update the store based on localStorage
    expect(localStorage.getItem).toHaveBeenCalledWith('theme');
  });
});
