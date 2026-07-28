import React, { useState } from 'react';
import { Database, Search, Filter, Download, UserCheck, Trash2, Edit3, Eye, UserX, AlertTriangle, X } from 'lucide-react';
import { BIP_LOCATIONS, INPUT_CATEGORIES } from '../types/bipConstants';
import { processPopulationTransaction } from '../services/storageService';

export default function BipDatabaseView({ bipData, selectedBipName, setSelectedBipName, onDataChanged }) {
  const [activeBip, setActiveBip] = useState(selectedBipName || BIP_LOCATIONS[0].name);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('ALL');

  // Modal States
  const [detailItem, setDetailItem] = useState(null);
  const [deleteModalItem, setDeleteModalItem] = useState(null);
  const [deleteReasonCategory, setDeleteReasonCategory] = useState('Pindah Keluar');
  const [deleteKeterangan, setDeleteKeterangan] = useState('');

  const currentBipMeta = BIP_LOCATIONS.find(b => b.name === activeBip) || BIP_LOCATIONS[0];
  const currentList = bipData[activeBip] || [];

  // Filtered List
  const filteredList = currentList.filter(item => {
    const matchesSearch = (item.nama || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.nik || '').includes(searchTerm) ||
      (item.pekerjaan || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.pendidikan || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender = genderFilter === 'ALL' || item.jenisKelamin === genderFilter;

    return matchesSearch && matchesGender;
  });

  const totalActive = currentList.filter(r => r.status === 'Aktif').length;
  const totalLaki = currentList.filter(r => r.jenisKelamin === 'Laki-laki').length;
  const totalPerempuan = currentList.filter(r => r.jenisKelamin === 'Perempuan').length;

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredList.length === 0) return;
    const headers = ['ID', 'NIK', 'Nama', 'Jenis Kelamin', 'Tempat Lahir', 'Tanggal Lahir', 'Umur', 'Kelompok Umur', 'Pekerjaan', 'Pendidikan', 'Domisili', 'Alamat', 'Tanggal Masuk', 'Status'];
    const rows = filteredList.map(r => [
      r.id, r.nik, `"${r.nama}"`, r.jenisKelamin, r.tempatLahir, r.tanggalLahir, r.umur, `"${r.kelompokUmur}"`, `"${r.pekerjaan}"`, `"${r.pendidikan}"`, `"${r.domisili}"`, `"${r.alamat}"`, r.tanggalMasuk, r.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Database_${activeBip.replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Administrative Removal Handler (Pindah Keluar / Meninggal)
  const handleConfirmAdministrativeDelete = () => {
    if (!deleteModalItem) return;

    processPopulationTransaction({
      kategori: deleteReasonCategory,
      domisili: activeBip,
      nik: deleteModalItem.nik,
      nama: deleteModalItem.nama,
      jenisKelamin: deleteModalItem.jenisKelamin,
      tempatLahir: deleteModalItem.tempatLahir,
      tanggalLahir: deleteModalItem.tanggalLahir,
      pekerjaan: deleteModalItem.pekerjaan,
      pendidikan: deleteModalItem.pendidikan,
      alamat: deleteModalItem.alamat,
      keterangan: deleteKeterangan || `Pengurangan administratif (${deleteReasonCategory})`,
      tanggalTransaksi: new Date().toISOString().split('T')[0]
    });

    setDeleteModalItem(null);
    setDeleteKeterangan('');
    if (onDataChanged) onDataChanged();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Title & Tabs */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
          5 Database Utama (Buku Induk Penduduk)
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
          Pilih salah satu tab database wilayah di bawah ini untuk melihat dan mengelola data induk penduduk aktif.
        </p>
      </div>

      {/* 5 BIP Location Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {BIP_LOCATIONS.map(bip => {
          const isSelected = activeBip === bip.name;
          const count = (bipData[bip.name] || []).length;

          return (
            <button
              key={bip.id}
              onClick={() => {
                setActiveBip(bip.name);
                if (setSelectedBipName) setSelectedBipName(bip.name);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '12px',
                border: isSelected ? `2px solid ${bip.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                background: isSelected ? 'rgba(30, 41, 59, 0.9)' : 'rgba(30, 41, 59, 0.4)',
                color: isSelected ? '#ffffff' : '#94a3b8',
                fontWeight: isSelected ? '700' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Database size={16} color={bip.color} />
              <span>{bip.name}</span>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
                background: isSelected ? bip.color : 'rgba(255, 255, 255, 0.1)',
                color: isSelected ? '#ffffff' : '#94a3b8',
                fontWeight: '700'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active BIP Stats Banner */}
      <div className="glass-panel" style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        borderLeft: `4px solid ${currentBipMeta.color}`
      }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>
            {activeBip}
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
            Domisili Wilayah Kode: <strong style={{ color: currentBipMeta.color }}>{currentBipMeta.code}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Penduduk Aktif</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>{totalActive}</span>
          </div>
          <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Laki-laki</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#60a5fa' }}>{totalLaki}</span>
          </div>
          <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Perempuan</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f472b6' }}>{totalPerempuan}</span>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Cari NIK, Nama, Pekerjaan, Pendidikan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* Gender Filter */}
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="form-select"
            style={{ width: '160px' }}
          >
            <option value="ALL">Semua Gender</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExportCSV}
          className="btn btn-secondary"
          disabled={filteredList.length === 0}
        >
          <Download size={16} />
          <span>Ekspor CSV ({filteredList.length})</span>
        </button>
      </div>

      {/* Table Data Viewer */}
      <div className="custom-table-container glass-panel">
        <table className="custom-table">
          <thead>
            <tr>
              <th>NIK</th>
              <th>Nama Lengkap</th>
              <th>Gender</th>
              <th>Umur / Kelompok</th>
              <th>Pekerjaan</th>
              <th>Pendidikan</th>
              <th>Alamat</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                  Tidak ada data penduduk yang ditemukan pada database {activeBip}.
                </td>
              </tr>
            ) : (
              filteredList.map(row => (
                <tr key={row.id}>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: '#93c5fd' }}>
                      {row.nik}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700', color: '#ffffff' }}>
                    {row.nama}
                  </td>
                  <td>
                    <span className={row.jenisKelamin === 'Laki-laki' ? 'badge badge-blue' : 'badge badge-purple'}>
                      {row.jenisKelamin}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: '600' }}>{row.umur} Thn</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>
                      {row.kelompokUmur}
                    </span>
                  </td>
                  <td style={{ color: '#cbd5e1' }}>{row.pekerjaan}</td>
                  <td style={{ color: '#cbd5e1' }}>{row.pendidikan}</td>
                  <td style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{row.alamat}</td>
                  <td>
                    <span className="badge badge-green">
                      <UserCheck size={12} /> {row.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => setDetailItem(row)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                        title="Lihat Rincian Detail"
                      >
                        <Eye size={14} color="#60a5fa" />
                      </button>

                      <button
                        onClick={() => setDeleteModalItem(row)}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                        title="Proses Pengurangan (Pindah Keluar / Meninggal)"
                      >
                        <UserX size={14} color="#f87171" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL */}
      {detailItem && (
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
                Rincian Detail Penduduk
              </h3>
              <button onClick={() => setDetailItem(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>NIK</span>
                <p style={{ fontWeight: '700', color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>{detailItem.nik}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Nama Lengkap</span>
                <p style={{ fontWeight: '700', color: '#ffffff' }}>{detailItem.nama}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Jenis Kelamin</span>
                <p style={{ color: '#cbd5e1' }}>{detailItem.jenisKelamin}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Tempat, Tanggal Lahir</span>
                <p style={{ color: '#cbd5e1' }}>{detailItem.tempatLahir}, {detailItem.tanggalLahir}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Umur & Kelompok</span>
                <p style={{ color: '#cbd5e1' }}>{detailItem.umur} Tahun ({detailItem.kelompokUmur})</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Kelompok Pekerjaan</span>
                <p style={{ color: '#cbd5e1' }}>{detailItem.pekerjaan}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Kelompok Pendidikan</span>
                <p style={{ color: '#cbd5e1' }}>{detailItem.pendidikan}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Database Domisili</span>
                <p style={{ color: '#34d399', fontWeight: '700' }}>{detailItem.domisili}</p>
              </div>
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Alamat Lengkap</span>
              <p style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>{detailItem.alamat}</p>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button onClick={() => setDetailItem(null)} className="btn btn-secondary">
                Tutup Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMINISTRATIVE DELETE MODAL */}
      {deleteModalItem && (
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
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '1.75rem', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#f87171' }}>
              <AlertTriangle size={24} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>
                Pengurangan Data Administrative
              </h3>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '1rem' }}>
              Sesuai logika sistem, menghapus data dari <strong>{activeBip}</strong> untuk penduduk <strong>"{deleteModalItem.nama}"</strong> bersifat <u>non-permanen</u>. Data akan dipindahkan ke Database Recap.
            </p>

            <div className="form-group">
              <label className="form-label">Pilih Kategori Pengurangan</label>
              <select
                value={deleteReasonCategory}
                onChange={(e) => setDeleteReasonCategory(e.target.value)}
                className="form-select"
              >
                <option value="Pindah Keluar">Pindah Keluar (Pindah ke wilayah luar)</option>
                <option value="Meninggal">Meninggal (Penduduk Meninggal Dunia)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Alasan / Catatan Rekapitulasi</label>
              <input
                type="text"
                placeholder="Contoh: Pindah ke Kabupaten Badung / Meninggal di RSUD"
                value={deleteKeterangan}
                onChange={(e) => setDeleteKeterangan(e.target.value)}
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button onClick={() => setDeleteModalItem(null)} className="btn btn-secondary">
                Batal
              </button>
              <button onClick={handleConfirmAdministrativeDelete} className="btn btn-danger">
                Konfirmasi Pindahkan ke Recap
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
