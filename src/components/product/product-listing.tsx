"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products, categories } from "@/data/mock-data";
import { Product, SortOption } from "@/types";

export function ProductListing() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("search");

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let result = products;

    // Filter by Category
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by Price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0; // Newest (using default order as proxy)
      }
    });

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, priceRange, sortBy]);
  
  // Sync URL params with local state if changed externally (optional, but good for UX)
  useEffect(() => {
     if(initialCategory !== activeCategory) {
         setActiveCategory(initialCategory);
     }
     if(initialSearch !== searchQuery) {
         setSearchQuery(initialSearch || "");
     }
  }, [initialCategory, initialSearch]);


  const clearFilters = () => {
    setActiveCategory(null);
    setSearchQuery("");
    setPriceRange([0, 1000]);
    setSortBy("newest");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>

        {/* Filters Sidebar */}
        <div
          className={`
            fixed inset-0 z-50 bg-background p-6 transition-transform duration-300 transform
            md:relative md:transform-none md:z-0 md:bg-transparent md:p-0 md:w-64 md:block
            ${isFilterOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          <div className="flex items-center justify-between md:hidden mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-8 sticky top-24">
            {/* Search */}
            <div>
              <h3 className="font-semibold mb-3">Search</h3>
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                <div
                    className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${!activeCategory ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                    onClick={() => setActiveCategory(null)}
                >
                    All Categories
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${
                      activeCategory === cat.slug
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => setActiveCategory(cat.slug)}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Max Price: ${priceRange[1]}</h3>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            {/* Reset */}
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} results
            </p>
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                <select
                    className="bg-transparent border border-input rounded-md text-sm p-2 focus:ring-2 focus:ring-ring"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No products found matching your criteria.
            </div>
          ) : (
            <motion.div 
                layout 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
