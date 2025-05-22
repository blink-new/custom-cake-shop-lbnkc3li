import React from 'react';
import { CakeProvider } from './lib/cake-context';
import CakeBuilder from './components/CakeBuilder';
import './App.css';

function App() {
  return (
    <CakeProvider>
      <CakeBuilder />
    </CakeProvider>
  );
}

export default App;