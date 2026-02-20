import { Suspense } from "react";
import { ProductListing } from "@/components/product/product-listing";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading products...</div>}>
      <ProductListing />
    </Suspense>
  );
}
