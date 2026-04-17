/* Admin panel — orders & reviews management */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  ShoppingBag,
  MessageSquare,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Star,
  LogIn,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Link } from "wouter";

const ORDER_STATUS_LABELS: Record<string, string> = {
  new: "Новый",
  processing: "В обработке",
  shipped: "Отправлен",
  delivered: "Доставлен",
  cancelled: "Отменён",
};

const ORDER_STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const REVIEW_STATUS_LABELS: Record<string, string> = {
  pending: "На модерации",
  approved: "Одобрен",
  rejected: "Отклонён",
};

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("orders");

  // Auth check
  const { data: user, isLoading: authLoading } = trpc.auth.me.useQuery();

  // Orders
  const {
    data: orders = [],
    isLoading: ordersLoading,
    refetch: refetchOrders,
  } = trpc.orders.list.useQuery(undefined, { enabled: user?.role === "admin" });

  const updateOrderStatus = trpc.orders.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Статус заказа обновлён");
      void refetchOrders();
    },
    onError: () => toast.error("Не удалось обновить статус"),
  });

  // Reviews
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = trpc.reviews.listAll.useQuery(undefined, { enabled: user?.role === "admin" });

  const updateReviewStatus = trpc.reviews.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Статус отзыва обновлён");
      void refetchReviews();
    },
    onError: () => toast.error("Не удалось обновить статус"),
  });

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-sm px-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-2xl text-foreground mb-2">Вход в систему</h1>
          <p className="text-muted-foreground mb-6">Для доступа к панели администратора необходимо войти в систему.</p>
          <Link href="/">
            <Button variant="outline" className="mr-3">На главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Not admin
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-sm px-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="font-serif text-2xl text-foreground mb-2">Доступ запрещён</h1>
          <p className="text-muted-foreground mb-6">У вас нет прав для доступа к панели администратора.</p>
          <Link href="/">
            <Button variant="outline">На главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  const newOrdersCount = orders.filter((o) => o.status === "new").length;
  const pendingReviewsCount = reviews.filter((r) => r.approved === "pending").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif text-xl text-foreground hover:text-primary transition-colors">
              Вторая жизнь
            </Link>
            <span className="text-muted-foreground/50">|</span>
            <span className="text-sm text-muted-foreground font-medium">Панель администратора</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.name || user.email}</span>
            <Link href="/">
              <Button variant="outline" size="sm">На сайт</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Всего заказов", value: orders.length, icon: <ShoppingBag className="w-5 h-5" />, color: "text-blue-600 bg-blue-50" },
            { label: "Новых заказов", value: newOrdersCount, icon: <Clock className="w-5 h-5" />, color: "text-yellow-600 bg-yellow-50" },
            { label: "Всего отзывов", value: reviews.length, icon: <MessageSquare className="w-5 h-5" />, color: "text-green-600 bg-green-50" },
            { label: "На модерации", value: pendingReviewsCount, icon: <Star className="w-5 h-5" />, color: "text-purple-600 bg-purple-50" },

          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="font-serif text-2xl text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="orders" className="gap-2">
              <Package className="w-4 h-4" />
              Заказы
              {newOrdersCount > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {newOrdersCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Отзывы
              {pendingReviewsCount > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingReviewsCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ORDERS TAB */}
          <TabsContent value="orders">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-foreground">Все заказы</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchOrders()}
                className="gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Обновить
              </Button>
            </div>

            {ordersLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Заказов пока нет</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">Заказ #{order.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status] || "bg-gray-100 text-gray-700"}`}>
                            {ORDER_STATUS_LABELS[order.status] || order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg text-foreground">{order.total} BYN</span>
                        <Select
                          value={order.status}
                          onValueChange={(val) =>
                            updateOrderStatus.mutate({ id: order.id, status: val as "new" | "processing" | "shipped" | "delivered" | "cancelled" })
                          }
                        >
                          <SelectTrigger className="w-40 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(ORDER_STATUS_LABELS).map(([val, label]) => (
                              <SelectItem key={val} value={val}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Customer info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Покупатель</p>
                        <p className="font-medium text-foreground">{order.customerName}</p>
                        <p className="text-muted-foreground">{order.customerEmail}</p>
                        {order.customerPhone && <p className="text-muted-foreground">{order.customerPhone}</p>}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Доставка</p>
                        <p className="font-medium text-foreground capitalize">{order.deliveryMethod}</p>
                        {order.deliveryAddress && <p className="text-muted-foreground">{order.deliveryAddress}</p>}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Оплата</p>
                        <p className="font-medium text-foreground capitalize">{order.paymentMethod}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="border-t border-border pt-3">
                      <p className="text-xs text-muted-foreground mb-2">Товары:</p>
                      <div className="space-y-1">
                        {(order.items as Array<{ name: string; quantity: number; price: number }>).map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-foreground">{item.name} × {item.quantity}</span>
                            <span className="text-muted-foreground">{item.price * item.quantity} BYN</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.notes && (
                      <div className="border-t border-border pt-3 mt-3">
                        <p className="text-xs text-muted-foreground mb-1">Комментарий:</p>
                        <p className="text-sm text-foreground italic">"{order.notes}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* REVIEWS TAB */}
          <TabsContent value="reviews">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-foreground">Все отзывы</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchReviews()}
                className="gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Обновить
              </Button>
            </div>

            {reviewsLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Отзывов пока нет</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-foreground">{review.name}</span>
                          <StarDisplay rating={review.rating} />
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            review.approved === "approved" ? "bg-green-100 text-green-700" :
                            review.approved === "rejected" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {REVIEW_STATUS_LABELS[review.approved] || review.approved}
                          </span>
                        </div>
                        {review.productName && (
                          <p className="text-xs text-primary mb-1">Товар: {review.productName}</p>
                        )}
                        <p className="text-sm text-muted-foreground leading-relaxed">"{review.text}"</p>
                        <p className="text-xs text-muted-foreground mt-2">{formatDate(review.createdAt)}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {review.approved !== "approved" && (
                          <Button
                            size="sm"
                            onClick={() => updateReviewStatus.mutate({ id: review.id, approved: "approved" })}
                            className="bg-green-600 hover:bg-green-700 text-white gap-1 h-8 text-xs"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Одобрить
                          </Button>
                        )}
                        {review.approved !== "rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateReviewStatus.mutate({ id: review.id, approved: "rejected" })}
                            className="border-red-200 text-red-600 hover:bg-red-50 gap-1 h-8 text-xs"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Отклонить
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
