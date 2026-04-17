/* Cart page — Eco-Minimalism */
import { Link } from "wouter";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const delivery = totalPrice >= 60 ? 0 : 5;
  const totalWithDelivery = totalPrice + delivery;
  const totalSaved = items.reduce((sum, i) => sum + i.product.savedGrams * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="font-serif text-2xl text-foreground mb-3">Корзина пуста</h2>
          <p className="text-muted-foreground mb-6">
            Добавьте украшения из нашего каталога, и они появятся здесь.
          </p>
          <Link href="/catalog">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              Перейти в каталог <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container py-10">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">Корзина</h1>
        <p className="text-muted-foreground mb-8">{totalItems} {totalItems === 1 ? "украшение" : "украшений"}</p>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                <Link href={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-secondary shrink-0"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-serif text-base text-foreground hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{product.colorLabel}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-primary mt-1">
                        <Leaf className="w-3 h-3" />
                        Спасено {product.savedGrams * quantity}г
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-semibold text-foreground">
                      {(product.price * quantity).toFixed(2)} ₽
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h2 className="font-serif text-xl text-foreground mb-5">Итого</h2>
              
              {/* Eco impact */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-5">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm font-medium">Ваш вклад в экологию</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Этим заказом вы спасёте <strong className="text-foreground">{totalSaved}г</strong> пластика от свалки
                </p>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({totalItems})</span>
                  <span className="text-foreground">{totalPrice.toFixed(2)} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className={delivery === 0 ? "text-primary font-medium" : "text-foreground"}>
                    {delivery === 0 ? "Бесплатно" : `${delivery.toFixed(2)} ₽`}
                  </span>
                </div>
                {delivery > 0 && (
                  <p className="text-xs text-muted-foreground">
                    До бесплатной доставки: {(60 - totalPrice).toFixed(2)} ₽
                  </p>
                )}
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span className="text-foreground">Итого</span>
                  <span className="text-foreground text-lg">{totalWithDelivery.toFixed(2)} ₽</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 mb-3">
                  Оформить заказ <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/catalog">
                <Button variant="outline" className="w-full border-border text-muted-foreground">
                  Продолжить покупки
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
