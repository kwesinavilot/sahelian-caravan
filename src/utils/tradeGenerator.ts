import { TradeItem } from '../types/game';

const tradeItems: TradeItem[] = [
  { id: '1', name: 'Dried Dates', price: 10, type: 'food' },
  { id: '2', name: 'Fresh Water', price: 15, type: 'water' },
  { id: '3', name: 'Spices', price: 30, type: 'luxury' },
  { id: '4', name: 'Preserved Meat', price: 25, type: 'food' },
  { id: '5', name: 'Water Skins', price: 20, type: 'water' },
];

export function generateTradeItems(): TradeItem[] {
  const availableItems = [...tradeItems];
  const selectedItems: TradeItem[] = [];
  
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * availableItems.length);
    selectedItems.push(availableItems[index]);
    availableItems.splice(index, 1);
  }
  
  return selectedItems;
}