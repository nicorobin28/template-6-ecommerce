"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group bg-card rounded-xl border border-border overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.stock <= 5 && (
            <Badge variant="destructive" className="absolute top-2 left-2">
                Low Stock
            </Badge>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
             <Badge variant="accent" className="absolute top-2 right-2">
                Sale
            </Badge>
        )}
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
             <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full hover:scale-110 transition-transform" 
                onClick={() => addToCart(product)}
                title="Add to Cart"
             >
                <ShoppingCart className="h-5 w-5" />
             </Button>
             <Link href={`/products/${product.id}`}>
                 <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full hover:scale-110 transition-transform"
                    title="View Details"
                >
                    <Eye className="h-5 w-5" />
                </Button>
             </Link>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                {product.category}
            </span>
            <div className="flex items-center text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs font-medium ml-1">{product.rating}</span>
            </div>
        </div>
        <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
            </h3>
        </Link>
        
        <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
                 {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                    </span>
                 )}
                <span className="text-xl font-bold">
                    ${product.price.toFixed(2)}
                </span>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
