"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    toggleCart();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-[70] flex flex-col border-l border-border"
          >
            <div className="p-4 flex items-center justify-between border-b border-border">
              <h2 className="text-lg font-semibold flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" /> Shopping Cart
              </h2>
              <Button variant="ghost" size="icon" onClick={toggleCart}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground">Your cart is empty.</p>
                  <Button variant="outline" onClick={toggleCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex space-x-4 bg-secondary/30 p-3 rounded-lg"
                  >
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0 bg-white">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-muted-foreground text-xs mt-1">
                          {item.selectedSize && `Size: ${item.selectedSize} `}
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-sm font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                            </span>
                             <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border p-4 space-y-4 bg-background">
                <div className="flex items-center justify-between text-base font-medium">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
