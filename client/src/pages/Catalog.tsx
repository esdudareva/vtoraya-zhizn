/* Catalog page — Eco-Minimalism */
import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";

const sortOptions = [
  { value: "default", label: "По умолчанию" },
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "saved-desc", label: "Больше пластика спасено" },
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showSort, setShowSort] = useState(false);

  const filtered = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "saved-desc") return b.savedGrams - a.savedGrams;
      return 0;
    });

  const currentSort = sortOptions.find((s) => s.value === sortBy)!;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-secondary border-b border-border py-12">
        <div className="container">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Магазин</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">Каталог украшений</h1>
          <p className="text-muted-foreground">
            {products.length} украшений из переработанного пластика ручной работы
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-border hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg px-4 py-2 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {currentSort.label}
              <ChevronDown className={`w-4 h-4 transition-transform ${showSort ? "rotate-180" : ""}`} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[200px]">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      sortBy === opt.value ? "text-primary font-medium" : "text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Показано {filtered.length} украшений
        </p>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">В этой категории пока нет украшений</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setActiveCategory("all")}
            >
              Показать все
            </Button>
          </div>
        )}

        {/* Custom order banner */}
        <div className="mt-16 bg-secondary rounded-2xl p-8 md:p-12 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
            Не нашли то, что искали?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Мы создаём украшения на заказ по вашим пожеланиям. Выберите цвет, форму и размер — 
            и мы сделаем уникальное украшение специально для вас.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Заказать индивидуально
          </Button>
        </div>
      </div>
    </div>
  );
}
