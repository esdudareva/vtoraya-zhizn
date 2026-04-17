// Product data for 2Life.by jewelry store
// Design: Eco-Minimalism — DM Serif Display + DM Sans, dark green + terracotta palette

export interface Product {
  id: number;
  name: string;
  category: "necklace" | "earrings" | "bracelet" | "set";
  price: number;
  color: string;
  colorLabel: string;
  savedGrams: number;
  image: string;
  description: string;
  material: string;
  length?: string;
  inStock: boolean;
  featured: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Колье "Гармония"',
    category: "necklace",
    price: 21,
    color: "purple",
    colorLabel: "Фиолетовый",
    savedGrams: 24,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/necklace-harmony-oDyMah6WtiLEeUT3ma76QF.webp",
    description: "Изящное колье из переработанного фиолетового пластика. Каждый элемент вручную отшлифован и собран на серебристой цепочке. Лёгкое, яркое, уникальное.",
    material: "Переработанный пластик, серебристая фурнитура",
    length: "42 см + 5 см удлинитель",
    inStock: true,
    featured: true,
    tags: ["колье", "фиолетовый", "листья"],
  },
  {
    id: 2,
    name: 'Колье "Сияние"',
    category: "necklace",
    price: 50,
    color: "white",
    colorLabel: "Белый/Жемчуг",
    savedGrams: 15,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/necklace-shine-brLeGKibgjLdmXNyuoNoc5.webp",
    description: "Массивное колье из переработанного белого пластика. Округлые элементы создают скульптурный эффект. Идеально для минималистичного образа.",
    material: "Переработанный белый пластик, серебристая фурнитура",
    length: "46 см",
    inStock: true,
    featured: true,
    tags: ["колье", "белый", "минимализм"],
  },
  {
    id: 3,
    name: 'Колье "Поток"',
    category: "necklace",
    price: 29,
    color: "green",
    colorLabel: "Зелёный",
    savedGrams: 15,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/necklace-flow-amUsmPwu8bF7ZSohCmiyAq.webp",
    description: "Колье из кусочков зелёного переработанного пластика, нанизанных на льняной шнур. Напоминает морские камешки — каждый элемент неповторим.",
    material: "Переработанный зелёный пластик, льняной шнур",
    length: "44 см",
    inStock: true,
    featured: true,
    tags: ["колье", "зелёный", "природа"],
  },
  {
    id: 4,
    name: 'Серьги "Лепесток"',
    category: "earrings",
    price: 55,
    color: "yellow",
    colorLabel: "Жёлтый/Янтарь",
    savedGrams: 17,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/earrings-petal-QYBwT5MyRt9rWHcWfpSfLK.webp",
    description: "Серьги-подвески из жёлтого и янтарного пластика в форме лепестков. Золотистые крючки. Лёгкие и яркие — как солнечный день.",
    material: "Переработанный жёлтый/янтарный пластик, позолоченная фурнитура",
    length: "Длина подвески 4 см",
    inStock: true,
    featured: true,
    tags: ["серьги", "жёлтый", "цветок"],
  },
  {
    id: 5,
    name: 'Колье "Природа"',
    category: "necklace",
    price: 45,
    color: "cream",
    colorLabel: "Кремовый",
    savedGrams: 16,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/necklace-nature-JCTxaqcJnEmAuqGt2WoaCv.webp",
    description: "Нежное колье из кремово-белого пластика. Округлые формы напоминают природные камни. Универсальное украшение для любого образа.",
    material: "Переработанный кремовый пластик, серебристая фурнитура",
    length: "42 см + 5 см удлинитель",
    inStock: true,
    featured: true,
    tags: ["колье", "кремовый", "минимализм"],
  },
  {
    id: 6,
    name: 'Колье "Радуга"',
    category: "necklace",
    price: 43,
    color: "multicolor",
    colorLabel: "Мультицвет",
    savedGrams: 14,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/necklace-multicolor-kgBM49eLqYeVQgXGytWWZN.webp",
    description: "Яркое колье из разноцветного переработанного пластика. Красный, синий, жёлтый, зелёный — каждый элемент из разных источников. Настоящая вторая жизнь!",
    material: "Переработанный разноцветный пластик, льняной шнур",
    length: "46 см",
    inStock: true,
    featured: true,
    tags: ["колье", "мультицвет", "яркий"],
  },
  {
    id: 7,
    name: 'Браслет "Океан"',
    category: "bracelet",
    price: 35,
    color: "blue",
    colorLabel: "Синий/Бирюза",
    savedGrams: 12,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/bracelet-ocean-kk8eRP6HAkGmYJ6rifzjb4.webp",
    description: "Браслет из синего и бирюзового пластика на эластичном шнуре. Вдохновлён морскими волнами. Подходит для большинства размеров запястья.",
    material: "Переработанный синий/бирюзовый пластик, эластичный шнур",
    length: "Универсальный размер",
    inStock: true,
    featured: false,
    tags: ["браслет", "синий", "море"],
  },
  {
    id: 8,
    name: 'Серьги "Диск"',
    category: "earrings",
    price: 28,
    color: "red",
    colorLabel: "Красный/Коралл",
    savedGrams: 10,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/earrings-circle-NL9kk5exKsCRMefk5Gbr2j.webp",
    description: "Круглые серьги-диски из переработанного красного и кораллового пластика. Лаконичная форма, яркий цвет. Отличное дополнение к повседневному образу.",
    material: "Переработанный красный/коралловый пластик, серебристая фурнитура",
    length: "Диаметр 3 см",
    inStock: true,
    featured: false,
    tags: ["серьги", "красный", "круглые"],
  },
  {
    id: 9,
    name: 'Колье "Лес"',
    category: "necklace",
    price: 52,
    color: "forest",
    colorLabel: "Тёмно-зелёный/Коричневый",
    savedGrams: 20,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/necklace-forest-PGwBUBvH9UgnBkSEvGuRJq.webp",
    description: "Многоуровневое колье из тёмно-зелёного и коричневого пластика. Слоистые капли создают объёмный эффект. Вдохновлено осенним лесом.",
    material: "Переработанный зелёный и коричневый пластик, бронзовая фурнитура",
    length: "44 см",
    inStock: true,
    featured: false,
    tags: ["колье", "зелёный", "коричневый", "осень"],
  },
];

