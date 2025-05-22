import React, { useEffect, useState } from 'react';
import { useCakeStore } from '../lib/store';

export function CakePreview() {
  const { currentCake } = useCakeStore();
  const [animation, setAnimation] = useState('');
  
  useEffect(() => {
    setAnimation('animate-bounce');
    const timer = setTimeout(() => setAnimation(''), 1000);
    return () => clearTimeout(timer);
  }, [currentCake]);

  const getBgColor = (type: 'base' | 'filling' | 'frosting') => {
    if (type === 'base') {
      switch (currentCake.base) {
        case 'vanilla': return 'bg-amber-50';
        case 'chocolate': return 'bg-amber-950';
        case 'red velvet': return 'bg-red-700';
        case 'lemon': return 'bg-yellow-200';
        case 'marble': return 'bg-gradient-to-r from-amber-50 to-amber-950';
        default: return 'bg-gray-200';
      }
    } else if (type === 'filling') {
      const fillings = currentCake.fillings;
      if (fillings.length === 0) return 'bg-transparent';
      
      if (fillings.length === 1) {
        switch (fillings[0]) {
          case 'buttercream': return 'bg-amber-100';
          case 'chocolate ganache': return 'bg-amber-900';
          case 'fruit preserves': return 'bg-red-400';
          case 'cream cheese': return 'bg-neutral-100';
          case 'custard': return 'bg-yellow-200';
          default: return 'bg-transparent';
        }
      } else {
        return 'bg-gradient-to-r from-amber-100 via-red-300 to-neutral-100';
      }
    } else {
      switch (currentCake.frosting) {
        case 'buttercream': return 'bg-amber-100';
        case 'fondant': return 'bg-slate-100';
        case 'whipped cream': return 'bg-white';
        case 'cream cheese': return 'bg-neutral-50';
        default: return 'bg-transparent';
      }
    }
  };

  const renderDecorations = () => {
    if (currentCake.decorations.length === 0) return null;

    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {currentCake.decorations.includes('sprinkles') && (
          <div className="absolute inset-0 flex">
            {[...Array(20)].map((_, i) => (
              <div 
                key={`sprinkle-${i}`}
                className={`absolute w-1 h-2 rounded-full ${getRandomColor()}`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        )}
        
        {currentCake.decorations.includes('fresh fruit') && (
          <div className="absolute top-0 flex justify-center w-full">
            <div className="flex space-x-2">
              {['bg-red-500', 'bg-blue-400', 'bg-green-400'].map((color, i) => (
                <div key={`fruit-${i}`} className={`${color} w-3 h-3 rounded-full shadow-sm`} />
              ))}
            </div>
          </div>
        )}
        
        {currentCake.decorations.includes('chocolate shavings') && (
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div 
                key={`chocolate-${i}`}
                className="absolute bg-amber-950 w-2 h-1 rounded-sm"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        )}
        
        {currentCake.decorations.includes('edible flowers') && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
              <FlowerDecoration color="pink" />
            </div>
            <div className="absolute top-5 left-5">
              <FlowerDecoration color="purple" />
            </div>
            <div className="absolute bottom-5 right-5">
              <FlowerDecoration color="yellow" />
            </div>
          </div>
        )}
        
        {currentCake.decorations.includes('fondant shapes') && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute top-4 left-8">
              <div className="bg-pink-300 w-8 h-8 rounded-full flex items-center justify-center">
                <div className="bg-pink-200 w-5 h-5 rounded-full" />
              </div>
            </div>
            <div className="absolute bottom-6 right-6">
              <div className="bg-blue-300 w-6 h-6" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-semibold mb-4">
        {currentCake.name ? currentCake.name : 'Your Cake Creation'}
      </div>
      
      <div className={`relative ${animation} mb-8`}>
        {/* Cake stand */}
        <div className="w-40 h-4 bg-stone-400 rounded-full mx-auto shadow-md"></div>
        <div className="w-10 h-10 bg-stone-500 rounded-full mx-auto -mt-4 shadow-md"></div>
        
        {/* Cake layers */}
        <div className="relative w-32 h-48 mx-auto mt-2 flex flex-col justify-end">
          {/* Cake base */}
          <div className={`w-32 h-20 rounded-b-3xl rounded-t-lg ${getBgColor('base')} shadow-lg relative overflow-hidden`}>
            {currentCake.base === 'marble' && (
              <div className="absolute inset-0">
                <div className="absolute h-full w-3 bg-amber-950 rounded-full" style={{ left: '20%', transform: 'rotate(45deg)' }}></div>
                <div className="absolute h-full w-4 bg-amber-950 rounded-full" style={{ left: '50%', transform: 'rotate(-20deg)' }}></div>
                <div className="absolute h-full w-3 bg-amber-950 rounded-full" style={{ left: '80%', transform: 'rotate(15deg)' }}></div>
              </div>
            )}
          </div>
          
          {/* Filling layers */}
          {currentCake.fillings.length > 0 && (
            <div className={`w-32 h-4 ${getBgColor('filling')} shadow-inner relative -mt-1`}>
              <div className="absolute w-full h-1/3 bg-opacity-20 bg-white top-0"></div>
            </div>
          )}
          
          {/* Frosting */}
          <div className={`w-36 h-24 rounded-t-3xl -mt-16 ${getBgColor('frosting')} shadow-lg relative overflow-hidden`}>
            {/* Frosting texture */}
            {currentCake.frosting === 'buttercream' && (
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={`frosting-${i}`}
                    className="absolute bg-white bg-opacity-20 h-1.5 w-full"
                    style={{ top: `${i * 3 + 2}px` }}
                  />
                ))}
              </div>
            )}
            
            {/* Decorations */}
            {renderDecorations()}
          </div>
        </div>
      </div>
      
      <div className="text-xl font-bold text-primary-600 mt-4">
        ${currentCake.price.toFixed(2)}
      </div>
    </div>
  );
}

function FlowerDecoration({ color }: { color: string }) {
  const colorClass = color === 'pink' 
    ? 'bg-pink-300' 
    : color === 'purple' 
      ? 'bg-purple-300' 
      : 'bg-yellow-300';
  
  return (
    <div className="relative">
      <div className={`absolute w-2 h-2 ${colorClass} rounded-full -top-2 left-0`}></div>
      <div className={`absolute w-2 h-2 ${colorClass} rounded-full -top-1 -left-1`}></div>
      <div className={`absolute w-2 h-2 ${colorClass} rounded-full top-0 -left-2`}></div>
      <div className={`absolute w-2 h-2 ${colorClass} rounded-full top-1 -left-1`}></div>
      <div className={`absolute w-2 h-2 ${colorClass} rounded-full top-2 left-0`}></div>
      <div className={`absolute w-2 h-2 ${colorClass} rounded-full top-1 left-1`}></div>
      <div className={`absolute w-2 h-2 ${colorClass} rounded-full top-0 left-2`}></div>
      <div className={`absolute w-2 h-2 ${colorClass} rounded-full -top-1 left-1`}></div>
      <div className="w-3 h-3 bg-yellow-400 rounded-full z-10 relative"></div>
    </div>
  );
}

function getRandomColor() {
  const colors = [
    'bg-red-400', 'bg-blue-400', 'bg-green-400', 
    'bg-yellow-400', 'bg-pink-400', 'bg-purple-400'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}