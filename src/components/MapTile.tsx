import React from 'react';
import { Tile } from '../types/game';

interface MapTileProps {
  tile: Tile;
  x: number;
  y: number;
  isPlayerHere: boolean;
}

const tileColors = {
  sand: 'bg-yellow-200',
  rock: 'bg-gray-600',
  oasis: 'bg-green-500',
  settlement: 'bg-amber-700',
};

export function MapTile({ tile, isPlayerHere }: MapTileProps) {
  if (!tile || !tile.type) {
    return <div className="w-6 h-6 bg-red-500" />; // Error state
  }

  return (
    <div
      className={`
        w-6 h-6 
        ${tileColors[tile.type]}
        ${!tile.discovered ? 'opacity-50' : ''}
        ${isPlayerHere ? 'relative' : ''}
      `}
    >
      {isPlayerHere && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
}