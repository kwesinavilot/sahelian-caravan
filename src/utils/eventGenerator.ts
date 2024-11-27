import { GameEvent, GameState } from '../types/game';

const eventTemplates: GameEvent[] = [
  {
    id: 'sandstorm',
    title: 'Sandstorm Approaching',
    description: 'A massive wall of sand approaches from the horizon. What will you do?',
    choices: [
      {
        text: 'Seek shelter and wait it out',
        effect: (state: GameState) => ({
          resources: {
            ...state.resources,
            food: state.resources.food - 5,
            water: state.resources.water - 5,
          },
          day: state.day + 1,
        }),
      },
      {
        text: 'Press forward carefully',
        effect: (state: GameState) => ({
          resources: {
            ...state.resources,
            food: state.resources.food - 10,
            water: state.resources.water - 15,
          },
          caravan: state.caravan.map(member => ({
            ...member,
            health: member.health - 10,
          })),
        }),
      },
    ],
  },
  {
    id: 'oasis',
    title: 'Hidden Oasis',
    description: 'Your caravan discovers a hidden oasis!',
    choices: [
      {
        text: 'Rest and replenish supplies',
        effect: (state: GameState) => ({
          resources: {
            ...state.resources,
            water: Math.min(100, state.resources.water + 30),
            food: Math.min(100, state.resources.food + 20),
          },
          caravan: state.caravan.map(member => ({
            ...member,
            health: Math.min(100, member.health + 20),
          })),
        }),
      },
      {
        text: 'Quickly gather supplies and move on',
        effect: (state: GameState) => ({
          resources: {
            ...state.resources,
            water: Math.min(100, state.resources.water + 15),
            food: Math.min(100, state.resources.food + 10),
          },
        }),
      },
    ],
  },
];

export function generateRandomEvent(): GameEvent {
  return eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
}