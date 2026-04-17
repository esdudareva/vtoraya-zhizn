/*
  About page — Eco-Minimalism design
*/
import { Leaf, Heart, Recycle, Globe } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-secondary border-b border-border py-16">
        <div className="container">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Бренд</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">О нас</h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            История белорусского бренда украшений, который верит: красота и экология неразделимы.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/about-team-8xbZE3tBUxja9yvPDvHgJE.webp"
                alt="Екатерина Дударева, основатель"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">История</p>
              <h2 className="font-serif text-3xl text-foreground mb-5">Как всё началось</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                В 2021 году Екатерина Дударева, дизайнер украшений с 8-летним опытом, задумалась: сколько пластика 
                выбрасывается каждый день? Только в Минске — тысячи тонн ежегодно.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Екатерина начала эксперименты в своей мастерской: плавила крышки от бутылок, шампуньные флаконы, 
                пластиковые контейнеры. Результат превзошёл ожидания — из «мусора» получались яркие, 
                лёгкие и абсолютно уникальные украшения.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Так родился бренд «Вторая жизнь» — с миссией доказать, что экологичность может быть красивой, 
                а красота — экологичной.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/about-team-8xbZE3tBUxja9yvPDvHgJE.webp"
                    alt="Екатерина"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">Екатерина Дударева</div>
                  <div className="text-xs text-muted-foreground">Основатель и главный мастер</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="font-serif text-3xl text-foreground mb-12 text-center">Наши ценности</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-medium text-lg text-foreground mb-2">Экология</h3>
              <p className="text-muted-foreground text-sm">
                Каждое украшение спасает пластик от свалки и даёт ему вторую жизнь. Мы верим в циклическую экономику.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-medium text-lg text-foreground mb-2">Качество</h3>
              <p className="text-muted-foreground text-sm">
                Каждое украшение создаётся вручную с любовью. Мы не спешим и не идём на компромиссы.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-medium text-lg text-foreground mb-2">Прозрачность</h3>
              <p className="text-muted-foreground text-sm">
                Мы рассказываем о каждом этапе производства. Вы знаете, откуда пришёл пластик в вашем украшении.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-serif text-3xl text-foreground mb-12 text-center">Наш вклад</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif text-primary mb-2">2500+</div>
              <p className="text-muted-foreground">кг пластика переработано</p>
            </div>
            <div>
              <div className="text-4xl font-serif text-primary mb-2">5000+</div>
              <p className="text-muted-foreground">украшений создано</p>
            </div>
            <div>
              <div className="text-4xl font-serif text-primary mb-2">8000+</div>
              <p className="text-muted-foreground">счастливых клиентов</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container text-center">
          <h2 className="font-serif text-3xl text-foreground mb-4">Присоединяйтесь к движению</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Каждое украшение — это выбор в пользу планеты. Носите красоту, которая не вредит природе.
          </p>
          <Link href="/catalog">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Смотреть каталог
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
