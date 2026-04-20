const materialsData = {
    gazoblok: { name: 'Газоблок (600x300x200)', vol: 0.036, weight: 22, bagsPerM3: 1 },
    brick: { name: 'Кирпич 1NF (250x120x65)', vol: 0.00195, weight: 3.5, bagsPerM3: 15.3 },
    shlakoblok: { name: 'Шлакоблок (390x190x188)', vol: 0.01393, weight: 18, bagsPerM3: 5.1 }
};

const i18n = {
    ru: {
        settings: "Настройки", language: "Язык / Тіл", role: "Роль", reset: "Сбросить данные",
        navCalc: "Счет", navArchive: "Архив", navSettings: "Настройки",
        projName: "Название объекта", material: "Материал",
        wallLen: "Длина стены (мм)", wallHgt: "Высота стены (мм)", wallThk: "Толщина (мм)", openings: "Проемы (м²)", wastePct: "Бой (%)", betonVol: "Бетон (м³)",
        techResults: "Технические результаты", cleanArea: "Чистый объем (м³):", qtyCalc: "Кол-во (расчетное):",
        qtyWaste: "С запасом:", totalWeight: "Общий вес:", mortar: "Смесь/Клей (меш. 25кг):", trucks: "Фур (по 20т):", resBeton: "Объем бетона:", manualQty: "Итоговое количество блоков (ручной ввод шт)",
        prorabBlock: "Блок Прораба (Зарплаты)", laborBlock: "Кладка (за 1 шт, ₸)", laborBeton: "Бетон (за 1 м³, ₸)", laborTotal: "К выплате рабочим:",
        finBlock: "Блок Бастыка (Финансы)", costPrice: "Блок (закуп, ₸)", costBeton: "Бетон (закуп 1м³, ₸)", costMortar: "Клей (закуп 1меш, ₸)", sellPrice: "Продажа блоков заказчику (за 1 шт, ₸)",
        totalCost: "Расход (Мат + Работа):", netProfit: "Чистая прибыль:", saveBtn: "Сохранить в Архив",
        tgBtn: "Отправить отчет (с Excel)",
        delConfirm: "Точно удалить?", pieces: "шт", tons: "т", noData: "Нет сохраненных проектов",
        guideTitle: "Инструкция по калькулятору",
        guideText: `<p><b>1. Размеры:</b> Длину, Высоту и Толщину стены вводим строго в миллиметрах (мм). <i>Например, 5 метров — это 5000.</i></p>
                    <p style="margin-top: 10px;"><b>2. Проемы и Бетон:</b> Площадь окон (м²) и объем бетона на перемычки/армопояс (м³).</p>
                    <p style="margin-top: 10px;"><b>3. Зарплаты:</b> Прораб вводит ставки за кладку блока и куб бетона, чтобы сразу видеть итоговую зарплату бригаде.</p>
                    <p style="margin-top: 10px;"><b>4. Финансы (Бастык):</b> Бастык видит скрытый блок для ввода закупочных цен на материалы и цену продажи, чтобы рассчитать чистую прибыль.</p>`
    },
    kz: {
        settings: "Баптаулар", language: "Язык / Тіл", role: "Рөлі", reset: "Деректерді жою",
        navCalc: "Есеп", navArchive: "Мұрағат", navSettings: "Баптаулар",
        projName: "Нысан атауы", material: "Материал",
        wallLen: "Ұзындығы (мм)", wallHgt: "Биіктігі (мм)", wallThk: "Қалыңдығы (мм)", openings: "Ойықтар (м²)", wastePct: "Бой (%)", betonVol: "Бетон (м³)",
        techResults: "Техникалық нәтижелер", cleanArea: "Таза көлем (м³):", qtyCalc: "Саны (есептелген):",
        qtyWaste: "Қормен:", totalWeight: "Жалпы салмағы:", mortar: "Қоспа/Желім (қап 25кг):", trucks: "Фуралар (20т-дан):", resBeton: "Бетон көлемі:", manualQty: "Қорытынды блок саны (қолмен енгізу)",
        prorabBlock: "Прораб блогы (Жалақы)", laborBlock: "Қалау (1 дана үшін, ₸)", laborBeton: "Бетон (1 м³ үшін, ₸)", laborTotal: "Жұмысшыларға төлем:",
        finBlock: "Бастық блогы (Қаржы)", costPrice: "Блок (сатып алу, ₸)", costBeton: "Бетон (сатып алу 1м³, ₸)", costMortar: "Желім (сатып алу 1қап, ₸)", sellPrice: "Тапсырыс берушіге сату (1 дана үшін, ₸)",
        totalCost: "Шығын (Мат + Жұмыс):", netProfit: "Таза пайда:", saveBtn: "Мұрағатқа сақтау",
        tgBtn: "Есепті жіберу (Excel-мен)",
        delConfirm: "Өшіруге сенімдісіз бе?", pieces: "дана", tons: "т", noData: "Сақталған жобалар жоқ",
        guideTitle: "Калькулятор нұсқаулығы",
        guideText: `<p><b>1. Өлшемдер:</b> Қабырғаның ұзындығын, биіктігін және қалыңдығын қатаң түрде миллиметрмен (мм) енгіземіз. <i>Мысалы, 5 метр — бұл 5000.</i></p>
                    <p style="margin-top: 10px;"><b>2. Ойықтар және Бетон:</b> Терезелер ауданы (м²) және бетон көлемі (м³).</p>
                    <p style="margin-top: 10px;"><b>3. Жалақы:</b> Прораб бригаданың жалпы жалақысын көру үшін ставкаларды енгізеді.</p>
                    <p style="margin-top: 10px;"><b>4. Қаржы (Бастық):</b> Бастық таза пайданы есептеу үшін материалдар мен сату бағаларын енгізеді.</p>`
    }
};

