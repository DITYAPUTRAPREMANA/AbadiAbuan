import { BIP_LOCATIONS, RECAP_DATABASES, INPUT_CATEGORIES } from '../types/bipConstants';

const STORAGE_PREFIX = 'bip_penduduk_v3_';

// Initial Seed Data Generator - Kosongkan Semua Data Dummy
const generateInitialSeedData = () => {
  const seedBIPs = {
    'BIP Sala': [],
    'BIP Abuan Kangin': [],
    'BIP Abuan Kauh': [],
    'BIP Serokadan': [],
    'BIP Serokadan Kaja': []
  };

  const seedRecaps = {
    'recap_pindah_datang': [],
    'recap_pindah_masuk': [],
    'recap_lahir': [],
    'recap_meninggal': [],
    'recap_pindah_keluar': [],
    'recap_disabilitas': []
  };

  return { seedBIPs, seedRecaps };
};

export const initializeStorage = () => {
  const isInitialized = localStorage.getItem(STORAGE_PREFIX + 'initialized');
  if (!isInitialized) {
    const { seedBIPs, seedRecaps } = generateInitialSeedData();

    Object.keys(seedBIPs).forEach(bipName => {
      localStorage.setItem(STORAGE_PREFIX + 'bip_' + bipName, JSON.stringify(seedBIPs[bipName]));
    });

    Object.keys(seedRecaps).forEach(recapKey => {
      localStorage.setItem(STORAGE_PREFIX + recapKey, JSON.stringify(seedRecaps[recapKey]));
    });

    localStorage.setItem(STORAGE_PREFIX + 'initialized', 'true');
  }
};

export const getBipDatabases = () => {
  initializeStorage();
  const bips = {};
  BIP_LOCATIONS.forEach(bip => {
    const dataStr = localStorage.getItem(STORAGE_PREFIX + 'bip_' + bip.name);
    bips[bip.name] = dataStr ? JSON.parse(dataStr) : [];
  });
  return bips;
};

export const getBipDataByName = (bipName) => {
  initializeStorage();
  const dataStr = localStorage.getItem(STORAGE_PREFIX + 'bip_' + bipName);
  return dataStr ? JSON.parse(dataStr) : [];
};

export const getRecapDatabases = () => {
  initializeStorage();
  const recaps = {};
  RECAP_DATABASES.forEach(db => {
    const dataStr = localStorage.getItem(STORAGE_PREFIX + db.id);
    recaps[db.id] = dataStr ? JSON.parse(dataStr) : [];
  });
  return recaps;
};

