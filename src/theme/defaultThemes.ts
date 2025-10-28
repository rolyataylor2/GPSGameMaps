import type { ThemeDefinition } from './types';

export const retroPocketTheme: ThemeDefinition = {
  id: 'retro-pocket',
  name: 'Retro Pocket',
  title: 'Pocket Quest',
  faceplateBackground:
    'https://images.unsplash.com/photo-1529429617124-aeea9aa9ff3e?auto=format&fit=crop&w=1200&q=80',
  viewportColor: '#1d2136cc',
  accentColor: '#7fffd4',
  labels: {
    map: 'World',
    minigame: 'Challenge',
    inventory: 'Pack',
    'theme-editor': 'Maker',
  },
  mapTileset:
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  gridSize: 3,
  miniGames: [
    {
      id: 'berry-bounce',
      name: 'Berry Bounce',
      description: 'Tap the berries before they spoil to gather them all.',
      difficulty: 'easy',
      previewIcon: '🍓',
      rules: ['Tap glowing berries', 'Avoid rotten fruit', 'Collect within 30 seconds'],
    },
    {
      id: 'gear-grinder',
      name: 'Gear Grinder',
      description: 'Rotate the rings into alignment to unlock the relic.',
      difficulty: 'medium',
      previewIcon: '⚙️',
      rules: ['Rotate wheels', 'Align the glyphs', 'Beat the clock'],
    },
  ],
  interactions: [
    {
      id: 'mcdonalds-npc',
      label: 'Fast Food Crew',
      trigger: 'location',
      description: 'Chat with the crew to learn about daily quests and special sauces.',
      reward: 'Secret Sauce Voucher',
    },
    {
      id: 'park-ranger',
      label: 'Park Ranger',
      trigger: 'npc',
      description: 'Get tips about local wildlife and hidden caches.',
    },
  ],
  collectables: [
    {
      id: 'retro-badge',
      name: 'Retro Badge',
      rarity: 'common',
      description: 'A commemorative badge from the retro pocket guild.',
      miniGameId: 'berry-bounce',
      icon: '🪙',
    },
    {
      id: 'mystic-gear',
      name: 'Mystic Gear',
      rarity: 'rare',
      description: 'A cog infused with mysterious energy from old arcades.',
      miniGameId: 'gear-grinder',
      icon: '⚙️',
    },
  ],
  homeBase: {
    label: 'Home Workshop',
    craftingRecipes: [
      {
        id: 'badge-polish',
        name: 'Badge Polish',
        description: 'Combine berries and stardust to restore a badge to pristine condition.',
        ingredients: [
          { itemId: 'retro-badge', quantity: 1 },
          { itemId: 'stardust', quantity: 2 },
        ],
        resultItemId: 'gleaming-badge',
      },
    ],
  },
};

export const DEFAULT_THEME = retroPocketTheme;
