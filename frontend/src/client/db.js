const checkBlacklist = async email => {
  const init = { method: 'GET' };
  try {
    const request = await fetch(`/users/${encodeURIComponent(email)}`, init);
    return Promise.resolve(await request.json());
  } catch (e) {
    return Promise.reject(e);
  }
};

const upsertPriceAlert = async info => {
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info)
  };
  try {
    const request = await fetch('/priceAlerts', init);
    const response = await request.json();
    return Promise.resolve(response.priceAlertSaved);
  } catch (e) {
    return Promise.reject(e);
  }
};

const fetchPriceAlert = async (alertId, email) => {
  const init = { method: 'GET' };
  try {
    const request = await fetch(`/users/manage/${alertId}/${email}`, init);
    return Promise.resolve(await request.json());
  } catch (e) {
    return Promise.reject(e);
  }
};

const deletePriceAlert = async (gameId, email) => {
  const init = { method: 'DELETE' };
  try {
    const request = await fetch(`/priceAlerts/${gameId}/${email}`, init);
    return Promise.resolve(await request.json());
  } catch (e) {
    return Promise.reject(e);
  }
};

const addToBlacklist = async email => {
  const init = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  };
  try {
    const request = await fetch('/users', init);
    return Promise.resolve(await request.json());
  } catch (e) {
    return Promise.reject(e);
  }
};


export default {
  checkBlacklist,
  upsertPriceAlert,
  fetchPriceAlert,
  deletePriceAlert,
  addToBlacklist
};
