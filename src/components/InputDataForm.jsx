import React, { useState, useEffect } from 'react';
import {
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Edit3,
  Search,
  Building2,
  Baby,
  UserMinus,
  Accessibility,
  FileSpreadsheet
} from 'lucide-react';
import {
  BIP_LOCATIONS,
  INPUT_CATEGORIES,
  DISABILITY_TYPES,
  RELIGIONS,
  MARITAL_STATUSES,
  FAMILY_RELATIONSHIPS,
  BLOOD_TYPES,
  EDUCATION_LEVELS,
  JOB_CATEGORIES
} from '../types/bipConstants';
import {
  processPopulationTransaction,
  updateResidentRecord,
  calculateAgeFromBirthdate,
  searchResidentGlobal
} from '../services/storageService';

export default function InputDataForm({ onTransactionSuccess, initialUpdateData = null }) {
  const [formMode, setFormMode] = useState('INSERT'); // 'INSERT' | 'UPDATE'
  const [editingRecordId, setEditingRecordId] = useState(null);

  // Search state for update mode
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Form Fields matching all columns in the Excel screenshot
  const [formData, setFormData] = useState({
    kategori: 'Pindah Datang',
    domisili: 'BIP Sala',
    no: 1,
    nr: '',
    n_kk: '',
    n_ak: '',
    no_kk: '',
    nik: '',
    nama: '',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Bangli',
    tanggalLahir: '1995-01-01',
    noAktaLahir: '',
    agama: 'Hindu',
    pendidikan: 'SMA / SMK / Sederajat',
    pekerjaan: 'Petani / Pekebun',
    statusKawin: 'Belum Kawin',
    noAktaKawin: '',
    statusHbkel: 'Kepala Keluarga',
    golDarah: 'O',
    namaAyah: '',
    namaIbu: '',
    namaKepalaKeluarga: '',
    alamat: '',
    dusun: 'Sala',
    desaKel: 'Abuan',
    kecamatan: 'Susut',
    disabilitas: 'Disabilitas Fisik',
    keterangan: ''
  });

  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form if initialUpdateData is passed
  useEffect(() => {
    if (initialUpdateData) {
      handleSelectResidentToEdit(initialUpdateData);
    }
  }, [initialUpdateData]);

  const calculatedAge = calculateAgeFromBirthdate(formData.tanggalLahir);

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'domisili') {
        next.dusun = value.replace('BIP ', '');
      }
      return next;
    });
  };

  const handleSearchResident = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const results = searchResidentGlobal(searchQuery);
    setSearchResults(results);
  };

  const handleSelectResidentToEdit = (resident) => {
    setFormMode('UPDATE');
    setEditingRecordId(resident.id);
    setFormData({
      kategori: 'Pindah Datang',
      domisili: resident.domisili || 'BIP Sala',
      no: resident.no || 1,
      nr: resident.nr || '',
      n_kk: resident.n_kk || '',
      n_ak: resident.n_ak || '',
      no_kk: resident.no_kk || '',
      nik: resident.nik || '',
      nama: resident.nama || '',
      jenisKelamin: resident.jenisKelamin || 'Laki-laki',
      tempatLahir: resident.tempatLahir || 'Bangli',
      tanggalLahir: resident.tanggalLahir || '1995-01-01',
      noAktaLahir: resident.noAktaLahir || '',
      agama: resident.agama || 'Hindu',
      pendidikan: resident.pendidikan || 'SMA / SMK / Sederajat',
      pekerjaan: resident.pekerjaan || 'Petani / Pekebun',
      statusKawin: resident.statusKawin || 'Belum Kawin',
      noAktaKawin: resident.noAktaKawin || '',
      statusHbkel: resident.statusHbkel || 'Kepala Keluarga',
      golDarah: resident.golDarah || 'O',
      namaAyah: resident.namaAyah || '',
      namaIbu: resident.namaIbu || '',
      namaKepalaKeluarga: resident.namaKepalaKeluarga || '',
      alamat: resident.alamat || '',
      dusun: resident.dusun || (resident.domisili ? resident.domisili.replace('BIP ', '') : 'Sala'),
      desaKel: resident.desaKel || 'Abuan',
      kecamatan: resident.kecamatan || 'Susut',
      disabilitas: resident.disabilitas || 'Disabilitas Fisik',
      keterangan: resident.keterangan || ''
    });
    setSearchResults([]);
    setNotification({
      type: 'info',
      message: `Data "${resident.nama}" siap diperbarui. Silakan ubah isian form lalu klik "Simpan Perubahan (Timpa Data)"`
    });
  };

  const resetForm = () => {
    setFormMode('INSERT');
    setEditingRecordId(null);
    setFormData({
      kategori: 'Pindah Datang',
      domisili: 'BIP Sala',
      no: 1,
      nr: '',
      n_kk: '',
      n_ak: '',
      no_kk: '',
      nik: '',
      nama: '',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Bangli',
      tanggalLahir: '1995-01-01',
      noAktaLahir: '',
      agama: 'Hindu',
      pendidikan: 'SMA / SMK / Sederajat',
      pekerjaan: 'Petani / Pekebun',
      statusKawin: 'Belum Kawin',
      noAktaKawin: '',
      statusHbkel: 'Kepala Keluarga',
      golDarah: 'O',
      namaAyah: '',
      namaIbu: '',
      namaKepalaKeluarga: '',
      alamat: '',
      dusun: 'Sala',
      desaKel: 'Abuan',
      kecamatan: 'Susut',
      disabilitas: 'Disabilitas Fisik',
      keterangan: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification(null);

    if (!formData.nik || formData.nik.trim().length !== 16) {
      setNotification({
        type: 'error',
        message: 'NIK Wajib diisi tepat 16 Digit angka!'
      });
      return;
    }

    if (!formData.nama || !formData.nama.trim()) {
      setNotification({
        type: 'error',
        message: 'Nama Lengkap Penduduk wajib diisi!'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (formMode === 'UPDATE') {
        // Overwrite / Update existing resident record
        const result = updateResidentRecord(editingRecordId, {
          ...formData,
          umur: calculatedAge
        });

        setNotification({
          type: 'success',
          message: result.message
        });
      } else {
        // Insert new category transaction
        const result = processPopulationTransaction(formData);
        setNotification({
          type: 'success',
          message: result.message
        });
      }

      if (onTransactionSuccess) {
        onTransactionSuccess();
      }

      resetForm();
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message || 'Gagal memproses data.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Form Mode Selector & Header */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {formMode === 'INSERT' ? <UserPlus color="#10b981" /> : <Edit3 color="#3b82f6" />}
              {formMode === 'INSERT' ? 'Form Input Data Kependudukan (5 Kategori)' : 'Form Update Data Penduduk (Timpa Data Lama)'}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
              {formMode === 'INSERT'
                ? 'Lengkapi semua field standar kependudukan (26+ Kolom Excel BIP).'
                : `Memperbarui data penduduk ID: ${editingRecordId}. Data lama di BIP akan digantikan.`}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn ${formMode === 'INSERT' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFormMode('INSERT')}
            >
              Input Baru
            </button>
            <button
              className={`btn ${formMode === 'UPDATE' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFormMode('UPDATE')}
            >
              Update Data Lama
            </button>
          </div>
        </div>

        {/* Search tool when in UPDATE mode */}
        {formMode === 'UPDATE' && (
          <div className="glass-card" style={{ padding: '1rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Search size={16} /> Cari Penduduk Yang Akan Di-update:
            </h3>
            <form onSubmit={handleSearchResident} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Ketik NIK atau Nama penduduk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary">Cari</button>
            </form>

            {searchResults.length > 0 && (
              <div style={{ marginTop: '0.75rem', maxHeight: '180px', overflowY: 'auto' }}>
                {searchResults.map(r => (
                  <div
                    key={r.id}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '8px',
                      marginBottom: '0.35rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.8125rem'
                    }}
                  >
                    <div>
                      <strong>{r.nama}</strong> (NIK: {r.nik}) - <span style={{ color: '#60a5fa' }}>{r.domisili}</span>
                    </div>
                    <button
                      className="btn btn-success"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={() => handleSelectResidentToEdit(r)}
                    >
                      Pilih & Load Form
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Alert Notification */}
      {notification && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          background: notification.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : notification.type === 'info' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
          border: `1px solid ${notification.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : notification.type === 'info' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
          color: notification.type === 'error' ? '#f87171' : notification.type === 'info' ? '#93c5fd' : '#34d399',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.9rem'
        }}>
          {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
          <div style={{ flex: 1 }}>{notification.message}</div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit}>
        {/* Category & Location Selectors */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#60a5fa' }}>
            1. Kategori Pencatatan & Target BIP
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {/* Kategori Input */}
            <div className="form-group">
              <label className="form-label">KATEGORI INPUT DATA (5 Kategori)</label>
              <select
                className="form-select"
                value={formData.kategori}
                onChange={(e) => handleInputChange('kategori', e.target.value)}
              >
                {INPUT_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name} ({cat.description})
                  </option>
                ))}
              </select>
            </div>

            {/* Target BIP */}
            <div className="form-group">
              <label className="form-label">DOMISILI TARGET BUKU INDUK PENDUDUK (BIP)</label>
              <select
                className="form-select"
                value={formData.domisili}
                onChange={(e) => handleInputChange('domisili', e.target.value)}
              >
                {BIP_LOCATIONS.map(bip => (
                  <option key={bip.id} value={bip.name}>
                    {bip.name} (Kode: {bip.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Conditional Disabilitas Selection Option */}
          {formData.kategori === 'Disabilitas' && (
            <div className="glass-card" style={{ padding: '1rem', marginTop: '1rem', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Accessibility size={16} /> PILIH RAGAM / JENIS DISABILITAS
                </label>
                <select
                  className="form-select"
                  value={formData.disabilitas}
                  onChange={(e) => handleInputChange('disabilitas', e.target.value)}
                >
                  {DISABILITY_TYPES.map(dis => (
                    <option key={dis} value={dis}>{dis}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Main Fields Grid matching Excel Screenshot */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#60a5fa' }}>
            2. Identitas Penduduk & Data Register (Sesuai Kolom Excel BIP)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {/* NO */}
            <div className="form-group">
              <label className="form-label">NO (Nomor Urut)</label>
              <input
                type="number"
                className="form-input"
                value={formData.no}
                onChange={(e) => handleInputChange('no', e.target.value)}
              />
            </div>

            {/* NR */}
            <div className="form-group">
              <label className="form-label">N R (No Register)</label>
              <input
                type="text"
                className="form-input"
                placeholder="cth: REG-001"
                value={formData.nr}
                onChange={(e) => handleInputChange('nr', e.target.value)}
              />
            </div>

            {/* N KK */}
            <div className="form-group">
              <label className="form-label">N KK (No Reg KK)</label>
              <input
                type="text"
                className="form-input"
                placeholder="cth: REG-KK-01"
                value={formData.n_kk}
                onChange={(e) => handleInputChange('n_kk', e.target.value)}
              />
            </div>

            {/* N AK */}
            <div className="form-group">
              <label className="form-label">N AK (No Reg AK)</label>
              <input
                type="text"
                className="form-input"
                placeholder="cth: REG-AK-01"
                value={formData.n_ak}
                onChange={(e) => handleInputChange('n_ak', e.target.value)}
              />
            </div>

            {/* NO_KK */}
            <div className="form-group">
              <label className="form-label">NO_KK (16 Digit)</label>
              <input
                type="text"
                className="form-input"
                placeholder="510601xxxxxxxxxx"
                maxLength={16}
                value={formData.no_kk}
                onChange={(e) => handleInputChange('no_kk', e.target.value)}
                required
              />
            </div>

            {/* NIK */}
            <div className="form-group">
              <label className="form-label">NIK (16 Digit Wajib)</label>
              <input
                type="text"
                className="form-input"
                placeholder="510601xxxxxxxxxx"
                maxLength={16}
                value={formData.nik}
                onChange={(e) => handleInputChange('nik', e.target.value)}
                required
              />
            </div>

            {/* NAMA_LENGKAP */}
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">NAMA_LENGKAP</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nama lengkap sesuai KTP/KK"
                value={formData.nama}
                onChange={(e) => handleInputChange('nama', e.target.value)}
                required
              />
            </div>

            {/* JENIS_KELAMIN */}
            <div className="form-group">
              <label className="form-label">JENIS_KELAMIN</label>
              <select
                className="form-select"
                value={formData.jenisKelamin}
                onChange={(e) => handleInputChange('jenisKelamin', e.target.value)}
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* TMPT_LHR */}
            <div className="form-group">
              <label className="form-label">TMPT_LHR (Tempat Lahir)</label>
              <input
                type="text"
                className="form-input"
                placeholder="cth: Bangli / Denpasar"
                value={formData.tempatLahir}
                onChange={(e) => handleInputChange('tempatLahir', e.target.value)}
              />
            </div>

            {/* TGL_LHR */}
            <div className="form-group">
              <label className="form-label">TGL_LHR (Tanggal Lahir)</label>
              <input
                type="date"
                className="form-input"
                value={formData.tanggalLahir}
                onChange={(e) => handleInputChange('tanggalLahir', e.target.value)}
                required
              />
            </div>

            {/* USIA (Calculated) */}
            <div className="form-group">
              <label className="form-label">USIA (Hitung Otomatis)</label>
              <input
                type="text"
                className="form-input"
                value={`${calculatedAge} Tahun`}
                disabled
                style={{ opacity: 0.8, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              />
            </div>

            {/* NO_AKTA_LHR */}
            <div className="form-group">
              <label className="form-label">NO_AKTA_LHR</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nomor Akta Kelahiran"
                value={formData.noAktaLahir}
                onChange={(e) => handleInputChange('noAktaLahir', e.target.value)}
              />
            </div>

            {/* AGAMA */}
            <div className="form-group">
              <label className="form-label">AGAMA</label>
              <select
                className="form-select"
                value={formData.agama}
                onChange={(e) => handleInputChange('agama', e.target.value)}
              >
                {RELIGIONS.map(ag => (
                  <option key={ag} value={ag}>{ag}</option>
                ))}
              </select>
            </div>

            {/* PENDIDIKAN */}
            <div className="form-group">
              <label className="form-label">PENDIDIKAN</label>
              <select
                className="form-select"
                value={formData.pendidikan}
                onChange={(e) => handleInputChange('pendidikan', e.target.value)}
              >
                {EDUCATION_LEVELS.map(edu => (
                  <option key={edu} value={edu}>{edu}</option>
                ))}
              </select>
            </div>

            {/* PEKERJAAN */}
            <div className="form-group">
              <label className="form-label">PEKERJAAN</label>
              <select
                className="form-select"
                value={formData.pekerjaan}
                onChange={(e) => handleInputChange('pekerjaan', e.target.value)}
              >
                {JOB_CATEGORIES.map(job => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </div>

            {/* STATUS_KAWIN */}
            <div className="form-group">
              <label className="form-label">STATUS_KAWIN</label>
              <select
                className="form-select"
                value={formData.statusKawin}
                onChange={(e) => handleInputChange('statusKawin', e.target.value)}
              >
                {MARITAL_STATUSES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* NO_AKTA_KWN */}
            <div className="form-group">
              <label className="form-label">NO_AKTA_KWN (Akta Perkawinan)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nomor Akta Perkawinan / Perceraian"
                value={formData.noAktaKawin}
                onChange={(e) => handleInputChange('noAktaKawin', e.target.value)}
              />
            </div>

            {/* STATUS_HBKEL */}
            <div className="form-group">
              <label className="form-label">STATUS_HBKEL (Hubungan Keluarga)</label>
              <select
                className="form-select"
                value={formData.statusHbkel}
                onChange={(e) => handleInputChange('statusHbkel', e.target.value)}
              >
                {FAMILY_RELATIONSHIPS.map(rel => (
                  <option key={rel} value={rel}>{rel}</option>
                ))}
              </select>
            </div>

            {/* GOL_DARAH */}
            <div className="form-group">
              <label className="form-label">GOL_DARAH</label>
              <select
                className="form-select"
                value={formData.golDarah}
                onChange={(e) => handleInputChange('golDarah', e.target.value)}
              >
                {BLOOD_TYPES.map(gol => (
                  <option key={gol} value={gol}>{gol}</option>
                ))}
              </select>
            </div>

            {/* NAMA_LGKP_AYAH */}
            <div className="form-group">
              <label className="form-label">NAMA_LGKP_AYAH</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nama Ayah Kandung"
                value={formData.namaAyah}
                onChange={(e) => handleInputChange('namaAyah', e.target.value)}
              />
            </div>

            {/* NAMA_LGKP_IBU */}
            <div className="form-group">
              <label className="form-label">NAMA_LGKP_IBU</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nama Ibu Kandung"
                value={formData.namaIbu}
                onChange={(e) => handleInputChange('namaIbu', e.target.value)}
              />
            </div>

            {/* NAMA_KEPALA_KELUARGA */}
            <div className="form-group">
              <label className="form-label">NAMA_KEPALA_KELUARGA</label>
              <input
                type="text"
                className="form-input"
                placeholder="Nama Kepala Keluarga"
                value={formData.namaKepalaKeluarga}
                onChange={(e) => handleInputChange('namaKepalaKeluarga', e.target.value)}
              />
            </div>

            {/* ALAMAT */}
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">ALAMAT LENGKAP</label>
              <input
                type="text"
                className="form-input"
                placeholder="Jalan, RT/RW, No. Rumah"
                value={formData.alamat}
                onChange={(e) => handleInputChange('alamat', e.target.value)}
              />
            </div>

            {/* DUSUN */}
            <div className="form-group">
              <label className="form-label">DUSUN</label>
              <input
                type="text"
                className="form-input"
                value={formData.dusun}
                onChange={(e) => handleInputChange('dusun', e.target.value)}
              />
            </div>

            {/* DESA_KEL */}
            <div className="form-group">
              <label className="form-label">DESA_KEL</label>
              <input
                type="text"
                className="form-input"
                value={formData.desaKel}
                onChange={(e) => handleInputChange('desaKel', e.target.value)}
              />
            </div>

            {/* KECAMATAN */}
            <div className="form-group">
              <label className="form-label">KECAMATAN</label>
              <input
                type="text"
                className="form-input"
                value={formData.kecamatan}
                onChange={(e) => handleInputChange('kecamatan', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginBottom: '3rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
            style={{ padding: '0.75rem 1.5rem' }}
          >
            <RefreshCw size={16} /> Reset Form
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
          >
            <Save size={18} /> {formMode === 'INSERT' ? 'Simpan Data Baru Ke BIP' : 'Simpan Perubahan (Timpa Data Lama)'}
          </button>
        </div>
      </form>
    </div>
  );
}
