export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * SCRIPT GOOGLE APPS SCRIPT DATABASE REALTIME BIP DESA ABUAN
 * Copy dan Paste kode ini ke Google Sheets -> Ekstensi -> Apps Script
 * Lalu klik "Deploy" / "Terapkan" -> "Web App Baru" -> Akses: "Siapa Saja (Anyone)".
 */

function doGet(e) {
  var action = e.parameter.action || 'getAllData';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (action === 'getAllData') {
    var result = {
      bips: {},
      recaps: {}
    };
    
    var bipSheets = ['BIP Sala', 'BIP Abuan Kangin', 'BIP Abuan Kauh', 'BIP Serokadan', 'BIP Serokadan Kaja'];
    bipSheets.forEach(function(sheetName) {
      result.bips[sheetName] = readSheetData(ss, sheetName);
    });
    
    var recapSheets = ['Anak Lahir', 'Pindah Datang', 'Kelompok Umur', 'Kelompok Pekerjaan', 'Kelompok Pendidikan', 'Pindah Keluar', 'Meninggal'];
    recapSheets.forEach(function(sheetName) {
      result.recaps['recap_' + sheetName.toLowerCase().replace(/ /g, '_')] = readSheetData(ss, 'Recap ' + sheetName);
    });
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', message: 'API BIP Service Active' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var postData = JSON.parse(e.postData.contents);
    var action = postData.action;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === 'processTransaction') {
      var payload = postData.payload;
      var kategori = payload.kategori;
      var domisili = payload.domisili;
      
      // 1. Dapatkan atau buat Sheet BIP
      var bipSheet = getOrCreateSheet(ss, domisili, ['ID', 'NIK', 'Nama', 'Jenis Kelamin', 'Tempat Lahir', 'Tanggal Lahir', 'Umur', 'Kelompok Umur', 'Pekerjaan', 'Pendidikan', 'Alamat', 'Tanggal Masuk', 'Status']);
      
      // 2. Dapatkan atau buat Sheet Recap
      var recapSheetName = 'Recap ' + kategori;
      var recapSheet = getOrCreateSheet(ss, recapSheetName, ['ID Recap', 'Kategori', 'NIK', 'Nama', 'Domisili', 'Tanggal Transaksi']);

      var type = isAddCategory(kategori) ? 'ADD' : 'REMOVE';

      if (type === 'ADD') {
        // Tambahkan ke Sheet BIP Utama
        bipSheet.appendRow([
          payload.id || 'RES-' + new Date().getTime(),
          payload.nik,
          payload.nama,
          payload.jenisKelamin,
          payload.tempatLahir,
          payload.tanggalLahir,
          payload.umur,
          payload.kelompokUmur,
          payload.pekerjaan,
          payload.pendidikan,
          payload.alamat,
          payload.tanggalMasuk || new Date().toISOString().split('T')[0],
          'Aktif'
        ]);
      } else {
        // Hapus dari Sheet BIP Utama berdasarkan NIK (Non-Permanen: Dihapus dari BIP, disimpan di Recap)
        deleteRowByNik(bipSheet, payload.nik);
      }

      // Catat ke Sheet Recap
      recapSheet.appendRow([
        'REC-' + new Date().getTime(),
        kategori,
        payload.nik,
        payload.nama,
        domisili,
        payload.tanggalTransaksi || new Date().toISOString().split('T')[0]
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Transaksi berhasil disinkronkan ke Google Spreadsheet!'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function isAddCategory(kategori) {
  var addCats = ['Anak Lahir', 'Pindah Datang', 'Kelompok Umur', 'Kelompok Pekerjaan', 'Kelompok Pendidikan'];
  return addCats.indexOf(kategori) !== -1;
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
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

function deleteRowByNik(sheet, nik) {
  var data = sheet.getDataRange().getValues();
  for (var i = data.length - 1; i >= 1; i--) {
    if (String(data[i][1]).trim() === String(nik).trim()) {
      sheet.deleteRow(i + 1);
    }
  }
}
`;
