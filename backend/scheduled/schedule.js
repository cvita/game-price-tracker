import db from '../db/database';
import sony from '../api/querySony';
import nodemail from '../api/email';
import helper from '../routes/helper';


// Called from Heroku Scheduler
updateInfoAndInformUsers()
  .then(status => console.log(status));

function updateInfoAndInformUsers() {
  return new Promise((resolve, reject) => {
    const status = { started: new Date().getTime() };

    Promise.all([handleExpiredAlerts(), handleCurrentAlerts()])
      .then(results => {
        status.expiredAlerts = results[0];
        status.currentGames = results[1];
        status.elapsed = new Date().getTime() - status.started;
        resolve(status);
      })
      .catch(e => {
        console.error(e);
        reject(e);
      });
  });
}

async function handleExpiredAlerts() {
  try {
    const request = await db.query('DELETE FROM price_alerts WHERE expires <= now() RETURNING *');
    request.rows.map(priceAlert => nodemail.sendRemovingPriceAlert(priceAlert));
    return request.rows;
  } catch (e) {
    console.error(e);
  }
};

async function handleCurrentAlerts() {
  try {
    const request = await db.query('SELECT * FROM price_alerts WHERE expires > now()');
    const processes = request.rows.map(priceAlert => (
      new Promise(resolve => {
        sony.fetchGame(priceAlert.game_id).then(currentInfo => {
          const onSale = currentInfo.price_general < priceAlert.price;
          if (onSale) {
            nodemail.sendSalePrice(priceAlert, currentInfo);
          }
          resolve({ onSale: onSale, title: currentInfo.title });
        });
      }))
    );
    return await Promise.all(processes);
  } catch (e) {
    console.error(e);
  }
};


module.exports = {
  updateInfoAndInformUsers,
  handleExpiredAlerts,
  handleCurrentAlerts
};
