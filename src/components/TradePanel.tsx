import React from 'react';
import { useGameStore } from '../store/gameStore';
import { ShoppingCart } from 'lucide-react';

export function TradePanel() {
  const { isTrading, availableTradeItems, buyItem, endTrading, resources } = useGameStore();

  if (!isTrading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-amber-800 p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Trading Post</h2>
          <button
            onClick={endTrading}
            className="p-2 bg-amber-700 hover:bg-amber-600 rounded"
          >
            Close
          </button>
        </div>
        <div className="space-y-4">
          {availableTradeItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-amber-300">{item.price} gold</p>
              </div>
              <button
                onClick={() => buyItem(item)}
                disabled={resources.gold < item.price}
                className="p-2 bg-amber-700 hover:bg-amber-600 disabled:opacity-50 rounded"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}