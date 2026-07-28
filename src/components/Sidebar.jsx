import React from 'react';
import { LayoutDashboard, UserPlus, Database, FileText, FileSpreadsheet, GitMerge, ChevronRight } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: 'Utama'
    },
    {
      id: 'input_data',
      label: 'Input Data Penduduk',
      icon: UserPlus,
      badge: '7 Kategori',
      highlight: true
    },
    {
      id: 'bip_databases',
      label: '5 Database Utama (BIP)',
      icon: Database,
      badge: 'Domisili'
    },
    {
      id: 'recap_databases',
      label: '7 Database Recap',
      icon: FileText,
      badge: 'Rekapitulasi'
    },
    {
      id: 'spreadsheet_sync',
      label: 'Google Spreadsheet Sync',
      icon: FileSpreadsheet,
      badge: 'Realtime'
    },
    {
      id: 'flowchart_view',
      label: 'Penjelasan Alur (PDF)',
      icon: GitMerge
    }
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop overlay for mobile drawer */}
      {isMobileMenuOpen && (
        <div
          className="sidebar-backdrop mobile-only"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`sidebar-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          minWidth: '260px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.25rem 0.875rem',
          gap: '0.5rem',
          zIndex: 50
        }}
      >
        <div style={{ padding: '0 0.5rem 0.75rem 0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Navigasi Sistem
          </p>
        </div>

        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0.75rem 0.875rem',
                borderRadius: '10px',
                border: isActive 
                  ? '1px solid rgba(59, 130, 246, 0.5)' 
                  : item.highlight 
                    ? '1px dashed rgba(59, 130, 246, 0.3)' 
                    : '1px solid transparent',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.15) 100%)' 
                  : 'transparent',
                color: isActive ? '#ffffff' : '#94a3b8',
                fontWeight: isActive ? '700' : '500',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
              className="sidebar-item"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={18} color={isActive ? '#60a5fa' : '#64748b'} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span style={{
                  fontSize: '0.6875rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '6px',
                  background: isActive ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#93c5fd' : '#64748b',
                  fontWeight: '600'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Info Card at Bottom */}
        <div style={{
          marginTop: 'auto',
          padding: '1rem',
          borderRadius: '12px',
          background: 'rgba(30, 41, 59, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          fontSize: '0.75rem'
        }}>
          <div style={{ fontWeight: '700', color: '#f8fafc', marginBottom: '0.25rem' }}>
            Struktur Dual Database
          </div>
          <p style={{ color: '#94a3b8', lineHeight: '1.4' }}>
            5 BIP (Buku Induk Penduduk) + 7 Recap Log Transaksi terintegrasi otomatis.
          </p>
        </div>
      </aside>
    </>
  );
}
