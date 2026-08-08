import React from 'react';
import { LayoutDashboard, UserPlus, Database, FileText, FileSpreadsheet, Users, Shield, ExternalLink } from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  currentUserRole = 'user',
  onOpenUserManagement
}) {
  const isAdmin = currentUserRole === 'admin';

  const handleOpenExternalWeb = () => {
    window.open('https://addodesaabuan.id/', '_blank', 'noopener,noreferrer');
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: 'Utama'
    },
    {
      id: 'input_data',
      label: 'Input Data',
      icon: UserPlus,
      badge: '5 Kategori',
      highlight: true
    },
    {
      id: 'bip_databases',
      label: '5 Master Database BIP',
      icon: Database,
      badge: 'Banjar'
    },
    {
      id: 'recap_databases',
      label: '5 Database Recap',
      icon: FileText,
      badge: 'Rekapitulasi'
    },
    ...(isAdmin ? [
      {
        id: 'user_management_action',
        label: 'Manajemen Akun User',
        icon: Users,
        badge: 'Admin Only',
        action: onOpenUserManagement
      },
      {
        id: 'external_web_link',
        label: 'Akses Addo Desa Abuan',
        icon: ExternalLink,
        badge: 'Web Addo',
        action: handleOpenExternalWeb
      },
      {
        id: 'spreadsheet_sync',
        label: 'Google Spreadsheet Sync',
        icon: FileSpreadsheet,
        badge: 'Admin'
      }
    ] : [
      {
        id: 'external_web_link',
        label: 'Web Addo',
        icon: ExternalLink,
        badge: 'Web Link',
        action: handleOpenExternalWeb
      }
    ])
  ];

  const handleSelectTab = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActiveTab(item.id);
    }
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
          height: 'calc(100vh - 70px)',
          position: 'sticky',
          top: '70px',
          alignSelf: 'flex-start',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.25rem 0.875rem',
          gap: '0.5rem',
          overflow: 'hidden',
          zIndex: 30
        }}
      >
        <div style={{ padding: '0 0.5rem 0.75rem 0.5rem', borderBottom: '1px solid var(--border-color)', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
            Navigasi {isAdmin ? 'Admin' : 'Petugas Data'}
          </p>
          <span className={isAdmin ? 'badge badge-red' : 'badge badge-blue'} style={{ fontSize: '0.65rem' }}>
            {isAdmin ? 'ADMIN' : 'USER'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', flex: 1, overflowY: 'auto' }}>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item)}
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
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                className="sidebar-item"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} color={isActive ? '#3b82f6' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '6px',
                    background: isActive ? 'rgba(59, 130, 246, 0.3)' : 'var(--bg-card)',
                    color: isActive ? '#3b82f6' : 'var(--text-muted)',
                    fontWeight: '600'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Info Card at Bottom */}
        <div style={{
          marginTop: 'auto',
          padding: '0.875rem',
          borderRadius: '12px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          fontSize: '0.75rem',
          flexShrink: 0
        }}>
          <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Akses: {isAdmin ? 'Full Management (Admin)' : 'Input & Update Data (User)'}
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
            5 BIP & 5 Recap Kependudukan Terintegrasi Desa Abuan.
          </p>
        </div>
      </aside>
    </>
  );
}
