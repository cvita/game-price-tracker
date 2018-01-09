// Helper functions
const promiseWrapper = myFunc => (
  new Promise((resolve, reject) => myFunc
    .then(res => resolve(res)))
    .catch(e => reject(e))
);

const handleError = (err, res, statusCode = 500) => {
  console.error(err.message);
  res.status(statusCode).send(err.message);
};

module.exports = {
  promiseWrapper,
  handleError
};
