import { CakeBase, FillingFlavor, FrostingType, Decoration } from './cake-context';

export const BASE_DETAILS = {
  vanilla: {
    name: 'Vanilla',
    description: 'A classic, soft, and moist cake with a delicate vanilla flavor',
    color: 'bg-cake-vanilla',
    displayColor: '#FFF8E1'
  },
  chocolate: {
    name: 'Chocolate',
    description: 'Rich, decadent, and perfect for chocolate lovers',
    color: 'bg-cake-chocolate',
    displayColor: '#3E2723'
  },
  redVelvet: {
    name: 'Red Velvet',
    description: 'Velvety smooth with a hint of cocoa and vibrant red color',
    color: 'bg-cake-redVelvet',
    displayColor: '#B71C1C'
  },
  lemon: {
    name: 'Lemon',
    description: 'Bright, zesty, and refreshingly tangy',
    color: 'bg-cake-lemon',
    displayColor: '#FFF176'
  },
  marble: {
    name: 'Marble',
    description: 'Swirls of vanilla and chocolate in perfect harmony',
    color: 'bg-cake-marble',
    displayColor: '#EFEBE9'
  },
};

export const FILLING_DETAILS = {
  buttercream: {
    name: 'Buttercream',
    description: 'Smooth, creamy, and perfectly sweet',
    color: 'bg-filling-buttercream',
    displayColor: '#FFF9C4'
  },
  chocolateGanache: {
    name: 'Chocolate Ganache',
    description: 'Silky, rich, and intensely chocolatey',
    color: 'bg-filling-chocolate',
    displayColor: '#4E342E'
  },
  fruitPreserves: {
    name: 'Fruit Preserves',
    description: 'Sweet-tart fruit jam for a burst of flavor',
    color: 'bg-filling-fruit',
    displayColor: '#E57373'
  },
  creamCheese: {
    name: 'Cream Cheese',
    description: 'Tangy, creamy, and slightly sweet',
    color: 'bg-filling-creamCheese',
    displayColor: '#FFECB3'
  },
  custard: {
    name: 'Custard',
    description: 'Smooth, rich, and velvety',
    color: 'bg-filling-custard',
    displayColor: '#FFE082'
  },
};

export const FROSTING_DETAILS = {
  buttercream: {
    name: 'Buttercream',
    description: 'Classic, fluffy, and perfectly sweetened',
    color: 'bg-frosting-buttercream',
    displayColor: '#FFFDE7'
  },
  fondant: {
    name: 'Fondant',
    description: 'Smooth, firm, and perfect for decorating',
    color: 'bg-frosting-fondant',
    displayColor: '#F5F5F5'
  },
  whippedCream: {
    name: 'Whipped Cream',
    description: 'Light, airy, and delicately sweet',
    color: 'bg-frosting-whipped',
    displayColor: '#FFFFFF'
  },
  creamCheese: {
    name: 'Cream Cheese',
    description: 'Tangy, rich, and perfectly balanced',
    color: 'bg-frosting-creamCheese',
    displayColor: '#FFF8E1'
  },
};

export const DECORATION_DETAILS = {
  sprinkles: {
    name: 'Sprinkles',
    description: 'Colorful, festive, and fun',
    icon: '🌈',
  },
  freshFruit: {
    name: 'Fresh Fruit',
    description: 'Vibrant, juicy, and naturally sweet',
    icon: '🍓',
  },
  chocolateShavings: {
    name: 'Chocolate Shavings',
    description: 'Elegant, rich, and sophisticated',
    icon: '🍫',
  },
  edibleFlowers: {
    name: 'Edible Flowers',
    description: 'Beautiful, delicate, and stunning',
    icon: '🌸',
  },
  fondantShapes: {
    name: 'Fondant Shapes',
    description: 'Creative, customizable, and eye-catching',
    icon: '🎨',
  },
};

export const getBaseName = (base: CakeBase | null): string => {
  if (!base) return 'No base selected';
  return BASE_DETAILS[base].name;
};

export const getFillingName = (filling: FillingFlavor): string => {
  return FILLING_DETAILS[filling].name;
};

export const getFrostingName = (frosting: FrostingType | null): string => {
  if (!frosting) return 'No frosting selected';
  return FROSTING_DETAILS[frosting].name;
};

export const getDecorationName = (decoration: Decoration): string => {
  return DECORATION_DETAILS[decoration].name;
};

export const calculateBasePrice = (base: CakeBase | null): number => {
  if (!base) return 0;
  
  const basePrices: Record<CakeBase, number> = {
    vanilla: 10,
    chocolate: 12,
    redVelvet: 15,
    lemon: 13,
    marble: 14
  };
  
  return basePrices[base];
};

export const calculateFillingPrice = (fillings: FillingFlavor[]): number => {
  const fillingPrices: Record<FillingFlavor, number> = {
    buttercream: 3,
    chocolateGanache: 5,
    fruitPreserves: 4,
    creamCheese: 4,
    custard: 5
  };
  
  return fillings.reduce((total, filling) => total + fillingPrices[filling], 0);
};

export const calculateFrostingPrice = (frosting: FrostingType | null): number => {
  if (!frosting) return 0;
  
  const frostingPrices: Record<FrostingType, number> = {
    buttercream: 6,
    fondant: 8,
    whippedCream: 5,
    creamCheese: 7
  };
  
  return frostingPrices[frosting];
};

export const calculateDecorationPrice = (decorations: Decoration[]): number => {
  const decorationPrices: Record<Decoration, number> = {
    sprinkles: 2,
    freshFruit: 4,
    chocolateShavings: 3,
    edibleFlowers: 6,
    fondantShapes: 5
  };
  
  return decorations.reduce((total, decoration) => total + decorationPrices[decoration], 0);
};

export const calculateTotalPrice = (
  base: CakeBase | null,
  fillings: FillingFlavor[],
  frosting: FrostingType | null,
  decorations: Decoration[]
): number => {
  return (
    calculateBasePrice(base) +
    calculateFillingPrice(fillings) +
    calculateFrostingPrice(frosting) +
    calculateDecorationPrice(decorations)
  );
};