"use client";

import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/layout/cart-drawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
