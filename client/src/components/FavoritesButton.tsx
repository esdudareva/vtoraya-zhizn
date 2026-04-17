import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

export default function FavoritesButton({ productId, className = "" }: { productId: number; className?: string }) {
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(false);

  const { data: isFavorite } = trpc.favorites.isFavorite.useQuery(
    { productId },
    { enabled: !!user }
  );

  const addFav = trpc.favorites.add.useMutation({
    onSuccess: () => {
      setIsFav(true);
      toast.success("Добавлено в избранное");
    },
  });

  const removeFav = trpc.favorites.remove.useMutation({
    onSuccess: () => {
      setIsFav(false);
      toast.success("Удалено из избранного");
    },
  });

  useEffect(() => {
    if (isFavorite !== undefined) setIsFav(isFavorite);
  }, [isFavorite]);

  const handleClick = () => {
    if (!user) {
      toast.error("Пожалуйста, войдите в аккаунт");
      return;
    }
    if (isFav) {
      removeFav.mutate({ productId });
    } else {
      addFav.mutate({ productId });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={addFav.isPending || removeFav.isPending}
      className={`transition-colors ${className}`}
    >
      <Heart
        className={`w-5 h-5 ${isFav ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`}
      />
    </button>
  );
}
