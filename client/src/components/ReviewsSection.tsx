/* ReviewsSection — tRPC + Eco-Minimalism design */
import { useState } from "react";
import { Star, Quote, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";

// Seed reviews shown while DB is empty
const seedReviews = [
  { id: -1, name: "Мария К.", rating: 5, text: "Заказала колье «Гармония» и просто влюбилась! Качество отличное, упаковка очень красивая. Приятно осознавать, что украшение сделано из переработанного пластика.", productName: 'Колье "Гармония"', createdAt: new Date("2025-04-12") },
  { id: -2, name: "Анастасия В.", rating: 5, text: "Серьги «Лепесток» — просто чудо! Лёгкие, яркие, необычные. Все подруги спрашивают, где купила.", productName: 'Серьги "Лепесток"', createdAt: new Date("2025-03-03") },
  { id: -3, name: "Екатерина Л.", rating: 5, text: "Купила браслет «Океан» в подарок маме. Она в восторге! Доставка быстрая, упаковка экологичная — всё продумано до мелочей.", productName: 'Браслет "Океан"', createdAt: new Date("2025-02-18") },
  { id: -4, name: "Ольга П.", rating: 4, text: "Очень интересная концепция! Украшения действительно уникальные. Колье «Поток» ношу каждый день.", productName: 'Колье "Поток"', createdAt: new Date("2025-01-05") },
  { id: -5, name: "Дарья С.", rating: 5, text: "Заказывала набор в подарок на Новый год. Всё пришло вовремя, упаковано с любовью. Обязательно вернусь!", productName: undefined, createdAt: new Date("2024-12-20") },
  { id: -6, name: "Виктория Н.", rating: 5, text: "Брошь «Лист» — настоящее произведение искусства. Детали прожилок просто невероятные. Ношу на пальто, и все обращают внимание.", productName: 'Брошь "Лист"', createdAt: new Date("2024-11-08") },
];

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={onChange ? "button" : undefined}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              star <= (hover || rating)
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

type ReviewItem = {
  id: number;
  name: string;
  rating: number;
  text: string;
  productName?: string | null;
  createdAt: Date | string;
};

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm shrink-0">
            {initials(review.name)}
          </div>
          <div>
            <p className="font-medium text-sm text-foreground">{review.name}</p>
            <p className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <Quote className="w-5 h-5 text-primary/20 shrink-0" />
      </div>

      <StarRating rating={review.rating} />

      <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>

      {review.productName && (
        <p className="text-xs text-primary font-medium border-t border-border pt-3">
          Товар: {review.productName}
        </p>
      )}
    </motion.div>
  );
}

export default function ReviewsSection() {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [form, setForm] = useState({ name: "", text: "", product: "" });

  const { data: dbReviews = [] } = trpc.reviews.listApproved.useQuery();

  const submitMutation = trpc.reviews.submit.useMutation({
    onSuccess: () => {
      toast.success("Спасибо за отзыв!", { description: "Ваш отзыв отправлен на модерацию." });
      setForm({ name: "", text: "", product: "" });
      setRating(5);
      setShowForm(false);
    },
    onError: () => toast.error("Не удалось отправить отзыв. Попробуйте позже."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      toast.error("Заполните имя и текст отзыва");
      return;
    }
    submitMutation.mutate({ name: form.name.trim(), rating, text: form.text.trim(), product: form.product.trim() || undefined });
  };

  // Merge DB reviews with seed reviews (seed shown when DB has no matching entries)
  const allReviews: ReviewItem[] = [
    ...dbReviews,
    ...seedReviews.filter((s) => !dbReviews.some((d) => d.name === s.name)),
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">Отзывы</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
              Что говорят<br />наши покупатели
            </h2>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground self-start md:self-auto"
          >
            {showForm ? "Отмена" : "Оставить отзыв"}
          </Button>
        </div>

        {/* Review form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="md:col-span-2">
                  <h3 className="font-serif text-xl text-foreground mb-1">Ваш отзыв</h3>
                  <p className="text-sm text-muted-foreground">Поделитесь впечатлениями о нашем украшении</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-name">Ваше имя *</Label>
                  <Input
                    id="review-name"
                    placeholder="Мария К."
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-product">Название товара (необязательно)</Label>
                  <Input
                    id="review-product"
                    placeholder='Колье "Гармония"'
                    value={form.product}
                    onChange={(e) => setForm({ ...form, product: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Оценка *</Label>
                  <StarRating rating={rating} onChange={setRating} />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="review-text">Текст отзыва *</Label>
                  <Textarea
                    id="review-text"
                    placeholder="Расскажите о вашем опыте..."
                    rows={4}
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    required
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <Button type="submit" disabled={submitMutation.isPending} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    {submitMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Отправка...</> : <><Send className="w-4 h-4" /> Отправить отзыв</>}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-10">
          {[
            { value: "4.9", label: "Средняя оценка" },
            { value: "120+", label: "Довольных покупателей" },
            { value: "98%", label: "Рекомендуют нас" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-3xl text-primary mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