let currentLang = localStorage.getItem('tartyp_lang') || 'ru';
let currentRole = localStorage.getItem('tartyp_role') || 'worker';
let projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');

// DOM Elements
const el = {
    langSelect: document.getElementById('langSelect'),
    roleSelect: document.getElementById('roleSelect'),
    navCalc: document.getElementById('navCalc'),
    navArchive: document.getElementById('navArchive'),
    navSettings: document.getElementById('navSettings'),
    calcView: document.getElementById('calcView'),
    archiveView: document.getElementById('archiveView'),
    settingsView: document.getElementById('settingsView'),
    archiveList: document.getElementById('archiveList'),
    finBlock: document.getElementById('financialBlock'),
    resetBtn: document.getElementById('resetDataBtn'),
    
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
    laborBlockRate: document.getElementById('laborBlockRate'),
    laborBetonRate: document.getElementById('laborBetonRate'),
    costPrice: document.getElementById('costPrice'),
    betonCostRate: document.getElementById('betonCostRate'),
    mortarCostRate: document.getElementById('mortarCostRate'),
    sellPrice: document.getElementById('sellPrice'),
    
    // Results
    resCleanArea: document.getElementById('resCleanArea'),
    resQty: document.getElementById('resQty'),
    resQtyWaste: document.getElementById('resQtyWaste'),
    resWeight: document.getElementById('resWeight'),
    resMortar: document.getElementById('resMortar'),
    resTrucks: document.getElementById('resTrucks'),
    resBeton: document.getElementById('resBeton'),
    resLaborTotal: document.getElementById('resLaborTotal'),
    resTotalCost: document.getElementById('resTotalCost'),
    resNetProfit: document.getElementById('resNetProfit'),
    
    // Actions
    saveBtn: document.getElementById('saveBtn'),
    tgBtn: document.getElementById('tgBtn')
};

// Vibrate helper
function vibe() {
    if (navigator.vibrate) navigator.vibrate(15);
}

