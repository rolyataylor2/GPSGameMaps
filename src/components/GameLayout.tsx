import type { PropsWithChildren, ReactNode } from 'react';
import { useGameState } from '../state/GameStateContext';
import type { ThemeDefinition } from '../theme/types';
import type { ScreenKey } from '../state/GameStateContext';
import './GameLayout.css';

interface GameLayoutProps {
  theme: ThemeDefinition;
  navigation: {
    order: ScreenKey[];
  };
  headerSlot?: ReactNode;
}

export function GameLayout({ theme, navigation, headerSlot, children }: PropsWithChildren<GameLayoutProps>) {
  const { setActiveScreen, activeScreen } = useGameState();

  return (
    <div className="game-shell" style={{ backgroundImage: `url(${theme.faceplateBackground})` }}>
      <div className="game-shell__bezel" style={{ borderColor: theme.accentColor }}>
        <header className="game-shell__header">
          <h1>{theme.title}</h1>
          {headerSlot}
        </header>
        <main className="game-shell__viewport" style={{ backgroundColor: theme.viewportColor }}>
          {children}
        </main>
        <nav className="game-shell__nav" aria-label="Primary">
          {navigation.order.map((screen) => (
            <button
              key={screen}
              className={screen === activeScreen ? 'active' : ''}
              onClick={() => setActiveScreen(screen)}
            >
              {theme.labels[screen] ?? screen}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
