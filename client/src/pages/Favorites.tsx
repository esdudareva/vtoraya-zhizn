import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Link, useLocation } from "wouter";
import { Heart, ArrowRight } from "lucide-react";

export default function Favorites() {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();
  const { data: favorites = [] } = trpc.favorites.list.useQuery(undefined, { enabled: !!user });

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container text-center py-20">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg mb-6">Пожалуйста, войдите в аккаунт, чтобы просмотреть избранное</p>
          <a href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              Войти в аккаунт
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        <div className="mb-12">
          <h1 className="font-serif text-4xl text-foreground mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500" />
            Мои избранные украшения
          </h1>
          <p className="text-muted-foreground">Товары, которые вам понравились</p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav: any) => (
              <ProductCard key={fav.productId} product={fav.product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-6">Вы ещё не добавили товары в избранное</p>
            <Link href="/catalog">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                Перейти в каталог <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
