import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Download, 
  Edit3, 
  Trash2, 
  Filter, 
  Eye, 
  ChevronRight,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { BIP_LOCATIONS } from '../types/bipConstants';
import { deleteResidentRecord } from '../services/storageService';

export default function BipDatabaseView({ 
  bipData, 
  selectedBipName, 
  setSelectedBipName, 
  onDataChanged,
  onEditResident,
  currentUserRole = 'user'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState(null);

  const currentList = bipData[selectedBipName] || [];

  const filteredList = currentList.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      (item.nama && item.nama.toLowerCase().includes(term)) ||
      (item.nik && item.nik.toLowerCase().includes(term)) ||
      (item.no_kk && item.no_kk.toLowerCase().includes(term)) ||
      (item.pekerjaan && item.pekerjaan.toLowerCase().includes(term))
    );
  });

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

  const exportToCSV = () => {
    if (filteredList.length === 0) return;
    
    const headers = [
      'NO', 'NR', 'N_KK', 'N_AK', 'NO_KK', 'NIK', 'NAMA_LENGKAP', 'JENIS_KELAMIN', 
      'TMPT_LHR', 'TGL_LHR', 'USIA', 'NO_AKTA_LHR', 'AGAMA', 'PENDIDIKAN', 'PEKERJAAN', 
      'STATUS_KAWIN', 'NO_AKTA_KWN', 'STATUS_HBKEL', 'GOL_DARAH', 'NAMA_LGKP_AYAH', 
      'NAMA_LGKP_IBU', 'NAMA_KEPALA_KELUARGA', 'ALAMAT', 'DUSUN', 'DESA_KEL', 'KECAMATAN', 'DISABILITAS'
    ];

    const csvRows = [];
    csvRows.push(headers.join(','));

    filteredList.forEach((row, idx) => {
      const values = [
        row.no || idx + 1,
        `"${row.nr || ''}"`,
        `"${row.n_kk || ''}"`,
        `"${row.n_ak || ''}"`,
        `"${row.no_kk || ''}"`,
        `"${row.nik || ''}"`,
        `"${row.nama || ''}"`,
        `"${row.jenisKelamin || ''}"`,
        `"${row.tempatLahir || ''}"`,
        `"${row.tanggalLahir || ''}"`,
        row.umur || 0,
        `"${row.noAktaLahir || ''}"`,
        `"${row.agama || ''}"`,
        `"${row.pendidikan || ''}"`,
        `"${row.pekerjaan || ''}"`,
        `"${row.statusKawin || ''}"`,
        `"${row.noAktaKawin || ''}"`,
        `"${row.statusHbkel || ''}"`,
        `"${row.golDarah || ''}"`,
        `"${row.namaAyah || ''}"`,
        `"${row.namaIbu || ''}"`,
        `"${row.namaKepalaKeluarga || ''}"`,
        `"${row.alamat || ''}"`,
        `"${row.dusun || ''}"`,
        `"${row.desaKel || ''}"`,
        `"${row.kecamatan || ''}"`,
        `"${row.disabilitas || 'Tidak Ada'}"`
      ];
      csvRows.push(values.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedBipName.replace(/\s+/g, '_')}_Data_Penduduk.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

          <button className="btn btn-secondary" onClick={exportToCSV}>
            <Download size={16} /> Export CSV Excel
          </button>
        </div>

        {/* Location Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem'
        }}>
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

      {/* Filter and Search controls */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input"
              style={{ paddingLeft: '2.75rem' }}
              placeholder="Cari berdasarkan NIK, Nama, No KK, Pekerjaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Menampilkan <strong>{filteredList.length}</strong> dari <strong>{currentList.length}</strong> data di {selectedBipName}
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
                <th>NR</th>
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
                    Tidak ada data penduduk ditemukan di {selectedBipName}.
                  </td>
                </tr>
              ) : (
                filteredList.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td>{item.no || idx + 1}</td>
                    <td><span className="badge badge-gray">{item.nr || '-'}</span></td>
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
                <span className="badge badge-blue">{selectedRecordForDetail.domisili}</span>
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
              <div><strong>N R (No Reg):</strong> {selectedRecordForDetail.nr || '-'}</div>
              <div><strong>N KK (Reg KK):</strong> {selectedRecordForDetail.n_kk || '-'}</div>
              <div><strong>N AK (Reg AK):</strong> {selectedRecordForDetail.n_ak || '-'}</div>
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
              <div><strong>Dusun:</strong> {selectedRecordForDetail.dusun}</div>
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
