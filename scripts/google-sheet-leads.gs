// Google Apps Script for the "QRS Website Leads" spreadsheet: the website (lib/leads.js) posts every lead here and
// this adds it as a row. It runs inside your Google account, so the spreadsheet stays private and you share it
// like any other Sheet.
//
// Setup (once):
// 1. Open the spreadsheet, then Extensions → Apps Script. Replace the editor's contents with this file and save.
// 2. Put the website's LEADS_SHEET_SECRET value in SECRET below (or, instead, in Project Settings → Script
//    properties as LEADS_SHEET_SECRET). Never commit a filled-in copy: this repo is public.
// 3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Deploy, and allow access
//    when Google asks.
// 4. Copy the Web app URL (it ends in /exec) into the website's LEADS_SHEET_WEBHOOK_URL environment variable.
// After editing this script later, use Deploy → Manage deployments → Edit → New version, so the URL stays the same.

const SECRET = ''; // the same value as LEADS_SHEET_SECRET in the website's environment variables

// The UTM and landing page columns come last so rows added before them keep their columns; a missing header cell is filled in below
const HEADERS = ['Received', 'Source', 'Name', 'Phone', 'Email', 'ZIP', 'How they found us', 'Service', 'Roof type', 'Address', 'Message', 'Quote details', 'Page', 'Chat transcript', 'UTM source', 'UTM medium', 'UTM campaign', 'Landing page'];
const KEYS = ['source', 'name', 'phone', 'email', 'zip', 'foundUs', 'service', 'roofType', 'address', 'message', 'quote', 'page', 'transcript', 'utmSource', 'utmMedium', 'utmCampaign', 'landingPage'];

function doPost(e) {
  const reply = (body) => ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: 'bad request' });
  }
  const secret = PropertiesService.getScriptProperties().getProperty('LEADS_SHEET_SECRET') || SECRET;
  if (!secret || data.secret !== secret) return reply({ ok: false, error: 'unauthorized' });

  // Text that starts with = + - or @ would run as a formula in the sheet, so it's stored as plain text
  const cell = (value) => {
    const text = String(value == null ? '' : value);
    return /^[=+\-@]/.test(text) ? "'" + text : text;
  };

  const lock = LockService.getScriptLock(); // two leads at the same moment each get their own row
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    // Until the first lead arrives, keep the header row in step with HEADERS (it may have been created earlier)
    if (sheet.getLastRow() <= 1) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
      sheet.setFrozenRows(1);
    } else {
      // A sheet that already has leads: add the header for any column this script has that the sheet doesn't (never
      // renames a header that's there)
      const row = sheet.getRange(1, 1, 1, HEADERS.length);
      const current = row.getValues()[0];
      HEADERS.forEach((title, i) => {
        if (!current[i]) row.getCell(1, i + 1).setValue(title).setFontWeight('bold');
      });
    }
    sheet.appendRow([new Date()].concat(KEYS.map((key) => cell(data[key]))));
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}
