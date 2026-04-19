const locales = {
    ru: {
        project_details: 'Параметры объекта',
        project_name: 'Название объекта',
        wall_length: 'Длина стен (мм)',
        wall_height: 'Высота (мм)',
        wall_thickness: 'Толщина (мм)',
        openings_area: 'Площадь проемов (м²)',
        material: 'Материал',
        reserve_percent: 'Запас (Бой) %',
        calc_btn: 'Рассчитать',
        results: 'Итоги расчета',
        pure_vol: 'Чистый объем:',
        qty_base: 'Количество (база):',
        qty_final: 'Итоговое количество (ручная правка)',
        weight: 'Вес:',
        trucks: 'Фуры (20т):',
        finance: 'Финансы',
        unit_cost: 'Себестоимость за ед. (₸)',
        unit_price: 'Цена продажи за ед. (₸)',
        total_cost: 'Общая себестоимость:',
        total_revenue: 'Выручка:',
        profit: 'Чистая прибыль:',
        save: 'Сохранить',
        share: 'WhatsApp',
        projects: 'Сохраненные проекты',
        export: 'Экспорт и отчеты',
        export_pdf: 'Скачать PDF',
        export_excel: 'Скачать Excel (1C)',
        calc: 'Расчет',
        projects_tab: 'Проекты',
        export_tab: 'Отчеты',
        worker: 'ПРОРАБ',
        boss: 'БАСТЫК',
        lang_select: 'Язык / Тіл',
        brick_1nf: 'Кирпич 1NF (250x120x65)',
        gas_block: 'Газоблок (600x300x200)',
        cinder_block: 'Шлакоблок (390x190x188)',
        menu_title: 'Меню',
        profile_name: 'Имя профиля',
        role_select: 'Роль',
        delete_confirm: 'Вы уверены, что хотите удалить этот проект?',
        delete_btn: 'Удалить'
    },
    kz: {
        project_details: 'Объект параметрлері',
        project_name: 'Объект атауы',
        wall_length: 'Қабырға ұзындығы (мм)',
        wall_height: 'Биіктігі (мм)',
        wall_thickness: 'Қалыңдығы (мм)',
        openings_area: 'Ойықтар ауданы (м²)',
        material: 'Материал',
        reserve_percent: 'Қор (Сынық) %',
        calc_btn: 'Есептеу',
        results: 'Есептеу қорытындысы',
        pure_vol: 'Таза көлем:',
        qty_base: 'Саны (негізгі):',
        qty_final: 'Қорытынды саны (қолмен өзгерту)',
        weight: 'Салмағы:',
        trucks: 'Жүк көліктері (20т):',
        finance: 'Қаржы',
        unit_cost: 'Бірлік өзіндік құны (₸)',
        unit_price: 'Сату бағасы (₸)',
        total_cost: 'Жалпы өзіндік құн:',
        total_revenue: 'Түсім:',
        profit: 'Таза пайда:',
        save: 'Сақтау',
        share: 'WhatsApp',
        projects: 'Сақталған жобалар',
        export: 'Экспорт және есептер',
        export_pdf: 'PDF жүктеу',
        export_excel: 'Excel жүктеу (1C)',
        calc: 'Есептеу',
        projects_tab: 'Жобалар',
        export_tab: 'Есептер',
        worker: 'ПРОРАБ',
        boss: 'БАСТЫК',
        lang_select: 'Язык / Тіл',
        brick_1nf: 'Кірпіш 1NF (250x120x65)',
        gas_block: 'Газблок (600x300x200)',
        cinder_block: 'Қожблок (390x190x188)',
        menu_title: 'Мәзір',
        profile_name: 'Профиль аты',
        role_select: 'Рөлі',
        delete_confirm: 'Осы жобаны жоюға сенімдісіз бе?',
        delete_btn: 'Жою'
    }
};

let currentLang = localStorage.getItem('tartyp_lang') || 'ru';

function translateApp() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (locales[currentLang] && locales[currentLang][key]) {
            el.innerText = locales[currentLang][key];
        }
    });
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('tartyp_lang', lang);
    translateApp();
}
