import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CakeBase = 'vanilla' | 'chocolate' | 'redVelvet' | 'lemon' | 'marble';
export type FillingFlavor = 'buttercream' | 'chocolateGanache' | 'fruitPreserves' | 'creamCheese' | 'custard';
export type FrostingType = 'buttercream' | 'fondant' | 'whippedCream' | 'creamCheese';
export type Decoration = 'sprinkles' | 'freshFruit' | 'chocolateShavings' | 'edibleFlowers' | 'fondantShapes';

export interface Cake {
  base: CakeBase | null;
  fillings: FillingFlavor[];
  frosting: FrostingType | null;
  decorations: Decoration[];
  name: string;
  price: number;
}

export interface Customer {
  id: number;
  name: string;
  preferences: {
    sweetness: number; // 1-10
    fruitiness: number; // 1-10
    richness: number; // 1-10
    creativity: number; // 1-10
  };
  reactions: {
    [key: string]: string;
  };
}

interface CakeContextType {
  cake: Cake;
  customers: Customer[];
  activeCustomer: Customer | null;
  step: number;
  feedback: string | null;
  unlockedIngredients: {
    bases: CakeBase[];
    fillings: FillingFlavor[];
    frostings: FrostingType[];
    decorations: Decoration[];
  };
  experience: number;
  setBase: (base: CakeBase) => void;
  addFilling: (filling: FillingFlavor) => void;
  removeFilling: (filling: FillingFlavor) => void;
  setFrosting: (frosting: FrostingType) => void;
  addDecoration: (decoration: Decoration) => void;
  removeDecoration: (decoration: Decoration) => void;
  setName: (name: string) => void;
  setPrice: (price: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetCake: () => void;
  serveCake: () => void;
}

const defaultCustomers: Customer[] = [
  {
    id: 1,
    name: "Emily",
    preferences: {
      sweetness: 7,
      fruitiness: 8,
      richness: 4,
      creativity: 6
    },
    reactions: {
      love: "This is absolutely divine! The flavors are perfect together!",
      like: "Mmm, this is quite tasty! I'm enjoying it.",
      neutral: "It's alright, not bad but not amazing either.",
      dislike: "Hmm, I don't think these flavors work well together."
    }
  },
  {
    id: 2,
    name: "James",
    preferences: {
      sweetness: 4,
      fruitiness: 3,
      richness: 9,
      creativity: 5
    },
    reactions: {
      love: "Wow! This is a masterpiece of flavor! Rich and delicious!",
      like: "Very nice! I'm enjoying the richness of this cake.",
      neutral: "It's decent, but could use more depth of flavor.",
      dislike: "Too sweet for my taste. I prefer something richer."
    }
  },
  {
    id: 3,
    name: "Sophia",
    preferences: {
      sweetness: 6,
      fruitiness: 9,
      richness: 5,
      creativity: 8
    },
    reactions: {
      love: "The fruit flavors in this are incredible! So refreshing!",
      like: "I'm really enjoying the fruity notes in this cake!",
      neutral: "It's fine, but I was hoping for more fruit flavor.",
      dislike: "I don't taste much fruitiness here. That's disappointing."
    }
  }
];

// Initial state
const initialCake: Cake = {
  base: null,
  fillings: [],
  frosting: null,
  decorations: [],
  name: '',
  price: 0
};

const initialUnlockedIngredients = {
  bases: ['vanilla', 'chocolate'] as CakeBase[],
  fillings: ['buttercream', 'chocolateGanache', 'fruitPreserves'] as FillingFlavor[],
  frostings: ['buttercream', 'whippedCream'] as FrostingType[],
  decorations: ['sprinkles', 'freshFruit'] as Decoration[]
};

const CakeContext = createContext<CakeContextType | undefined>(undefined);

export const CakeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cake, setCake] = useState<Cake>(initialCake);
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [customers] = useState<Customer[]>(defaultCustomers);
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
  const [unlockedIngredients, setUnlockedIngredients] = useState(initialUnlockedIngredients);
  const [experience, setExperience] = useState(0);

  const setBase = (base: CakeBase) => {
    setCake(prev => ({ ...prev, base }));
  };

  const addFilling = (filling: FillingFlavor) => {
    if (cake.fillings.length < 3 && !cake.fillings.includes(filling)) {
      setCake(prev => ({
        ...prev,
        fillings: [...prev.fillings, filling]
      }));
    }
  };

  const removeFilling = (filling: FillingFlavor) => {
    setCake(prev => ({
      ...prev,
      fillings: prev.fillings.filter(f => f !== filling)
    }));
  };

  const setFrosting = (frosting: FrostingType) => {
    setCake(prev => ({ ...prev, frosting }));
  };

  const addDecoration = (decoration: Decoration) => {
    if (!cake.decorations.includes(decoration)) {
      setCake(prev => ({
        ...prev,
        decorations: [...prev.decorations, decoration]
      }));
    }
  };

  const removeDecoration = (decoration: Decoration) => {
    setCake(prev => ({
      ...prev,
      decorations: prev.decorations.filter(d => d !== decoration)
    }));
  };

  const setName = (name: string) => {
    setCake(prev => ({ ...prev, name }));
  };

  const setPrice = (price: number) => {
    setCake(prev => ({ ...prev, price }));
  };

  const nextStep = () => {
    // Only proceed if certain conditions are met
    if (
      (step === 1 && cake.base) ||
      (step === 2 && cake.fillings.length > 0) ||
      (step === 3 && cake.frosting) ||
      step === 4 || 
      step === 5
    ) {
      setStep(prev => Math.min(prev + 1, 6));
      
      // When reaching the customer step, randomly select a customer
      if (step === 5) {
        const randomIndex = Math.floor(Math.random() * customers.length);
        setActiveCustomer(customers[randomIndex]);
      }
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const resetCake = () => {
    setCake(initialCake);
    setStep(1);
    setFeedback(null);
    setActiveCustomer(null);
  };

  const serveCake = () => {
    if (!activeCustomer) return;
    
    // Calculate customer satisfaction
    let satisfaction = 0;
    
    // Base affects richness and sweetness
    if (cake.base === 'chocolate') satisfaction += activeCustomer.preferences.richness * 0.2;
    if (cake.base === 'vanilla') satisfaction += activeCustomer.preferences.sweetness * 0.15;
    if (cake.base === 'redVelvet') satisfaction += (activeCustomer.preferences.richness * 0.1) + (activeCustomer.preferences.sweetness * 0.1);
    if (cake.base === 'lemon') satisfaction += activeCustomer.preferences.fruitiness * 0.2;
    if (cake.base === 'marble') satisfaction += activeCustomer.preferences.creativity * 0.2;
    
    // Fillings affect all preferences
    cake.fillings.forEach(filling => {
      if (filling === 'buttercream') satisfaction += activeCustomer.preferences.sweetness * 0.1;
      if (filling === 'chocolateGanache') satisfaction += activeCustomer.preferences.richness * 0.15;
      if (filling === 'fruitPreserves') satisfaction += activeCustomer.preferences.fruitiness * 0.2;
      if (filling === 'creamCheese') satisfaction += (activeCustomer.preferences.richness * 0.1) + (activeCustomer.preferences.sweetness * 0.05);
      if (filling === 'custard') satisfaction += activeCustomer.preferences.creativity * 0.1;
    });
    
    // Frosting affects sweetness and richness
    if (cake.frosting === 'buttercream') satisfaction += activeCustomer.preferences.sweetness * 0.15;
    if (cake.frosting === 'fondant') satisfaction += activeCustomer.preferences.creativity * 0.2;
    if (cake.frosting === 'whippedCream') satisfaction += (activeCustomer.preferences.sweetness * 0.05) + (activeCustomer.preferences.creativity * 0.05);
    if (cake.frosting === 'creamCheese') satisfaction += (activeCustomer.preferences.richness * 0.1) + (activeCustomer.preferences.sweetness * 0.05);
    
    // Decorations affect creativity and some affect fruitiness
    cake.decorations.forEach(decoration => {
      if (decoration === 'sprinkles') satisfaction += activeCustomer.preferences.creativity * 0.05;
      if (decoration === 'freshFruit') satisfaction += activeCustomer.preferences.fruitiness * 0.15;
      if (decoration === 'chocolateShavings') satisfaction += activeCustomer.preferences.richness * 0.1;
      if (decoration === 'edibleFlowers') satisfaction += activeCustomer.preferences.creativity * 0.2;
      if (decoration === 'fondantShapes') satisfaction += activeCustomer.preferences.creativity * 0.15;
    });
    
    // Normalize satisfaction to 0-10 scale
    satisfaction = Math.min(Math.max(satisfaction, 0), 10);
    
    // Determine feedback
    let feedbackText: string;
    let expGain = 10; // Base experience
    
    if (satisfaction >= 8) {
      feedbackText = activeCustomer.reactions.love;
      expGain = 40;
      
      // Check if we should unlock a new ingredient
      if (experience + expGain >= 100 && !unlockedIngredients.bases.includes('redVelvet')) {
        setUnlockedIngredients(prev => ({
          ...prev,
          bases: [...prev.bases, 'redVelvet']
        }));
        feedbackText += " You've unlocked Red Velvet cake base!";
      } else if (experience + expGain >= 150 && !unlockedIngredients.fillings.includes('creamCheese')) {
        setUnlockedIngredients(prev => ({
          ...prev,
          fillings: [...prev.fillings, 'creamCheese']
        }));
        feedbackText += " You've unlocked Cream Cheese filling!";
      } else if (experience + expGain >= 200 && !unlockedIngredients.decorations.includes('chocolateShavings')) {
        setUnlockedIngredients(prev => ({
          ...prev,
          decorations: [...prev.decorations, 'chocolateShavings']
        }));
        feedbackText += " You've unlocked Chocolate Shavings decoration!";
      } else if (experience + expGain >= 250 && !unlockedIngredients.frostings.includes('fondant')) {
        setUnlockedIngredients(prev => ({
          ...prev,
          frostings: [...prev.frostings, 'fondant']
        }));
        feedbackText += " You've unlocked Fondant frosting!";
      } else if (experience + expGain >= 300 && !unlockedIngredients.bases.includes('lemon')) {
        setUnlockedIngredients(prev => ({
          ...prev,
          bases: [...prev.bases, 'lemon']
        }));
        feedbackText += " You've unlocked Lemon cake base!";
      } else if (experience + expGain >= 350 && !unlockedIngredients.fillings.includes('custard')) {
        setUnlockedIngredients(prev => ({
          ...prev,
          fillings: [...prev.fillings, 'custard']
        }));
        feedbackText += " You've unlocked Custard filling!";
      } else if (experience + expGain >= 400 && !unlockedIngredients.decorations.includes('edibleFlowers')) {
        setUnlockedIngredients(prev => ({
          ...prev,
          decorations: [...prev.decorations, 'edibleFlowers']
        }));
        feedbackText += " You've unlocked Edible Flowers decoration!";
      } else if (experience + expGain >= 450 && !unlockedIngredients.frostings.includes('creamCheese')) {
        setUnlockedIngredients(prev => ({
          ...prev,
          frostings: [...prev.frostings, 'creamCheese']
        }));
        feedbackText += " You've unlocked Cream Cheese frosting!";
      } else if (experience + expGain >= 500 && !unlockedIngredients.bases.includes('marble')) {
        setUnlockedIngredients(prev => ({
          ...prev,
          bases: [...prev.bases, 'marble']
        }));
        feedbackText += " You've unlocked Marble cake base!";
      } else if (experience + expGain >= 550 && !unlockedIngredients.decorations.includes('fondantShapes')) {
        setUnlockedIngredients(prev => ({
          ...prev,
          decorations: [...prev.decorations, 'fondantShapes']
        }));
        feedbackText += " You've unlocked Fondant Shapes decoration!";
      }
    } else if (satisfaction >= 6) {
      feedbackText = activeCustomer.reactions.like;
      expGain = 25;
    } else if (satisfaction >= 4) {
      feedbackText = activeCustomer.reactions.neutral;
      expGain = 15;
    } else {
      feedbackText = activeCustomer.reactions.dislike;
      expGain = 5;
    }
    
    // Update feedback and experience
    setFeedback(feedbackText);
    setExperience(prev => prev + expGain);
  };

  const value = {
    cake,
    customers,
    activeCustomer,
    step,
    feedback,
    unlockedIngredients,
    experience,
    setBase,
    addFilling,
    removeFilling,
    setFrosting,
    addDecoration,
    removeDecoration,
    setName,
    setPrice,
    nextStep,
    prevStep,
    resetCake,
    serveCake
  };

  return <CakeContext.Provider value={value}>{children}</CakeContext.Provider>;
};

export const useCake = () => {
  const context = useContext(CakeContext);
  if (context === undefined) {
    throw new Error('useCake must be used within a CakeProvider');
  }
  return context;
};