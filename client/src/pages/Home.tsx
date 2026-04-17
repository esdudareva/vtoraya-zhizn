/* 
  Home page — Eco-Minimalism design
  Sections: Hero, Stats, Featured Products, About, Values, Process teaser, Newsletter
*/
import { Link } from "wouter";
import { ArrowRight, Leaf, Recycle, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const featuredProducts = products.filter((p) => p.featured);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Вы подписались на новинки!");
    setEmail("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[85vh]">
          {/* Left: Text */}
          <div className="flex flex-col justify-center px-6 py-20 lg:px-16 xl:px-24 bg-background">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-accent uppercase tracking-widest mb-6">
              <Leaf className="w-3.5 h-3.5" />
              Белорусский эко-бренд
            </div>
            <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl text-foreground leading-[1.05] mb-6">
              Украшения<br />
              <em className="not-italic text-primary">из пластика,</em><br />
              который спасли
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-10">
              Каждое украшение — это история пластика, который мог оказаться на свалке. 
              Мы даём ему вторую жизнь в виде красивых, уникальных изделий ручной работы.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/catalog">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8">
                  Перейти в каталог
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/how-we-make">
                <Button size="lg" variant="outline" className="border-foreground/20 text-foreground hover:bg-secondary gap-2 px-8">
                  Узнать больше
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative min-h-[400px] lg:min-h-0">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/hero-banner-SCJE7YKS58y6g9cKRoPaNv.webp"
              alt="Украшения из переработанного пластика"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent lg:from-transparent" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 46, suffix: " кг", label: "пластика спасено" },
              { value: 200, suffix: "+", label: "украшений создано" },
              { value: 150, suffix: "+", label: "довольных клиентов" },
              { value: 3, suffix: " года", label: "работаем с любовью" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-4xl md:text-5xl mb-1">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Коллекция</p>
              <h2 className="font-serif text-4xl text-foreground">Избранные украшения</h2>
              <p className="text-muted-foreground mt-2">Самые популярные изделия нашей коллекции</p>
            </div>
            <Link href="/catalog" className="hidden md:flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
              Смотреть все <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10 md:hidden">
            <Link href="/catalog">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
                Смотреть все украшения <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/about-team-8xbZE3tBUxja9yvPDvHgJE.webp"
                alt="Мастер за работой"
                className="rounded-2xl w-full aspect-[4/3] object-cover shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-xl p-4 shadow-lg hidden lg:block">
                <div className="font-serif text-2xl">3 года</div>
                <div className="text-xs text-accent-foreground/80">создаём украшения</div>
              </div>
            </div>
            <div>
              <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">О бренде</p>
              <h2 className="font-serif text-4xl text-foreground mb-6">
                Красота и экологичность — рядом
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                «Вторая жизнь» — белорусский бренд украшений, созданный из переработанного пластика. 
                Мы верим, что красота и экологичность могут идти рука об руку.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Каждое украшение — результат тщательной ручной работы. Мы собираем пластик, 
                который другие выбрасывают, моем его, дробим, плавим и создаём лёгкие, яркие украшения. 
                Никаких вредных выбросов. Только забота о природе.
              </p>
              <Link href="/how-we-make">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Как мы это делаем <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Принципы</p>
            <h2 className="font-serif text-4xl text-foreground">Наши ценности</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Recycle className="w-6 h-6" />,
                title: "Экологичность",
                text: "Мы используем только переработанный пластик и экологичные материалы для фурнитуры. Каждое украшение — это вклад в чистоту планеты.",
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Ручная работа",
                text: "Каждое украшение создаётся вручную с любовью и вниманием к деталям. Никаких конвейеров — только мастерство и забота.",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Прозрачность",
                text: "Мы рассказываем историю каждого пластика и откуда он был собран. Вы знаете, что носите, и гордитесь этим.",
              },
            ].map((value) => (
              <div key={value.title} className="group p-8 rounded-2xl border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {value.icon}
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary-foreground/60 text-sm font-medium uppercase tracking-widest mb-3">Процесс</p>
              <h2 className="font-serif text-4xl mb-6">От отхода к украшению</h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                Путь каждого украшения начинается с пластика, который был выброшен. 
                Мы собираем, сортируем, плавим и создаём — 6 шагов от мусора к красоте.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Сбор", "Сортировка", "Дробление", "Плавление", "Шлифовка", "Сборка"].map((step, i) => (
                  <span key={step} className="flex items-center gap-2 text-sm bg-primary-foreground/10 rounded-full px-3 py-1">
                    <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    {step}
                  </span>
                ))}
              </div>
              <Link href="/how-we-make">
                <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2">
                  Подробнее о процессе <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/process-workshop-iVTWZSsu79CpwVvhWtWbyN.webp"
                alt="Процесс создания украшений"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">Новинки</p>
            <h2 className="font-serif text-4xl text-foreground mb-4">Подпишитесь на новинки</h2>
            <p className="text-muted-foreground mb-8">
              Будьте первыми, кто узнает о новых коллекциях, специальных предложениях и экологических инициативах.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                Подписаться
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
