const CONFIG_KEY = 'bip_google_sheets_config';

export const getSheetsConfig = () => {
  const saved = localStorage.getItem(CONFIG_KEY);
  return saved ? JSON.parse(saved) : { webAppUrl: '', autoSync: false, lastSync: null };
};

export const saveSheetsConfig = (config) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

export const syncTransactionToGoogleSheet = async (transactionPayload) => {
  const config = getSheetsConfig();
  if (!config.webAppUrl) {
    return { synced: false, reason: 'Google Apps Script URL belum dikonfigurasi' };
  }

  try {
    const response = await fetch(config.webAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'processTransaction',
        payload: transactionPayload
      })
    });

    const resJson = await response.json();
    saveSheetsConfig({ ...config, lastSync: new Date().toISOString() });
    return { synced: true, data: resJson };
  } catch (error) {
    console.error('Failed to sync to Google Sheet:', error);
    return { synced: false, error: error.message };
  }
};

export const fetchAllFromGoogleSheet = async () => {
  const config = getSheetsConfig();
  if (!config.webAppUrl) {
    throw new Error('Google Apps Script Web App URL belum diatur.');
  }

  const url = `${config.webAppUrl}?action=getAllData`;
  const response = await fetch(url);
  const data = await response.json();
  saveSheetsConfig({ ...config, lastSync: new Date().toISOString() });
  return data;
};
