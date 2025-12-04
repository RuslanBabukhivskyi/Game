import bgPizza from '../assets/img/1.png'; 
import bgSushiWok from '../assets/img/2.png';
import bgCinemaCity from '../assets/img/3.png';
import bgCityLibrary from '../assets/img/4.png';
import bgAutoFix from '../assets/img/5.png';
import bgCharityFund from '../assets/img/6.png';
import bgRealEstateCo from '../assets/img/7.png';
import bgCyberZoneClub from '../assets/img/8.png';
import bgGrandHotel from '../assets/img/9.png';
import bgUberClone from '../assets/img/10.png';
import bgPrivateClinic from '../assets/img/11.png';
import bgSafeLifeInsurance from '../assets/img/12.png';
import bgFastDriveRentals from '../assets/img/13.png';
import bgMyCloudStorage from '../assets/img/14.png';
import bgCityNews from '../assets/img/15.png';
import bgBeautyBlog from '../assets/img/16.png';
import bgYummyRecipes from '../assets/img/17.png';
import bgTechSupportPortal from '../assets/img/18.png';
import bgDatingAppWeb from '../assets/img/19.png';
import bgNeoBank from '../assets/img/20.png';
import bgEatFastDelivery from '../assets/img/21.png';
import bgStreamPlus from '../assets/img/22.png';
import bgHomeControlIoT from '../assets/img/23.png';
import bgCertifyMeOnline from '../assets/img/24.png';
import bgNuclearPlant from '../assets/img/25.png';
import bgSmartCityTraffic from '../assets/img/26.JPG';
import bgBigDamControl from '../assets/img/27.png';
import bgMilitaryBase from '../assets/img/28.png';

import wpJapan from '../assets/bg/1.png'
import wpCyber from '../assets/bg/2.png'
import wpEldenRing from '../assets/bg/3.png'
import wpMalenia from '../assets/bg/4.png'

export const VULN_TYPES = {
    SQLI: 'SQL_INJECTION',
    XSS: 'XSS',
    IDOR: 'IDOR',
    CMD: 'CMD_INJECTION',
    API: 'API_INSECURITY'
};

export const WALLPAPERS = [
    {
        id: 'wp_default',
        name: 'Standard OS',
        price: 0,
        src: null, 
        desc: "Стандартні"
    },
    {
        id: 'wp_Japan',
        name: 'Japan',
        price: 750,
        src: wpJapan,
        desc: "Японія"
    },
    {
        id: 'wp_cyber_city',
        name: 'Night City',
        price: 1250,
        src: wpCyber, 
        desc: "Неоновий мегаполіс"
    },
    {
        id: 'wp_elden_ring',
        name: 'Elden Ring',
        price: 1500,
        src: wpEldenRing,
        desc: "Elden Ring"
    },
    {
        id: 'wp_malenia',
        name: 'Malenia',
        price: 2750,
        src: wpMalenia, 
        desc: "Маленія"
    }
];

export const EXPLOITS = [
    { id: 'sqli_basic', type: VULN_TYPES.SQLI, price: 0, name: "Auth Bypass (SQLi)", code: "' OR '1'='1", desc: "Базовий пейлоад." },
    { id: 'idor_tool', type: VULN_TYPES.IDOR, price: 600, name: "URL Param Fuzzer", code: "?id=101", desc: "Інструмент для IDOR." },
    { id: 'xss_stealer', type: VULN_TYPES.XSS, price: 1200, name: "XSS Cookie Stealer", code: "<script>fetch(cookie)</script>", desc: "Крадіжка сесій." },
    { id: 'xss_bypass', type: VULN_TYPES.XSS, price: 1500, name: "WAF Bypass XSS", code: "<img src=x onerror=alert(1)>", desc: "Обхід фільтру 'script'." },
    { id: 'api_tamper', type: VULN_TYPES.API, price: 2500, name: "JSON Body Tamper", code: '{ "role": "admin" }', desc: "Злам API." },
    { id: 'cmd_root', type: VULN_TYPES.CMD, price: 5000, name: "RCE Rootkit", code: "; cat /etc/passwd", desc: "Root доступ." }
];

