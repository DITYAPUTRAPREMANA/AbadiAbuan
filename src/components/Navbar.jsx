import React from 'react';
import { Database, FileSpreadsheet, Layers, Menu, X } from 'lucide-react';
import { getSheetsConfig } from '../services/sheetsService';

export default function Navbar({ activeTab, setActiveTab, onOpenFlowchart, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const config = getSheetsConfig();
  const isConnected = !!config.webAppUrl;

  return (
    <header style={{
      height: '70px',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1rem',
    }}>
      {/* Left Group: Mobile Menu Button & Brand Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn btn-secondary mobile-only"
          style={{ padding: '0.5rem', borderRadius: '10px' }}
          title="Toggle Navigasi Menu"
        >
          {isMobileMenuOpen ? <X size={20} color="#60a5fa" /> : <Menu size={20} color="#60a5fa" />}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            flexShrink: 0
          }}>
            <Database size={20} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              BIP DESA ABUAN
            </h1>
            <p className="desktop-only" style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '500' }}>
              Sistem Pencatatan Data Penduduk (5 BIP & 7 Recap)
            </p>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Flowchart Button (Icon on mobile, text on desktop) */}
        <button
          onClick={onOpenFlowchart}
          className="btn btn-secondary"
          style={{ fontSize: '0.8125rem', padding: '0.45rem 0.75rem' }}
          title="Lihat Alur Logika Sistem (PDF Flowchart)"
        >
          <Layers size={16} color="#3b82f6" />
          <span className="desktop-only">Diagram Alur</span>
        </button>

        {/* Spreadsheet Status Pill */}
        <button
          onClick={() => setActiveTab('spreadsheet_sync')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            border: isConnected ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(245, 158, 11, 0.4)',
            background: isConnected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            color: isConnected ? '#34d399' : '#fbbf24',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
        >
          <FileSpreadsheet size={14} />
          <span className="desktop-only">{isConnected ? 'Spreadsheet Active' : 'Spreadsheet Local'}</span>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isConnected ? '#10b981' : '#f59e0b',
            display: 'inline-block'
          }} className={isConnected ? 'live-pulse' : ''} />
        </button>
      </div>
    </header>
  );
}
