import { useState } from 'react';
import { useCakeStore } from '../lib/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Cake, 
  Droplets, 
  IceCream, 
  Sparkles,
  Trophy,
  Star
} from 'lucide-react';
import { PlayerProfile } from '../types/cake';

interface IngredientTabProps {
  items: string[];
  allItems: { type: string; name: string; description: string }[];
  title: string;
  icon: React.ReactNode;
}

function IngredientTab({ items, allItems, title, icon }: IngredientTabProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-display text-xl">{title}</h3>
        <Badge variant="outline">{items.length}/{allItems.length} Unlocked</Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allItems.map((item) => {
          const isUnlocked = items.includes(item.type);
          
          return (
            <Card 
              key={item.type}
              className={`p-4 ${isUnlocked ? 'bg-card' : 'bg-muted/50 opacity-70'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                
                {isUnlocked ? (
                  <Badge className="bg-green-600">Unlocked</Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-600">Locked</Badge>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function AchievementsTab() {
  // Achievements will be based on player stats
  const player = useCakeStore(state => state.player);
  const completedCakes = useCakeStore(state => state.cakeHistory.length);
  
  const achievements = [
    {
      id: 'first-cake',
      name: 'First Creation',
      description: 'Bake your first cake',
      unlocked: completedCakes >= 1,
      icon: <Cake className="h-5 w-5 text-primary-500" />
    },
    {
      id: 'cake-master',
      name: 'Cake Master',
      description: 'Create 10 different cakes',
      unlocked: completedCakes >= 10,
      icon: <Trophy className="h-5 w-5 text-amber-500" />
    },
    {
      id: 'master-baker',
      name: 'Master Baker',
      description: 'Reach level 5',
      unlocked: player.level >= 5,
      icon: <Star className="h-5 w-5 text-yellow-500" />
    },
    {
      id: 'ingredient-collector',
      name: 'Ingredient Collector',
      description: 'Unlock all base ingredients',
      unlocked: player.unlocked.bases.length >= 5,
      icon: <Cake className="h-5 w-5 text-blue-500" />
    }
  ];
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-6 w-6 text-amber-500" />
        <h3 className="font-display text-xl">Achievements</h3>
        <Badge variant="outline">
          {achievements.filter(a => a.unlocked).length}/{achievements.length} Completed
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id}
            className={`p-4 ${achievement.unlocked ? 'bg-gradient-to-r from-primary-50 to-amber-50 border-amber-200' : 'bg-muted/50 opacity-70'}`}
          >
            <div className="flex items-start gap-3">
              <div className={`rounded-full p-2 ${achievement.unlocked ? 'bg-amber-100' : 'bg-gray-200'}`}>
                {achievement.icon}
              </div>
              
              <div>
                <h4 className="font-medium">{achievement.name}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              
              {achievement.unlocked ? (
                <Badge className="ml-auto bg-amber-500">Completed</Badge>
              ) : (
                <Badge variant="outline" className="ml-auto">In Progress</Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Inventory() {
  const [activeTab, setActiveTab] = useState('achievements');
  const player = useCakeStore<PlayerProfile>(state => state.player);
  
  // Reference data for all possible ingredients
  const allBases = [
    { type: 'vanilla', name: 'Vanilla', description: 'Light and fluffy with delicate vanilla notes' },
    { type: 'chocolate', name: 'Chocolate', description: 'Rich, moist, and decadent chocolate flavor' },
    { type: 'redVelvet', name: 'Red Velvet', description: 'Velvety texture with a hint of cocoa' },
    { type: 'lemon', name: 'Lemon', description: 'Bright and zesty lemon-infused cake' },
    { type: 'marble', name: 'Marble', description: 'Beautiful swirls of vanilla and chocolate' }
  ];
  
  const allFillings = [
    { type: 'buttercream', name: 'Buttercream', description: 'Smooth, rich, and buttery' },
    { type: 'chocolate', name: 'Chocolate Ganache', description: 'Silky chocolate delight' },
    { type: 'fruit', name: 'Fruit Preserves', description: 'Sweet and tangy fruit filling' },
    { type: 'cream', name: 'Cream Cheese', description: 'Tangy and creamy texture' },
    { type: 'custard', name: 'Custard', description: 'Smooth, rich vanilla custard' }
  ];
  
  const allFrostings = [
    { type: 'buttercream', name: 'Buttercream', description: 'Classic, smooth, and easy to work with' },
    { type: 'fondant', name: 'Fondant', description: 'Smooth, firm coating for decorating' },
    { type: 'whipped', name: 'Whipped Cream', description: 'Light and airy with subtle sweetness' },
    { type: 'cream', name: 'Cream Cheese', description: 'Tangy and creamy classic' }
  ];
  
  const allDecorations = [
    { type: 'sprinkles', name: 'Sprinkles', description: 'Colorful and fun' },
    { type: 'fruit', name: 'Fresh Fruit', description: 'Natural and refreshing' },
    { type: 'chocolate', name: 'Chocolate Shavings', description: 'Rich and elegant' },
    { type: 'flowers', name: 'Edible Flowers', description: 'Beautiful and delicate' },
    { type: 'fondant', name: 'Fondant Shapes', description: 'Decorative and customizable' }
  ];
  
  return (
    <div className="p-4 md:p-6">
      <Card className="p-4 md:p-6 shadow-lg">
        <h2 className="font-display text-2xl mb-6 text-center">Your Inventory</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="achievements" className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="bases" className="flex items-center gap-1">
              <Cake className="h-4 w-4" />
              <span className="hidden sm:inline">Bases</span>
            </TabsTrigger>
            <TabsTrigger value="fillings" className="flex items-center gap-1">
              <Droplets className="h-4 w-4" />
              <span className="hidden sm:inline">Fillings</span>
            </TabsTrigger>
            <TabsTrigger value="frostings" className="flex items-center gap-1">
              <IceCream className="h-4 w-4" />
              <span className="hidden sm:inline">Frostings</span>
            </TabsTrigger>
            <TabsTrigger value="decorations" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Decorations</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements">
            <AchievementsTab />
          </TabsContent>
          
          <TabsContent value="bases">
            <IngredientTab 
              items={player.unlocked.bases}
              allItems={allBases}
              title="Cake Bases"
              icon={<Cake className="h-6 w-6 text-primary-600" />}
            />
          </TabsContent>
          
          <TabsContent value="fillings">
            <IngredientTab 
              items={player.unlocked.fillings}
              allItems={allFillings}
              title="Fillings"
              icon={<Droplets className="h-6 w-6 text-primary-600" />}
            />
          </TabsContent>
          
          <TabsContent value="frostings">
            <IngredientTab 
              items={player.unlocked.frostings}
              allItems={allFrostings}
              title="Frostings"
              icon={<IceCream className="h-6 w-6 text-primary-600" />}
            />
          </TabsContent>
          
          <TabsContent value="decorations">
            <IngredientTab 
              items={player.unlocked.decorations}
              allItems={allDecorations}
              title="Decorations"
              icon={<Sparkles className="h-6 w-6 text-primary-600" />}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}