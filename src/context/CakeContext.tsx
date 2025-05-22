import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  CakeCreation, 
  BuilderStep, 
  CakeBase, 
  FillingFlavor, 
  FrostingType, 
  Decoration,
  Customer
} from '../types';
import { cakeBases, fillingFlavors, frostingTypes, decorations, customers } from '../data/ingredients';
import { toast } from 'react-hot-toast';

interface CakeContextType {
  cake: CakeCreation;
  step: BuilderStep;
  progress: number;
  customers: Customer[];
  cakesSold: number;
  playerXP: number;
  availableBases: CakeBase[];
  availableFillings: FillingFlavor[];
  availableFrostings: FrostingType[];
  availableDecorations: Decoration[];
  setBase: (base: CakeBase) => void;
  addFilling: (filling: FillingFlavor) => void;
  removeFilling: (fillingId: string) => void;
  setFrosting: (frosting: FrostingType) => void;
  addDecoration: (decoration: Decoration) => void;
  removeDecoration: (decorationId: string) => void;
  setName: (name: string) => void;
  setPrice: (price: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: BuilderStep) => void;
  resetCake: () => void;
  serveCake: () => void;
  currentCustomer: Customer | null;
}

const defaultCake: CakeCreation = {
  base: null,
  fillings: [],
  frosting: null,
  decorations: [],
  name: '',
  price: 0,
  customerFeedback: [],
};

const CakeContext = createContext<CakeContextType | null>(null);

