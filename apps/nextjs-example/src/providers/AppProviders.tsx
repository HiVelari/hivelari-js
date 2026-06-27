'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface AppContextValue {
  theme: Theme;
  devMode: boolean;
  toggleTheme: () => void;
  toggleDevMode: () => void;
}

const AppContext = createContext<AppContextValue>({
  theme: 'dark',
  devMode: false,
  toggleTheme: () => {},
  toggleDevMode: () => {},
});

export function useApp() {
  return useContext(AppContext);
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [devMode, setDevMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hvl-theme') as Theme | null;
    const preferred = window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
    const initial = saved ?? preferred;
    setTheme(initial);
    setDevMode(localStorage.getItem('hvl-devmode') === 'true');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hvl-theme', theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('hvl-devmode', String(devMode));
    document.documentElement.setAttribute('data-devmode', String(devMode));
  }, [devMode, mounted]);

  return (
    <AppContext.Provider
      value={{
        theme,
        devMode,
        toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
        toggleDevMode: () => setDevMode((d) => !d),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function DevBadge({ method }: { method: string }) {
  const { devMode } = useApp();
  if (!devMode) return null;
  return (
    <span className="dev-badge">
      <span className="dev-badge-dot" />
      {method}
    </span>
  );
}
