import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Download, 
  Edit3, 
  Trash2, 
  Filter, 
  Eye, 
  RotateCcw,
  FileSpreadsheet
} from 'lucide-react';
import { 
  BIP_LOCATIONS, 
  AGE_GROUPS, 
  EDUCATION_LEVELS, 
  JOB_CATEGORIES, 
  DISABILITY_TYPES 
} from '../types/bipConstants';
import { deleteResidentRecord } from '../services/storageService';
import { exportResidentsToExcel } from '../utils/excelExport';

export default function BipDatabaseView({ 
  bipData, 
  selectedBipName, 
  setSelectedBipName, 
  onDataChanged,
  onEditResident,
  currentUserRole = 'user'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageGroupFilter, setAgeGroupFilter] = useState('');
  const [educationFilter, setEducationFilter] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [disabilityFilter, setDisabilityFilter] = useState('');
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState(null);

  // Calculate list based on location selection
  const allResidents = Object.values(bipData).flat();
  const currentList = selectedBipName === 'Semua BIP' 
    ? allResidents 
    : (bipData[selectedBipName] || []);

  // Multi-Category Filter Logic
  const filteredList = currentList.filter(item => {
    // 1. Search term match
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesSearch = (
        (item.nama && item.nama.toLowerCase().includes(term)) ||
        (item.nik && item.nik.toLowerCase().includes(term)) ||
        (item.no_kk && item.no_kk.toLowerCase().includes(term)) ||
        (item.pekerjaan && item.pekerjaan.toLowerCase().includes(term)) ||
        (item.alamat && item.alamat.toLowerCase().includes(term))
      );
      if (!matchesSearch) return false;
    }

    // 2. Kelompok Umur Filter
    if (ageGroupFilter) {
      const age = Number(item.umur) || 0;
      if (ageGroupFilter === 'Balita (0 - 5 Tahun)' && !(age >= 0 && age <= 5)) return false;
      if (ageGroupFilter === 'Anak-anak (6 - 12 Tahun)' && !(age >= 6 && age <= 12)) return false;
      if (ageGroupFilter === 'Remaja (13 - 17 Tahun)' && !(age >= 13 && age <= 17)) return false;
      if (ageGroupFilter === 'Dewasa Muda (18 - 35 Tahun)' && !(age >= 18 && age <= 35)) return false;
      if (ageGroupFilter === 'Dewasa (36 - 59 Tahun)' && !(age >= 36 && age <= 59)) return false;
      if (ageGroupFilter === 'Lansia (60+ Tahun)' && !(age >= 60)) return false;
    }

    // 3. Pendidikan Filter
    if (educationFilter && item.pendidikan !== educationFilter) {
      return false;
    }

    // 4. Pekerjaan Filter
    if (jobFilter && item.pekerjaan !== jobFilter) {
      return false;
    }

    // 5. Jenis Kelamin Filter
    if (genderFilter && item.jenisKelamin !== genderFilter) {
      return false;
    }

    // 6. Jenis Disabilitas Filter
    if (disabilityFilter) {
      if (disabilityFilter === 'Ada Disabilitas') {
        if (!item.disabilitas || item.disabilitas === 'Tidak Ada') return false;
      } else if (disabilityFilter === 'Tidak Ada') {
        if (item.disabilitas && item.disabilitas !== 'Tidak Ada') return false;
      } else if (item.disabilitas !== disabilityFilter) {
        return false;
      }
    }

    return true;
  });

  const activeFiltersCount = [
    ageGroupFilter,
    educationFilter,
    jobFilter,
    genderFilter,
    disabilityFilter,
    searchTerm
  ].filter(Boolean).length;

  const resetAllFilters = () => {
    setSearchTerm('');
    setAgeGroupFilter('');
    setEducationFilter('');
    setJobFilter('');
    setGenderFilter('');
    setDisabilityFilter('');
  };

  const handleDelete = (recordId, nama) => {
    if (currentUserRole !== 'admin') {
      alert('Hanya Admin yang berhak menghapus data dari BIP!');
      return;
    }
    if (window.confirm(`Apakah Anda yakin menghapus data "${nama}" dari database ${selectedBipName}?`)) {
      deleteResidentRecord(selectedBipName, recordId);
      if (onDataChanged) onDataChanged();
    }
  };

  const handleExportExcel = () => {
    exportResidentsToExcel(filteredList, selectedBipName);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Bar with BIP Location Tabs */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database size={22} color="#3b82f6" /> Master Data Buku Induk Penduduk (BIP)
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
              Menampilkan data penduduk terdaftar di 5 Dusun/BIP Desa Abuan (Format 26+ Kolom Excel).
            </p>
          </div>

          <button className="btn btn-primary" onClick={handleExportExcel} disabled={filteredList.length === 0}>
            <FileSpreadsheet size={18} /> Download Excel (.xlsx) ({filteredList.length})
          </button>
        </div>

        {/* Location Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem'
        }}>
          <button
            onClick={() => setSelectedBipName('Semua BIP')}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '10px',
              border: selectedBipName === 'Semua BIP' ? '1px solid #3b82f6' : '1px solid var(--border-color)',
              background: selectedBipName === 'Semua BIP' ? 'var(--bg-card)' : 'transparent',
              color: selectedBipName === 'Semua BIP' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: selectedBipName === 'Semua BIP' ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
            Semua BIP ({allResidents.length})
          </button>

          {BIP_LOCATIONS.map(bip => {
            const isSelected = selectedBipName === bip.name;
            const count = bipData[bip.name] ? bipData[bip.name].length : 0;
            return (
              <button
                key={bip.id}
                onClick={() => setSelectedBipName(bip.name)}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '10px',
                  border: isSelected ? `1px solid ${bip.color}` : '1px solid var(--border-color)',
                  background: isSelected ? 'var(--bg-card)' : 'transparent',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: bip.color }} />
                {bip.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} color="#3b82f6" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
              Filter Data Penduduk Multi-Kategori
            </h3>
            {activeFiltersCount > 0 && (
              <span className="badge badge-blue">{activeFiltersCount} Filter Aktif</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Menampilkan <strong>{filteredList.length}</strong> dari <strong>{currentList.length}</strong> data ({selectedBipName})
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

        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input"
            style={{ paddingLeft: '2.75rem' }}
            placeholder="Cari kata kunci NIK, Nama Penduduk, No KK, Pekerjaan, Alamat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 5 Filter Category Dropdowns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '0.875rem' 
        }}>
          {/* 1. Kelompok Umur */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Kelompok Umur
            </label>
            <select 
              className="form-input"
              value={ageGroupFilter}
              onChange={(e) => setAgeGroupFilter(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.5rem' }}
            >
              <option value="">Semua Kelompok Umur</option>
              {AGE_GROUPS.map(ag => (
                <option key={ag} value={ag}>{ag}</option>
              ))}
            </select>
          </div>

          {/* 2. Pendidikan */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Pendidikan
            </label>
            <select 
              className="form-input"
              value={educationFilter}
              onChange={(e) => setEducationFilter(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.5rem' }}
            >
              <option value="">Semua Pendidikan</option>
              {EDUCATION_LEVELS.map(ed => (
                <option key={ed} value={ed}>{ed}</option>
              ))}
            </select>
          </div>

          {/* 3. Pekerjaan */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Pekerjaan
            </label>
            <select 
              className="form-input"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.5rem' }}
            >
              <option value="">Semua Pekerjaan</option>
              {JOB_CATEGORIES.map(job => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
          </div>

          {/* 4. Jenis Kelamin */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Jenis Kelamin
            </label>
            <select 
              className="form-input"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.5rem' }}
            >
              <option value="">Semua Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* 5. Jenis Disabilitas */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Jenis Disabilitas
            </label>
            <select 
              className="form-input"
              value={disabilityFilter}
              onChange={(e) => setDisabilityFilter(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '0.5rem' }}
            >
              <option value="">Semua Status Disabilitas</option>
              <option value="Tidak Ada">Tidak Ada (Non-Disabilitas)</option>
              <option value="Ada Disabilitas">Ada Disabilitas (Semua Type)</option>
              {DISABILITY_TYPES.filter(d => d !== 'Lainnya').map(dis => (
                <option key={dis} value={dis}>{dis}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Data Table with Excel Columns */}
      <div className="glass-panel" style={{ padding: '1rem', overflow: 'hidden' }}>
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>NO</th>
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
                <th style={{ textAlign: 'right' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={17} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    Tidak ada data penduduk yang cocok dengan kriteria filter di {selectedBipName}.
                  </td>
                </tr>
              ) : (
                filteredList.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td>{item.no || idx + 1}</td>
                    <td><span className="badge badge-blue">{item.dusun || item.domisili || selectedBipName}</span></td>
                    <td><code>{item.no_kk}</code></td>
                    <td><strong><code>{item.nik}</code></strong></td>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.nama}</td>
                    <td>{item.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}</td>
                    <td>{item.tempatLahir}, {item.tanggalLahir}</td>
                    <td><strong>{item.umur} Thn</strong></td>
                    <td>{item.agama}</td>
                    <td>{item.pendidikan}</td>
                    <td>{item.pekerjaan}</td>
                    <td>{item.statusKawin}</td>
                    <td>{item.statusHbkel}</td>
                    <td><span className="badge badge-blue">{item.golDarah || 'O'}</span></td>
                    <td>{item.namaAyah} / {item.namaIbu}</td>
                    <td>
                      {item.disabilitas && item.disabilitas !== 'Tidak Ada' ? (
                        <span className="badge badge-amber">{item.disabilitas}</span>
                      ) : (
                        <span style={{ opacity: 0.5 }}>-</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button 
                          className="btn btn-secondary"
                          style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                          onClick={() => setSelectedRecordForDetail(item)}
                          title="Lihat Detail Lengkap 26 Kolom"
                        >
                          <Eye size={14} />
                        </button>

                        <button 
                          className="btn btn-success"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                          onClick={() => onEditResident(item)}
                          title="Update / Edit Data (Timpa Data)"
                        >
                          <Edit3 size={14} /> Update
                        </button>

                        {currentUserRole === 'admin' && (
                          <button 
                            className="btn btn-danger"
                            style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                            onClick={() => handleDelete(item.id, item.nama)}
                            title="Hapus Permanent (Admin)"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecordForDetail && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ maxWidth: '750px', width: '100%', maxHeight: '85vh', overflowY: 'auto', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                  Detail Lengkap Penduduk BIP: {selectedRecordForDetail.nama}
                </h3>
                <span className="badge badge-blue">{selectedRecordForDetail.domisili || selectedRecordForDetail.dusun}</span>
              </div>
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedRecordForDetail(null)}
              >
                Tutup
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
              <div><strong>NO Urut:</strong> {selectedRecordForDetail.no || '-'}</div>
              <div><strong>NR (Nomor Rumah):</strong> {selectedRecordForDetail.nr || '-'}</div>
              <div><strong>N KK (Urutan KK):</strong> {selectedRecordForDetail.n_kk || '-'}</div>
              <div><strong>N AK (No. Akta Kelahiran):</strong> {selectedRecordForDetail.n_ak || selectedRecordForDetail.noAktaLahir || '-'}</div>
              <div><strong>NO_KK:</strong> <code>{selectedRecordForDetail.no_kk}</code></div>
              <div><strong>NIK:</strong> <code>{selectedRecordForDetail.nik}</code></div>
              <div><strong>Jenis Kelamin:</strong> {selectedRecordForDetail.jenisKelamin}</div>
              <div><strong>Tempat / Tgl Lahir:</strong> {selectedRecordForDetail.tempatLahir}, {selectedRecordForDetail.tanggalLahir}</div>
              <div><strong>Usia:</strong> {selectedRecordForDetail.umur} Tahun</div>
              <div><strong>No Akta Lahir:</strong> {selectedRecordForDetail.noAktaLahir || '-'}</div>
              <div><strong>Agama:</strong> {selectedRecordForDetail.agama}</div>
              <div><strong>Pendidikan:</strong> {selectedRecordForDetail.pendidikan}</div>
              <div><strong>Pekerjaan:</strong> {selectedRecordForDetail.pekerjaan}</div>
              <div><strong>Status Kawin:</strong> {selectedRecordForDetail.statusKawin}</div>
              <div><strong>No Akta Kawin:</strong> {selectedRecordForDetail.noAktaKawin || '-'}</div>
              <div><strong>Status HBKEL:</strong> {selectedRecordForDetail.statusHbkel}</div>
              <div><strong>Golongan Darah:</strong> {selectedRecordForDetail.golDarah}</div>
              <div><strong>Nama Ayah:</strong> {selectedRecordForDetail.namaAyah}</div>
              <div><strong>Nama Ibu:</strong> {selectedRecordForDetail.namaIbu}</div>
              <div><strong>Kepala Keluarga:</strong> {selectedRecordForDetail.namaKepalaKeluarga}</div>
              <div style={{ gridColumn: 'span 2' }}><strong>Alamat:</strong> {selectedRecordForDetail.alamat}</div>
              <div><strong>Dusun:</strong> {selectedRecordForDetail.dusun || selectedRecordForDetail.domisili}</div>
              <div><strong>Desa/Kel:</strong> {selectedRecordForDetail.desaKel}</div>
              <div><strong>Kecamatan:</strong> {selectedRecordForDetail.kecamatan}</div>
              <div><strong>Disabilitas:</strong> {selectedRecordForDetail.disabilitas || 'Tidak Ada'}</div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                className="btn btn-success"
                onClick={() => {
                  const rec = selectedRecordForDetail;
                  setSelectedRecordForDetail(null);
                  onEditResident(rec);
                }}
              >
                <Edit3 size={16} /> Edit / Update Data Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

