"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SLIDES = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Elevate Your Style",
    description: "Discover the latest trends in summer fashion. Breathable fabrics, vibrant colors, and timeless designs tailored for you.",
    image: "https://images.unsplash.com/photo-1542272617-08f086326927?q=80&w=2673&auto=format&fit=crop",
    gradient: "from-blue-500/30 via-purple-500/20 to-transparent",
    accentColor: "#4f6bff",
    cta: "Shop Collection",
    link: "/products"
  },
  {
    id: 2,
    title: "Next-Gen Electronics",
    subtitle: "Future is Now",
    description: "Experience the power of latest technology. Smart home devices, high-performance laptops, and more at your fingertips.",
    image: "https://images.unsplash.com/photo-1498049381961-a5814eba28ea?q=80&w=2568&auto=format&fit=crop",
    gradient: "from-cyan-500/30 via-blue-500/20 to-transparent",
    accentColor: "#06b6d4",
    cta: "Explore Gadgets",
    link: "/products?category=electronics"
  },
  {
    id: 3,
    title: "Modern Living",
    subtitle: "Redefine Comfort",
    description: "Transform your living space with our premium home essentials range. Minimalist, functional, and beautiful designs.",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2718&auto=format&fit=crop",
    gradient: "from-orange-500/30 via-pink-500/20 to-transparent",
    accentColor: "#f97316",
    cta: "View Home Decor",
    link: "/products?category=home"
  }
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const slideCount = SLIDES.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
  };
  
  // Autoslide effect
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
           key={current}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95 }}
           transition={{ duration: 0.8, ease: "easeInOut" }}
           className="absolute inset-0"
        >
            {/* Background Image with Overlay */}
            <div className="relative w-full h-full">
               <Image
                 src={SLIDES[current].image}
                 alt={SLIDES[current].title}
                 fill
                 className="object-cover transition-transform duration-[10s] ease-linear scale-105 animate-slow-zoom"
                 priority
               />
               {/* Gradient Overlays */}
               <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/60 to-transparent" />
               <div className={`absolute inset-0 bg-linear-to-br ${SLIDES[current].gradient} mix-blend-overlay`} />
               
               {/* Decorative Elements */}
               <motion.div 
                 animate={{ 
                   rotate: 360,
                   scale: [1, 1.1, 1]
                 }}
                 transition={{ 
                   rotate: { duration: 50, repeat: Infinity, ease: "linear" },
                   scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                 }}
                 className="absolute -top-40 -right-40 w-96 h-96 rounded-full border-2 border-white/10 blur-sm"
               />
               <motion.div 
                 animate={{ 
                   rotate: -360,
                   scale: [1, 1.2, 1]
                 }}
                 transition={{ 
                   rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                   scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                 }}
                 className="absolute bottom-20 -left-20 w-64 h-64 rounded-full border-2 border-white/10 blur-sm"
               />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center z-10">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-3xl space-y-8">
                        {/* Subtitle Badge */}
                        <motion.div
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <span 
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium text-sm tracking-wide uppercase shadow-lg"
                                style={{ boxShadow: `0 0 20px ${SLIDES[current].accentColor}40` }}
                            >
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                {SLIDES[current].subtitle}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                             initial={{ opacity: 0, y: 30 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                             className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1]"
                        >
                            <span className="inline-block">
                                {SLIDES[current].title.split(' ').map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                                        className="inline-block mr-4"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.6, duration: 0.8 }}
                             className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed backdrop-blur-sm"
                        >
                            {SLIDES[current].description}
                        </motion.p>
                        
                        {/* CTA Buttons */}
                        <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.8, duration: 0.8 }}
                             className="flex flex-wrap gap-4 pt-4"
                        >
                             <Link href={SLIDES[current].link}>
                                 <motion.div
                                     whileHover={{ scale: 1.05, y: -2 }}
                                     whileTap={{ scale: 0.98 }}
                                 >
                                     <Button 
                                         size="lg" 
                                         className="rounded-full h-14 px-8 text-lg bg-white text-primary hover:bg-white/90 shadow-2xl transition-all group"
                                         style={{ boxShadow: `0 10px 40px ${SLIDES[current].accentColor}60` }}
                                     >
                                         {SLIDES[current].cta} 
                                         <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                     </Button>
                                 </motion.div>
                             </Link>
                             <motion.div
                                 whileHover={{ scale: 1.05, y: -2 }}
                                 whileTap={{ scale: 0.98 }}
                             >
                                 <Button 
                                     variant="outline" 
                                     size="lg" 
                                     className="rounded-full h-14 px-8 text-lg border-2 border-white/40 text-white hover:bg-white/20 backdrop-blur-md transition-all"
                                 >
                                    Learn More
                                 </Button>
                             </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Hidden by default, shown on hover */}
      <div className="hidden md:block">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.1 }}
            className="absolute top-1/2 left-6 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out translate-x-[-20px] group-hover:translate-x-0"
        >
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={prevSlide}
                className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white hover:bg-white/25 hover:border-white/50 transition-all shadow-xl"
            >
                <ChevronLeft className="h-8 w-8" />
            </Button>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.1 }}
            className="absolute top-1/2 right-6 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out translate-x-[20px] group-hover:translate-x-0"
        >
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={nextSlide}
                className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white hover:bg-white/25 hover:border-white/50 transition-all shadow-xl"
            >
                <ChevronRight className="h-8 w-8" />
            </Button>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, index) => (
             <motion.button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`relative h-2 rounded-full transition-all duration-500 ${
                    index === current 
                        ? "w-12 bg-white shadow-lg" 
                        : "w-2 bg-white/50 hover:bg-white/70"
                }`}
             >
                {index === current && (
                    <motion.div
                        layoutId="activeSlide"
                        className="absolute inset-0 rounded-full bg-white"
                        style={{ boxShadow: `0 0 20px ${SLIDES[current].accentColor}` }}
                    />
                )}
             </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-white/30 z-20"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 6, ease: "linear" }}
        key={current}
      />
    </section>
  );
}
