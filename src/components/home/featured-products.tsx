"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden bg-linear-to-b from-secondary/30 to-background">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-linear-to-r from-accent/20 to-primary/20 border border-accent/30 text-accent font-semibold text-sm mb-6 shadow-lg"
          >
            <TrendingUp className="w-4 h-4" />
            Hot Picks
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-primary"
          >
            Trending Now
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Our most popular products, loved by thousands. Quality you can trust, design you can feel.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
            <Link href="/products">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                    <Button 
                      size="lg" 
                      className="px-10 h-14 rounded-full text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all group"
                    >
                        View All Products
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </Link>
        </motion.div>
      </div>
    </section>
  );
}
