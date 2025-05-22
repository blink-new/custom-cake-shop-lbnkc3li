import React, { useEffect } from 'react';
import { useCake } from '../../lib/cake-context';
import { calculateTotalPrice } from '../../lib/cake-data';

const DetailsStep: React.FC = () => {
  const { cake, setName, setPrice } = useCake();
  
  // Calculate suggested price based on ingredients
  const suggestedPrice = calculateTotalPrice(
    cake.base,
    cake.fillings,
    cake.frosting,
    cake.decorations
  );
  
  // Update price when ingredients change
  useEffect(() => {
    setPrice(suggestedPrice);
  }, [suggestedPrice, setPrice]);
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display">Name Your Masterpiece</h2>
        <p className="text-muted-foreground">Give your cake a name and set its price</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Cake Name
          </label>
          <input
            type="text"
            id="name"
            value={cake.name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. Chocolate Dream, Berry Delight..."
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium">
            Price ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2">$</span>
            <input
              type="number"
              id="price"
              value={cake.price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              min={0}
              step={0.5}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Suggested price: ${suggestedPrice.toFixed(2)} (based on ingredients)
          </p>
        </div>
        
        <div className="bg-muted p-4 rounded-md space-y-2">
          <h3 className="font-medium">Price Breakdown:</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between">
              <span>Base ({cake.base || 'None'})</span>
              <span>${cake.base ? calculateTotalPrice(cake.base, [], null, []).toFixed(2) : '0.00'}</span>
            </li>
            <li className="flex justify-between">
              <span>Fillings ({cake.fillings.length})</span>
              <span>${calculateTotalPrice(null, cake.fillings, null, []).toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Frosting ({cake.frosting || 'None'})</span>
              <span>${cake.frosting ? calculateTotalPrice(null, [], cake.frosting, []).toFixed(2) : '0.00'}</span>
            </li>
            <li className="flex justify-between">
              <span>Decorations ({cake.decorations.length})</span>
              <span>${calculateTotalPrice(null, [], null, cake.decorations).toFixed(2)}</span>
            </li>
            <li className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>${suggestedPrice.toFixed(2)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;