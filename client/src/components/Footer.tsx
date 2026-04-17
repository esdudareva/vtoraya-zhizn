/* Footer — Eco-Minimalism, dark green background */
import { Link } from "wouter";
import { Leaf, Mail, Phone, Instagram, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Вы подписались на новинки!", {
      description: "Будем присылать только самое интересное.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-serif text-lg">Вторая жизнь</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Белорусский бренд украшений из переработанного пластика. Красота, которая не вредит планете.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/d.kattyyy" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://t.me/D_kattyyy" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-sm mb-4 text-primary-foreground/50 uppercase tracking-wider">Магазин</h4>
            <ul className="space-y-2">
              {[
                { href: "/catalog", label: "Каталог" },
                { href: "/how-we-make", label: "Как мы это делаем" },
                { href: "/faq", label: "FAQ" },
                { href: "/delivery", label: "Доставка и оплата" },
                { href: "/about", label: "О бренде" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-medium text-sm mb-4 text-primary-foreground/50 uppercase tracking-wider">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:2livejewplastikbel@gmail.com"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4 shrink-0" />
                  2livejewplastikbel@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+375291234567"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  +375 (29) 123-45-67
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2 text-primary-foreground/50 uppercase tracking-wider">Режим работы</h4>
              <p className="text-sm text-primary-foreground/70">Пн–Пт: 10:00–19:00</p>
              <p className="text-sm text-primary-foreground/70">Сб: 11:00–17:00</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium text-sm mb-4 text-primary-foreground/50 uppercase tracking-wider">Новинки</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Подпишитесь и первыми узнавайте о новых коллекциях и акциях.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-primary-foreground/30"
              />
              <Button type="submit" variant="secondary" size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground border-0">
                Подписаться
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © 2024 Вторая жизнь. Все права защищены.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">
              Условия использования
            </Link>
            <Link href="/privacy" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
