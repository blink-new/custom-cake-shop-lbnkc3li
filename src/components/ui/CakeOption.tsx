import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CakeOptionProps {
  name: string;
  description: string;
  icon?: string;
  isSelected?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const CakeOption: React.FC<CakeOptionProps> = ({
  name,
  description,
  icon,
  isSelected = false,
  onClick,
  disabled = false
}) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        'option-card relative',
        isSelected ? 'selected' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="text-2xl">{icon}</div>
        )}
        <div className="flex-1">
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full"></div>
        )}
      </div>
    </motion.div>
  );
};

export default CakeOption;