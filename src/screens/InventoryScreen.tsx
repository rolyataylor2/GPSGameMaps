import { useGameState } from '../state/GameStateContext';
import { useTheme } from '../theme/ThemeContext';
import './InventoryScreen.css';

export function InventoryScreen() {
  const { inventory, pinnedCollectable } = useGameState();
  const { theme, availableThemes, setTheme } = useTheme();

  return (
    <div className="inventory-screen">
      <section className="inventory-screen__inventory main-card">
        <h2 className="section-title">Inventory</h2>
        <div className="inventory-screen__grid">
          {Object.values(inventory).map(({ item, quantity }) => (
            <article key={item.id} className="inventory-card">
              <header>
                <span aria-hidden>{item.icon}</span>
                <strong>{item.name}</strong>
              </header>
              <p>{item.description}</p>
              <footer>Qty: {quantity}</footer>
            </article>
          ))}
          {!Object.keys(inventory).length && <p className="subtle-text">Collect items on the map to fill your pack.</p>}
        </div>
      </section>
      <section className="inventory-screen__details">
        {pinnedCollectable ? (
          <article className="main-card inventory-screen__collectable">
            <h2 className="section-title">Pinned Collectable</h2>
            <div className="inventory-screen__collectable-body">
              <span className="inventory-screen__collectable-icon">{pinnedCollectable.icon}</span>
              <div>
                <strong>{pinnedCollectable.name}</strong>
                <p>{pinnedCollectable.description}</p>
                <small>Mini game: {pinnedCollectable.miniGameId}</small>
              </div>
            </div>
          </article>
        ) : null}
        {theme.homeBase ? (
          <article className="main-card inventory-screen__crafting">
            <h2 className="section-title">{theme.homeBase.label}</h2>
            <ul>
              {theme.homeBase.craftingRecipes.map((recipe) => (
                <li key={recipe.id}>
                  <strong>{recipe.name}</strong>
                  <small>{recipe.description}</small>
                  <small>
                    Needs:{' '}
                    {recipe.ingredients.map((ingredient) => `${ingredient.quantity}x ${ingredient.itemId}`).join(', ')}
                  </small>
                </li>
              ))}
            </ul>
          </article>
        ) : null}
        <article className="main-card inventory-screen__theme-selector">
          <h2 className="section-title">Theme</h2>
          <select value={theme.id} onChange={(event) => setTheme(event.target.value)}>
            {availableThemes.map((availableTheme) => (
              <option key={availableTheme.id} value={availableTheme.id}>
                {availableTheme.name}
              </option>
            ))}
          </select>
        </article>
      </section>
    </div>
  );
}
