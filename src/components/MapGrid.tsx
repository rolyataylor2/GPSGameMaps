import { useMemo } from 'react';
import type { CollectableDefinition } from '../theme/types';
import './MapGrid.css';

interface MapGridProps {
  gridSize: number;
  tilesetUrl: string;
  playerPosition: { lat: number; lng: number } | null;
  loading: boolean;
  error?: string;
  collectables: CollectableDefinition[];
  onCollectableClick: (collectable: CollectableDefinition) => void;
}

interface GridCell {
  id: string;
  x: number;
  y: number;
  hasPlayer: boolean;
  collectable?: CollectableDefinition;
}

export function MapGrid({
  gridSize,
  tilesetUrl,
  playerPosition,
  loading,
  error,
  collectables,
  onCollectableClick,
}: MapGridProps) {
  const cells = useMemo(() => {
    const radius = 5;
    const coordinates: GridCell[] = [];
    for (let y = -radius; y <= radius; y++) {
      for (let x = -radius; x <= radius; x++) {
        const id = `${x}:${y}`;
        const hasPlayer = x === 0 && y === 0;
        const index = Math.abs(x * 13 + y * 7);
        const collectable = collectables.length
          ? collectables[index % collectables.length]
          : undefined;
        coordinates.push({ id, x, y, hasPlayer, collectable: hasPlayer ? undefined : collectable });
      }
    }
    return coordinates;
  }, [collectables]);

  if (loading) {
    return <div className="map-grid__overlay">Acquiring GPS signal…</div>;
  }

  if (error) {
    return <div className="map-grid__overlay error">{error}</div>;
  }

  return (
    <div className="map-grid">
      <div className="map-grid__background" style={{ backgroundImage: `url(${tilesetUrl})` }} />
      {cells.map((cell) => (
        <button
          key={cell.id}
          className={`map-grid__cell${cell.hasPlayer ? ' is-player' : ''}`}
          style={{
            transform: `translate(${cell.x * 64}px, ${cell.y * 64}px)`,
          }}
          aria-label={`Grid cell ${cell.x},${cell.y}`}
          disabled={cell.hasPlayer}
          onClick={() => cell.collectable && onCollectableClick(cell.collectable)}
        >
          <span className="map-grid__cell-label">
            {cell.hasPlayer ? '📍' : cell.collectable?.icon ?? ''}
          </span>
        </button>
      ))}
      {playerPosition && (
        <div className="map-grid__coords">
          <strong>GPS</strong>
          <span>
            {playerPosition.lat.toFixed(5)}, {playerPosition.lng.toFixed(5)}
          </span>
          <small>Grid cells: {gridSize}m</small>
        </div>
      )}
    </div>
  );
}
