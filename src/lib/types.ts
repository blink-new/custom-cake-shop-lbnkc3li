export type CakeBase = 'vanilla' | 'chocolate' | 'red velvet' | 'lemon' | 'marble';

export type CakeFilling = 'buttercream' | 'chocolate ganache' | 'fruit preserves' | 'cream cheese' | 'custard';

export type CakeFrosting = 'buttercream' | 'fondant' | 'whipped cream' | 'cream cheese';

export type CakeDecoration = 'sprinkles' | 'fresh fruit' | 'chocolate shavings' | 'edible flowers' | 'fondant shapes';

export interface CakeCreation {
  base: CakeBase;
  fillings: CakeFilling[];
  frosting: CakeFrosting;
  decorations: CakeDecoration[];
  name: string;
  price: number;
  id: string;
}

export interface Customer {
  id: string;
  name: string;
  preferences: string[];
  satisfaction: number;
}

export interface FeedbackResponse {
  message: string;
  rating: number;
  tips: string[];
}

export interface UnlockedIngredient {
  type: 'base' | 'filling' | 'frosting' | 'decoration';
  name: string;
  description: string;
  unlockMessage: string;
}