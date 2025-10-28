import { useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useGameState } from '../state/GameStateContext';
import { MapGrid } from '../components/MapGrid';
import { CollectableList } from '../components/CollectableList';
import { NearbyInteractions } from '../components/NearbyInteractions';
import { useTheme } from '../theme/ThemeContext';
import './MapScreen.css';

export function MapScreen() {
  const { coords, loading, error } = useGeolocation();
  const { setLocation, setActiveScreen, setActiveMiniGame, setPinnedCollectable } = useGameState();
  const { theme } = useTheme();

  useEffect(() => {
    if (coords) {
      setLocation(coords.lat, coords.lng);
    }
  }, [coords, setLocation]);

  return (
    <div className="map-screen">
      <section className="map-screen__grid">
        <MapGrid
          gridSize={theme.gridSize}
          playerPosition={coords}
          tilesetUrl={theme.mapTileset}
          loading={loading}
          error={error}
          collectables={theme.collectables}
          onCollectableClick={(collectable) => {
            setPinnedCollectable(collectable);
            setActiveMiniGame(collectable.miniGameId);
            setActiveScreen('minigame');
          }}
        />
      </section>
      <section className="map-screen__side">
        <CollectableList
          title="Nearby Collectables"
          collectables={theme.collectables}
          onCollect={(collectable) => {
            setPinnedCollectable(collectable);
            setActiveMiniGame(collectable.miniGameId);
            setActiveScreen('minigame');
          }}
        />
        <NearbyInteractions interactions={theme.interactions} />
      </section>
    </div>
  );
}
