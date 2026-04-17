/*
  About page — Eco-Minimalism design
*/
import { Leaf, Heart, Recycle, Globe } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/data";

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
                Она решила дать пластику вторую жизнь. Начав с экспериментов в домашней мастерской, Екатерина создала 
                первую коллекцию украшений из переработанного пластика. Каждое изделие — это произведение искусства и 
                забота о планете.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Сегодня Вторая жизнь — это не просто бренд украшений. Это движение за осознанное потребление и 
                экологичный образ жизни. Каждое украшение спасает пластик от свалки.
              </p>
              <Link href="/how-we-make">
                <Button>Узнать о процессе производства</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">Команда</p>
            <h2 className="font-serif text-3xl text-foreground mb-4">Люди за брендом</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Вторая жизнь создана людьми, которые верят в силу перемен и красоту в простом.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6">
                  <h3 className="font-serif text-xl text-foreground mb-1">{member.name}</h3>
                  <p className="text-accent text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">Ценности</p>
            <h2 className="font-serif text-3xl text-foreground mb-4">Наши принципы</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all text-center">
              <Recycle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-serif text-lg text-foreground mb-2">Переработка</h3>
              <p className="text-muted-foreground text-sm">
                Каждое украшение спасает пластик от свалки и даёт ему новую жизнь.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all text-center">
              <Leaf className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-serif text-lg text-foreground mb-2">Экология</h3>
              <p className="text-muted-foreground text-sm">
                Мы заботимся о планете и выбираем экологичные материалы и процессы.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all text-center">
              <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-serif text-lg text-foreground mb-2">Качество</h3>
              <p className="text-muted-foreground text-sm">
                Каждое украшение создаётся вручную с любовью и вниманием к деталям.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all text-center">
              <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-serif text-lg text-foreground mb-2">Прозрачность</h3>
              <p className="text-muted-foreground text-sm">
                Мы честны о том, откуда берётся материал и как создаются украшения.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">Влияние</p>
            <h2 className="font-serif text-3xl text-foreground mb-4">Вместе мы меняем мир</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="font-serif text-4xl text-accent mb-2">50 000+</p>
              <p className="text-muted-foreground">граммов пластика спасено</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl text-accent mb-2">2 000+</p>
              <p className="text-muted-foreground">счастливых клиентов</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl text-accent mb-2">100%</p>
              <p className="text-muted-foreground">переработанные материалы</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="font-serif text-3xl text-foreground mb-4">Присоединитесь к движению</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Каждое украшение — это выбор в пользу планеты. Выбирайте красоту, которая спасает мир.
          </p>
          <Link href="/catalog">
            <Button size="lg">Перейти в каталог</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
