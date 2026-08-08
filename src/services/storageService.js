import { BIP_LOCATIONS, RECAP_DATABASES, INPUT_CATEGORIES } from '../types/bipConstants';

const STORAGE_PREFIX = 'bip_penduduk_v2_';

// Initial Seed Data Generator with complete 26+ columns matching Excel format
const generateInitialSeedData = () => {
  const seedBIPs = {
    'BIP Sala': [
      {
        id: 'RES-SALA-001',
        no: 1,
        nr: '001',
        n_kk: '1',
        n_ak: '5106-LT-15041988-0001',
        no_kk: '5106011504100001',
        nik: '5106011504880001',
        nama: 'I Wayan Sudiarta',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1988-04-15',
        umur: 38,
        noAktaLahir: '5106-LT-15041988-0001',
        agama: 'Hindu',
        pendidikan: 'SLTA / SEDERAJAT',
        pekerjaan: 'PETANI/PEKEBUN',
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
        nr: '001',
        n_kk: '2',
        n_ak: '5106-LT-12081992-0003',
        no_kk: '5106011504100001',
        nik: '5106015208920002',
        nama: 'Ni Kadek Murniati',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Bangli',
        tanggalLahir: '1992-08-12',
        umur: 34,
        noAktaLahir: '5106-LT-12081992-0003',
        agama: 'Hindu',
        pendidikan: 'DIPLOMA IV/ STRATA I',
        pekerjaan: 'WIRASWASTA',
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
        nr: '002',
        n_kk: '1',
        n_ak: '5106-LT-20101975-0011',
        no_kk: '5106012010150003',
        nik: '5106012010750003',
        nama: 'I Made Suardana',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1975-10-20',
        umur: 51,
        noAktaLahir: '5106-LT-20101975-0011',
        agama: 'Hindu',
        pendidikan: 'DIPLOMA IV/ STRATA I',
        pekerjaan: 'PEGAWAI NEGERI SIPIL (PNS)',
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
        nr: '002',
        n_kk: '1',
        n_ak: '5106-LT-25032005-0088',
        no_kk: '5106012010150003',
        nik: '5106016503050004',
        nama: 'Ni Komang Sari Dewi',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Denpasar',
        tanggalLahir: '2005-03-25',
        umur: 21,
        noAktaLahir: '5106-LT-25032005-0088',
        agama: 'Hindu',
        pendidikan: 'SLTA / SEDERAJAT',
        pekerjaan: 'PELAJAR/MAHASISWA',
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
        nr: '003',
        n_kk: '1',
        n_ak: '5106-LT-05111960-0002',
        no_kk: '5106010511120005',
        nik: '5106010511600005',
        nama: 'I Nyoman Warta',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1960-11-05',
        umur: 65,
        noAktaLahir: '5106-LT-05111960-0002',
        agama: 'Hindu',
        pendidikan: 'TAMAT SD / SEDERAJAT',
        pekerjaan: 'PETANI/PEKEBUN',
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
        nr: '004',
        n_kk: '1',
        n_ak: '5106-LT-11011998-0044',
        no_kk: '5106011101180006',
        nik: '5106011101980006',
        nama: 'I Ketut Gede Putra',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1998-01-11',
        umur: 28,
        noAktaLahir: '5106-LT-11011998-0044',
        agama: 'Hindu',
        pendidikan: 'AKADEMI/ DIPLOMA III/S. MUDA',
        pekerjaan: 'KARYAWAN SWASTA',
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
        nr: '005',
        n_kk: '1',
        n_ak: '5106-LT-04072000-0019',
        no_kk: '5106014407200007',
        nik: '5106014407000007',
        nama: 'Ni Luh Putu Anggreni',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Bangli',
        tanggalLahir: '2000-07-04',
        umur: 26,
        noAktaLahir: '5106-LT-04072000-0019',
        agama: 'Hindu',
        pendidikan: 'DIPLOMA IV/ STRATA I',
        pekerjaan: 'WIRASWASTA',
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
        tanggalMasuk: '2021-09-01',
        status: 'Aktif'
      }
    ]
  };

  const seedRecaps = {
    'recap_pindah_datang': [
      {
        id: 'REC-PD-001',
        kategori: 'Pindah Datang',
        no: 2,
        nr: '002',
        n_kk: '1',
        n_ak: '5106-LT-25032005-0088',
        no_kk: '5106012010150003',
        nik: '5106016503050004',
        nama: 'Ni Komang Sari Dewi',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Denpasar',
        tanggalLahir: '2005-03-25',
        umur: 21,
        noAktaLahir: '5106-LT-25032005-0088',
        agama: 'Hindu',
        pendidikan: 'SLTA / SEDERAJAT',
        pekerjaan: 'PELAJAR/MAHASISWA',
        statusKawin: 'Belum Kawin',
        statusHbkel: 'Anak',
        golDarah: 'AB',
        namaAyah: 'I Made Suardana',
        namaIbu: 'Ni Ketut Suartini',
        domisili: 'BIP Abuan Kangin',
        dusun: 'Abuan Kangin',
        tanggalTransaksi: '2022-08-01'
      }
    ],
    'recap_pindah_masuk': [
      {
        id: 'REC-PM-001',
        kategori: 'Pindah Masuk',
        no: 2,
        nr: '001',
        n_kk: '2',
        n_ak: '5106-LT-12081992-0003',
        no_kk: '5106011504100001',
        nik: '5106015208920002',
        nama: 'Ni Kadek Murniati',
        jenisKelamin: 'Perempuan',
        tempatLahir: 'Bangli',
        tanggalLahir: '1992-08-12',
        umur: 34,
        noAktaLahir: '5106-LT-12081992-0003',
        agama: 'Hindu',
        pendidikan: 'DIPLOMA IV/ STRATA I',
        pekerjaan: 'WIRASWASTA',
        statusKawin: 'Kawin',
        statusHbkel: 'Istri',
        golDarah: 'A+',
        namaAyah: 'I Made Subagya',
        namaIbu: 'Ni Wayan Kanti',
        domisili: 'BIP Sala',
        dusun: 'Sala',
        tanggalTransaksi: '2021-03-15'
      }
    ],
    'recap_lahir': [
      {
        id: 'REC-L-001',
        kategori: 'Lahir',
        no: 3,
        nr: '001',
        n_kk: '1',
        n_ak: '5106-LT-15062024-0010',
        no_kk: '5106011504100001',
        nik: '5106011506240010',
        nama: 'I Gede Putu Ananda',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '2024-06-15',
        umur: 2,
        noAktaLahir: '5106-LT-15062024-0010',
        agama: 'Hindu',
        pendidikan: 'TIDAK / BELUM SEKOLAH',
        pekerjaan: 'BELUM/TIDAK BEKERJA',
        statusKawin: 'Belum Kawin',
        statusHbkel: 'Anak',
        golDarah: 'O',
        namaAyah: 'I Wayan Sudiarta',
        namaIbu: 'Ni Kadek Murniati',
        domisili: 'BIP Sala',
        dusun: 'Sala',
        tanggalTransaksi: '2024-06-15'
      }
    ],
    'recap_meninggal': [
      {
        id: 'REC-M-001',
        kategori: 'Meninggal',
        no: 99,
        nr: '001',
        n_kk: '1',
        n_ak: '5106-LT-01011940-0088',
        no_kk: '5106011504100001',
        nik: '5106010101400088',
        nama: 'I Wayan Nyana (Alm)',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1940-01-01',
        umur: 84,
        noAktaLahir: '5106-LT-01011940-0088',
        agama: 'Hindu',
        pendidikan: 'TAMAT SD / SEDERAJAT',
        pekerjaan: 'PENSIUNAN',
        statusKawin: 'Cerai Mati',
        statusHbkel: 'Famili Lain',
        golDarah: 'O',
        namaAyah: 'I Ketut Nyana Sr',
        namaIbu: 'Ni Nyoman Nyana',
        domisili: 'BIP Sala',
        dusun: 'Sala',
        tanggalTransaksi: '2024-05-10'
      }
    ],
    'recap_disabilitas': [
      {
        id: 'REC-DIS-001',
        kategori: 'Disabilitas',
        no: 1,
        nr: '003',
        n_kk: '1',
        n_ak: '5106-LT-05111960-0002',
        no_kk: '5106010511120005',
        nik: '5106010511600005',
        nama: 'I Nyoman Warta',
        jenisKelamin: 'Laki-laki',
        tempatLahir: 'Bangli',
        tanggalLahir: '1960-11-05',
        umur: 65,
        noAktaLahir: '5106-LT-05111960-0002',
        agama: 'Hindu',
        pendidikan: 'TAMAT SD / SEDERAJAT',
        pekerjaan: 'PETANI/PEKEBUN',
        statusKawin: 'Kawin',
        statusHbkel: 'Kepala Keluarga',
        golDarah: 'O',
        namaAyah: 'I Wayan Windu',
        namaIbu: 'Ni Made Windu',
        domisili: 'BIP Abuan Kauh',
        dusun: 'Abuan Kauh',
        disabilitas: 'Disabilitas Fisik',
        tanggalTransaksi: '2024-01-01'
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
