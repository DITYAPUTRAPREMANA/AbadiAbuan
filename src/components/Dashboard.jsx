import React from 'react';
import { Users, UserPlus, UserMinus, Heart, Home, ArrowUpRight, ArrowDownRight, Layers, Database, Sparkles, AlertCircle } from 'lucide-react';
import { BIP_LOCATIONS, INPUT_CATEGORIES } from '../types/bipConstants';

export default function Dashboard({ bipData, recapData, setActiveTab, setSelectedBipName, setSelectedRecapId, onOpenFlowchart }) {
  // Calculate Totals
  let totalActivePopulation = 0;
  const bipCounts = {};
  
  BIP_LOCATIONS.forEach(bip => {
    const list = bipData[bip.name] || [];
    bipCounts[bip.name] = list.filter(r => r.status === 'Aktif').length;
    totalActivePopulation += bipCounts[bip.name];
  });

  const totalAnakLahir = (recapData['recap_anak_lahir'] || []).length;
  const totalPindahDatang = (recapData['recap_pindah_datang'] || []).length;
  const totalPindahKeluar = (recapData['recap_pindah_keluar'] || []).length;
  const totalMeninggal = (recapData['recap_meninggal'] || []).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Welcome Banner */}
      <div className="glass-panel" style={{
        padding: '1.75rem',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              <Sparkles size={14} /> Sistem Kependudukan Terintegrasi
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#ffffff' }}>
              Selamat Datang di Sistem Pencatatan BIP
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9375rem', maxWidth: '650px', marginTop: '0.25rem' }}>
              Pengelolaan data induk penduduk otomatis 5 Wilayah (BIP Sala, Abuan Kangin, Abuan Kauh, Serokadan, Serokadan Kaja) dan 7 Database Recap Transaksi.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('input_data')}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.25rem' }}
            >
              <UserPlus size={18} />
              <span>Input Data Baru</span>
            </button>
            <button
              onClick={onOpenFlowchart}
              className="btn btn-secondary"
              style={{ padding: '0.75rem 1.25rem' }}
            >
              <Layers size={18} />
              <span>Lihat Flowchart</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {/* Total Active Population */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#94a3b8' }}>Total Penduduk Aktif</span>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>
              <Users size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.03em' }}>
            {totalActivePopulation.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
            <ArrowUpRight size={14} /> Tersebar di 5 Database BIP
          </span>
        </div>

        {/* Total Births */}
        <div className="glass-card" style={{ padding: '1.25rem', cursor: 'pointer' }} onClick={() => { setSelectedRecapId('recap_anak_lahir'); setActiveTab('recap_databases'); }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#94a3b8' }}>Recap Anak Lahir</span>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
              <UserPlus size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.03em' }}>
            {totalAnakLahir}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
            <ArrowUpRight size={14} /> Penambahan Data
          </span>
        </div>

        {/* Total Incoming Moves */}
        <div className="glass-card" style={{ padding: '1.25rem', cursor: 'pointer' }} onClick={() => { setSelectedRecapId('recap_pindah_datang'); setActiveTab('recap_databases'); }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#94a3b8' }}>Recap Pindah Datang</span>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc' }}>
              <Home size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.03em' }}>
            {totalPindahDatang}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
            <ArrowUpRight size={14} /> Penambahan Data
          </span>
        </div>

        {/* Total Outgoing / Deceased */}
        <div className="glass-card" style={{ padding: '1.25rem', cursor: 'pointer' }} onClick={() => { setSelectedRecapId('recap_pindah_keluar'); setActiveTab('recap_databases'); }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#94a3b8' }}>Pengurangan (Keluar/Meninggal)</span>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
              <UserMinus size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.03em' }}>
            {totalPindahKeluar + totalMeninggal}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
            <ArrowDownRight size={14} /> Non-Permanen Recap
          </span>
        </div>
      </div>

      {/* 5 BIP Main Databases Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#ffffff' }}>
              5 Database Utama (BIP Per Wilayah)
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
              Menyimpan data induk penduduk aktif berdasarkan tempat tinggal/domisili.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('bip_databases')}
            className="btn btn-secondary"
            style={{ fontSize: '0.8125rem', padding: '0.4rem 0.875rem' }}
          >
            Lihat Semua BIP
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
          {BIP_LOCATIONS.map(bip => {
            const count = bipCounts[bip.name] || 0;
            const percentage = totalActivePopulation > 0 ? Math.round((count / totalActivePopulation) * 100) : 0;

            return (
              <div
                key={bip.id}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  borderTop: `3px solid ${bip.color}`,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSelectedBipName(bip.name);
                  setActiveTab('bip_databases');
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: bip.color, background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {bip.code}
                  </span>
                  <Database size={16} color={bip.color} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.25rem' }}>
                  {bip.name}
                </h4>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f8fafc', margin: '0.5rem 0' }}>
                  {count} <span style={{ fontSize: '0.8125rem', fontWeight: '500', color: '#94a3b8' }}>Penduduk</span>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: bip.color, borderRadius: '3px' }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.375rem', textAlign: 'right' }}>
                  {percentage}% dari total
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7 Recap Categories Logic Summary */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="#3b82f6" /> 7 Database Recap (Rekapitulasi Kategori Transaksi)
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Setiap jenis transaksi otomatis mencatat riwayat ke salah satu dari 7 database recap berikut:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {INPUT_CATEGORIES.map(cat => {
            const count = (recapData[cat.recapKey] || []).length;
            const isAdd = cat.type === 'ADD';

            return (
              <div
                key={cat.id}
                className="glass-card"
                style={{
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSelectedRecapId(cat.recapKey);
                  setActiveTab('recap_databases');
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span className={`badge ${cat.badgeColor}`}>{cat.name}</span>
                    <span style={{ fontSize: '0.7rem', color: isAdd ? '#34d399' : '#f87171', fontWeight: '600' }}>
                      {isAdd ? '+ Tambah BIP' : '- Hapus BIP'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {cat.description}
                  </p>
                </div>
                <div style={{ textAlign: 'right', minWidth: '60px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>
                    {count}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>
                    catatan
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
