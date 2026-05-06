import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Package, Mail, LogOut } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"orders" | "subscribers">("orders");

  // Fetch orders and subscribers
  const { data: orders, isLoading: ordersLoading } = trpc.orders.list.useQuery();
  const { data: subscribers, isLoading: subscribersLoading } = trpc.newsletter.list.useQuery();

  useEffect(() => {
    if (!user) setLocation("/");
    if (user && user.role !== "admin") setLocation("/");
  }, [user, setLocation]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-foreground mb-2">Админ-панель</h1>
          <p className="text-muted-foreground">Управление заказами и подписчиками</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === "orders"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="inline-block w-4 h-4 mr-2" />
            Заказы
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === "subscribers"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="inline-block w-4 h-4 mr-2" />
            Подписчики ({subscribers?.length || 0})
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Все заказы
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <p className="text-muted-foreground text-center py-8">Загрузка...</p>
              ) : orders && orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">Номер</th>
                        <th className="text-left py-3 px-4 font-medium">Покупатель</th>
                        <th className="text-left py-3 px-4 font-medium">Email</th>
                        <th className="text-left py-3 px-4 font-medium">Сумма</th>
                        <th className="text-left py-3 px-4 font-medium">Статус</th>
                        <th className="text-left py-3 px-4 font-medium">Дата</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{order.orderNumber}</td>
                          <td className="py-3 px-4">{order.customerName}</td>
                          <td className="py-3 px-4 text-sm">{order.customerEmail}</td>
                          <td className="py-3 px-4 font-medium">{order.total} ₽</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {order.status === "new"
                                ? "Новый"
                                : order.status === "processing"
                                ? "В обработке"
                                : order.status === "shipped"
                                ? "Отправлен"
                                : order.status === "delivered"
                                ? "Доставлен"
                                : order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Заказов нет</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Subscribers Tab */}
        {activeTab === "subscribers" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Подписчики рассылки
              </CardTitle>
            </CardHeader>
            <CardContent>
              {subscribersLoading ? (
                <p className="text-muted-foreground text-center py-8">Загрузка...</p>
              ) : subscribers && subscribers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">Email</th>
                        <th className="text-left py-3 px-4 font-medium">Статус</th>
                        <th className="text-left py-3 px-4 font-medium">Подписан</th>
                        <th className="text-left py-3 px-4 font-medium">Отписан</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((subscriber) => (
                        <tr
                          key={subscriber.id}
                          className="border-b border-border hover:bg-muted/50"
                        >
                          <td className="py-3 px-4">{subscriber.email}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full ${
                                subscriber.isActive === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {subscriber.isActive === "active" ? "Активен" : "Неактивен"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {new Date(subscriber.subscribedAt).toLocaleDateString("ru-RU")}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {subscriber.unsubscribedAt
                              ? new Date(subscriber.unsubscribedAt).toLocaleDateString("ru-RU")
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Подписчиков нет</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Logout */}
        <div className="mt-8">
          <Button
            onClick={() => {
              logout();
              setLocation("/");
            }}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
}
