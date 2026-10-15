/**
 * TARTYP Mobile Engineering CRM & Calculator v2.5
 * Core Application Logic, Localization, Calculation Engine & Reporting
 */

// Materials specification library standard for Central Asia & CIS
const materialsData = {
    gazoblok_200: { 
        name: 'Газоблок D500 (600×300×200 мм) — стеновой',
        shortName: 'Газоблок 600×300×200',
        vol: 0.036, 
        weight: 22.0, 
        bagsPerM3: 1.0, 
        perPallet: 40 
    },
    gazoblok_100: { 
        name: 'Газоблок D500 (600×300×100 мм) — перегородочный',
        shortName: 'Газоблок 600×300×100',
        vol: 0.018, 
        weight: 11.0, 
        bagsPerM3: 1.2, 
        perPallet: 80 
    },
    gazoblok_250: { 
        name: 'Газоблок D500 (600×300×250 мм) — усиленный',
        shortName: 'Газоблок 600×300×250',
        vol: 0.045, 
        weight: 27.5, 
        bagsPerM3: 0.9, 
        perPallet: 32 
    },
    gazoblok_400: { 
        name: 'Газоблок D500 (600×400×200 мм) — тепловой',
        shortName: 'Газоблок 600×400×200',
        vol: 0.048, 
        weight: 29.3, 
        bagsPerM3: 0.85, 
        perPallet: 30 
    },
    brick_1nf: { 
        name: 'Кирпич керамический 1NF (250×120×65 мм)',
        shortName: 'Кирпич 1NF (250×120×65)',
        vol: 0.00195, 
        weight: 3.5, 
        bagsPerM3: 15.3, 
        perPallet: 384 
    },
    brick_14nf: { 
        name: 'Кирпич полуторный 1.4NF (250×120×88 мм)',
        shortName: 'Кирпич 1.4NF (250×120×88)',
        vol: 0.00264, 
        weight: 4.8, 
        bagsPerM3: 12.5, 
        perPallet: 308 
    },
    brick_21nf: { 
        name: 'Кирпич двойной 2.1NF (250×120×140 мм)',
        shortName: 'Кирпич 2.1NF (250×120×140)',
        vol: 0.0042, 
        weight: 7.2, 
        bagsPerM3: 9.8, 
        perPallet: 180 
    },
    shlakoblok: { 
        name: 'Шлакоблок стандарт (390×190×188 мм)',
        shortName: 'Шлакоблок 390×190×188',
        vol: 0.01393, 
        weight: 18.0, 
        bagsPerM3: 5.1, 
        perPallet: 72 
    },
    penoblok: { 
        name: 'Пеноблок D600 (600×300×200 мм)',
        shortName: 'Пеноблок 600×300×200',
        vol: 0.036, 
        weight: 24.0, 
        bagsPerM3: 1.0, 
        perPallet: 40 
    },
    teploblok: { 
        name: 'Теплоблок (400×200×300 мм)',
        shortName: 'Теплоблок 400×200×300',
        vol: 0.024, 
        weight: 23.0, 
        bagsPerM3: 2.5, 
        perPallet: 54 
    },
    spliter: { 
        name: 'Сплитерный блок (390×190×190 мм)',
        shortName: 'Сплитер 390×190×190',
        vol: 0.01408, 
        weight: 19.0, 
        bagsPerM3: 4.8, 
        perPallet: 60 
    }
};

