export interface Position {
  x: number;
  y: number;
}

export interface Tile {
  type: 'sand' | 'rock' | 'oasis' | 'settlement';
  walkable: boolean;
  discovered: boolean;
}

export interface GameMap {
  width: number;
  height: number;
  tiles: Tile[][];
}

export interface CaravanMember {
  id: string;
  name: string;
  role: string;
  health: number;
  skills: string[];
  backstory: string;
}

export interface TradeItem {
  id: string;
  name: string;
  price: number;
  type: 'food' | 'water' | 'luxury';
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: {
    text: string;
    effect: (state: GameState) => Partial<GameState>;
  }[];
}

export interface GameState {
  map: GameMap;
  playerPosition: Position;
  caravan: CaravanMember[];
  resources: {
    food: number;
    water: number;
    gold: number;
  };
  day: number;
  timeOfDay: 'dawn' | 'day' | 'dusk' | 'night';
  currentEvent: GameEvent | null;
  isTrading: boolean;
  availableTradeItems: TradeItem[];
  visibility: number;
}