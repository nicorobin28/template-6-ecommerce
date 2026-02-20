"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/mock-data";
import { ArrowRight, Sparkles } from "lucide-react";

export function CategoryShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4"
             >
               <Sparkles className="w-4 h-4" />
               Explore Collections
             </motion.div>
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">
               Shop by Category
             </h2>
             <p className="text-lg text-muted-foreground">
               Explore our wide range of premium products tailored to your lifestyle.
             </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/products" 
              className="group inline-flex items-center gap-2 font-semibold text-accent mt-6 md:mt-0 hover:gap-3 transition-all"
            >
               View All Categories 
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} href={`/products?category=${category.slug}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative h-[320px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/50 to-transparent" />
                
                {/* Glassmorphism Card */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="absolute inset-x-6 bottom-6 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 group-hover:bg-white/20 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      {category.name}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed opacity-90">
                      {category.description}
                  </p>
                  
                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
