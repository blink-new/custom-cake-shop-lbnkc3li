import { CakeBase, CakeFilling, CakeFrosting, CakeDecoration, Customer, UnlockedIngredient } from './types';

export const baseOptions: Record<CakeBase, { description: string, imageSrc: string, priceModifier: number }> = {
  'vanilla': {
    description: 'A light and fluffy classic with a delicate flavor',
    imageSrc: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=2074&auto=format&fit=crop',
    priceModifier: 10
  },
  'chocolate': {
    description: 'Rich and decadent chocolate flavor in every bite',
    imageSrc: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=2187&auto=format&fit=crop',
    priceModifier: 12
  },
  'red velvet': {
    description: 'Velvety smooth with a hint of cocoa and vibrant color',
    imageSrc: 'https://images.unsplash.com/photo-1586788224331-947f68671cf1?q=80&w=2187&auto=format&fit=crop',
    priceModifier: 15
  },
  'lemon': {
    description: 'Bright citrus flavor with a refreshing zesty punch',
    imageSrc: 'https://images.unsplash.com/photo-1591638246754-5bc75aec1d36?q=80&w=2187&auto=format&fit=crop',
    priceModifier: 13
  },
  'marble': {
    description: 'Beautiful swirls of vanilla and chocolate in perfect harmony',
    imageSrc: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=2187&auto=format&fit=crop',
    priceModifier: 14
  }
};

export const fillingOptions: Record<CakeFilling, { description: string, imageSrc: string, priceModifier: number }> = {
  'buttercream': {
    description: 'Smooth and creamy classic buttercream',
    imageSrc: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=2187&auto=format&fit=crop',
    priceModifier: 5
  },
  'chocolate ganache': {
    description: 'Silky smooth melted chocolate and cream',
    imageSrc: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2089&auto=format&fit=crop',
    priceModifier: 7
  },
  'fruit preserves': {
    description: 'Sweet and tangy fruity goodness',
    imageSrc: 'https://images.unsplash.com/photo-1467825487722-2a7c4cd11c38?q=80&w=2069&auto=format&fit=crop',
    priceModifier: 6
  },
  'cream cheese': {
    description: 'Tangy and rich cream cheese filling',
    imageSrc: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=2070&auto=format&fit=crop',
    priceModifier: 6
  },
  'custard': {
    description: 'Smooth and velvety vanilla custard',
    imageSrc: 'https://images.unsplash.com/photo-1639744211761-fe0b888e53a6?q=80&w=2072&auto=format&fit=crop',
    priceModifier: 8
  }
};

export const frostingOptions: Record<CakeFrosting, { description: string, imageSrc: string, priceModifier: number }> = {
  'buttercream': {
    description: 'Light and fluffy traditional buttercream',
    imageSrc: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?q=80&w=2069&auto=format&fit=crop',
    priceModifier: 8
  },
  'fondant': {
    description: 'Smooth and moldable for a flawless finish',
    imageSrc: 'https://images.unsplash.com/photo-1551404317-5f01caa94e22?q=80&w=2093&auto=format&fit=crop',
    priceModifier: 12
  },
  'whipped cream': {
    description: 'Light and airy whipped cream frosting',
    imageSrc: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=2074&auto=format&fit=crop',
    priceModifier: 7
  },
  'cream cheese': {
    description: 'Tangy and creamy with a hint of sweetness',
    imageSrc: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=2070&auto=format&fit=crop',
    priceModifier: 9
  }
};

export const decorationOptions: Record<CakeDecoration, { description: string, imageSrc: string, priceModifier: number }> = {
  'sprinkles': {
    description: 'Colorful and fun sprinkles for a festive look',
    imageSrc: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=2036&auto=format&fit=crop',
    priceModifier: 3
  },
  'fresh fruit': {
    description: 'Seasonal fresh fruits for a natural touch',
    imageSrc: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2065&auto=format&fit=crop',
    priceModifier: 5
  },
  'chocolate shavings': {
    description: 'Delicate chocolate curls and shavings',
    imageSrc: 'https://images.unsplash.com/photo-1541781550486-8d3f12eb47cc?q=80&w=2072&auto=format&fit=crop',
    priceModifier: 4
  },
  'edible flowers': {
    description: 'Beautiful edible flowers for an elegant touch',
    imageSrc: 'https://images.unsplash.com/photo-1556905200-279565513a2d?q=80&w=2070&auto=format&fit=crop',
    priceModifier: 7
  },
  'fondant shapes': {
    description: 'Custom fondant decorations for personalized cakes',
    imageSrc: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=2033&auto=format&fit=crop',
    priceModifier: 8
  }
};

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    preferences: ['chocolate', 'buttercream', 'fresh fruit'],
    satisfaction: 0
  },
  {
    id: '2',
    name: 'Bob Smith',
    preferences: ['vanilla', 'cream cheese', 'sprinkles'],
    satisfaction: 0
  },
  {
    id: '3',
    name: 'Carol White',
    preferences: ['red velvet', 'chocolate ganache', 'edible flowers'],
    satisfaction: 0
  },
  {
    id: '4',
    name: 'David Brown',
    preferences: ['lemon', 'whipped cream', 'fresh fruit'],
    satisfaction: 0
  },
  {
    id: '5',
    name: 'Emma Davis',
    preferences: ['marble', 'fondant', 'fondant shapes'],
    satisfaction: 0
  }
];

export const specialIngredients: UnlockedIngredient[] = [
  {
    type: 'base',
    name: 'Matcha Green Tea',
    description: 'Delicate matcha flavor with a beautiful green color',
    unlockMessage: 'You\'ve unlocked Matcha Green Tea cake base! Perfect for tea lovers.'
  },
  {
    type: 'filling',
    name: 'Salted Caramel',
    description: 'Sweet and salty caramel for a sophisticated flavor profile',
    unlockMessage: 'You\'ve unlocked Salted Caramel filling! Sweet meets salty in perfect harmony.'
  },
  {
    type: 'frosting',
    name: 'Swiss Meringue',
    description: 'Silky smooth and less sweet than traditional buttercream',
    unlockMessage: 'You\'ve unlocked Swiss Meringue frosting! Known for its silky texture and stability.'
  },
  {
    type: 'decoration',
    name: 'Gold Leaf',
    description: 'Edible gold leaf for a luxurious, opulent decoration',
    unlockMessage: 'You\'ve unlocked Gold Leaf decoration! Add a touch of luxury to your creations.'
  }
];