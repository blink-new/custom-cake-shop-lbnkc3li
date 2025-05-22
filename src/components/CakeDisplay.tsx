import { useState, useEffect } from 'react';
import { useCake } from '../context/CakeContext';
import { motion } from 'framer-motion';

const CakeDisplay = () => {
  const { cake } = useCake();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Animation variants
  const plateVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const cakeBaseVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.3 }
    }
  };

  const fillingVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (custom: number) => ({
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.5 + (custom * 0.1) }
    })
  };

  const frostingVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1, 
      transition: { duration: 0.4, delay: 0.8 }
    }
  };

  const decorationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: 1 + (custom * 0.1) 
      }
    })
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      <div className="relative h-80 w-full max-w-xs flex items-center justify-center">
        {/* Plate */}
        <motion.div 
          className="absolute bottom-0 w-48 h-4 bg-gray-100 rounded-full shadow-xl"
          variants={plateVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
        />
        
        {cake.base && (
          <div className="relative flex flex-col items-center">
            {/* Cake Base */}
            <motion.div 
              className="w-40 h-32 rounded-lg rounded-t-3xl shadow-md"
              style={{ backgroundColor: cake.base.color }}
              variants={cakeBaseVariants}
              initial="hidden"
              animate={loaded ? "visible" : "hidden"}
            />
            
            {/* Fillings */}
            <div className="absolute top-6 w-full flex flex-col items-center">
              {cake.fillings.map((filling, index) => (
                <motion.div 
                  key={filling.id}
                  className="w-36 h-4 my-0.5 rounded-sm"
                  style={{ backgroundColor: filling.color }}
                  variants={fillingVariants}
                  custom={index}
                  initial="hidden"
                  animate={loaded ? "visible" : "hidden"}
                />
              ))}
            </div>
            
            {/* Frosting */}
            {cake.frosting && (
              <motion.div 
                className="absolute top-0 w-40 h-10 rounded-t-3xl"
                style={{ backgroundColor: cake.frosting.color }}
                variants={frostingVariants}
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
              />
            )}
            
            {/* Decorations */}
            <div className="absolute top-0 w-full flex justify-center">
              {cake.decorations.map((decoration, index) => (
                <motion.div 
                  key={decoration.id}
                  className="text-2xl mx-1 absolute"
                  style={{ 
                    top: `${Math.sin(index) * 5 - 8}px`, 
                    left: `${Math.cos(index) * 10 + 40 + (index * 15)}px` 
                  }}
                  variants={decorationVariants}
                  custom={index}
                  initial="hidden"
                  animate={loaded ? "visible" : "hidden"}
                >
                  {decoration.image}
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Placeholder when no cake base is selected */}
        {!cake.base && (
          <motion.div 
            className="text-center p-4 rounded-lg bg-muted/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-4xl mb-2">🍰</div>
            <p className="text-muted-foreground">Select ingredients to build your cake!</p>
          </motion.div>
        )}
      </div>
      
      {/* Cake name and price display */}
      {cake.name && (
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-1">{cake.name}</h2>
          {cake.price > 0 && (
            <p className="text-primary font-medium">${cake.price.toFixed(2)}</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CakeDisplay;