const materialsData = {
    gazoblok: { name: 'Газоблок (600x300x200)', faceArea: 0.12, weight: 22 }, // 600 * 200 = 120,000 mm2
    brick: { name: 'Кирпич 1NF (250x120x65)', faceArea: 0.01625, weight: 3.5 }, // 250 * 65 = 16,250 mm2
    shlakoblok: { name: 'Шлакоблок (390x190x188)', faceArea: 0.07332, weight: 18 } // 390 * 188 = 73,320 mm2
};

const i18n = {
    ru: {
        settings: "Настройки", language: "Язык / Тіл", role: "Роль", reset: "Сбросить данные",
        tabCalc: "Калькулятор", tabArchive: "Архив", projName: "Название объекта", material: "Материал",
        wallLen: "Длина стены (мм)", wallHgt: "Высота стены (мм)", openings: "Площадь проемов (м²)",
        techResults: "Технические результаты", cleanArea: "Чистая площадь:", qtyCalc: "Кол-во (расчетное):",
        qtyWaste: "С запасом (7%):", totalWeight: "Общий вес:", manualQty: "Итоговое количество (ручной ввод шт)",
        finBlock: "Финансовый блок", costPrice: "Закуп (за шт, ₸)", sellPrice: "Продажа (за шт, ₸)",
        totalCost: "Себестоимость:", netProfit: "Чистая прибыль:", saveBtn: "Сохранить в Архив",
        tgBtn: "Отправить Бастыку", excelBtn: "Export Excel", pdfBtn: "Export PDF",
        delConfirm: "Точно удалить?", pieces: "шт", tons: "т", noData: "Нет сохраненных проектов"
    },
    kz: {
        settings: "Баптаулар", language: "Язык / Тіл", role: "Рөлі", reset: "Деректерді жою",
        tabCalc: "Калькулятор", tabArchive: "Мұрағат", projName: "Нысан атауы", material: "Материал",
        wallLen: "Қабырға ұзындығы (мм)", wallHgt: "Қабырға биіктігі (мм)", openings: "Ойықтар ауданы (м²)",
        techResults: "Техникалық нәтижелер", cleanArea: "Таза ауданы:", qtyCalc: "Саны (есептелген):",
        qtyWaste: "Қормен (7%):", totalWeight: "Жалпы салмағы:", manualQty: "Қорытынды саны (қолмен енгізу дана)",
        finBlock: "Қаржы блогы", costPrice: "Сатып алу (дана үшін, ₸)", sellPrice: "Сату (дана үшін, ₸)",
        totalCost: "Өзіндік құны:", netProfit: "Таза пайда:", saveBtn: "Мұрағатқа сақтау",
        tgBtn: "Бастыққа жіберу", excelBtn: "Excel жүктеу", pdfBtn: "PDF жүктеу",
        delConfirm: "Өшіруге сенімдісіз бе?", pieces: "дана", tons: "т", noData: "Сақталған жобалар жоқ"
    }
};

let currentLang = localStorage.getItem('tartyp_lang') || 'ru';
let currentRole = localStorage.getItem('tartyp_role') || 'worker';
let projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');

