const CONFIG_KEY = 'bip_google_sheets_config';
const DEFAULT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxm6_A5euQiFkdHDdXR_V6dLj-jxssHnH21ak2FTZ-odd15ZnPS_k65WwVwllXS7aC4/exec';

export const getSheetsConfig = () => {
  const saved = localStorage.getItem(CONFIG_KEY);
  if (!saved) {
    const defaultConfig = { webAppUrl: DEFAULT_WEB_APP_URL, autoSync: true, lastSync: null };
    localStorage.setItem(CONFIG_KEY, JSON.stringify(defaultConfig));
    return defaultConfig;
  }
  const parsed = JSON.parse(saved);
  if (!parsed.webAppUrl) {
    parsed.webAppUrl = DEFAULT_WEB_APP_URL;
    localStorage.setItem(CONFIG_KEY, JSON.stringify(parsed));
  }
  return parsed;
};

export const saveSheetsConfig = (config) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

export const syncTransactionToGoogleSheet = async (transactionPayload) => {
  const config = getSheetsConfig();
  if (!config.webAppUrl) {
    return { synced: false, reason: 'Google Apps Script URL belum dikonfigurasi' };
  }

  try {
    const response = await fetch(config.webAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'processTransaction',
        payload: transactionPayload
      })
    });

    let resJson = null;
    try {
      resJson = await response.json();
    } catch (parseErr) {
      // Intentionally fallback if 302 redirect output text is returned
    }

    saveSheetsConfig({ ...config, lastSync: new Date().toISOString() });
    return { synced: true, data: resJson };
  } catch (error) {
    console.error('Failed to sync to Google Sheet:', error);
    return { synced: false, error: error.message };
  }
};


export const syncAllDataToGoogleSheet = async (allBips, allRecaps) => {
  const config = getSheetsConfig();
  if (!config.webAppUrl) {
    throw new Error('Google Apps Script Web App URL belum diatur.');
  }

  let successCount = 0;
  let failCount = 0;

  // Flatten all BIP residents and sync them
  const bipEntries = Object.entries(allBips || {});
  for (const [domisili, list] of bipEntries) {
    for (const resident of list) {
      const payload = {
        ...resident,
        kategori: resident.kategori || 'Pindah Datang',
        domisili: domisili
      };
      const res = await syncTransactionToGoogleSheet(payload);
      if (res.synced) successCount++;
      else failCount++;
    }
  }

  saveSheetsConfig({ ...config, lastSync: new Date().toISOString() });
  return { successCount, failCount };
};

export const fetchAllFromGoogleSheet = async () => {
  const config = getSheetsConfig();
  if (!config.webAppUrl) {
    throw new Error('Google Apps Script Web App URL belum diatur.');
  }

  const url = `${config.webAppUrl}?action=getAllData`;
  const response = await fetch(url);
  const data = await response.json();
  saveSheetsConfig({ ...config, lastSync: new Date().toISOString() });
  return data;
};

