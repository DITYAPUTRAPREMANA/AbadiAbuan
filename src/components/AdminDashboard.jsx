import React, { useState } from 'react';
import {
  Users,
  ShieldAlert,
  UserPlus,
  RefreshCw,
  Database,
  FileSpreadsheet,
  Activity,
  Layers,
  ArrowRight,
  Sliders,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { BIP_LOCATIONS, RECAP_DATABASES } from '../types/bipConstants';
import { getSystemUsers } from '../services/authService';
import PopulationGrowthChartCard from './PopulationGrowthChartCard';

export default function AdminDashboard({
  bipData,
  recapData,
  setActiveTab,
  setSelectedBipName,
  setSelectedRecapId,
  onOpenUserManagement,
  onResetDatabase
}) {
  const users = getSystemUsers();

  const calculateTotalPopulation = () => {
    return Object.values(bipData).reduce((acc, curr) => acc + (curr ? curr.length : 0), 0);
  };

  const calculateTotalRecapTransactions = () => {
    return Object.values(recapData).reduce((acc, curr) => acc + (curr ? curr.length : 0), 0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner Notice */}
      <div className="glass-panel" style={{
        padding: '1.25rem 1.5rem',
        borderLeft: '5px solid #ef4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Dashboard Pengawasan Administrator
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
              Anda memiliki akses penuh untuk mengelola data BIP, rekapitulasi, dan manajemen akun petugas/user.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-danger" onClick={onOpenUserManagement}>
            <Users size={16} /> Kelola Akun User ({users.length})
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* Total Penduduk */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              TOTAL PENDUDUK BIP
            </span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {calculateTotalPopulation()} <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>jiwa</span>
          </div>
          <span className="badge badge-blue" style={{ marginTop: '0.5rem' }}>5 Banjar / BIP Active</span>
        </div>

        {/* Total Akun User */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              AKUN TERDAFTAR
            </span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {users.length} <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>petugas</span>
          </div>
          <button
            style={{ border: 'none', background: 'transparent', color: 'var(--accent-primary)', fontSize: '0.78rem', cursor: 'pointer', padding: 0, marginTop: '0.5rem' }}
            onClick={onOpenUserManagement}
          >
            Atur Akses &amp; Role &rarr;
          </button>
        </div>

        {/* Total Transaksi Kependudukan */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              TOTAL REKAP TRANSAKSI
            </span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
              <Activity size={18} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {calculateTotalRecapTransactions()} <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>catatan</span>
          </div>
          <span className="badge badge-green" style={{ marginTop: '0.5rem' }}>5 Kategori Terintegrasi</span>
        </div>

        {/* Sync Status */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              SINKRONISASI SHEETS
            </span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}>
              <FileSpreadsheet size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            Google Apps Script
          </div>
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', marginTop: '0.5rem' }}
            onClick={() => setActiveTab('spreadsheet_sync')}
          >
            Pengaturan Sync &rarr;
          </button>
        </div>
      </div>

      {/* Population Growth Chart Card with BIP Selector */}
      <PopulationGrowthChartCard bipData={bipData} recapData={recapData} />

      {/* Main Content Layout: BIP Breakdown & Quick Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* BIP Banjar Databases Overview */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <Database size={18} color="#3b82f6" /> 5 Database Buku Induk Penduduk (BIP)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {BIP_LOCATIONS.map(bip => {
              const count = bipData[bip.name] ? bipData[bip.name].length : 0;
              return (
                <div key={bip.id} className="glass-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: bip.color,
                      boxShadow: `0 0 8px ${bip.color}`
                    }} />
                    <div>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{bip.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Kode: {bip.code}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {count} <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>jiwa</span>
                    </span>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                      onClick={() => {
                        setSelectedBipName(bip.name);
                        setActiveTab('bip_databases');
                      }}
                    >
                      Buka BIP &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Admin Maintenance & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Actions Panel */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <Sliders size={18} color="#ef4444" /> Aksi Cepat Administrator
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                className="btn btn-primary"
                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                onClick={() => setActiveTab('input_data')}
              >
                <UserPlus size={18} /> Input Data Kependudukan Baru (5 Kategori)
              </button>

              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                onClick={onOpenUserManagement}
              >
                <Users size={18} color="#ef4444" /> Kelola / Tambah Akun User &amp; Role
              </button>

              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                onClick={() => setActiveTab('bip_databases')}
              >
                <Database size={18} color="#3b82f6" /> Lihat &amp; Edit Seluruh Master Database BIP
              </button>

              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                onClick={() => setActiveTab('spreadsheet_sync')}
              >
                <FileSpreadsheet size={18} color="#10b981" /> Konfigurasi Google Sheets Auto Sync
              </button>
            </div>
          </div>

          {/* System Reset Danger Zone */}
          <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <AlertTriangle size={18} color="#ef4444" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f87171', margin: 0 }}>
                Pemulihan / Reset Seed Database
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Kembalikan seluruh database BIP ke data seed standar awal. Gunakan jika memerlukan data percontohan bersih.
            </p>
            <button
              className="btn btn-danger"
              style={{ width: '100%', fontSize: '0.8125rem' }}
              onClick={onResetDatabase}
            >
              <RefreshCw size={16} /> Reset Ke Data Awal (Seed)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
