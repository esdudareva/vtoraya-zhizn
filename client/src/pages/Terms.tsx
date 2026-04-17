/* Terms — Eco-Minimalism design */
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Terms() {
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
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-medium text-primary uppercase tracking-widest">Документы</p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Условия использования
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
          <div className="max-w-3xl mx-auto prose prose-sm prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground">
            <div className="space-y-10">

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">1. Общие положения</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Настоящие Условия использования (далее — «Условия») регулируют отношения между интернет-магазином «Вторая жизнь» (далее — «Магазин», «мы») и пользователями сайта (далее — «Покупатель», «вы»). Используя сайт и совершая покупки, вы соглашаетесь с настоящими Условиями в полном объёме.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Магазин «Вторая жизнь» — белорусский бренд украшений ручной работы из переработанного пластика. Мы работаем в соответствии с законодательством Республики Беларусь.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">2. Оформление заказа</h2>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>Заказ считается принятым после получения подтверждения на указанный вами email.</li>
                  <li>Мы оставляем за собой право отказать в исполнении заказа в случае отсутствия товара на складе, ошибки в цене или иных технических неполадок.</li>
                  <li>Цены на сайте указаны в белорусских рублях (BYN) и включают НДС.</li>
                  <li>Мы вправе изменять цены без предварительного уведомления, однако уже принятые заказы выполняются по цене, действовавшей на момент оформления.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">3. Оплата</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оплата заказа производится следующими способами:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5 mt-3">
                  <li>Банковской картой (Visa, Mastercard, Мир) через защищённую платёжную систему.</li>
                  <li>Наличными при получении (для доставки курьером по Минску и самовывоза).</li>
                  <li>Банковским переводом (по предварительному согласованию).</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Все платёжные данные передаются по защищённому протоколу SSL. Мы не храним данные банковских карт.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">4. Доставка</h2>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>Срок обработки заказа — 1–2 рабочих дня.</li>
                  <li>Доставка по Минску курьером — 1–2 рабочих дня.</li>
                  <li>Доставка по Беларуси Белпочтой — 3–7 рабочих дней.</li>
                  <li>Доставка СДЭК — 2–5 рабочих дней.</li>
                  <li>Бесплатная доставка при заказе от 60 BYN.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">5. Возврат и обмен</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Возврат товара надлежащего качества возможен в течение 14 дней с момента получения при соблюдении следующих условий:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5 mt-3">
                  <li>Товар не был в использовании.</li>
                  <li>Сохранены оригинальная упаковка и все этикетки.</li>
                  <li>Товар не входит в перечень товаров, не подлежащих возврату (ювелирные украшения, изделия для личного пользования).</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Возврат товара ненадлежащего качества осуществляется в соответствии с Законом Республики Беларусь «О защите прав потребителей».
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">6. Интеллектуальная собственность</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Все материалы сайта (тексты, фотографии, дизайн, логотип) являются интеллектуальной собственностью магазина «Вторая жизнь» и защищены авторским правом. Копирование и использование материалов без письменного разрешения запрещено.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">7. Ограничение ответственности</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Магазин не несёт ответственности за задержки доставки, вызванные действиями третьих лиц (почтовых служб, курьерских компаний), форс-мажорными обстоятельствами, а также за ущерб, возникший вследствие неправильного использования или хранения товара.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">8. Изменение условий</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы оставляем за собой право изменять настоящие Условия в любое время. Актуальная версия всегда доступна на данной странице. Продолжение использования сайта после внесения изменений означает ваше согласие с новыми Условиями.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-foreground mb-3">9. Контакты</h2>
                <p className="text-muted-foreground leading-relaxed">
                  По всем вопросам, связанным с настоящими Условиями, обращайтесь:
                </p>
                <ul className="space-y-2 text-muted-foreground list-none mt-3">
                  <li>Email: <a href="mailto:2livejewplastikbel@gmail.com" className="text-primary hover:underline">2livejewplastikbel@gmail.com</a></li>
                  <li>Telegram: <a href="https://t.me/D_kattyyy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@D_kattyyy</a></li>
                  <li>Instagram: <a href="https://instagram.com/d.kattyyy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@d.kattyyy</a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
