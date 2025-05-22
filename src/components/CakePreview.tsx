import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CakeBase, FillingFlavor, FrostingType, DecorationItem } from '../types/cake';

interface CakePreviewProps {
  base: CakeBase | null;
  fillings: FillingFlavor[];
  frosting: FrostingType | null;
  decorations: DecorationItem[];
}

export function CakePreview({ base, fillings, frosting, decorations }: CakePreviewProps) {
  const [animation, setAnimation] = useState(false);
  
  // Trigger animation when cake parts change
  useEffect(() => {
    setAnimation(true);
    const timer = setTimeout(() => setAnimation(false), 300);
    return () => clearTimeout(timer);
  }, [base, fillings.length, frosting, decorations.length]);
  
  // Calculate cake layer heights
  const calculateLayerHeight = (index: number, total: number) => {
    // Base layer is always the tallest
    if (index === 0) return '50%';
    
    // Split remaining 50% among filling and frosting layers
    return `${50 / total}%`;
  };
  
  // Get color for each cake component
  const getCakeBaseColor = (base: CakeBase | null) => {
    switch (base) {
      case 'vanilla': return 'bg-cake-vanilla';
      case 'chocolate': return 'bg-cake-chocolate';
      case 'redVelvet': return 'bg-cake-redVelvet';
      case 'lemon': return 'bg-cake-lemon';
      case 'marble': return 'bg-cake-marble';
      default: return 'bg-gray-200';
    }
  };
  
  const getFillingColor = (filling: FillingFlavor) => {
    switch (filling) {
      case 'buttercream': return 'bg-filling-buttercream';
      case 'chocolate': return 'bg-filling-chocolate';
      case 'fruit': return 'bg-filling-fruit';
      case 'cream': return 'bg-filling-cream';
      case 'custard': return 'bg-filling-custard';
      default: return 'bg-gray-300';
    }
  };
  
  const getFrostingColor = (frosting: FrostingType | null) => {
    switch (frosting) {
      case 'buttercream': return 'bg-frosting-buttercream';
      case 'fondant': return 'bg-frosting-fondant';
      case 'whipped': return 'bg-frosting-whipped';
      case 'cream': return 'bg-frosting-cream';
      default: return 'bg-gray-100';
    }
  };
  
  // Placeholder for empty cake
  if (!base && fillings.length === 0 && !frosting) {
    return (
      <div className="cake-container flex items-center justify-center border-2 border-dashed border-gray-300">
        <p className="text-gray-400 text-center p-8">
          Your cake will appear here as you make selections
        </p>
      </div>
    );
  }
  
  // Calculate how many layers we have for positioning
  const totalLayers = 2 + fillings.length; // Base + Fillings + Frosting
  
  return (
    <div className="cake-container relative">
      {/* Cake base layer */}
      {base && (
        <motion.div
          className={`cake-layer bottom-0 h-[50%] w-full rounded-t-xl ${getCakeBaseColor(base)}`}
          initial={{ scale: animation ? 0.95 : 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Filling layers */}
      {fillings.map((filling, index) => {
        const top = base ? '50%' : '80%';
        const height = calculateLayerHeight(index + 1, totalLayers - 1);
        
        return (
          <motion.div
            key={`filling-${filling}-${index}`}
            className={`cake-layer ${getFillingColor(filling)}`}
            style={{ 
              top: `calc(${top} - (${height} * ${index + 1}))`,
              height: height,
              zIndex: index + 1
            }}
            initial={{ scale: animation ? 0.95 : 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 * (index + 1) }}
          />
        );
      })}
      
      {/* Frosting layer */}
      {frosting && (
        <motion.div
          className={`cake-layer top-0 h-[30%] w-full ${getFrostingColor(frosting)} rounded-t-full`}
          style={{ 
            zIndex: fillings.length + 1
          }}
          initial={{ scale: animation ? 0.95 : 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 * totalLayers }}
        />
      )}
      
      {/* Decorations */}
      {decorations.map((decoration, index) => {
        // Position decorations around the top of the cake
        const angle = (360 / decorations.length) * index;
        const radius = 35; // % from center
        const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 15 + radius * Math.sin((angle * Math.PI) / 180);
        
        // Get decoration emoji
        let emoji = '✨';
        switch (decoration) {
          case 'sprinkles': emoji = '🧁'; break;
          case 'fruit': emoji = '🍓'; break;
          case 'chocolate': emoji = '🍫'; break;
          case 'flowers': emoji = '🌸'; break;
          case 'fondant': emoji = '🎀'; break;
        }
        
        return (
          <motion.div
            key={`decoration-${decoration}-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${x}%`, 
              top: `${y}%`,
              zIndex: totalLayers + 1
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <span className="text-2xl">{emoji}</span>
          </motion.div>
        );
      })}
    </div>
  );
}