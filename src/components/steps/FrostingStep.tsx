import React from 'react';
import { FrostingType, useCake } from '../../lib/cake-context';
import { FROSTING_DETAILS } from '../../lib/cake-data';
import CakeOption from '../ui/CakeOption';

const FrostingStep: React.FC = () => {
  const { cake, setFrosting, unlockedIngredients } = useCake();
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display">Pick Your Frosting</h2>
        <p className="text-muted-foreground">The perfect finishing touch to your cake</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(FROSTING_DETAILS).map(([key, details]) => {
          const frostingKey = key as FrostingType;
          const isUnlocked = unlockedIngredients.frostings.includes(frostingKey);
          
          return (
            <CakeOption
              key={key}
              name={details.name}
              description={isUnlocked ? details.description : 'Locked - Keep baking to unlock!'}
              isSelected={cake.frosting === frostingKey}
              onClick={() => setFrosting(frostingKey)}
              disabled={!isUnlocked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FrostingStep;