import React from 'react';
import { FileSpreadsheet, Menu, X, LogOut, Shield, UserCheck, Users, Sun, Moon } from 'lucide-react';
import { getSheetsConfig } from '../services/sheetsService';

export default function Navbar({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  currentUser,
  onLogout,
  onOpenUserManagement,
  theme = 'dark',
  toggleTheme
}) {
  const config = getSheetsConfig();
  const isConnected = !!config.webAppUrl;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <header style={{
      height: '70px',
      background: 'var(--bg-card)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 0.875rem',
    }}>
      {/* Left Group: Mobile Menu Button & Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn btn-secondary mobile-only"
          style={{ padding: '0.5rem', borderRadius: '10px', flexShrink: 0 }}
          title="Toggle Navigasi Menu"
        >
          {isMobileMenuOpen ? <X size={20} color="#60a5fa" /> : <Menu size={20} color="#60a5fa" />}
        </button>

        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', minWidth: 0 }}
          onClick={() => setActiveTab('dashboard')}
        >
          <img
            src="/Logo Desa Abuan 2.svg"
            alt="Logo Desa Abuan"
            style={{
              height: '38px',
              width: 'auto',
              filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.4))',
              flexShrink: 0
            }}
          />
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: '0.95rem', fontWeight: '900', letterSpacing: '0.02em', margin: 0, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              ABADI <span style={{ color: '#3b82f6' }}>ABUAN</span>
            </h1>
            <p className="desktop-only" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Sistem Informasi Kependudukan 5 BIP
            </p>
          </div>
        </div>
      </div>

      {/* Right Controls: User Profile, Theme Switcher & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
        {/* Light / Dark Mode Toggle Button */}
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.6rem', borderRadius: '10px' }}
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

        {/* User Info Badge */}
        {currentUser && (
          <div className="glass-card desktop-only" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '10px',
            fontSize: '0.8125rem'
          }}>
            {isAdmin ? <Shield size={16} color="#ef4444" /> : <UserCheck size={16} color="#3b82f6" />}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {currentUser.nama}
              </span>
              <span className={isAdmin ? 'badge badge-red' : 'badge badge-blue'} style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', alignSelf: 'flex-start' }}>
                {isAdmin ? 'ADMIN' : 'USER / PETUGAS'}
              </span>
            </div>
          </div>
        )}

        {/* User Management Button for Admin */}
        {isAdmin && (
          <button
            onClick={onOpenUserManagement}
            className="btn btn-secondary desktop-only"
            style={{ fontSize: '0.8125rem', padding: '0.45rem 0.75rem' }}
            title="Kelola Akun User & Role"
          >
            <Users size={16} color="#ef4444" />
            <span>Kelola User</span>
          </button>
        )}

        {/* Spreadsheet Status Pill */}
        {isAdmin && (
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
            className="desktop-only"
          >
            <FileSpreadsheet size={14} />
            <span>{isConnected ? 'Sheets Sync' : 'Local'}</span>
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="btn btn-danger"
          style={{ fontSize: '0.8125rem', padding: '0.45rem 0.65rem' }}
          title="Keluar dari Akun"
        >
          <LogOut size={16} />
          <span className="desktop-only">Keluar</span>
        </button>
      </div>
    </header>
  );
}
