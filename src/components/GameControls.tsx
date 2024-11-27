import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export function GameControls() {
  const { movePlayer, playerPosition, advanceDay } = useGameStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const moves = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      const move = moves[e.key as keyof typeof moves];
      if (move) {
        movePlayer({
          x: playerPosition.x + move.x,
          y: playerPosition.y + move.y,
        });
      }

      if (e.key === ' ') {
        advanceDay();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer, playerPosition, advanceDay]);

  return (
    <div className="bg-amber-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Controls</h2>
      <div className="space-y-2 text-sm">
        <p>Arrow keys: Move</p>
        <p>Space: Advance time</p>
      </div>
    </div>
  );
}