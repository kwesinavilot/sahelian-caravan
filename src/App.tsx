import React from 'react';
import { GameMap } from './components/GameMap';
import { ResourcePanel } from './components/ResourcePanel';
import { GameControls } from './components/GameControls';
import { CaravanPanel } from './components/CaravanPanel';
import { EventDialog } from './components/EventDialog';
import { TradePanel } from './components/TradePanel';
import { TutorialOverlay } from './components/TutorialOverlay';
import { useGameStore } from './store/gameStore';
import { GameLayout } from './components/GameLayout';

export function App() {
  const { timeOfDay } = useGameStore();

  return (
    <div className={`min-h-screen bg-amber-900 text-amber-50 ${
      timeOfDay === 'night' ? 'bg-opacity-90' : ''
    }`}>
      <header className="bg-amber-950 p-4">
        <h1 className="text-2xl font-bold">Sahelian Caravan</h1>
      </header>
      
      <GameLayout>
        <GameMap />
        <div className="space-y-4">
          <ResourcePanel />
          <CaravanPanel />
          <GameControls />
        </div>
      </GameLayout>

      <EventDialog />
      <TradePanel />
      <TutorialOverlay />
    </div>
  );
}

export default App;