/* HowWeMake page — Eco-Minimalism */
import { processSteps } from "@/lib/data";
import { Leaf } from "lucide-react";

export default function HowWeMake() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-secondary border-b border-border py-16">
        <div className="container">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Производство</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Как мы это делаем</h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            От пластикового отхода до украшения — 6 шагов, которые превращают мусор в красоту.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl text-foreground mb-5">
                Каждое украшение — это история
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Мы используем пластик типов HDPE (2) и PP (5) — самые безопасные и широко распространённые виды. 
                Это бутылки для шампуня, контейнеры для еды, крышки от бутылок.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Весь процесс происходит в нашей небольшой мастерской в Минске. Мы не используем токсичных 
                химикатов и стараемся минимизировать любые отходы производства.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Каждое украшение уникально — потому что каждый кусочек пластика уникален. 
                Два одинаковых украшения невозможны.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/process-workshop-iVTWZSsu79CpwVvhWtWbyN.webp"
                alt="Мастерская"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Процесс</p>
            <h2 className="font-serif text-3xl text-foreground">6 шагов от отхода к украшению</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-lg font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process images */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/process-melting-DFHEiwcwYhJdLxs2fTWVmm.webp"
                alt="Плавление пластика"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-3xl text-foreground mb-5">
                Безопасность прежде всего
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Мы плавим пластик при строго контролируемой температуре. Для каждого типа пластика — 
                своя температура плавления, при которой не выделяются вредные вещества.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Мастерская оборудована системой вентиляции. Все мастера работают в защитных средствах.
              </p>
              <div className="flex items-center gap-2 text-primary">
                <Leaf className="w-4 h-4" />
                <span className="text-sm font-medium">Нулевые токсичные выбросы в атмосферу</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl mb-4">Какой пластик мы используем</h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              Мы принимаем только безопасные типы пластика и тщательно проверяем каждую партию
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { code: "2", name: "HDPE", desc: "Полиэтилен высокой плотности. Бутылки для шампуня, молока, контейнеры." },
              { code: "5", name: "PP", desc: "Полипропилен. Крышки от бутылок, контейнеры для еды, соломинки." },
              { code: "4", name: "LDPE", desc: "Полиэтилен низкой плотности. Пакеты, плёнки, мягкие флаконы." },
            ].map((plastic) => (
              <div key={plastic.code} className="bg-primary-foreground/10 rounded-xl p-5">
                <div className="w-12 h-12 rounded-full border-2 border-primary-foreground/40 flex items-center justify-center mb-3">
                  <span className="font-serif text-xl font-bold">{plastic.code}</span>
                </div>
                <h3 className="font-medium mb-2">{plastic.name}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{plastic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plastic donation */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-foreground mb-4">Сдайте пластик нам</h2>
            <p className="text-muted-foreground mb-6">
              Принесите чистый пластик типов 2, 4 или 5 в нашу мастерскую — и получите скидку на следующий заказ. 
              За каждые 500г пластика — скидка 5%.
            </p>
            <div className="bg-secondary rounded-xl p-6 text-left">
              <h3 className="font-medium text-foreground mb-3">Как это работает:</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary font-medium">1.</span> Соберите чистый пластик типов 2, 4 или 5</li>
                <li className="flex gap-2"><span className="text-primary font-medium">2.</span> Напишите нам, чтобы договориться о передаче</li>
                <li className="flex gap-2"><span className="text-primary font-medium">3.</span> Получите скидку на следующий заказ</li>
                <li className="flex gap-2"><span className="text-primary font-medium">4.</span> Ваш пластик станет новым украшением!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
