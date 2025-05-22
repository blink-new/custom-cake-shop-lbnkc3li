import React from 'react';
import { CakeBase, useCake } from '../../lib/cake-context';
import { BASE_DETAILS } from '../../lib/cake-data';
import CakeOption from '../ui/CakeOption';

const BaseStep: React.FC = () => {
  const { cake, setBase, unlockedIngredients } = useCake();
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display">Choose Your Cake Base</h2>
        <p className="text-muted-foreground">This will be the foundation of your cake creation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(BASE_DETAILS).map(([key, details]) => {
          const baseKey = key as CakeBase;
          const isUnlocked = unlockedIngredients.bases.includes(baseKey);
          
          return (
            <CakeOption
              key={key}
              name={details.name}
              description={isUnlocked ? details.description : 'Locked - Keep baking to unlock!'}
              isSelected={cake.base === baseKey}
              onClick={() => setBase(baseKey)}
              disabled={!isUnlocked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BaseStep;