import React, { useState } from 'react';
import { FileSpreadsheet, Copy, Check, ExternalLink, RefreshCw, Zap, ShieldCheck, HelpCircle } from 'lucide-react';
import { getSheetsConfig, saveSheetsConfig, fetchAllFromGoogleSheet } from '../services/sheetsService';
import { GOOGLE_APPS_SCRIPT_CODE } from '../utils/googleAppsScriptTemplate';

export default function SpreadsheetSyncConfig({ onSyncCompleted }) {
  const [config, setConfig] = useState(getSheetsConfig());
  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleSaveConfig = () => {
    saveSheetsConfig(config);
    setTestResult({ success: true, message: 'Pengaturan Google Spreadsheet berhasil disimpan!' });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTestConnection = async () => {
    if (!config.webAppUrl) {
      setTestResult({ success: false, message: 'Masukkan URL Google Apps Script Web App terlebih dahulu.' });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const data = await fetchAllFromGoogleSheet();
      setTesting(false);
      setTestResult({
        success: true,
        message: 'Koneksi ke Google Spreadsheet Berhasil & Realtime Active!'
      });
      if (onSyncCompleted) onSyncCompleted();
    } catch (err) {
      setTesting(false);
      setTestResult({
        success: false,
        message: `Gagal terhubung ke Google Sheet: ${err.message}`
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '950px', margin: '0 auto' }}>
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Pusat Integrasi Realtime Google Spreadsheet
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
          Hubungkan sistem React Vite ini langsung dengan Google Sheets milik Anda untuk penyimpanan data 5 BIP & 7 Recap secara online dan realtime.
        </p>
      </div>

      {/* Connection Status Panel */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: config.webAppUrl ? '4px solid #10b981' : '4px solid #f59e0b' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              padding: '0.75rem',
              borderRadius: '12px',
              background: config.webAppUrl ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              color: config.webAppUrl ? '#34d399' : '#fbbf24'
            }}>
              <FileSpreadsheet size={28} />
            </div>
            <div>
              <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#ffffff' }}>
                Status Koneksi: {config.webAppUrl ? 'Spreadsheet Online Connected' : 'Modus Storage Lokal (Siap Hubung)'}
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
                {config.lastSync ? `Terakhir disinkronkan: ${new Date(config.lastSync).toLocaleString('id-ID')}` : 'Sistem dapat berjalan langsung dengan offline local storage & sync ke Google Sheets kapan saja.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="btn btn-primary"
          >
            {testing ? <RefreshCw size={16} className="live-pulse" /> : <Zap size={16} />}
            <span>{testing ? 'Menguji Koneksi...' : 'Uji Koneksi Realtime'}</span>
          </button>
        </div>

        {testResult && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            background: testResult.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: testResult.success ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            color: testResult.success ? '#34d399' : '#f87171',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            {testResult.message}
          </div>
        )}
      </div>

      {/* URL Input Form */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
          Konfigurasi Endpoint Google Apps Script Web App
        </h3>

        <div className="form-group">
          <label className="form-label">
            Google Apps Script Web App URL
          </label>
          <input
            type="url"
            placeholder="https://script.google.com/macros/s/AKfycb.../exec"
            value={config.webAppUrl}
            onChange={(e) => setConfig({ ...config, webAppUrl: e.target.value })}
            className="form-input"
            style={{ fontFamily: 'var(--font-mono)' }}
          />
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Tempel URL Web App yang Anda dapatkan setelah mendeploy script Google Apps Script di bawah.
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button onClick={handleSaveConfig} className="btn btn-success">
            <ShieldCheck size={16} />
            <span>Simpan Konfigurasi</span>
          </button>
        </div>
      </div>

      {/* Step by Step Setup Guide */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#ffffff' }}>
              Panduan 4 Langkah Menghubungkan Google Sheets
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
              Ikuti langkah sederhana ini untuk membuat Google Spreadsheet Anda menjadi database realtime aktif.
            </p>
          </div>
          <button onClick={handleCopyCode} className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
            {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
            <span>{copied ? 'Kode Tersalin!' : 'Copy Script Google (.gs)'}</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: '10px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontWeight: '800', color: '#3b82f6', fontSize: '1.25rem' }}>1</span>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '700', color: '#ffffff', margin: '0.25rem 0' }}>Buka Google Sheet</h4>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Buat dokumen Google Sheet baru di akun Google Anda (misal: "Database BIP Desa Abuan").
            </p>
          </div>

          <div style={{ padding: '1rem', borderRadius: '10px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontWeight: '800', color: '#3b82f6', fontSize: '1.25rem' }}>2</span>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '700', color: '#ffffff', margin: '0.25rem 0' }}>Buka Apps Script</h4>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Klik menu <strong>Ekstensi</strong> -&gt; <strong>Apps Script</strong>.
            </p>
          </div>

          <div style={{ padding: '1rem', borderRadius: '10px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontWeight: '800', color: '#3b82f6', fontSize: '1.25rem' }}>3</span>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '700', color: '#ffffff', margin: '0.25rem 0' }}>Paste Kode Script</h4>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Hapus semua isi editor, lalu klik tombol <strong>Copy Script</strong> di atas dan paste ke editor Apps Script.
            </p>
          </div>

          <div style={{ padding: '1rem', borderRadius: '10px', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontWeight: '800', color: '#3b82f6', fontSize: '1.25rem' }}>4</span>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '700', color: '#ffffff', margin: '0.25rem 0' }}>Deploy Web App</h4>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Klik <strong>Deploy</strong> -&gt; <strong>New Deployment</strong> -&gt; Pilih <strong>Web App</strong> -&gt; Akses: <strong>Anyone / Siapa saja</strong>.
            </p>
          </div>
        </div>

        {/* Script Code Preview */}
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#cbd5e1' }}>Preview Kode Apps Script (`Code.gs`)</span>
            <button onClick={handleCopyCode} style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.75rem', cursor: 'pointer' }}>
              {copied ? 'Tersalin!' : 'Salin Kode'}
            </button>
          </div>

          <pre style={{
            padding: '1rem',
            borderRadius: '10px',
            background: '#090d16',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#38bdf8',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            maxHeight: '260px',
            overflowY: 'auto'
          }}>
            {GOOGLE_APPS_SCRIPT_CODE}
          </pre>
        </div>
      </div>
    </div>
  );
}
