import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              MNT<span className="text-accent">.Store</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience the future of shopping with our curated collection of premium products. 
              Quality meets innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products?category=electronics" className="hover:text-accent transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=fashion" className="hover:text-accent transition-colors">Fashion</Link></li>
              <li><Link href="/products?category=home-living" className="hover:text-accent transition-colors">Home & Living</Link></li>
              <li><Link href="/products?category=sports" className="hover:text-accent transition-colors">Sports</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Github className="h-5 w-5" /></a>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} MNT Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
