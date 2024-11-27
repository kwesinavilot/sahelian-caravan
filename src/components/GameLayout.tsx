import React, { ReactNode } from 'react';

interface GameLayoutProps {
  children: ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-[1fr_300px] gap-4">
        {children}
      </div>
    </main>
  );
}