// Translate UI
function applyTranslation() {
    const t = i18n[currentLang];
    document.getElementById('t-settings').textContent = t.settings;
    document.getElementById('t-language').textContent = t.language;
    document.getElementById('t-role').textContent = t.role;
    document.getElementById('t-reset').textContent = t.reset;
    document.getElementById('t-nav-calc').textContent = t.navCalc;
    document.getElementById('t-nav-archive').textContent = t.navArchive;
    document.getElementById('t-nav-settings').textContent = t.navSettings;
    document.getElementById('t-proj-name').textContent = t.projName;
    document.getElementById('t-material').textContent = t.material;
    document.getElementById('t-wall-len').textContent = t.wallLen;
    document.getElementById('t-wall-hgt').textContent = t.wallHgt;
    document.getElementById('t-wall-thk').textContent = t.wallThk;
    document.getElementById('t-openings').textContent = t.openings;
    document.getElementById('t-waste-pct').textContent = t.wastePct;
    document.getElementById('t-beton-vol').textContent = t.betonVol;
    document.getElementById('t-tech-results').textContent = t.techResults;
    document.getElementById('t-clean-area').textContent = t.cleanArea;
    document.getElementById('t-qty-calc').textContent = t.qtyCalc;
    document.getElementById('t-qty-waste').textContent = t.qtyWaste;
    document.getElementById('t-total-weight').textContent = t.totalWeight;
    document.getElementById('t-mortar').textContent = t.mortar;
    document.getElementById('t-trucks').textContent = t.trucks;
    document.getElementById('t-res-beton').textContent = t.resBeton;
    document.getElementById('t-manual-qty').textContent = t.manualQty;
    document.getElementById('t-prorab-block').textContent = t.prorabBlock;
    document.getElementById('t-labor-block').textContent = t.laborBlock;
    document.getElementById('t-labor-beton').textContent = t.laborBeton;
    document.getElementById('t-labor-total').textContent = t.laborTotal;
    document.getElementById('t-fin-block').textContent = t.finBlock;
    document.getElementById('t-cost-price').textContent = t.costPrice;
    document.getElementById('t-cost-beton').textContent = t.costBeton;
    document.getElementById('t-cost-mortar').textContent = t.costMortar;
    document.getElementById('t-sell-price').textContent = t.sellPrice;
    document.getElementById('t-total-cost').textContent = t.totalCost;
    document.getElementById('t-net-profit').textContent = t.netProfit;
    document.getElementById('t-save-btn').textContent = t.saveBtn;
    document.getElementById('t-tg-btn').textContent = t.tgBtn;
    document.getElementById('t-guide-title').textContent = t.guideTitle;
    document.getElementById('t-guide-text').innerHTML = t.guideText;
    calculate();
}

// Initialization
function init() {
    el.langSelect.value = currentLang;
    el.roleSelect.value = currentRole;
    updateRoleView();
    applyTranslation();
    renderArchive();
    
    // Listeners for inputs
    const inputs = ['projectName', 'materialSelect', 'wallLength', 'wallHeight', 'wallThickness', 'openingsArea', 'wastePercent', 'betonVol', 'manualQty', 'laborBlockRate', 'laborBetonRate', 'costPrice', 'betonCostRate', 'mortarCostRate', 'sellPrice'];
    inputs.forEach(id => {
        el[id].addEventListener('input', calculate);
    });
}

// Role toggle
function updateRoleView() {
    if (currentRole === 'boss') {
        el.finBlock.classList.remove('hidden');
    } else {
        el.finBlock.classList.add('hidden');
    }
}

// Calculate logic
function calculate() {
    const t = i18n[currentLang];
    
    const wLen = parseFloat(el.wallLength.value) || 0; // mm
    const wHgt = parseFloat(el.wallHeight.value) || 0; // mm
    const wThk = parseFloat(el.wallThickness.value) || 200; // mm (default 200)
    const oArea = parseFloat(el.openingsArea.value) || 0; // m2
    const wPct = parseFloat(el.wastePercent.value) || 0; // %
    const bVol = parseFloat(el.betonVol.value) || 0; // m3
    
    // Volume in m3
    const wallVol = (wLen / 1000) * (wHgt / 1000) * (wThk / 1000);
    const openingsVol = oArea * (wThk / 1000);
    const cleanVol = Math.max(0, wallVol - openingsVol);
    
    const matKey = el.materialSelect.value;
    const mat = materialsData[matKey];
    
    const qtyCalc = cleanVol > 0 ? Math.ceil(cleanVol / mat.vol) : 0;
    const qtyWaste = Math.ceil(qtyCalc * (1 + (wPct / 100)));
    
    const manualQ = parseInt(el.manualQty.value);
    const finalQty = !isNaN(manualQ) && manualQ > 0 ? manualQ : qtyWaste;
    
    const totalWeightTons = (finalQty * mat.weight) / 1000;
    const mortarBags = Math.ceil(cleanVol * mat.bagsPerM3);
    const trucks = Math.ceil(totalWeightTons / 20); // 1 truck = 20 tons
    
    el.resCleanArea.textContent = `${cleanVol.toFixed(3)} м³`;
    el.resQty.textContent = `${qtyCalc} ${t.pieces}`;
    el.resQtyWaste.textContent = `${qtyWaste} ${t.pieces}`;
    el.resWeight.textContent = `${totalWeightTons.toFixed(2)} ${t.tons}`;
    el.resMortar.textContent = `${mortarBags} ${t.pieces}`;
    el.resTrucks.textContent = `${trucks} шт`;
    el.resBeton.textContent = `${bVol.toFixed(3)} м³`;
    
    // Prorab Labor calc
    const lBlock = parseFloat(el.laborBlockRate.value) || 0;
    const lBeton = parseFloat(el.laborBetonRate.value) || 0;
    const laborTotal = (finalQty * lBlock) + (bVol * lBeton);
    el.resLaborTotal.textContent = `${laborTotal.toLocaleString('ru-RU')} ₸`;
    
    // Fin calc
    const cPrice = parseFloat(el.costPrice.value) || 0;
    const cBeton = parseFloat(el.betonCostRate.value) || 0;
    const cMortar = parseFloat(el.mortarCostRate.value) || 0;
    const sPrice = parseFloat(el.sellPrice.value) || 0;
    
    const totalExpense = laborTotal + (finalQty * cPrice) + (bVol * cBeton) + (mortarBags * cMortar);
    const totalRev = finalQty * sPrice;
    const netProfit = totalRev - totalExpense;
    
    el.resTotalCost.textContent = `${totalExpense.toLocaleString('ru-RU')} ₸`;
    el.resNetProfit.textContent = `${netProfit.toLocaleString('ru-RU')} ₸`;
    
    return {
        name: el.projectName.value || 'Без названия',
        matKey,
        matName: mat.name,
        wLen, wHgt, wThk, oArea, wPct, cleanVol, bVol,
        qtyCalc, qtyWaste, manualQ, finalQty,
        totalWeightTons, mortarBags, trucks,
        lBlock, lBeton, laborTotal,
        cPrice, cBeton, cMortar, sPrice, totalExpense, netProfit
    };
}

