import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Leaf, Package, LogOut } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";

export default function Profile() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { data: orders } = trpc.orders.list.useQuery();

  useEffect(() => {
    if (!user) setLocation("/");
  }, [user, setLocation]);

  if (!user) return null;

  const totalOrders = orders?.length || 0;
  const plasticSaved = user.plasticSaved ? parseFloat(user.plasticSaved.toString()) : 0;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-foreground mb-2">Мой кабинет</h1>
          <p className="text-muted-foreground">Добро пожаловать, {user.name}!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Мои заказы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">всего заказов</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Leaf className="w-4 h-4" /> Пластика спасено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{plasticSaved.toFixed(1)} кг</div>
              <p className="text-xs text-muted-foreground mt-1">благодаря вашим покупкам</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Участник с</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{user.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}</div>
              <p className="text-xs text-muted-foreground mt-1">года</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders History */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              История заказов
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-foreground">Заказ {order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('ru-RU')}</p>
                      </div>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status === 'new' ? 'Новый' :
                         order.status === 'processing' ? 'В обработке' :
                         order.status === 'shipped' ? 'Отправлен' :
                         order.status === 'delivered' ? 'Доставлен' : order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Сумма: <span className="font-medium text-foreground">{order.total} ₽</span></p>
                    <p className="text-xs text-muted-foreground">Доставка: {order.deliveryMethod}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">У вас ещё нет заказов</p>
            )}
          </CardContent>
        </Card>

        {/* Profile Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Информация профиля</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Имя</p>
              <p className="text-foreground">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-foreground">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Роль</p>
              <p className="text-foreground capitalize">{user.role === 'admin' ? 'Администратор' : 'Покупатель'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
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
  );
}
