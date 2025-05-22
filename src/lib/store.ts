import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CakeBase, CakeFilling, CakeFrosting, CakeDecoration, CakeCreation, Customer, UnlockedIngredient } from './types';
import { baseOptions, fillingOptions, frostingOptions, decorationOptions, customers } from './data';

interface CakeState {
  // Current cake being built
  currentCake: {
    base: CakeBase | null;
    fillings: CakeFilling[];
    frosting: CakeFrosting | null;
    decorations: CakeDecoration[];
    name: string;
    price: number;
  };
  // Saved cakes
  creations: CakeCreation[];
  // Game state
  experience: number;
  level: number;
  customers: Customer[];
  unlockedIngredients: UnlockedIngredient[];
  completedSales: number;
  
  // Actions
  setBase: (base: CakeBase) => void;
  addFilling: (filling: CakeFilling) => void;
  removeFilling: (filling: CakeFilling) => void;
  setFrosting: (frosting: CakeFrosting) => void;
  addDecoration: (decoration: CakeDecoration) => void;
  removeDecoration: (decoration: CakeDecoration) => void;
  setName: (name: string) => void;
  saveCreation: () => void;
  resetCurrentCake: () => void;
  calculatePrice: () => void;
  serveCakeToCustomer: (customerId: string, cakeId: string) => { feedback: string, rating: number, experience: number };
  addUnlockedIngredient: (ingredient: UnlockedIngredient) => void;
}

