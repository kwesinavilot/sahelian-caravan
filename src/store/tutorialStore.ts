import { create } from 'zustand';
import { TutorialState, TutorialStep } from '../types/tutorial';
import { useGameStore } from './gameStore';

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Sahelian Caravan!',
    content: 'Lead your caravan through the treacherous Sahel region. Use arrow keys to move and space to advance time.',
    trigger: () => true,
  },
  {
    id: 'resources',
    title: 'Managing Resources',
    content: 'Keep an eye on your water, food, and gold. Your caravan consumes resources each day.',
    trigger: (state) => state.completedSteps.includes('welcome'),
    position: 'right',
  },
  {
    id: 'movement',
    title: 'Navigation',
    content: 'Use arrow keys to move across the desert. Avoid rocks (gray tiles) and look for oases (green) and settlements (brown).',
    trigger: (state) => state.completedSteps.includes('resources'),
  },
  {
    id: 'caravan',
    title: 'Your Caravan',
    content: 'Monitor your caravan members\' health and hire new members when possible.',
    trigger: (state) => state.completedSteps.includes('movement'),
    position: 'right',
  },
  {
    id: 'events',
    title: 'Random Events',
    content: 'As you travel, you\'ll encounter various events. Choose your responses carefully!',
    trigger: (state) => state.completedSteps.includes('caravan'),
  },
];

interface TutorialStore extends TutorialState {
  completeStep: (stepId: string) => void;
  startTutorial: () => void;
  skipTutorial: () => void;
  checkTriggers: () => void;
}

export const useTutorialStore = create<TutorialStore>((set, get) => ({
  isFirstPlay: true,
  completedSteps: [],
  currentStep: null,
  isVisible: false,

  completeStep: (stepId: string) => {
    set((state) => ({
      completedSteps: [...state.completedSteps, stepId],
      currentStep: null,
      isVisible: false,
    }));
    get().checkTriggers();
  },

  startTutorial: () => {
    set({ isFirstPlay: false });
    get().checkTriggers();
  },

  skipTutorial: () => {
    set({
      isFirstPlay: false,
      completedSteps: tutorialSteps.map(step => step.id),
      currentStep: null,
      isVisible: false,
    });
  },

  checkTriggers: () => {
    const state = get();
    if (state.currentStep) return;

    const nextStep = tutorialSteps.find(
      (step) => 
        !state.completedSteps.includes(step.id) &&
        step.trigger(state)
    );

    if (nextStep) {
      set({
        currentStep: nextStep,
        isVisible: true,
      });
    }
  },
}));