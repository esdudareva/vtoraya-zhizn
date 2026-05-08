import { Share2, Mail, MessageCircle, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareWishlistProps {
  wishlistUrl?: string;
  itemCount?: number;
}

export default function ShareWishlist({ wishlistUrl, itemCount = 0 }: ShareWishlistProps) {
  const baseUrl = window.location.origin;
  const url = wishlistUrl || `${baseUrl}/favorites`;
  const text = `Посмотри мои избранные украшения из переработанного пластика на Вторая жизнь! ${itemCount > 0 ? `У меня ${itemCount} избранных товаров.` : ""}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Ссылка скопирована в буфер обмена");
  };

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, "_blank");
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, "_blank");
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("Посмотри мои избранные украшения!");
    const body = encodeURIComponent(`${text}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-muted-foreground flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        Поделиться:
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="text-xs"
      >
        Копировать ссылку
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleShareWhatsApp}
        className="text-xs"
        title="Поделиться в WhatsApp"
      >
        WhatsApp
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleShareTelegram}
        className="text-xs"
        title="Поделиться в Telegram"
      >
        Telegram
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleShareFacebook}
        className="text-xs"
        title="Поделиться в Facebook"
      >
        <Facebook className="w-3 h-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleShareEmail}
        className="text-xs"
        title="Отправить по email"
      >
        <Mail className="w-3 h-3" />
      </Button>
    </div>
  );
}
