/* FAQ page — Eco-Minimalism */
import { useState } from "react";
import { ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqItems } from "@/lib/data";
import { Link } from "wouter";

function AccordionItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${isOpen ? "border-primary/30 shadow-sm" : "border-border"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-secondary/50 transition-colors"
      >
        <span className={`font-medium text-sm md:text-base leading-snug ${isOpen ? "text-primary" : "text-foreground"}`}>
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-muted-foreground text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-secondary border-b border-border py-16">
        <div className="container">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Помощь</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Часто задаваемые вопросы</h1>
          <p className="text-muted-foreground max-w-xl">
            Ответы на самые популярные вопросы о наших украшениях, доставке и экологической миссии.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-secondary rounded-2xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-2xl text-foreground mb-3">Не нашли ответ?</h3>
            <p className="text-muted-foreground mb-6">
              Напишите нам — мы ответим в течение рабочего дня.
            </p>
            <a href="mailto:2livejewplastikbel@gmail.com">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Mail className="w-4 h-4" />
                Написать нам
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
