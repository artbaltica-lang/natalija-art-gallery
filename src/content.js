export const languages = ['en', 'lt', 'ru'];

export const translations = {
  en: {
    nav: { home: 'Home', gallery: 'Gallery', about: 'About', contact: 'Contact' },
    brand: 'NATALIJA', subtitle: 'ART GALLERY',
    home: {
      eyebrow: 'A STUDY IN COLOUR & FORM', title: 'Art that makes room\nfor feeling.',
      intro: 'An evolving collection of paintings, batik, icons and works on paper.',
      explore: 'Explore the gallery', selected: 'SELECTED WORKS', viewAll: 'View all works',
      note: 'A personal art collection, thoughtfully gathered.',
    },
    gallery: { eyebrow: 'THE COLLECTION', title: 'Works of art', intro: 'Browse the collection by medium or follow your eye.', all: 'All works' },
    categories: { painting: 'Painting', batik: 'Batik', icon: 'Icon painting', graphic: 'Graphic art' },
    artwork: { details: 'View artwork', technique: 'Technique', year: 'Year', back: 'Back to gallery', sample: 'Demonstration artwork' },
    about: { eyebrow: 'ABOUT', title: 'About the artist', demo: 'This is a demonstration page. The artist’s real biography and personal information have not been added yet.', note: 'This space will introduce the artist in their own words.' },
    contact: { eyebrow: 'GET IN TOUCH', title: 'Contact', demo: 'Contact information has not been provided yet.', note: 'The artist’s preferred contact method will appear here.' },
    demo: 'Demonstration content', footer: 'A portfolio in progress', language: 'Choose language', menu: 'Open navigation',
  },
  lt: {
    nav: { home: 'Pradžia', gallery: 'Galerija', about: 'Apie', contact: 'Kontaktai' },
    brand: 'NATALIJA', subtitle: 'MENO GALERIJA',
    home: {
      eyebrow: 'SPALVOS IR FORMOS STUDIJA', title: 'Menas, paliekantis\nvietos jausmui.',
      intro: 'Kintanti tapybos, batikos, ikonų ir grafikos darbų kolekcija.',
      explore: 'Atraskite galeriją', selected: 'ATRINKTI DARBAI', viewAll: 'Visi darbai',
      note: 'Asmeninė meno kolekcija, kruopščiai surinkta.',
    },
    gallery: { eyebrow: 'KOLEKCIJA', title: 'Meno darbai', intro: 'Naršykite kolekciją pagal techniką arba sekite savo žvilgsnį.', all: 'Visi darbai' },
    categories: { painting: 'Tapyba', batik: 'Batika', icon: 'Ikonų tapyba', graphic: 'Grafika' },
    artwork: { details: 'Peržiūrėti darbą', technique: 'Technika', year: 'Metai', back: 'Grįžti į galeriją', sample: 'Pavyzdinis meno darbas' },
    about: { eyebrow: 'APIE', title: 'Apie kūrėją', demo: 'Tai demonstracinis puslapis. Tikra biografija ir asmeninė informacija dar nepateikta.', note: 'Čia kūrėjas prisistatys savais žodžiais.' },
    contact: { eyebrow: 'SUSISIEKITE', title: 'Kontaktai', demo: 'Kontaktinė informacija dar nepateikta.', note: 'Čia bus nurodytas pasirinktas susisiekimo būdas.' },
    demo: 'Demonstracinis turinys', footer: 'Kuriamas portfolio', language: 'Pasirinkite kalbą', menu: 'Atverti navigaciją',
  },
  ru: {
    nav: { home: 'Главная', gallery: 'Галерея', about: 'Об авторе', contact: 'Контакты' },
    brand: 'NATALIJA', subtitle: 'ХУДОЖЕСТВЕННАЯ ГАЛЕРЕЯ',
    home: {
      eyebrow: 'ИССЛЕДОВАНИЕ ЦВЕТА И ФОРМЫ', title: 'Искусство, в котором\nесть место чувствам.',
      intro: 'Живая коллекция живописи, батика, икон и графических работ.',
      explore: 'Открыть галерею', selected: 'ИЗБРАННЫЕ РАБОТЫ', viewAll: 'Все работы',
      note: 'Личная коллекция произведений искусства.',
    },
    gallery: { eyebrow: 'КОЛЛЕКЦИЯ', title: 'Произведения искусства', intro: 'Выбирайте раздел или следуйте за своим взглядом.', all: 'Все работы' },
    categories: { painting: 'Живопись', batik: 'Батик', icon: 'Иконопись', graphic: 'Графика' },
    artwork: { details: 'Смотреть работу', technique: 'Техника', year: 'Год', back: 'Вернуться в галерею', sample: 'Демонстрационная работа' },
    about: { eyebrow: 'ОБ АВТОРЕ', title: 'Об авторе', demo: 'Это демонстрационная страница. Настоящая биография и личная информация пока не добавлены.', note: 'Здесь автор расскажет о себе своими словами.' },
    contact: { eyebrow: 'СВЯЗАТЬСЯ', title: 'Контакты', demo: 'Контактная информация пока не предоставлена.', note: 'Здесь будет указан предпочтительный способ связи с автором.' },
    demo: 'Демонстрационный контент', footer: 'Портфолио в разработке', language: 'Выбрать язык', menu: 'Открыть навигацию',
  },
};

