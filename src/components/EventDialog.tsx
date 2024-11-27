import React from 'react';
import { useGameStore } from '../store/gameStore';

export function EventDialog() {
  const { currentEvent, handleEvent } = useGameStore();

  if (!currentEvent) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-amber-800 p-6 rounded-lg shadow-xl max-w-md">
        <h2 className="text-2xl font-bold mb-4">{currentEvent.title}</h2>
        <p className="mb-6">{currentEvent.description}</p>
        <div className="space-y-2">
          {currentEvent.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleEvent(index)}
              className="w-full p-2 bg-amber-700 hover:bg-amber-600 rounded"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}