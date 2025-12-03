export const VULN_TYPES = {
    SQLI: 'SQL_INJECTION',
    XSS: 'XSS',
    IDOR: 'IDOR',
    CMD: 'CMD_INJECTION',
    API: 'API_INSECURITY'
};

// --- МАГАЗИН ---
export const EXPLOITS = [
    { id: 'sqli_basic', type: VULN_TYPES.SQLI, price: 0, name: "Auth Bypass (SQLi)", code: "' OR '1'='1", desc: "Базовий пейлоад." },
    { id: 'idor_tool', type: VULN_TYPES.IDOR, price: 600, name: "URL Param Fuzzer", code: "?id=101", desc: "Інструмент для IDOR." },
    { id: 'xss_stealer', type: VULN_TYPES.XSS, price: 1200, name: "XSS Cookie Stealer", code: "<script>fetch(cookie)</script>", desc: "Крадіжка сесій." },
    { id: 'api_tamper', type: VULN_TYPES.API, price: 2500, name: "JSON Body Tamper", code: '{ "role": "admin" }', desc: "Злам API." },
    { id: 'cmd_root', type: VULN_TYPES.CMD, price: 5000, name: "RCE Rootkit", code: "; cat /etc/passwd", desc: "Root доступ." }
];

// --- МІСІЇ ---
export const getMissions = (role) => [
    
    // === TIER 1: SQL INJECTION ===
    {
        id: 101, type: VULN_TYPES.SQLI, minLevel: 1, reward: 100, xp: 60,
        validation: (i) => i.includes("'") && (i.includes("OR") || i.includes("=")),
        employer: role === 'white' ? "Mario's Pizza" : "Anon_Pizza_Lover",
        title: role === 'white' ? "Аудит: Піцерія" : "Безкоштовна вечеря",
        desc: role === 'white' ? "Власник забув пароль. Скиньте доступ через SQLi." : "Я хочу піцу. Зламай адмінку.",
        hint: "' OR '1'='1", targetUrl: "http://pizza.local/login", img: "🍕"
    },
    {
        id: 102, type: VULN_TYPES.SQLI, minLevel: 1, reward: 110, xp: 66,
        validation: (i) => i.includes("'"),
        employer: role === 'white' ? "Sushi Wok" : "Competitor_Wok",
        title: role === 'white' ? "Тест безпеки Суші" : "Злив бази клієнтів",
        desc: role === 'white' ? "Перевірте адмінку на вразливості." : "Витягни базу телефонів клієнтів конкурента.",
        hint: "SQL Injection.", targetUrl: "http://sushi.local/admin", img: "🍣"
    },
    {
        id: 103, type: VULN_TYPES.SQLI, minLevel: 1, reward: 120, xp: 72,
        validation: (i) => i.includes("'"),
        employer: role === 'white' ? "Cinema City" : "Movie_Pirate",
        title: role === 'white' ? "Захист квитків" : "Квитки на шару",
        desc: "Система бронювання виглядає вразливою.",
        hint: "SQL Injection.", targetUrl: "http://cinema.local/auth", img: "🍿"
    },
    {
        id: 104, type: VULN_TYPES.SQLI, minLevel: 2, reward: 130, xp: 78,
        validation: (i) => i.includes("'"),
        employer: role === 'white' ? "Coffee House" : "Free_Latte",
        title: "Кав'ярня Aroma",
        desc: "Сайт програми лояльності.",
        hint: "Спробуй обійти логін.", targetUrl: "http://coffee.local/club", img: "☕"
    },
    {
        id: 105, type: VULN_TYPES.SQLI, minLevel: 2, reward: 140, xp: 84,
        validation: (i) => i.includes("'"),
        employer: role === 'white' ? "Gym 'Iron'" : "Fit_Hacker",
        title: "Спортзал Iron",
        desc: "База даних персоналу.",
        hint: "SQL Injection.", targetUrl: "http://gym.local/staff", img: "💪"
    },
    {
        id: 106, type: VULN_TYPES.SQLI, minLevel: 2, reward: 150, xp: 90,
        validation: (i) => i.includes("'"),
        employer: role === 'white' ? "Book Store" : "Bookworm",
        title: "Книгарня",
        desc: "Магазин рідкісних книг.",
        hint: "SQL Injection.", targetUrl: "http://books.local/admin", img: "📚"
    },
    {
        id: 107, type: VULN_TYPES.SQLI, minLevel: 2, reward: 150, xp: 90,
        validation: (i) => i.includes("'"),
        employer: role === 'white' ? "Flower Shop" : "Secret_Admirer",
        title: "Квітковий бутік",
        desc: "Панель кур'єрів.",
        hint: "SQL Injection.", targetUrl: "http://flowers.local/courier", img: "💐"
    },

    // === TIER 2: IDOR ===
    {
        id: 201, type: VULN_TYPES.IDOR, minLevel: 3, reward: 200, xp: 120,
        validation: (i) => i.includes("?id=") && !i.includes("505"),
        employer: role === 'white' ? "Grand Hotel" : "Stalker_X",
        title: role === 'white' ? "Захист гостей" : "Шпигунство",
        desc: role === 'white' ? "Гості бачать чужі броні. Виправте це." : "Дізнайся номер моєї колишньої. Мій ID 505.",
        hint: "Зміни ?id=505", targetUrl: "http://hotel.local/booking?id=505", img: "🏨"
    },
    {
        id: 202, type: VULN_TYPES.IDOR, minLevel: 3, reward: 210, xp: 126,
        validation: (i) => i.includes("?id=") && !i.includes("99"),
        employer: role === 'white' ? "UberClone" : "Free_Ride",
        title: "Таксі Сервіс",
        desc: "Історія поїздок інших клієнтів.",
        hint: "Зміни ?id=99", targetUrl: "http://taxi.local/history?id=99", img: "🚖"
    },
    {
        id: 203, type: VULN_TYPES.IDOR, minLevel: 3, reward: 220, xp: 132,
        validation: (i) => i.includes("?id="),
        employer: role === 'white' ? "Private Clinic" : "Data_Broker",
        title: "Приватна Клініка",
        desc: "Медичні картки пацієнтів.",
        hint: "Зміни ID пацієнта.", targetUrl: "http://clinic.local/card?id=1001", img: "🏥"
    },

    // === TIER 3: XSS ===
    {
        id: 301, type: VULN_TYPES.XSS, minLevel: 5, reward: 350, xp: 210,
        validation: (i) => i.includes("<script>"),
        employer: role === 'white' ? "City News" : "Troll_Farm",
        title: role === 'white' ? "Патч коментарів" : "Дефейс сайту",
        desc: role === 'white' ? "Перевірте форму коментарів на XSS." : "Заспам новинний портал скрімерами.",
        hint: "<script>alert(1)</script>", targetUrl: "http://news.local/post/1", img: "📰"
    },

    // === TIER 4: API ===
    {
        id: 401, type: VULN_TYPES.API, minLevel: 7, reward: 600, xp: 360,
        validation: (i) => i.includes("admin"),
        employer: role === 'white' ? "NeoBank" : "Dark_Carder",
        title: role === 'white' ? "API Аудит" : "Підвищення прав",
        desc: "Перевір Mass Assignment в API.",
        hint: "\"role\": \"admin\"", targetUrl: "http://api.bank.local/user", img: "💳"
    },

    // === TIER 5: CMD ===
    {
        id: 501, type: VULN_TYPES.CMD, minLevel: 10, reward: 1500, xp: 900,
        validation: (i) => i.includes(";"),
        employer: role === 'white' ? "Nuclear Plant" : "Saboteur",
        title: "АЕС: Контроль",
        desc: "Критична вразливість в системі.",
        hint: "; cat /etc/passwd", targetUrl: "http://scada.nuke.local/ping", img: "☢️"
    }
];