// Bilingual Interface Dictionary (Russian & Kazakh)
const i18n = {
    ru: {
        cardGeneral: "Объект и Материал",
        cardGeo: "Размеры стен",
        cardOpenings: "Проемы, Бетон и Запас",
        projName: "Название объекта",
        material: "Материал кладки",
        wallLen: "Длина",
        wallHgt: "Высота",
        wallThk: "Толщина",
        openings: "Проемы",
        wastePct: "Бой/Запас",
        betonVol: "Бетон",
        title3D: "3D Модель стены (BIM)",
        legMasonry: "Кладка",
        legConcrete: "Армопояс",
        legOpening: "Проем",
        badge3D: "🔄 360° Вращение",
        techResults: "Инженерный расчет",
        qtyWaste: "ИТОГО БЛОКОВ (С ЗАПАСОМ):",
        qtyCalc: "Кол-во (точное):",
        pallets: "Паллет / Поддонов:",
        cleanVol: "Объем кладки:",
        cleanArea: "Чистая площадь стен:",
        mortar: "Клей / Сухая смесь (меш. 25кг):",
        resBeton: "Объем бетона (армопояс):",
        totalWeight: "Общий вес материалов:",
        trucks: "Фур для доставки (по 20т):",
        manualQty: "Корректировка количества вручную",
        prorabBlock: "Блок Прораба (Зарплата бригаде)",
        laborBlock: "Кладка (1 шт)",
        laborBeton: "Бетон (1 м³)",
        laborTotal: "К выплате рабочим:",
        finBlock: "Блок Бастыка (Финансы и Маржа)",
        costPrice: "Закуп блока",
        costBeton: "Закуп бетона",
        costMortar: "Закуп клея",
        sellPrice: "Продажа блока заказчику",
        sellBeton: "Продажа бетона клиенту",
        matExpense: "Затраты на материалы:",
        laborExpense: "Затраты на бригаду:",
        totalCost: "Общий расход (себестоимость):",
        totalRevenue: "Выручка от заказчика:",
        netProfit: "ЧИСТАЯ ПРИБЫЛЬ ОБЪЕКТА:",
        margin: "Рентабельность сделки:",
        saveBtn: "В Архив",
        excelBtn: "Скачать Excel",
        tgBtn: "Отправить отчет в Telegram",
        archiveTitle: "Сохраненные сметы",
        clearAll: "Очистить всё",
        settings: "Настройки системы",
        language: "Язык интерфейса / Тіл",
        role: "Рабочий режим",
        reset: "Сбросить все данные",
        guideTitle: "Инженерная инструкция",
        navCalc: "Калькулятор",
        navArchive: "Архив",
        navSettings: "Настройки",
        roleWorker: "ПРОРАБ",
        roleBoss: "БАСТЫҚ",
        pieces: "шт",
        tons: "т",
        noData: "В архиве пока нет сохраненных расчетов",
        savedSuccess: "Смета сохранена в архив!",
        deletedSuccess: "Запись удалена!",
        clearConfirm: "Удалить все сохраненные расчеты из архива?",
        resetConfirm: "Сбросить все данные приложения?",
        tgSending: "Отправка в Telegram...",
        tgSuccess: "Отчет успешно отправлен в Telegram!",
        tgError: "Ошибка при отправке в Telegram!",
        excelDownloaded: "Файл Excel успешно скачан!",
        guideSteps: [
            {
                title: "1. Замеры и миллиметры (мм)",
                body: "Все размеры стен вводятся строго в <b>миллиметрах</b>: 5 метров = <code>5000</code>, 2.8 метра = <code>2800</code>. Это исключает ошибки при дробях."
            },
            {
                title: "2. Вычет проемов (м²)",
                body: "Суммируйте площадь окон и дверей в квадратных метрах (м²). Система автоматически вычтет этот объем из кладки, сэкономив деньги на покупке блоков."
            },
            {
                title: "3. Армопояс и бетон (м³)",
                body: "Введите кубатуру заливки бетона на перемычки и пояс. Калькулятор посчитает вес и позволит отдельно рассчитать оплату бетонщикам."
            },
            {
                title: "4. Зарплаты бригаде (Блок Прораба)",
                body: "Укажите расценку кладки за 1 блок (например, 150 ₸) и куб бетона (например, 20 000 ₸). Приложение моментально выдает итоговую сумму к выдаче рабочим."
            },
            {
                title: "5. Чистая прибыль (Блок Бастыка)",
                body: "Директор включает режим «Бастық», вводит закупочные цены и цену для клиента. Система вычитает материалы и работу, показывая чистый заработок объекта."
            }
        ]
    },
    kz: {
        cardGeneral: "Нысан және Материал",
        cardGeo: "Қабырға өлшемдері",
        cardOpenings: "Ойықтар, Бетон және Қор",
        projName: "Нысан атауы",
        material: "Қалау материалы",
        wallLen: "Ұзындығы",
        wallHgt: "Биіктігі",
        wallThk: "Қалыңдығы",
        openings: "Ойықтар",
        wastePct: "Бой/Қор",
        betonVol: "Бетон",
        title3D: "Қабырғаның 3D Үлгісі (BIM)",
        legMasonry: "Қалау",
        legConcrete: "Армопояс",
        legOpening: "Ойық",
        badge3D: "🔄 360° Айналдыру",
        techResults: "Инженерлік есептеу",
        qtyWaste: "БАРЛЫҒЫ БЛОК (ҚОРМЕН):",
        qtyCalc: "Саны (дәл):",
        pallets: "Тұғыр / Паллет саны:",
        cleanVol: "Қалау көлемі:",
        cleanArea: "Қабырғаның таза ауданы:",
        mortar: "Желім / Қоспа (қап 25кг):",
        resBeton: "Бетон көлемі (белдеу):",
        totalWeight: "Жалпы салмағы:",
        trucks: "Жеткізу фуралары (20т):",
        manualQty: "Блок санын қолмен түзету",
        prorabBlock: "Прораб блогы (Бригада жалақысы)",
        laborBlock: "Қалау (1 дана)",
        laborBeton: "Бетон (1 м³)",
        laborTotal: "Жұмысшыларға төлем:",
        finBlock: "Бастық блогы (Қаржы және Пайда)",
        costPrice: "Блок сатып алу",
        costBeton: "Бетон сатып алу",
        costMortar: "Желім сатып алу",
        sellPrice: "Блокты сату бағасы",
        sellBeton: "Бетонды сату бағасы",
        matExpense: "Материал шығындары:",
        laborExpense: "Бригадаға төлем:",
        totalCost: "Жалпы шығын (өзіндік құн):",
        totalRevenue: "Тапсырыс берушіден түсім:",
        netProfit: "НЫСАННЫҢ ТАЗА ПАЙДАСЫ:",
        margin: "Мәміле табыстылығы:",
        saveBtn: "Мұрағатқа",
        excelBtn: "Excel жүктеу",
        tgBtn: "Telegram-ға жіберу",
        archiveTitle: "Сақталған сметалар",
        clearAll: "Барлығын өшіру",
        settings: "Жүйе баптаулары",
        language: "Интерфейс тілі",
        role: "Жұмыс режимі",
        reset: "Деректерді жою",
        guideTitle: "Инженерлік нұсқаулық",
        navCalc: "Есептеу",
        navArchive: "Мұрағат",
        navSettings: "Баптаулар",
        roleWorker: "ПРОРАБ",
        roleBoss: "БАСТЫҚ",
        pieces: "дана",
        tons: "т",
        noData: "Мұрағатта әзірге сақталған есептер жоқ",
        savedSuccess: "Смета мұрағатқа сақталды!",
        deletedSuccess: "Жазба өшірілді!",
        clearConfirm: "Мұрағаттағы барлық есептерді өшіру керек пе?",
        resetConfirm: "Қосымшаның барлық деректерін тазарту керек пе?",
        tgSending: "Telegram-ға жіберілуде...",
        tgSuccess: "Есеп Telegram-ға сәтті жіберілді!",
        tgError: "Telegram-ға жіберуде қате шықты!",
        excelDownloaded: "Excel файлы сәтті жүктелді!",
        guideSteps: [
            {
                title: "1. Өлшемдер және миллиметр (мм)",
                body: "Қабырға өлшемдері тек <b>миллиметрмен</b> енгізіледі: 5 метр = <code>5000</code>, 2.8 метр = <code>2800</code>. Бұл қателіктерден сақтайды."
            },
            {
                title: "2. Ойықтарды шегеру (м²)",
                body: "Есіктер мен терезелердің ауданын шаршы метрмен (м²) қосыңыз. Жүйе бұл көлемді қалаудан шегеріп, артық шығынды азайтады."
            },
            {
                title: "3. Армопояс және бетон (м³)",
                body: "Армопояс пен белдеудің бетон көлемін (м³) енгізіңіз. Калькулятор салмақты және бетон құюшылардың ақысын автоматты түрде есептейді."
            },
            {
                title: "4. Бригада жалақысы (Прораб блогы)",
                body: "1 блокты қалау ставкасын (мысалы, 150 ₸) және бетонның кубын көрсетіңіз. Бағдарлама бригадаға берілетін таза жалақыны көрсетеді."
            },
            {
                title: "5. Таза пайда (Бастық блогы)",
                body: "Бастық сатып алу және сату бағаларын енгізеді. Жүйе шығындар мен жалақыны шегеріп, нысанның нақты таза табысын шығарып береді."
            }
        ]
    }
};

