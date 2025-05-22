import { CakeBase, FillingFlavor, FrostingType, Decoration, Customer, UnlockRequirement } from "../types";

// Cake Bases
export const cakeBases: CakeBase[] = [
  {
    id: "vanilla",
    name: "Vanilla",
    description: "A light and fluffy vanilla-flavored cake base.",
    color: "#F5E9D0",
    unlocked: true,
  },
  {
    id: "chocolate",
    name: "Chocolate",
    description: "A rich and moist chocolate cake base.",
    color: "#5C4033",
    unlocked: true,
  },
  {
    id: "red-velvet",
    name: "Red Velvet",
    description: "A velvety smooth cake with a hint of cocoa and vibrant red color.",
    color: "#AA4A44",
    unlocked: true,
  },
  {
    id: "lemon",
    name: "Lemon",
    description: "A bright and zesty lemon-flavored cake base.",
    color: "#FFF44F",
    unlocked: true,
  },
  {
    id: "marble",
    name: "Marble",
    description: "A beautiful swirl of vanilla and chocolate batters.",
    color: "#D3C9BD",
    unlocked: true,
  },
];

// Filling Flavors
export const fillingFlavors: FillingFlavor[] = [
  {
    id: "buttercream",
    name: "Buttercream",
    description: "A smooth and creamy classic buttercream filling.",
    color: "#FFF9E3",
    unlocked: true,
  },
  {
    id: "chocolate-ganache",
    name: "Chocolate Ganache",
    description: "A rich and decadent chocolate ganache filling.",
    color: "#3F2211",
    unlocked: true,
  },
  {
    id: "fruit-preserves",
    name: "Fruit Preserves",
    description: "Sweet and tangy fruit preserves filling.",
    color: "#DB5A6B",
    unlocked: true,
  },
  {
    id: "cream-cheese",
    name: "Cream Cheese",
    description: "A tangy and smooth cream cheese filling.",
    color: "#FFF8DC",
    unlocked: true,
  },
  {
    id: "custard",
    name: "Custard",
    description: "A rich and creamy vanilla custard filling.",
    color: "#FFF8B6",
    unlocked: true,
  },
];

// Frosting Types
export const frostingTypes: FrostingType[] = [
  {
    id: "buttercream-frosting",
    name: "Buttercream",
    description: "A classic smooth buttercream frosting.",
    color: "#FFF9E3",
    unlocked: true,
  },
  {
    id: "fondant",
    name: "Fondant",
    description: "A smooth and pliable frosting that gives a polished look.",
    color: "#FFFFFF",
    unlocked: true,
  },
  {
    id: "whipped-cream",
    name: "Whipped Cream",
    description: "A light and airy whipped cream frosting.",
    color: "#FFFAFA",
    unlocked: true,
  },
  {
    id: "cream-cheese-frosting",
    name: "Cream Cheese",
    description: "A tangy cream cheese frosting.",
    color: "#FFF8DC",
    unlocked: true,
  },
];

// Decorations
export const decorations: Decoration[] = [
  {
    id: "sprinkles",
    name: "Sprinkles",
    description: "Colorful sugar sprinkles to add a festive touch.",
    image: "🌈",
    unlocked: true,
  },
  {
    id: "fresh-fruit",
    name: "Fresh Fruit",
    description: "Assorted fresh fruits for a natural decoration.",
    image: "🍓",
    unlocked: true,
  },
  {
    id: "chocolate-shavings",
    name: "Chocolate Shavings",
    description: "Delicate chocolate shavings for an elegant touch.",
    image: "🍫",
    unlocked: true,
  },
  {
    id: "edible-flowers",
    name: "Edible Flowers",
    description: "Beautiful edible flowers for a sophisticated decoration.",
    image: "🌸",
    unlocked: true,
  },
  {
    id: "fondant-shapes",
    name: "Fondant Shapes",
    description: "Custom fondant shapes for creative decorations.",
    image: "🎨",
    unlocked: true,
  },
];

// Customers
export const customers: Customer[] = [
  {
    id: "customer1",
    name: "Sarah",
    avatar: "👩",
    preferences: ["chocolate", "buttercream-frosting", "sprinkles"],
    feedback: []
  },
  {
    id: "customer2",
    name: "Mike",
    avatar: "👨",
    preferences: ["vanilla", "whipped-cream", "fresh-fruit"],
    feedback: []
  },
  {
    id: "customer3",
    name: "Emma",
    avatar: "👧",
    preferences: ["red-velvet", "cream-cheese-frosting", "fondant-shapes"],
    feedback: []
  },
  {
    id: "customer4",
    name: "James",
    avatar: "👴",
    preferences: ["lemon", "custard", "edible-flowers"],
    feedback: []
  },
];

// Unlockable ingredients and their requirements
export const unlockableIngredients: Record<string, UnlockRequirement> = {
  "funfetti": { cakesSold: 5 },
  "matcha": { cakesSold: 10 },
  "caramel": { cakesSold: 5, specificIngredients: ["vanilla"] },
  "raspberry-mousse": { cakesSold: 8, specificIngredients: ["chocolate"] },
  "mirror-glaze": { cakesSold: 15, highRatings: 5 },
  "sugar-crystals": { cakesSold: 5 },
  "gold-leaf": { cakesSold: 20, highRatings: 10 },
};