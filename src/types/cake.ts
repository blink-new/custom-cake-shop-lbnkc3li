// Types for the cake base options
export type CakeBase = 'vanilla' | 'chocolate' | 'redVelvet' | 'lemon' | 'marble';

// Types for the filling options
export type FillingFlavor = 'buttercream' | 'chocolate' | 'fruit' | 'cream' | 'custard';

// Types for the frosting options
export type FrostingType = 'buttercream' | 'fondant' | 'whipped' | 'cream';

// Types for decoration options
export type DecorationItem = 'sprinkles' | 'fruit' | 'chocolate' | 'flowers' | 'fondant';

// Customer feedback type
export type CustomerFeedback = {
  rating: number; // 1-5 stars
  comment: string;
  taste: number;
  appearance: number;
  price: number;
};

// Cake creation type
export type CakeCreation = {
  id: string;
  name: string;
  base: CakeBase;
  fillings: FillingFlavor[];
  frosting: FrostingType;
  decorations: DecorationItem[];
  price: number;
  feedback: CustomerFeedback[];
  createdAt: Date;
};

// Unlockable ingredients
export type UnlockableIngredient = {
  type: 'base' | 'filling' | 'frosting' | 'decoration';
  name: string;
  unlocked: boolean;
  requiredLevel: number;
};

// Player profile
export type PlayerProfile = {
  level: number;
  experience: number;
  coins: number;
  completedCakes: number;
  unlocked: {
    bases: CakeBase[];
    fillings: FillingFlavor[];
    frostings: FrostingType[];
    decorations: DecorationItem[];
  };
};