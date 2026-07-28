import React, { useState } from 'react';
import { FileText, Search, Download, Calendar, Tag, Info, ArrowUpRight, ArrowDownRight, Eye, X } from 'lucide-react';
import { RECAP_DATABASES, INPUT_CATEGORIES } from '../types/bipConstants';

export default function RecapDatabaseView({ recapData, selectedRecapId, setSelectedRecapId }) {
  const [activeRecapId, setActiveRecapId] = useState(selectedRecapId || RECAP_DATABASES[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailModalItem, setDetailModalItem] = useState(null);

  const currentRecapMeta = RECAP_DATABASES.find(r => r.id === activeRecapId) || RECAP_DATABASES[0];
  const categoryMeta = INPUT_CATEGORIES.find(c => c.recapKey === activeRecapId) || INPUT_CATEGORIES[0];
  const isAdd = categoryMeta.type === 'ADD';

  const currentList = recapData[activeRecapId] || [];

  const filteredList = currentList.filter(item => {
    return (item.nama || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
           (item.nik || '').includes(searchTerm) ||
           (item.domisili || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
           (item.keterangan || '').toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredList.length === 0) return;
    const headers = ['ID Recap', 'Kategori', 'NIK', 'Nama Penduduk', 'Domisili (BIP)', 'Tanggal Transaksi', 'Keterangan'];
    const rows = filteredList.map(r => [
      r.id, `"${r.kategori}"`, r.nik, `"${r.nama}"`, `"${r.domisili}"`, r.tanggalTransaksi, `"${r.keterangan}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${currentRecapMeta.id}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
          7 Database Recap (Catatan Rekapitulasi Transaksi)
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
          Catatan riwayat rekapitulasi setiap transaksi kependudukan (Anak Lahir, Pindah, Meninggal, Umur, Pekerjaan, Pendidikan).
        </p>
      </div>

      {/* 7 Recap Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.625rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {RECAP_DATABASES.map(db => {
          const isSelected = activeRecapId === db.id;
          const count = (recapData[db.id] || []).length;
          const cat = INPUT_CATEGORIES.find(c => c.recapKey === db.id);
          const isAddCat = cat?.type === 'ADD';

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
                border: isSelected ? `2px solid ${isAddCat ? '#10b981' : '#ef4444'}` : '1px solid rgba(255, 255, 255, 0.1)',
                background: isSelected ? 'rgba(30, 41, 59, 0.9)' : 'rgba(30, 41, 59, 0.4)',
                color: isSelected ? '#ffffff' : '#94a3b8',
                fontWeight: isSelected ? '700' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                fontSize: '0.8125rem'
              }}
            >
              <FileText size={14} color={isAddCat ? '#34d399' : '#f87171'} />
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
        borderLeft: `4px solid ${isAdd ? '#10b981' : '#ef4444'}`
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className={`badge ${categoryMeta.badgeColor}`}>{categoryMeta.name}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isAdd ? '#34d399' : '#f87171' }}>
              {isAdd ? 'Efek: Menambah Data BIP' : 'Efek: Menghapus Data BIP (Non-Permanen)'}
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>
            {currentRecapMeta.name}
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
            {categoryMeta.description}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Total Transaksi Tercatat</span>
          <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff' }}>{currentList.length}</span>
        </div>
      </div>

      {/* Filter & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari transaksi berdasarkan NIK, Nama, Domisili, Keterangan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <button
          onClick={handleExportCSV}
          className="btn btn-secondary"
          disabled={filteredList.length === 0}
        >
          <Download size={16} />
          <span>Ekspor Recap CSV ({filteredList.length})</span>
        </button>
      </div>

      {/* Recap Table */}
      <div className="custom-table-container glass-panel">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Kategori</th>
              <th>NIK</th>
              <th>Nama Penduduk</th>
              <th>Wilayah Domisili (BIP)</th>
              <th>Keterangan Transaksi</th>
              <th style={{ textAlign: 'center' }}>Rincian</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                  Belum ada rekapitulasi data pada {currentRecapMeta.name}.
                </td>
              </tr>
            ) : (
              filteredList.map(row => (
                <tr key={row.id}>
                  <td style={{ fontSize: '0.8125rem', color: '#cbd5e1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} color="#94a3b8" />
                      <span>{row.tanggalTransaksi}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${categoryMeta.badgeColor}`}>
                      {row.kategori}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: '#93c5fd' }}>
                      {row.nik}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700', color: '#ffffff' }}>
                    {row.nama}
                  </td>
                  <td>
                    <span style={{ fontWeight: '600', color: '#34d399' }}>
                      {row.domisili}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8125rem', color: '#cbd5e1', maxWidth: '300px', whiteSpace: 'normal' }}>
                    {row.keterangan}
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
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '550px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>
                Rincian Log Rekapitulasi
              </h3>
              <button onClick={() => setDetailModalItem(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>ID Log Rekap</span>
                <p style={{ fontWeight: '700', color: '#93c5fd', fontFamily: 'var(--font-mono)' }}>{detailModalItem.id}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Kategori Transaksi</span>
                <p style={{ fontWeight: '700', color: '#ffffff' }}>{detailModalItem.kategori}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>NIK Penduduk</span>
                <p style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>{detailModalItem.nik}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Nama Penduduk</span>
                <p style={{ fontWeight: '700', color: '#ffffff' }}>{detailModalItem.nama}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>BIP Domisili Target</span>
                <p style={{ color: '#34d399', fontWeight: '700' }}>{detailModalItem.domisili}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Tanggal Transaksi</span>
                <p style={{ color: '#cbd5e1' }}>{detailModalItem.tanggalTransaksi}</p>
              </div>
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Keterangan / Catatan Kejadian</span>
              <p style={{ color: '#ffffff', fontWeight: '600', marginTop: '0.2rem' }}>{detailModalItem.keterangan}</p>
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
