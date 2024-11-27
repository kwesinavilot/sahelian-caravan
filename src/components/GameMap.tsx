import React, { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { MapTile } from './MapTile';

export function GameMap() {
  const { map, playerPosition } = useGameStore();

  const renderTile = useCallback((tile: any, x: number, y: number) => (
    <MapTile
      key={`${x}-${y}`}
      tile={tile}
      x={x}
      y={y}
      isPlayerHere={playerPosition.x === x && playerPosition.y === y}
    />
  ), [playerPosition]);

  return (
    <div 
      className="grid gap-px p-4 bg-yellow-900 overflow-auto max-h-[80vh]" 
      style={{ 
        gridTemplateColumns: `repeat(${map.width}, 1.5rem)`,
        gridTemplateRows: `repeat(${map.height}, 1.5rem)`
      }}
    >
      {map.tiles.map((row, y) =>
        row.map((tile, x) => renderTile(tile, x, y))
      )}
    </div>
  );
}