// Global App State
let currentLang = localStorage.getItem('tartyp_lang') || 'ru';
let currentRole = localStorage.getItem('tartyp_role') || 'worker'; // 'worker' or 'boss'
let projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');

if (projects.length === 0) {
    projects = [
        {
            id: 1713500000000,
            date: '14.10.2026 14:30',
            projectName: 'ЖК BI City, Корпус 3',
            matKey: 'gazoblok_200',
            matName: 'Газоблок D500 (600×300×200 мм) — стеновой',
            matShort: 'Газоблок 600×300×200',
            wLen: 12000, wHgt: 3200, wThk: 200, oArea: 6.8, wPct: 7, bVol: 2.4,
            netWallArea: 31.6, netMasonryVol: 6.32,
            exactQty: 176, wasteQty: 189, hasManual: false, finalQty: 189,
            pallets: 5, mortarBags: 7, totalWeightTons: 10.1, trucksCount: 1,
            lBlock: 150, lBeton: 20000, laborMasonry: 28350, laborConcrete: 48000, totalLaborWages: 76350,
            cBlock: 650, cBeton: 25000, cMortar: 1800, sBlock: 1200,
            matExpenses: 195450, totalExpenses: 271800, totalRevenue: 226800, netProfit: 145000, marginPct: 35.2,
            inputs: {
                projectName: 'ЖК BI City, Корпус 3',
                materialSelect: 'gazoblok_200',
                wallLength: '12000', wallHeight: '3200', wallThickness: '200',
                openingsArea: '6.8', wastePercent: '7', betonVol: '2.4',
                manualQty: '', laborBlockRate: '150', laborBetonRate: '20000',
                costPrice: '650', betonCostRate: '25000', mortarCostRate: '1800', sellPrice: '1200'
            }
        },
        {
            id: 1713400000000,
            date: '12.10.2026 10:15',
            projectName: 'Коттеджный городок Нура',
            matKey: 'brick_1nf',
            matName: 'Кирпич керамический 1NF (250×120×65 мм)',
            matShort: 'Кирпич 1NF (250×120×65)',
            wLen: 18000, wHgt: 3000, wThk: 380, oArea: 9.5, wPct: 8, bVol: 3.5,
            netWallArea: 44.5, netMasonryVol: 16.91,
            exactQty: 8672, wasteQty: 9366, hasManual: false, finalQty: 9366,
            pallets: 25, mortarBags: 259, totalWeightTons: 47.7, trucksCount: 3,
            lBlock: 25, lBeton: 22000, laborMasonry: 234150, laborConcrete: 77000, totalLaborWages: 311150,
            cBlock: 65, cBeton: 26000, cMortar: 1500, sBlock: 120,
            matExpenses: 1088290, totalExpenses: 1399440, totalRevenue: 1123920, netProfit: 520000, marginPct: 27.1,
            inputs: {
                projectName: 'Коттеджный городок Нура',
                materialSelect: 'brick_1nf',
                wallLength: '18000', wallHeight: '3000', wallThickness: '380',
                openingsArea: '9.5', wastePercent: '8', betonVol: '3.5',
                manualQty: '', laborBlockRate: '25', laborBetonRate: '22000',
                costPrice: '65', betonCostRate: '26000', mortarCostRate: '1500', sellPrice: '120'
            }
        }
    ];
    localStorage.setItem('tartyp_projects', JSON.stringify(projects));
}

// DOM Elements Cache
const dom = {
    // Header controls
    quickRoleBadge: document.getElementById('quickRoleBadge'),
    headerRoleIcon: document.getElementById('headerRoleIcon'),
    headerRoleText: document.getElementById('headerRoleText'),
    langRuBtn: document.getElementById('langRuBtn'),
    langKzBtn: document.getElementById('langKzBtn'),
    toast: document.getElementById('toast'),

    // Navigation & Views
    navCalc: document.getElementById('navCalc'),
    navArchive: document.getElementById('navArchive'),
    navSettings: document.getElementById('navSettings'),
    calcView: document.getElementById('calcView'),
    archiveView: document.getElementById('archiveView'),
    settingsView: document.getElementById('settingsView'),

    // Inputs
    projectName: document.getElementById('projectName'),
    materialSelect: document.getElementById('materialSelect'),
    wallLength: document.getElementById('wallLength'),
    wallHeight: document.getElementById('wallHeight'),
    wallThickness: document.getElementById('wallThickness'),
    openingsArea: document.getElementById('openingsArea'),
    wastePercent: document.getElementById('wastePercent'),
    betonVol: document.getElementById('betonVol'),
    manualQty: document.getElementById('manualQty'),

    // Prorab Rates
    laborBlockRate: document.getElementById('laborBlockRate'),
    laborBetonRate: document.getElementById('laborBetonRate'),
    resLaborTotal: document.getElementById('resLaborTotal'),

    // Bastyk Inputs & Fin Block
    financialBlock: document.getElementById('financialBlock'),
    costPrice: document.getElementById('costPrice'),
    betonCostRate: document.getElementById('betonCostRate'),
    mortarCostRate: document.getElementById('mortarCostRate'),
    sellPrice: document.getElementById('sellPrice'),
    sellBetonPrice: document.getElementById('sellBetonPrice'),
    resMatExpense: document.getElementById('resMatExpense'),
    resLaborExpense: document.getElementById('resLaborExpense'),
    resTotalCost: document.getElementById('resTotalCost'),
    resRevenue: document.getElementById('resRevenue'),
    resNetProfit: document.getElementById('resNetProfit'),
    resMargin: document.getElementById('resMargin'),

    // Technical Results
    resQtyWaste: document.getElementById('resQtyWaste'),
    resQty: document.getElementById('resQty'),
    resPallets: document.getElementById('resPallets'),
    resCleanVol: document.getElementById('resCleanVol'),
    resCleanArea: document.getElementById('resCleanArea'),
    resMortar: document.getElementById('resMortar'),
    resBeton: document.getElementById('resBeton'),
    resWeight: document.getElementById('resWeight'),
    resTrucks: document.getElementById('resTrucks'),

    // Buttons
    saveBtn: document.getElementById('saveBtn'),
    exportExcelBtn: document.getElementById('exportExcelBtn'),
    tgBtn: document.getElementById('tgBtn'),
    clearArchiveBtn: document.getElementById('clearArchiveBtn'),
    archiveList: document.getElementById('archiveList'),
    langSelect: document.getElementById('langSelect'),
    roleSelect: document.getElementById('roleSelect'),
    resetDataBtn: document.getElementById('resetDataBtn'),
    guideContent: document.getElementById('guideContent')
};

