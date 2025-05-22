import { useState } from 'react';
import { useCakeStore } from '../lib/store';
import { Button } from './ui/button';
import { LevelBadge } from './LevelBadge';
import { Cake, Coins, Menu, X } from 'lucide-react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const player = useCakeStore(state => state.player);
  const completedCakes = useCakeStore(state => state.cakeHistory.length);

  return (
    <header className="bg-gradient-to-r from-primary-100 to-primary-200 p-4 sm:p-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Cake className="h-8 w-8 text-primary-700" />
          <h1 className="font-hand text-2xl sm:text-3xl text-primary-900">Sweet Creations</h1>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden rounded-full p-2 text-primary-900 hover:bg-primary-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50/80 shadow-sm">
            <Coins className="h-5 w-5 text-primary-700" />
            <span className="font-medium">{player.coins}</span>
          </div>
          
          <LevelBadge level={player.level} />
          
          <div className="px-3 py-1 rounded-full bg-primary-50/80 shadow-sm">
            <span className="font-medium">{completedCakes} Cakes Created</span>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 p-4 bg-white rounded-lg shadow-lg animate-fade-in">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Coins:</span>
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-primary-700" />
                <span>{player.coins}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Level:</span>
              <LevelBadge level={player.level} />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Cakes Created:</span>
              <span>{completedCakes}</span>
            </div>
            
            <Button 
              variant="secondary" 
              size="sm"
              className="mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Close Menu
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}