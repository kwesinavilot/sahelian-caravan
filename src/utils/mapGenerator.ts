import { Map, Noise, RNG } from 'rot-js';
import { GameMap, Tile } from '../types/game';

const TILE_TYPES = {
  SAND: { type: 'sand', walkable: true, discovered: false },
  ROCK: { type: 'rock', walkable: false, discovered: false },
  OASIS: { type: 'oasis', walkable: true, discovered: false },
  SETTLEMENT: { type: 'settlement', walkable: true, discovered: false },
} as const;

export function generateMap(width: number, height: number): GameMap {
  if (width <= 0 || height <= 0) {
    throw new Error('Map dimensions must be positive numbers');
  }

  const map: Tile[][] = Array(height)
    .fill(null)
    .map(() => 
      Array(width)
        .fill(null)
        .map(() => ({ ...TILE_TYPES.SAND }))
    );

  // Generate base terrain using ROT.js noise
  const noise = new Noise.Simplex();
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = noise.get(x / 20, y / 20);
      
      if (value < -0.3) {
        map[y][x] = { ...TILE_TYPES.ROCK };
      } else {
        map[y][x] = { ...TILE_TYPES.SAND };
      }
    }
  }

  // Place oases
  const oasisCount = Math.floor((width * height) / 200);
  placeFeatures(map, oasisCount, TILE_TYPES.OASIS);

  // Place settlements
  const settlementCount = Math.floor((width * height) / 300);
  placeFeatures(map, settlementCount, TILE_TYPES.SETTLEMENT);

  // Ensure starting position is walkable
  const centerY = Math.floor(height / 2);
  const centerX = Math.floor(width / 2);
  map[centerY][centerX] = { ...TILE_TYPES.SAND };

  return { width, height, tiles: map };
}

function placeFeatures(map: Tile[][], count: number, tileType: Tile): void {
  const height = map.length;
  const width = map[0].length;
  let placed = 0;

  while (placed < count) {
    const x = Math.floor(RNG.getUniform() * width);
    const y = Math.floor(RNG.getUniform() * height);

    if (map[y][x].type === 'sand') {
      map[y][x] = { ...tileType };
      placed++;
    }
  }
}