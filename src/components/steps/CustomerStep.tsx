import React from 'react';
import { motion } from 'framer-motion';
import { useCake } from '../../lib/cake-context';
import { 
  getBaseName, 
  getFillingName, 
  getFrostingName, 
  getDecorationName 
} from '../../lib/cake-data';

const CustomerStep: React.FC = () => {
  const { cake, activeCustomer, feedback, serveCake } = useCake();
  
  if (!activeCustomer) {
    return <div>Loading customer...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display">Serve Your Creation</h2>
        <p className="text-muted-foreground">
          {feedback ? 'Customer Feedback' : 'Let\'s see what the customer thinks!'}
        </p>
      </div>
      
      <div className="bg-card p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
            {activeCustomer.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium text-lg">{activeCustomer.name}</h3>
            <p className="text-sm text-muted-foreground">Today's Customer</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <h4 className="font-medium">Preferences:</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Sweetness</p>
              <div className="h-2 bg-muted rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${activeCustomer.preferences.sweetness * 10}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Fruitiness</p>
              <div className="h-2 bg-muted rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${activeCustomer.preferences.fruitiness * 10}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Richness</p>
              <div className="h-2 bg-muted rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${activeCustomer.preferences.richness * 10}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Creativity</p>
              <div className="h-2 bg-muted rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${activeCustomer.preferences.creativity * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-md mb-6">
          <h4 className="font-medium mb-2">Your Cake:</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground">Base:</span>
              <span>{getBaseName(cake.base)}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground">Fillings:</span>
              <span>
                {cake.fillings.length > 0
                  ? cake.fillings.map(filling => getFillingName(filling)).join(', ')
                  : 'None'}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground">Frosting:</span>
              <span>{getFrostingName(cake.frosting)}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground">Decorations:</span>
              <span>
                {cake.decorations.length > 0
                  ? cake.decorations.map(decoration => getDecorationName(decoration)).join(', ')
                  : 'None'}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground">Price:</span>
              <span>${cake.price.toFixed(2)}</span>
            </li>
          </ul>
        </div>
        
        {feedback ? (
          <motion.div 
            className="bg-primary/10 p-4 rounded-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="italic">"{feedback}"</p>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium"
            onClick={serveCake}
          >
            Serve Cake to {activeCustomer.name}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default CustomerStep;