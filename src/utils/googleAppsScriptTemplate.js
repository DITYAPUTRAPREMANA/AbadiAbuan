export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * SCRIPT GOOGLE APPS SCRIPT DATABASE REALTIME BIP DESA ABUAN
 * Mode: SATU TAB — Semua data 5 BIP digabung ke tab "BIP" + semua rekap ke tab "REKAP"
 * Kolom DOMISILI ditambahkan untuk membedakan asal banjar.
 */

var SPREADSHEET_ID = "1lBc96bog-qsXaZpDzp_Ik_e6cVhtwGlzm7DVZ0-H6mo";

// Ganti nama tab ini sesuai nama tab yang sudah ada di Spreadsheet Anda
var BIP_SHEET_NAME   = "BIP";
var RECAP_SHEET_NAME = "REKAP";

function getSS() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss && ss.getId()) return ss;
  } catch (e) {}
  if (SPREADSHEET_ID && SPREADSHEET_ID !== "") {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  throw new Error("Spreadsheet tidak terhubung. Silakan isi SPREADSHEET_ID.");
}

var BIP_HEADERS = [
  'NO', 'DOMISILI', 'NR', 'N_KK', 'N_AK', 'NO_KK', 'NIK', 'NAMA_LENGKAP',
  'JENIS_KELAMIN', 'TMPT_LHR', 'TGL_LHR', 'USIA', 'NO_AKTA_LHR', 'AGAMA',
  'PENDIDIKAN', 'PEKERJAAN', 'STATUS_KAWIN', 'NO_AKTA_KWN', 'STATUS_HBKEL',
  'GOL_DARAH', 'NAMA_LGKP_AYAH', 'NAMA_LGKP_IBU', 'NAMA_KEPALA_KELUARGA',
  'ALAMAT', 'DUSUN_BIP', 'DESA_KEL', 'KECAMATAN', 'DISABILITAS'
];

var RECAP_HEADERS = [
  'NO', 'TANGGAL_TRANSAKSI', 'KATEGORI', 'DOMISILI', 'NR', 'N_KK', 'N_AK',
  'NO_KK', 'NIK', 'NAMA_LENGKAP', 'JENIS_KELAMIN', 'TMPT_LHR', 'TGL_LHR',
  'USIA', 'NO_AKTA_LHR', 'AGAMA', 'PENDIDIKAN', 'PEKERJAAN', 'STATUS_KAWIN',
  'NO_AKTA_KWN', 'STATUS_HBKEL', 'GOL_DARAH', 'NAMA_LGKP_AYAH', 'NAMA_LGKP_IBU',
  'NAMA_KEPALA_KELUARGA', 'ALAMAT', 'DUSUN_BIP', 'DESA_KEL', 'KECAMATAN', 'DISABILITAS'
];

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'getAllData';
  var ss = getSS();
  if (action === 'getAllData') {
    var result = { bips: {}, recaps: {} };
    result.bips['all'] = readSheetData(ss, BIP_SHEET_NAME);
    result.recaps['all'] = readSheetData(ss, RECAP_SHEET_NAME);
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', message: 'API BIP Service Active' })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'No POST body received' })).setMimeType(ContentService.MimeType.JSON);
    }
    var postData = JSON.parse(e.postData.contents);
    var action   = postData.action;
    var ss       = getSS();

    if (action === 'processTransaction') {
      var payload  = postData.payload;
      var kategori = payload.kategori || 'Pindah Datang';
      var domisili = payload.domisili || 'BIP Sala';

      var bipSheet   = getOrCreateSheet(ss, BIP_SHEET_NAME,   BIP_HEADERS,   '#1e3a5f');
      var recapSheet = getOrCreateSheet(ss, RECAP_SHEET_NAME, RECAP_HEADERS, '#0f4c75');

      var noKKStr   = "'" + String(payload.no_kk || '');
      var nikStr    = "'" + String(payload.nik   || '');
      var ageVal    = (payload.umur !== undefined && payload.umur !== null) ? payload.umur : 0;
      var aktaLahir = payload.noAktaLahir || payload.n_ak || '';
      var dusunVal  = payload.dusun || domisili.replace('BIP ', '');

      if (isAddCategory(kategori)) {
        bipSheet.appendRow([
          payload.no  || 1,    domisili,
          payload.nr  || '',   payload.n_kk || '',  payload.n_ak || aktaLahir,
          noKKStr,             nikStr,
          payload.nama               || '',
          payload.jenisKelamin       || '',
          payload.tempatLahir        || '',
          payload.tanggalLahir       || '',
          ageVal,              aktaLahir,
          payload.agama              || '',
          payload.pendidikan         || '',
          payload.pekerjaan          || '',
          payload.statusKawin        || '',
          payload.noAktaKawin        || '',
          payload.statusHbkel        || '',
          payload.golDarah           || '',
          payload.namaAyah           || '',
          payload.namaIbu            || '',
          payload.namaKepalaKeluarga || '',
          payload.alamat             || '',
          dusunVal,
          payload.desaKel    || 'Abuan',
          payload.kecamatan  || 'Susut',
          payload.disabilitas || 'Tidak Ada'
        ]);
      } else {
        // Kategori Meninggal atau Pindah Keluar -> Hapus baris dari tab BIP berdasarkan NIK atau Nama
        deleteRowByNikOrName(bipSheet, payload.nik, payload.nama);
      }

      // Catat ke tab REKAP
      recapSheet.appendRow([
        payload.no || 1,
        payload.tanggalTransaksi || new Date().toISOString().split('T')[0],
        kategori,              domisili,
        payload.nr  || '',     payload.n_kk || '',  payload.n_ak || aktaLahir,
        noKKStr,               nikStr,
        payload.nama               || '',
        payload.jenisKelamin       || '',
        payload.tempatLahir        || '',
        payload.tanggalLahir       || '',
        ageVal,                aktaLahir,
        payload.agama              || '',
        payload.pendidikan         || '',
        payload.pekerjaan          || '',
        payload.statusKawin        || '',
        payload.noAktaKawin        || '',
        payload.statusHbkel        || '',
        payload.golDarah           || '',
        payload.namaAyah           || '',
        payload.namaIbu            || '',
        payload.namaKepalaKeluarga || '',
        payload.alamat             || '',
        dusunVal,
        payload.desaKel    || 'Abuan',
        payload.kecamatan  || 'Susut',
        payload.disabilitas || 'Tidak Ada'
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Data ' + kategori + ' berhasil diproses (dihapus dari BIP & dicatat di REKAP)!'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Action not handled' })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function isAddCategory(kategori) {
  if (!kategori) return true;
  return kategori !== 'Meninggal' && kategori !== 'Pindah Keluar';
}

function getOrCreateSheet(ss, sheetName, headers, bgColor) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground(bgColor || '#1e293b').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function readSheetData(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  var headers = data[0];
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var rowObj = {};
    for (var j = 0; j < headers.length; j++) {
      rowObj[headers[j].toLowerCase().replace(/ /g, '_')] = data[i][j];
    }
    rows.push(rowObj);
  }
  return rows;
}

