import React from 'react';
import { Layers, ArrowDown, ArrowRight, CheckCircle2, XCircle, Database, FileSpreadsheet, X, HelpCircle } from 'lucide-react';
import { BIP_LOCATIONS, INPUT_CATEGORIES } from '../types/bipConstants';

export default function FlowchartModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 60,
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontSize: '0.75rem', fontWeight: '700' }}>
              <Layers size={14} /> DOKUMENTASI RESMI DARI PDF
            </div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: '800', color: '#ffffff' }}>
              Flowchart & Logika Sistem Pencatatan BIP
            </h2>
          </div>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Visual Diagram Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          {/* Start Box */}
          <div style={{
            padding: '0.625rem 2rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '2px solid #3b82f6',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '0.9375rem',
            letterSpacing: '0.05em'
          }}>
            MULAI
          </div>

          <ArrowDown size={20} color="#3b82f6" />

          {/* User Input Step */}
          <div className="glass-card" style={{ width: '100%', padding: '1rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <span style={{ fontWeight: '700', color: '#60a5fa' }}>User Melakukan Input Data</span>
          </div>

          <ArrowDown size={20} color="#3b82f6" />

          {/* 7 Categories Banner */}
          <div style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#cbd5e1', display: 'block', marginBottom: '0.5rem' }}>
              Sistem Menampilkan 7 Opsi Kategori Pencatatan:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', fontSize: '0.75rem' }}>
              <span className="badge badge-blue">1. Anak Lahir</span>
              <span className="badge badge-red">2. Pindah Keluar</span>
              <span className="badge badge-green">3. Pindah Datang</span>
              <span className="badge badge-gray">4. Meninggal</span>
              <span className="badge badge-purple">5. Kelompok Umur</span>
              <span className="badge badge-amber">6. Kelompok Pekerjaan</span>
              <span className="badge badge-cyan">7. Kelompok Pendidikan</span>
            </div>
          </div>

          <ArrowDown size={20} color="#3b82f6" />

          {/* User Chooses Category */}
          <div className="glass-card" style={{ width: '100%', padding: '0.875rem', textAlign: 'center' }}>
            <span style={{ fontWeight: '700', color: '#ffffff' }}>User Memilih Salah Satu Kategori dan Mengisi Data</span>
          </div>

          <ArrowDown size={20} color="#3b82f6" />

          {/* Dual Decision Branches */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', width: '100%' }}>
            {/* Branch 1: Penambahan */}
            <div style={{
              padding: '1.25rem',
              borderRadius: '14px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ fontWeight: '800', color: '#34d399', fontSize: '0.9375rem', textAlign: 'center' }}>
                Kategori Penambahan Data (5 jenis)
              </div>
              <p style={{ fontSize: '0.75rem', color: '#cbd5e1', textAlign: 'center' }}>
                Anak Lahir, Pindah Datang, Kelompok Umur, Kelompok Pekerjaan, Kelompok Pendidikan
              </p>
              <ArrowDown size={16} color="#34d399" style={{ margin: '0 auto' }} />
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.6)', fontSize: '0.75rem', textAlign: 'center', color: '#ffffff', fontWeight: '600' }}>
                Sistem Menentukan Database Utama Sesuai Domisili User
              </div>
              <ArrowDown size={16} color="#34d399" style={{ margin: '0 auto' }} />
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.2)', fontSize: '0.8125rem', textAlign: 'center', color: '#34d399', fontWeight: '700' }}>
                Data DITAMBAHKAN ke salah satu dari 5 Database Utama (BIP)
              </div>
            </div>

            {/* Branch 2: Pengurangan */}
            <div style={{
              padding: '1.25rem',
              borderRadius: '14px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ fontWeight: '800', color: '#f87171', fontSize: '0.9375rem', textAlign: 'center' }}>
                Kategori Pengurangan Data (2 jenis)
              </div>
              <p style={{ fontSize: '0.75rem', color: '#cbd5e1', textAlign: 'center' }}>
                Pindah Keluar, Meninggal
              </p>
              <ArrowDown size={16} color="#f87171" style={{ margin: '0 auto' }} />
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.6)', fontSize: '0.75rem', textAlign: 'center', color: '#ffffff', fontWeight: '600' }}>
                Sistem Menentukan Database Utama Sesuai Domisili User
              </div>
              <ArrowDown size={16} color="#f87171" style={{ margin: '0 auto' }} />
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.2)', fontSize: '0.8125rem', textAlign: 'center', color: '#f87171', fontWeight: '700' }}>
                Data DIHAPUS dari salah satu dari 5 Database Utama (BIP) (bukan hapus permanen)
              </div>
            </div>
          </div>

          <ArrowDown size={20} color="#3b82f6" />

          {/* 5 BIP Main Databases */}
          <div style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(59, 130, 246, 0.4)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: '800', color: '#60a5fa', display: 'block', marginBottom: '0.5rem' }}>
              5 DATABASE UTAMA (Spreadsheet per Wilayah)
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700' }}>
              {BIP_LOCATIONS.map(b => (
                <span key={b.id} style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#ffffff' }}>
                  {b.name}
                </span>
              ))}
            </div>
          </div>

          <ArrowDown size={20} color="#3b82f6" />

          {/* 7 Recap Databases */}
          <div style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(180, 83, 9, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: '800', color: '#fbbf24', display: 'block', marginBottom: '0.5rem' }}>
              7 DATABASE RECAP (Spreadsheet Rekapitulasi)
            </span>
            <p style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              Anak Lahir | Pindah Keluar | Pindah Datang | Meninggal | Kelompok Umur | Kelompok Pekerjaan | Kelompok Pendidikan
            </p>
          </div>

          <ArrowDown size={20} color="#3b82f6" />

          {/* Finish Box */}
          <div style={{
            padding: '0.625rem 2rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '0.9375rem',
            letterSpacing: '0.05em'
          }}>
            SELESAI
          </div>
        </div>

        {/* Catatan Logika Text Box */}
        <div style={{
          marginTop: '2rem',
          padding: '1.25rem',
          borderRadius: '12px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.8125rem'
        }}>
          <h4 style={{ fontWeight: '800', color: '#fbbf24', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CATATAN LOGIKA SISTEM (Sesuai Spesifikasi Document PDF):
          </h4>
          <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', lineHeight: '1.6' }}>
            <li>
              <strong>Anak Lahir, Pindah Datang, Kel. Umur, Kel. Pekerjaan, Kel. Pendidikan</strong> &rarr; <u>MENAMBAH</u> data ke salah satu dari 5 Database Utama sesuai domisili, dan dicatat pada Database Recap terkait.
            </li>
            <li>
              <strong>Pindah Keluar & Meninggal</strong> &rarr; <u>MENGHAPUS</u> data dari salah satu dari 5 Database Utama sesuai domisili, namun <u>TIDAK dihapus permanen</u> &rarr; data tersebut dicatat/dipindahkan pada Database Recap Pindah Keluar / Meninggal.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
