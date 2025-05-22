import React from 'react';
import { useCakeStore } from '../lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CakeIcon, Award, Gift } from 'lucide-react';

export function Creations() {
  const { creations, unlockedIngredients, level, experience } = useCakeStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Cake Shop</h2>
      
      <Tabs defaultValue="creations" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="creations" className="flex items-center gap-2">
            <CakeIcon className="w-4 h-4" />
            <span>Your Creations</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Baker Progress</span>
          </TabsTrigger>
          <TabsTrigger value="unlocked" className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            <span>Unlocked Ingredients</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="creations" className="mt-0">
          {creations.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-lg">
              <CakeIcon className="w-12 h-12 mx-auto text-muted-foreground opacity-70 mb-4" />
              <h3 className="text-lg font-medium mb-2">No cakes yet!</h3>
              <p className="text-muted-foreground">Start creating your first cake masterpiece.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creations.map((cake) => (
                <Card key={cake.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle>{cake.name}</CardTitle>
                    <CardDescription className="flex justify-between items-center">
                      <span className="capitalize">{cake.base} base</span>
                      <span className="text-primary-600 font-semibold">${cake.price.toFixed(2)}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium mb-1">Fillings:</div>
                        <div className="flex flex-wrap gap-1">
                          {cake.fillings.length > 0 ? (
                            cake.fillings.map((filling, index) => (
                              <Badge key={index} variant="outline" className="capitalize">
                                {filling}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">No fillings</span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Frosting:</div>
                        <Badge variant="outline" className="capitalize">
                          {cake.frosting}
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Decorations:</div>
                        <div className="flex flex-wrap gap-1">
                          {cake.decorations.length > 0 ? (
                            cake.decorations.map((decoration, index) => (
                              <Badge key={index} variant="outline" className="capitalize">
                                {decoration}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">No decorations</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="progress" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Baker Level</CardTitle>
                <CardDescription>Your current skill level and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="bg-primary-100 text-primary-700 rounded-full p-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Level {level}</div>
                    <div className="text-sm text-muted-foreground">
                      {50 - (experience % 50)} XP until next level
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-muted rounded-full h-2.5 mb-1">
                    <div 
                      className="bg-primary-500 h-2.5 rounded-full"
                      style={{ width: `${(experience % 50) * 2}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{experience % 50} XP</span>
                    <span>50 XP</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">Level Benefits:</h4>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                      <span className="text-primary-700 text-xs">✓</span>
                    </div>
                    <div className="text-sm">Level 2: Unlock premium ingredient</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                      <span className="text-primary-700 text-xs">✓</span>
                    </div>
                    <div className="text-sm">Level 3: Access to VIP customers</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                      <span className="text-primary-700 text-xs">✓</span>
                    </div>
                    <div className="text-sm">Level 5: Special decoration techniques</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Baking Stats</CardTitle>
                <CardDescription>Your achievements as a baker</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/40 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">{creations.length}</div>
                    <div className="text-sm text-muted-foreground">Cakes Created</div>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">{Math.floor(experience / 5)}</div>
                    <div className="text-sm text-muted-foreground">Cakes Sold</div>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">{unlockedIngredients.length}</div>
                    <div className="text-sm text-muted-foreground">Special Ingredients</div>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">{experience}</div>
                    <div className="text-sm text-muted-foreground">Total XP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="unlocked" className="mt-0">
          {unlockedIngredients.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-lg">
              <Gift className="w-12 h-12 mx-auto text-muted-foreground opacity-70 mb-4" />
              <h3 className="text-lg font-medium mb-2">No special ingredients yet!</h3>
              <p className="text-muted-foreground">Serve more customers to unlock special ingredients.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unlockedIngredients.map((ingredient, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="capitalize">{ingredient.name}</CardTitle>
                      <Badge>{ingredient.type}</Badge>
                    </div>
                    <CardDescription>{ingredient.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}