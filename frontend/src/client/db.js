// Isolated method for check user's blacklist status
const checkBlacklist = async email => {
  const init = { method: 'GET' };
  try {
    const request = await fetch(`/users/${encodeURIComponent(email)}`, init);
    return Promise.resolve(await request.json());
  } catch (e) {
    return Promise.reject(e);
  }
};


export default {
  checkBlacklist
};