export const useCakeStore = create<CakeState>()(
  persist(
    (set) => ({
      currentCake: {
        base: null,
        fillings: [],
        frosting: null,
        decorations: [],
        name: '',
        price: 0,
      },
      creations: [],
      experience: 0,
      level: 1,
      customers: [...customers],
      unlockedIngredients: [],
      completedSales: 0,

      setBase: (base: CakeBase) => set((state) => {
        const newState = {
          ...state,
          currentCake: {
            ...state.currentCake,
            base,
          }
        };
        
        // Calculate new price
        let price = baseOptions[base].priceModifier;
        
        // Add fillings price
        state.currentCake.fillings.forEach(filling => {
          price += fillingOptions[filling].priceModifier;
        });
        
        // Add frosting price
        if (state.currentCake.frosting) {
          price += frostingOptions[state.currentCake.frosting].priceModifier;
        }
        
        // Add decorations price
        state.currentCake.decorations.forEach(decoration => {
          price += decorationOptions[decoration].priceModifier;
        });
        
        return {
          ...state,
          currentCake: {
            ...state.currentCake,
            base,
            price
          }
        };
      }),

      addFilling: (filling: CakeFilling) => set((state) => {
        if (state.currentCake.fillings.includes(filling) || state.currentCake.fillings.length >= 3) {
          return state;
        }
        
        const newFillings = [...state.currentCake.fillings, filling];
        
        // Calculate new price
        let price = 0;
        
        // Add base price
        if (state.currentCake.base) {
          price += baseOptions[state.currentCake.base].priceModifier;
        }
        
        // Add fillings price
        newFillings.forEach(f => {
          price += fillingOptions[f].priceModifier;
        });
        
        // Add frosting price
        if (state.currentCake.frosting) {
          price += frostingOptions[state.currentCake.frosting].priceModifier;
        }
        
        // Add decorations price
        state.currentCake.decorations.forEach(decoration => {
          price += decorationOptions[decoration].priceModifier;
        });
        
        return {
          ...state,
          currentCake: {
            ...state.currentCake,
            fillings: newFillings,
            price
          }
        };
      }),

      removeFilling: (filling: CakeFilling) => set((state) => {
        const newFillings = state.currentCake.fillings.filter(f => f !== filling);
        
        // Calculate new price
        let price = 0;
        
        // Add base price
        if (state.currentCake.base) {
          price += baseOptions[state.currentCake.base].priceModifier;
        }
        
        // Add fillings price
        newFillings.forEach(f => {
          price += fillingOptions[f].priceModifier;
        });
        
        // Add frosting price
        if (state.currentCake.frosting) {
          price += frostingOptions[state.currentCake.frosting].priceModifier;
        }
        
        // Add decorations price
        state.currentCake.decorations.forEach(decoration => {
          price += decorationOptions[decoration].priceModifier;
        });
        
        return {
          ...state,
          currentCake: {
            ...state.currentCake,
            fillings: newFillings,
            price
          }
        };
      }),

      setFrosting: (frosting: CakeFrosting) => set((state) => {
        // Calculate new price
        let price = 0;
        
        // Add base price
        if (state.currentCake.base) {
          price += baseOptions[state.currentCake.base].priceModifier;
        }
        
        // Add fillings price
        state.currentCake.fillings.forEach(f => {
          price += fillingOptions[f].priceModifier;
        });
        
        // Add frosting price
        price += frostingOptions[frosting].priceModifier;
        
        // Add decorations price
        state.currentCake.decorations.forEach(decoration => {
          price += decorationOptions[decoration].priceModifier;
        });
        
        return {
          ...state,
          currentCake: {
            ...state.currentCake,
            frosting,
            price
          }
        };
      }),

      addDecoration: (decoration: CakeDecoration) => set((state) => {
        if (state.currentCake.decorations.includes(decoration)) {
          return state;
        }
        
        const newDecorations = [...state.currentCake.decorations, decoration];
        
        // Calculate new price
        let price = 0;
        
        // Add base price
        if (state.currentCake.base) {
          price += baseOptions[state.currentCake.base].priceModifier;
        }
        
        // Add fillings price
        state.currentCake.fillings.forEach(f => {
          price += fillingOptions[f].priceModifier;
        });
        
        // Add frosting price
        if (state.currentCake.frosting) {
          price += frostingOptions[state.currentCake.frosting].priceModifier;
        }
        
        // Add decorations price
        newDecorations.forEach(d => {
          price += decorationOptions[d].priceModifier;
        });
        
        return {
          ...state,
          currentCake: {
            ...state.currentCake,
            decorations: newDecorations,
            price
          }
        };
      }),

      removeDecoration: (decoration: CakeDecoration) => set((state) => {
        const newDecorations = state.currentCake.decorations.filter(d => d !== decoration);
        
        // Calculate new price
        let price = 0;
        
        // Add base price
        if (state.currentCake.base) {
          price += baseOptions[state.currentCake.base].priceModifier;
        }
        
        // Add fillings price
        state.currentCake.fillings.forEach(f => {
          price += fillingOptions[f].priceModifier;
        });
        
        // Add frosting price
        if (state.currentCake.frosting) {
          price += frostingOptions[state.currentCake.frosting].priceModifier;
        }
        
        // Add decorations price
        newDecorations.forEach(d => {
          price += decorationOptions[d].priceModifier;
        });
        
        return {
          ...state,
          currentCake: {
            ...state.currentCake,
            decorations: newDecorations,
            price
          }
        };
      }),

      setName: (name: string) => set((state) => ({
        ...state,
        currentCake: {
          ...state.currentCake,
          name,
        }
      })),

      calculatePrice: () => set((state) => {
        let price = 0;
        
        // Base price
        if (state.currentCake.base) {
          price += baseOptions[state.currentCake.base].priceModifier;
        }
        
        // Fillings price
        state.currentCake.fillings.forEach(filling => {
          price += fillingOptions[filling].priceModifier;
        });
        
        // Frosting price
        if (state.currentCake.frosting) {
          price += frostingOptions[state.currentCake.frosting].priceModifier;
        }
        
        // Decorations price
        state.currentCake.decorations.forEach(decoration => {
          price += decorationOptions[decoration].priceModifier;
        });
        
        return {
          ...state,
          currentCake: {
            ...state.currentCake,
            price,
          }
        };
      }),

      saveCreation: () => set((state) => {
        const { base, fillings, frosting, decorations, name, price } = state.currentCake;
        
        if (!base || !frosting || name.trim() === '') {
          return state;
        }
        
        const newCake: CakeCreation = {
          base,
          fillings,
          frosting,
          decorations,
          name,
          price,
          id: Date.now().toString(),
        };
        
        return {
          ...state,
          creations: [...state.creations, newCake],
        };
      }),

      resetCurrentCake: () => set((state) => ({
        ...state,
        currentCake: {
          base: null,
          fillings: [],
          frosting: null,
          decorations: [],
          name: '',
          price: 0,
        }
      })),

      serveCakeToCustomer: (customerId: string, cakeId: string) => {
        let feedback = "";
        let rating = 0;
        let experience = 0;
        
        set((state) => {
          const customer = state.customers.find(c => c.id === customerId);
          const cake = state.creations.find(c => c.id === cakeId);
          
          if (!customer || !cake) {
            return state;
          }
          
          // Calculate how well the cake matches customer preferences
          let satisfactionPoints = 0;
          const maxPoints = customer.preferences.length;
          
          // Check if base matches preference
          if (customer.preferences.includes(cake.base)) {
            satisfactionPoints += 1;
          }
          
          // Check if fillings match preferences
          cake.fillings.forEach(filling => {
            if (customer.preferences.includes(filling)) {
              satisfactionPoints += 1;
            }
          });
          
          // Check if frosting matches preference
          if (customer.preferences.includes(cake.frosting)) {
            satisfactionPoints += 1;
          }
          
          // Check if decorations match preferences
          cake.decorations.forEach(decoration => {
            if (customer.preferences.includes(decoration)) {
              satisfactionPoints += 1;
            }
          });
          
          // Calculate rating (1-5 stars)
          rating = Math.max(1, Math.min(5, Math.ceil((satisfactionPoints / maxPoints) * 5)));
          
          // Calculate experience gained
          experience = rating * 5;
          
          // Generate feedback message
          if (rating >= 4) {
            feedback = "The customer loved your cake! They especially enjoyed the ";
            if (customer.preferences.includes(cake.base)) {
              feedback += cake.base + " base";
            } else if (cake.fillings.some(f => customer.preferences.includes(f))) {
              feedback += cake.fillings.find(f => customer.preferences.includes(f)) + " filling";
            } else if (customer.preferences.includes(cake.frosting)) {
              feedback += cake.frosting + " frosting";
            } else {
              feedback += "overall presentation";
            }
            feedback += ".";
          } else if (rating >= 2) {
            feedback = "The customer thought the cake was okay, but would have preferred ";
            if (!customer.preferences.includes(cake.base)) {
              feedback += "a different base flavor.";
            } else if (!cake.fillings.some(f => customer.preferences.includes(f))) {
              feedback += "different fillings.";
            } else if (!customer.preferences.includes(cake.frosting)) {
              feedback += "a different frosting.";
            } else {
              feedback += "different decorations.";
            }
          } else {
            feedback = "The customer didn't really enjoy the cake. Next time, try ";
            feedback += customer.preferences[0] + " base with " + customer.preferences[1] + " filling.";
          }
          
          // Update customer satisfaction
          const updatedCustomers = state.customers.map(c => {
            if (c.id === customerId) {
              return { ...c, satisfaction: rating };
            }
            return c;
          });
          
          // Update experience and check level up
          const newExperience = state.experience + experience;
          const newLevel = Math.floor(newExperience / 50) + 1;
          const completedSales = state.completedSales + 1;
          
          return {
            ...state,
            customers: updatedCustomers,
            experience: newExperience,
            level: newLevel,
            completedSales
          };
        });
        
        return { feedback, rating, experience };
      },

      addUnlockedIngredient: (ingredient: UnlockedIngredient) => set((state) => ({
        ...state,
        unlockedIngredients: [...state.unlockedIngredients, ingredient]
      })),
    }),
    {
      name: 'cake-shop-storage',
    }
  )
);