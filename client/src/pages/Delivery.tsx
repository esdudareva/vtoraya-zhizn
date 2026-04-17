/* Delivery page — Eco-Minimalism */
import { Truck, MapPin, Package, CreditCard, RefreshCw, Clock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Delivery() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-secondary border-b border-border py-16">
        <div className="container">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Информация</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Доставка и оплата</h1>
          <p className="text-muted-foreground max-w-xl">
            Доставляем украшения по всей Беларуси. Бесплатная доставка при заказе от 60 ₽.
          </p>
        </div>
      </div>

      <div className="container py-16">
        {/* Delivery methods */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Способы доставки</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Truck className="w-6 h-6" />,
                title: "Курьер по Минску",
                price: "5 ₽",
                free: "Бесплатно от 60 ₽",
                time: "1–2 рабочих дня",
                desc: "Курьер доставит заказ в удобное для вас время. Звонок за 30 минут до доставки.",
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Самовывоз",
                price: "Бесплатно",
                free: "",
                time: "В день готовности",
                desc: "Заберите заказ самостоятельно по адресу: г. Минск, ул. Примерная, 1. Пн–Пт 10:00–19:00, Сб 11:00–17:00.",
              },
              {
                icon: <Package className="w-6 h-6" />,
                title: "Белпочта / СДЭК",
                price: "По тарифам",
                free: "",
                time: "2–5 рабочих дней",
                desc: "Доставка по всей Беларуси. Стоимость рассчитывается по тарифам перевозчика в зависимости от города.",
              },
            ].map((method) => (
              <div key={method.title} className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-all hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {method.icon}
                </div>
                <h3 className="font-serif text-xl text-foreground mb-1">{method.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-semibold text-foreground">{method.price}</span>
                  {method.free && (
                    <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                      {method.free}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  {method.time}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Способы оплаты</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <CreditCard className="w-5 h-5" />, title: "Банковская карта", desc: "Visa, Mastercard, Белкарт онлайн" },
              { icon: <span className="text-base font-bold">₽</span>, title: "ЕРИП", desc: "Оплата через систему ЕРИП" },
              { icon: <span className="text-base">💵</span>, title: "Наличные", desc: "При курьерской доставке или самовывозе" },
            ].map((method) => (
              <div key={method.title} className="flex items-center gap-4 p-4 bg-secondary rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {method.icon}
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">{method.title}</div>
                  <div className="text-xs text-muted-foreground">{method.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Returns */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Возврат и обмен</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-foreground">Условия возврата</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-medium mt-0.5">✓</span>
                  Возврат в течение 14 дней с момента получения
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium mt-0.5">✓</span>
                  Товар должен быть в оригинальной упаковке без следов использования
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium mt-0.5">✓</span>
                  Стоимость обратной доставки оплачивает покупатель
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium mt-0.5">✓</span>
                  Деньги возвращаем в течение 5 рабочих дней
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-serif text-xl text-foreground mb-4">Как оформить возврат</h3>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  Напишите нам на email с указанием номера заказа и причины возврата
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  Мы подтвердим возврат и сообщим адрес для отправки
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  Отправьте товар в оригинальной упаковке
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                  После получения товара вернём деньги на вашу карту
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Packaging */}
        <div className="bg-secondary rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-3xl text-foreground mb-4">Экологичная упаковка</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Мы упаковываем украшения в крафтовые коробочки из переработанного картона с тканевым мешочком 
                из натурального льна. Никакого пластика в упаковке!
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                При желании добавим подарочную открытку с вашим текстом — абсолютно бесплатно. 
                Укажите текст в комментарии к заказу.
              </p>
              <Link href="/catalog">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Выбрать украшение
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: "📦", text: "Крафтовая коробочка" },
                { emoji: "🌿", text: "Льняной мешочек" },
                { emoji: "♻️", text: "Переработанный картон" },
                { emoji: "💌", text: "Подарочная открытка" },
              ].map((item) => (
                <div key={item.text} className="bg-card rounded-xl p-4 border border-border text-center">
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className="text-sm text-muted-foreground">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
