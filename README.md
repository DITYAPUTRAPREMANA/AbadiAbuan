# Flowchart Sistem Pencatatan Data Penduduk Berbasis BIP

*(Buku Induk Penduduk: Sala, Abuan Kangin, Abuan Kauh, Serokadan, Serokadan Kaja)*

## Alur Flowchart

```
MULAI
  │
  ▼
User Melakukan Input Data
  │
  ▼
Sistem Menampilkan 7 Opsi Kategori Pencatatan
  │
  ▼
1. Anak Lahir   2. Pindah Keluar   3. Pindah Datang   4. Meninggal
5. Kelompok Umur   6. Kelompok Pekerjaan   7. Kelompok Pendidikan
  │
  ▼
User Memilih Salah Satu Kategori dan Mengisi Data
  │
  ▼
        ┌── Jenis Kategori Input? ──┐
        │                           │
        ▼                           ▼
Kategori Penambah Data        Kategori Pengurang Data
(5 jenis: Anak Lahir,         (2 jenis: Pindah Keluar,
Pindah Datang, Kel. Umur,     Meninggal)
Kel. Pekerjaan, Kel.
Pendidikan)
        │                           │
        ▼                           ▼
Sistem Menentukan Database    Sistem Menentukan Database
Utama Sesuai Domisili User    Utama Sesuai Domisili User
        │                           │
        ▼                           ▼
Data DITAMBAHKAN ke salah     Data DIHAPUS dari salah satu
satu dari 5 Database Utama    dari 5 Database Utama (BIP)
(BIP)                         (bukan hapus permanen)
        │                           │
        └─────────────┬─────────────┘
                       ▼
     5 DATABASE UTAMA (Spreadsheet per Wilayah):
     BIP Sala | BIP Abuan Kangin | BIP Abuan Kauh |
     BIP Serokadan | BIP Serokadan Kaja
                       │
              Data disalin/dicatat sesuai kategori
                       ▼
     7 DATABASE RECAP (Spreadsheet):
     Anak Lahir | Pindah Keluar | Pindah Datang | Meninggal
     Kelompok Umur | Kelompok Pekerjaan | Kelompok Pendidikan
                       │
                       ▼
     Rekap Tercatat di Database Recap sesuai Kategori yang Dipilih
                       │
                       ▼
                    SELESAI
```

**Catatan Logika Sistem:**
- Anak Lahir, Pindah Datang, Kel. Umur, Kel. Pekerjaan, Kel. Pendidikan → **MENAMBAH** data ke salah satu dari 5 Database Utama sesuai domisili, dan dicatat pada Database Recap terkait.
- Pindah Keluar & Meninggal → **MENGHAPUS** data dari salah satu dari 5 Database Utama sesuai domisili, namun **TIDAK** dihapus permanen — data tersebut dicatat pada Database Recap Pindah Keluar / Meninggal.

---

## Penjelasan Sistem

Sistem ini merupakan sistem pencatatan data kependudukan berbasis spreadsheet yang terdiri dari dua lapisan database, yaitu 5 database utama (BIP) yang menyimpan data induk penduduk per wilayah, dan 7 database recap yang mencatat rekapitulasi setiap jenis transaksi data yang terjadi. Alur kerja sistem dimulai dari input yang dilakukan oleh user, kemudian data diproses dan disebarkan ke database yang sesuai secara otomatis.

## 1. Struktur Database

### a. Lima (5) Database Utama (BIP)

Database utama berbentuk spreadsheet yang masing-masing mewakili satu wilayah tempat tinggal (domisili) penduduk. Kelima database ini menyimpan data induk (data pokok) penduduk secara aktif:

- BIP Sala
- BIP Abuan Kangin
- BIP Abuan Kauh
- BIP Serokadan
- BIP Serokadan Kaja

### b. Tujuh (7) Database Recap

Database recap berfungsi sebagai catatan rekapitulasi dari setiap jenis transaksi/kategori input yang dilakukan oleh user, terlepas dari wilayah asalnya. Ketujuh database recap tersebut adalah:

- Anak Lahir
- Pindah Keluar
- Pindah Datang
- Meninggal
- Kelompok Umur
- Kelompok Pekerjaan
- Kelompok Pendidikan

## 2. Alur Proses (Sesuai Flowchart)

**a. Mulai & Input Data**
Proses dimulai ketika user membuka sistem dan melakukan input data.

**b. Sistem Menampilkan 7 Opsi**
Sistem menampilkan tujuh pilihan kategori pencatatan kepada user, yaitu: Anak Lahir, Pindah Keluar, Pindah Datang, Meninggal, Kelompok Umur, Kelompok Pekerjaan, dan Kelompok Pendidikan.

**c. User Memilih Kategori**
User memilih salah satu dari tujuh kategori tersebut sesuai kebutuhan pencatatan, lalu mengisi data yang diperlukan (termasuk data domisili/tempat tinggal).

**d. Sistem Menentukan Jenis Aksi**
Berdasarkan kategori yang dipilih, sistem menentukan apakah aksi tersebut bersifat menambah data atau menghapus data pada database utama.

## 3. Dua Jalur Logika Utama

### a. Jalur Penambahan Data (5 kategori)

Kategori Anak Lahir, Pindah Datang, Kelompok Umur, Kelompok Pekerjaan, dan Kelompok Pendidikan merupakan kategori yang bersifat menambah data. Ketika user menginput data pada salah satu dari kelima kategori ini, sistem akan:

- Menentukan database utama (dari 5 BIP) sesuai domisili/wilayah tempat tinggal user.
- Menambahkan data baru ke dalam database utama yang bersangkutan.
- Mencatat rekap data tersebut ke dalam database recap yang sesuai dengan kategorinya (misalnya input Anak Lahir juga tercatat di Database Recap Anak Lahir).

### b. Jalur Pengurangan Data (2 kategori)

Kategori Pindah Keluar dan Meninggal merupakan kategori yang bersifat menghapus data. Ketika user menginput data pada salah satu dari kedua kategori ini, sistem akan:

- Menentukan database utama (dari 5 BIP) sesuai domisili/wilayah tempat tinggal user.
- Menghapus data penduduk yang bersangkutan dari database utama tersebut.

> **Penting:** penghapusan ini bersifat administratif, bukan penghapusan permanen.

- Data yang dihapus tersebut dicatat/dipindahkan ke dalam database recap Pindah Keluar atau database recap Meninggal, sehingga riwayat data tetap tersimpan dan dapat ditelusuri kembali.

## 4. Ringkasan Logika Sistem

| Kategori Input | Efek pada 5 Database Utama | Database Recap Terkait |
|---|---|---|
| Anak Lahir | Tambah data | Recap Anak Lahir |
| Pindah Datang | Tambah data | Recap Pindah Datang |
| Kelompok Umur | Tambah data | Recap Kelompok Umur |
| Kelompok Pekerjaan | Tambah data | Recap Kelompok Pekerjaan |
| Kelompok Pendidikan | Tambah data | Recap Kelompok Pendidikan |
| Pindah Keluar | Hapus data (non-permanen) | Recap Pindah Keluar |
| Meninggal | Hapus data (non-permanen) | Recap Meninggal |