// Save Project
el.saveBtn.addEventListener('click', () => {
    vibe();
    const data = {
        id: Date.now(),
        date: new Date().toLocaleString('ru-RU'),
        ...calculate(),
        inputs: {
            projectName: el.projectName.value,
            materialSelect: el.materialSelect.value,
            wallLength: el.wallLength.value,
            wallHeight: el.wallHeight.value,
            wallThickness: el.wallThickness.value,
            openingsArea: el.openingsArea.value,
            wastePercent: el.wastePercent.value,
            betonVol: el.betonVol.value,
            manualQty: el.manualQty.value,
            laborBlockRate: el.laborBlockRate.value,
            laborBetonRate: el.laborBetonRate.value,
            costPrice: el.costPrice.value,
            betonCostRate: el.betonCostRate.value,
            mortarCostRate: el.mortarCostRate.value,
            sellPrice: el.sellPrice.value
        }
    };
    
    // Check if updating existing by name (simple logic: just append new or maybe overwrite by id if we implement edit mode. Let's just prepend for now)
    projects.unshift(data);
    localStorage.setItem('tartyp_projects', JSON.stringify(projects));
    renderArchive();
    
    // visual feedback
    const origText = el.saveBtn.innerHTML;
    el.saveBtn.textContent = 'Сохранено ✓';
    el.saveBtn.style.backgroundColor = '#4CAF50';
    setTimeout(() => {
        el.saveBtn.innerHTML = origText;
        el.saveBtn.style.backgroundColor = '';
    }, 1500);
});

// Load Project
window.loadProject = function(id) {
    vibe();
    const proj = projects.find(p => p.id === id);
    if (!proj) return;
    
    // Restore states
    const inputs = proj.inputs;
    el.projectName.value = inputs.projectName || '';
    el.materialSelect.value = inputs.materialSelect || 'gazoblok';
    el.wallLength.value = inputs.wallLength || '';
    el.wallHeight.value = inputs.wallHeight || '';
    el.wallThickness.value = inputs.wallThickness || '';
    el.openingsArea.value = inputs.openingsArea || '';
    el.wastePercent.value = inputs.wastePercent || '7';
    el.betonVol.value = inputs.betonVol || '';
    el.manualQty.value = inputs.manualQty || '';
    el.laborBlockRate.value = inputs.laborBlockRate || '';
    el.laborBetonRate.value = inputs.laborBetonRate || '';
    el.costPrice.value = inputs.costPrice || '';
    el.betonCostRate.value = inputs.betonCostRate || '';
    el.mortarCostRate.value = inputs.mortarCostRate || '';
    el.sellPrice.value = inputs.sellPrice || '';
    
    calculate();
    
    // Switch tab
    el.navArchive.classList.remove('active');
    el.navSettings.classList.remove('active');
    el.navCalc.classList.add('active');
    
    el.archiveView.classList.remove('active');
    el.settingsView.classList.remove('active');
    el.calcView.classList.add('active');
};

