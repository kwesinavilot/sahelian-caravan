export interface TutorialStep {
  id: string;
  title: string;
  content: string;
  trigger: (state: any) => boolean;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export interface TutorialState {
  isFirstPlay: boolean;
  completedSteps: string[];
  currentStep: TutorialStep | null;
  isVisible: boolean;
}