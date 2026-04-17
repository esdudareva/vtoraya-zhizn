import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import FilterSidebar, { FilterState } from "@/components/FilterSidebar";
import { products, categories } from "@/lib/data";

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [10, 100],
    colors: [],
    materials: [],
    sortBy: "newest",
  });

  // Фильтрация и сортировка товаров
  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      // Фильтр по категории
      if (activeCategory !== "all" && p.category !== activeCategory) return false;

      // Фильтр по цене
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;

      // Фильтр по цвету
      if (filters.colors.length > 0 && !filters.colors.includes(p.color)) return false;

      // Фильтр по материалу (простая проверка по содержанию в описании материала)
      if (filters.materials.length > 0) {
        const hasMaterial = filters.materials.some((m) => {
          if (m === "recycled-plastic") return p.material.includes("Переработанный пластик");
          if (m === "silver-hardware") return p.material.includes("серебристая");
          if (m === "gold-hardware") return p.material.includes("золотистая");
          if (m === "leather") return p.material.includes("кожа");
          if (m === "beads") return p.material.includes("бусины");
          return false;
        });
        if (!hasMaterial) return false;
      }

      return true;
    });

    // Сортировка
    result.sort((a, b) => {
      if (filters.sortBy === "price-low") return a.price - b.price;
      if (filters.sortBy === "price-high") return b.price - a.price;
      if (filters.sortBy === "popular") return b.savedGrams - a.savedGrams;
      // newest — по умолчанию (сохраняем порядок из data.ts)
      return 0;
    });

    return result;
  }, [activeCategory, filters]);

  const handleResetFilters = () => {
    setFilters({
      priceRange: [10, 100],
      colors: [],
      materials: [],
      sortBy: "newest",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-secondary border-b border-border py-12">
        <div className="container">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">Магазин</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">Каталог украшений</h1>
          <p className="text-muted-foreground">
            {filtered.length} из {products.length} украшений
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Category filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={activeCategory === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveCategory("all")}
            >
              Все
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Mobile filter button */}
        <div className="md:hidden mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фильтры
          </Button>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar filters (desktop) */}
          <div className="hidden md:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Products grid */}
          <div className="md:col-span-3">
            {/* Mobile filters (modal) */}
            {showFilters && (
              <div className="md:hidden mb-6 p-4 bg-card rounded-xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg text-foreground">Фильтры</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  onReset={handleResetFilters}
                />
              </div>
            )}

            {/* Results */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Товары не найдены. Попробуйте изменить фильтры.
                </p>
                <Button variant="outline" onClick={handleResetFilters}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
