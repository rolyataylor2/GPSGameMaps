import { useMemo } from 'react';
import { useTheme } from './theme/ThemeContext';
import { GameLayout } from './components/GameLayout';
import { MapScreen } from './screens/MapScreen';
import { MiniGameScreen } from './screens/MiniGameScreen';
import { ThemeEditorScreen } from './screens/ThemeEditorScreen';
import { useGameState } from './state/GameStateContext';
import { InventoryScreen } from './screens/InventoryScreen';
import type { ScreenKey } from './state/GameStateContext';

const screenOrder: ScreenKey[] = ['map', 'minigame', 'inventory', 'theme-editor'];

export default function App() {
  const { theme } = useTheme();
  const { activeScreen, activeMiniGame } = useGameState();

  const content = useMemo(() => {
    switch (activeScreen) {
      case 'map':
        return <MapScreen />;
      case 'minigame':
        return <MiniGameScreen miniGameId={activeMiniGame} />;
      case 'inventory':
        return <InventoryScreen />;
      case 'theme-editor':
        return <ThemeEditorScreen />;
      default:
        return <MapScreen />;
    }
  }, [activeScreen, activeMiniGame]);

  return (
    <GameLayout
      theme={theme}
      navigation={{
        order: screenOrder,
      }}
    >
      {content}
    </GameLayout>
  );
}