function deleteRowByNikOrName(sheet, nik, nama) {
  var targetNik = nik ? String(nik).replace(/'/g, '').trim().toLowerCase() : '';
  var targetNama = nama ? String(nama).trim().toLowerCase() : '';
  if (!targetNik && !targetNama) return;
  var data = sheet.getDataRange().getValues();
  for (var i = data.length - 1; i >= 1; i--) {
    var rowNik = String(data[i][6] || '').replace(/'/g, '').trim().toLowerCase();
    var rowNama = String(data[i][7] || '').trim().toLowerCase();
    if ((targetNik && rowNik === targetNik) || (targetNama && rowNama === targetNama)) {
      sheet.deleteRow(i + 1);
    }
  }
}

/**
 * Jalankan SEKALI dari editor untuk membuat/reset tab BIP & REKAP dengan header bersih.
 * Cara: pilih "initSheets" dari dropdown fungsi -> klik Run (triangle play)
 */
function initSheets() {
  var ss = getSS();
  var bipSheet = ss.getSheetByName(BIP_SHEET_NAME);
  if (bipSheet) { bipSheet.clearContents(); } else { bipSheet = ss.insertSheet(BIP_SHEET_NAME); }
  bipSheet.appendRow(BIP_HEADERS);
  bipSheet.getRange(1, 1, 1, BIP_HEADERS.length).setFontWeight('bold').setBackground('#1e3a5f').setFontColor('#ffffff');
  bipSheet.setFrozenRows(1);

  var recapSheet = ss.getSheetByName(RECAP_SHEET_NAME);
  if (recapSheet) { recapSheet.clearContents(); } else { recapSheet = ss.insertSheet(RECAP_SHEET_NAME); }
  recapSheet.appendRow(RECAP_HEADERS);
  recapSheet.getRange(1, 1, 1, RECAP_HEADERS.length).setFontWeight('bold').setBackground('#0f4c75').setFontColor('#ffffff');
  recapSheet.setFrozenRows(1);

  Logger.log('Tab "' + BIP_SHEET_NAME + '" dan "' + RECAP_SHEET_NAME + '" siap!');
}
`;
