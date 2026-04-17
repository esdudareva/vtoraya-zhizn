/* 
  Navbar — Eco-Minimalism design
  Dark green primary, beige background, DM Serif Display logo
*/
import { Link, useLocation } from "wouter";
import { ShoppingCart, Heart, Search, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/_core/hooks/useAuth";

const navLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/how-we-make", label: "Как мы это делаем" },
  { href: "/faq", label: "FAQ" },
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "О нас" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-base font-normal text-foreground group-hover:text-primary transition-colors">
                Вторая жизнь
              </div>
              <div className="text-[10px] text-muted-foreground tracking-wide uppercase">
                Украшения из пластика
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors hover:text-primary ${
                  location === link.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="w-4 h-4" />
            </Button>
            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Heart className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            {user ? (
              <Link href="/profile" className="hidden md:block">
                <Button variant="outline" size="sm" className="ml-2 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Профиль
                </Button>
              </Link>
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button variant="outline" size="sm" className="ml-2 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Вход
                </Button>
              </Link>
            )}
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm py-1 transition-colors hover:text-primary ${
                  location === link.href ? "text-primary font-medium" : "text-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full mt-2 border-primary text-primary">
                Вход
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
