/* About page — Eco-Minimalism */
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
                alt="Анна Ковалёва, основатель"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">История</p>
              <h2 className="font-serif text-3xl text-foreground mb-5">Как всё началось</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                В 2021 году Анна Ковалёва, дизайнер украшений с 8-летним опытом, задумалась: сколько пластика 
                выбрасывается каждый день? Только в Минске — тысячи тонн ежегодно.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Анна начала эксперименты в своей мастерской: плавила крышки от бутылок, шампуньные флаконы, 
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
                    alt="Анна"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">Анна Ковалёва</div>
                  <div className="text-xs text-muted-foreground">Основатель и главный мастер</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-foreground/60 text-sm font-medium uppercase tracking-widest mb-4">Миссия</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              «Мы хотим изменить отношение людей к пластику — показать, что это не просто мусор, 
              а ресурс с огромным потенциалом»
            </h2>
            <p className="text-primary-foreground/80 italic">— Анна Ковалёва, основатель</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Ценности</p>
            <h2 className="font-serif text-3xl text-foreground">Во что мы верим</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Recycle className="w-6 h-6" />,
                title: "Переработка",
                text: "Каждый кусочек пластика может получить вторую жизнь. Мы это доказываем каждый день.",
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Ручная работа",
                text: "Никаких конвейеров. Каждое украшение создаётся руками мастера с любовью.",
              },
              {
                icon: <Leaf className="w-6 h-6" />,
                title: "Экология",
                text: "Мы не просто делаем украшения — мы меняем культуру потребления.",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Прозрачность",
                text: "Мы открыто рассказываем о процессе, материалах и происхождении каждого изделия.",
              },
            ].map((value) => (
              <div key={value.title} className="p-6 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Результат</p>
            <h2 className="font-serif text-3xl text-foreground">Наш вклад в экологию</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "46 кг", label: "пластика спасено от свалки" },
              { value: "200+", label: "украшений создано вручную" },
              { value: "150+", label: "счастливых клиентов" },
              { value: "0", label: "токсичных выбросов в производстве" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="font-serif text-3xl text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">Мастерская</p>
              <h2 className="font-serif text-3xl text-foreground mb-5">Где рождаются украшения</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Наша мастерская находится в Минске. Небольшое, но уютное пространство, где каждый день 
                происходит маленькое чудо — пластик превращается в украшения.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Мы открыты для посещений по предварительной записи. Приходите, посмотрите на процесс 
                создания украшений своими глазами и выберите что-то особенное прямо в мастерской.
              </p>
              <div className="bg-secondary rounded-xl p-4 mb-6">
                <div className="text-sm font-medium text-foreground mb-1">Адрес мастерской</div>
                <div className="text-sm text-muted-foreground">г. Минск, ул. Примерная, 1</div>
                <div className="text-sm text-muted-foreground mt-1">Пн–Пт: 10:00–19:00, Сб: 11:00–17:00</div>
              </div>
              <Link href="/catalog">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Смотреть украшения
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/process-workshop-iVTWZSsu79CpwVvhWtWbyN.webp"
                alt="Мастерская Вторая жизнь"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Станьте частью движения</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Каждая покупка — это голос за экологичное будущее. Носите украшения с историей.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/catalog">
              <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Перейти в каталог
              </Button>
            </Link>
            <Link href="/how-we-make">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Узнать о процессе
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
