/* Checkout page — Eco-Minimalism + tRPC */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { CheckCircle2, Leaf, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

type DeliveryMethod = "courier" | "pickup" | "post";
type PaymentMethod = "card" | "cash" | "erip";

export default function Checkout() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [,] = useLocation();
  const [step, setStep] = useState<"form" | "success">("form");
  const [orderNumber, setOrderNumber] = useState<string>("");

  const createOrder = trpc.orders.create.useMutation({
    onSuccess: (data) => {
      setOrderNumber(data.orderNumber ?? "");
      setStep("success");
      clearCart();
    },
    onError: (err) => {
      toast.error("Не удалось оформить заказ: " + err.message);
    },
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    comment: "",
  });
  const [delivery, setDelivery] = useState<DeliveryMethod>("courier");
  const [payment, setPayment] = useState<PaymentMethod>("card");

  const deliveryCost = totalPrice >= 60 ? 0 : 5;
  const total = totalPrice + deliveryCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      toast.error("Пожалуйста, заполните обязательные поля");
      return;
    }
    const deliveryAddress = delivery !== "pickup" && (form.city || form.address)
      ? [form.city, form.address].filter(Boolean).join(", ")
      : undefined;
    createOrder.mutate({
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      deliveryMethod: delivery,
      deliveryAddress,
      paymentMethod: payment,
      items: items.map(({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      })),
      subtotal: totalPrice,
      deliveryCost,
      total,
      notes: form.comment || undefined,
    });
  };

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-serif text-3xl text-foreground mb-3">Заказ оформлен!</h2>
          {orderNumber && (
            <p className="text-sm font-medium text-primary mb-2">Номер заказа: {orderNumber}</p>
          )}
          <p className="text-muted-foreground mb-2">
            Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 my-6">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">Ваш вклад в экологию</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Этим заказом вы помогли спасти пластик от свалки. Спасибо!
            </p>
          </div>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl mb-4">Корзина пуста</h2>
          <Link href="/catalog">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">В каталог</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container py-10">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-8">Оформление заказа</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-serif text-xl text-foreground mb-5">Контактные данные</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm text-muted-foreground mb-1.5 block">
                      Имя и фамилия *
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Анна Иванова"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm text-muted-foreground mb-1.5 block">
                      Телефон *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+375 (29) 000-00-00"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="email" className="text-sm text-muted-foreground mb-1.5 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="anna@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-serif text-xl text-foreground mb-5">Способ доставки</h2>
                <div className="space-y-3 mb-5">
                  {[
                    { value: "courier" as DeliveryMethod, label: "Курьер по Минску", desc: "1-2 дня, от 5 ₽ (бесплатно от 60 ₽)" },
                    { value: "pickup" as DeliveryMethod, label: "Самовывоз", desc: "г. Минск, ул. Примерная, 1 — бесплатно" },
                    { value: "post" as DeliveryMethod, label: "Белпочта / СДЭК", desc: "2-5 дней, по тарифам перевозчика" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        delivery === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={opt.value}
                        checked={delivery === opt.value}
                        onChange={() => setDelivery(opt.value)}
                        className="mt-0.5 accent-primary"
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {delivery !== "pickup" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm text-muted-foreground mb-1.5 block">Город</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Минск"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-sm text-muted-foreground mb-1.5 block">Адрес</Label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="ул. Примерная, 1, кв. 1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-serif text-xl text-foreground mb-5">Способ оплаты</h2>
                <div className="space-y-3">
                  {[
                    { value: "card" as PaymentMethod, label: "Банковская карта онлайн", desc: "Visa, Mastercard, Белкарт" },
                    { value: "erip" as PaymentMethod, label: "ЕРИП", desc: "Оплата через систему ЕРИП" },
                    { value: "cash" as PaymentMethod, label: "Наличными при получении", desc: "Только для курьерской доставки" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        payment === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={payment === opt.value}
                        onChange={() => setPayment(opt.value)}
                        className="mt-0.5 accent-primary"
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-serif text-xl text-foreground mb-4">Комментарий к заказу</h2>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Пожелания по упаковке, удобное время доставки и т.д."
                  className="w-full min-h-[100px] rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="font-serif text-xl text-foreground mb-5">Ваш заказ</h2>
                <div className="space-y-3 mb-5">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-secondary shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">× {quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-foreground shrink-0">
                        {(product.price * quantity).toFixed(2)} ₽
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Товары</span>
                    <span>{totalPrice.toFixed(2)} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span className={deliveryCost === 0 ? "text-primary" : ""}>
                      {deliveryCost === 0 ? "Бесплатно" : `${deliveryCost.toFixed(2)} ₽`}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                    <span>Итого</span>
                    <span>{total.toFixed(2)} ₽</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={createOrder.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  {createOrder.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Оформляем...</> : "Подтвердить заказ"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Нажимая кнопку, вы соглашаетесь с условиями использования
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
