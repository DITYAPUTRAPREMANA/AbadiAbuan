const AUTH_USERS_KEY = 'bip_penduduk_users_v1';
const CURRENT_SESSION_KEY = 'bip_penduduk_session_v1';

const INITIAL_USERS = [
  {
    id: 'usr_admin_01',
    username: 'admin',
    password: 'admin123',
    nama: 'Administrator Utama',
    role: 'admin', // 'admin' | 'user'
    jabatan: 'Kepala Administrator IT Desa',
    status: 'Aktif',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr_petugas_01',
    username: 'user',
    password: 'user123',
    nama: 'I Made Petugas Data',
    role: 'user',
    jabatan: 'Petugas Input Data BIP',
    status: 'Aktif',
    createdAt: '2026-01-05'
  }
];

export const initializeAuthStorage = () => {
  const existingUsers = localStorage.getItem(AUTH_USERS_KEY);
  if (!existingUsers) {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(INITIAL_USERS));
  }
};

export const getSystemUsers = () => {
  initializeAuthStorage();
  const data = localStorage.getItem(AUTH_USERS_KEY);
  return data ? JSON.parse(data) : INITIAL_USERS;
};

export const saveSystemUsers = (users) => {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  const session = localStorage.getItem(CURRENT_SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const loginUser = (username, password) => {
  const users = getSystemUsers();
  const target = users.find(
    u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
  );

  if (!target) {
    return { success: false, error: 'Username atau Password salah!' };
  }

  if (target.status !== 'Aktif') {
    return { success: false, error: 'Akun Anda sedang dinonaktifkan oleh Admin.' };
  }

  const sessionObj = {
    id: target.id,
    username: target.username,
    nama: target.nama,
    role: target.role,
    jabatan: target.jabatan,
    loggedInAt: new Date().toISOString()
  };

  localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(sessionObj));
  return { success: true, user: sessionObj };
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_SESSION_KEY);
};

// Admin User Management functions
export const addUserAccount = (userForm) => {
  const users = getSystemUsers();
  const exists = users.some(u => u.username.toLowerCase() === userForm.username.trim().toLowerCase());

  if (exists) {
    throw new Error(`Username "${userForm.username}" sudah digunakan!`);
  }

  const newUser = {
    id: 'usr_' + Date.now().toString(36),
    username: userForm.username.trim(),
    password: userForm.password || '123456',
    nama: userForm.nama.trim(),
    role: userForm.role || 'user',
    jabatan: userForm.jabatan || 'Petugas Data',
    status: userForm.status || 'Aktif',
    createdAt: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  saveSystemUsers(users);
  return newUser;
};

export const updateUserAccount = (userId, updatedFields) => {
  const users = getSystemUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) throw new Error('User tidak ditemukan');

  users[index] = { ...users[index], ...updatedFields };
  saveSystemUsers(users);

  // Update current session if the edited user is currently logged in
  const currentSession = getCurrentUser();
  if (currentSession && currentSession.id === userId) {
    const updatedSession = { ...currentSession, ...updatedFields };
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(updatedSession));
  }

  return users[index];
};

export const deleteUserAccount = (userId) => {
  const users = getSystemUsers();
  const target = users.find(u => u.id === userId);

  if (!target) throw new Error('User tidak ditemukan');
  if (target.username === 'admin') {
    throw new Error('Akun Admin Utama tidak dapat dihapus!');
  }

  const filtered = users.filter(u => u.id !== userId);
  saveSystemUsers(filtered);
  return true;
};
