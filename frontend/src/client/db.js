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
    return Promise.resolve(await request.json());
  } catch (e) {
    return Promise.reject(e);
  }
};


export default {
  checkBlacklist,
  upsertPriceAlert
};
