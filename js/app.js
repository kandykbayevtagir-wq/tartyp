const tg = window.Telegram ? window.Telegram.WebApp : null;

let userRole = 'worker'; 
let tgUser = null;
let currentLoadedProjectId = null;

if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    tg.expand();
    tgUser = tg.initDataUnsafe.user;
}

const savedRole = localStorage.getItem('tartyp_role');
if (savedRole) {
    userRole = savedRole;
} else {
    userRole = 'boss'; // Default
}

const profileName = localStorage.getItem('tartyp_profile_name') || (tgUser ? tgUser.first_name : 'Прораб');

const elCalc = document.getElementById('view-calc');
const elProjects = document.getElementById('view-projects');
const elExport = document.getElementById('view-export');
const tabs = document.querySelectorAll('.tab-btn');

const financialBlock = document.getElementById('financial-block');
const roleBadge = document.getElementById('role-badge');
const resQtyFinalInput = document.getElementById('res-qty-final');
const unitCostInput = document.getElementById('unit-cost');
const unitPriceInput = document.getElementById('unit-price');

// Sidebar elements
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const openSidebarBtn = document.getElementById('open-sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar');
const roleSelect = document.getElementById('role-select');
const langSelectSidebar = document.getElementById('lang-select-sidebar');
const profileNameInput = document.getElementById('profile-name-input');

let currentCalculation = null;

function hapticFeedback() {
    if (navigator.vibrate) navigator.vibrate(15);
    if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function init() {
    translateApp();
    document.getElementById('lang-select-sidebar').value = currentLang;
    roleSelect.value = userRole;
    profileNameInput.value = profileName;

    applyRoleUI();

    // Sidebar toggles
    openSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        sidebarOverlay.classList.remove('hidden');
    });

    const closeSidebar = () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.add('hidden');
    };
    closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Settings changes
    roleSelect.addEventListener('change', (e) => {
        userRole = e.target.value;
        localStorage.setItem('tartyp_role', userRole);
        applyRoleUI();
    });

    langSelectSidebar.addEventListener('change', (e) => {
        setLanguage(e.target.value);
        applyRoleUI();
        if (currentCalculation) performCalculation(parseInt(resQtyFinalInput.value) || undefined);
    });

    profileNameInput.addEventListener('input', (e) => {
        localStorage.setItem('tartyp_profile_name', e.target.value);
    });

    // Tabs
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

    document.getElementById('btn-export-pdf').addEventListener('click', () => {
        hapticFeedback();
        exportPDF();
    });

    document.getElementById('btn-export-excel').addEventListener('click', () => {
        hapticFeedback();
        exportExcel();
    });
}

function applyRoleUI() {
    roleBadge.innerText = locales[currentLang][userRole] || userRole;
    if (userRole === 'boss') {
        financialBlock.classList.remove('hidden');
    } else {
        financialBlock.classList.add('hidden');
    }
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
        id: currentLoadedProjectId || Date.now(),
        name,
        date: new Date().toLocaleDateString(),
        inputs: {
            L: document.getElementById('wall-length').value,
            H: document.getElementById('wall-height').value,
            T: document.getElementById('wall-thickness').value,
            openingsArea: document.getElementById('openings-area').value,
            materialKey: document.getElementById('material-select').value,
            reservePercent: document.getElementById('reserve-percent').value,
            unitCost: document.getElementById('unit-cost').value,
            unitPrice: document.getElementById('unit-price').value
        },
        calc: currentCalculation,
        fin: null
    };

    if (userRole === 'boss') {
        const cost = parseFloat(unitCostInput.value) || 0;
        const price = parseFloat(unitPriceInput.value) || 0;
        proj.fin = calculateFinance(currentCalculation.qtyFinal, cost, price);
    }

    let projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');
    
    if (currentLoadedProjectId) {
        const idx = projects.findIndex(p => p.id === currentLoadedProjectId);
        if (idx !== -1) projects[idx] = proj;
        else projects.push(proj);
    } else {
        projects.push(proj);
    }
    
    localStorage.setItem('tartyp_projects', JSON.stringify(projects));
    
    // Switch to current project ID so subsequent saves overwrite
    currentLoadedProjectId = proj.id;
    
    sendToGoogleAppsScript(proj);

    if (tg && tg.showAlert) tg.showAlert('Сохранено');
    else alert('Проект сохранен');
}

