import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { CollectableDefinition } from '../theme/types';

export type ScreenKey = 'map' | 'minigame' | 'inventory' | 'theme-editor';

interface GameState {
  activeScreen: ScreenKey;
  setActiveScreen: (screen: ScreenKey) => void;
  activeMiniGame?: string;
  setActiveMiniGame: (miniGameId?: string) => void;
  inventory: Record<string, { item: CollectableDefinition; quantity: number }>;
  addToInventory: (collectable: CollectableDefinition) => void;
  location: { lat: number; lng: number } | null;
  setLocation: (lat: number, lng: number) => void;
  pinnedCollectable?: CollectableDefinition;
  setPinnedCollectable: (collectable?: CollectableDefinition) => void;
}

const GameStateContext = createContext<GameState | undefined>(undefined);

export function GameStateProvider({ children }: PropsWithChildren) {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('map');
  const [activeMiniGame, setActiveMiniGame] = useState<string | undefined>(undefined);
  const [inventory, setInventory] = useState<GameState['inventory']>({});
  const [location, setLocationState] = useState<GameState['location']>(null);
  const [pinnedCollectable, setPinnedCollectable] = useState<CollectableDefinition | undefined>();

  const addToInventory = useCallback((collectable: CollectableDefinition) => {
    setInventory((prev) => {
      const existing = prev[collectable.id];
      const quantity = existing ? existing.quantity + 1 : 1;
      return {
        ...prev,
        [collectable.id]: {
          item: collectable,
          quantity,
        },
      };
    });
  }, []);

  const setLocation = useCallback((lat: number, lng: number) => {
    setLocationState({ lat, lng });
  }, []);

  const value = useMemo<GameState>(() => {
    return {
      activeScreen,
      setActiveScreen,
      activeMiniGame,
      setActiveMiniGame,
      inventory,
      addToInventory,
      location,
      setLocation,
      pinnedCollectable,
      setPinnedCollectable,
    };
  }, [activeScreen, activeMiniGame, inventory, location, addToInventory, setLocation, pinnedCollectable]);

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
}

export function useGameState() {
  const ctx = useContext(GameStateContext);
  if (!ctx) {
    throw new Error('GameStateContext is missing');
  }
  return ctx;
}
