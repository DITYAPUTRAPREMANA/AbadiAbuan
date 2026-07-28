export const BIP_LOCATIONS = [
  { id: 'bip_sala', name: 'BIP Sala', code: 'SALA', color: '#3b82f6' },
  { id: 'bip_abuan_kangin', name: 'BIP Abuan Kangin', code: 'AKAN', color: '#10b981' },
  { id: 'bip_abuan_kauh', name: 'BIP Abuan Kauh', code: 'AKAU', color: '#8b5cf6' },
  { id: 'bip_serokadan', name: 'BIP Serokadan', code: 'SERO', color: '#f59e0b' },
  { id: 'bip_serokadan_kaja', name: 'BIP Serokadan Kaja', code: 'SKAJ', color: '#06b6d4' }
];

export const INPUT_CATEGORIES = [
  {
    id: 'anak_lahir',
    name: 'Anak Lahir',
    type: 'ADD',
    description: 'Pencatatan kelahiran anak baru. Menambah data ke BIP domisili & Rekap Anak Lahir.',
    recapKey: 'recap_anak_lahir',
    badgeColor: 'badge-blue'
  },
  {
    id: 'pindah_datang',
    name: 'Pindah Datang',
    type: 'ADD',
    description: 'Penduduk baru yang pindah masuk ke wilayah. Menambah data ke BIP domisili & Rekap Pindah Datang.',
    recapKey: 'recap_pindah_datang',
    badgeColor: 'badge-green'
  },
  {
    id: 'kelompok_umur',
    name: 'Kelompok Umur',
    type: 'ADD',
    description: 'Pencatatan perubahan/kategori kelompok umur penduduk. Menambah data ke BIP & Rekap Umur.',
    recapKey: 'recap_kelompok_umur',
    badgeColor: 'badge-purple'
  },
  {
    id: 'kelompok_pekerjaan',
    name: 'Kelompok Pekerjaan',
    type: 'ADD',
    description: 'Pencatatan status/kategori pekerjaan penduduk. Menambah data ke BIP & Rekap Pekerjaan.',
    recapKey: 'recap_kelompok_pekerjaan',
    badgeColor: 'badge-amber'
  },
  {
    id: 'kelompok_pendidikan',
    name: 'Kelompok Pendidikan',
    type: 'ADD',
    description: 'Pencatatan tingkat pendidikan penduduk. Menambah data ke BIP & Rekap Pendidikan.',
    recapKey: 'recap_kelompok_pendidikan',
    badgeColor: 'badge-cyan'
  },
  {
    id: 'pindah_keluar',
    name: 'Pindah Keluar',
    type: 'REMOVE',
    description: 'Penduduk yang pindah keluar wilayah. Menghapus data dari BIP domisili (non-permanen) & memindahkan ke Rekap Pindah Keluar.',
    recapKey: 'recap_pindah_keluar',
    badgeColor: 'badge-red'
  },
  {
    id: 'meninggal',
    name: 'Meninggal',
    type: 'REMOVE',
    description: 'Penduduk yang telah meninggal dunia. Menghapus data dari BIP domisili (non-permanen) & memindahkan ke Rekap Meninggal.',
    recapKey: 'recap_meninggal',
    badgeColor: 'badge-gray'
  }
];

export const RECAP_DATABASES = [
  { id: 'recap_anak_lahir', name: 'Recap Anak Lahir', category: 'Anak Lahir' },
  { id: 'recap_pindah_keluar', name: 'Recap Pindah Keluar', category: 'Pindah Keluar' },
  { id: 'recap_pindah_datang', name: 'Recap Pindah Datang', category: 'Pindah Datang' },
  { id: 'recap_meninggal', name: 'Recap Meninggal', category: 'Meninggal' },
  { id: 'recap_kelompok_umur', name: 'Recap Kelompok Umur', category: 'Kelompok Umur' },
  { id: 'recap_kelompok_pekerjaan', name: 'Recap Kelompok Pekerjaan', category: 'Kelompok Pekerjaan' },
  { id: 'recap_kelompok_pendidikan', name: 'Recap Kelompok Pendidikan', category: 'Kelompok Pendidikan' }
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
  'Belum / Tidak Sekolah',
  'SD / Sederajat',
  'SMP / Sederajat',
  'SMA / SMK / Sederajat',
  'Diploma (D1 - D3)',
  'Sarjana (D4 / S1)',
  'Magister (S2)',
  'Doktor (S3)'
];

export const JOB_CATEGORIES = [
  'Belum / Tidak Bekerja',
  'Mengurus Rumah Tangga',
  'Pelajar / Mahasiswa',
  'Petani / Pekebun',
  'Peternak',
  'Wiraswasta / Pedagang',
  'Pegawai Negeri Sipil (PNS)',
  'TNI / POLRI',
  'Karyawan Swasta',
  'Karyawan BUMN',
  'Buruh Harian Lepas',
  'Pekerja Seni / Adat',
  'Lainnya'
];
