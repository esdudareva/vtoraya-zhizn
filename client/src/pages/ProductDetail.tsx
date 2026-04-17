/* ProductDetail page — Eco-Minimalism */
import { useParams, Link } from "wouter";
import { ArrowLeft, ShoppingCart, Heart, Leaf, Shield, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/data";
import { toast } from "sonner";

import CommentsSection from "@/components/CommentsSection";
import FavoritesButton from "@/components/FavoritesButton";
import RelatedProducts from "@/components/RelatedProducts";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl mb-4">Украшение не найдено</h2>
          <Link href="/catalog">
            <Button>Вернуться в каталог</Button>
          </Link>
        </div>
      </div>
    );
  }



  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} добавлено в корзину`);
  };

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-foreground transition-colors">Каталог</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-primary text-primary-foreground">
                <Leaf className="w-3.5 h-3.5" />
                Спасено {product.savedGrams}г пластика
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <Badge variant="secondary" className="w-fit mb-3 text-xs uppercase tracking-wide">
              {product.category === "necklace" ? "Колье" :
               product.category === "earrings" ? "Серьги" :
               product.category === "bracelet" ? "Браслет" : "Набор"}
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">{product.name}</h1>
            <p className="text-muted-foreground text-sm mb-4">Цвет: {product.colorLabel}</p>
            <div className="text-3xl font-semibold text-foreground mb-6">
              {product.price.toFixed(2)} ₽
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Details */}
            <div className="bg-secondary rounded-xl p-5 mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Материал</span>
                <span className="text-foreground font-medium text-right max-w-[60%]">{product.material}</span>
              </div>
              {product.length && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Длина</span>
                  <span className="text-foreground font-medium">{product.length}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Наличие</span>
                <span className={`font-medium ${product.inStock ? "text-primary" : "text-destructive"}`}>
                  {product.inStock ? "В наличии" : "Нет в наличии"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4" />
                В корзину
              </Button>
              <FavoritesButton productId={product.id} className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors" />
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Shield className="w-4 h-4" />, text: "Гарантия качества" },
                { icon: <Truck className="w-4 h-4" />, text: "Доставка по РБ" },
                { icon: <RefreshCw className="w-4 h-4" />, text: "Возврат 14 дней" },
              ].map((g) => (
                <div key={g.text} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-secondary">
                  <div className="text-primary">{g.icon}</div>
                  <span className="text-xs text-muted-foreground leading-tight">{g.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="my-20">
          <CommentsSection productId={product.id} />
        </div>

        {/* Related Products */}
        <div className="my-20">
          <RelatedProducts currentProduct={product} limit={4} />
        </div>
      </div>
    </div>
  );
}
