import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { DEFAULT_THEME } from './defaultThemes';
import type { ThemeDefinition } from './types';

type ThemeContextValue = {
  theme: ThemeDefinition;
  availableThemes: ThemeDefinition[];
  setTheme: (themeId: string) => void;
  upsertTheme: (theme: ThemeDefinition) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themes, setThemes] = useState<ThemeDefinition[]>([DEFAULT_THEME]);
  const [currentThemeId, setCurrentThemeId] = useState(DEFAULT_THEME.id);

  const setTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
  };

  const upsertTheme = (theme: ThemeDefinition) => {
    setThemes((prev) => {
      const exists = prev.some((t) => t.id === theme.id);
      if (exists) {
        return prev.map((t) => (t.id === theme.id ? theme : t));
      }
      return [...prev, theme];
    });
    setCurrentThemeId(theme.id);
  };

  const value = useMemo<ThemeContextValue>(() => {
    const theme = themes.find((t) => t.id === currentThemeId) ?? themes[0];
    return {
      theme,
      availableThemes: themes,
      setTheme,
      upsertTheme,
    };
  }, [themes, currentThemeId]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('ThemeContext not found');
  }
  return ctx;
}
