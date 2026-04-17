/* ProductCard — Eco-Minimalism design */
import { Link } from "wouter";
import { ShoppingCart, Heart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/data";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} добавлено в корзину`);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 cursor-pointer">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Eco badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-primary/90 text-primary-foreground">
              <Leaf className="w-3 h-3" />
              Спасено {product.savedGrams}г
            </span>
          </div>
          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
          >
            <Heart className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="mb-1">
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wide font-medium">
              {product.category === "necklace" ? "Колье" :
               product.category === "earrings" ? "Серьги" :
               product.category === "bracelet" ? "Браслет" : "Набор"}
            </Badge>
          </div>
          <h3 className="font-serif text-base text-foreground mb-1 leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            Цвет: {product.colorLabel}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground text-lg">
              {product.price.toFixed(2)} ₽
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
