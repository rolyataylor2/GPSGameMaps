import type { InteractionDefinition } from '../theme/types';
import './NearbyInteractions.css';

interface NearbyInteractionsProps {
  interactions: InteractionDefinition[];
}

export function NearbyInteractions({ interactions }: NearbyInteractionsProps) {
  return (
    <div className="main-card nearby-interactions">
      <h2 className="section-title">Interactions</h2>
      <ul>
        {interactions.map((interaction) => (
          <li key={interaction.id}>
            <div className={`nearby-interactions__icon nearby-interactions__icon--${interaction.trigger}`} />
            <div>
              <strong>{interaction.label}</strong>
              <small>{interaction.description}</small>
              {interaction.requirements?.length ? (
                <small>Requires: {interaction.requirements.join(', ')}</small>
              ) : null}
            </div>
            {interaction.reward ? <span className="nearby-interactions__reward">🎁 {interaction.reward}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