function loadProject(id) {
    const projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');
    const proj = projects.find(p => p.id === id);
    if (!proj) return;

    currentLoadedProjectId = proj.id;

    document.getElementById('project-name').value = proj.name || '';
    if (proj.inputs) {
        document.getElementById('wall-length').value = proj.inputs.L || '';
        document.getElementById('wall-height').value = proj.inputs.H || '';
        document.getElementById('wall-thickness').value = proj.inputs.T || '';
        document.getElementById('openings-area').value = proj.inputs.openingsArea || '';
        document.getElementById('material-select').value = proj.inputs.materialKey || 'brick_1nf';
        document.getElementById('reserve-percent').value = proj.inputs.reservePercent || '';
        
        if (userRole === 'boss' && proj.inputs.unitCost !== undefined) {
            document.getElementById('unit-cost').value = proj.inputs.unitCost;
            document.getElementById('unit-price').value = proj.inputs.unitPrice;
        }
    }

    // Switch to Calc tab
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('[data-target="view-calc"]').classList.add('active');
    [elCalc, elProjects, elExport].forEach(el => el.classList.add('hidden'));
    elCalc.classList.remove('hidden');

    performCalculation();
    document.getElementById('results-card').classList.remove('hidden');
    
    hapticFeedback();
}

function deleteProject(id) {
    const confirmMsg = locales[currentLang].delete_confirm || 'Вы уверены, что хотите удалить этот проект?';
    if (!confirm(confirmMsg)) return;

    let projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('tartyp_projects', JSON.stringify(projects));
    
    if (currentLoadedProjectId === id) {
        currentLoadedProjectId = null; // Clear loaded state if deleted
    }

    renderProjects();
    hapticFeedback();
}

function renderProjects() {
    const list = document.getElementById('projects-list');
    const projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');
    if (projects.length === 0) {
        list.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Нет проектов</p>';
        return;
    }
    
    list.innerHTML = projects.reverse().map(p => `
        <div style="border-bottom: 1px solid var(--border-color); padding: 12px 0; display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1; cursor: pointer;" onclick="loadProject(${p.id})">
                <div style="font-weight: bold; color: var(--accent-color);">${p.name}</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${p.date} | ${p.calc.matName} | ${p.calc.qtyFinal} шт</div>
                ${userRole === 'boss' && p.fin ? `<div style="font-size: 12px; color: var(--success-color); margin-top: 4px;">Прибыль: ${p.fin.profit.toLocaleString('ru-RU')} ₸</div>` : ''}
            </div>
            <button onclick="deleteProject(${p.id})" style="background: none; border: none; color: var(--danger-color); font-size: 18px; padding: 10px; cursor: pointer;">🗑</button>
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
    const p = projects[0]; // Export latest
    
    const template = document.getElementById('pdf-template');
    template.classList.remove('hidden');
    
    document.getElementById('pdf-project-name').innerText = p.name;
    document.getElementById('pdf-user').innerText = localStorage.getItem('tartyp_profile_name') || 'Прораб';
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

    const opt = { 
        margin: 10, 
        filename: `tartyp_${p.name}.pdf`, 
        image: { type: 'jpeg', quality: 0.98 }, 
        html2canvas: { scale: 2 }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    };
    
    // For mobile Telegram and Safari, we generate blob and use a standard anchor download
    html2pdf().set(opt).from(template).output('blob').then((blob) => {
        template.classList.add('hidden');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = opt.filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    });
}

function exportExcel() {
    const projects = JSON.parse(localStorage.getItem('tartyp_projects') || '[]');
    if (projects.length === 0) return alert('Нет сохраненных проектов');
    
    const wb = XLSX.utils.book_new();
    const wsData = [["Объект", "Дата", "Материал", "Количество (шт)", "Вес (т)", "Фуры (шт)"]];
    
    if (userRole === 'boss') {
        wsData[0].push("Себестоимость (₸)", "Выручка (₸)", "Прибыль (₸)");
    }

    // Export ALL saved projects
    projects.forEach(p => {
        const row = [p.name, p.date, p.calc.matName, p.calc.qtyFinal, p.calc.weightTons, p.calc.trucks];
        if (userRole === 'boss') {
            if (p.fin) {
                row.push(p.fin.totalCost, p.fin.totalRevenue, p.fin.profit);
            } else {
                row.push("-", "-", "-");
            }
        }
        wsData.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Set column widths roughly
    const wscols = [
        {wch: 20}, {wch: 12}, {wch: 25}, {wch: 15}, {wch: 10}, {wch: 10}
    ];
    if (userRole === 'boss') wscols.push({wch: 15}, {wch: 15}, {wch: 15});
    ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Отчеты");
    
    // Mobile friendly blob download
    const wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});
    const blob = new Blob([wbout], {type: "application/octet-stream"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tartyp_export.xlsx`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

document.addEventListener('DOMContentLoaded', init);
