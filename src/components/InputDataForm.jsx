import React, { useState } from 'react';
import {
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Accessibility,
  Search,
  UserCheck,
  UserX
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
  calculateAgeFromBirthdate,
  searchResidentGlobal
} from '../services/storageService';
import { syncTransactionToGoogleSheet } from '../services/sheetsService';

const DEFAULT_FORM = {
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
  pendidikan: 'SLTA / SEDERAJAT',
  pekerjaan: 'PETANI/PEKEBUN',
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
  disabilitas: 'Tidak Ada'
};

export default function InputDataForm({ onTransactionSuccess }) {
  const [formData, setFormData] = useState({ ...DEFAULT_FORM });
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search state for picking existing resident (Meninggal / Pindah Keluar)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResidentSource, setSelectedResidentSource] = useState(null);

  const calculatedAge = calculateAgeFromBirthdate(formData.tanggalLahir);

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'domisili') next.dusun = value.replace('BIP ', '');
      if (field === 'n_ak') next.noAktaLahir = value;
      else if (field === 'noAktaLahir') next.n_ak = value;
      return next;
    });
  };

  const handleSearchResident = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const results = searchResidentGlobal(searchQuery);
    setSearchResults(results);
  };

  const handleSelectResidentToAutofill = (resident) => {
    setFormData(prev => ({
      ...prev,
      domisili: resident.domisili || resident.bipName || prev.domisili,
      no: resident.no || prev.no,
      nr: resident.nr || '',
      n_kk: resident.n_kk || '',
      n_ak: resident.n_ak || resident.noAktaLahir || '',
      no_kk: resident.no_kk || '',
      nik: resident.nik || '',
      nama: resident.nama || '',
      jenisKelamin: resident.jenisKelamin || 'Laki-laki',
      tempatLahir: resident.tempatLahir || 'Bangli',
      tanggalLahir: resident.tanggalLahir || '1995-01-01',
      noAktaLahir: resident.noAktaLahir || resident.n_ak || '',
      agama: resident.agama || 'Hindu',
      pendidikan: resident.pendidikan || 'SLTA / SEDERAJAT',
      pekerjaan: resident.pekerjaan || 'PETANI/PEKEBUN',
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
      disabilitas: resident.disabilitas || 'Tidak Ada'
    }));

    setSelectedResidentSource(resident);
    setSearchResults([]);
    setSearchQuery('');
  };

  const resetForm = () => {
    setFormData({ ...DEFAULT_FORM });
    setNotification(null);
    setSelectedResidentSource(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    if (!formData.nik || formData.nik.trim().length !== 16) {
      setNotification({ type: 'error', message: 'NIK wajib diisi tepat 16 digit angka!' });
      return;
    }
    if (!formData.nama || !formData.nama.trim()) {
      setNotification({ type: 'error', message: 'Nama Lengkap wajib diisi!' });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = processPopulationTransaction(formData);
      const syncRes = await syncTransactionToGoogleSheet(result.residentRecord || formData);

      let syncNote = '';
      if (syncRes.synced) {
        syncNote = ' ✅ Tersinkron ke Google Sheet';
      } else if (syncRes.reason) {
        syncNote = ` (Lokal ✓. ${syncRes.reason})`;
      } else if (syncRes.error) {
        syncNote = ` (Lokal ✓. Sheet error: ${syncRes.error})`;
      }

      setNotification({ type: 'success', message: result.message + syncNote });
      if (onTransactionSuccess) onTransactionSuccess();
      resetForm();
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Gagal memproses data.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <UserPlus color="#10b981" /> Form Input Data Kependudukan
        </h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
          Lengkapi semua field standar kependudukan BIP Desa Abuan (Bisa Input Manual atau Pilih dari BIP)
        </p>
      </div>

      {/* Notifikasi */}
      {notification && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          background: notification.type === 'error' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
          border: `1px solid ${notification.type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
          color: notification.type === 'error' ? '#f87171' : '#34d399',
          display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem'
        }}>
          {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
          <div style={{ flex: 1 }}>{notification.message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* 1. Kategori & Domisili */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#60a5fa' }}>
            1. Kategori Pencatatan & Target BIP
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">KATEGORI INPUT DATA</label>
              <select className="form-select" value={formData.kategori} onChange={e => handleInputChange('kategori', e.target.value)}>
                {INPUT_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name} ({cat.description})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">DOMISILI BIP</label>
              <select className="form-select" value={formData.domisili} onChange={e => handleInputChange('domisili', e.target.value)}>
                {BIP_LOCATIONS.map(bip => (
                  <option key={bip.id} value={bip.name}>{bip.name} (Kode: {bip.code})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Opsi Pencarian & Auto-fill Penduduk yang Ada di BIP (Khusus untuk Kategori Meninggal & Pindah Keluar) */}
          {(formData.kategori === 'Meninggal' || formData.kategori === 'Pindah Keluar') && (
            <div className="glass-card" style={{ padding: '1.15rem', marginTop: '1.25rem', border: `1px solid ${formData.kategori === 'Meninggal' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`, borderRadius: '12px', background: formData.kategori === 'Meninggal' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(245, 158, 11, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <label className="form-label" style={{ margin: 0, color: formData.kategori === 'Meninggal' ? '#f87171' : '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                  <Search size={16} /> Opsional: Pilih Warga ({formData.kategori}) dari BIP untuk Auto-Fill Form atau Isi Manual
                </label>
                {selectedResidentSource && (
                  <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}>
                    <UserCheck size={12} /> Terisi Otomatis: {selectedResidentSource.nama} ({selectedResidentSource.nik})
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ketik NIK atau Nama warga yang meninggal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button" className="btn btn-secondary" onClick={handleSearchResident}>
                  Cari Warga
                </button>
              </div>

              {searchResults.length > 0 && (
                <div style={{ marginTop: '0.75rem', maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {searchResults.map(r => (
                    <div
                      key={r.id}
                      style={{
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(15, 23, 42, 0.8)',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.8125rem'
                      }}
                    >
                      <div>
                        <strong>{r.nama}</strong> (NIK: {r.nik}) - <span style={{ color: '#60a5fa' }}>{r.domisili || r.bipName}</span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                        onClick={() => handleSelectResidentToAutofill(r)}
                      >
                        Pilih Warga Ini
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {formData.kategori === 'Disabilitas' && (
            <div className="glass-card" style={{ padding: '1rem', marginTop: '1rem', border: '1px solid rgba(245,158,11,0.4)' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Accessibility size={16} /> JENIS DISABILITAS
                </label>
                <select className="form-select" value={formData.disabilitas} onChange={e => handleInputChange('disabilitas', e.target.value)}>
                  {DISABILITY_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* 2. Identitas Penduduk */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#60a5fa' }}>
            2. Identitas Penduduk & Data Registerasi
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>

            <div className="form-group">
              <label className="form-label">NO (Nomor Urut)</label>
              <input type="number" className="form-input" value={formData.no} onChange={e => handleInputChange('no', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">NR (Nomor Rumah)</label>
              <input type="text" className="form-input" placeholder="cth: 001" value={formData.nr} onChange={e => handleInputChange('nr', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">N KK (Urutan KK dalam Rumah)</label>
              <input type="text" className="form-input" placeholder="cth: 1" value={formData.n_kk} onChange={e => handleInputChange('n_kk', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">N AK (No. Akta Kelahiran)</label>
              <input type="text" className="form-input" placeholder="Nomor Akta Kelahiran" value={formData.n_ak} onChange={e => handleInputChange('n_ak', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">NO KK (16 Digit)</label>
              <input type="text" className="form-input" placeholder="510601xxxxxxxxxx" maxLength={16} value={formData.no_kk} onChange={e => handleInputChange('no_kk', e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">NIK (16 Digit Wajib)</label>
              <input type="text" className="form-input" placeholder="510601xxxxxxxxxx" maxLength={16} value={formData.nik} onChange={e => handleInputChange('nik', e.target.value)} required />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">NAMA LENGKAP</label>
              <input type="text" className="form-input" placeholder="Nama lengkap sesuai KTP/KK" value={formData.nama} onChange={e => handleInputChange('nama', e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">JENIS KELAMIN</label>
              <select className="form-select" value={formData.jenisKelamin} onChange={e => handleInputChange('jenisKelamin', e.target.value)}>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">TEMPAT LAHIR</label>
              <input type="text" className="form-input" placeholder="cth: Bangli" value={formData.tempatLahir} onChange={e => handleInputChange('tempatLahir', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">TANGGAL LAHIR</label>
              <input type="date" className="form-input" value={formData.tanggalLahir} onChange={e => handleInputChange('tanggalLahir', e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">USIA (Otomatis)</label>
              <input type="text" className="form-input" value={`${calculatedAge} Tahun`} disabled style={{ opacity: 0.7, backgroundColor: 'rgba(255,255,255,0.05)' }} />
            </div>
            <div className="form-group">
              <label className="form-label">NO AKTA KELAHIRAN</label>
              <input type="text" className="form-input" placeholder="Nomor Akta Kelahiran" value={formData.noAktaLahir} onChange={e => handleInputChange('noAktaLahir', e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">AGAMA</label>
              <select className="form-select" value={formData.agama} onChange={e => handleInputChange('agama', e.target.value)}>
                {RELIGIONS.map(ag => <option key={ag} value={ag}>{ag}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">PENDIDIKAN</label>
              <select className="form-select" value={formData.pendidikan} onChange={e => handleInputChange('pendidikan', e.target.value)}>
                {EDUCATION_LEVELS.map(edu => <option key={edu} value={edu}>{edu}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">PEKERJAAN</label>
              <select className="form-select" value={formData.pekerjaan} onChange={e => handleInputChange('pekerjaan', e.target.value)}>
                {JOB_CATEGORIES.map(job => <option key={job} value={job}>{job}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">STATUS KAWIN</label>
              <select className="form-select" value={formData.statusKawin} onChange={e => handleInputChange('statusKawin', e.target.value)}>
                {MARITAL_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">NO AKTA PERKAWINAN</label>
              <input type="text" className="form-input" placeholder="Nomor Akta Perkawinan" value={formData.noAktaKawin} onChange={e => handleInputChange('noAktaKawin', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">STATUS HUBUNGAN KELUARGA</label>
              <select className="form-select" value={formData.statusHbkel} onChange={e => handleInputChange('statusHbkel', e.target.value)}>
                {FAMILY_RELATIONSHIPS.map(rel => <option key={rel} value={rel}>{rel}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">GOLONGAN DARAH</label>
              <select className="form-select" value={formData.golDarah} onChange={e => handleInputChange('golDarah', e.target.value)}>
                {BLOOD_TYPES.map(gol => <option key={gol} value={gol}>{gol}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">NAMA LENGKAP AYAH</label>
              <input type="text" className="form-input" placeholder="Nama Ayah Kandung" value={formData.namaAyah} onChange={e => handleInputChange('namaAyah', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">NAMA LENGKAP IBU</label>
              <input type="text" className="form-input" placeholder="Nama Ibu Kandung" value={formData.namaIbu} onChange={e => handleInputChange('namaIbu', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">NAMA KEPALA KELUARGA</label>
              <input type="text" className="form-input" placeholder="Nama Kepala Keluarga" value={formData.namaKepalaKeluarga} onChange={e => handleInputChange('namaKepalaKeluarga', e.target.value)} />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">ALAMAT LENGKAP</label>
              <input type="text" className="form-input" placeholder="Jalan, RT/RW, No. Rumah" value={formData.alamat} onChange={e => handleInputChange('alamat', e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">DUSUN</label>
              <input type="text" className="form-input" value={formData.dusun} onChange={e => handleInputChange('dusun', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">DESA ADAT</label>
              <input type="text" className="form-input" value={formData.desaKel} onChange={e => handleInputChange('desaKel', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">KECAMATAN</label>
              <input type="text" className="form-input" value={formData.kecamatan} onChange={e => handleInputChange('kecamatan', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginBottom: '3rem' }}>
          <button type="button" className="btn btn-secondary" onClick={resetForm} style={{ padding: '0.75rem 1.5rem' }}>
            <RefreshCw size={16} /> Reset Form
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
            <Save size={18} /> {isSubmitting ? 'Menyimpan...' : 'Simpan Data Baru Ke BIP'}
          </button>
        </div>
      </form>
    </div>
  );
}
