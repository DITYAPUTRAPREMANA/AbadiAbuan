import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import InputDataForm from './components/InputDataForm';
import BipDatabaseView from './components/BipDatabaseView';
import RecapDatabaseView from './components/RecapDatabaseView';
import SpreadsheetSyncConfig from './components/SpreadsheetSyncConfig';
import UserManagementModal from './components/UserManagementModal';
import { getBipDatabases, getRecapDatabases, initializeStorage, resetDatabaseToSeed } from './services/storageService';
import { getCurrentUser, logoutUser } from './services/authService';

export default function App() {
  // Theme State: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Page View State: 'landing' | 'login' | 'app'
  const [pageView, setPageView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);

  // Active Tab inside App workspace
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBipName, setSelectedBipName] = useState('BIP Sala');
  const [selectedRecapId, setSelectedRecapId] = useState('recap_pindah_datang');

  // Modals state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Reactive Database State
  const [bipData, setBipData] = useState({});
  const [recapData, setRecapData] = useState({});

  const refreshData = async () => {
    initializeStorage();
    setBipData(getBipDatabases());
    setRecapData(getRecapDatabases());

    // Auto-pull from Google Spreadsheet if Web App URL is configured
    try {
      setIsSyncing(true);
      const synced = await syncFromGoogleSheetsToLocalStorage();
      if (synced) {
        setBipData(getBipDatabases());
        setRecapData(getRecapDatabases());
      }
    } catch (err) {
      console.warn('Auto-sync Google Sheets skipped:', err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    refreshData();
    const session = getCurrentUser();
    if (session) {
      setCurrentUser(session);
      setPageView('app');
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setPageView('app');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setPageView('landing');
  };

  const handleResetDatabase = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset seluruh database BIP dan Rekapitulasi ke data seed awal?')) {
      resetDatabaseToSeed();
      refreshData();
      alert('Database berhasil di-reset ke data seed awal!');
    }
  };

  // 1. Landing Page View
  if (pageView === 'landing') {
    return (
      <LandingPage
        onNavigateLogin={() => setPageView('login')}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  // 2. Login Page View
  if (pageView === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setPageView('landing')}
      />
    );
  }

  // 3. Main Workspace View
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenUserManagement={() => setIsUserManagementOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Workspace Layout */}
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 70px)', overflow: 'hidden', position: 'relative' }}>
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          currentUserRole={currentUser?.role}
          onOpenUserManagement={() => setIsUserManagementOpen(true)}
        />

        {/* Content Body */}
        <main style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto', height: '100%' }}>
          {activeTab === 'dashboard' && (
            currentUser?.role === 'admin' ? (
              <AdminDashboard
                bipData={bipData}
                recapData={recapData}
                setActiveTab={setActiveTab}
                setSelectedBipName={setSelectedBipName}
                setSelectedRecapId={setSelectedRecapId}
                onOpenUserManagement={() => setIsUserManagementOpen(true)}
                onResetDatabase={handleResetDatabase}
              />
            ) : (
              <UserDashboard
                bipData={bipData}
                recapData={recapData}
                setActiveTab={setActiveTab}
                setSelectedBipName={setSelectedBipName}
              />
            )
          )}

          {activeTab === 'input_data' && (
            <InputDataForm
              onTransactionSuccess={refreshData}
            />
          )}

          {activeTab === 'bip_databases' && (
            <BipDatabaseView
              bipData={bipData}
              selectedBipName={selectedBipName}
              setSelectedBipName={setSelectedBipName}
              onDataChanged={refreshData}
              currentUserRole={currentUser?.role}
            />
          )}

          {activeTab === 'recap_databases' && (
            <RecapDatabaseView
              recapData={recapData}
              selectedRecapId={selectedRecapId}
              setSelectedRecapId={setSelectedRecapId}
            />
          )}

          {activeTab === 'spreadsheet_sync' && (
            <SpreadsheetSyncConfig
              onSyncCompleted={refreshData}
            />
          )}
        </main>
      </div>

      {/* User Management Modal (Admin Only) */}
      <UserManagementModal
        isOpen={isUserManagementOpen}
        onClose={() => setIsUserManagementOpen(false)}
      />
    </div>
  );
}
