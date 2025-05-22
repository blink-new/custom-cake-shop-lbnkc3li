import React, { useState } from 'react';
import { useCakeStore } from '../lib/store';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { CakeCreation, Customer } from '../lib/types';
import { toast } from 'react-hot-toast';

export function Customers() {
  const { customers, creations, serveCakeToCustomer, completedSales, level, experience } = useCakeStore();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedCake, setSelectedCake] = useState<CakeCreation | null>(null);
  const [isCakeSelectionOpen, setIsCakeSelectionOpen] = useState(false);
  const [feedbackDialog, setFeedbackDialog] = useState<{ 
    isOpen: boolean;
    feedback: string;
    rating: number;
    experience: number;
  }>({
    isOpen: false,
    feedback: '',
    rating: 0,
    experience: 0
  });

  const handleServeCustomer = (customer: Customer) => {
    if (creations.length === 0) {
      toast.error("You don't have any cakes to serve! Create a cake first.");
      return;
    }
    
    setSelectedCustomer(customer);
    setIsCakeSelectionOpen(true);
  };

  const handleSelectCake = (cake: CakeCreation) => {
    setSelectedCake(cake);
  };

  const handleServeCake = () => {
    if (!selectedCustomer || !selectedCake) return;
    
    const { feedback, rating, experience } = serveCakeToCustomer(selectedCustomer.id, selectedCake.id);
    
    setFeedbackDialog({
      isOpen: true,
      feedback,
      rating,
      experience
    });
    
    setIsCakeSelectionOpen(false);
  };

  const closeFeedbackDialog = () => {
    setFeedbackDialog(prev => ({ ...prev, isOpen: false }));
    setSelectedCustomer(null);
    setSelectedCake(null);
  };

  const getCustomerStatusColor = (customer: Customer) => {
    if (customer.satisfaction === 0) return 'bg-gray-200';
    if (customer.satisfaction >= 4) return 'bg-green-400';
    if (customer.satisfaction >= 2) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Customers</h2>
        <div className="flex gap-4 items-center">
          <div className="bg-primary-50 rounded-md p-2 text-center">
            <div className="text-xs text-primary-600 font-medium">LEVEL</div>
            <div className="text-xl font-bold text-primary-700">{level}</div>
          </div>
          <div className="bg-primary-50 rounded-md p-2 text-center">
            <div className="text-xs text-primary-600 font-medium">XP</div>
            <div className="text-xl font-bold text-primary-700">{experience}</div>
          </div>
          <div className="bg-primary-50 rounded-md p-2 text-center">
            <div className="text-xs text-primary-600 font-medium">SALES</div>
            <div className="text-xl font-bold text-primary-700">{completedSales}</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <Card key={customer.id} className="overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10 bg-primary-100 text-primary-700">
                  <span className="text-lg font-semibold">{customer.name.charAt(0)}</span>
                </Avatar>
                <div>
                  <h3 className="font-medium">{customer.name}</h3>
                  <div className="flex items-center gap-1">
                    <div 
                      className={`w-2 h-2 rounded-full ${getCustomerStatusColor(customer)}`} 
                    />
                    <span className="text-xs text-muted-foreground">
                      {customer.satisfaction === 0 
                        ? 'New Customer' 
                        : `${customer.satisfaction} Star Rating`}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Preferences:</div>
                <div className="flex flex-wrap gap-1">
                  {customer.preferences.map((pref) => (
                    <Badge key={pref} variant="outline" className="capitalize">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button
                onClick={() => handleServeCustomer(customer)}
                className="w-full"
                variant={customer.satisfaction > 0 ? "outline" : "default"}
              >
                Serve Cake
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Cake Selection Dialog */}
      <Dialog open={isCakeSelectionOpen} onOpenChange={setIsCakeSelectionOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Choose a cake to serve {selectedCustomer?.name}</DialogTitle>
            <DialogDescription>
              Select one of your cake creations to serve to {selectedCustomer?.name}.
              Try to match their preferences for the best results!
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 max-h-[400px] overflow-y-auto">
            {creations.map((cake) => (
              <div 
                key={cake.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  selectedCake?.id === cake.id 
                    ? 'ring-2 ring-primary-500 border-primary-500' 
                    : 'hover:border-primary-300'
                }`}
                onClick={() => handleSelectCake(cake)}
              >
                <h3 className="font-medium mb-1">{cake.name}</h3>
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="capitalize">{cake.base}</span> base with{' '}
                  <span className="capitalize">{cake.frosting}</span> frosting
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {[...cake.fillings, ...cake.decorations].map((item, index) => (
                    <Badge key={index} variant="secondary" className="capitalize text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="text-right font-medium">${cake.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCakeSelectionOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleServeCake}
              disabled={!selectedCake}
            >
              Serve Cake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Feedback Dialog */}
      <Dialog open={feedbackDialog.isOpen} onOpenChange={(open) => {
        if (!open) closeFeedbackDialog();
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Feedback</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={star <= feedbackDialog.rating ? "currentColor" : "none"} 
                    stroke="currentColor"
                    className={`w-8 h-8 ${
                      star <= feedbackDialog.rating 
                        ? "text-yellow-400" 
                        : "text-gray-300"
                    }`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <p className="text-center mb-4">{feedbackDialog.feedback}</p>
            
            <div className="bg-primary-50 rounded-lg p-3 text-center">
              <p className="text-sm text-primary-600 mb-1">You earned</p>
              <p className="text-2xl font-bold text-primary-700">{feedbackDialog.experience} XP</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={closeFeedbackDialog}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}