export const syncFromGoogleSheetsToLocalStorage = async () => {
  const config = getSheetsConfig();
  if (!config.webAppUrl) return false;

  try {
    const data = await fetchAllFromGoogleSheet();
    if (!data) return false;

    // 1. Process BIP sheet data
    const bipRows = data.bips?.all || data.bips?.BIP || [];
    const bipsByDomisili = {
      'BIP Sala': [],
      'BIP Abuan Kangin': [],
      'BIP Abuan Kauh': [],
      'BIP Serokadan': [],
      'BIP Serokadan Kaja': []
    };

    bipRows.forEach((row, idx) => {
      const cleanNik = String(row.nik || '').replace(/'/g, '').trim();
      const cleanNoKk = String(row.no_kk || '').replace(/'/g, '').trim();
      const nama = String(row.nama_lengkap || row.nama || '').trim();

      if (!cleanNik && !nama) return;

      const rawDomisili = String(row.domisili || row.dusun_bip || '').trim();
      let domisili = 'BIP Sala';
      if (rawDomisili) {
        if (rawDomisili.startsWith('BIP ')) domisili = rawDomisili;
        else domisili = 'BIP ' + rawDomisili;
      }

      const resident = {
        id: `RES-GS-${idx + 1}-${cleanNik || Date.now()}`,
        no: Number(row.no) || idx + 1,
        nr: String(row.nr || '001'),
        n_kk: String(row.n_kk || '1'),
        n_ak: String(row.n_ak || row.no_akta_lhr || '-'),
        no_kk: cleanNoKk,
        nik: cleanNik,
        nama: nama,
        jenisKelamin: String(row.jenis_kelamin || 'Laki-laki'),
        tempatLahir: String(row.tmpt_lhr || row.tempat_lahir || 'Bangli'),
        tanggalLahir: row.tgl_lhr ? String(row.tgl_lhr).split('T')[0] : '1995-01-01',
        umur: Number(row.usia || row.umur) || 0,
        noAktaLahir: String(row.no_akta_lhr || row.n_ak || '-'),
        agama: String(row.agama || 'Hindu'),
        pendidikan: String(row.pendidikan || 'SLTA / SEDERAJAT'),
        pekerjaan: String(row.pekerjaan || 'PETANI/PEKEBUN'),
        statusKawin: String(row.status_kawin || 'Belum Kawin'),
        noAktaKawin: String(row.no_akta_kwn || '-'),
        statusHbkel: String(row.status_hbkel || 'Kepala Keluarga'),
        golDarah: String(row.gol_darah || 'O'),
        namaAyah: String(row.nama_lgkp_ayah || row.nama_ayah || '-'),
        namaIbu: String(row.nama_lgkp_ibu || row.nama_ibu || '-'),
        namaKepalaKeluarga: String(row.nama_kepala_keluarga || nama),
        alamat: String(row.alamat || `Banjar ${domisili.replace('BIP ', '')}`),
        dusun: String(row.dusun_bip || domisili.replace('BIP ', '')),
        desaKel: String(row.desa_kel || 'Abuan'),
        kecamatan: String(row.kecamatan || 'Susut'),
        domisili: domisili,
        disabilitas: String(row.disabilitas || 'Tidak Ada'),
        status: 'Aktif'
      };

      if (bipsByDomisili[domisili]) {
        bipsByDomisili[domisili].push(resident);
      } else {
        bipsByDomisili['BIP Sala'].push(resident);
      }
    });

    Object.keys(bipsByDomisili).forEach(bipName => {
      localStorage.setItem('bip_penduduk_v3_bip_' + bipName, JSON.stringify(bipsByDomisili[bipName]));
    });

    // 2. Process REKAP sheet data
    const recapRows = data.recaps?.all || data.recaps?.REKAP || [];
    const recapsByCategory = {
      'recap_pindah_datang': [],
      'recap_pindah_masuk': [],
      'recap_lahir': [],
      'recap_meninggal': [],
      'recap_pindah_keluar': [],
      'recap_disabilitas': []
    };

    const categoryMap = {
      'Pindah Datang': 'recap_pindah_datang',
      'Pindah Masuk': 'recap_pindah_masuk',
      'Lahir': 'recap_lahir',
      'Meninggal': 'recap_meninggal',
      'Pindah Keluar': 'recap_pindah_keluar',
      'Disabilitas': 'recap_disabilitas'
    };

    recapRows.forEach((row, idx) => {
      const cleanNik = String(row.nik || '').replace(/'/g, '').trim();
      const nama = String(row.nama_lengkap || row.nama || '').trim();
      const kategori = String(row.kategori || 'Pindah Datang').trim();

      if (!cleanNik && !nama) return;

      const targetKey = categoryMap[kategori] || 'recap_pindah_datang';
      const rawDomisili = String(row.domisili || row.dusun_bip || '').trim();
      let domisili = 'BIP Sala';
      if (rawDomisili) {
        if (rawDomisili.startsWith('BIP ')) domisili = rawDomisili;
        else domisili = 'BIP ' + rawDomisili;
      }

      const recapRecord = {
        id: `REC-GS-${idx + 1}-${cleanNik || Date.now()}`,
        kategori: kategori,
        no: Number(row.no) || idx + 1,
        tanggalTransaksi: row.tanggal_transaksi ? String(row.tanggal_transaksi).split('T')[0] : new Date().toISOString().split('T')[0],
        nr: String(row.nr || '001'),
        n_kk: String(row.n_kk || '1'),
        n_ak: String(row.n_ak || row.no_akta_lhr || '-'),
        no_kk: String(row.no_kk || '').replace(/'/g, '').trim(),
        nik: cleanNik,
        nama: nama,
        jenisKelamin: String(row.jenis_kelamin || 'Laki-laki'),
        tempatLahir: String(row.tmpt_lhr || 'Bangli'),
        tanggalLahir: row.tgl_lhr ? String(row.tgl_lhr).split('T')[0] : '1995-01-01',
        umur: Number(row.usia || row.umur) || 0,
        noAktaLahir: String(row.no_akta_lhr || '-'),
        agama: String(row.agama || 'Hindu'),
        pendidikan: String(row.pendidikan || 'SLTA / SEDERAJAT'),
        pekerjaan: String(row.pekerjaan || 'PETANI/PEKEBUN'),
        statusKawin: String(row.status_kawin || 'Belum Kawin'),
        noAktaKawin: String(row.no_akta_kwn || '-'),
        statusHbkel: String(row.status_hbkel || 'Kepala Keluarga'),
        golDarah: String(row.gol_darah || 'O'),
        namaAyah: String(row.nama_lgkp_ayah || '-'),
        namaIbu: String(row.nama_lgkp_ibu || '-'),
        namaKepalaKeluarga: String(row.nama_kepala_keluarga || nama),
        alamat: String(row.alamat || ''),
        dusun: String(row.dusun_bip || domisili.replace('BIP ', '')),
        desaKel: String(row.desa_kel || 'Abuan'),
        kecamatan: String(row.kecamatan || 'Susut'),
        domisili: domisili,
        disabilitas: String(row.disabilitas || 'Tidak Ada')
      };

      recapsByCategory[targetKey].push(recapRecord);
    });

    Object.keys(recapsByCategory).forEach(recapKey => {
      localStorage.setItem('bip_penduduk_v3_' + recapKey, JSON.stringify(recapsByCategory[recapKey]));
    });

    return true;
  } catch (err) {
    console.error('Failed syncFromGoogleSheetsToLocalStorage:', err);
    return false;
  }
};
