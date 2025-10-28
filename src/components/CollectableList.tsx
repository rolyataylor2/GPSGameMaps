import type { CollectableDefinition } from '../theme/types';
import './CollectableList.css';

interface CollectableListProps {
  title: string;
  collectables: CollectableDefinition[];
  onCollect: (collectable: CollectableDefinition) => void;
}

export function CollectableList({ title, collectables, onCollect }: CollectableListProps) {
  return (
    <div className="main-card collectable-list">
      <h2 className="section-title">{title}</h2>
      <ul>
        {collectables.map((collectable) => (
          <li key={collectable.id}>
            <button onClick={() => onCollect(collectable)}>
              <span className="collectable-list__icon" aria-hidden>{collectable.icon}</span>
              <span>
                <strong>{collectable.name}</strong>
                <small>{collectable.description}</small>
              </span>
              <span className={`collectable-list__rarity collectable-list__rarity--${collectable.rarity}`}>
                {collectable.rarity}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
