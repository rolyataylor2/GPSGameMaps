import { useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeDefinition, MiniGameDefinition, InteractionDefinition, CollectableDefinition } from '../theme/types';
import type { ScreenKey } from '../state/GameStateContext';
import './ThemeEditorScreen.css';

const emptyMiniGame: MiniGameDefinition = {
  id: 'new-mini-game',
  name: '',
  description: '',
  difficulty: 'easy',
  previewIcon: '🎮',
  rules: [],
};

const emptyInteraction: InteractionDefinition = {
  id: 'new-interaction',
  label: '',
  trigger: 'location',
  description: '',
};

const emptyCollectable: CollectableDefinition = {
  id: 'new-collectable',
  name: '',
  rarity: 'common',
  description: '',
  miniGameId: '',
  icon: '✨',
};

const SCREEN_LABELS: ScreenKey[] = ['map', 'minigame', 'inventory', 'theme-editor'];

export function ThemeEditorScreen() {
  const { theme, availableThemes, upsertTheme, setTheme } = useTheme();
  const [draft, setDraft] = useState<ThemeDefinition>(theme);

  useEffect(() => {
    setDraft(theme);
  }, [theme]);

  const updateDraft = <K extends keyof ThemeDefinition>(key: K, value: ThemeDefinition[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="theme-editor">
      <aside className="theme-editor__sidebar main-card">
        <h2 className="section-title">Themes</h2>
        <select value={theme.id} onChange={(event) => setTheme(event.target.value)}>
          {availableThemes.map((availableTheme) => (
            <option key={availableTheme.id} value={availableTheme.id}>
              {availableTheme.name}
            </option>
          ))}
        </select>
        <button
          className="theme-editor__create"
          onClick={() => {
            const newTheme: ThemeDefinition = {
              ...theme,
              id: `custom-${Date.now()}`,
              name: 'Custom Theme',
              title: 'Custom Adventure',
            };
            upsertTheme(newTheme);
          }}
        >
          Duplicate Theme
        </button>
      </aside>
      <section className="theme-editor__main">
        <div className="theme-editor__panel main-card">
          <h2 className="section-title">Faceplate</h2>
          <label>
            Title
            <input value={draft.title} onChange={(event) => updateDraft('title', event.target.value)} />
          </label>
          <label>
            Faceplate background URL
            <input
              value={draft.faceplateBackground}
              onChange={(event) => updateDraft('faceplateBackground', event.target.value)}
            />
          </label>
          <label>
            Viewport color
            <input value={draft.viewportColor} onChange={(event) => updateDraft('viewportColor', event.target.value)} />
          </label>
          <label>
            Accent color
            <input value={draft.accentColor} onChange={(event) => updateDraft('accentColor', event.target.value)} />
          </label>
          <label>
            Map tileset URL
            <input value={draft.mapTileset} onChange={(event) => updateDraft('mapTileset', event.target.value)} />
          </label>
          <label>
            Grid cell size (meters)
            <input
              type="number"
              min={1}
              value={draft.gridSize}
              onChange={(event) => updateDraft('gridSize', Number(event.target.value))}
            />
          </label>
          <div className="theme-editor__labels">
            <span>Hardware labels</span>
            {SCREEN_LABELS.map((screenKey) => (
              <label key={screenKey}>
                {screenKey}
                <input
                  value={draft.labels[screenKey] ?? ''}
                  onChange={(event) =>
                    updateDraft('labels', { ...draft.labels, [screenKey]: event.target.value })
                  }
                />
              </label>
            ))}
          </div>
        </div>
        <div className="theme-editor__panel main-card">
          <h2 className="section-title">Mini Games</h2>
          <button
            onClick={() =>
              updateDraft('miniGames', [
                ...draft.miniGames,
                { ...emptyMiniGame, id: `mini-${draft.miniGames.length + 1}` },
              ])
            }
          >
            Add Mini Game
          </button>
          <div className="theme-editor__list">
            {draft.miniGames.map((miniGame, index) => (
              <fieldset key={miniGame.id}>
                <legend>{miniGame.name || `Mini Game ${index + 1}`}</legend>
                <label>
                  Name
                  <input
                    value={miniGame.name}
                    onChange={(event) => {
                      const next = [...draft.miniGames];
                      next[index] = { ...miniGame, name: event.target.value };
                      updateDraft('miniGames', next);
                    }}
                  />
                </label>
                <label>
                  Description
                  <textarea
                    value={miniGame.description}
                    onChange={(event) => {
                      const next = [...draft.miniGames];
                      next[index] = { ...miniGame, description: event.target.value };
                      updateDraft('miniGames', next);
                    }}
                  />
                </label>
                <label>
                  Difficulty
                  <select
                    value={miniGame.difficulty}
                    onChange={(event) => {
                      const next = [...draft.miniGames];
                      next[index] = { ...miniGame, difficulty: event.target.value as MiniGameDefinition['difficulty'] };
                      updateDraft('miniGames', next);
                    }}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </label>
              </fieldset>
            ))}
          </div>
        </div>
        <div className="theme-editor__panel main-card">
          <h2 className="section-title">Collectables</h2>
          <button
            onClick={() =>
              updateDraft('collectables', [
                ...draft.collectables,
                { ...emptyCollectable, id: `collectable-${draft.collectables.length + 1}` },
              ])
            }
          >
            Add Collectable
          </button>
          <div className="theme-editor__list">
            {draft.collectables.map((collectable, index) => (
              <fieldset key={collectable.id}>
                <legend>{collectable.name || `Collectable ${index + 1}`}</legend>
                <label>
                  Name
                  <input
                    value={collectable.name}
                    onChange={(event) => {
                      const next = [...draft.collectables];
                      next[index] = { ...collectable, name: event.target.value };
                      updateDraft('collectables', next);
                    }}
                  />
                </label>
                <label>
                  Description
                  <textarea
                    value={collectable.description}
                    onChange={(event) => {
                      const next = [...draft.collectables];
                      next[index] = { ...collectable, description: event.target.value };
                      updateDraft('collectables', next);
                    }}
                  />
                </label>
                <label>
                  Mini Game ID
                  <input
                    value={collectable.miniGameId}
                    onChange={(event) => {
                      const next = [...draft.collectables];
                      next[index] = { ...collectable, miniGameId: event.target.value };
                      updateDraft('collectables', next);
                    }}
                  />
                </label>
              </fieldset>
            ))}
          </div>
        </div>
        <div className="theme-editor__panel main-card">
          <h2 className="section-title">NPC & Interactions</h2>
          <button
            onClick={() =>
              updateDraft('interactions', [
                ...draft.interactions,
                { ...emptyInteraction, id: `interaction-${draft.interactions.length + 1}` },
              ])
            }
          >
            Add Interaction
          </button>
          <div className="theme-editor__list">
            {draft.interactions.map((interaction, index) => (
              <fieldset key={interaction.id}>
                <legend>{interaction.label || `Interaction ${index + 1}`}</legend>
                <label>
                  Label
                  <input
                    value={interaction.label}
                    onChange={(event) => {
                      const next = [...draft.interactions];
                      next[index] = { ...interaction, label: event.target.value };
                      updateDraft('interactions', next);
                    }}
                  />
                </label>
                <label>
                  Trigger
                  <select
                    value={interaction.trigger}
                    onChange={(event) => {
                      const next = [...draft.interactions];
                      next[index] = { ...interaction, trigger: event.target.value as InteractionDefinition['trigger'] };
                      updateDraft('interactions', next);
                    }}
                  >
                    <option value="npc">NPC</option>
                    <option value="object">Object</option>
                    <option value="location">Location</option>
                  </select>
                </label>
              </fieldset>
            ))}
          </div>
        </div>
        <div className="theme-editor__actions">
          <button className="theme-editor__save" onClick={() => upsertTheme(draft)}>
            Save Theme
          </button>
        </div>
      </section>
    </div>
  );
}
