import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, Leaf, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

type DeliveryMethod = "courier" | "pickup" | "post";
type PaymentMethod = "stripe" | "cash" | "erip";

export default function Checkout() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "success">("form");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrder = trpc.orders.create.useMutation({
    onSuccess: (data) => {
      setOrderNumber(data.orderNumber ?? "");
      setStep("success");
      clearCart();
    },
    onError: (err) => {
      toast.error("Не удалось оформить заказ: " + err.message);
      setIsProcessing(false);
    },
  });

  const createCheckoutSession = trpc.payment.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.open(data.url, "_blank");
        toast.success("Переходим на страницу оплаты...");
      }
    },
    onError: (err) => {
      toast.error("Ошибка при создании сессии платежа: " + err.message);
      setIsProcessing(false);
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
  const [payment, setPayment] = useState<PaymentMethod>("stripe");

  const deliveryCost = totalPrice >= 60 ? 0 : 5;
  const total = totalPrice + deliveryCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      toast.error("Пожалуйста, заполните обязательные поля");
      return;
    }

    setIsProcessing(true);

    if (payment === "stripe") {
      // Create Stripe checkout session
      createCheckoutSession.mutate({
        items: items.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        customerEmail: form.email,
        customerName: form.name,
        customerPhone: form.phone,
        deliveryMethod: delivery,
        deliveryAddress: form.address,
        subtotal: totalPrice,
        deliveryCost: deliveryCost,
        total: total,
      });
    } else {
      // Create order for cash/ERIP payment
      createOrder.mutate({
        items: items.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email,
        deliveryMethod: delivery,
        paymentMethod: payment,
        deliveryAddress: form.address,
        notes: form.comment,
        subtotal: totalPrice,
        deliveryCost: deliveryCost,
        total: total,
      });
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-foreground mb-2">Спасибо за заказ!</h1>
          <p className="text-muted-foreground mb-6">
            Номер вашего заказа: <span className="font-semibold text-foreground">{orderNumber}</span>
          </p>
          <p className="text-muted-foreground mb-8">
            Мы отправим подтверждение на вашу почту. Спасибо за то, что выбрали нас!
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <Leaf className="w-5 h-5 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-green-700">
              Вы спасли примерно <strong>250г пластика</strong> от попадания на свалку!
            </p>
          </div>
          <Link href="/">
            <Button className="w-full">Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl text-foreground mb-8">Оформление заказа</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Info */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="font-serif text-xl text-foreground mb-4">Ваши данные</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="font-serif text-xl text-foreground mb-4">Доставка</h2>
            <div className="space-y-3">
              {(["courier", "pickup", "post"] as const).map((method) => (
                <label key={method} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value={method}
                    checked={delivery === method}
                    onChange={(e) => setDelivery(e.target.value as DeliveryMethod)}
                    className="mr-3"
                  />
                  <span className="text-foreground">
                    {method === "courier" && "Курьер (5 ₽)"}
                    {method === "pickup" && "Самовывоз (бесплатно)"}
                    {method === "post" && "Почта (5 ₽)"}
                  </span>
                </label>
              ))}
            </div>
            {delivery === "courier" && (
              <div className="mt-4 space-y-3">
                <Input
                  placeholder="Город"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                <Input
                  placeholder="Адрес"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="font-serif text-xl text-foreground mb-4">Способ оплаты</h2>
            <div className="space-y-3">
              {(["stripe", "cash", "erip"] as const).map((method) => (
                <label key={method} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={payment === method}
                    onChange={(e) => setPayment(e.target.value as PaymentMethod)}
                    className="mr-3"
                  />
                  <span className="text-foreground">
                    {method === "stripe" && "Карта (Stripe)"}
                    {method === "cash" && "Наличные при получении"}
                    {method === "erip" && "ЕРИП"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <Label htmlFor="comment">Комментарий к заказу</Label>
            <textarea
              id="comment"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full mt-2 p-3 border border-border rounded-md bg-background text-foreground"
              rows={3}
              placeholder="Ваши пожелания..."
            />
          </div>

          {/* Order Summary */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h2 className="font-serif text-xl text-foreground mb-4">Итого</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-foreground">
                <span>Товары ({totalItems}):</span>
                <span>{totalPrice} ₽</span>
              </div>
              {deliveryCost > 0 && (
                <div className="flex justify-between text-foreground">
                  <span>Доставка:</span>
                  <span>{deliveryCost} ₽</span>
                </div>
              )}
              <div className="border-t border-green-200 pt-2 flex justify-between font-semibold text-foreground">
                <span>Итого:</span>
                <span>{total} ₽</span>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isProcessing || items.length === 0}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Обработка...
                </>
              ) : (
                `Оформить заказ (${total} ₽)`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
