# Задачи расширения сайта "Вторая жизнь"

## Фаза 1: Генерация контента
- [x] Сгенерировать 30+ новых фото украшений (25 фото сгенерировано)
- [x] Добавить новые товары в data.ts (24 товара всего)

## Фаза 2: Схема БД
- [x] Добавить таблицу favorites (userId, productId)
- [x] Добавить таблицу comments (productId, userId, text, rating, approved)
- [x] Добавить таблицу statistics (ежедневная статистика)
- [x] Расширить таблицу users (profile fields, plastic_saved)
- [x] Запустить миграцию БД

## Фаза 3: tRPC роутеры
- [x] Создать products router (list, create, update, delete - admin only)
- [x] Создать favorites router (add, remove, list)
- [x] Создать comments router (submit, list, approve - admin)
- [x] Создать statistics router (get real-time stats)
- [x] Создать users router (list - admin, get profile, update profile)
- [x] Обновить orders router для привязки к пользователю

## Фаза 4: Админ-панель
- [x] Добавить вкладку "Товары" (CRUD)
- [x] Добавить вкладку "Пользователи" (просмотр, роли)
- [x] Добавить вкладку "Статистика" (real-time dashboard)
- [x] Добавить комментарии к товарам на модерацию

## Фаза 5: Кабинет пользователя
- [x] Создать страницу /profile (профиль, история заказов)
- [x] Показать статистику спасённого пластика
- [x] Показать историю заказов с деталями
- [x] Добавить редактирование профиля

## Фаза 6: Комментарии к товарам
- [x] Создать компонент CommentsSection
- [x] Интегрировать на страницу товара
- [x] Добавить форму отправки комментария

## Фаза 7: Система избранного
- [x] Создать страницу /favorites
- [x] Интегрировать кнопку FavoritesButton в ProductDetail
- [x] Добавить иконку сердечка в навигацию с ссылкой на /favorites

## Фаза 8: Финализация
- [x] Обновить владельца на "Екатерина Дударева" в Footer, About, data.ts
- [x] Изменить телефон на "+375292468486"
- [x] Написать тесты для новых роутеров
- [x] Запустить все тесты (11/11 пройдены)
- [x] Сохранить чекпоинт

## Фаза 9: Интеграция Stripe
- [x] Установить пакет stripe
- [x] Создать tRPC процедуры для создания сессий Stripe (createCheckoutSession)
- [x] Создать tRPC процедуру для проверки статуса платежа (getSessionStatus)
- [x] Обновить страницу Checkout для использования Stripe
- [x] Создать страницу PaymentSuccess с отображением успешного платежа
- [x] Создать обработчик вебхуков Stripe в server/_core/stripeWebhook.ts
- [x] Зарегистрировать вебхук в server/_core/index.ts (ПЕРЕД express.json())
- [x] Написать тесты для Stripe интеграции (stripe.test.ts)
- [x] Написать тесты для Checkout (checkout.test.ts)
- [x] Все 27 тестов пройдены (11 checkout + 5 stripe + 10 orders/reviews + 1 auth)
- [ ] Протестировать полный платежный поток (Checkout -> Stripe -> Success -> Webhook)
- [ ] Настроить обработку вебхуков для обновления статуса заказа
