import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Trash2, Edit3, Shield, Key, CheckCircle, X, AlertCircle } from 'lucide-react';
import { getSystemUsers, addUserAccount, updateUserAccount, deleteUserAccount } from '../services/authService';

export default function UserManagementModal({ isOpen, onClose }) {
  const [users, setUsers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form fields
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formNama, setFormNama] = useState('');
  const [formRole, setFormRole] = useState('user');
  const [formJabatan, setFormJabatan] = useState('Petugas Data BIP');
  const [formStatus, setFormStatus] = useState('Aktif');

  const loadUsers = () => {
    setUsers(getSystemUsers());
  };

  useEffect(() => {
    if (isOpen) {
      loadUsers();
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setIsAdding(false);
    setEditingUserId(null);
    setFormUsername('');
    setFormPassword('');
    setFormNama('');
    setFormRole('user');
    setFormJabatan('Petugas Data BIP');
    setFormStatus('Aktif');
    setErrorMsg('');
    setSuccessMsg('');
  };

  if (!isOpen) return null;

  const handleStartAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleStartEdit = (user) => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsAdding(false);
    setEditingUserId(user.id);
    setFormUsername(user.username);
    setFormPassword(user.password);
    setFormNama(user.nama);
    setFormRole(user.role);
    setFormJabatan(user.jabatan);
    setFormStatus(user.status);
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isAdding) {
        addUserAccount({
          username: formUsername,
          password: formPassword,
          nama: formNama,
          role: formRole,
          jabatan: formJabatan,
          status: formStatus
        });
        setSuccessMsg(`User "${formNama}" berhasil ditambahkan!`);
      } else if (editingUserId) {
        updateUserAccount(editingUserId, {
          username: formUsername,
          password: formPassword,
          nama: formNama,
          role: formRole,
          jabatan: formJabatan,
          status: formStatus
        });
        setSuccessMsg(`Data user "${formNama}" berhasil diperbarui!`);
      }
      loadUsers();
      setIsAdding(false);
      setEditingUserId(null);
    } catch (err) {
      setErrorMsg(err.message || 'Gagal menyimpan akun user');
    }
  };

  const handleDeleteUser = (userId, username) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus akun user "${username}"?`)) {
      try {
        deleteUserAccount(userId);
        setSuccessMsg(`User "${username}" telah dihapus.`);
        loadUsers();
      } catch (err) {
        setErrorMsg(err.message);
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Shield size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Manajemen Akun User & Admin</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                Tambah, Edit Role, Hapus, dan Reset Password Petugas
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1 }}>
          {errorMsg && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle size={16} /> {successMsg}
            </div>
          )}

          {/* Form Create / Edit Section */}
          {(isAdding || editingUserId) ? (
            <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isAdding ? <UserPlus size={18} color="#3b82f6" /> : <Edit3 size={18} color="#3b82f6" />}
                {isAdding ? 'Tambah Akun User Baru' : 'Edit Data Akun User'}
              </h3>

              <form onSubmit={handleSubmitUser}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={formNama}
                      onChange={(e) => setFormNama(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={formUsername}
                      onChange={(e) => setFormUsername(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={formPassword}
                      onChange={(e) => setFormPassword(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Role Akun</label>
                    <select 
                      className="form-select"
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                    >
                      <option value="user">User (Petugas Operational / Input)</option>
                      <option value="admin">Admin (Full Control Management)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Jabatan / Keterangan</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={formJabatan}
                      onChange={(e) => setFormJabatan(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Status Akun</label>
                    <select 
                      className="form-select"
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Non-aktif">Non-aktif</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Batal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Simpan Akun
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
              <button className="btn btn-primary" onClick={handleStartAdd}>
                <UserPlus size={16} /> Tambah User Baru
              </button>
            </div>
          )}

          {/* Users List Table */}
          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Lengkap</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Jabatan</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr key={u.id}>
                    <td>{index + 1}</td>
                    <td style={{ fontWeight: 600 }}>{u.nama}</td>
                    <td><code>{u.username}</code></td>
                    <td>
                      <span className={u.role === 'admin' ? 'badge badge-red' : 'badge badge-blue'}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{u.jabatan}</td>
                    <td>
                      <span className={u.status === 'Aktif' ? 'badge badge-green' : 'badge badge-gray'}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button 
                          className="btn btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                          onClick={() => handleStartEdit(u)}
                          title="Edit User"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        {u.username !== 'admin' && (
                          <button 
                            className="btn btn-danger"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                            onClick={() => handleDeleteUser(u.id, u.username)}
                            title="Hapus User"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
