import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Users } from 'lucide-react';

export function CaravanPanel() {
  const { caravan, addCaravanMember, resources } = useGameStore();

  return (
    <div className="bg-amber-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Caravan Members</h2>
        <button
          onClick={addCaravanMember}
          disabled={resources.gold < 50}
          className="p-2 bg-amber-700 hover:bg-amber-600 disabled:opacity-50 rounded"
          title="Hire new member (50 gold)"
        >
          <Users className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        {caravan.map((member) => (
          <div key={member.id} className="bg-amber-700/50 p-2 rounded">
            <div className="flex justify-between">
              <span className="font-medium">{member.name}</span>
              <span className="text-sm">{member.role}</span>
            </div>
            <div className="text-sm">
              <div className="h-2 bg-amber-900 rounded">
                <div
                  className="h-full bg-green-500 rounded"
                  style={{ width: `${member.health}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}