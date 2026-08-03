import React, { useState } from 'react';
import { FileText, Search, Calendar, Eye, X, FileSpreadsheet, Filter, RotateCcw } from 'lucide-react';
import { RECAP_DATABASES, INPUT_CATEGORIES, BIP_LOCATIONS } from '../types/bipConstants';
import { exportRecapToExcel } from '../utils/excelExport';

export default function RecapDatabaseView({ recapData, selectedRecapId, setSelectedRecapId }) {
  const [activeRecapId, setActiveRecapId] = useState(selectedRecapId || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bipFilter, setBipFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [detailModalItem, setDetailModalItem] = useState(null);

  const allRecapList = Object.values(recapData).flat();
  const currentList = activeRecapId === 'all'
    ? allRecapList
    : (recapData[activeRecapId] || []);

  const currentRecapMeta = activeRecapId === 'all'
    ? { id: 'all', name: 'Semua Database Recap Transaksi', category: 'Semua Kategori' }
    : (RECAP_DATABASES.find(r => r.id === activeRecapId) || RECAP_DATABASES[0]);

  const categoryMeta = activeRecapId === 'all'
    ? {
      id: 'all',
      name: 'Semua Kategori',
      type: 'ALL',
      description: 'Menampilkan seluruh riwayat transaksi kependudukan (Lahir, Pindah, Meninggal, Disabilitas).',
      recapKey: 'all',
      badgeColor: 'badge-blue'
    }
    : (INPUT_CATEGORIES.find(c => c.recapKey === activeRecapId) || INPUT_CATEGORIES[0]);

  const isRemove = categoryMeta.type === 'REMOVE';

  // Multi-Criteria Filtering Logic for Recap
  const filteredList = currentList.filter(item => {
    // 1. Text Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesSearch = (
        (item.nama || '').toLowerCase().includes(term) ||
        (item.nik || '').includes(term) ||
        (item.no_kk || '').includes(term) ||
        (item.pekerjaan || '').toLowerCase().includes(term) ||
        (item.domisili || '').toLowerCase().includes(term) ||
        (item.kategori || '').toLowerCase().includes(term)
      );
      if (!matchesSearch) return false;
    }

    // 2. BIP Domisili Filter
    if (bipFilter && item.domisili !== bipFilter) {
      return false;
    }

    // 3. Start Date Filter
    if (startDate && item.tanggalTransaksi < startDate) {
      return false;
    }

    // 4. End Date Filter
    if (endDate && item.tanggalTransaksi > endDate) {
      return false;
    }

    return true;
  });

  const activeFiltersCount = [
    searchTerm,
    bipFilter,
    startDate,
    endDate
  ].filter(Boolean).length;

  const resetAllFilters = () => {
    setSearchTerm('');
    setBipFilter('');
    setStartDate('');
    setEndDate('');
  };

  // Export to Excel (.xlsx)
  const handleExportExcel = () => {
    exportRecapToExcel(filteredList, currentRecapMeta.name);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Database Recap (Catatan Rekapitulasi Transaksi)
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Catatan riwayat rekapitulasi setiap transaksi kependudukan (Anak Lahir, Pindah Datang, Pindah Masuk, Meninggal, Disabilitas).
        </p>
      </div>

      {/* Recap Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.625rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {/* All Recap Tab */}
        <button
          onClick={() => {
            setActiveRecapId('all');
            if (setSelectedRecapId) setSelectedRecapId('all');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1rem',
            borderRadius: '10px',
            border: activeRecapId === 'all' ? '2px solid #3b82f6' : '1px solid var(--border-color)',
            background: activeRecapId === 'all' ? 'var(--bg-card)' : 'transparent',
            color: activeRecapId === 'all' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: activeRecapId === 'all' ? '700' : '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            fontSize: '0.8125rem'
          }}
        >
          <FileText size={14} color="#3b82f6" />
          <span>Semua Data Recap</span>
          <span className="badge badge-blue">
            {allRecapList.length}
          </span>
        </button>

        {RECAP_DATABASES.map(db => {
          const isSelected = activeRecapId === db.id;
          const count = (recapData[db.id] || []).length;
          const cat = INPUT_CATEGORIES.find(c => c.recapKey === db.id);
          const isRemoveCat = cat?.type === 'REMOVE';

          return (
            <button
              key={db.id}
              onClick={() => {
                setActiveRecapId(db.id);
                if (setSelectedRecapId) setSelectedRecapId(db.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1rem',
                borderRadius: '10px',
                border: isSelected ? `2px solid ${isRemoveCat ? '#ef4444' : '#10b981'}` : '1px solid var(--border-color)',
                background: isSelected ? 'var(--bg-card)' : 'transparent',
                color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isSelected ? '700' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                fontSize: '0.8125rem'
              }}
            >
              <FileText size={14} color={isRemoveCat ? '#f87171' : '#34d399'} />
              <span>{db.name}</span>
              <span className={`badge ${cat?.badgeColor || 'badge-blue'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Recap Banner */}
      <div className="glass-panel" style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        borderLeft: `4px solid ${activeRecapId === 'all' ? '#3b82f6' : (isRemove ? '#ef4444' : '#10b981')}`
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className={`badge ${categoryMeta.badgeColor}`}>{categoryMeta.name}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: activeRecapId === 'all' ? '#3b82f6' : (isRemove ? '#ef4444' : '#10b981') }}>
              {activeRecapId === 'all' ? 'Seluruh Transaksi Kependudukan' : (isRemove ? 'Efek: Menghapus / Mengarsipkan Data dari BIP Active' : 'Efek: Menambah / Memperbarui Data di BIP')}
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            {currentRecapMeta.name}
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            {categoryMeta.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Total Transaksi Tercatat</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>{currentList.length}</span>
          </div>
          <button
            onClick={handleExportExcel}
            className="btn btn-primary"
            disabled={filteredList.length === 0}
          >
            <FileSpreadsheet size={16} />
            <span>Ekspor Excel (.xlsx) ({filteredList.length})</span>
          </button>
        </div>
      </div>

      {/* Filter Panel for Recap */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} color="#3b82f6" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
              Filter Rekapitulasi Transaksi
            </h3>
            {activeFiltersCount > 0 && (
              <span className="badge badge-blue">{activeFiltersCount} Filter Aktif</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Menampilkan <strong>{filteredList.length}</strong> dari <strong>{currentList.length}</strong> catatan
            </span>

            {activeFiltersCount > 0 && (
              <button
                className="btn btn-secondary"
                onClick={resetAllFilters}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
              >
                <RotateCcw size={14} /> Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari kata kunci NIK, Nama Penduduk, No KK, Pekerjaan, Domisili..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        {/* Multi Filter Inputs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.875rem'
        }}>
          {/* 1. BIP Domisili Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Wilayah BIP Domisili
            </label>
            <select
              className="form-input"
              value={bipFilter}
              onChange={(e) => setBipFilter(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.5rem' }}
            >
              <option value="">Semua Banjar / BIP</option>
              {BIP_LOCATIONS.map(b => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* 2. Start Date */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Dari Tanggal
            </label>
            <input
              type="date"
              className="form-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.5rem' }}
            />
          </div>

          {/* 3. End Date */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Sampai Tanggal
            </label>
            <input
              type="date"
              className="form-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.5rem' }}
            />
          </div>
        </div>
      </div>

      {/* Recap Table with full BIP Columns */}
      <div className="custom-table-container glass-panel">
        <table className="custom-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>TANGGAL</th>
              <th>KATEGORI</th>
              <th>BIP / BANJAR</th>
              <th>NO_KK</th>
              <th>NIK</th>
              <th>NAMA_LENGKAP</th>
              <th>L/P</th>
              <th>TMPT / TGL LAHIR</th>
              <th>USIA</th>
              <th>AGAMA</th>
              <th>PENDIDIKAN</th>
              <th>PEKERJAAN</th>
              <th>STATUS_KAWIN</th>
              <th>STATUS_HBKEL</th>
              <th>GOL_DARAH</th>
              <th>AYAH / IBU</th>
              <th>DISABILITAS</th>
              <th style={{ textAlign: 'center' }}>RINCIAN</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={19} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  Tidak ada rekapitulasi data yang sesuai dengan kriteria filter.
                </td>
              </tr>
            ) : (
              filteredList.map((row, idx) => (
                <tr key={row.id || idx}>
                  <td>{row.no || idx + 1}</td>
                  <td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} color="var(--text-muted)" />
                      <span>{row.tanggalTransaksi}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${INPUT_CATEGORIES.find(c => c.name === row.kategori)?.badgeColor || 'badge-blue'}`}>
                      {row.kategori}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-blue">{row.dusun || row.domisili}</span>
                  </td>
                  <td><code>{row.no_kk || '-'}</code></td>
                  <td><strong><code>{row.nik}</code></strong></td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.nama}</td>
                  <td>{row.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}</td>
                  <td>{row.tempatLahir ? `${row.tempatLahir}, ${row.tanggalLahir}` : row.tanggalLahir}</td>
                  <td><strong>{row.umur ? `${row.umur} Thn` : '-'}</strong></td>
                  <td>{row.agama || 'Hindu'}</td>
                  <td>{row.pendidikan || '-'}</td>
                  <td>{row.pekerjaan || '-'}</td>
                  <td>{row.statusKawin || '-'}</td>
                  <td>{row.statusHbkel || '-'}</td>
                  <td><span className="badge badge-blue">{row.golDarah || 'O'}</span></td>
                  <td>{row.namaAyah || '-'} / {row.namaIbu || '-'}</td>
                  <td>
                    {row.disabilitas && row.disabilitas !== 'Tidak Ada' ? (
                      <span className="badge badge-amber">{row.disabilitas}</span>
                    ) : (
                      <span style={{ opacity: 0.5 }}>-</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => setDetailModalItem(row)}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      <Eye size={14} color="#60a5fa" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* RECAP DETAIL MODAL */}
      {detailModalItem && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', padding: '1.75rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Rincian Log Rekapitulasi Data
              </h3>
              <button onClick={() => setDetailModalItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID Log Rekap</span>
                <p style={{ fontWeight: '700', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{detailModalItem.id}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Kategori Transaksi</span>
                <p style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{detailModalItem.kategori}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tanggal Transaksi</span>
                <p style={{ color: 'var(--text-secondary)' }}>{detailModalItem.tanggalTransaksi}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BIP Domisili Target</span>
                <p style={{ color: 'var(--accent-success)', fontWeight: '700' }}>{detailModalItem.domisili}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NR (Nomor Rumah)</span>
                <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{detailModalItem.nr || '-'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>N KK (Urutan KK)</span>
                <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{detailModalItem.n_kk || '-'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NO KK</span>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{detailModalItem.no_kk || '-'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NIK Penduduk</span>
                <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: '700' }}>{detailModalItem.nik}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nama Lengkap</span>
                <p style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{detailModalItem.nama}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Jenis Kelamin</span>
                <p style={{ color: 'var(--text-primary)' }}>{detailModalItem.jenisKelamin}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tempat / Tanggal Lahir</span>
                <p style={{ color: 'var(--text-primary)' }}>{detailModalItem.tempatLahir}, {detailModalItem.tanggalLahir}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>N AK (No. Akta Kelahiran)</span>
                <p style={{ color: 'var(--text-primary)' }}>{detailModalItem.n_ak || detailModalItem.noAktaLahir || '-'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pendidikan</span>
                <p style={{ color: 'var(--text-primary)' }}>{detailModalItem.pendidikan || '-'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pekerjaan</span>
                <p style={{ color: 'var(--text-primary)' }}>{detailModalItem.pekerjaan || '-'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status Kawin</span>
                <p style={{ color: 'var(--text-primary)' }}>{detailModalItem.statusKawin || '-'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status Hub. Keluarga</span>
                <p style={{ color: 'var(--text-primary)' }}>{detailModalItem.statusHbkel || '-'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Golongan Darah</span>
                <p style={{ color: 'var(--text-primary)' }}>{detailModalItem.golDarah || '-'}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Disabilitas</span>
                <p style={{ color: 'var(--text-primary)' }}>{detailModalItem.disabilitas || 'Tidak Ada'}</p>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button onClick={() => setDetailModalItem(null)} className="btn btn-secondary">
                Tutup Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

