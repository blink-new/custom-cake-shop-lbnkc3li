import React from 'react';
import { Decoration, useCake } from '../../lib/cake-context';
import { DECORATION_DETAILS } from '../../lib/cake-data';
import CakeOption from '../ui/CakeOption';

const DecorationStep: React.FC = () => {
  const { cake, addDecoration, removeDecoration, unlockedIngredients } = useCake();
  
  const handleDecorationToggle = (decoration: Decoration) => {
    if (cake.decorations.includes(decoration)) {
      removeDecoration(decoration);
    } else {
      addDecoration(decoration);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display">Add Decorations</h2>
        <p className="text-muted-foreground">Make your cake beautiful and unique</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(DECORATION_DETAILS).map(([key, details]) => {
          const decorationKey = key as Decoration;
          const isUnlocked = unlockedIngredients.decorations.includes(decorationKey);
          const isSelected = cake.decorations.includes(decorationKey);
          
          return (
            <CakeOption
              key={key}
              name={details.name}
              description={isUnlocked ? details.description : 'Locked - Keep baking to unlock!'}
              icon={details.icon}
              isSelected={isSelected}
              onClick={() => handleDecorationToggle(decorationKey)}
              disabled={!isUnlocked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DecorationStep;