export const calculateAgeFromBirthdate = (birthDateStr) => {
  if (!birthDateStr) return 0;
  const birthDate = new Date(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age < 0 ? 0 : age;
};

// Search Resident across all 5 BIPs by NIK or Name or ID
export const searchResidentGlobal = (query) => {
  const allBips = getBipDatabases();
  const results = [];
  const q = query.trim().toLowerCase();
  if (!q) return [];

  Object.entries(allBips).forEach(([bipName, list]) => {
    list.forEach(item => {
      if (
        (item.nik && item.nik.toLowerCase().includes(q)) ||
        (item.nama && item.nama.toLowerCase().includes(q)) ||
        (item.no_kk && item.no_kk.toLowerCase().includes(q)) ||
        (item.id && item.id.toLowerCase().includes(q))
      ) {
        results.push({ ...item, bipName });
      }
    });
  });

  return results;
};

// Process New Transaction or Category Input
export const processPopulationTransaction = (formData) => {
  initializeStorage();

  const {
    kategori,         // Pindah Datang, Pindah Masuk, Lahir, Meninggal, Disabilitas
    domisili,         // e.g. 'BIP Sala'
    no = 1,
    nr = '',
    n_kk = '',
    n_ak = '',
    no_kk = '',
    nik = '',
    nama = '',
    jenisKelamin = 'Laki-laki',
    tempatLahir = 'Bangli',
    tanggalLahir = '',
    noAktaLahir = '',
    agama = 'Hindu',
    pendidikan = 'SLTA / SEDERAJAT',
    pekerjaan = 'PETANI/PEKEBUN',
    statusKawin = 'Belum Kawin',
    noAktaKawin = '',
    statusHbkel = 'Kepala Keluarga',
    golDarah = 'Tidak Tahu',
    namaAyah = '',
    namaIbu = '',
    namaKepalaKeluarga = '',
    alamat = '',
    dusun = '',
    desaKel = 'Abuan',
    kecamatan = 'Susut',
    disabilitas = 'Tidak Ada',
    tanggalTransaksi = new Date().toISOString().split('T')[0]
  } = formData;

  const categoryMeta = INPUT_CATEGORIES.find(c => c.name === kategori);
  if (!categoryMeta) {
    throw new Error('Kategori pencatatan tidak valid!');
  }

  const bipKey = STORAGE_PREFIX + 'bip_' + domisili;
  const bipData = getBipDataByName(domisili);
  const calculatedAge = calculateAgeFromBirthdate(tanggalLahir);

  const newId = `RES-${Date.now().toString(36).toUpperCase()}`;

  const aktaLahirVal = (n_ak || noAktaLahir || '').trim();

  const newResidentRecord = {
    id: newId,
    kategori: kategori,
    no: Number(no) || bipData.length + 1,
    nr: nr.trim() || '001',
    n_kk: n_kk.trim() || '1',
    n_ak: aktaLahirVal || '-',
    no_kk: no_kk.trim(),
    nik: nik.trim(),
    nama: nama.trim(),
    jenisKelamin,
    tempatLahir: tempatLahir.trim() || 'Bangli',
    tanggalLahir,
    umur: calculatedAge,
    noAktaLahir: aktaLahirVal || '-',
    agama,
    pendidikan,
    pekerjaan,
    statusKawin,
    noAktaKawin: noAktaKawin.trim() || '-',
    statusHbkel,
    golDarah,
    namaAyah: namaAyah.trim() || '-',
    namaIbu: namaIbu.trim() || '-',
    namaKepalaKeluarga: namaKepalaKeluarga.trim() || nama.trim(),
    alamat: alamat.trim() || `Banjar ${domisili.replace('BIP ', '')}`,
    dusun: dusun.trim() || domisili.replace('BIP ', ''),
    desaKel: desaKel.trim() || 'Abuan',
    kecamatan: kecamatan.trim() || 'Susut',
    domisili,
    disabilitas: kategori === 'Disabilitas' ? disabilitas : (disabilitas || 'Tidak Ada'),
    tanggalMasuk: tanggalTransaksi,
    status: kategori === 'Meninggal' ? 'Meninggal' : 'Aktif'
  };

  const recapKey = STORAGE_PREFIX + categoryMeta.recapKey;
  const recapDataStr = localStorage.getItem(recapKey);
  const recapList = recapDataStr ? JSON.parse(recapDataStr) : [];

  const newRecapRecord = {
    ...newResidentRecord,
    id: `REC-${Date.now().toString(36).toUpperCase()}`,
    kategori,
    nik: nik.trim(),
    nama: nama.trim(),
    domisili,
    tanggalTransaksi
  };

  // 1. Kategori Meninggal & Pindah Keluar -> Otomatis Hapus dari BIP Aktif & Masuk ke REKAP
  if (kategori === 'Meninggal' || kategori === 'Pindah Keluar') {
    const targetNik = (nik || '').trim().toLowerCase();
    const targetNama = (nama || '').trim().toLowerCase();

    // Hapus dari SELURUH 5 database BIP (Sala, Abuan Kangin, Abuan Kauh, Serokadan, Serokadan Kaja)
    BIP_LOCATIONS.forEach(bip => {
      const key = STORAGE_PREFIX + 'bip_' + bip.name;
      const list = getBipDataByName(bip.name);
      const filtered = list.filter(r => {
        const rNik = String(r.nik || '').trim().toLowerCase();
        const rNama = String(r.nama || '').trim().toLowerCase();
        const isMatch = (targetNik && rNik === targetNik) || (targetNama && rNama === targetNama);
        return !isMatch;
      });
      localStorage.setItem(key, JSON.stringify(filtered));
    });

    recapList.unshift(newRecapRecord);
    localStorage.setItem(recapKey, JSON.stringify(recapList));

    return {
      success: true,
      action: 'REMOVED',
      message: `Data "${nama}" (NIK: ${nik}) berhasil diproses (${kategori}). Otomatis dihapus dari BIP aktif dan dicatat ke Rekapitulasi ${kategori}.`,
      residentRecord: newResidentRecord,
      recapRecord: newRecapRecord
    };
  }

  // 2. Add or Update to Main BIP Sheet
  const existingIndex = bipData.findIndex(r => r.nik === nik.trim() || r.id === newResidentRecord.id);
  if (existingIndex >= 0) {
    bipData[existingIndex] = { ...bipData[existingIndex], ...newResidentRecord };
  } else {
    bipData.unshift(newResidentRecord);
  }
  localStorage.setItem(bipKey, JSON.stringify(bipData));

  // Save to Recap list
  recapList.unshift(newRecapRecord);
  localStorage.setItem(recapKey, JSON.stringify(recapList));

  return {
    success: true,
    action: 'SAVED',
    message: `Data "${nama}" berhasil disimpan ke database ${domisili} (Kategori: ${kategori})!`,
    residentRecord: newResidentRecord,
    recapRecord: newRecapRecord
  };
};

// Direct Update of Existing Resident Record (Hilangkan Data Lama & Masukkan Data Baru ke Database BIP)
export const updateResidentRecord = (oldRecordId, updatedData, originalNik = null) => {
  initializeStorage();

  const allBips = getBipDatabases();
  let foundBipName = null;
  let targetIndex = -1;

  // Prioritas pencarian: ID record → NIK lama (originalNik) → NIK baru
  const searchNik = originalNik || updatedData.nik;

  Object.entries(allBips).forEach(([bipName, list]) => {
    if (foundBipName !== null) return; // sudah ketemu, skip
    const idx = list.findIndex(r =>
      r.id === oldRecordId ||
      (originalNik && r.nik === originalNik) ||
      (!originalNik && updatedData.nik && r.nik === updatedData.nik)
    );
    if (idx !== -1) {
      foundBipName = bipName;
      targetIndex = idx;
    }
  });

  console.log('[storageService] updateResidentRecord → foundBipName:', foundBipName, '| targetIndex:', targetIndex, '| searchNik:', searchNik);

  const newDomisili = updatedData.domisili || foundBipName || 'BIP Sala';
  const age = calculateAgeFromBirthdate(updatedData.tanggalLahir);

  const cleanRecord = {
    ...updatedData,
    id: oldRecordId || `RES-${Date.now().toString(36).toUpperCase()}`,
    umur: age,
    updatedAt: new Date().toISOString()
  };

  if (foundBipName && foundBipName === newDomisili && targetIndex !== -1) {
    // Case A: Domisili tidak berubah — update in place dan SIMPAN ke localStorage
    const list = [...allBips[foundBipName]]; // buat salinan baru
    list[targetIndex] = cleanRecord;
    localStorage.setItem(STORAGE_PREFIX + 'bip_' + foundBipName, JSON.stringify(list));
    console.log('[storageService] Case A: updated in place di', foundBipName);
  } else {
    // Case B: Domisili berubah atau record baru — hapus dari lama, tambah ke baru
    if (foundBipName && targetIndex !== -1) {
      const oldList = allBips[foundBipName].filter(r => r.id !== oldRecordId && r.nik !== searchNik);
      localStorage.setItem(STORAGE_PREFIX + 'bip_' + foundBipName, JSON.stringify(oldList));
      console.log('[storageService] Case B: dihapus dari', foundBipName, ', dipindah ke', newDomisili);
    }

    const newList = getBipDataByName(newDomisili);
    const existingIdxInNew = newList.findIndex(r => r.id === cleanRecord.id);
    if (existingIdxInNew !== -1) {
      newList[existingIdxInNew] = cleanRecord;
    } else {
      newList.unshift(cleanRecord);
    }
    localStorage.setItem(STORAGE_PREFIX + 'bip_' + newDomisili, JSON.stringify(newList));
  }

  return {
    success: true,
    message: `Data "${cleanRecord.nama}" telah berhasil diperbarui di database ${newDomisili}!`,
    record: cleanRecord
  };
};



// Delete Resident Record (Admin Only)
export const deleteResidentRecord = (bipName, recordId) => {
  initializeStorage();
  const list = getBipDataByName(bipName);
  const filtered = list.filter(r => r.id !== recordId);
  localStorage.setItem(STORAGE_PREFIX + 'bip_' + bipName, JSON.stringify(filtered));
  return true;
};

// Reset Database to Seed
export const resetDatabaseToSeed = () => {
  localStorage.removeItem(STORAGE_PREFIX + 'initialized');
  initializeStorage();
};
