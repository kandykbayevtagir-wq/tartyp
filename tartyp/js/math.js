const materialsDB = {
    brick_1nf: {
        name: 'Кирпич 1NF',
        name_kz: 'Кірпіш 1NF',
        length: 250,
        height: 65,
        width: 120,
        weight: 3.5 // kg
    },
    gas_block: {
        name: 'Газоблок',
        name_kz: 'Газблок',
        length: 600,
        height: 200,
        width: 300,
        weight: 22
    },
    cinder_block: {
        name: 'Шлакоблок',
        name_kz: 'Қожблок',
        length: 390,
        height: 188,
        width: 190,
        weight: 18
    }
};

function calculateMath(inputs) {
    const { 
        L, H, T, openingsArea, materialKey, reservePercent, customQtyFinal 
    } = inputs;

    const mat = materialsDB[materialKey];
    let vWall = (L * H * T) / Math.pow(10, 9) - (openingsArea * (T / 1000));
    if (vWall < 0) vWall = 0;

    const vUnit = (mat.length * mat.height * mat.width) / Math.pow(10, 9);
    const qtyBase = Math.ceil(vWall / vUnit);

    let qtyFinal = customQtyFinal !== undefined && customQtyFinal !== null && !isNaN(customQtyFinal)
        ? customQtyFinal 
        : Math.ceil(qtyBase * (1 + reservePercent / 100));

    const weightTons = (qtyFinal * mat.weight) / 1000;
    const trucks = Math.ceil(weightTons / 20);

    return {
        vWall: vWall.toFixed(2),
        qtyBase,
        qtyFinal,
        weightTons: weightTons.toFixed(2),
        trucks,
        matName: currentLang === 'kz' ? mat.name_kz : mat.name,
        materialKey
    };
}

function calculateFinance(qtyFinal, unitCost, unitPrice) {
    const totalCost = qtyFinal * unitCost;
    const totalRevenue = qtyFinal * unitPrice;
    const profit = totalRevenue - totalCost;

    return { totalCost, totalRevenue, profit };
}