// Haptic Vibration helper
function vibe(ms = 15) {
    if (navigator.vibrate) {
        try { navigator.vibrate(ms); } catch (e) {}
    }
}

// Floating Toast Notification
let toastTimeout;
function showToast(message, type = 'info') {
    if (!dom.toast) return;
    clearTimeout(toastTimeout);
    dom.toast.textContent = message;
    dom.toast.className = `show ${type}`;
    toastTimeout = setTimeout(() => {
        dom.toast.className = '';
    }, 2500);
}

// Number Formatter helper (Kazakhstan tenge / Russian format)
function formatNum(num, decimals = 0) {
    if (isNaN(num) || num === null) return '0';
    return Number(num).toLocaleString('ru-RU', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

// Apply Selected Language
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('tartyp_lang', lang);
    const t = i18n[lang];

    // Toggle header lang buttons state
    if (dom.langRuBtn && dom.langKzBtn) {
        dom.langRuBtn.classList.toggle('active', lang === 'ru');
        dom.langKzBtn.classList.toggle('active', lang === 'kz');
    }
    if (dom.langSelect) {
        dom.langSelect.value = lang;
    }

    // Translate static labels
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('t-card-general', t.cardGeneral);
    setText('t-card-geo', t.cardGeo);
    setText('t-card-openings', t.cardOpenings);
    setText('t-proj-name', t.projName);
    setText('t-material', t.material);
    setText('t-wall-len', t.wallLen);
    setText('t-wall-hgt', t.wallHgt);
    setText('t-wall-thk', t.wallThk);
    setText('t-openings', t.openings);
    setText('t-waste-pct', t.wastePct);
    setText('t-beton-vol', t.betonVol);
    setText('t-3d-title', t.title3D);
    setText('t-leg-masonry', t.legMasonry);
    setText('t-leg-concrete', t.legConcrete);
    setText('t-leg-opening', t.legOpening);
    const badge3d = document.querySelector('.badge-3d');
    if (badge3d) badge3d.textContent = t.badge3D;
    setText('t-tech-results', t.techResults);
    setText('t-qty-waste', t.qtyWaste);
    setText('t-qty-calc', t.qtyCalc);
    setText('t-pallets', t.pallets);
    setText('t-clean-vol', t.cleanVol);
    setText('t-clean-area', t.cleanArea);
    setText('t-mortar', t.mortar);
    setText('t-res-beton', t.resBeton);
    setText('t-total-weight', t.totalWeight);
    setText('t-trucks', t.trucks);
    setText('t-manual-qty', t.manualQty);
    setText('t-prorab-block', t.prorabBlock);
    setText('t-labor-block', t.laborBlock);
    setText('t-labor-beton', t.laborBeton);
    setText('t-labor-total', t.laborTotal);
    setText('t-fin-block', t.finBlock);
    setText('t-cost-price', t.costPrice);
    setText('t-cost-beton', t.costBeton);
    setText('t-cost-mortar', t.costMortar);
    setText('t-sell-price', t.sellPrice);
    setText('t-sell-beton', t.sellBeton);
    setText('t-mat-expense', t.matExpense);
    setText('t-labor-expense', t.laborExpense);
    setText('t-total-cost', t.totalCost);
    setText('t-total-revenue', t.totalRevenue);
    setText('t-net-profit', t.netProfit);
    setText('t-margin', t.margin);
    setText('t-save-btn', t.saveBtn);
    setText('t-excel-btn', t.excelBtn);
    setText('t-tg-btn', t.tgBtn);
    setText('t-archive-title', t.archiveTitle);
    setText('t-clear-all', t.clearAll);
    setText('t-settings', t.settings);
    setText('t-language', t.language);
    setText('t-role', t.role);
    setText('t-reset', t.reset);
    setText('t-guide-title', t.guideTitle);
    setText('t-nav-calc', t.navCalc);
    setText('t-nav-archive', t.navArchive);
    setText('t-nav-settings', t.navSettings);

    // Update Header Role Badge text
    updateRoleUI();

    // Render localized guide steps
    renderGuide();

    // Re-render calculations & archive
    calculate();
    renderArchive();
}

// Render Interactive Guide
function renderGuide() {
    if (!dom.guideContent) return;
    const steps = i18n[currentLang].guideSteps;
    dom.guideContent.innerHTML = steps.map(step => `
        <div class="guide-step">
            <div class="guide-step-title">
                <span>📌</span>
                <span>${step.title}</span>
            </div>
            <div class="guide-step-body">${step.body}</div>
        </div>
    `).join('');
}

// Role Management (Worker / Boss)
function setRole(role) {
    currentRole = role;
    localStorage.setItem('tartyp_role', role);
    if (dom.roleSelect) dom.roleSelect.value = role;
    updateRoleUI();
    calculate();
}

function updateRoleUI() {
    const t = i18n[currentLang];
    const isBoss = currentRole === 'boss';

    if (dom.headerRoleIcon && dom.headerRoleText && dom.quickRoleBadge) {
        dom.headerRoleIcon.textContent = isBoss ? '👑' : '👷';
        dom.headerRoleText.textContent = isBoss ? t.roleBoss : t.roleWorker;
        dom.quickRoleBadge.classList.toggle('boss-active', isBoss);
    }

    if (dom.financialBlock) {
        if (isBoss) {
            dom.financialBlock.classList.remove('hidden');
        } else {
            dom.financialBlock.classList.add('hidden');
        }
    }
}

// Core Mathematical Engine
function calculate() {
    const t = i18n[currentLang];

    // Read Input Values
    const wLen = Math.max(0, parseFloat(dom.wallLength.value) || 0); // mm
    const wHgt = Math.max(0, parseFloat(dom.wallHeight.value) || 0); // mm
    const wThk = Math.max(1, parseFloat(dom.wallThickness.value) || 200); // mm
    const oArea = Math.max(0, parseFloat(dom.openingsArea.value) || 0); // m2
    const wPct = Math.max(0, parseFloat(dom.wastePercent.value) || 0); // %
    const bVol = Math.max(0, parseFloat(dom.betonVol.value) || 0); // m3

    // Material specs
    const matKey = dom.materialSelect.value || 'gazoblok_200';
    const mat = materialsData[matKey] || materialsData.gazoblok_200;

    // Dimensions in meters
    const lenM = wLen / 1000;
    const hgtM = wHgt / 1000;
    const thkM = wThk / 1000;

    // Areas & Volumes
    const grossWallArea = lenM * hgtM;
    const netWallArea = Math.max(0, grossWallArea - oArea);
    const netMasonryVol = Math.max(0, netWallArea * thkM);

    // Block Quantities
    const exactQty = netMasonryVol > 0 ? Math.ceil(netMasonryVol / mat.vol) : 0;
    const wasteQty = Math.ceil(exactQty * (1 + (wPct / 100)));

    // Manual Override
    const manualInput = parseInt(dom.manualQty.value);
    const hasManual = !isNaN(manualInput) && manualInput > 0;
    const finalQty = hasManual ? manualInput : wasteQty;

    // Logistics & Weight
    const pallets = Math.ceil(finalQty / mat.perPallet);
    const mortarBags = Math.ceil(netMasonryVol * mat.bagsPerM3);
    const blocksWeightKg = finalQty * mat.weight;
    const mortarWeightKg = mortarBags * 25;
    const concreteWeightKg = bVol * 2400; // ~2.4t per m3 reinforced concrete
    const totalWeightTons = (blocksWeightKg + mortarWeightKg + concreteWeightKg) / 1000;
    const trucksCount = totalWeightTons > 0 ? Math.ceil(totalWeightTons / 20) : 0;

    // Labor Rates (Prorab)
    const lBlock = Math.max(0, parseFloat(dom.laborBlockRate.value) || 0);
    const lBeton = Math.max(0, parseFloat(dom.laborBetonRate.value) || 0);
    const laborMasonry = finalQty * lBlock;
    const laborConcrete = bVol * lBeton;
    const totalLaborWages = laborMasonry + laborConcrete;

    // Financial Rates (Bastyk)
    const cBlock = Math.max(0, parseFloat(dom.costPrice.value) || 0);
    const cBeton = Math.max(0, parseFloat(dom.betonCostRate.value) || 0);
    const cMortar = Math.max(0, parseFloat(dom.mortarCostRate.value) || 0);
    const sBlock = Math.max(0, parseFloat(dom.sellPrice.value) || 0);
    const sBeton = Math.max(0, parseFloat(dom.sellBetonPrice ? dom.sellBetonPrice.value : 0) || 0);

    const matExpenses = (finalQty * cBlock) + (bVol * cBeton) + (mortarBags * cMortar);
    const totalExpenses = matExpenses + totalLaborWages;
    const totalRevenue = (finalQty * sBlock) + (bVol * sBeton);
    const netProfit = totalRevenue - totalExpenses;
    const marginPct = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100) : 0;

    // Render Technical Results to DOM (with Juicy Ease-Out Odometer if available)
    if (window.TartypFX && typeof window.TartypFX.animateValue === 'function') {
        TartypFX.animateValue(dom.resQtyWaste, finalQty, 350, ` ${t.pieces}`);
        TartypFX.animateValue(dom.resQty, exactQty, 350, ` ${t.pieces}`);
        TartypFX.animateValue(dom.resPallets, pallets, 350, ` ${t.pieces}`);
        TartypFX.animateValue(dom.resLaborTotal, totalLaborWages, 350, ' ₸');
        TartypFX.animateValue(dom.resTotalCost, totalExpenses, 350, ' ₸');
        TartypFX.animateValue(dom.resRevenue, totalRevenue, 350, ' ₸');
        TartypFX.animateValue(dom.resNetProfit, netProfit, 350, ' ₸');
    } else {
        dom.resQtyWaste.textContent = `${formatNum(finalQty)} ${t.pieces}`;
        dom.resQty.textContent = `${formatNum(exactQty)} ${t.pieces}`;
        dom.resPallets.textContent = `${formatNum(pallets)} ${t.pieces}`;
        dom.resLaborTotal.textContent = `${formatNum(totalLaborWages)} ₸`;
        dom.resTotalCost.textContent = `${formatNum(totalExpenses)} ₸`;
        dom.resRevenue.textContent = `${formatNum(totalRevenue)} ₸`;
        dom.resNetProfit.textContent = `${formatNum(netProfit)} ₸`;
    }

    dom.resCleanVol.textContent = `${netMasonryVol.toFixed(3)} м³`;
    dom.resCleanArea.textContent = `${netWallArea.toFixed(2)} м²`;
    dom.resMortar.textContent = `${formatNum(mortarBags)} ${t.pieces}`;
    dom.resBeton.textContent = `${bVol.toFixed(3)} м³`;
    dom.resWeight.textContent = `${totalWeightTons.toFixed(2)} ${t.tons}`;
    dom.resTrucks.textContent = `${formatNum(trucksCount)} шт`;

    // Render Bastyk Financials
    dom.resMatExpense.textContent = `${formatNum(matExpenses)} ₸`;
    dom.resLaborExpense.textContent = `${formatNum(totalLaborWages)} ₸`;
    dom.resMargin.textContent = `${marginPct.toFixed(1)} %`;

    // Profit dynamic coloring
    if (netProfit < 0) {
        dom.resNetProfit.style.color = 'var(--color-danger)';
        dom.resMargin.style.color = 'var(--color-danger)';
    } else {
        dom.resNetProfit.style.color = 'var(--color-success)';
        dom.resMargin.style.color = 'var(--color-success)';
    }

    // Real-time 3D BIM Model Update
    if (window.TartypFX && typeof window.TartypFX.update3DWall === 'function') {
        window.TartypFX.update3DWall({
            wLen,
            wHgt,
            wThk,
            oArea,
            bVol,
            matKey
        });
    }

    // Return current calculated snapshot object
    return {
        projectName: dom.projectName.value.trim() || (currentLang === 'kz' ? 'Жаңа нысан' : 'Новый объект'),
        matKey,
        matName: mat.name,
        matShort: mat.shortName,
        wLen, wHgt, wThk, oArea, wPct, bVol,
        netWallArea, netMasonryVol,
        exactQty, wasteQty, hasManual, finalQty,
        pallets, mortarBags, totalWeightTons, trucksCount,
        lBlock, lBeton, laborMasonry, laborConcrete, totalLaborWages,
        cBlock, cBeton, cMortar, sBlock, sBeton,
        matExpenses, totalExpenses, totalRevenue, netProfit, marginPct
    };
}

