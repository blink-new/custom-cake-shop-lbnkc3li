import React from 'react';
import { motion } from 'framer-motion';
import { useCake } from '../lib/cake-context';
import CakePreview from './CakePreview';
import BaseStep from './steps/BaseStep';
import FillingStep from './steps/FillingStep';
import FrostingStep from './steps/FrostingStep';
import DecorationStep from './steps/DecorationStep';
import DetailsStep from './steps/DetailsStep';
import CustomerStep from './steps/CustomerStep';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { CakeOption, CakeOptionMulti } from './ui/CakeOption';

const CakeBuilder: React.FC = () => {
  const { cake, step, nextStep, prevStep, feedback, experience, resetCake } = useCake();
  
  // Check if current step can proceed
  const canProceed = () => {
    if (step === 1) return cake.base !== null;
    if (step === 2) return cake.fillings.length > 0;
    if (step === 3) return cake.frosting !== null;
    if (step === 4) return true; // Decorations are optional
    if (step === 5) return cake.name.trim() !== '';
    return false;
  };
  
  // Level calculation based on experience
  const currentLevel = Math.floor(experience / 100) + 1;
  const experienceToNextLevel = (currentLevel * 100) - experience;
  const experienceProgress = (experience % 100) / 100;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-display text-primary mb-2">Custom Cake Shop</h1>
        <p className="text-muted-foreground">Create your delicious masterpiece</p>
      </div>
      
      <div className="bg-card shadow-lg rounded-xl p-4 md:p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div 
                key={s} 
                className={`w-3 h-3 rounded-full transition-colors ${
                  s === step ? 'bg-primary' : s < step ? 'bg-primary/40' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">Baker Level {currentLevel}</div>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary"
                style={{ width: `${experienceProgress * 100}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground">{experienceToNextLevel} XP to next level</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            {step === 1 && <BaseStep />}
            {step === 2 && <FillingStep />}
            {step === 3 && <FrostingStep />}
            {step === 4 && <DecorationStep />}
            {step === 5 && <DetailsStep />}
            {step === 6 && <CustomerStep />}
            
            <div className="flex justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  step === 1
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
                onClick={prevStep}
                disabled={step === 1}
              >
                <ChevronLeft size={16} />
                Previous
              </motion.button>
              
              {step === 6 && feedback ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
                  onClick={resetCake}
                >
                  Make a New Cake
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: canProceed() ? 1.05 : 1 }}
                  whileTap={{ scale: canProceed() ? 0.95 : 1 }}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                    canProceed()
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  onClick={canProceed() ? nextStep : undefined}
                  disabled={!canProceed()}
                >
                  {step === 5 ? 'Meet Customer' : 'Next'}
                  <ChevronRight size={16} />
                </motion.button>
              )}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
            <div className="mb-4 text-center">
              <h3 className="font-display text-xl">
                {cake.name || "Your Cake Creation"}
              </h3>
              {cake.name && <p className="text-muted-foreground">${cake.price.toFixed(2)}</p>}
            </div>
            <div className="bg-muted/50 rounded-xl p-8 w-full flex items-center justify-center h-80">
              <CakePreview 
                base={cake.base}
                fillings={cake.fillings}
                frosting={cake.frosting}
                decorations={cake.decorations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeBuilder;