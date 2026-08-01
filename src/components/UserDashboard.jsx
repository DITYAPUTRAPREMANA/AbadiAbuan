import React, { useState } from 'react';
import { 
  UserCheck, 
  UserPlus, 
  UserMinus, 
  Baby, 
  Building2, 
  Accessibility, 
  Search, 
  Edit3, 
  ArrowRight,
  Database,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BIP_LOCATIONS } from '../types/bipConstants';
import { searchResidentGlobal } from '../services/storageService';

export default function UserDashboard({ 
  bipData, 
  recapData, 
  setActiveTab, 
  setSelectedBipName,
  onSelectResidentForUpdate
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const calculateTotalPopulation = () => {
    return Object.values(bipData).reduce((acc, curr) => acc + (curr ? curr.length : 0), 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const res = searchResidentGlobal(searchQuery);
    setSearchResults(res);
    setHasSearched(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Operational Banner */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        borderLeft: '5px solid #3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            background: 'rgba(59, 130, 246, 0.2)',
            color: '#60a5fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <UserCheck size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Dashboard Operational Petugas Data BIP
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
              Silakan menginput data penduduk baru atau meng-update data lama yang ada di 5 BIP Desa Abuan.
            </p>
          </div>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setActiveTab('input_data')}
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
        >
          <UserPlus size={18} /> Input Data Baru &rarr;
        </button>
      </div>

      {/* Search & Update Resident Tool */}
      <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <Search size={18} color="#3b82f6" /> Cari &amp; Update Data Penduduk Lama (Timpa Data)
        </h3>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Ketik NIK atau Nama Penduduk untuk memperbarui data lama yang telah terdaftar di database BIP.
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <input 
            type="text" 
            className="form-input"
            placeholder="Ketik NIK 16 digit atau Nama Penduduk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0 1.5rem' }}>
            <Search size={16} /> Cari Data
          </button>
        </form>

        {hasSearched && (
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Hasil Pencarian ({searchResults.length} data ditemukan):
            </h4>

            {searchResults.length === 0 ? (
              <div style={{
                padding: '1rem',
                borderRadius: '10px',
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                textAlign: 'center'
              }}>
                Tidak ada penduduk ditemukan dengan kata kunci "{searchQuery}".
              </div>
            ) : (
              <div className="custom-table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>NIK</th>
                      <th>Nama Lengkap</th>
                      <th>Jenis Kelamin</th>
                      <th>Domisili BIP</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map(res => (
                      <tr key={res.id}>
                        <td><code>{res.nik}</code></td>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{res.nama}</td>
                        <td>{res.jenisKelamin}</td>
                        <td>
                          <span className="badge badge-blue">{res.domisili}</span>
                        </td>
                        <td>
                          <span className={res.status === 'Aktif' ? 'badge badge-green' : 'badge badge-red'}>
                            {res.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button 
                            className="btn btn-success"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                            onClick={() => onSelectResidentForUpdate(res)}
                          >
                            <Edit3 size={14} /> Update Data Ini
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5 Category Quick Shortcuts */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Pilih Kategori Input Data (5 Kategori)
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1rem'
        }}>
          {/* 1. Pindah Datang */}
          <div 
            className="glass-card" 
            style={{ padding: '1.25rem', cursor: 'pointer' }}
            onClick={() => setActiveTab('input_data')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                <UserPlus size={20} />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Pindah Datang</h4>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Input data penduduk baru dari luar wilayah.
            </p>
          </div>

          {/* 2. Pindah Masuk */}
          <div 
            className="glass-card" 
            style={{ padding: '1.25rem', cursor: 'pointer' }}
            onClick={() => setActiveTab('input_data')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>
                <Building2 size={20} />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Pindah Masuk</h4>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Input perpindahan antar banjar / dusun lokal.
            </p>
          </div>

          {/* 3. Lahir */}
          <div 
            className="glass-card" 
            style={{ padding: '1.25rem', cursor: 'pointer' }}
            onClick={() => setActiveTab('input_data')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc' }}>
                <Baby size={20} />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Lahir</h4>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Input kelahiran anak/bayi baru.
            </p>
          </div>

          {/* 4. Meninggal */}
          <div 
            className="glass-card" 
            style={{ padding: '1.25rem', cursor: 'pointer' }}
            onClick={() => setActiveTab('input_data')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
                <UserMinus size={20} />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Meninggal</h4>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Input kematian &amp; update status dari BIP aktif.
            </p>
          </div>

          {/* 5. Disabilitas */}
          <div 
            className="glass-card" 
            style={{ padding: '1.25rem', cursor: 'pointer' }}
            onClick={() => setActiveTab('input_data')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}>
                <Accessibility size={20} />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Disabilitas</h4>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Input/update data ragam disabilitas warga.
            </p>
          </div>
        </div>
      </div>

      {/* BIP Databases Overview for Petugas */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <Database size={18} color="#3b82f6" /> Ringkasan Data 5 BIP Desa Abuan
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {BIP_LOCATIONS.map(bip => {
            const count = bipData[bip.name] ? bipData[bip.name].length : 0;
            return (
              <div key={bip.id} className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: bip.color }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{bip.name}</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {count} <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>jiwa</span>
                </div>
                <button 
                  style={{ border: 'none', background: 'transparent', color: 'var(--accent-primary)', fontSize: '0.78rem', cursor: 'pointer', padding: 0, marginTop: '0.5rem' }}
                  onClick={() => {
                    setSelectedBipName(bip.name);
                    setActiveTab('bip_databases');
                  }}
                >
                  Lihat Daftar Penduduk &rarr;
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
