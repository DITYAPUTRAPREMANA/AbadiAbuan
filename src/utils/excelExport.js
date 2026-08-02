import * as XLSX from 'xlsx';

/**
 * Utility to export Resident data to an Excel (.xlsx) file
 * @param {Array} residentList Array of resident data objects
 * @param {String} bipName Name of BIP or filter description
 */
export function exportResidentsToExcel(residentList, bipName = 'BIP_Abuan') {
  if (!residentList || residentList.length === 0) {
    alert('Tidak ada data untuk diekspor ke Excel.');
    return;
  }

  const exportData = residentList.map((row, idx) => ({
    'NO': row.no || idx + 1,
    'NR': row.nr || '',
    'N_KK': row.n_kk || '',
    'N_AK': row.n_ak || '',
    'NO_KK': row.no_kk || '',
    'NIK': row.nik || '',
    'NAMA_LENGKAP': row.nama || '',
    'JENIS_KELAMIN': row.jenisKelamin || '',
    'TMPT_LHR': row.tempatLahir || '',
    'TGL_LHR': row.tanggalLahir || '',
    'USIA': row.umur !== undefined && row.umur !== null ? row.umur : 0,
    'NO_AKTA_LHR': row.noAktaLahir || '',
    'AGAMA': row.agama || '',
    'PENDIDIKAN': row.pendidikan || '',
    'PEKERJAAN': row.pekerjaan || '',
    'STATUS_KAWIN': row.statusKawin || '',
    'NO_AKTA_KWN': row.noAktaKawin || '',
    'STATUS_HBKEL': row.statusHbkel || '',
    'GOL_DARAH': row.golDarah || '',
    'NAMA_LGKP_AYAH': row.namaAyah || '',
    'NAMA_LGKP_IBU': row.namaIbu || '',
    'NAMA_KEPALA_KELUARGA': row.namaKepalaKeluarga || '',
    'ALAMAT': row.alamat || '',
    'DUSUN_BIP': row.dusun || row.domisili || '',
    'DESA_KEL': row.desaKel || 'Abuan',
    'KECAMATAN': row.kecamatan || 'Susut',
    'DISABILITAS': row.disabilitas || 'Tidak Ada'
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Set column widths based on maximum length of header / values
  const colWidths = Object.keys(exportData[0]).map(key => {
    const maxLen = Math.max(
      key.length,
      ...exportData.map(row => String(row[key] || '').length)
    );
    return { wch: Math.min(Math.max(maxLen + 2, 10), 40) };
  });

  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Penduduk');

  const sanitizedName = bipName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${sanitizedName}_Filtered_${timestamp}.xlsx`;

  XLSX.writeFile(workbook, filename);
}

/**
 * Utility to export Recap Transactions data to an Excel (.xlsx) file
 * @param {Array} recapList Array of recap transaction objects
 * @param {String} recapTitle Name of recap category
 */
export function exportRecapToExcel(recapList, recapTitle = 'Recap_Transaksi') {
  if (!recapList || recapList.length === 0) {
    alert('Tidak ada data rekapitulasi untuk diekspor ke Excel.');
    return;
  }

  const exportData = recapList.map((row, idx) => ({
    'NO': idx + 1,
    'ID_RECAP': row.id || '',
    'KATEGORI': row.kategori || '',
    'NIK': row.nik || '',
    'NAMA_PENDUDUK': row.nama || '',
    'DOMISILI_BIP': row.domisili || '',
    'TANGGAL_TRANSAKSI': row.tanggalTransaksi || '',
    'KETERANGAN': row.keterangan || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  const colWidths = Object.keys(exportData[0]).map(key => {
    const maxLen = Math.max(
      key.length,
      ...exportData.map(row => String(row[key] || '').length)
    );
    return { wch: Math.min(Math.max(maxLen + 2, 12), 40) };
  });
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Recap Transaksi');

  const sanitizedName = recapTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${sanitizedName}_${timestamp}.xlsx`;

  XLSX.writeFile(workbook, filename);
}