export const getMissions = (role) => [
    
    // ==========================================
    // TIER 1: SQL INJECTION (Рівні 1-2)
    // ==========================================

    {
        id: 101, type: VULN_TYPES.SQLI, minLevel: 1, reward: 100, xp: 60, uiType: 'LOGIN',
        bgImage: bgPizza,
        validation: (vals) => vals.username && vals.username.includes("'") && (vals.username.includes("OR") || vals.username.includes("=")),
        employer: role === 'white' ? "Mario's Pizza" : "Anon_Pizza_Lover",
        title: "Піцерія Mario",
        desc: role === 'white' ? "Власник забув пароль. Форма входу стара." : "Я хочу піцу. Зламай адмінку.",
        hint: "' OR '1'='1 у поле Username", targetUrl: "http://pizza.local/login", img: "🍕"
    },
    {
        id: 102, type: VULN_TYPES.SQLI, minLevel: 1, reward: 110, xp: 66, uiType: 'LOGIN',
        bgImage: bgSushiWok,
        validation: (vals) => vals.username && vals.username.includes("'"),
        employer: role === 'white' ? "Sushi Wok" : "Competitor_Wok",
        title: "Суші Бар",
        desc: role === 'white' ? "Перевірте адмінку на вразливості." : "Витягни базу телефонів клієнтів конкурента.",
        hint: "SQL Injection.", targetUrl: "http://sushi.local/admin", img: "🍣"
    },
    {
        id: 103, type: VULN_TYPES.SQLI, minLevel: 1, reward: 120, xp: 72, uiType: 'LOGIN',
        bgImage: bgCinemaCity,
        validation: (vals) => vals.username && vals.username.includes("'"),
        employer: role === 'white' ? "Cinema City" : "Movie_Pirate",
        title: "Кінотеатр",
        desc: role === 'white' ? "Система бронювання виглядає вразливою." : "Квитки на вечірній сеанс. Безкоштовно.",
        hint: "SQL Injection.", targetUrl: "http://cinema.local/auth", img: "🍿"
    },
    {
        id: 104, type: VULN_TYPES.SQLI, minLevel: 2, reward: 130, xp: 78, uiType: 'LOGIN',
        bgImage: bgCityLibrary,
        validation: (vals) => vals.username && vals.username.includes("'"),
        employer: role === 'white' ? "City Library" : "Book_Thief",
        title: "Міська Бібліотека",
        desc: role === 'white' ? "Ми оцифрували архів, але забули про безпеку." : "Мені потрібен доступ до рідкісних книг.",
        hint: "Спробуй обійти логін.", targetUrl: "http://library.local/staff", img: "📚"
    },
    {
        id: 105, type: VULN_TYPES.SQLI, minLevel: 2, reward: 140, xp: 84, uiType: 'LOGIN',
        bgImage: bgAutoFix,
        validation: (vals) => vals.username && vals.username.includes("'"),
        employer: role === 'white' ? "Auto Fix" : "Car_Dealer_X",
        title: "СТО 'Auto Fix'",
        desc: role === 'white' ? "Перевірте базу даних клієнтів на витік." : "Дізнайся, хто ремонтував чорний BMW.",
        hint: "SQL Injection.", targetUrl: "http://autofix.local/db", img: "🔧"
    },
    {
        id: 106, type: VULN_TYPES.SQLI, minLevel: 2, reward: 145, xp: 85, uiType: 'LOGIN',
        bgImage: bgCharityFund,
        validation: (vals) => vals.username && vals.username.includes("'"),
        employer: role === 'white' ? "Charity Fund" : "Heartless_Scam",
        title: "Благодійний Фонд",
        desc: role === 'white' ? "Захистіть панель адміністратора від злому." : "Вкради список донорів, щоб розіслати спам.",
        hint: "SQL Injection.", targetUrl: "http://help-kids.local/admin", img: "❤️"
    },
    {
        id: 107, type: VULN_TYPES.SQLI, minLevel: 2, reward: 155, xp: 90, uiType: 'LOGIN',
        bgImage: bgRealEstateCo,
        validation: (vals) => vals.username && vals.username.includes("'"),
        employer: role === 'white' ? "Real Estate Co." : "Burglar_Joe",
        title: "Агенція Нерухомості",
        desc: role === 'white' ? "Ріелтори скаржаться на дивну поведінку входу." : "Мені потрібні коди від 'розумних замків' у нових квартирах.",
        hint: "SQL Injection.", targetUrl: "http://estate.local/agent", img: "🏠"
    },
    {
        id: 108, type: VULN_TYPES.SQLI, minLevel: 2, reward: 160, xp: 95, uiType: 'LOGIN',
        bgImage: bgCyberZoneClub,
        validation: (vals) => vals.username && vals.username.includes("'"),
        employer: role === 'white' ? "CyberZone Club" : "Gamer_Kid",
        title: "Комп'ютерний Клуб",
        desc: role === 'white' ? "Система обліку часу глючить. Перевірте." : "Хочу грати безкоштовно. Зламай таймер.",
        hint: "SQL Injection.", targetUrl: "http://cyberzone.local/time", img: "🎮"
    },

    // ==========================================
    // TIER 2: IDOR (Рівні 3-4)
    // ==========================================

    {
        id: 201, type: VULN_TYPES.IDOR, minLevel: 3, reward: 200, xp: 120, uiType: 'STATIC',
        bgImage: bgGrandHotel,
        validation: (url) => url.includes("?id=") && !url.includes("505"),
        employer: role === 'white' ? "Grand Hotel" : "Paparazzi",
        title: "Grand Hotel",
        desc: role === 'white' ? "Гості бачать чужі броні. Виправте це." : "Зірка зупинилася тут. Дізнайся номер кімнати.",
        hint: "Зміни ?id=505", targetUrl: "http://hotel.local/booking?id=505", img: "🏨"
    },
    {
        id: 202, type: VULN_TYPES.IDOR, minLevel: 3, reward: 210, xp: 126, uiType: 'STATIC',
        bgImage: bgUberClone,
        validation: (url) => url.includes("?id=") && !url.includes("99"),
        employer: role === 'white' ? "UberClone" : "Taxi_Killer",
        title: "Таксі Сервіс",
        desc: role === 'white' ? "Історія поїздок інших клієнтів доступна всім." : "Де він був учора ввечері? Перевір поїздки.",
        hint: "Зміни ?id=99", targetUrl: "http://taxi.local/history?id=99", img: "🚖"
    },
    {
        id: 203, type: VULN_TYPES.IDOR, minLevel: 3, reward: 220, xp: 132, uiType: 'STATIC',
        bgImage: bgPrivateClinic,
        validation: (url) => url.includes("?id=") && !url.includes("1001"),
        employer: role === 'white' ? "Private Clinic" : "BlackMarket_Organs",
        title: "Приватна Клініка",
        desc: role === 'white' ? "Медичні картки пацієнтів під загрозою." : "Мені потрібні донори. Шукай здорових.",
        hint: "Зміни ID пацієнта.", targetUrl: "http://clinic.local/card?id=1001", img: "🏥"
    },
    {
        id: 204, type: VULN_TYPES.IDOR, minLevel: 4, reward: 235, xp: 140, uiType: 'STATIC',
        bgImage: bgSafeLifeInsurance,
        validation: (url) => url.includes("?policy=") && !url.includes("777"),
        employer: role === 'white' ? "SafeLife Insurance" : "Identity_Thief",
        title: "Страхова Компанія",
        desc: role === 'white' ? "Клієнти можуть переглядати чужі поліси." : "Мені потрібні паспортні дані застрахованих.",
        hint: "Зміни номер ?policy=777", targetUrl: "http://safelife.local/view?policy=777", img: "🛡️"
    },
    {
        id: 205, type: VULN_TYPES.IDOR, minLevel: 4, reward: 245, xp: 145, uiType: 'STATIC',
        bgImage: bgFastDriveRentals,
        validation: (url) => url.includes("?contract=") && !url.includes("12"),
        employer: role === 'white' ? "FastDrive Rentals" : "Joyrider",
        title: "Оренда Авто",
        desc: role === 'white' ? "Контракти оренди доступні публічно." : "Дізнайся, хто орендував Ferrari на вихідні.",
        hint: "Зміни ?contract=12", targetUrl: "http://fastdrive.local/doc?contract=12", img: "🏎️"
    },
    {
        id: 206, type: VULN_TYPES.IDOR, minLevel: 4, reward: 255, xp: 155, uiType: 'STATIC',
        bgImage: bgMyCloudStorage,
        validation: (url) => url.includes("?file_id=") && !url.includes("50"),
        employer: role === 'white' ? "MyCloud Storage" : "Leaker_Pro",
        title: "Хмарне Сховище",
        desc: role === 'white' ? "Приватні файли користувачів мають передбачувані ID." : "Знайди інтимні фото в хмарі. Почни перебір.",
        hint: "Зміни ?file_id=50", targetUrl: "http://mycloud.local/preview?file_id=50", img: "☁️"
    },

    // ==========================================
    // TIER 3: XSS (Рівні 5-6)
    // ==========================================

    {
        id: 301, type: VULN_TYPES.XSS, minLevel: 5, reward: 350, xp: 210, uiType: 'COMMENTS',
        bgImage: bgCityNews,
        waf: ['script', 'alert'],
        validation: (vals) => vals.comment && vals.comment.includes("<img") && vals.comment.includes("onerror"),
        employer: role === 'white' ? "City News" : "Troll_Farm",
        title: "Новинний Портал",
        desc: role === 'white' ? "Патч для коментарів. Фільтр 'script' працює, але..." : "Фільтр слабкий. Обійди його через картинку.",
        hint: "Використай <img src=x onerror=alert(1)>", targetUrl: "http://news.local/post/1", img: "📰"
    },
    {
        id: 302, type: VULN_TYPES.XSS, minLevel: 5, reward: 360, xp: 216, uiType: 'COMMENTS',
        bgImage: bgBeautyBlog,
        validation: (vals) => vals.comment && vals.comment.includes("<script>"),
        employer: role === 'white' ? "Beauty Blog" : "Hater_Bot",
        title: "Блог Краси",
        desc: role === 'white' ? "Перевірте форму відгуків на простий XSS." : "Напиши скрипт, що краде кукі адміна блогу.",
        hint: "<script>alert(1)</script>", targetUrl: "http://blog.local/reviews", img: "💋"
    },
    {
        id: 303, type: VULN_TYPES.XSS, minLevel: 6, reward: 390, xp: 235, uiType: 'COMMENTS',
        bgImage: bgYummyRecipes,
        validation: (vals) => vals.comment && vals.comment.includes("<script>"),
        employer: role === 'white' ? "Yummy Recipes" : "Competitor_Chef",
        title: "Сайт Рецептів",
        desc: role === 'white' ? "У коментарях до рецептів можна вставити код." : "Зіпсуй репутацію цього кулінара. Встав спам-скрипт.",
        hint: "XSS атака.", targetUrl: "http://yummy.local/lasagna", img: "🥘"
    },
    {
        id: 304, type: VULN_TYPES.XSS, minLevel: 6, reward: 410, xp: 245, uiType: 'COMMENTS',
        bgImage: bgTechSupportPortal,
        waf: ['script'],
        validation: (vals) => vals.comment && vals.comment.includes("<img") && vals.comment.includes("onerror"),
        employer: role === 'white' ? "Tech Support Portal" : "Angry_User",
        title: "Техпідтримка",
        desc: role === 'white' ? "Тикети підтримки рендерять HTML. Це небезпечно." : "Адміни читають тикети. Зламай їх через опис проблеми.",
        hint: "Обхід WAF через <img...>", targetUrl: "http://helpdesk.local/ticket/new", img: "🆘"
    },
    {
        id: 305, type: VULN_TYPES.XSS, minLevel: 6, reward: 420, xp: 255, uiType: 'COMMENTS',
        bgImage: bgDatingAppWeb,
        validation: (vals) => vals.comment && vals.comment.includes("<script>"),
        employer: role === 'white' ? "Dating App Web" : "Romance_Scammer",
        title: "Сайт Знайомств",
        desc: role === 'white' ? "Поле 'Про себе' вразливе до скриптів." : "Створи анкету, яка краде паролі всіх, хто її відкриє.",
        hint: "XSS у профілі.", targetUrl: "http://lovematch.local/profile/edit", img: "💘"
    },

    // ==========================================
    // TIER 4: API (Рівні 7-9)
    // ==========================================

    {
        id: 401, type: VULN_TYPES.API, minLevel: 7, reward: 600, xp: 375, uiType: 'JSON',
        bgImage: bgNeoBank,
        validation: (vals) => vals.body && vals.body.includes("admin"),
        employer: role === 'white' ? "NeoBank" : "Dark_Carder",
        title: "Банк: Права доступу",
        desc: role === 'white' ? "Перевір Mass Assignment в API." : "Підроби JSON, щоб стати адміном.",
        hint: "\"role\": \"admin\"", targetUrl: "http://api.bank.local/user", img: "💳"
    },
    {
        id: 402, type: VULN_TYPES.API, minLevel: 8, reward: 750, xp: 455, uiType: 'JSON',
        bgImage: bgEatFastDelivery,
        validation: (vals) => vals.body && vals.body.includes("price") && vals.body.includes("0"),
        employer: role === 'white' ? "EatFast Delivery" : "Free_Food_Hack",
        title: "Доставка Їжі",
        desc: role === 'white' ? "Перевір, чи можна змінити ціну замовлення в JSON." : "Замов мені бургерів на 100$. Ціну став 0.",
        hint: "\"price\": 0", targetUrl: "http://api.eatfast.local/order", img: "🍔"
    },
    {
        id: 403, type: VULN_TYPES.API, minLevel: 8, reward: 800, xp: 490, uiType: 'JSON',
        bgImage: bgStreamPlus,
        validation: (vals) => vals.body && vals.body.includes("premium"),
        employer: role === 'white' ? "StreamPlus" : "Movie_Leech",
        title: "Стрімінговий Сервіс",
        desc: role === 'white' ? "Користувачі можуть самі підвищувати собі підписку." : "Онови мій акаунт до Premium безкоштовно.",
        hint: "\"plan\": \"premium\"", targetUrl: "http://api.stream.local/subscription", img: "📺"
    },
    {
        id: 404, type: VULN_TYPES.API, minLevel: 9, reward: 850, xp: 510, uiType: 'JSON',
        bgImage: bgHomeControlIoT,
        validation: (vals) => vals.body && vals.body.includes("lock") && vals.body.includes("open"),
        employer: role === 'white' ? "HomeControl IoT" : "Thief_Guild",
        title: "Розумний Дім",
        desc: role === 'white' ? "Хаб розумного дому приймає команди без валідації." : "Відкрий двері в будинку на вулиці В'язів.",
        hint: "\"lock\": \"open\"", targetUrl: "http://api.smarthome.local/device/door", img: "🔐"
    },
    {
        id: 405, type: VULN_TYPES.API, minLevel: 9, reward: 900, xp: 540, uiType: 'JSON',
        bgImage: bgCertifyMeOnline,
        validation: (vals) => vals.body && (vals.body.includes("100") || vals.body.includes("passed")),
        employer: role === 'white' ? "CertifyMe Online" : "Lazy_Employee",
        title: "Платформа Курсів",
        desc: role === 'white' 
            ? "Ми виявили, що студенти отримують сертифікати, не дивлячись лекції. Перевірте API прогресу." 
            : "Мені терміново потрібен сертифікат про знання Java для роботи. Простав мені 100 балів.",
        hint: "Зміни \"progress\": 0 на 100 або \"status\": \"passed\".",
        targetUrl: "http://api.learn.local/course/java/progress", 
        img: "🎓"
    },

    // ==========================================
    // TIER 5: CMD (Рівні 10+)
    // ==========================================

    {
        id: 501, type: VULN_TYPES.CMD, minLevel: 10, reward: 1500, xp: 910, uiType: 'LOGIN',
        bgImage: bgNuclearPlant,
        validation: (vals) => vals.username && (vals.username.includes(";") || vals.username.includes("|")),
        employer: role === 'white' ? "Nuclear Plant" : "Saboteur",
        title: "АЕС: Контроль",
        desc: role === 'white' ? "Критична вразливість в системі." : "Зупини реактор. Введи команду.",
        hint: "; cat /etc/passwd", targetUrl: "http://scada.nuke.local/ping", img: "☢️"
    },
    // НОВІ ЗАВДАННЯ TIER 5
    {
        id: 502, type: VULN_TYPES.CMD, minLevel: 10, reward: 1600, xp: 960, uiType: 'LOGIN',
        bgImage: bgSmartCityTraffic,
        validation: (vals) => vals.username && vals.username.includes(";"),
        employer: role === 'white' ? "SmartCity Traffic" : "Anarchist",
        title: "Світлофори Міста",
        desc: role === 'white' ? "Система діагностики світлофорів вразлива до ін'єкцій." : "Зроби хаос. Увімкни зелене світло всюди.",
        hint: "; reboot", targetUrl: "http://traffic.city.local/diag", img: "🚦"
    },
    {
        id: 503, type: VULN_TYPES.CMD, minLevel: 11, reward: 1800, xp: 1080, uiType: 'LOGIN',
        bgImage: bgBigDamControl,
        validation: (vals) => vals.username && vals.username.includes(";"),
        employer: role === 'white' ? "BigDam Control" : "Eco_Terrorist",
        title: "Управління Дамбою",
        desc: role === 'white' ? "Датчики рівня води мають відкритий інтерфейс." : "Відкрий шлюзи. Затопимо долину.",
        hint: "; open_gates", targetUrl: "http://dam.water.local/sensor", img: "🌊"
    },
    {
        id: 504, type: VULN_TYPES.CMD, minLevel: 11, reward: 2500, xp: 1500, uiType: 'LOGIN',
        bgImage: bgMilitaryBase,
        validation: (vals) => vals.username && vals.username.includes(";"),
        employer: role === 'white' ? "Military Base" : "Foreign_Spy",
        title: "Військовий Склад",
        desc: role === 'white' ? "Секретний об'єкт. Аудит найвищого рівня." : "Дізнайся, що вони ховають у секторі 7.",
        hint: "; ls -la /secret", targetUrl: "http://topsecret.mil.local/inventory", img: "🎖️"
    }
];