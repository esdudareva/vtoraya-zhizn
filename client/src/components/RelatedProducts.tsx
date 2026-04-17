import { useMemo } from "react";
import { Link } from "wouter";
import ProductCard from "@/components/ProductCard";
import { Product, products } from "@/lib/data";

interface RelatedProductsProps {
  currentProduct: Product;
  limit?: number;
}

export default function RelatedProducts({ currentProduct, limit = 4 }: RelatedProductsProps) {
  const relatedProducts = useMemo(() => {
    // Находим товары с тем же цветом или материалом
    const related = products
      .filter((p) => p.id !== currentProduct.id) // Исключаем текущий товар
      .map((p) => {
        let score = 0;

        // Бонус за совпадение цвета (вес: 2)
        if (p.color === currentProduct.color) score += 2;

        // Бонус за совпадение категории (вес: 1)
        if (p.category === currentProduct.category) score += 1;

        // Бонус за совпадение материала (вес: 1.5)
        if (p.material === currentProduct.material) score += 1.5;

        // Бонус за похожую цену (вес: 0.5)
        const priceDiff = Math.abs(p.price - currentProduct.price);
        if (priceDiff <= 10) score += 0.5;

        return { product: p, score };
      })
      .filter((item) => item.score > 0) // Только товары с совпадениями
      .sort((a, b) => b.score - a.score) // Сортируем по релевантности
      .slice(0, limit) // Берём топ N товаров
      .map((item) => item.product);

    return related;
  }, [currentProduct, limit]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <div className="mb-12">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
            Рекомендации
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Похожие украшения
          </h2>
          <p className="text-muted-foreground mt-3">
            Товары с похожим цветом, материалом и стилем
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link href="/catalog" className="inline-block">
            <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Смотреть весь каталог
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
