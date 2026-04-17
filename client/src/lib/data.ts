// Design: Eco-Minimalism — DM Serif Display + DM Sans, dark green + terracotta palette

export interface Product {
  id: number;
  name: string;
  category: "necklace" | "earrings" | "bracelet" | "ring" | "brooch" | "set";
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
    id: 25,
    name: 'Серьги "Минимализм"',
    category: "earrings",
    price: 18,
    color: "pink",
    colorLabel: "Нежно-розовый",
    savedGrams: 8,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/earrings-minimalist-studs-Ck2EJBiiZQW4B2WPvrb6H2.webp",
    description: "Минималистичные серьги-гвоздики из переработанного пластика. Геометрические формы в нежных пастельных тонах. Идеальны для повседневного образа.",
    material: "Переработанный пластик, серебристая фурнитура",
    inStock: true,
    featured: false,
    tags: ["серьги", "розовый", "геометрия", "минимализм"],
  },
  {
    id: 26,
    name: 'Колье "Золотые слои"',
    category: "necklace",
    price: 45,
    color: "gold",
    colorLabel: "Золотой",
    savedGrams: 20,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/necklace-layered-gold-XyMVy5CizKZC5bY9HfjLsC.webp",
    description: "Многослойное колье с золотыми акцентами. Каждый слой имеет разную длину, создавая элегантный каскадный эффект.",
    material: "Переработанный пластик, золотистая фурнитура",
    length: "40-50 см",
    inStock: true,
    featured: false,
    tags: ["колье", "золото", "многослойное", "элегантное"],
  },
  {
    id: 27,
    name: 'Браслет "Обёртка"',
    category: "bracelet",
    price: 22,
    color: "brown",
    colorLabel: "Коричневый",
    savedGrams: 12,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/bracelet-wrap-leather-XGHwA3wkdy2ok4irWzpS8Z.webp",
    description: "Браслет-обёртка из переработанного пластика с имитацией кожи. Богемный стиль с золотыми деталями. Регулируемая длина.",
    material: "Переработанный пластик, золотистая фурнитура",
    inStock: true,
    featured: false,
    tags: ["браслет", "коричневый", "богемный", "кожа"],
  },
  {
    id: 28,
    name: 'Кольца "Трио"',
    category: "ring",
    price: 25,
    color: "multicolor",
    colorLabel: "Мультиколор",
    savedGrams: 6,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/ring-trio-set-Zn2nnf7yqwDB2bwkiFe6kW.webp",
    description: "Набор из 3 стэкируемых колец в разных цветах. Розовое золото, серебро и жёлтое золото. Минималистичный дизайн.",
    material: "Переработанный пластик, многоцветная фурнитура",
    inStock: true,
    featured: false,
    tags: ["кольца", "набор", "стэкируемые", "мультиколор"],
  },
  {
    id: 29,
    name: 'Колье "Геометрия"',
    category: "necklace",
    price: 38,
    color: "black",
    colorLabel: "Чёрный",
    savedGrams: 18,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/necklace-statement-geometric-7k4JgUQziYBG7fAwoS9pTU.webp",
    description: "Смелое геометрическое колье из чёрного переработанного пластика. Крупные угловатые формы в стиле арт-деко. Для смелых образов.",
    material: "Переработанный чёрный пластик, серебристая фурнитура",
    length: "45 см",
    inStock: true,
    featured: false,
    tags: ["колье", "чёрный", "геометрия", "арт-деко"],
  },
];

export const reviews = [
  {
    id: 1,
    author: "Мария К.",
    rating: 5,
    text: "Красивые украшения! Качество отличное, а главное — помогаю планете.",
    approved: true,
  },
  {
    id: 2,
    author: "Елена П.",
    rating: 5,
    text: "Люблю эко-украшения. Вторая жизнь — лучший выбор!",
    approved: true,
  },
  {
    id: 3,
    author: "Анна М.",
    rating: 4,
    text: "Хорошее качество, быстрая доставка. Рекомендую!",
    approved: true,
  },
];

export const teamMembers = [
  {
    name: "Екатерина Дударева",
    role: "Основатель и дизайнер",
    bio: "Екатерина создала Вторую жизнь с целью показать, что переработанный пластик может быть красивым и стильным. Каждое украшение — это её любовь к природе.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/about-team-8xbZE3tBUxja9yvPDvHgJE.webp",
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Сбор",
    description: "Собираем переработанный пластик из экологичных источников",
  },
  {
    step: 2,
    title: "Очистка",
    description: "Тщательно очищаем материал от загрязнений",
  },
  {
    step: 3,
    title: "Сортировка",
    description: "Сортируем по цветам и типам пластика",
  },
  {
    step: 4,
    title: "Обработка",
    description: "Обрабатываем и формируем элементы украшений",
  },
  {
    step: 5,
    title: "Дизайн",
    description: "Создаём уникальные дизайны и комбинации",
  },
  {
    step: 6,
    title: "Сборка",
    description: "Вручную собираем каждое украшение с любовью",
  },
];

export const faqItems = [
  {
    question: "Из чего сделаны украшения?",
    answer: "Все украшения изготовлены из переработанного пластика, который мы собираем из экологичных источников. Каждый предмет уникален и помогает спасать планету.",
  },
  {
    question: "Как долго прослужат украшения?",
    answer: "При правильном уходе украшения прослужат несколько лет. Пластик очень прочный и устойчив к повреждениям. Избегайте прямого солнца и высоких температур.",
  },
  {
    question: "Безопасны ли украшения для кожи?",
    answer: "Да, абсолютно безопасны. Мы используем гипоаллергенную фурнитуру и тестируем все материалы на безопасность.",
  },
  {
    question: "Как ухаживать за украшениями?",
    answer: "Протирайте мягкой тканью после ношения. Храните в сухом месте, защищённом от прямого солнца. Не погружайте в воду надолго.",
  },
  {
    question: "Какая доставка?",
    answer: "Мы отправляем по всему миру. Доставка бесплатна при заказе от 60 рублей. Время доставки 5-14 дней в зависимости от региона.",
  },
  {
    question: "Можно ли вернуть товар?",
    answer: "Да, в течение 30 дней после покупки вы можете вернуть товар в исходном состоянии и получить полный возврат средств.",
  },
  {
    question: "Сколько пластика спасает каждое украшение?",
    answer: "Каждое украшение спасает от 5 до 30 граммов пластика, в зависимости от размера и типа. Смотрите точное количество на странице каждого товара.",
  },
  {
    question: "Есть ли гарантия на украшения?",
    answer: "Да, мы гарантируем качество всех украшений. Если возникнут проблемы, свяжитесь с нами, и мы решим вопрос.",
  },
];

export const categories = [
  { id: "necklace", label: "Колье", icon: "Necklace" },
  { id: "earrings", label: "Серьги", icon: "Earrings" },
  { id: "bracelet", label: "Браслеты", icon: "Bracelet" },
  { id: "ring", label: "Кольца", icon: "Ring" },
  { id: "brooch", label: "Броши", icon: "Brooch" },
  { id: "set", label: "Наборы", icon: "Package" },
];
