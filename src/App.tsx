import { CakeProvider } from './context/CakeContext';
import Header from './components/Header';
import CakeBuilder from './components/CakeBuilder';

function App() {
  return (
    <CakeProvider>
      <div className="min-h-screen flex flex-col bg-background font-sans">
        <Header />
        <main className="flex-1">
          <CakeBuilder />
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border/20">
          <p>© {new Date().getFullYear()} Custom Cake Shop</p>
        </footer>
      </div>
    </CakeProvider>
  );
}

export default App;