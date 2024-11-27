import { create } from 'zustand';
import { GameState, Position } from '../types/game';
import { generateMap } from '../utils/mapGenerator';

interface GameStore extends GameState {
  movePlayer: (newPosition: Position) => void;
  updateResources: (delta: Partial<GameState['resources']>) => void;
  advanceDay: () => void;
}

const INITIAL_MAP_SIZE = 50;

export const useGameStore = create<GameStore>((set, get) => ({
  map: generateMap(INITIAL_MAP_SIZE, INITIAL_MAP_SIZE),
  playerPosition: { 
    x: Math.floor(INITIAL_MAP_SIZE / 2), 
    y: Math.floor(INITIAL_MAP_SIZE / 2) 
  },
  caravan: [],
  resources: {
    food: 100,
    water: 100,
    gold: 50,
  },
  day: 1,

  movePlayer: (newPosition) => {
    const state = get();
    const tile = state.map.tiles[newPosition.y]?.[newPosition.x];
    
    if (tile?.walkable) {
      set({ playerPosition: newPosition });
      
      // Update discovered tiles
      const updatedMap = { ...state.map };
      const visibility = 5;
      
      for (let dy = -visibility; dy <= visibility; dy++) {
        for (let dx = -visibility; dx <= visibility; dx++) {
          const y = newPosition.y + dy;
          const x = newPosition.x + dx;
          if (y >= 0 && y < state.map.height && x >= 0 && x < state.map.width) {
            updatedMap.tiles[y][x].discovered = true;
          }
        }
      }
      
      set({ map: updatedMap });
    }
  },
  
  updateResources: (delta) =>
    set((state) => ({
      resources: {
        ...state.resources,
        ...Object.fromEntries(
          Object.entries(delta).map(([key, value]) => [
            key,
            Math.max(0, (state.resources[key as keyof GameState['resources']] || 0) + (value || 0)),
          ])
        ),
      },
    })),

  advanceDay: () =>
    set((state) => ({
      day: state.day + 1,
      resources: {
        ...state.resources,
        food: Math.max(0, state.resources.food - state.caravan.length * 2),
        water: Math.max(0, state.resources.water - state.caravan.length * 3),
      },
    })),
}));