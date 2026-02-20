"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Truck, RefreshCw, Check, AlertCircle } from "lucide-react";
import { products } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Helper layout for Images */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-secondary"
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all",
                  selectedImage === index ? "border-accent ring-2 ring-accent/20" : "border-transparent opacity-70 hover:opacity-100"
                )}
                onClick={() => setSelectedImage(index)}
              >
                <Image src={img} alt="Thumbnail" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              {product.category}
            </span>
            {product.stock <= 10 && (
                <Badge variant="destructive" className="h-5">Low Stock: Only {product.stock} left</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-500">
               {[...Array(5)].map((_, i) => (
                 <Star 
                    key={i} 
                    className={cn(
                        "h-5 w-5", 
                        i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"
                    )} 
                 />
               ))}
               <span className="ml-2 text-foreground font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="mb-8 p-6 bg-secondary/30 rounded-xl border border-secondary">
             <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                    </span>
                )}
             </div>
             <p className="text-sm text-muted-foreground">
                Typically delivered within 3-5 business days.
             </p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-4 mb-8">
            <h3 className="font-semibold">Key Features:</h3>
            <ul className="space-y-2">
                {product.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent" /> {feature}
                    </li>
                )) || <li className="text-sm text-muted">No specific features listed.</li>}
            </ul>
          </div>

          <div className="mt-auto space-y-4">
            <Button size="lg" className="w-full text-lg h-14" onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground py-4 border-t border-border">
                <span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Free Shipping</span>
                <span className="flex items-center gap-2"><RefreshCw className="h-4 w-4" /> 30-Day Returns</span>
                <span className="flex items-center gap-2"><AlertCircle className="h-4 w-4" /> 2-Year Warranty</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Might also like section could go here */}
    </div>
  );
}
