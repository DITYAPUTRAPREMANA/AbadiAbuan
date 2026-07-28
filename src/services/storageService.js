import { BIP_LOCATIONS, RECAP_DATABASES, INPUT_CATEGORIES, AGE_GROUPS, EDUCATION_LEVELS, JOB_CATEGORIES } from '../types/bipConstants';

const STORAGE_PREFIX = 'bip_penduduk_v1_';

// Initial Mock Seed Data Generator
const generateInitialSeedData = () => {
  const seedBIPs = {
    'BIP Sala': [
      {
        id: 'RES-SALA-001',
        nik: '5106011504880001',
        nama: 'I Wayan Sudiarta',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1988-04-15',
        umur: 38,
        kelompokUmur: 'Dewasa (36 - 59 Tahun)',
        pekerjaan: 'Petani / Pekebun',
        pendidikan: 'SMA / SMK / Sederajat',
        domisili: 'BIP Sala',
        alamat: 'Banjar Sala, Desa Abuan',
        tanggalMasuk: '2020-01-10',
        status: 'Aktif'
      },
      {
        id: 'RES-SALA-002',
        nik: '5106015208920002',
        nama: 'Ni Kadek Murniati',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Bangli',
        tanggalLahir: '1992-08-12',
        umur: 34,
        kelompokUmur: 'Dewasa Muda (18 - 35 Tahun)',
        pekerjaan: 'Wiraswasta / Pedagang',
        pendidikan: 'Sarjana (D4 / S1)',
        domisili: 'BIP Sala',
        alamat: 'Banjar Sala, Desa Abuan',
        tanggalMasuk: '2021-03-15',
        status: 'Aktif'
      }
    ],
    'BIP Abuan Kangin': [
      {
        id: 'RES-AKAN-001',
        nik: '5106012010750003',
        nama: 'I Made Suardana',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1975-10-20',
        umur: 51,
        kelompokUmur: 'Dewasa (36 - 59 Tahun)',
        pekerjaan: 'Pegawai Negeri Sipil (PNS)',
        pendidikan: 'Sarjana (D4 / S1)',
        domisili: 'BIP Abuan Kangin',
        alamat: 'Banjar Abuan Kangin',
        tanggalMasuk: '2018-05-20',
        status: 'Aktif'
      },
      {
        id: 'RES-AKAN-002',
        nik: '5106016503050004',
        nama: 'Ni Komang Sari Dewi',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Denpasar',
        tanggalLahir: '2005-03-25',
        umur: 21,
        kelompokUmur: 'Dewasa Muda (18 - 35 Tahun)',
        pekerjaan: 'Pelajar / Mahasiswa',
        pendidikan: 'SMA / SMK / Sederajat',
        domisili: 'BIP Abuan Kangin',
        alamat: 'Banjar Abuan Kangin',
        tanggalMasuk: '2022-08-01',
        status: 'Aktif'
      }
    ],
    'BIP Abuan Kauh': [
      {
        id: 'RES-AKAU-001',
        nik: '5106010511600005',
        nama: 'I Nyoman Warta',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1960-11-05',
        umur: 65,
        kelompokUmur: 'Lansia (60+ Tahun)',
        pekerjaan: 'Petani / Pekebun',
        pendidikan: 'SD / Sederajat',
        domisili: 'BIP Abuan Kauh',
        alamat: 'Banjar Abuan Kauh',
        tanggalMasuk: '2015-01-01',
        status: 'Aktif'
      }
    ],
    'BIP Serokadan': [
      {
        id: 'RES-SERO-001',
        nik: '5106011101980006',
        nama: 'I Ketut Gede Putra',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1998-01-11',
        umur: 28,
        kelompokUmur: 'Dewasa Muda (18 - 35 Tahun)',
        pekerjaan: 'Karyawan Swasta',
        pendidikan: 'Diploma (D1 - D3)',
        domisili: 'BIP Serokadan',
        alamat: 'Banjar Serokadan',
        tanggalMasuk: '2023-02-14',
        status: 'Aktif'
      }
    ],
    'BIP Serokadan Kaja': [
      {
        id: 'RES-SKAJ-001',
        nik: '5106014407000007',
        nama: 'Ni Luh Putu Anggreni',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Bangli',
        tanggalLahir: '2000-07-04',
        umur: 26,
        kelompokUmur: 'Dewasa Muda (18 - 35 Tahun)',
        pekerjaan: 'Wiraswasta / Pedagang',
        pendidikan: 'Sarjana (D4 / S1)',
        domisili: 'BIP Serokadan Kaja',
        alamat: 'Banjar Serokadan Kaja',
        tanggalMasuk: '2022-11-11',
        status: 'Aktif'
      }
    ]
  };

  const seedRecaps = {
    'recap_anak_lahir': [
      {
        id: 'REC-AL-001',
        kategori: 'Anak Lahir',
        nik: '5106011506240010',
        nama: 'I Gede Putu Ananda',
        domisili: 'BIP Sala',
        tanggalTransaksi: '2024-06-15',
        keterangan: 'Lahir Selamat di RSUD Bangli (Anak Pertama dari I Wayan Sudiarta)'
      }
    ],
    'recap_pindah_datang': [
      {
        id: 'REC-PD-001',
        kategori: 'Pindah Datang',
        nik: '5106016503050004',
        nama: 'Ni Komang Sari Dewi',
        domisili: 'BIP Abuan Kangin',
        tanggalTransaksi: '2022-08-01',
        keterangan: 'Pindah dari Kota Denpasar karena pernikahan'
      }
    ],
    'recap_kelompok_umur': [
      {
        id: 'REC-KU-001',
        kategori: 'Kelompok Umur',
        nik: '5106010511600005',
        nama: 'I Nyoman Warta',
        domisili: 'BIP Abuan Kauh',
        tanggalTransaksi: '2024-01-01',
        keterangan: 'Pembaruan data kelompok umur lansia 65 tahun'
      }
    ],
    'recap_kelompok_pekerjaan': [
      {
        id: 'REC-KP-001',
        kategori: 'Kelompok Pekerjaan',
        nik: '5106011101980006',
        nama: 'I Ketut Gede Putra',
        domisili: 'BIP Serokadan',
        tanggalTransaksi: '2023-02-14',
        keterangan: 'Pembaruan pekerjaan: Karyawan Swasta'
      }
    ],
    'recap_kelompok_pendidikan': [
      {
        id: 'REC-KPED-001',
        kategori: 'Kelompok Pendidikan',
        nik: '5106015208920002',
        nama: 'Ni Kadek Murniati',
        domisili: 'BIP Sala',
        tanggalTransaksi: '2023-09-10',
        keterangan: 'Kelulusan Sarjana (S1)'
      }
    ],
    'recap_pindah_keluar': [
      {
        id: 'REC-PK-001',
        kategori: 'Pindah Keluar',
        nik: '5106012902960099',
        nama: 'I Made Raka Suputra',
        domisili: 'BIP Serokadan',
        tanggalTransaksi: '2024-02-20',
        keterangan: 'Pindah keluar ke Kabupaten Badung (Alasan Kerja)'
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
    ]
  };

  return { seedBIPs, seedRecaps };
};

// Initialize Storage if empty
export const initializeStorage = () => {
  const isInitialized = localStorage.getItem(STORAGE_PREFIX + 'initialized');
  if (!isInitialized) {
    const { seedBIPs, seedRecaps } = generateInitialSeedData();
    
    // Save BIPs
    Object.keys(seedBIPs).forEach(bipName => {
      localStorage.setItem(STORAGE_PREFIX + 'bip_' + bipName, JSON.stringify(seedBIPs[bipName]));
    });

    // Save Recaps
    Object.keys(seedRecaps).forEach(recapKey => {
      localStorage.setItem(STORAGE_PREFIX + recapKey, JSON.stringify(seedRecaps[recapKey]));
    });

    localStorage.setItem(STORAGE_PREFIX + 'initialized', 'true');
  }
};

// Get All 5 BIP Databases
export const getBipDatabases = () => {
  initializeStorage();
  const bips = {};
  BIP_LOCATIONS.forEach(bip => {
    const dataStr = localStorage.getItem(STORAGE_PREFIX + 'bip_' + bip.name);
    bips[bip.name] = dataStr ? JSON.parse(dataStr) : [];
  });
  return bips;
};

// Get Single BIP Database
export const getBipDataByName = (bipName) => {
  initializeStorage();
  const dataStr = localStorage.getItem(STORAGE_PREFIX + 'bip_' + bipName);
  return dataStr ? JSON.parse(dataStr) : [];
};

// Get All 7 Recap Databases
export const getRecapDatabases = () => {
  initializeStorage();
  const recaps = {};
  RECAP_DATABASES.forEach(db => {
    const dataStr = localStorage.getItem(STORAGE_PREFIX + db.id);
    recaps[db.id] = dataStr ? JSON.parse(dataStr) : [];
  });
  return recaps;
};

// Calculate Age and Age Group automatically from birth date
export const calculateAgeGroup = (birthDateStr) => {
  if (!birthDateStr) return { age: 0, group: 'Balita (0 - 5 Tahun)' };
  
  const birthDate = new Date(birthDateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  let group = 'Balita (0 - 5 Tahun)';
  if (age >= 6 && age <= 12) group = 'Anak-anak (6 - 12 Tahun)';
  else if (age >= 13 && age <= 17) group = 'Remaja (13 - 17 Tahun)';
  else if (age >= 18 && age <= 35) group = 'Dewasa Muda (18 - 35 Tahun)';
  else if (age >= 36 && age <= 59) group = 'Dewasa (36 - 59 Tahun)';
  else if (age >= 60) group = 'Lansia (60+ Tahun)';

  return { age, group };
};

// CORE SYSTEM TRANSACTION PROCESSOR (Based on PDF Flowchart)
export const processPopulationTransaction = (formData) => {
  initializeStorage();

  const {
    kategori,         // One of 7 input categories
    domisili,         // One of 5 BIP names
    nik,
    nama,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    pekerjaan,
    pendidikan,
    alamat,
    keterangan,
    tanggalTransaksi = new Date().toISOString().split('T')[0]
  } = formData;

  const categoryMeta = INPUT_CATEGORIES.find(c => c.name === kategori);
  if (!categoryMeta) {
    throw new Error('Kategori pencatatan tidak valid!');
  }

  const bipKey = STORAGE_PREFIX + 'bip_' + domisili;
  const bipData = getBipDataByName(domisili);

  const { age, group } = calculateAgeGroup(tanggalLahir);

  const newId = `RES-${Date.now().toString(36).toUpperCase()}`;
  const newResidentRecord = {
    id: newId,
    nik: nik.trim(),
    nama: nama.trim(),
    jenisKelamin,
    tempatLahir: tempatLahir || 'Bangli',
    tanggalLahir,
    umur: age,
    kelompokUmur: group,
    pekerjaan: pekerjaan || 'Belum / Tidak Bekerja',
    pendidikan: pendidikan || 'Belum / Tidak Sekolah',
    domisili,
    alamat: alamat || `Banjar ${domisili.replace('BIP ', '')}`,
    tanggalMasuk: tanggalTransaksi,
    status: 'Aktif'
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
    keterangan: keterangan || `Pencatatan kategori ${kategori}`,
    detailData: { ...newResidentRecord }
  };

  // LOGIC BRANCH 1: JALUR PENAMBAHAN DATA (5 Categories)
  if (categoryMeta.type === 'ADD') {
    // 1. Check if resident with same NIK already exists in target BIP
    const existingIndex = bipData.findIndex(r => r.nik === nik.trim());
    if (existingIndex >= 0) {
      // Update existing record
      bipData[existingIndex] = { ...bipData[existingIndex], ...newResidentRecord, status: 'Aktif' };
    } else {
      // Add new record to BIP main sheet
      bipData.unshift(newResidentRecord);
    }
    localStorage.setItem(bipKey, JSON.stringify(bipData));

    // 2. Log to corresponding Recap sheet
    recapList.unshift(newRecapRecord);
    localStorage.setItem(recapKey, JSON.stringify(recapList));

    return {
      success: true,
      action: 'ADDED',
      message: `Data "${nama}" berhasil ditambahkan ke Database Utama (${domisili}) dan tercatat di ${categoryMeta.name}!`,
      residentRecord: newResidentRecord,
      recapRecord: newRecapRecord
    };
  }

  // LOGIC BRANCH 2: JALUR PENGURANGAN DATA (2 Categories: Pindah Keluar & Meninggal)
  if (categoryMeta.type === 'REMOVE') {
    // 1. Remove non-permanently from target BIP
    const updatedBipData = bipData.filter(r => r.nik !== nik.trim());
    localStorage.setItem(bipKey, JSON.stringify(updatedBipData));

    // 2. Log / Archive to corresponding Recap sheet (Pindah Keluar / Meninggal)
    newRecapRecord.statusSebelumnya = 'Pernah Aktif di ' + domisili;
    recapList.unshift(newRecapRecord);
    localStorage.setItem(recapKey, JSON.stringify(recapList));

    return {
      success: true,
      action: 'REMOVED',
      message: `Data "${nama}" telah dihapus secara administratif dari ${domisili} dan dipindahkan ke Database Recap ${kategori}!`,
      residentRecord: newResidentRecord,
      recapRecord: newRecapRecord
    };
  }
};

// Reset Database to Initial Seed State
export const resetDatabaseToSeed = () => {
  localStorage.removeItem(STORAGE_PREFIX + 'initialized');
  initializeStorage();
};
