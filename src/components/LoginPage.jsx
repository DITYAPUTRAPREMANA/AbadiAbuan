import React, { useState } from 'react';
import { LogIn, KeyRound, User, ArrowLeft, AlertCircle } from 'lucide-react';
import { loginUser } from '../services/authService';

export default function LoginPage({ onLoginSuccess, onBackToLanding }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('Username dan Password wajib diisi!');
      return;
    }

    const res = loginUser(username, password);
    if (res.success) {
      onLoginSuccess(res.user);
    } else {
      setErrorMsg(res.error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-main)',
      padding: '1.5rem',
      position: 'relative'
    }}>
      {/* Background radial highlight */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />

      <div className="glass-panel" style={{
        maxWidth: '420px',
        width: '100%',
        padding: '2.25rem 2rem',
        borderRadius: '20px',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Top Header */}
        <button 
          onClick={onBackToLanding}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8125rem',
            cursor: 'pointer',
            marginBottom: '1.5rem'
          }}
        >
          <ArrowLeft size={16} /> Kembali ke Landing Page
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/Logo Desa Abuan 2.svg" 
            alt="Logo Desa Abuan" 
            style={{ height: '54px', width: 'auto', marginBottom: '0.75rem', filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4))' }} 
          />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
            Portal Login Sistem BIP
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
            Desa Abuan, Kecamatan Susut, Bangli
          </p>
        </div>

        {errorMsg && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            fontSize: '0.8125rem',
            color: '#f87171',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <User size={14} /> Username
            </label>
            <input 
              type="text" 
              className="form-input"
              placeholder="Masukkan username Anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <KeyRound size={14} /> Password
            </label>
            <input 
              type="password" 
              className="form-input"
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '0.95rem',
              borderRadius: '12px'
            }}
          >
            <LogIn size={18} /> Masuk Ke Sistem
          </button>
        </form>
      </div>
    </div>
  );
}
