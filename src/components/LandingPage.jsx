import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Database, 
  FileText, 
  Accessibility, 
  UserPlus, 
  UserMinus, 
  Baby, 
  Building2,
  CheckCircle2,
  LogIn
} from 'lucide-react';
import { BIP_LOCATIONS } from '../types/bipConstants';

export default function LandingPage({ onNavigateLogin }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      {/* Header Top Navigation */}
      <header style={{
        height: '76px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="/Logo Desa Abuan 2.svg" 
            alt="Logo Desa Abuan" 
            style={{ height: '46px', width: 'auto', filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.4))' }} 
          />
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', margin: 0 }}>
              BIP DESA ABUAN
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Sistem Pengelolaan Buku Induk Penduduk
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="btn btn-primary"
            onClick={onNavigateLogin}
            style={{ padding: '0.55rem 1.4rem' }}
          >
            <LogIn size={18} /> Masuk Sistem
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '4.5rem 2rem 3rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        textAlign: 'center'
      }}>
        <div className="badge badge-blue" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          ✨ Platform Administrasi Kependudukan Terpadu Desa Abuan
        </div>

        <h1 style={{
          fontSize: 'calc(2.2rem + 1.2vw)',
          fontWeight: 900,
          lineHeight: 1.2,
          marginBottom: '1.25rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Sistem Pengelolaan Data Penduduk <br />
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>5 Buku Induk Penduduk (BIP)</span>
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          maxWidth: '780px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.6
        }}>
          Aplikasi terintegrasi untuk pencatatan 5 jenis transaksi kependudukan (Pindah Datang, Pindah Masuk, Lahir, Meninggal, Disabilitas) dengan pembaruan data otomatis ke database BIP masing-masing banjar.
        </p>

        {/* Action Button Hero */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <button 
            className="btn btn-primary"
            onClick={onNavigateLogin}
            style={{ padding: '0.875rem 2.5rem', fontSize: '1rem', borderRadius: '12px' }}
          >
            Masuk Ke Portal Login <ArrowRight size={20} />
          </button>
        </div>

        {/* 5 Dusun BIP Badges Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '4rem'
        }}>
          {BIP_LOCATIONS.map(bip => (
            <div key={bip.id} className="glass-card" style={{ padding: '1.25rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: bip.color,
                  boxShadow: `0 0 10px ${bip.color}`
                }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{bip.name}</h3>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                Kode Wilayah: <strong>{bip.code}</strong>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Categories Feature Section */}
      <section style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              5 Fitur Utama Pencatatan Data
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Format data lengkap dengan 26+ kolom standar kependudukan dan opsi disabilitas.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Card 1: Pindah Datang */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34d399',
                marginBottom: '1rem'
              }}>
                <UserPlus size={26} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Pindah Datang</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Pencatatan penduduk baru yang pindah masuk dari luar wilayah kabupaten/provinsi ke dalam salah satu BIP Desa Abuan.
              </p>
            </div>

            {/* Card 2: Pindah Masuk */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60a5fa',
                marginBottom: '1rem'
              }}>
                <Building2 size={26} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>2. Pindah Masuk</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Pencatatan perpindahan penduduk antar banjar/dusun di lingkungan Desa Abuan atau registrasi mutasi lokal.
              </p>
            </div>

            {/* Card 3: Lahir */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(139, 92, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c084fc',
                marginBottom: '1rem'
              }}>
                <Baby size={26} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>3. Lahir</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Pencatatan kelahiran baru bayi/anak di keluarga penduduk Desa Abuan beserta No. Akta Lahir & data orang tua.
              </p>
            </div>

            {/* Card 4: Meninggal */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f87171',
                marginBottom: '1rem'
              }}>
                <UserMinus size={26} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>4. Meninggal</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Pencatatan kematian warga. Mengupdate status aktif dan memindahkan data ke database rekapitulasi kematian.
              </p>
            </div>

            {/* Card 5: Disabilitas */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fbbf24',
                marginBottom: '1rem'
              }}>
                <Accessibility size={26} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>5. Disabilitas</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Pencatatan khusus warga penyandang disabilitas dengan pilihan ragam disabilitas (Fisik, Netra, Rungu/Wicara, Intelektual, Mental, Ganda).
              </p>
            </div>

            {/* System Highlights */}
            <div className="glass-panel" style={{ padding: '1.75rem', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60a5fa',
                marginBottom: '1rem'
              }}>
                <Database size={26} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Update & Overwrite Data</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Setiap pembaruan data secara otomatis menggantikan (menimpa) data lama di database BIP masing-masing dan mencatat riwayat pembaruan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Roles Summary */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '2rem' }}>
          Hak Akses Sistem Dual Account
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <ShieldCheck size={28} color="#ef4444" />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Akun Admin</h3>
                <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>Full Control & Management</span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" /> Mengelola seluruh data di 5 Database BIP
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" /> <strong>Manajemen Akun User (Tambah, Edit, Hapus User)</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" /> Hapus permanen & Reset database ke data awal
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" /> Pengaturan Sinkronisasi Google Sheets
              </li>
            </ul>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <UserCheck size={28} color="#3b82f6" />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Akun User / Petugas</h3>
                <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>Operational & Input Only</span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" /> <strong>Menginput Data Kependudukan Baru (5 Kategori)</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" /> <strong>Meng-update data penduduk (Menimpa data lama di BIP)</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#10b981" /> Melihat rekapitulasi data & daftar penduduk
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="#64748b" /> <em>(Tidak dapat mengelola akun user / reset system)</em>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        padding: '1.5rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '0.8125rem',
        color: 'var(--text-muted)'
      }}>
        © 2026 Pemerintah Desa Abuan, Kecamatan Susut, Kabupaten Bangli, Bali. All rights reserved.
      </footer>
    </div>
  );
}
