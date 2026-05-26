// HUF Suitability — Google Sheets Backend
// Deploy: Apps Script editor → Deploy → New deployment → Type: Web app
// Execute as: Me  |  Who has access: Anyone

const SHEET_NAME = 'Sheet1'; // change if your sheet tab has a different name

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    const row = [
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.city || '',
      data.age || '',
      data.marital || '',
      data.children || '',
      data.coparceners || '',
      data.ancestral || '',
      data.income || '',
      data.income_sources || '',
      data.regime || '',
      data.deduct_level || '',
      data.goal || '',
      data.privacy || '',
      data.horizon || '',
      data.corpus || '',
      data.corpus_size || '',
      data.props || '',
      data.huf_prop || '',
      data.investments || '',
      data.aware_rights || '',
      data.aware_clubbing || '',
      data.aware_87a || '',
      data.compliance || '',
      data.partition || '',
      data.verdict || '',
      data.suggested_regime || '',
      data.notes || ''
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional — lets you test the endpoint by visiting it in a browser
function doGet() {
  return ContentService
    .createTextOutput('HUF Suitability endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
