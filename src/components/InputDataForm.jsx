import React, { useState } from 'react';
import { UserPlus, Database, FileText, CheckCircle, AlertTriangle, ArrowRight, Info, RefreshCw } from 'lucide-react';
import { BIP_LOCATIONS, INPUT_CATEGORIES, JOB_CATEGORIES, EDUCATION_LEVELS } from '../types/bipConstants';
import { processPopulationTransaction, calculateAgeGroup } from '../services/storageService';
import { syncTransactionToGoogleSheet } from '../services/sheetsService';

export default function InputDataForm({ onTransactionSuccess }) {
  const [selectedCategory, setSelectedCategory] = useState(INPUT_CATEGORIES[0].name);
  const [domisili, setDomisili] = useState(BIP_LOCATIONS[0].name);

  // Form Fields
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('Laki-laki');
  const [tempatLahir, setTempatLahir] = useState('Bangli');
  const [tanggalLahir, setTanggalLahir] = useState('2000-01-01');
  const [pekerjaan, setPekerjaan] = useState(JOB_CATEGORIES[0]);
  const [pendidikan, setPendidikan] = useState(EDUCATION_LEVELS[3]);
  const [alamat, setAlamat] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [tanggalTransaksi, setTanggalTransaksi] = useState(new Date().toISOString().split('T')[0]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const categoryMeta = INPUT_CATEGORIES.find(c => c.name === selectedCategory) || INPUT_CATEGORIES[0];
  const isAddCategory = categoryMeta.type === 'ADD';

  // Live Auto Computed Age
  const { age, group } = calculateAgeGroup(tanggalLahir);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    // Basic Validation
    if (!nik || nik.length < 16) {
      setNotification({ type: 'error', message: 'NIK wajib diisi minimal 16 digit angka!' });
      return;
    }
    if (!nama.trim()) {
      setNotification({ type: 'error', message: 'Nama lengkap wajib diisi!' });
      return;
    }

    setLoading(true);

    try {
      const formDataPayload = {
        kategori: selectedCategory,
        domisili,
        nik,
        nama,
        jenisKelamin,
        tempatLahir,
        tanggalLahir,
        pekerjaan,
        pendidikan,
        alamat,
        keterangan,
        tanggalTransaksi
      };

      // 1. Process in Local Storage Engine
      const result = processPopulationTransaction(formDataPayload);

      // 2. Try Google Sheets Sync in Background
      const sheetResult = await syncTransactionToGoogleSheet(formDataPayload);

      setLoading(false);
      setNotification({
        type: 'success',
        message: result.message + (sheetResult.synced ? ' (Tersinkron ke Google Sheets)' : '')
      });

      // Clear Form or notify parent
      if (onTransactionSuccess) {
        onTransactionSuccess();
      }

      // Reset form conditionally
      setNik('');
      setNama('');
      setKeterangan('');
    } catch (err) {
      setLoading(false);
      setNotification({ type: 'error', message: err.message || 'Gagal memproses transaksi data!' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Form Input Pencatatan Penduduk
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
          Pilih salah satu dari 7 kategori pencatatan. Sistem akan menentukan aksi ke Database Utama & Database Recap secara otomatis.
        </p>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: notification.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: notification.type === 'success' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
          color: notification.type === 'success' ? '#34d399' : '#f87171'
        }}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
          <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{notification.message}</div>
        </div>
      )}

      {/* STEP 1: Select Category */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <label className="form-label" style={{ marginBottom: '0.75rem', display: 'block' }}>
          Langkah 1: Pilih Kategori Pencatatan (7 Opsi Kategori)
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {INPUT_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.name;
            const isAdd = cat.type === 'ADD';

            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: isSelected 
                    ? `2px solid ${isAdd ? '#10b981' : '#ef4444'}` 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isSelected 
                    ? isAdd ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)' 
                    : 'rgba(30, 41, 59, 0.4)',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '700' }}>{cat.name}</span>
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: '700',
                    color: isAdd ? '#34d399' : '#f87171'
                  }}>
                    {isAdd ? '+ Tambah' : '- Hapus'}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: isSelected ? '#cbd5e1' : '#64748b', lineHeight: '1.3' }}>
                  {isAdd ? 'Menambah ke BIP & Recap' : 'Menghapus dari BIP & Pindah ke Recap'}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Logic Explanation Card */}
        <div style={{
          marginTop: '1.25rem',
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          background: isAddCategory ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
          border: isAddCategory ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(239, 68, 68, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.875rem'
        }}>
          <Info size={24} color={isAddCategory ? '#34d399' : '#f87171'} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: '700', color: isAddCategory ? '#34d399' : '#f87171' }}>
              Logika Jalur System: {isAddCategory ? 'JALUR PENAMBAHAN DATA' : 'JALUR PENGURANGAN DATA'}
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.8125rem', marginTop: '0.15rem' }}>
              {isAddCategory ? (
                <>Data baru akan <b>DITAMBAHKAN</b> ke Database Utama (<strong>{domisili}</strong>) dan dicatat ke <strong>Recap {selectedCategory}</strong>.</>
              ) : (
                <>Data akan <b>DIHAPUS ADMINISTRATIVE</b> (non-permanen) dari Database Utama (<strong>{domisili}</strong>) dan dipindahkan ke <strong>Recap {selectedCategory}</strong>.</>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STEP 2: Fill Form Fields */}
      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.25rem' }}>
          Langkah 2: Lengkapi Rincian Data Penduduk
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Domisili / Wilayah Tempat Tinggal */}
          <div className="form-group">
            <label className="form-label">
              Database Utama Domisili (5 BIP) <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={domisili}
              onChange={(e) => setDomisili(e.target.value)}
              className="form-select"
            >
              {BIP_LOCATIONS.map(bip => (
                <option key={bip.id} value={bip.name}>{bip.name}</option>
              ))}
            </select>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Menentukan spreadsheet BIP mana yang akan diupdate.
            </span>
          </div>

          {/* NIK */}
          <div className="form-group">
            <label className="form-label">
              NIK (Nomor Induk Kependudukan) <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              maxLength={16}
              placeholder="Contoh: 510601..."
              value={nik}
              onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
              className="form-input"
              required
            />
          </div>

          {/* Nama Lengkap */}
          <div className="form-group">
            <label className="form-label">
              Nama Lengkap Penduduk <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: I Wayan Sudiarta"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Jenis Kelamin */}
          <div className="form-group">
            <label className="form-label">Jenis Kelamin</label>
            <select
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value)}
              className="form-select"
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Tempat & Tanggal Lahir */}
          <div className="form-group">
            <label className="form-label">Tempat Lahir</label>
            <input
              type="text"
              value={tempatLahir}
              onChange={(e) => setTempatLahir(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Tanggal Lahir (Auto Hitung Umur: {age} Thn)
            </label>
            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              className="form-input"
            />
            <span style={{ fontSize: '0.75rem', color: '#60a5fa' }}>
              Kategori Kelompok Umur: {group}
            </span>
          </div>

          {/* Pekerjaan */}
          <div className="form-group">
            <label className="form-label">Kelompok Pekerjaan</label>
            <select
              value={pekerjaan}
              onChange={(e) => setPekerjaan(e.target.value)}
              className="form-select"
            >
              {JOB_CATEGORIES.map((job, idx) => (
                <option key={idx} value={job}>{job}</option>
              ))}
            </select>
          </div>

          {/* Pendidikan */}
          <div className="form-group">
            <label className="form-label">Kelompok Pendidikan</label>
            <select
              value={pendidikan}
              onChange={(e) => setPendidikan(e.target.value)}
              className="form-select"
            >
              {EDUCATION_LEVELS.map((edu, idx) => (
                <option key={idx} value={edu}>{edu}</option>
              ))}
            </select>
          </div>

          {/* Tanggal Transaksi */}
          <div className="form-group">
            <label className="form-label">Tanggal Transaksi / Kejadian</label>
            <input
              type="date"
              value={tanggalTransaksi}
              onChange={(e) => setTanggalTransaksi(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Alamat & Keterangan */}
        <div style={{ marginTop: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Alamat Domisili Lengkap</label>
            <input
              type="text"
              placeholder={`Banjar ${domisili.replace('BIP ', '')}, Desa Abuan`}
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Keterangan / Catatan Rekap ({selectedCategory})
            </label>
            <textarea
              rows={3}
              placeholder={isAddCategory 
                ? 'Contoh: Lahir di RSUD Bangli / Pindah dari Denpasar' 
                : 'Contoh: Pindah keluar ke Kabupaten Badung / Meninggal karena usia tua'}
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="form-textarea"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setNik('');
              setNama('');
              setKeterangan('');
              setNotification(null);
            }}
          >
            Reset Form
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`btn ${isAddCategory ? 'btn-success' : 'btn-danger'}`}
            style={{ padding: '0.75rem 1.75rem', fontSize: '0.9375rem' }}
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="live-pulse" />
                <span>Memproses Data...</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Proses Transaction ({selectedCategory})</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