// Generate Native Excel Binary (.xlsx) using SheetJS
function generateExcelWorkbook(data) {
    const isKz = currentLang === 'kz';
    const dateStr = new Date().toLocaleString('ru-RU');

    // Structured Table Rows
    const rows = [
        ["ИНЖЕНЕРНАЯ СМЕТА TARTYP CRM", "", ""],
        ["Дата формирования", dateStr, ""],
        ["Объект", data.projectName, ""],
        ["Материал", data.matName, ""],
        ["", "", ""],
        ["ПАРАМЕТРЫ СТЕН И ПРОЕМОВ", "ЗНАЧЕНИЕ", "ЕД. ИЗМ."],
        ["Длина стены", data.wLen, "мм"],
        ["Высота стены", data.wHgt, "мм"],
        ["Толщина стены", data.wThk, "мм"],
        ["Площадь проемов (окна/двери)", data.oArea, "м²"],
        ["Чистая площадь стен", Number(data.netWallArea.toFixed(2)), "м²"],
        ["Чистый объем кладки", Number(data.netMasonryVol.toFixed(3)), "м³"],
        ["Объем бетона (армопояс/перемычки)", Number(data.bVol.toFixed(3)), "м³"],
        ["Запас на бой и подрезку", data.wPct, "%"],
        ["", "", ""],
        ["ПОТРЕБНОСТЬ В МАТЕРИАЛАХ И ЛОГИСТИКА", "КОЛИЧЕСТВО", "ЕД. ИЗМ."],
        ["Расчетное количество блоков", data.exactQty, "шт"],
        ["ИТОГО БЛОКОВ К ЗАКУПУ (С ЗАПАСОМ)", data.finalQty, "шт"],
        ["Количество поддонов / паллет", data.pallets, "подд."],
        ["Клей / кладочная смесь (мешки 25кг)", data.mortarBags, "меш."],
        ["Общий строительный вес материалов", Number(data.totalWeightTons.toFixed(2)), "тонн"],
        ["Фур для перевозки (по 20т)", data.trucksCount, "рейсов"],
        ["", "", ""],
        ["ОПЛАТА ТРУДА (БРИГАДА / ПРОРАБ)", "СУММА", "ВАЛЮТА"],
        ["Ставка кладки блока за 1 шт", data.lBlock, "₸/шт"],
        ["Оплата за кладку блоков", data.laborMasonry, "₸"],
        ["Ставка заливки бетона за 1 м³", data.lBeton, "₸/м³"],
        ["Оплата за заливку бетона", data.laborConcrete, "₸"],
        ["ИТОГО К ВЫПЛАТЕ РАБОЧИМ", data.totalLaborWages, "₸"]
    ];

    if (currentRole === 'boss') {
        rows.push(
            ["", "", ""],
            ["ФИНАНСОВЫЙ ОТЧЕТ РУКОВОДИТЕЛЯ (БАСТЫҚ)", "СУММА", "ВАЛЮТА"],
            ["Закуп блока за 1 шт", data.cBlock, "₸/шт"],
            ["Закуп бетона за 1 м³", data.cBeton, "₸/м³"],
            ["Закуп клея за 1 мешок", data.cMortar, "₸/меш"],
            ["Цена продажи блока (за 1 шт)", data.sBlock, "₸/шт"],
            ["Цена продажи бетона клиенту (за 1 м³)", data.sBeton, "₸/м³"],
            ["Общие затраты на материалы", data.matExpenses, "₸"],
            ["Общие затраты на оплату труда", data.totalLaborWages, "₸"],
            ["СЕБЕСТОИМОСТЬ ОБЪЕКТА (МАТ + РАБОТА)", data.totalExpenses, "₸"],
            ["ВЫРУЧКА ОТ КЛИЕНТА", data.totalRevenue, "₸"],
            ["ЧИСТАЯ ПРИБЫЛЬ ОБЪЕКТА", data.netProfit, "₸"],
            ["РЕНТАБЕЛЬНОСТЬ СДЕЛКИ", Number(data.marginPct.toFixed(1)), "%"]
        );
    }

    const ws = XLSX.utils.aoa_to_sheet(rows);

    // Set column widths
    ws['!cols'] = [
        { wch: 44 },
        { wch: 22 },
        { wch: 15 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Смета TARTYP");

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });

    const safeFilename = `TARTYP_${data.projectName.replace(/[^a-zA-Z0-9а-яА-ЯёЁ_-]/g, '_')}.xlsx`;
    return { blob, filename: safeFilename };
}

