import { CaravanMember } from '../types/game';

const names = ['Amara', 'Kwame', 'Zara', 'Malik', 'Nia', 'Jamal'];
const roles = ['Scout', 'Trader', 'Healer', 'Guard', 'Cook', 'Navigator'];
const skills = ['Bargaining', 'Navigation', 'Medicine', 'Combat', 'Cooking', 'Survival'];

const backstories = [
  'Born to a family of traders, they learned the art of negotiation early.',
  'Survived alone in the desert for months before joining the caravan.',
  'Studied healing arts with village elders before seeking adventure.',
  'Former palace guard who chose the freedom of caravan life.',
];

export function generateCaravanMember(): CaravanMember {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: names[Math.floor(Math.random() * names.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    health: 100,
    skills: [skills[Math.floor(Math.random() * skills.length)]],
    backstory: backstories[Math.floor(Math.random() * backstories.length)],
  };
}