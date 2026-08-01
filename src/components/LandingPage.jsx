import React from 'react';
import {
  Users,
  ArrowRight,
  Database,
  FileText,
  Accessibility,
  UserPlus,
  UserMinus,
  Baby,
  Building2,
  CheckCircle2,
  LogIn,
  GraduationCap,
  Sparkles,
  BookmarkCheck,
  Sun,
  Moon
} from 'lucide-react';
import { BIP_LOCATIONS } from '../types/bipConstants';

export default function LandingPage({ onNavigateLogin, theme = 'dark', toggleTheme }) {
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
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              BIP DESA ABUAN
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Sistem Pengelolaan Buku Induk Penduduk
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Light / Dark Mode Toggle Button */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="btn btn-secondary"
              style={{ padding: '0.5rem 0.85rem', borderRadius: '10px' }}
              title={theme === 'dark' ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun size={18} color="#fbbf24" />
              ) : (
                <Moon size={18} color="#6366f1" />
              )}
              <span className="desktop-only" style={{ fontSize: '0.8125rem' }}>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          )}

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
        padding: '5rem 2rem 3rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Acronym Badge Pill */}
        <div className="badge badge-blue" style={{
          padding: '0.55rem 1.35rem',
          fontSize: '0.875rem',
          marginBottom: '1.75rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 800,
          letterSpacing: '0.02em',
          boxShadow: '0 4px 16px rgba(59, 130, 246, 0.25)'
        }}>
          <BookmarkCheck size={18} color="#60a5fa" />
          ABADI ABUAN &bull; Aplikasi Buku Induk Data & Informasi Desa Abuan
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: 'calc(2.5rem + 1.4vw)',
          fontWeight: 900,
          lineHeight: 1.15,
          marginBottom: '1.25rem'
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>ABADI ABUAN</span>
          <br />
          <span style={{ fontSize: '60%', fontWeight: 800, color: 'var(--text-primary)' }}>
            Digitalisasi Terpadu Data Kependudukan Desa Abuan, Susut, Bangli
          </span>
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          maxWidth: '840px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.6
        }}>
          Inovasi platform kependudukan modern untuk memudahkan kinerja pengurus Desa Abuan dalam pengelolaan 5 Buku Induk Penduduk (BIP), pencatatan mutasi warga, serta penyajian rekap data yang otomatis, akurat, dan transparan.
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
          marginBottom: '3rem'
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
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{bip.name}</h3>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                Kode Wilayah: <strong>{bip.code}</strong>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Section: Memudahkan Kinerja Pengurus Desa */}
      <section style={{
        padding: '3.5rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div className="glass-panel" style={{
          padding: '2.5rem 2rem',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Sparkles size={24} color="#3b82f6" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Dirancang Khusus Untuk Pengurus Desa Abuan
            </h2>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Web Apps kependudukan ini hadir sebagai bentuk kontribusi nyata Mahasiswa KKN PPM Desa Abuan Periode XXXIII Universitas Udayana dalam mendukung digitalisasi pelayanan publik. Sistem ini membantu perangkat desa dalam:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.9375rem' }}>Pencatatan Cepat & Terstruktur</strong>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                  Mempercepat proses penginputan dan pembaruan data warga di 5 Buku Induk Penduduk (BIP).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.9375rem' }}>Pembaruan Data Otomatis (Overwrite)</strong>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                  Sistem otomatis menimpa data lama sehingga informasi kependudukan selalu terbaru dan valid.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.9375rem' }}>Rekapitulasi 5 Kategori Lengkap</strong>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0' }}>
                  Otomatis mengelompokkan laporan Pindah Datang, Pindah Masuk, Lahir, Meninggal, dan Disabilitas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Categories Feature Section */}
      <section style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>1. Pindah Datang</h3>
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>2. Pindah Masuk</h3>
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>3. Lahir</h3>
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>4. Meninggal</h3>
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>5. Disabilitas</h3>
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Update & Overwrite Data</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Setiap pembaruan data secara otomatis menggantikan (menimpa) data lama di database BIP masing-masing dan mencatat riwayat pembaruan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          <GraduationCap size={18} color="#60a5fa" />
          Dibuat Oleh Mahasiswa KKN PPM Desa Abuan, Susut, Bangli Periode XXXIII Universitas Udayana
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
          © 2026 Pemerintah Desa Abuan, Kecamatan Susut, Kabupaten Bangli, Bali. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