// Direct Download Excel file
function downloadExcelFile() {
    vibe();
    const data = calculate();
    const { blob, filename } = generateExcelWorkbook(data);

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(i18n[currentLang].excelDownloaded, 'success');
}

// Send Report to Telegram Bot
async function sendTelegramReport() {
    vibe();
    const data = calculate();
    const t = i18n[currentLang];
    const dateStr = new Date().toLocaleString('ru-RU');

    const origText = dom.tgBtn.innerHTML;
    dom.tgBtn.innerHTML = `<span>⏳</span><span>${t.tgSending}</span>`;
    dom.tgBtn.disabled = true;

    // Compact & clean Markdown caption (< 1000 chars limit for Telegram sendDocument)
    let caption = `🏗 *TARTYP CRM: ${data.projectName}*\n`;
    caption += `📅 *${dateStr}*\n\n`;
    caption += `🧱 *Материал:* ${data.matShort}\n`;
    caption += `📏 *Стена:* ${data.wLen}×${data.wHgt}×${data.wThk} мм\n`;
    caption += `📐 *Площадь:* ${data.netWallArea.toFixed(2)} м² | *Объем:* ${data.netMasonryVol.toFixed(3)} м³\n`;
    caption += `📦 *Блоков с запасом (${data.wPct}%):* *${formatNum(data.finalQty)} шт* (${data.pallets} подд.)\n`;
    caption += `🪣 *Клей/Смесь:* ${data.mortarBags} меш. | 💧 *Бетон:* ${data.bVol.toFixed(2)} м³\n`;
    caption += `⚖️ *Вес:* ${data.totalWeightTons.toFixed(2)} т | 🚛 *Фур:* ${data.trucksCount} шт\n\n`;

    caption += `👷 *Бригада (К выдаче):* *${formatNum(data.totalLaborWages)} ₸*\n`;
    if (data.lBlock > 0) caption += `• Кладка: ${formatNum(data.lBlock)} ₸/шт (${formatNum(data.laborMasonry)} ₸)\n`;
    if (data.lBeton > 0 && data.bVol > 0) caption += `• Бетон: ${formatNum(data.lBeton)} ₸/м³ (${formatNum(data.laborConcrete)} ₸)\n`;

    if (currentRole === 'boss') {
        caption += `\n👑 *Финансы Бастыка:*\n`;
        caption += `• Расход (Мат+Работа): ${formatNum(data.totalExpenses)} ₸\n`;
        caption += `• Выручка: ${formatNum(data.totalRevenue)} ₸\n`;
        caption += `💰 *Чистая прибыль:* *${formatNum(data.netProfit)} ₸* (${data.marginPct.toFixed(1)}%)\n`;
    }

    caption += `\n📎 _Детальная ведомость прикреплена в Excel файле_`;

    const { blob, filename } = generateExcelWorkbook(data);

    const token = '8678551019:AAHLndEACJNRey8u74uAApUVaT_iQEeebjQ';
    const chatId = '5623597772';
    const url = `https://api.telegram.org/bot${token}/sendDocument`;

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', caption);
    formData.append('parse_mode', 'Markdown');
    formData.append('document', blob, filename);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            showToast(t.tgSuccess, 'success');
        } else {
            const errData = await response.json().catch(() => ({}));
            console.warn('Telegram API response not ok:', errData);
            showToast(t.tgError, 'error');
            // If failed, auto-trigger local download so data isn't lost
            downloadExcelFile();
        }
    } catch (err) {
        console.error('Network Error during Telegram upload:', err);
        showToast(t.tgError, 'error');
        downloadExcelFile();
    } finally {
        dom.tgBtn.innerHTML = origText;
        dom.tgBtn.disabled = false;
    }
}

