export type CakeBase = {
  id: string;
  name: string;
  description: string;
  color: string;
  unlocked: boolean;
};

export type FillingFlavor = {
  id: string;
  name: string;
  description: string;
  color: string;
  unlocked: boolean;
};

export type FrostingType = {
  id: string;
  name: string;
  description: string;
  color: string;
  unlocked: boolean;
};

export type Decoration = {
  id: string;
  name: string;
  description: string;
  image: string;
  unlocked: boolean;
};

export type Customer = {
  id: string;
  name: string;
  avatar: string;
  preferences: string[];
  feedback: string[];
};

export type CakeCreation = {
  base: CakeBase | null;
  fillings: FillingFlavor[];
  frosting: FrostingType | null;
  decorations: Decoration[];
  name: string;
  price: number;
  customerFeedback: string[];
};

export type BuilderStep = 'base' | 'filling' | 'frosting' | 'decoration' | 'finish';

export type UnlockRequirement = {
  cakesSold: number;
  specificIngredients?: string[];
  highRatings?: number;
};

export type UnlockableIngredient = CakeBase | FillingFlavor | FrostingType | Decoration;