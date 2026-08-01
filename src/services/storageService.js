import { BIP_LOCATIONS, RECAP_DATABASES, INPUT_CATEGORIES } from '../types/bipConstants';

const STORAGE_PREFIX = 'bip_penduduk_v2_';

// Initial Seed Data Generator with complete 26+ columns matching Excel format
const generateInitialSeedData = () => {
  const seedBIPs = {
    'BIP Sala': [
      {
        id: 'RES-SALA-001',
        no: 1,
        nr: 'REG-001',
        n_kk: 'REG-KK-01',
        n_ak: 'REG-AK-01',
        no_kk: '5106011504100001',
        nik: '5106011504880001',
        nama: 'I Wayan Sudiarta',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1988-04-15',
        umur: 38,
        noAktaLahir: '5106-LT-15041988-0001',
        agama: 'Hindu',
        pendidikan: 'SMA / SMK / Sederajat',
        pekerjaan: 'Petani / Pekebun',
        statusKawin: 'Kawin',
        noAktaKawin: '5106-KW-10102012-0005',
        statusHbkel: 'Kepala Keluarga',
        golDarah: 'O',
        namaAyah: 'I Ketut Redita',
        namaIbu: 'Ni Niang Nyoman',
        namaKepalaKeluarga: 'I Wayan Sudiarta',
        alamat: 'Banjar Sala No. 12',
        dusun: 'Sala',
        desaKel: 'Abuan',
        kecamatan: 'Susut',
        domisili: 'BIP Sala',
        disabilitas: 'Tidak Ada',
        tanggalMasuk: '2020-01-10',
        status: 'Aktif'
      },
      {
        id: 'RES-SALA-002',
        no: 2,
        nr: 'REG-002',
        n_kk: 'REG-KK-01',
        n_ak: 'REG-AK-02',
        no_kk: '5106011504100001',
        nik: '5106015208920002',
        nama: 'Ni Kadek Murniati',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Bangli',
        tanggalLahir: '1992-08-12',
        umur: 34,
        noAktaLahir: '5106-LT-12081992-0003',
        agama: 'Hindu',
        pendidikan: 'Sarjana (D4 / S1)',
        pekerjaan: 'Wiraswasta / Pedagang',
        statusKawin: 'Kawin',
        noAktaKawin: '5106-KW-10102012-0005',
        statusHbkel: 'Istri',
        golDarah: 'A+',
        namaAyah: 'I Made Subagya',
        namaIbu: 'Ni Wayan Kanti',
        namaKepalaKeluarga: 'I Wayan Sudiarta',
        alamat: 'Banjar Sala No. 12',
        dusun: 'Sala',
        desaKel: 'Abuan',
        kecamatan: 'Susut',
        domisili: 'BIP Sala',
        disabilitas: 'Tidak Ada',
        tanggalMasuk: '2021-03-15',
        status: 'Aktif'
      }
    ],
    'BIP Abuan Kangin': [
      {
        id: 'RES-AKAN-001',
        no: 1,
        nr: 'REG-101',
        n_kk: 'REG-KK-05',
        n_ak: 'REG-AK-10',
        no_kk: '5106012010150003',
        nik: '5106012010750003',
        nama: 'I Made Suardana',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1975-10-20',
        umur: 51,
        noAktaLahir: '5106-LT-20101975-0011',
        agama: 'Hindu',
        pendidikan: 'Sarjana (D4 / S1)',
        pekerjaan: 'Pegawai Negeri Sipil (PNS)',
        statusKawin: 'Kawin',
        noAktaKawin: '5106-KW-15052000-0012',
        statusHbkel: 'Kepala Keluarga',
        golDarah: 'B+',
        namaAyah: 'I Nyoman Rai',
        namaIbu: 'Ni Made Rai',
        namaKepalaKeluarga: 'I Made Suardana',
        alamat: 'Banjar Abuan Kangin No. 45',
        dusun: 'Abuan Kangin',
        desaKel: 'Abuan',
        kecamatan: 'Susut',
        domisili: 'BIP Abuan Kangin',
        disabilitas: 'Tidak Ada',
        tanggalMasuk: '2018-05-20',
        status: 'Aktif'
      },
      {
        id: 'RES-AKAN-002',
        no: 2,
        nr: 'REG-102',
        n_kk: 'REG-KK-05',
        n_ak: 'REG-AK-11',
        no_kk: '5106012010150003',
        nik: '5106016503050004',
        nama: 'Ni Komang Sari Dewi',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Denpasar',
        tanggalLahir: '2005-03-25',
        umur: 21,
        noAktaLahir: '5106-LT-25032005-0088',
        agama: 'Hindu',
        pendidikan: 'SMA / SMK / Sederajat',
        pekerjaan: 'Pelajar / Mahasiswa',
        statusKawin: 'Belum Kawin',
        noAktaKawin: '-',
        statusHbkel: 'Anak',
        golDarah: 'AB',
        namaAyah: 'I Made Suardana',
        namaIbu: 'Ni Ketut Suartini',
        namaKepalaKeluarga: 'I Made Suardana',
        alamat: 'Banjar Abuan Kangin No. 45',
        dusun: 'Abuan Kangin',
        desaKel: 'Abuan',
        kecamatan: 'Susut',
        domisili: 'BIP Abuan Kangin',
        disabilitas: 'Tidak Ada',
        tanggalMasuk: '2022-08-01',
        status: 'Aktif'
      }
    ],
    'BIP Abuan Kauh': [
      {
        id: 'RES-AKAU-001',
        no: 1,
        nr: 'REG-201',
        n_kk: 'REG-KK-12',
        n_ak: 'REG-AK-25',
        no_kk: '5106010511120005',
        nik: '5106010511600005',
        nama: 'I Nyoman Warta',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1960-11-05',
        umur: 65,
        noAktaLahir: '5106-LT-05111960-0002',
        agama: 'Hindu',
        pendidikan: 'SD / Sederajat',
        pekerjaan: 'Petani / Pekebun',
        statusKawin: 'Kawin',
        noAktaKawin: '5106-KW-01011985-0001',
        statusHbkel: 'Kepala Keluarga',
        golDarah: 'O',
        namaAyah: 'I Wayan Windu',
        namaIbu: 'Ni Made Windu',
        namaKepalaKeluarga: 'I Nyoman Warta',
        alamat: 'Banjar Abuan Kauh No. 8',
        dusun: 'Abuan Kauh',
        desaKel: 'Abuan',
        kecamatan: 'Susut',
        domisili: 'BIP Abuan Kauh',
        disabilitas: 'Disabilitas Fisik',
        tanggalMasuk: '2015-01-01',
        status: 'Aktif'
      }
    ],
    'BIP Serokadan': [
      {
        id: 'RES-SERO-001',
        no: 1,
        nr: 'REG-301',
        n_kk: 'REG-KK-20',
        n_ak: 'REG-AK-40',
        no_kk: '5106011101180006',
        nik: '5106011101980006',
        nama: 'I Ketut Gede Putra',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1998-01-11',
        umur: 28,
        noAktaLahir: '5106-LT-11011998-0044',
        agama: 'Hindu',
        pendidikan: 'Diploma (D1 - D3)',
        pekerjaan: 'Karyawan Swasta',
        statusKawin: 'Belum Kawin',
        noAktaKawin: '-',
        statusHbkel: 'Kepala Keluarga',
        golDarah: 'B',
        namaAyah: 'I Wayan Putra Sr.',
        namaIbu: 'Ni Kadek Ayu',
        namaKepalaKeluarga: 'I Ketut Gede Putra',
        alamat: 'Banjar Serokadan No. 22',
        dusun: 'Serokadan',
        desaKel: 'Abuan',
        kecamatan: 'Susut',
        domisili: 'BIP Serokadan',
        disabilitas: 'Tidak Ada',
        tanggalMasuk: '2023-02-14',
        status: 'Aktif'
      }
    ],
    'BIP Serokadan Kaja': [
      {
        id: 'RES-SKAJ-001',
        no: 1,
        nr: 'REG-401',
        n_kk: 'REG-KK-33',
        n_ak: 'REG-AK-55',
        no_kk: '5106014407200007',
        nik: '5106014407000007',
        nama: 'Ni Luh Putu Anggreni',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Bangli',
        tanggalLahir: '2000-07-04',
        umur: 26,
        noAktaLahir: '5106-LT-04072000-0019',
        agama: 'Hindu',
        pendidikan: 'Sarjana (D4 / S1)',
        pekerjaan: 'Wiraswasta / Pedagang',
        statusKawin: 'Belum Kawin',
        noAktaKawin: '-',
        statusHbkel: 'Anak',
        golDarah: 'A',
        namaAyah: 'I Nyoman Subawa',
        namaIbu: 'Ni Ketut Anggari',
        namaKepalaKeluarga: 'I Nyoman Subawa',
        alamat: 'Banjar Serokadan Kaja No. 3',
        dusun: 'Serokadan Kaja',
        desaKel: 'Abuan',
        kecamatan: 'Susut',
        domisili: 'BIP Serokadan Kaja',
        disabilitas: 'Tidak Ada',
        tanggalMasuk: '2022-11-11',
        status: 'Aktif'
      }
    ]
  };

  const seedRecaps = {
    'recap_pindah_datang': [
      {
        id: 'REC-PD-001',
        kategori: 'Pindah Datang',
        nik: '5106016503050004',
        nama: 'Ni Komang Sari Dewi',
        domisili: 'BIP Abuan Kangin',
        tanggalTransaksi: '2022-08-01',
        keterangan: 'Pindah datang dari Kota Denpasar'
      }
    ],
    'recap_pindah_masuk': [
      {
        id: 'REC-PM-001',
        kategori: 'Pindah Masuk',
        nik: '5106015208920002',
        nama: 'Ni Kadek Murniati',
        domisili: 'BIP Sala',
        tanggalTransaksi: '2021-03-15',
        keterangan: 'Pindah masuk antar dusun (Serokadan ke Sala)'
      }
    ],
    'recap_lahir': [
      {
        id: 'REC-L-001',
        kategori: 'Lahir',
        nik: '5106011506240010',
        nama: 'I Gede Putu Ananda',
        domisili: 'BIP Sala',
        tanggalTransaksi: '2024-06-15',
        keterangan: 'Lahir Selamat di RSUD Bangli (Orang Tua: I Wayan Sudiarta & Ni Kadek Murniati)'
      }
    ],
    'recap_meninggal': [
      {
        id: 'REC-M-001',
        kategori: 'Meninggal',
        nik: '5106010101400088',
        nama: 'I Wayan Nyana (Alm)',
        domisili: 'BIP Sala',
        tanggalTransaksi: '2024-05-10',
        keterangan: 'Meninggal dunia karena usia tua (Usia 84 Tahun)'
      }
    ],
    'recap_disabilitas': [
      {
        id: 'REC-DIS-001',
        kategori: 'Disabilitas',
        nik: '5106010511600005',
        nama: 'I Nyoman Warta',
        domisili: 'BIP Abuan Kauh',
        tanggalTransaksi: '2024-01-01',
        keterangan: 'Pencatatan ragam disabilitas: Disabilitas Fisik'
      }
    ]
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
    pendidikan = 'SMA / SMK / Sederajat',
    pekerjaan = 'Petani / Pekebun',
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
    keterangan = '',
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

  const newResidentRecord = {
    id: newId,
    no: Number(no) || bipData.length + 1,
    nr: nr.trim() || `REG-${Math.floor(100 + Math.random() * 900)}`,
    n_kk: n_kk.trim() || '-',
    n_ak: n_ak.trim() || '-',
    no_kk: no_kk.trim(),
    nik: nik.trim(),
    nama: nama.trim(),
    jenisKelamin,
    tempatLahir: tempatLahir.trim() || 'Bangli',
    tanggalLahir,
    umur: calculatedAge,
    noAktaLahir: noAktaLahir.trim() || '-',
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
    id: `REC-${Date.now().toString(36).toUpperCase()}`,
    kategori,
    nik: nik.trim(),
    nama: nama.trim(),
    domisili,
    tanggalTransaksi,
    keterangan: keterangan || `Pencatatan transaksi kategori ${kategori}`,
    detailData: { ...newResidentRecord }
  };

  // 1. Meninggal -> Remove/Archive from BIP main active list
  if (kategori === 'Meninggal') {
    const updatedBipData = bipData.filter(r => r.nik !== nik.trim());
    localStorage.setItem(bipKey, JSON.stringify(updatedBipData));

    recapList.unshift(newRecapRecord);
    localStorage.setItem(recapKey, JSON.stringify(recapList));

    return {
      success: true,
      action: 'REMOVED',
      message: `Data "${nama}" (NIK: ${nik}) telah diproses Meninggal dan dipindahkan dari ${domisili} ke Rekap Meninggal.`,
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
export const updateResidentRecord = (oldRecordId, updatedData) => {
  initializeStorage();

  const allBips = getBipDatabases();
  let foundBipName = null;
  let targetIndex = -1;

  Object.entries(allBips).forEach(([bipName, list]) => {
    const idx = list.findIndex(r => r.id === oldRecordId || (updatedData.nik && r.nik === updatedData.nik));
    if (idx !== -1) {
      foundBipName = bipName;
      targetIndex = idx;
    }
  });

  const newDomisili = updatedData.domisili || foundBipName || 'BIP Sala';
  const age = calculateAgeFromBirthdate(updatedData.tanggalLahir);

  const cleanRecord = {
    ...updatedData,
    id: oldRecordId || `RES-${Date.now().toString(36).toUpperCase()}`,
    umur: age,
    updatedAt: new Date().toISOString()
  };

  // Case A: Domisili didn't change, update in place
  if (foundBipName && foundBipName === newDomisili && targetIndex !== -1) {
    const list = allBips[foundBipName];
    list[targetIndex] = cleanRecord;
    localStorage.setItem(STORAGE_PREFIX + 'bip_' + foundBipName, JSON.stringify(list));
  } else {
    // Case B: Domisili changed or new location, remove old & add to new
    if (foundBipName && targetIndex !== -1) {
      const oldList = allBips[foundBipName].filter(r => r.id !== oldRecordId);
      localStorage.setItem(STORAGE_PREFIX + 'bip_' + foundBipName, JSON.stringify(oldList));
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
