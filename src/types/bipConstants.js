export const BIP_LOCATIONS = [
  { id: 'bip_sala', name: 'BIP Sala', code: 'SALA', color: '#3b82f6' },
  { id: 'bip_abuan_kangin', name: 'BIP Abuan Kangin', code: 'AKAN', color: '#10b981' },
  { id: 'bip_abuan_kauh', name: 'BIP Abuan Kauh', code: 'AKAU', color: '#8b5cf6' },
  { id: 'bip_serokadan', name: 'BIP Serokadan', code: 'SERO', color: '#f59e0b' },
  { id: 'bip_serokadan_kaja', name: 'BIP Serokadan Kaja', code: 'SKAJ', color: '#06b6d4' }
];

export const INPUT_CATEGORIES = [
  {
    id: 'pindah_datang',
    name: 'Pindah Datang',
    type: 'ADD',
    description: 'Penduduk baru yang pindah datang dari luar wilayah ke desa/BIP.',
    recapKey: 'recap_pindah_datang',
    badgeColor: 'badge-green'
  },
  {
    id: 'pindah_masuk',
    name: 'Pindah Masuk',
    type: 'ADD',
    description: 'Penduduk yang pindah masuk antar dusun/BIP atau masuk ke registrasi lokal.',
    recapKey: 'recap_pindah_masuk',
    badgeColor: 'badge-blue'
  },
  {
    id: 'lahir',
    name: 'Lahir',
    type: 'ADD',
    description: 'Pencatatan bayi/anak baru lahir di wilayah BIP.',
    recapKey: 'recap_lahir',
    badgeColor: 'badge-purple'
  },
  {
    id: 'meninggal',
    name: 'Meninggal',
    type: 'REMOVE',
    description: 'Pencatatan penduduk yang telah meninggal dunia.',
    recapKey: 'recap_meninggal',
    badgeColor: 'badge-red'
  },
  {
    id: 'disabilitas',
    name: 'Disabilitas',
    type: 'ADD',
    description: 'Pencatatan & penambahan data kependudukan khusus warga penyandang disabilitas.',
    recapKey: 'recap_disabilitas',
    badgeColor: 'badge-amber'
  }
];

export const RECAP_DATABASES = [
  { id: 'recap_pindah_datang', name: 'Recap Pindah Datang', category: 'Pindah Datang' },
  { id: 'recap_pindah_masuk', name: 'Recap Pindah Masuk', category: 'Pindah Masuk' },
  { id: 'recap_lahir', name: 'Recap Lahir', category: 'Lahir' },
  { id: 'recap_meninggal', name: 'Recap Meninggal', category: 'Meninggal' },
  { id: 'recap_disabilitas', name: 'Recap Disabilitas', category: 'Disabilitas' }
];

export const DISABILITY_TYPES = [
  'Disabilitas Fisik',
  'Disabilitas Netra / Penglihatan',
  'Disabilitas Rungu / Wicara',
  'Disabilitas Intelektual',
  'Disabilitas Mental / Gangguaan Jiwa',
  'Disabilitas Ganda / Multi',
  'Lainnya'
];

export const RELIGIONS = [
  'Hindu',
  'Islam',
  'Kristen Protestan',
  'Katolik',
  'Buddha',
  'Khonghucu',
  'Kepercayaan Terhadap Tuhan YME'
];

export const MARITAL_STATUSES = [
  'Belum Kawin',
  'Kawin',
  'Cerai Hidup',
  'Cerai Mati'
];

export const FAMILY_RELATIONSHIPS = [
  'Kepala Keluarga',
  'Suami',
  'Istri',
  'Anak',
  'Menantu',
  'Cucu',
  'Orangtua',
  'Mertua',
  'Famili Lain',
  'Pembantu',
  'Lainnya'
];

export const BLOOD_TYPES = [
  'A',
  'B',
  'AB',
  'O',
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
  'Tidak Tahu'
];

