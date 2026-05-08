import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Package, Mail, LogOut, Send, Trash2, Edit2, BarChart3, TrendingUp, Users, Leaf } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth({ redirectOnUnauthenticated: true });
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"orders" | "subscribers" | "campaigns" | "statistics">("orders");
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignContent, setCampaignContent] = useState("");
  const [sendingCampaignId, setSendingCampaignId] = useState<number | null>(null);
  const [editingCampaignId, setEditingCampaignId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editContent, setEditContent] = useState("");

  // Fetch orders, subscribers, campaigns, and statistics
  const { data: orders, isLoading: ordersLoading } = trpc.orders.list.useQuery();
  const { data: subscribers, isLoading: subscribersLoading } = trpc.newsletter.list.useQuery();
  const { data: campaigns, isLoading: campaignsLoading, refetch: refetchCampaigns } = trpc.campaigns.list.useQuery();
  const { data: stats, isLoading: statsLoading } = trpc.admin.dashboard.useQuery();
  
  // Mutations
  const createCampaignMutation = trpc.campaigns.create.useMutation();
  const sendCampaignMutation = trpc.campaigns.send.useMutation();
  const deleteCampaignMutation = trpc.campaigns.delete.useMutation();
  const updateCampaignMutation = trpc.campaigns.update.useMutation();

  useEffect(() => {
    // Only redirect if loading is complete
    if (!loading) {
      if (!user || user.role !== "admin") {
        setLocation("/");
      }
    }
  }, [user, loading, setLocation]);

  // Show loading state while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  const handleCreateCampaign = async () => {
    if (!campaignTitle.trim() || !campaignSubject.trim() || !campaignContent.trim()) {
      toast.error("Заполните все поля");
      return;
    }

    try {
      await createCampaignMutation.mutateAsync({
        title: campaignTitle,
        subject: campaignSubject,
        content: campaignContent,
      });
      
      toast.success("Кампания создана");
      setCampaignTitle("");
      setCampaignSubject("");
      setCampaignContent("");
      setShowCampaignForm(false);
      refetchCampaigns();
    } catch (error) {
      toast.error("Ошибка при создании кампании");
      console.error(error);
    }
  };

  const handleSendCampaign = async (campaignId: number) => {
    setSendingCampaignId(campaignId);
    try {
      await sendCampaignMutation.mutateAsync({ id: campaignId });
      toast.success("Кампания отправлена подписчикам");
      refetchCampaigns();
    } catch (error) {
      toast.error("Ошибка при отправке кампании");
      console.error(error);
    } finally {
      setSendingCampaignId(null);
    }
  };

  const handleDeleteCampaign = async (campaignId: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту кампанию?")) {
      return;
    }
    try {
      await deleteCampaignMutation.mutateAsync({ id: campaignId });
      toast.success("Кампания удалена");
      refetchCampaigns();
    } catch (error) {
      toast.error("Ошибка при удалении кампании");
      console.error(error);
    }
  };

  const handleEditCampaign = (campaign: any) => {
    setEditingCampaignId(campaign.id);
    setEditTitle(campaign.title);
    setEditSubject(campaign.subject);
    setEditContent(campaign.content);
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editSubject.trim() || !editContent.trim()) {
      toast.error("Заполните все поля");
      return;
    }
    try {
      await updateCampaignMutation.mutateAsync({
        id: editingCampaignId!,
        title: editTitle,
        subject: editSubject,
        content: editContent,
      });
      toast.success("Кампания обновлена");
      setEditingCampaignId(null);
      refetchCampaigns();
    } catch (error) {
      toast.error("Ошибка при обновлении кампании");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-foreground mb-2">Админ-панель</h1>
          <p className="text-muted-foreground">Управление заказами, подписчиками и кампаниями</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
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
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === "subscribers"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="inline-block w-4 h-4 mr-2" />
            Подписчики ({subscribers?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === "campaigns"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Send className="inline-block w-4 h-4 mr-2" />
            Кампании ({campaigns?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("statistics")}
            className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === "statistics"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="inline-block w-4 h-4 mr-2" />
            Статистика
          </button>
        </div>

        {/* Statistics Tab */}
        {activeTab === "statistics" && (
          <div className="space-y-6">
            {statsLoading ? (
              <p className="text-muted-foreground text-center py-8">Загрузка статистики...</p>
            ) : stats ? (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        Всего заказов
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{stats.orders.total}</p>
                      <p className="text-xs text-muted-foreground mt-1">Сумма: ${stats.orders.totalRevenue}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        Подписчики
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{stats.newsletter.active}</p>
                      <p className="text-xs text-muted-foreground mt-1">Активных: {stats.newsletter.conversionRate}%</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Package className="w-4 h-4 text-purple-600" />
                        Товары
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{stats.products.total}</p>
                      <p className="text-xs text-muted-foreground mt-1">В каталоге</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-700" />
                        Пластик спасен
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{stats.environment.plasticSaved}</p>
                      <p className="text-xs text-muted-foreground mt-1">кг</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Orders by Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Заказы по статусам</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {stats.orders.byStatus.map((status: any) => (
                        <div key={status.status} className="flex justify-between items-center">
                          <span className="text-sm capitalize">{status.status}</span>
                          <span className="font-medium">{status.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Products */}
                <Card>
                  <CardHeader>
                    <CardTitle>Популярные товары</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.products.topProducts.length > 0 ? (
                        stats.products.topProducts.map((product: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center pb-2 border-b last:border-b-0">
                            <div>
                              <p className="font-medium text-sm">{product.productName || "Неизвестный товар"}</p>
                              <p className="text-xs text-muted-foreground">{product.orderCount} заказов</p>
                            </div>
                            <p className="font-semibold">${product.totalRevenue}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">Нет данных</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Site Analytics */}
                {stats.analytics && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Статистика сайта</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-2xl font-bold">{stats.analytics.totalPageViews}</p>
                          <p className="text-xs text-muted-foreground">Просмотров страниц</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{stats.analytics.uniquePages}</p>
                          <p className="text-xs text-muted-foreground">Уникальных страниц</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{stats.analytics.todayViews}</p>
                          <p className="text-xs text-muted-foreground">Просмотров сегодня</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{stats.analytics.topPages?.length || 0}</p>
                          <p className="text-xs text-muted-foreground">Популярных страниц</p>
                        </div>
                      </div>
                      {stats.analytics.topPages && stats.analytics.topPages.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium mb-3">Топ страницы:</p>
                          <div className="space-y-2">
                            {stats.analytics.topPages.map((page: any, idx: number) => (
                              <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground truncate">{page.page}</span>
                                <span className="font-medium">{page.views} просмотров</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Campaign Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Статистика кампаний</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-2xl font-bold">{stats.campaigns.total}</p>
                        <p className="text-xs text-muted-foreground">Всего кампаний</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{stats.campaigns.sent}</p>
                        <p className="text-xs text-muted-foreground">Отправлено</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{stats.campaigns.draft}</p>
                        <p className="text-xs text-muted-foreground">Черновиков</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Последние заказы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {stats.recentOrders.length > 0 ? (
                        stats.recentOrders.map((order: any) => (
                          <div key={order.id} className="flex justify-between items-center pb-2 border-b last:border-b-0 text-sm">
                            <div>
                              <p className="font-medium">{order.orderNumber}</p>
                              <p className="text-xs text-muted-foreground">{order.customerName}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${order.total}</p>
                              <p className="text-xs capitalize">{order.status}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">Нет заказов</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <p className="text-muted-foreground text-center py-8">Ошибка загрузки статистики</p>
            )}
          </div>
        )}

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

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <div className="space-y-6">
            {/* Create Campaign Form */}
            {!showCampaignForm ? (
              <Button
                onClick={() => setShowCampaignForm(true)}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                Создать кампанию
              </Button>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Создать новую кампанию</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Название кампании</label>
                    <Input
                      placeholder="Например: Летняя коллекция"
                      value={campaignTitle}
                      onChange={(e) => setCampaignTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Тема письма</label>
                    <Input
                      placeholder="Например: Новая коллекция украшений"
                      value={campaignSubject}
                      onChange={(e) => setCampaignSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Содержание письма</label>
                    <Textarea
                      placeholder="Напишите содержание письма..."
                      value={campaignContent}
                      onChange={(e) => setCampaignContent(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCreateCampaign}
                      disabled={createCampaignMutation.isPending}
                    >
                      {createCampaignMutation.isPending ? "Создание..." : "Создать"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCampaignForm(false);
                        setCampaignTitle("");
                        setCampaignSubject("");
                        setCampaignContent("");
                      }}
                    >
                      Отмена
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Edit Campaign Modal */}
            {editingCampaignId && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle>Редактировать кампанию</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Название кампании</label>
                    <Input
                      placeholder="Например: Летняя коллекция"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Тема письма</label>
                    <Input
                      placeholder="Например: Новая коллекция украшений"
                      value={editSubject}
                      onChange={(e) => setEditSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Содержание письма</label>
                    <Textarea
                      placeholder="Напишите содержание письма..."
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveEdit}
                      disabled={updateCampaignMutation.isPending}
                    >
                      {updateCampaignMutation.isPending ? "Сохранение..." : "Сохранить"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingCampaignId(null)}
                    >
                      Отмена
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Campaigns List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Все кампании
                </CardTitle>
              </CardHeader>
              <CardContent>
                {campaignsLoading ? (
                  <p className="text-muted-foreground text-center py-8">Загрузка...</p>
                ) : campaigns && campaigns.length > 0 ? (
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground">{campaign.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Тема: {campaign.subject}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {campaign.content}
                            </p>
                            <div className="flex gap-4 mt-3">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                campaign.status === "sent"
                                  ? "bg-green-100 text-green-800"
                                  : campaign.status === "draft"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {campaign.status === "draft"
                                  ? "Черновик"
                                  : campaign.status === "sent"
                                  ? "Отправлено"
                                  : "Отправляется"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Создано: {new Date(campaign.createdAt).toLocaleDateString("ru-RU")}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {campaign.status === "draft" && (
                              <>
                                <Button
                                  onClick={() => handleEditCampaign(campaign)}
                                  disabled={editingCampaignId === campaign.id}
                                  size="sm"
                                  variant="outline"
                                  className="gap-2"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  Редактировать
                                </Button>
                                <Button
                                  onClick={() => handleSendCampaign(campaign.id)}
                                  disabled={sendingCampaignId === campaign.id || sendCampaignMutation.isPending}
                                  size="sm"
                                  className="gap-2"
                                >
                                  <Send className="w-4 h-4" />
                                  {sendingCampaignId === campaign.id ? "Отправка..." : "Отправить"}
                                </Button>
                                <Button
                                  onClick={() => handleDeleteCampaign(campaign.id)}
                                  disabled={deleteCampaignMutation.isPending}
                                  size="sm"
                                  variant="destructive"
                                  className="gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Удалить
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">Кампаний нет</p>
                )}
              </CardContent>
            </Card>
          </div>
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
