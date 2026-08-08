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
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'processTransaction',
        payload: transactionPayload
      })
    });

    let resJson = null;
    try {
      resJson = await response.json();
    } catch (parseErr) {
      // Intentionally fallback if 302 redirect output text is returned
    }

    saveSheetsConfig({ ...config, lastSync: new Date().toISOString() });
    return { synced: true, data: resJson };
  } catch (error) {
    console.error('Failed to sync to Google Sheet:', error);
    return { synced: false, error: error.message };
  }
};


export const syncAllDataToGoogleSheet = async (allBips, allRecaps) => {
  const config = getSheetsConfig();
  if (!config.webAppUrl) {
    throw new Error('Google Apps Script Web App URL belum diatur.');
  }

  let successCount = 0;
  let failCount = 0;

  // Flatten all BIP residents and sync them
  const bipEntries = Object.entries(allBips || {});
  for (const [domisili, list] of bipEntries) {
    for (const resident of list) {
      const payload = {
        ...resident,
        kategori: resident.kategori || 'Pindah Datang',
        domisili: domisili
      };
      const res = await syncTransactionToGoogleSheet(payload);
      if (res.synced) successCount++;
      else failCount++;
    }
  }

  saveSheetsConfig({ ...config, lastSync: new Date().toISOString() });
  return { successCount, failCount };
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
