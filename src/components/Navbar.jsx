import React from 'react';
import { Database, FileSpreadsheet, Activity, HelpCircle, Layers, RefreshCw } from 'lucide-react';
import { getSheetsConfig } from '../services/sheetsService';

export default function Navbar({ activeTab, setActiveTab, onOpenFlowchart }) {
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
      justifyContent: 'space-[#between]',
      padding: '0 1.5rem',
    }}>
      {/* Brand Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
        }}>
          <Database size={22} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.125rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BIP DESA ABUAN
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '500' }}>
            Sistem Pencatatan Data Penduduk (5 BIP & 7 Recap)
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Flowchart Button */}
        <button
          onClick={onOpenFlowchart}
          className="btn btn-secondary"
          style={{ fontSize: '0.8125rem', padding: '0.5rem 0.875rem' }}
          title="Lihat Alur Logika Sistem (Sesuai PDF)"
        >
          <Layers size={16} color="#3b82f6" />
          <span>Diagram Alur Sistem</span>
        </button>

        {/* Spreadsheet Status Pill */}
        <button
          onClick={() => setActiveTab('spreadsheet_sync')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.875rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            border: isConnected ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(245, 158, 11, 0.4)',
            background: isConnected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            color: isConnected ? '#34d399' : '#fbbf24',
            transition: 'all 0.2s ease'
          }}
        >
          <FileSpreadsheet size={14} />
          <span>{isConnected ? 'Spreadsheet Sync Active' : 'Spreadsheet Mode Local'}</span>
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