// Archive Storage & Rendering
function saveProjectToArchive() {
    vibe();
    const data = calculate();
    const projectRecord = {
        id: Date.now(),
        date: new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        ...data,
        inputs: {
            projectName: dom.projectName.value,
            materialSelect: dom.materialSelect.value,
            wallLength: dom.wallLength.value,
            wallHeight: dom.wallHeight.value,
            wallThickness: dom.wallThickness.value,
            openingsArea: dom.openingsArea.value,
            wastePercent: dom.wastePercent.value,
            betonVol: dom.betonVol.value,
            manualQty: dom.manualQty.value,
            laborBlockRate: dom.laborBlockRate.value,
            laborBetonRate: dom.laborBetonRate.value,
            costPrice: dom.costPrice.value,
            betonCostRate: dom.betonCostRate.value,
            mortarCostRate: dom.mortarCostRate.value,
            sellPrice: dom.sellPrice.value,
            sellBetonPrice: dom.sellBetonPrice ? dom.sellBetonPrice.value : ''
        }
    };

    projects.unshift(projectRecord);
    localStorage.setItem('tartyp_projects', JSON.stringify(projects));
    renderArchive();
    showToast(i18n[currentLang].savedSuccess, 'success');
}

function renderArchive() {
    if (!dom.archiveList) return;
    dom.archiveList.innerHTML = '';
    const t = i18n[currentLang];

    if (projects.length === 0) {
        dom.archiveList.innerHTML = `
            <div class="empty-state">
                <div class="icon">📁</div>
                <p>${t.noData}</p>
            </div>
        `;
        return;
    }

    projects.forEach(p => {
        const item = document.createElement('div');
        item.className = 'archive-item';
        
        let profitPill = '';
        if (currentRole === 'boss' && p.netProfit !== undefined) {
            profitPill = `
                <div class="spec-pill profit">
                    <span>Пайда/Прибыль:</span> <strong>${formatNum(p.netProfit)} ₸</strong>
                </div>
            `;
        }

        item.innerHTML = `
            <div class="archive-header">
                <div>
                    <h4 class="archive-title">${p.projectName || 'Без названия'}</h4>
                    <span class="archive-date">${p.date} • ${p.matShort || p.matName}</span>
                </div>
            </div>
            <div class="archive-specs">
                <div class="spec-pill"><span>Блоков:</span> <strong>${formatNum(p.finalQty)} шт</strong></div>
                <div class="spec-pill"><span>Поддонов:</span> <strong>${formatNum(p.pallets)}</strong></div>
                <div class="spec-pill"><span>Бетон:</span> <strong>${(p.bVol || 0).toFixed(2)} м³</strong></div>
                <div class="spec-pill"><span>Зарплата:</span> <strong>${formatNum(p.totalLaborWages)} ₸</strong></div>
                ${profitPill}
            </div>
            <div class="archive-btn-row">
                <button class="btn-secondary btn-sm" onclick="loadProjectFromArchive(${p.id})">
                    <span>📂</span> <span>Открыть</span>
                </button>
                <button class="btn-excel btn-sm" onclick="downloadProjectExcel(${p.id})">
                    <span>📊</span> <span>Excel</span>
                </button>
                <button class="btn-icon btn-sm delete" onclick="deleteProjectFromArchive(${p.id})" title="Удалить">
                    🗑
                </button>
            </div>
        `;
        dom.archiveList.appendChild(item);
    });
}