// Delete Project
window.deleteProject = function(id) {
    vibe();
    if (confirm(i18n[currentLang].delConfirm)) {
        projects = projects.filter(p => p.id !== id);
        localStorage.setItem('tartyp_projects', JSON.stringify(projects));
        renderArchive();
    }
};

// Render Archive
function renderArchive() {
    el.archiveList.innerHTML = '';
    const t = i18n[currentLang];
    if (projects.length === 0) {
        el.archiveList.innerHTML = `<p style="text-align:center; color:#AAA;">${t.noData}</p>`;
        return;
    }
    
    projects.forEach(p => {
        const item = document.createElement('div');
        item.className = 'archive-item';
        item.innerHTML = `
            <div class="archive-info" onclick="loadProject(${p.id})" style="flex:1; cursor:pointer;">
                <h4>${p.name}</h4>
                <p>${p.date} | ${p.matName}</p>
                <p>${p.finalQty} ${t.pieces} | ${p.totalWeightTons.toFixed(1)} ${t.tons}</p>
            </div>
            <div class="archive-actions">
                <button class="btn-icon delete" onclick="deleteProject(${p.id})">🗑</button>
            </div>
        `;
        el.archiveList.appendChild(item);
    });
}

// Telegram Export with CSV Document
el.tgBtn.addEventListener('click', async () => {
    vibe();
    const data = calculate();
    const t = i18n[currentLang];
    const dateStr = new Date().toLocaleString('ru-RU');
    
    const origText = el.tgBtn.innerHTML;
    el.tgBtn.innerHTML = 'Отправка...';
    
    // Generate Report Text
    let text = `🏗 *TARTYP Отчет: ${data.name}*\n`;
    text += `📅 *Дата:* ${dateStr}\n\n`;
    text += `🧱 *Материал:* ${data.matName}\n`;
    text += `📏 *Чистый объем стены:* ${data.cleanVol.toFixed(3)} м³\n`;
    text += `📦 *Кол-во (с учетом запаса ${data.wPct}%):* ${data.finalQty} шт\n`;
    if (!isNaN(data.manualQ) && data.manualQ > 0) {
        text += `*(Ручной ввод количества!)*\n`;
    }
    text += `⚖️ *Общий вес:* ${data.totalWeightTons.toFixed(2)} т\n`;
    text += `🪣 *Смесь/Клей:* ${data.mortarBags} меш. (по 25кг)\n`;
    text += `🚛 *Фур (20т):* ${data.trucks} шт\n`;
    text += `💧 *Объем бетона:* ${data.bVol.toFixed(3)} м³\n\n`;
    
    text += `👷 *Зарплаты (Прорабу):*\n`;
    text += `Кладка блоков: ${data.lBlock.toLocaleString('ru-RU')} ₸/шт\n`;
    text += `Заливка бетона: ${data.lBeton.toLocaleString('ru-RU')} ₸/м³\n`;
    text += `*Итого к выплате:* ${data.laborTotal.toLocaleString('ru-RU')} ₸\n`;
    
    if (currentRole === 'boss') {
        text += `\n💰 *Финансы (Бастык):*\n`;
        text += `Расход (Мат + Работа): ${data.totalExpense.toLocaleString('ru-RU')} ₸\n`;
        text += `Продажа заказчику: ${(data.finalQty * data.sPrice).toLocaleString('ru-RU')} ₸\n`;
        text += `*Чистая прибыль:* ${data.netProfit.toLocaleString('ru-RU')} ₸\n`;
    }
    
    // Generate CSV Content
    let csvContent = "\uFEFF";
    csvContent += "Параметр;Значение\n";
    csvContent += `Объект;${data.name}\n`;
    csvContent += `Дата;${dateStr}\n`;
    csvContent += `Материал;${data.matName}\n`;
    csvContent += `Длина стены (мм);${data.wLen}\n`;
    csvContent += `Высота стены (мм);${data.wHgt}\n`;
    csvContent += `Толщина (мм);${data.wThk}\n`;
    csvContent += `Проемы (м2);${data.oArea}\n`;
    csvContent += `Объем бетона (м3);${data.bVol.toFixed(3)}\n`;
    csvContent += `Чистый объем (м3);${data.cleanVol.toFixed(3)}\n`;
    csvContent += `Кол-во расчетное (шт);${data.qtyCalc}\n`;
    csvContent += `Кол-во с запасом ${data.wPct}% (шт);${data.qtyWaste}\n`;
    
    if (!isNaN(data.manualQ) && data.manualQ > 0) {
        csvContent += `Итоговое количество (ручное, шт);${data.manualQ}\n`;
    } else {
        csvContent += `Итоговое количество (шт);${data.finalQty}\n`;
    }
    
    csvContent += `Общий вес (т);${data.totalWeightTons.toFixed(2)}\n`;
    csvContent += `Смесь/Клей меш. по 25кг (шт);${data.mortarBags}\n`;
    csvContent += `Фур по 20т (шт);${data.trucks}\n`;
    
    csvContent += `Оплата кладка (₸/шт);${data.lBlock}\n`;
    csvContent += `Оплата бетон (₸/м3);${data.lBeton}\n`;
    csvContent += `Итого к выплате рабочим (₸);${data.laborTotal}\n`;
    
    if (currentRole === 'boss') {
        csvContent += `Закуп блок (₸/шт);${data.cPrice}\n`;
        csvContent += `Закуп бетон (₸/м3);${data.cBeton}\n`;
        csvContent += `Закуп клей (₸/меш);${data.cMortar}\n`;
        csvContent += `Продажа заказчику (₸/шт);${data.sPrice}\n`;
        csvContent += `Общий расход мат+работа (₸);${data.totalExpense}\n`;
        csvContent += `Чистая прибыль (₸);${data.netProfit}\n`;
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Telegram API details
    const token = '8678551019:AAHLndEACJNRey8u74uAApUVaT_iQEeebjQ';
    const chatId = '5623597772';
    const url = `https://api.telegram.org/bot${token}/sendDocument`;

    // FormData for document upload
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', text);
    formData.append('parse_mode', 'Markdown');
    formData.append('document', blob, `Отчет_${data.name || 'объект'}.csv`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            el.tgBtn.textContent = 'Успешно отправлено ✓';
            el.tgBtn.style.backgroundColor = '#4CAF50';
        } else {
            el.tgBtn.textContent = 'Ошибка!';
            el.tgBtn.style.backgroundColor = 'var(--color-danger)';
        }
    } catch (e) {
        console.error('Telegram Bot Error:', e);
        el.tgBtn.textContent = 'Ошибка сети!';
        el.tgBtn.style.backgroundColor = 'var(--color-danger)';
    }
    
    setTimeout(() => {
        el.tgBtn.innerHTML = origText;
        el.tgBtn.style.backgroundColor = '';
    }, 2000);
});

