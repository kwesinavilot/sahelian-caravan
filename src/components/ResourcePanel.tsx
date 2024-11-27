import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Droplet, Apple, Coins } from 'lucide-react';

export function ResourcePanel() {
  const { resources, day } = useGameStore();

  return (
    <div className="bg-amber-800 text-amber-50 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Day {day}</h2>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-blue-400" />
          <span>Water: {resources.water}</span>
        </div>
        <div className="flex items-center gap-2">
          <Apple className="w-5 h-5 text-green-400" />
          <span>Food: {resources.food}</span>
        </div>
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-yellow-400" />
          <span>Gold: {resources.gold}</span>
        </div>
      </div>
    </div>
  );
}