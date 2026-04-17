/* Privacy — Eco-Minimalism design */
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary/5 border-b border-border py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest">Документы</p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Политика конфиденциальности
            </h1>
            <p className="text-muted-foreground">
              Последнее обновление: 1 января 2025 года
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-10">

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">1. Введение</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Магазин «Вторая жизнь» (далее — «мы», «наш») уважает вашу конфиденциальность и обязуется защищать ваши персональные данные. Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем информацию, которую вы предоставляете при использовании нашего сайта и совершении покупок.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">2. Какие данные мы собираем</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  При оформлении заказа и использовании сайта мы можем собирать следующие данные:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Контактные данные", items: ["Имя и фамилия", "Адрес электронной почты", "Номер телефона"] },
                    { title: "Данные доставки", items: ["Почтовый адрес", "Город и страна", "Индекс"] },
                    { title: "Данные о заказах", items: ["История покупок", "Предпочтения товаров", "Отзывы"] },
                    { title: "Технические данные", items: ["IP-адрес", "Тип браузера", "Cookies"] },
                  ].map((group) => (
                    <div key={group.title} className="bg-secondary/30 rounded-xl p-4">
                      <h4 className="font-medium text-sm text-foreground mb-2">{group.title}</h4>
                      <ul className="space-y-1">
                        {group.items.map((item) => (
                          <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">3. Цели обработки данных</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">Мы используем ваши данные для:</p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>Обработки и выполнения ваших заказов.</li>
                  <li>Отправки подтверждений заказов и уведомлений о доставке.</li>
                  <li>Ответов на ваши вопросы и обращения в службу поддержки.</li>
                  <li>Отправки информационных рассылок (только с вашего согласия).</li>
                  <li>Улучшения работы сайта и качества обслуживания.</li>
                  <li>Соблюдения требований законодательства Республики Беларусь.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">4. Передача данных третьим лицам</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением следующих случаев:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5 mt-3">
                  <li><strong className="text-foreground">Службы доставки</strong> — для выполнения заказа (Белпочта, СДЭК, курьерские службы).</li>
                  <li><strong className="text-foreground">Платёжные системы</strong> — для обработки платежей (данные карт нам не передаются).</li>
                  <li><strong className="text-foreground">Государственные органы</strong> — по требованию законодательства Республики Беларусь.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Наш сайт использует файлы cookies для улучшения работы и анализа посещаемости. Cookies — это небольшие текстовые файлы, сохраняемые в вашем браузере. Вы можете отключить cookies в настройках браузера, однако это может повлиять на функциональность сайта.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Мы используем следующие типы cookies:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5 mt-2">
                  <li><strong className="text-foreground">Необходимые</strong> — для работы корзины и авторизации.</li>
                  <li><strong className="text-foreground">Аналитические</strong> — для анализа посещаемости (анонимно).</li>
                  <li><strong className="text-foreground">Функциональные</strong> — для запоминания ваших предпочтений.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">6. Защита данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы принимаем технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. Передача данных осуществляется по защищённому протоколу HTTPS.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">7. Хранение данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы храним ваши персональные данные в течение срока, необходимого для выполнения целей, указанных в настоящей Политике, а также в соответствии с требованиями законодательства. Данные о заказах хранятся в течение 3 лет.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">8. Ваши права</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">В соответствии с законодательством Республики Беларусь вы имеете право:</p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>Получить информацию о хранящихся персональных данных.</li>
                  <li>Исправить неточные или устаревшие данные.</li>
                  <li>Запросить удаление ваших данных (право на забвение).</li>
                  <li>Отозвать согласие на обработку данных в любое время.</li>
                  <li>Отписаться от рассылки в любое время.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Для реализации своих прав обратитесь к нам по адресу: <a href="mailto:2livejewplastikbel@gmail.com" className="text-primary hover:underline">2livejewplastikbel@gmail.com</a>
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">9. Контакты</h2>
                <p className="text-muted-foreground leading-relaxed">
                  По вопросам конфиденциальности обращайтесь:
                </p>
                <ul className="space-y-2 text-muted-foreground list-none mt-3">
                  <li>Email: <a href="mailto:2livejewplastikbel@gmail.com" className="text-primary hover:underline">2livejewplastikbel@gmail.com</a></li>
                  <li>Telegram: <a href="https://t.me/D_kattyyy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@D_kattyyy</a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
