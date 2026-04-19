/**
 * TARTYP CRM - Google Apps Script Backend
 * Обработчик данных для строительного калькулятора
 */

function doPost(e) {
  try {
    const jsonString = e.postData.contents;
    const data = JSON.parse(jsonString);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Отчеты");
    
    if (!sheet) {
      sheet = ss.insertSheet("Отчеты");
      const headers = [
        "ID", "Дата", "Объект", "Материал", 
        "Чистый объем (м3)", "Кол-во (база)", "Кол-во (итого)", 
        "Вес (т)", "Фуры", 
        "Себестоимость (₸)", "Выручка (₸)", "Прибыль (₸)"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#FF8C00").setFontColor("#FFFFFF");
    }
    
    const row = [
      data.id, data.date, data.name, data.calc.matName,
      data.calc.vWall, data.calc.qtyBase, data.calc.qtyFinal,
      data.calc.weightTons, data.calc.trucks,
      data.fin ? data.fin.totalCost : 0,
      data.fin ? data.fin.totalRevenue : 0,
      data.fin ? data.fin.profit : 0
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success", "message": "Данные успешно сохранены"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error", "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
