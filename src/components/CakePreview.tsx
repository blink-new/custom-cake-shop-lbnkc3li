import React from 'react';
import { motion } from 'framer-motion';
import { CakeBase, FillingFlavor, FrostingType, Decoration } from '../lib/cake-context';
import { 
  BASE_DETAILS, 
  FILLING_DETAILS, 
  FROSTING_DETAILS, 
  DECORATION_DETAILS 
} from '../lib/cake-data';

interface CakePreviewProps {
  base: CakeBase | null;
  fillings: FillingFlavor[];
  frosting: FrostingType | null;
  decorations: Decoration[];
}

const CakePreview: React.FC<CakePreviewProps> = ({ 
  base, 
  fillings, 
  frosting, 
  decorations 
}) => {
  return (
    <div className="cake-container">
      {/* Base Layer */}
      {base && (
        <motion.div 
          className="cake-layer"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          style={{ 
            width: '180px', 
            height: '60px', 
            backgroundColor: BASE_DETAILS[base].displayColor,
            zIndex: 1 
          }}
        />
      )}
      
      {/* Filling Layers */}
      {fillings.map((filling, index) => (
        <motion.div 
          key={filling}
          className="cake-layer"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5, delay: 0.1 * (index + 1) }}
          style={{ 
            width: '180px', 
            height: '15px', 
            bottom: `${60 + (index * 15)}px`,
            backgroundColor: FILLING_DETAILS[filling].displayColor,
            zIndex: 2 + index
          }}
        />
      ))}
      
      {/* Frosting */}
      {frosting && (
        <motion.div 
          className="frosting"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.7, delay: 0.3 }}
          style={{ 
            width: '200px', 
            height: '40px', 
            bottom: `${60 + (fillings.length * 15)}px`, 
            backgroundColor: FROSTING_DETAILS[frosting].displayColor,
            borderRadius: '100px 100px 0 0',
            zIndex: 10
          }}
        />
      )}
      
      {/* Decorations */}
      {decorations.map((decoration, index) => {
        const positions = [
          { top: '-45px', left: '30%' },
          { top: '-40px', left: '50%' },
          { top: '-45px', left: '70%' },
          { top: '-35px', left: '40%' },
          { top: '-35px', left: '60%' }
        ];
        
        return (
          <motion.div 
            key={decoration}
            className="cake-decoration"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              duration: 0.5, 
              delay: 0.5 + (0.1 * index),
              bounce: 0.6
            }}
            style={{ 
              ...positions[index % positions.length],
              zIndex: 20,
              fontSize: '1.75rem'
            }}
          >
            {DECORATION_DETAILS[decoration].icon}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CakePreview;