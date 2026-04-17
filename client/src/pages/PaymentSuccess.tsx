import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, Leaf, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function PaymentSuccess() {
  const [location] = useLocation();
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const params = new URLSearchParams(location.split("?")[1]);
  const sessionId = params.get("session_id");

  const getSessionStatus = trpc.payment.getSessionStatus.useQuery(
    { sessionId: sessionId || "" },
    {
      enabled: !!sessionId,
    }
  );

  useEffect(() => {
    if (getSessionStatus.data) {
      if (getSessionStatus.data.status === "paid") {
        setOrderNumber(`STR-${sessionId?.slice(0, 12).toUpperCase()}`);
      }
      setIsLoading(false);
    } else if (getSessionStatus.isError) {
      setIsLoading(false);
    }
  }, [getSessionStatus.data, getSessionStatus.isError, sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-foreground" />
      </div>
    );
  }

  if (!sessionId || getSessionStatus.data?.status !== "paid") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Ошибка платежа</h1>
          <p className="text-muted-foreground mb-8">
            Не удалось подтвердить платёж. Пожалуйста, попробуйте снова.
          </p>
          <Link href="/checkout">
            <Button>Вернуться к оформлению</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-foreground mb-2">Платёж успешен!</h1>
        <p className="text-muted-foreground mb-6">
          Спасибо за ваш заказ. Номер заказа: <span className="font-semibold text-foreground">{orderNumber}</span>
        </p>
        <p className="text-muted-foreground mb-8">
          Подтверждение будет отправлено на вашу почту в ближайшее время.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <Leaf className="w-5 h-5 text-green-600 mx-auto mb-2" />
          <p className="text-sm text-green-700">
            Вы спасли примерно <strong>250г пластика</strong> от попадания на свалку!
          </p>
        </div>
        <Link href="/">
          <Button className="w-full">Вернуться на главную</Button>
        </Link>
      </div>
    </div>
  );
}