export const categories = [
  { id: "all", label: "Все украшения" },
  { id: "necklace", label: "Колье" },
  { id: "earrings", label: "Серьги" },
  { id: "bracelet", label: "Браслеты" },
  { id: "set", label: "Наборы" },
];

export const processSteps = [
  {
    step: 1,
    title: "Сбор пластика",
    description: "Мы собираем пластиковые отходы из домов, кафе и офисов Минска. Принимаем пластик от наших клиентов и партнёров.",
    icon: "♻️",
  },
  {
    step: 2,
    title: "Сортировка и мойка",
    description: "Каждый кусочек пластика сортируется по цвету и типу, тщательно моется и проходит контроль качества.",
    icon: "🔍",
  },
  {
    step: 3,
    title: "Дробление",
    description: "Пластик дробится на небольшие фрагменты нужного размера. Это ключевой этап для создания уникальной текстуры украшений.",
    icon: "⚙️",
  },
  {
    step: 4,
    title: "Плавление и формовка",
    description: "Фрагменты плавятся при низкой температуре и прессуются в формы. Никаких токсичных выбросов — только забота о природе.",
    icon: "🔥",
  },
  {
    step: 5,
    title: "Шлифовка и полировка",
    description: "Каждый элемент вручную шлифуется и полируется до идеального состояния. Это самый кропотливый этап.",
    icon: "✨",
  },
  {
    step: 6,
    title: "Сборка украшения",
    description: "Мастер собирает украшение вручную, подбирая элементы по цвету и форме. Каждое изделие — уникально.",
    icon: "💚",
  },
];

export const faqItems = [
  {
    question: "Из какого пластика сделаны украшения?",
    answer: "Мы используем пластик типов HDPE (2) и PP (5) — это самые безопасные виды пластика. Мы не используем ПВХ и другие токсичные материалы. Весь пластик проходит тщательную очистку перед обработкой.",
  },
  {
    question: "Безопасно ли носить украшения из переработанного пластика?",
    answer: "Да, абсолютно безопасно. Мы используем только пищевые типы пластика, которые не выделяют вредных веществ при нормальной температуре. Фурнитура — из гипоаллергенных материалов (нержавеющая сталь или позолота без никеля).",
  },
  {
    question: "Как ухаживать за украшениями?",
    answer: "Украшения из пластика очень просты в уходе: протирайте мягкой влажной тканью. Избегайте длительного контакта с водой, агрессивными химикатами и прямыми солнечными лучами. Храните в прилагаемом мешочке.",
  },
  {
    question: "Можно ли сдать свой пластик для переработки?",
    answer: "Да! Мы принимаем чистый пластик типов 2 и 5 от наших клиентов. Принесите пластик на наш адрес или договоритесь о самовывозе при заказе от 50 рублей. За каждые 500г пластика — скидка 5% на следующий заказ.",
  },
  {
    question: "Возможен ли индивидуальный заказ?",
    answer: "Конечно! Мы делаем украшения на заказ по вашим пожеланиям: цвет, форма, размер. Срок изготовления — 7-14 дней. Напишите нам на почту или в Instagram, и мы обсудим детали.",
  },
  {
    question: "Как долго прослужат украшения?",
    answer: "При правильном уходе украшения служат годами. Пластик не ржавеет, не темнеет и сохраняет цвет. Фурнитура из нержавеющей стали также очень долговечна.",
  },
  {
    question: "Есть ли у вас подарочная упаковка?",
    answer: "Да! Все украшения упакованы в крафтовые коробочки с тканевым мешочком. При заказе можно добавить подарочную открытку с вашим текстом — бесплатно.",
  },
  {
    question: "Как вы доставляете заказы?",
    answer: "Доставляем по всей Беларуси Белпочтой и СДЭК. По Минску — курьером или самовывозом. Бесплатная доставка при заказе от 60 рублей.",
  },
];

export const teamMembers = [
  {
    name: "Анна Ковалёва",
    role: "Основатель и главный мастер",
    bio: "Анна основала «Вторую жизнь» в 2021 году после того, как увидела, сколько пластика выбрасывается ежедневно. Имеет образование дизайнера и 8 лет опыта в ювелирном деле.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/about-team-8xbZE3tBUxja9yvPDvHgJE.webp",
  },
];
