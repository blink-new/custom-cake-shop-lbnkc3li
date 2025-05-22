import { useCakeStore } from './lib/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Header } from './components/Header';
import { CakeBuilder } from './components/CakeBuilder';
import { Inventory } from './components/Inventory';
import { CustomerFeedback } from './components/CustomerFeedback';
import { Cake, List, History } from 'lucide-react';

function App() {
  const activeTab = 'builder';
  const customerFeedback = useCakeStore(state => state.customerFeedback);
  const cakeHistory = useCakeStore(state => state.cakeHistory);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-4 pb-16">
        <Tabs 
          value={activeTab} 
          onValueChange={tab => activeTab = tab}
          className="max-w-7xl mx-auto px-4"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Cake className="h-5 w-5" />
              <span>Cake Builder</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <List className="h-5 w-5" />
              <span>Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <span>History</span>
              {cakeHistory.length > 0 && (
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                  {cakeHistory.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="space-y-4 animate-fade-in">
            <CakeBuilder />
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4 animate-fade-in">
            <Inventory />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4 animate-fade-in">
            <div className="p-4 md:p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-2xl mb-6 text-center">Your Cake History</h2>
                
                {cakeHistory.length === 0 ? (
                  <div className="text-center p-12 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">Your cake history will appear here after you create your first cake!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cakeHistory.map((cake) => (
                      <div 
                        key={cake.id} 
                        className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-display text-xl mb-2">{cake.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          Created on {new Date(cake.createdAt).toLocaleDateString()}
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div>
                            <p className="text-sm font-medium">Base</p>
                            <p className="text-sm text-muted-foreground capitalize">{cake.base}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Frosting</p>
                            <p className="text-sm text-muted-foreground capitalize">{cake.frosting}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Fillings</p>
                            <p className="text-sm text-muted-foreground capitalize">{cake.fillings.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Price</p>
                            <p className="text-sm text-muted-foreground">{cake.price} coins</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {customerFeedback.length > 0 && <CustomerFeedback />}
    </div>
  );
}

export default App;