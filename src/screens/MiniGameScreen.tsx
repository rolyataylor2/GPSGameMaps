import { useMemo } from 'react';
import { useGameState } from '../state/GameStateContext';
import { useTheme } from '../theme/ThemeContext';
import './MiniGameScreen.css';

interface MiniGameScreenProps {
  miniGameId?: string;
}

export function MiniGameScreen({ miniGameId }: MiniGameScreenProps) {
  const { setActiveScreen, setActiveMiniGame, addToInventory, pinnedCollectable, setPinnedCollectable } =
    useGameState();
  const { theme, availableThemes } = useTheme();

  const miniGame = useMemo(() => theme.miniGames.find((game) => game.id === miniGameId), [miniGameId, theme]);

  const collectable = pinnedCollectable ?? theme.collectables.find((item) => item.miniGameId === miniGameId);

  return (
    <div className="mini-game-screen">
      <section className="mini-game-screen__details main-card">
        <h2 className="section-title">{miniGame?.name ?? 'Select a challenge'}</h2>
        {miniGame ? (
          <div className="mini-game-screen__body">
            <div className="mini-game-screen__icon" aria-hidden>
              {miniGame.previewIcon}
            </div>
            <div>
              <p>{miniGame.description}</p>
              <ul>
                {miniGame.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
              <div className="mini-game-screen__meta">
                Difficulty: <span>{miniGame.difficulty}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="subtle-text">Pick a collectable from the map to begin a mini game challenge.</p>
        )}
        {collectable ? (
          <button
            className="mini-game-screen__collect"
            onClick={() => {
              addToInventory(collectable);
              setPinnedCollectable(undefined);
              setActiveMiniGame(undefined);
              setActiveScreen('inventory');
            }}
          >
            Complete challenge & collect {collectable.name}
          </button>
        ) : null}
      </section>
      <section className="mini-game-screen__themes main-card">
        <h2 className="section-title">Themes</h2>
        <p className="subtle-text">Mini games adapt to the active theme&apos;s art direction.</p>
        <ul>
          {availableThemes.map((availableTheme) => (
            <li key={availableTheme.id}>
              <strong>{availableTheme.name}</strong>
              <small>{availableTheme.miniGames.length} mini games</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
