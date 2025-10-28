export interface FaceplateSkin {
  id: string;
  name: string;
  faceplateBackground: string;
  viewportColor: string;
  accentColor: string;
  labels: Record<string, string>;
}

export interface MiniGameDefinition {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  previewIcon: string;
  rules: string[];
}

export interface InteractionDefinition {
  id: string;
  label: string;
  trigger: 'npc' | 'object' | 'location';
  description: string;
  requirements?: string[];
  reward?: string;
}

export interface ThemeDefinition extends FaceplateSkin {
  title: string;
  mapTileset: string;
  gridSize: number;
  miniGames: MiniGameDefinition[];
  interactions: InteractionDefinition[];
  collectables: CollectableDefinition[];
  homeBase?: {
    label: string;
    craftingRecipes: RecipeDefinition[];
  };
}

export interface CollectableDefinition {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic';
  description: string;
  miniGameId: string;
  icon: string;
}

export interface RecipeDefinition {
  id: string;
  name: string;
  description: string;
  ingredients: { itemId: string; quantity: number }[];
  resultItemId: string;
}

export interface ItemDefinition {
  id: string;
  name: string;
  description: string;
  type: 'collectable' | 'quest' | 'consumable' | 'equipment';
}
