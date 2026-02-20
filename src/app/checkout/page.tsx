"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Check, CreditCard, Truck, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const steps = [
  { id: 1, name: "Information", icon: User },
  { id: 2, name: "Shipping", icon: Truck },
  { id: 3, name: "Payment", icon: CreditCard },
  { id: 4, name: "Confirm", icon: Check },
];

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = async () => {
    setIsProcessing(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsProcessing(false);

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      clearCart();
    }
  };

  if (isCompleted) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
        >
          <Check className="h-12 w-12" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Thank you for your purchase. Your order ID is #MNT-{Math.floor(Math.random() * 10000)}. 
          We have sent a confirmation email to your address.
        </p>
        <Link href="/">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Steps */}
        <div className="lg:col-span-2">
            {/* Steps Indicator */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    
                    return (
                        <div key={step.id} className="flex flex-col items-center min-w-[80px] relative">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 transition-colors ${
                                 isActive || isCompleted ? "bg-accent text-white" : "bg-secondary text-muted-foreground"
                             }`}>
                                 <Icon className="h-5 w-5" />
                             </div>
                             <span className={`text-xs font-medium ${isActive ? "text-accent" : "text-muted-foreground"}`}>
                                 {step.name}
                             </span>
                             {index < steps.length - 1 && (
                                 <div className={`absolute top-5 left-1/2 w-full h-[2px] -translate-y-1/2 ${
                                     isCompleted ? "bg-accent" : "bg-secondary"
                                 }`} />
                             )}
                        </div>
                    );
                })}
            </div>

            {/* Form Steps */}
            <div className="bg-card border border-border rounded-xl p-6">
                {currentStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="col-span-2 sm:col-span-1 space-y-2">
                                 <label className="text-sm font-medium">First Name</label>
                                 <Input placeholder="John" defaultValue="John" />
                             </div>
                             <div className="col-span-2 sm:col-span-1 space-y-2">
                                 <label className="text-sm font-medium">Last Name</label>
                                 <Input placeholder="Doe" defaultValue="Doe" />
                             </div>
                             <div className="col-span-2 space-y-2">
                                 <label className="text-sm font-medium">Email Address</label>
                                 <Input placeholder="john@example.com" defaultValue="john@example.com" />
                             </div>
                             <div className="col-span-2 space-y-2">
                                 <label className="text-sm font-medium">Phone</label>
                                 <Input placeholder="+1 (555) 000-0000" />
                             </div>
                        </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                        <div className="grid grid-cols-1 gap-4">
                             <div className="space-y-2">
                                 <label className="text-sm font-medium">Street Address</label>
                                 <Input placeholder="123 Main St" defaultValue="123 Main St" />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                     <label className="text-sm font-medium">City</label>
                                     <Input placeholder="New York" defaultValue="New York" />
                                 </div>
                                 <div className="space-y-2">
                                     <label className="text-sm font-medium">Postal Code</label>
                                     <Input placeholder="10001" defaultValue="10001" />
                                 </div>
                             </div>
                             <div className="space-y-2">
                                 <label className="text-sm font-medium">Country</label>
                                 <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                     <option>United States</option>
                                     <option>Canada</option>
                                     <option>United Kingdom</option>
                                 </select>
                             </div>
                        </div>
                    </motion.div>
                )}

                {currentStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                        <div className="p-4 border border-accent/20 bg-accent/5 rounded-lg mb-4">
                            <p className="text-sm text-muted-foreground">This is a dummy checkout. No real payment will be processed.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Card Number</label>
                                <Input placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Expiry Date</label>
                                    <Input placeholder="MM/YY" defaultValue="12/25" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">CVC</label>
                                    <Input placeholder="123" defaultValue="123" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="mt-8 flex justify-between">
                    {currentStep > 1 && (
                        <Button variant="outline" onClick={() => setCurrentStep(prev => prev - 1)}>
                            Back
                        </Button>
                    )}
                    <Button 
                        className={currentStep === 1 ? "ml-auto" : ""} 
                        onClick={handleNext} 
                        isLoading={isProcessing}
                    >
                        {currentStep === 3 ? "Complete Order" : "Continue"}
                    </Button>
                </div>
            </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
             <div className="bg-secondary/30 rounded-xl p-6 sticky top-24">
                 <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                 <div className="space-y-4 mb-6">
                     {cart.map((item) => (
                         <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between text-sm">
                             <span className="text-muted-foreground flex-1 pr-4">
                                 {item.name} x {item.quantity}
                             </span>
                             <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                         </div>
                     ))}
                 </div>
                 <div className="border-t border-border pt-4 space-y-2">
                     <div className="flex justify-between text-sm">
                         <span className="text-muted-foreground">Subtotal</span>
                         <span>${totalPrice.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                         <span className="text-muted-foreground">Shipping</span>
                         <span>Free</span>
                     </div>
                     <div className="flex justify-between font-bold text-lg pt-2">
                         <span>Total</span>
                         <span>${totalPrice.toFixed(2)}</span>
                     </div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
}
