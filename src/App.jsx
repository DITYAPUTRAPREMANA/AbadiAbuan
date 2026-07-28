import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import InputDataForm from './components/InputDataForm';
import BipDatabaseView from './components/BipDatabaseView';
import RecapDatabaseView from './components/RecapDatabaseView';
import SpreadsheetSyncConfig from './components/SpreadsheetSyncConfig';
import FlowchartModal from './components/FlowchartModal';
import { getBipDatabases, getRecapDatabases, initializeStorage } from './services/storageService';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBipName, setSelectedBipName] = useState('BIP Sala');
  const [selectedRecapId, setSelectedRecapId] = useState('recap_anak_lahir');
  const [isFlowchartOpen, setIsFlowchartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Reactive Database State
  const [bipData, setBipData] = useState({});
  const [recapData, setRecapData] = useState({});

  const refreshData = () => {
    initializeStorage();
    setBipData(getBipDatabases());
    setRecapData(getRecapDatabases());
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Top Header Navbar (Fixed Height 70px) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFlowchart={() => setIsFlowchartOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Workspace Layout (Fixed Remaining Height) */}
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 70px)', overflow: 'hidden', position: 'relative' }}>
        {/* Left Navigation Sidebar (Non-scrollable, Fixed Height) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Content Body (Independent Scroll Area) */}
        <main style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto', height: '100%' }}>
          {activeTab === 'dashboard' && (
            <Dashboard
              bipData={bipData}
              recapData={recapData}
              setActiveTab={setActiveTab}
              setSelectedBipName={setSelectedBipName}
              setSelectedRecapId={setSelectedRecapId}
              onOpenFlowchart={() => setIsFlowchartOpen(true)}
            />
          )}

          {activeTab === 'input_data' && (
            <InputDataForm
              onTransactionSuccess={() => {
                refreshData();
              }}
            />
          )}

          {activeTab === 'bip_databases' && (
            <BipDatabaseView
              bipData={bipData}
              selectedBipName={selectedBipName}
              setSelectedBipName={setSelectedBipName}
              onDataChanged={refreshData}
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

          {activeTab === 'flowchart_view' && (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <FlowchartModal isOpen={true} onClose={() => setActiveTab('dashboard')} />
            </div>
          )}
        </main>
      </div>

      {/* Flowchart Modal overlay */}
      {activeTab !== 'flowchart_view' && (
        <FlowchartModal
          isOpen={isFlowchartOpen}
          onClose={() => setIsFlowchartOpen(false)}
        />
      )}
    </div>
  );
}
