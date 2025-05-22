import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  CakeBase, 
  FillingFlavor, 
  FrostingType, 
  DecorationItem, 
  CakeCreation,
  PlayerProfile 
} from '../types/cake';

// Cake store type
type CakeStore = {
  // Current cake being created
  currentCake: {
    base: CakeBase | null;
    fillings: FillingFlavor[];
    frosting: FrostingType | null;
    decorations: DecorationItem[];
    name: string;
    price: number;
  };
  // Player profile with progress
  player: PlayerProfile;
  // History of created cakes
  cakeHistory: CakeCreation[];
  // Customer feedback messages
  customerFeedback: string[];
  
  // Actions
  setBase: (base: CakeBase) => void;
  addFilling: (filling: FillingFlavor) => void;
  removeFilling: (filling: FillingFlavor) => void;
  setFrosting: (frosting: FrostingType) => void;
  addDecoration: (decoration: DecorationItem) => void;
  removeDecoration: (decoration: DecorationItem) => void;
  setCakeName: (name: string) => void;
  setCakePrice: (price: number) => void;
  resetCake: () => void;
  finishCake: () => void;
  addFeedback: (feedback: string) => void;
  clearFeedback: () => void;
  unlockIngredient: (type: 'base' | 'filling' | 'frosting' | 'decoration', name: string) => void;
  addExperience: (amount: number) => void;
  addCoins: (amount: number) => void;
};

// Initial player profile
const initialPlayerProfile: PlayerProfile = {
  level: 1,
  experience: 0,
  coins: 100,
  completedCakes: 0,
  unlocked: {
    bases: ['vanilla', 'chocolate'],
    fillings: ['buttercream', 'chocolate'],
    frostings: ['buttercream', 'whipped'],
    decorations: ['sprinkles', 'chocolate']
  }
};

// Initial cake state
const initialCakeState = {
  base: null,
  fillings: [],
  frosting: null,
  decorations: [],
  name: '',
  price: 0
};

// Calculate required XP for each level
const calculateRequiredXP = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Create the cake store
export const useCakeStore = create<CakeStore>()(
  persist(
    (set) => ({
      currentCake: { ...initialCakeState },
      player: { ...initialPlayerProfile },
      cakeHistory: [],
      customerFeedback: [],

      // Set the cake base
      setBase: (base) => set((state) => ({
        currentCake: { ...state.currentCake, base }
      })),

      // Add a filling if less than 3
      addFilling: (filling) => set((state) => {
        if (state.currentCake.fillings.length >= 3) return state;
        if (state.currentCake.fillings.includes(filling)) return state;
        
        return {
          currentCake: {
            ...state.currentCake,
            fillings: [...state.currentCake.fillings, filling]
          }
        };
      }),

      // Remove a filling
      removeFilling: (filling) => set((state) => ({
        currentCake: {
          ...state.currentCake,
          fillings: state.currentCake.fillings.filter(f => f !== filling)
        }
      })),

      // Set the frosting
      setFrosting: (frosting) => set((state) => ({
        currentCake: { ...state.currentCake, frosting }
      })),

      // Add a decoration
      addDecoration: (decoration) => set((state) => {
        if (state.currentCake.decorations.includes(decoration)) return state;
        
        return {
          currentCake: {
            ...state.currentCake,
            decorations: [...state.currentCake.decorations, decoration]
          }
        };
      }),

      // Remove a decoration
      removeDecoration: (decoration) => set((state) => ({
        currentCake: {
          ...state.currentCake,
          decorations: state.currentCake.decorations.filter(d => d !== decoration)
        }
      })),

      // Set cake name
      setCakeName: (name) => set((state) => ({
        currentCake: { ...state.currentCake, name }
      })),

      // Set cake price
      setCakePrice: (price) => set((state) => ({
        currentCake: { ...state.currentCake, price }
      })),

      // Reset cake to initial state
      resetCake: () => set(() => ({
        currentCake: { ...initialCakeState }
      })),

      // Finish and save the cake
      finishCake: () => set((state) => {
        const { currentCake, player, cakeHistory } = state;
        
        // Check if cake is valid
        if (!currentCake.base || !currentCake.frosting || currentCake.fillings.length === 0) {
          return state;
        }

        // Create new cake entry
        const newCake: CakeCreation = {
          id: `cake-${Date.now()}`,
          name: currentCake.name || `Mystery Cake #${cakeHistory.length + 1}`,
          base: currentCake.base,
          fillings: [...currentCake.fillings],
          frosting: currentCake.frosting,
          decorations: [...currentCake.decorations],
          price: currentCake.price || 10,
          feedback: [],
          createdAt: new Date()
        };

        // Calculate experience gained
        const expGained = 20 + 
          (currentCake.fillings.length * 5) + 
          (currentCake.decorations.length * 3);
        
        // Calculate coins earned
        const coinsEarned = currentCake.price || 10;
        
        // Update player stats
        const updatedPlayer = { ...player };
        updatedPlayer.experience += expGained;
        updatedPlayer.coins += coinsEarned;
        updatedPlayer.completedCakes += 1;
        
        // Check for level up
        let expRequired = calculateRequiredXP(updatedPlayer.level);
        while (updatedPlayer.experience >= expRequired) {
          updatedPlayer.level += 1;
          expRequired = calculateRequiredXP(updatedPlayer.level);
        }

        return {
          currentCake: { ...initialCakeState },
          player: updatedPlayer,
          cakeHistory: [newCake, ...cakeHistory],
          customerFeedback: [
            `Customer enjoys your ${newCake.name}! You earned ${coinsEarned} coins and ${expGained} XP.`
          ]
        };
      }),

      // Add customer feedback
      addFeedback: (feedback) => set((state) => ({
        customerFeedback: [feedback, ...state.customerFeedback]
      })),

      // Clear all feedback
      clearFeedback: () => set({ customerFeedback: [] }),

      // Unlock a new ingredient
      unlockIngredient: (type, name) => set((state) => {
        const updatedPlayer = { ...state.player };
        
        switch (type) {
          case 'base':
            if (!updatedPlayer.unlocked.bases.includes(name as CakeBase)) {
              updatedPlayer.unlocked.bases.push(name as CakeBase);
            }
            break;
          case 'filling':
            if (!updatedPlayer.unlocked.fillings.includes(name as FillingFlavor)) {
              updatedPlayer.unlocked.fillings.push(name as FillingFlavor);
            }
            break;
          case 'frosting':
            if (!updatedPlayer.unlocked.frostings.includes(name as FrostingType)) {
              updatedPlayer.unlocked.frostings.push(name as FrostingType);
            }
            break;
          case 'decoration':
            if (!updatedPlayer.unlocked.decorations.includes(name as DecorationItem)) {
              updatedPlayer.unlocked.decorations.push(name as DecorationItem);
            }
            break;
        }
        
        return { player: updatedPlayer };
      }),

      // Add experience points
      addExperience: (amount) => set((state) => {
        const updatedPlayer = { ...state.player };
        updatedPlayer.experience += amount;
        
        // Check for level up
        let expRequired = calculateRequiredXP(updatedPlayer.level);
        while (updatedPlayer.experience >= expRequired) {
          updatedPlayer.level += 1;
          expRequired = calculateRequiredXP(updatedPlayer.level);
        }
        
        return { player: updatedPlayer };
      }),

      // Add coins
      addCoins: (amount) => set((state) => {
        const updatedPlayer = { ...state.player };
        updatedPlayer.coins += amount;
        return { player: updatedPlayer };
      })
    }),
    {
      name: 'cake-shop-storage'
    }
  )
);