export const artworks = [
  {
    id: 'quiet-horizon', category: 'painting', year: '2024', technique: { en: 'Oil on linen', lt: 'Aliejus ant lino', ru: 'Масло, холст на льне' },
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1400&q=85',
    alt: { en: 'Abstract painting in warm muted tones', lt: 'Abstrakti tapyba šiltų prislopintų tonų', ru: 'Абстрактная живопись в тёплых приглушённых тонах' },
    title: { en: 'Quiet Horizon', lt: 'Rami horizonto linija', ru: 'Тихий горизонт' },
    description: { en: 'A demonstration study of softened edges, open space and the last warmth of the day.', lt: 'Demonstracinis švelnių kontūrų, erdvės ir paskutinės dienos šilumos tyrimas.', ru: 'Демонстрационное исследование мягких линий, открытого пространства и последнего тепла дня.' },
  },
  {
    id: 'folded-light', category: 'batik', year: '2023', technique: { en: 'Wax-resist dye on silk', lt: 'Šilko dažymas vašku', ru: 'Резервирование воском, окрашивание шёлка' },
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85',
    alt: { en: 'Colourful abstract artwork with flowing shapes', lt: 'Spalvingas abstraktus kūrinys su vingiuojančiomis formomis', ru: 'Яркая абстрактная работа с плавными формами' },
    title: { en: 'Folded Light', lt: 'Sklindanti šviesa', ru: 'Сложенный свет' },
    description: { en: 'A demonstration textile work exploring how colour travels through layered translucent forms.', lt: 'Demonstracinis tekstilės darbas apie spalvų judėjimą per sluoksniuotas permatomas formas.', ru: 'Демонстрационная текстильная работа о движении цвета сквозь прозрачные слои.' },
  },
  {
    id: 'still-center', category: 'icon', year: '2022', technique: { en: 'Tempera and gold leaf on board', lt: 'Tempera ir aukso lakštas ant lentos', ru: 'Темпера и сусальное золото на доске' },
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=85',
    alt: { en: 'Detailed historic icon painting', lt: 'Detali istorinė ikonų tapyba', ru: 'Детальная историческая иконопись' },
    title: { en: 'Still Center', lt: 'Ramybės centras', ru: 'Тихий центр' },
    description: { en: 'A demonstration icon-painting study focused on a quiet composition and luminous surface.', lt: 'Demonstracinis ikonų tapybos tyrimas, skirtas ramiai kompozicijai ir šviesiam paviršiui.', ru: 'Демонстрационное исследование иконописи с тихой композицией и светлой поверхностью.' },
  },
  {
    id: 'garden-notes', category: 'graphic', year: '2021', technique: { en: 'Ink and graphite on paper', lt: 'Rašalas ir grafitas ant popieriaus', ru: 'Тушь и графит на бумаге' },
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
    alt: { en: 'Expressive work on paper in a gallery setting', lt: 'Išraiškingas darbas ant popieriaus galerijoje', ru: 'Выразительная работа на бумаге в галерее' },
    title: { en: 'Garden Notes', lt: 'Sodo užrašai', ru: 'Заметки о саде' },
    description: { en: 'A demonstration drawing that gathers small observations into a single rhythmic page.', lt: 'Demonstracinis piešinys, sujungiantis mažus pastebėjimus į vieną ritmingą lapą.', ru: 'Демонстрационный рисунок, объединяющий небольшие наблюдения в один ритмичный лист.' },
  },
];
