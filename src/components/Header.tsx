import { ChefHat } from 'lucide-react';

export function Header() {
  return (
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
  );
}