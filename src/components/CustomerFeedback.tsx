import { useEffect, useState } from 'react';
import { useCakeStore } from '../lib/store';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CustomerFeedback() {
  const customerFeedback = useCakeStore(state => state.customerFeedback);
  const clearFeedback = useCakeStore(state => state.clearFeedback);
  const [autoHide, setAutoHide] = useState(true);
  
  // Auto-hide feedback after 10 seconds
  useEffect(() => {
    if (customerFeedback.length > 0 && autoHide) {
      const timer = setTimeout(() => {
        clearFeedback();
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [customerFeedback, clearFeedback, autoHide]);
  
  if (customerFeedback.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 w-full max-w-md z-50">
      <Card className="bg-card/90 backdrop-blur p-4 shadow-lg border border-primary-200">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-lg">Customer Feedback</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setAutoHide(!autoHide)}
            >
              {autoHide ? 'Auto-hide On' : 'Auto-hide Off'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-7 w-7 p-0"
              onClick={clearFeedback}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <AnimatePresence>
            {customerFeedback.map((feedback, index) => (
              <motion.div
                key={`feedback-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="feedback-bubble"
              >
                <p>{feedback}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}