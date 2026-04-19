const tg = window.Telegram ? window.Telegram.WebApp : null;

let userRole = 'worker'; 
let tgUser = null;

if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    tg.expand();
    tgUser = tg.initDataUnsafe.user;
}

const savedRole = localStorage.getItem('tartyp_role');
if (savedRole) {
    userRole = savedRole;
} else {
    userRole = 'boss'; // Default for demo
}

const elCalc = document.getElementById('view-calc');
const elProjects = document.getElementById('view-projects');
const elExport = document.getElementById('view-export');
const tabs = document.querySelectorAll('.tab-btn');

const financialBlock = document.getElementById('financial-block');
const roleBadge = document.getElementById('role-badge');
const resQtyFinalInput = document.getElementById('res-qty-final');
const unitCostInput = document.getElementById('unit-cost');
const unitPriceInput = document.getElementById('unit-price');

let currentCalculation = null;

function hapticFeedback() {
    if (navigator.vibrate) navigator.vibrate(15);
    if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function init() {
    translateApp();
    document.getElementById('lang-select').value = currentLang;

    roleBadge.innerText = locales[currentLang][userRole];
    if (userRole === 'boss') financialBlock.classList.remove('hidden');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            hapticFeedback();
            tabs.forEach(t => t.classList.remove('active'));
            const target = tab.closest('.tab-btn');
            target.classList.add('active');
            
            [elCalc, elProjects, elExport].forEach(el => el.classList.add('hidden'));
            document.getElementById(target.getAttribute('data-target')).classList.remove('hidden');
            
            if (target.getAttribute('data-target') === 'view-projects') renderProjects();
        });
    });

    document.getElementById('btn-calculate').addEventListener('click', () => {
        hapticFeedback();
        performCalculation();
        document.getElementById('results-card').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('results-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });

    resQtyFinalInput.addEventListener('input', () => {
        if (!currentCalculation) return;
        const val = parseInt(resQtyFinalInput.value);
        if (!isNaN(val)) performCalculation(val);
    });

    unitCostInput.addEventListener('input', updateFinanceUI);
    unitPriceInput.addEventListener('input', updateFinanceUI);

    document.getElementById('btn-save').addEventListener('click', () => {
        hapticFeedback();
        saveProject();
    });

    document.getElementById('btn-share').addEventListener('click', () => {
        hapticFeedback();
        shareWhatsApp();
    });

    document.getElementById('lang-select').addEventListener('change', (e) => {
        setLanguage(e.target.value);
        roleBadge.innerText = locales[currentLang][userRole];
        if (currentCalculation) performCalculation(parseInt(resQtyFinalInput.value) || undefined);
    });

    document.getElementById('btn-export-pdf').addEventListener('click', () => {
        hapticFeedback();
        exportPDF();
    });

    document.getElementById('btn-export-excel').addEventListener('click', () => {
        hapticFeedback();
        exportExcel();
    });
}

function performCalculation(manualQty = undefined) {
    const inputs = {
        L: parseFloat(document.getElementById('wall-length').value) || 0,
        H: parseFloat(document.getElementById('wall-height').value) || 0,
        T: parseFloat(document.getElementById('wall-thickness').value) || 0,
        openingsArea: parseFloat(document.getElementById('openings-area').value) || 0,
        materialKey: document.getElementById('material-select').value,
        reservePercent: parseFloat(document.getElementById('reserve-percent').value) || 0,
        customQtyFinal: manualQty
    };

    const res = calculateMath(inputs);
    currentCalculation = res;

    document.getElementById('res-vol').innerText = res.vWall;
    document.getElementById('res-qty-base').innerText = res.qtyBase;
    if (manualQty === undefined) resQtyFinalInput.value = res.qtyFinal;
    document.getElementById('res-weight').innerText = res.weightTons;
    document.getElementById('res-trucks').innerText = res.trucks;

    updateFinanceUI();
}

function updateFinanceUI() {
    if (!currentCalculation) return;
    const cost = parseFloat(unitCostInput.value) || 0;
    const price = parseFloat(unitPriceInput.value) || 0;
    const fin = calculateFinance(currentCalculation.qtyFinal, cost, price);
    
    document.getElementById('res-total-cost').innerText = fin.totalCost.toLocaleString('ru-RU');
    document.getElementById('res-total-revenue').innerText = fin.totalRevenue.toLocaleString('ru-RU');
    document.getElementById('res-profit').innerText = fin.profit.toLocaleString('ru-RU');
}

function saveProject() {
    if (!currentCalculation) return;
    const name = document.getElementById('project-name').value || 'Без названия';
    const proj = {
        id: Date.now(),
        name,
        date: new Date().toLocaleDateString(),
        calc: currentCalculation,
        fin: null
    };

    if (userRole === 'boss') {
        const cost = parseFloat(unitCostInput.value) || 0;
        const price = parseFloat(unitPriceInput.value) || 0;
        proj.fin = calculateFinance(currentCalculation.qtyFinal, cost, price);
    }

    let projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');
    projects.push(proj);
    localStorage.setItem('tartyp_projects', JSON.stringify(projects));
    
    sendToGoogleAppsScript(proj);

    if (tg && tg.showAlert) tg.showAlert('Сохранено');
    else alert('Проект сохранен');
}

function renderProjects() {
    const list = document.getElementById('projects-list');
    const projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');
    if (projects.length === 0) {
        list.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Нет проектов</p>';
        return;
    }
    list.innerHTML = projects.reverse().map(p => `
        <div style="border-bottom: 1px solid var(--border-color); padding: 12px 0;">
            <div style="font-weight: bold; color: var(--accent-color);">${p.name}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${p.date} | ${p.calc.matName} | ${p.calc.qtyFinal} шт</div>
            ${userRole === 'boss' && p.fin ? `<div style="font-size: 12px; color: var(--success-color); margin-top: 4px;">Прибыль: ${p.fin.profit.toLocaleString('ru-RU')} ₸</div>` : ''}
        </div>
    `).join('');
}

function shareWhatsApp() {
    if (!currentCalculation) return;
    const name = document.getElementById('project-name').value || 'Объект';
    let text = `*Отчет TARTYP: ${name}*\nМатериал: ${currentCalculation.matName}\nКоличество: ${currentCalculation.qtyFinal} шт\nВес: ${currentCalculation.weightTons} т\nФуры: ${currentCalculation.trucks} шт\n`;
    if (userRole === 'boss') {
        const price = parseFloat(unitPriceInput.value) || 0;
        const fin = calculateFinance(currentCalculation.qtyFinal, 0, price);
        text += `\nИтоговая сумма: ${fin.totalRevenue.toLocaleString('ru-RU')} ₸`;
    }
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

async function sendToGoogleAppsScript(data) {
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbygPzuYAhZzNZlcsq90BichO0FOtDYsKxSnk0HsHJhGAH55KYV0dTbvwhHNZR3eiakO/exec';
    try {
        await fetch(GAS_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log('Данные отправлены в Google Sheets');
    } catch (e) {
        console.error('Ошибка при отправке в GAS:', e);
    }
}

function exportPDF() {
    const projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');
    if (projects.length === 0) return alert('Нет сохраненных проектов');
    const p = projects[0];
    const template = document.getElementById('pdf-template');
    template.classList.remove('hidden');
    document.getElementById('pdf-project-name').innerText = p.name;
    document.getElementById('pdf-user').innerText = tgUser ? tgUser.first_name : 'Прораб';
    document.getElementById('pdf-date').innerText = p.date;
    document.getElementById('pdf-mat-name').innerText = p.calc.matName;
    document.getElementById('pdf-mat-qty').innerText = p.calc.qtyFinal + ' шт';
    document.getElementById('pdf-mat-weight').innerText = p.calc.weightTons + ' т';
    if (userRole === 'boss' && p.fin) {
        document.getElementById('pdf-th-price').style.display = 'table-cell';
        const priceCell = document.getElementById('pdf-mat-price');
        priceCell.style.display = 'table-cell';
        priceCell.innerText = p.fin.totalRevenue.toLocaleString('ru-RU') + ' ₸';
    } else {
        document.getElementById('pdf-th-price').style.display = 'none';
        document.getElementById('pdf-mat-price').style.display = 'none';
    }
    const opt = { margin: 10, filename: `tartyp_${p.name}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    html2pdf().set(opt).from(template).save().then(() => template.classList.add('hidden'));
}

function exportExcel() {
    const projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');
    if (projects.length === 0) return alert('Нет сохраненных проектов');
    const p = projects[0];
    const wb = XLSX.utils.book_new();
    const wsData = [["Объект", "Дата", "Материал", "Количество (шт)", "Вес (т)", "Фуры (шт)"]];
    if (userRole === 'boss') wsData[0].push("Себестоимость", "Выручка", "Прибыль");
    const row = [p.name, p.date, p.calc.matName, p.calc.qtyFinal, p.calc.weightTons, p.calc.trucks];
    if (userRole === 'boss' && p.fin) row.push(p.fin.totalCost, p.fin.totalRevenue, p.fin.profit);
    wsData.push(row);
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `tartyp_${p.name}.xlsx`);
}

document.addEventListener('DOMContentLoaded', init);