export const AGE_GROUPS = [
  'Balita (0 - 5 Tahun)',
  'Anak-anak (6 - 12 Tahun)',
  'Remaja (13 - 17 Tahun)',
  'Dewasa Muda (18 - 35 Tahun)',
  'Dewasa (36 - 59 Tahun)',
  'Lansia (60+ Tahun)'
];

export const EDUCATION_LEVELS = [
  'TIDAK / BELUM SEKOLAH',
  'BELUM TAMAT SD/SEDERAJAT',
  'TAMAT SD / SEDERAJAT',
  'SLTP/SEDERAJAT',
  'SLTA / SEDERAJAT',
  'DIPLOMA I / II',
  'AKADEMI/ DIPLOMA III/S. MUDA',
  'DIPLOMA IV/ STRATA I',
  'STRATA II',
  'STRATA III'
];

export const JOB_CATEGORIES = [
  'BELUM/TIDAK BEKERJA',
  'MENGURUS RUMAH TANGGA',
  'PELAJAR/MAHASISWA',
  'PENSIUNAN',
  'PEGAWAI NEGERI SIPIL (PNS)',
  'TENTARA NASIONAL INDONESIA (TNI)',
  'KEPOLISIAN RI (POLRI)',
  'PERDAGANGAN',
  'PETANI/PEKEBUN',
  'PETERNAK',
  'NELAYAN/PERIKANAN',
  'INDUSTRI',
  'KONSTRUKSI',
  'TRANSPORTASI',
  'KARYAWAN SWASTA',
  'KARYAWAN BUMN',
  'KARYAWAN BUMD',
  'KARYAWAN HONORER',
  'BURUH HARIAN LEPAS',
  'BURUH TANI/PERKEBUNAN',
  'BURUH NELAYAN/PERIKANAN',
  'BURUH PETERNAKAN',
  'PEMBANTU RUMAH TANGGA',
  'TUKANG CUKUR',
  'TUKANG LISTRIK',
  'TUKANG BATU',
  'TUKANG KAYU',
  'TUKANG SOL SEPATU',
  'TUKANG LAS/PANDAI BESI',
  'TUKANG JAHIT',
  'TUKANG GIGI',
  'PENATA RIAS',
  'PENATA BUSANA',
  'PENATA RAMBUT',
  'MEKANIK',
  'SENIMAN',
  'TABIB',
  'PARAJI',
  'PERANCANG BUSANA',
  'PENTERJEMAH',
  'IMAM MASJID',
  'PENDETA',
  'PASTOR',
  'WARTAWAN',
  'USTADZ/MUBALIGH',
  'JURU MASAK',
  'PROMOTOR ACARA',
  'ANGGOTA DPR-RI',
  'ANGGOTA DPD',
  'ANGGOTA BPK',
  'PRESIDEN',
  'WAKIL PRESIDEN',
  'ANGGOTA MAHKAMAH KONSTITUSI',
  'ANGGOTA KABINET KEMENTERIAN',
  'DUTA BESAR',
  'GUBERNUR',
  'WAKIL GUBERNUR',
  'BUPATI',
  'WAKIL BUPATI',
  'WALIKOTA',
  'WAKIL WALIKOTA',
  'ANGGOTA DPRD PROVINSI',
  'ANGGOTA DPRD KABUPATEN/KOTA',
  'DOSEN',
  'GURU',
  'PILOT',
  'PENGACARA',
  'NOTARIS',
  'ARSITEK',
  'AKUNTAN',
  'KONSULTAN',
  'DOKTER',
  'BIDAN',
  'PERAWAT',
  'APOTEKER',
  'PSIKIATER/PSIKOLOG',
  'PENYIAR TELEVISI',
  'PENYIAR RADIO',
  'PELAUT',
  'PENELITI',
  'SOPIR',
  'PIALANG',
  'PARANORMAL',
  'PEDAGANG',
  'PERANGKAT DESA',
  'KEPALA DESA',
  'BIARAWATI',
  'WIRASWASTA',
  'LAINNYA'
];