// DOM Elements
const el = {
    langSelect: document.getElementById('langSelect'),
    roleSelect: document.getElementById('roleSelect'),
    menuBtn: document.getElementById('menuBtn'),
    closeSidebar: document.getElementById('closeSidebar'),
    sidebar: document.getElementById('sidebar'),
    overlay: document.getElementById('sidebar-overlay'),
    tabCalc: document.getElementById('tabCalc'),
    tabArchive: document.getElementById('tabArchive'),
    calcView: document.getElementById('calcView'),
    archiveView: document.getElementById('archiveView'),
    archiveList: document.getElementById('archiveList'),
    finBlock: document.getElementById('financialBlock'),
    resetBtn: document.getElementById('resetDataBtn'),
    
    // Inputs
    projectName: document.getElementById('projectName'),
    materialSelect: document.getElementById('materialSelect'),
    wallLength: document.getElementById('wallLength'),
    wallHeight: document.getElementById('wallHeight'),
    openingsArea: document.getElementById('openingsArea'),
    manualQty: document.getElementById('manualQty'),
    costPrice: document.getElementById('costPrice'),
    sellPrice: document.getElementById('sellPrice'),
    
    // Results
    resCleanArea: document.getElementById('resCleanArea'),
    resQty: document.getElementById('resQty'),
    resQtyWaste: document.getElementById('resQtyWaste'),
    resWeight: document.getElementById('resWeight'),
    resTotalCost: document.getElementById('resTotalCost'),
    resNetProfit: document.getElementById('resNetProfit'),
    
    // Actions
    saveBtn: document.getElementById('saveBtn'),
    tgBtn: document.getElementById('tgBtn'),
    excelBtn: document.getElementById('excelBtn'),
    pdfBtn: document.getElementById('pdfBtn')
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
    document.getElementById('t-tab-calc').textContent = t.tabCalc;
    document.getElementById('t-tab-archive').textContent = t.tabArchive;
    document.getElementById('t-proj-name').textContent = t.projName;
    document.getElementById('t-material').textContent = t.material;
    document.getElementById('t-wall-len').textContent = t.wallLen;
    document.getElementById('t-wall-hgt').textContent = t.wallHgt;
    document.getElementById('t-openings').textContent = t.openings;
    document.getElementById('t-tech-results').textContent = t.techResults;
    document.getElementById('t-clean-area').textContent = t.cleanArea;
    document.getElementById('t-qty-calc').textContent = t.qtyCalc;
    document.getElementById('t-qty-waste').textContent = t.qtyWaste;
    document.getElementById('t-total-weight').textContent = t.totalWeight;
    document.getElementById('t-manual-qty').textContent = t.manualQty;
    document.getElementById('t-fin-block').textContent = t.finBlock;
    document.getElementById('t-cost-price').textContent = t.costPrice;
    document.getElementById('t-sell-price').textContent = t.sellPrice;
    document.getElementById('t-total-cost').textContent = t.totalCost;
    document.getElementById('t-net-profit').textContent = t.netProfit;
    document.getElementById('t-save-btn').textContent = t.saveBtn;
    document.getElementById('t-tg-btn').textContent = t.tgBtn;
    document.getElementById('t-excel-btn').textContent = t.excelBtn;
    document.getElementById('t-pdf-btn').textContent = t.pdfBtn;
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
    const inputs = ['projectName', 'materialSelect', 'wallLength', 'wallHeight', 'openingsArea', 'manualQty', 'costPrice', 'sellPrice'];
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
    const oArea = parseFloat(el.openingsArea.value) || 0; // m2
    
    // Wall area in m2
    const wallArea = (wLen / 1000) * (wHgt / 1000);
    const cleanArea = Math.max(0, wallArea - oArea);
    
    const matKey = el.materialSelect.value;
    const mat = materialsData[matKey];
    
    const qtyCalc = cleanArea > 0 ? Math.ceil(cleanArea / mat.faceArea) : 0;
    const qtyWaste = Math.ceil(qtyCalc * 1.07);
    
    const manualQ = parseInt(el.manualQty.value);
    const finalQty = !isNaN(manualQ) && manualQ > 0 ? manualQ : qtyWaste;
    
    const totalWeightTons = (finalQty * mat.weight) / 1000;
    
    el.resCleanArea.textContent = `${cleanArea.toFixed(2)} м²`;
    el.resQty.textContent = `${qtyCalc} ${t.pieces}`;
    el.resQtyWaste.textContent = `${qtyWaste} ${t.pieces}`;
    el.resWeight.textContent = `${totalWeightTons.toFixed(2)} ${t.tons}`;
    
    // Fin calc
    const cPrice = parseFloat(el.costPrice.value) || 0;
    const sPrice = parseFloat(el.sellPrice.value) || 0;
    
    const totalCost = finalQty * cPrice;
    const totalRev = finalQty * sPrice;
    const netProfit = totalRev - totalCost;
    
    el.resTotalCost.textContent = `${totalCost.toLocaleString('ru-RU')} ₸`;
    el.resNetProfit.textContent = `${netProfit.toLocaleString('ru-RU')} ₸`;
    
    return {
        name: el.projectName.value || 'Без названия',
        matKey,
        matName: mat.name,
        wLen, wHgt, oArea, cleanArea,
        qtyCalc, qtyWaste, manualQ, finalQty,
        totalWeightTons,
        cPrice, sPrice, totalCost, netProfit
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
            openingsArea: el.openingsArea.value,
            manualQty: el.manualQty.value,
            costPrice: el.costPrice.value,
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
    el.openingsArea.value = inputs.openingsArea || '';
    el.manualQty.value = inputs.manualQty || '';
    el.costPrice.value = inputs.costPrice || '';
    el.sellPrice.value = inputs.sellPrice || '';
    
    calculate();
    
    // Switch tab
    el.tabArchive.classList.remove('active');
    el.tabCalc.classList.add('active');
    el.archiveView.classList.remove('active');
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

// Telegram Export
el.tgBtn.addEventListener('click', async () => {
    vibe();
    const data = calculate();
    const t = i18n[currentLang];
    
    const origText = el.tgBtn.innerHTML;
    el.tgBtn.innerHTML = 'Отправка...';
    
    let text = `🏗 *TARTYP Отчет: ${data.name}*\n\n`;
    text += `🧱 *Материал:* ${data.matName}\n`;
    text += `📏 *Чистая площадь:* ${data.cleanArea.toFixed(2)} м²\n`;
    text += `📦 *Кол-во (с учетом запаса 7%):* ${data.finalQty} шт\n`;
    if (!isNaN(data.manualQ) && data.manualQ > 0) {
        text += `*(Ручной ввод количества!)*\n`;
    }
    text += `⚖️ *Общий вес:* ${data.totalWeightTons.toFixed(2)} т\n`;
    
    if (currentRole === 'boss') {
        text += `\n💰 *Финансы:*\n`;
        text += `Себестоимость: ${data.totalCost.toLocaleString('ru-RU')} ₸\n`;
        text += `Чистая прибыль: ${data.netProfit.toLocaleString('ru-RU')} ₸\n`;
    }
    
    const token = '8678551019:AAHLndEACJNRey8u74uAApUVaT_iQEeebjQ';
    const chatId = '5623597772';
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'Markdown'
            })
        });
        
        if (response.ok) {
            el.tgBtn.textContent = 'Отправлено ✓';
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

// Excel Export
el.excelBtn.addEventListener('click', () => {
    vibe();
    if (typeof XLSX === 'undefined') {
        alert("Библиотека XLSX не загружена!");
        return;
    }
    const data = calculate();
    
    let wsData = [
        ["Параметр", "Значение"],
        ["Объект", data.name],
        ["Материал", data.matName],
        ["Длина стены (мм)", data.wLen],
        ["Высота стены (мм)", data.wHgt],
        ["Проемы (м2)", data.oArea],
        ["Чистая площадь (м2)", data.cleanArea.toFixed(2)],
        ["Кол-во расчетное (шт)", data.qtyCalc],
        ["Кол-во с запасом 7% (шт)", data.qtyWaste]
    ];
    
    if (!isNaN(data.manualQ) && data.manualQ > 0) {
        wsData.push(["Итоговое количество (ручное, шт)", data.manualQ]);
    } else {
        wsData.push(["Итоговое количество (шт)", data.finalQty]);
    }
    
    wsData.push(["Общий вес (т)", data.totalWeightTons.toFixed(2)]);
    
    if (currentRole === 'boss') {
        wsData.push(["Закуп (₸/шт)", data.cPrice]);
        wsData.push(["Продажа (₸/шт)", data.sPrice]);
        wsData.push(["Себестоимость (₸)", data.totalCost]);
        wsData.push(["Чистая прибыль (₸)", data.netProfit]);
    }
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Смета");
    XLSX.writeFile(wb, `Смета_${data.name || 'объект'}.xlsx`);
});

// PDF Export
el.pdfBtn.addEventListener('click', () => {
    vibe();
    if (typeof html2pdf === 'undefined') {
        alert("Библиотека html2pdf не загружена!");
        return;
    }
    const element = document.getElementById('pdf-content');
    const opt = {
        margin: 10,
        filename: `Отчет_${el.projectName.value || 'объект'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});

// Event Listeners for Tabs & Sidebar
el.tabCalc.addEventListener('click', () => {
    vibe();
    el.tabArchive.classList.remove('active');
    el.tabCalc.classList.add('active');
    el.archiveView.classList.remove('active');
    el.calcView.classList.add('active');
});

el.tabArchive.addEventListener('click', () => {
    vibe();
    el.tabCalc.classList.remove('active');
    el.tabArchive.classList.add('active');
    el.calcView.classList.remove('active');
    el.archiveView.classList.add('active');
});

el.menuBtn.addEventListener('click', () => {
    vibe();
    el.sidebar.classList.add('active');
    el.overlay.classList.add('active');
});

function closeSide() {
    vibe();
    el.sidebar.classList.remove('active');
    el.overlay.classList.remove('active');
}

el.closeSidebar.addEventListener('click', closeSide);
el.overlay.addEventListener('click', closeSide);

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
        closeSide();
    }
});

// Kick off
init();