// Global window actions for inline onclick handlers
window.loadProjectFromArchive = function(id) {
    vibe();
    const p = projects.find(item => item.id === id);
    if (!p || !p.inputs) return;

    // Restore input fields
    const inp = p.inputs;
    dom.projectName.value = inp.projectName || '';
    dom.materialSelect.value = inp.materialSelect || 'gazoblok_200';
    dom.wallLength.value = inp.wallLength || '';
    dom.wallHeight.value = inp.wallHeight || '';
    dom.wallThickness.value = inp.wallThickness || '200';
    dom.openingsArea.value = inp.openingsArea || '';
    dom.wastePercent.value = inp.wastePercent || '7';
    dom.betonVol.value = inp.betonVol || '';
    dom.manualQty.value = inp.manualQty || '';
    dom.laborBlockRate.value = inp.laborBlockRate || '';
    dom.laborBetonRate.value = inp.laborBetonRate || '';
    dom.costPrice.value = inp.costPrice || '';
    dom.betonCostRate.value = inp.betonCostRate || '';
    dom.mortarCostRate.value = inp.mortarCostRate || '';
    dom.sellPrice.value = inp.sellPrice || '';
    if (dom.sellBetonPrice) dom.sellBetonPrice.value = inp.sellBetonPrice || '';

    calculate();
    switchTab('calc');
    showToast(`Объект "${p.projectName}" загружен!`, 'info');
};

window.downloadProjectExcel = function(id) {
    vibe();
    const p = projects.find(item => item.id === id);
    if (!p) return;
    const { blob, filename } = generateExcelWorkbook(p);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(i18n[currentLang].excelDownloaded, 'success');
};

window.deleteProjectFromArchive = function(id) {
    vibe();
    projects = projects.filter(item => item.id !== id);
    localStorage.setItem('tartyp_projects', JSON.stringify(projects));
    renderArchive();
    showToast(i18n[currentLang].deletedSuccess, 'info');
};

// Tab Switcher
function switchTab(tabName) {
    vibe(10);
    const tabs = {
        calc: { nav: dom.navCalc, view: dom.calcView },
        archive: { nav: dom.navArchive, view: dom.archiveView },
        settings: { nav: dom.navSettings, view: dom.settingsView }
    };

    Object.keys(tabs).forEach(key => {
        const item = tabs[key];
        if (key === tabName) {
            item.nav.classList.add('active');
            item.view.classList.add('active');
        } else {
            item.nav.classList.remove('active');
            item.view.classList.remove('active');
        }
    });

    if (tabName === 'archive') {
        renderArchive();
    }
}

// Preset Quick Chips Handler
function setupQuickChips() {
    document.querySelectorAll('.chip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            vibe();
            if (btn.dataset.thk) {
                dom.wallThickness.value = btn.dataset.thk;
            }
            if (btn.dataset.waste) {
                dom.wastePercent.value = btn.dataset.waste;
            }
            calculate();
        });
    });
}

// Attach Event Listeners
function setupEventListeners() {
    // Input events for real-time recalculation
    const inputFields = [
        dom.projectName, dom.materialSelect, dom.wallLength, dom.wallHeight,
        dom.wallThickness, dom.openingsArea, dom.wastePercent, dom.betonVol,
        dom.manualQty, dom.laborBlockRate, dom.laborBetonRate, dom.costPrice,
        dom.betonCostRate, dom.mortarCostRate, dom.sellPrice
    ];

    inputFields.forEach(inputEl => {
        if (inputEl) {
            inputEl.addEventListener('input', calculate);
            inputEl.addEventListener('change', calculate);
        }
    });

    // Preset chips
    setupQuickChips();

    // Navigation Tabs
    if (dom.navCalc) dom.navCalc.addEventListener('click', () => switchTab('calc'));
    if (dom.navArchive) dom.navArchive.addEventListener('click', () => switchTab('archive'));
    if (dom.navSettings) dom.navSettings.addEventListener('click', () => switchTab('settings'));

    // Header Quick Actions
    if (dom.quickRoleBadge) {
        dom.quickRoleBadge.addEventListener('click', () => {
            vibe();
            const nextRole = currentRole === 'boss' ? 'worker' : 'boss';
            setRole(nextRole);
            showToast(nextRole === 'boss' ? 'Режим: 👑 БАСТЫҚ (Финансы активны)' : 'Режим: 👷 ПРОРАБ (Смета + Зарплаты)', 'info');
        });
    }

    if (dom.langRuBtn) {
        dom.langRuBtn.addEventListener('click', () => {
            vibe();
            applyLanguage('ru');
        });
    }

    if (dom.langKzBtn) {
        dom.langKzBtn.addEventListener('click', () => {
            vibe();
            applyLanguage('kz');
        });
    }

    // Settings Dropdowns
    if (dom.langSelect) {
        dom.langSelect.addEventListener('change', (e) => applyLanguage(e.target.value));
    }

    if (dom.roleSelect) {
        dom.roleSelect.addEventListener('change', (e) => setRole(e.target.value));
    }

    // Action Buttons
    if (dom.saveBtn) dom.saveBtn.addEventListener('click', saveProjectToArchive);
    if (dom.exportExcelBtn) dom.exportExcelBtn.addEventListener('click', downloadExcelFile);
    if (dom.tgBtn) dom.tgBtn.addEventListener('click', sendTelegramReport);

    if (dom.clearArchiveBtn) {
        dom.clearArchiveBtn.addEventListener('click', () => {
            vibe();
            if (confirm(i18n[currentLang].clearConfirm)) {
                projects = [];
                localStorage.removeItem('tartyp_projects');
                renderArchive();
                showToast(i18n[currentLang].deletedSuccess, 'info');
            }
        });
    }

    if (dom.resetDataBtn) {
        dom.resetDataBtn.addEventListener('click', () => {
            vibe();
            if (confirm(i18n[currentLang].resetConfirm)) {
                localStorage.clear();
                projects = [];
                location.reload();
            }
        });
    }
}

// Initialize Application
function initApp() {
    setupEventListeners();
    if (window.TartypFX && typeof window.TartypFX.init3DWall === 'function') {
        window.TartypFX.init3DWall('wall3DContainer');
    }
    applyLanguage(currentLang);
    setRole(currentRole);
    calculate();
    renderArchive();
    handleHashRoute();
}

// URL Hash routing for direct tab opening and mode testing
function handleHashRoute() {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('boss')) setRole('boss');
    if (hash.includes('worker')) setRole('worker');
    if (hash.includes('kz')) applyLanguage('kz');
    if (hash.includes('ru')) applyLanguage('ru');
    if (hash.includes('archive')) switchTab('archive');
    if (hash.includes('settings')) switchTab('settings');
    if (hash.includes('calc')) switchTab('calc');
}
window.addEventListener('hashchange', handleHashRoute);

// Run on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
