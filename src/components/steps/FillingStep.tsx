import React from 'react';
import { FillingFlavor, useCake } from '../../lib/cake-context';
import { FILLING_DETAILS } from '../../lib/cake-data';
import CakeOption from '../ui/CakeOption';

const FillingStep: React.FC = () => {
  const { cake, addFilling, removeFilling, unlockedIngredients } = useCake();
  
  const handleFillingToggle = (filling: FillingFlavor) => {
    if (cake.fillings.includes(filling)) {
      removeFilling(filling);
    } else {
      addFilling(filling);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display">Select Your Fillings</h2>
        <p className="text-muted-foreground">Choose up to 3 fillings for layers of flavor</p>
        <p className="text-sm font-medium">
          {cake.fillings.length}/3 fillings selected
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(FILLING_DETAILS).map(([key, details]) => {
          const fillingKey = key as FillingFlavor;
          const isUnlocked = unlockedIngredients.fillings.includes(fillingKey);
          const isSelected = cake.fillings.includes(fillingKey);
          const isDisabled = !isUnlocked || (!isSelected && cake.fillings.length >= 3);
          
          return (
            <CakeOption
              key={key}
              name={details.name}
              description={isUnlocked ? details.description : 'Locked - Keep baking to unlock!'}
              isSelected={isSelected}
              onClick={() => handleFillingToggle(fillingKey)}
              disabled={isDisabled}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FillingStep;