export const CakeProvider = ({ children }: { children: ReactNode }) => {
  const [cake, setCake] = useState<CakeCreation>({ ...defaultCake });
  const [step, setStep] = useState<BuilderStep>('base');
  const [cakesSold, setCakesSold] = useState<number>(0);
  const [playerXP, setPlayerXP] = useState<number>(0);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  
  // Progress calculation for the progress bar
  const stepValues: Record<BuilderStep, number> = {
    'base': 20,
    'filling': 40,
    'frosting': 60,
    'decoration': 80,
    'finish': 100,
  };
  
  const progress = stepValues[step];
  
  // Set cake base
  const setBase = (base: CakeBase) => {
    setCake(prev => ({ ...prev, base }));
    toast.success(`Selected ${base.name} cake base!`);
  };
  
  // Add filling (max 3)
  const addFilling = (filling: FillingFlavor) => {
    if (cake.fillings.length >= 3) {
      toast.error('You can only select up to 3 fillings!');
      return;
    }
    
    if (cake.fillings.some(f => f.id === filling.id)) {
      toast.error('This filling is already selected!');
      return;
    }
    
    setCake(prev => ({
      ...prev,
      fillings: [...prev.fillings, filling]
    }));
    toast.success(`Added ${filling.name} filling!`);
  };
  
  // Remove filling
  const removeFilling = (fillingId: string) => {
    setCake(prev => ({
      ...prev,
      fillings: prev.fillings.filter(f => f.id !== fillingId)
    }));
  };
  
  // Set frosting
  const setFrosting = (frosting: FrostingType) => {
    setCake(prev => ({ ...prev, frosting }));
    toast.success(`Selected ${frosting.name} frosting!`);
  };
  
  // Add decoration
  const addDecoration = (decoration: Decoration) => {
    if (cake.decorations.some(d => d.id === decoration.id)) {
      toast.error('This decoration is already selected!');
      return;
    }
    
    setCake(prev => ({
      ...prev,
      decorations: [...prev.decorations, decoration]
    }));
    toast.success(`Added ${decoration.name} decoration!`);
  };
  
  // Remove decoration
  const removeDecoration = (decorationId: string) => {
    setCake(prev => ({
      ...prev,
      decorations: prev.decorations.filter(d => d.id !== decorationId)
    }));
  };
  
  // Set cake name
  const setName = (name: string) => {
    setCake(prev => ({ ...prev, name }));
  };
  
  // Set cake price
  const setPrice = (price: number) => {
    setCake(prev => ({ ...prev, price }));
  };
  
  // Navigate to next step
  const nextStep = () => {
    if (step === 'base' && !cake.base) {
      toast.error('Please select a cake base first!');
      return;
    }
    
    if (step === 'filling' && cake.fillings.length === 0) {
      toast.error('Please select at least one filling!');
      return;
    }
    
    if (step === 'frosting' && !cake.frosting) {
      toast.error('Please select a frosting type!');
      return;
    }
    
    const steps: BuilderStep[] = ['base', 'filling', 'frosting', 'decoration', 'finish'];
    const currentIndex = steps.indexOf(step);
    
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };
  
  // Navigate to previous step
  const prevStep = () => {
    const steps: BuilderStep[] = ['base', 'filling', 'frosting', 'decoration', 'finish'];
    const currentIndex = steps.indexOf(step);
    
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };
  
  // Go to specific step
  const goToStep = (step: BuilderStep) => {
    setStep(step);
  };
  
  // Reset cake to default
  const resetCake = () => {
    setCake({ ...defaultCake });
    setStep('base');
    setCurrentCustomer(null);
  };
  
  // Generate customer feedback based on preferences
  const generateFeedback = (customer: Customer, cake: CakeCreation): string => {
    let score = 0;
    const maxScore = customer.preferences.length;
    const matches = [];
    
    // Check if cake base matches preference
    if (cake.base && customer.preferences.includes(cake.base.id)) {
      score++;
      matches.push(`base (${cake.base.name})`);
    }
    
    // Check if frosting matches preference
    if (cake.frosting && customer.preferences.includes(cake.frosting.id)) {
      score++;
      matches.push(`frosting (${cake.frosting.name})`);
    }
    
    // Check if any decorations match preferences
    cake.decorations.forEach(decoration => {
      if (customer.preferences.includes(decoration.id)) {
        score++;
        matches.push(`decoration (${decoration.name})`);
      }
    });
    
    // Generate feedback based on score
    if (score === 0) {
      return `${customer.name}: This cake doesn't suit my taste at all. Maybe try different ingredients next time?`;
    } else if (score < maxScore / 2) {
      return `${customer.name}: It's okay, but not really what I was looking for. I did like the ${matches.join(' and ')}.`;
    } else if (score < maxScore) {
      return `${customer.name}: This is quite good! I especially enjoyed the ${matches.join(' and ')}.`;
    } else {
      return `${customer.name}: Perfect! This cake is exactly what I wanted! I love the ${matches.join(' and ')}.`;
    }
  };
  
  // Serve cake to customer
  const serveCake = () => {
    if (!cake.base || !cake.frosting || cake.fillings.length === 0) {
      toast.error('Your cake is incomplete!');
      return;
    }
    
    if (!cake.name) {
      toast.error('Please name your cake!');
      return;
    }
    
    if (cake.price <= 0) {
      toast.error('Please set a price for your cake!');
      return;
    }
    
    // Select a random customer
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    setCurrentCustomer(randomCustomer);
    
    // Generate feedback
    const feedback = generateFeedback(randomCustomer, cake);
    
    // Update cake with feedback
    setCake(prev => ({
      ...prev,
      customerFeedback: [...prev.customerFeedback, feedback]
    }));
    
    // Update player stats
    setCakesSold(prev => prev + 1);
    setPlayerXP(prev => prev + 10); // Base XP for selling any cake
    
    toast.success('Cake served to customer!');
  };
  
  return (
    <CakeContext.Provider
      value={{
        cake,
        step,
        progress,
        customers,
        cakesSold,
        playerXP,
        availableBases: cakeBases,
        availableFillings: fillingFlavors,
        availableFrostings: frostingTypes,
        availableDecorations: decorations,
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
        goToStep,
        resetCake,
        serveCake,
        currentCustomer,
      }}
    >
      {children}
    </CakeContext.Provider>
  );
};

export const useCake = () => {
  const context = useContext(CakeContext);
  if (!context) {
    throw new Error('useCake must be used within a CakeProvider');
  }
  return context;
};