// Event Listeners for Bottom Nav
el.navCalc.addEventListener('click', () => {
    vibe();
    el.navArchive.classList.remove('active');
    el.navSettings.classList.remove('active');
    el.navCalc.classList.add('active');
    
    el.archiveView.classList.remove('active');
    el.settingsView.classList.remove('active');
    el.calcView.classList.add('active');
});

el.navArchive.addEventListener('click', () => {
    vibe();
    el.navCalc.classList.remove('active');
    el.navSettings.classList.remove('active');
    el.navArchive.classList.add('active');
    
    el.calcView.classList.remove('active');
    el.settingsView.classList.remove('active');
    el.archiveView.classList.add('active');
});

el.navSettings.addEventListener('click', () => {
    vibe();
    el.navCalc.classList.remove('active');
    el.navArchive.classList.remove('active');
    el.navSettings.classList.add('active');
    
    el.calcView.classList.remove('active');
    el.archiveView.classList.remove('active');
    el.settingsView.classList.add('active');
});

el.langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('tartyp_lang', currentLang);
    applyTranslation();
    renderArchive();
});

el.roleSelect.addEventListener('change', (e) => {
    currentRole = e.target.value;
    localStorage.setItem('tartyp_role', currentRole);
    updateRoleView();
});

el.resetBtn.addEventListener('click', () => {
    vibe();
    if (confirm(i18n[currentLang].delConfirm)) {
        localStorage.removeItem('tartyp_projects');
        projects = [];
        renderArchive();
    }
});

// Kick off
init();
