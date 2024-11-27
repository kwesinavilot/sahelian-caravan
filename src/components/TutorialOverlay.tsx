import React from 'react';
import { useTutorialStore } from '../store/tutorialStore';

export function TutorialOverlay() {
  const { isFirstPlay, currentStep, completeStep, startTutorial, skipTutorial } = useTutorialStore();

  if (isFirstPlay) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-amber-800 p-8 rounded-lg shadow-xl max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Sahelian Caravan</h1>
          <p className="mb-6">Would you like to take a quick tutorial to learn the basics?</p>
          <div className="space-x-4">
            <button
              onClick={startTutorial}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded"
            >
              Start Tutorial
            </button>
            <button
              onClick={skipTutorial}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded"
            >
              Skip Tutorial
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentStep) return null;

  const positions = {
    top: 'top-4',
    right: 'right-4',
    bottom: 'bottom-4',
    left: 'left-4',
    default: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const position = currentStep.position ? positions[currentStep.position] : positions.default;

  return (
    <div className="fixed inset-0 bg-black/50 z-40">
      <div className={`fixed ${position} bg-amber-800 p-6 rounded-lg shadow-xl max-w-md z-50`}>
        <h2 className="text-2xl font-bold mb-4">{currentStep.title}</h2>
        <p className="mb-6">{currentStep.content}</p>
        <button
          onClick={() => completeStep(currentStep.id)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
}