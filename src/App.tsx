import { CakeBuilder } from './components/CakeBuilder';
import { Customers } from './components/Customers';
import { Creations } from './components/Creations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ChefHat, CakeIcon, Users } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <header className="bg-white border-b shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-amber-500" />
              <h1 className="text-2xl font-bold text-slate-800">Custom Cake Shop</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="create" className="mb-8">
          <TabsList className="mb-8 w-full grid grid-cols-3">
            <TabsTrigger value="create" className="flex items-center justify-center gap-2 py-3">
              <CakeIcon className="h-5 w-5" />
              <span>Create Cake</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center justify-center gap-2 py-3">
              <Users className="h-5 w-5" />
              <span>Customers</span>
            </TabsTrigger>
            <TabsTrigger value="creations" className="flex items-center justify-center gap-2 py-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-5 w-5"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span>Your Shop</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="mt-0">
            <CakeBuilder />
          </TabsContent>
          
          <TabsContent value="customers" className="mt-0">
            <Customers />
          </TabsContent>
          
          <TabsContent value="creations" className="mt-0">
            <Creations />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground text-sm">
            Custom Cake Shop © {new Date().getFullYear()} - Your Virtual Bakery Experience
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;