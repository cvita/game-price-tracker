import 'babel-polyfill';
import db from '../db/database';
import sony from '../support/querySony';
import nodemail from '../support/email'
import helper from '../routes/helper';


const handleExpiredAlerts = async () => {
  try {
    const request = await db.query('DELETE FROM price_alerts WHERE expires <= now() RETURNING *');
    request.rows.map(priceAlert => nodemail.sendRemovingPriceAlert(priceAlert));
    return request.rows;
  } catch (e) {
    console.error(e);
  }
};

const handleCurrentAlerts = async () => {
  try {
    const request = await db.query('SELECT * FROM price_alerts WHERE expires > now()');
    const searched = {};
    const processes = request.rows.map(priceAlert => (
      new Promise(resolve => {
        (async () => {
          if (!searched.hasOwnProperty(priceAlert.game_id)) {
            searched[priceAlert.game_id] = await sony.fetchGame(priceAlert.game_id);
          }
          const currentInfo = searched[priceAlert.game_id];
          const onSale = currentInfo.price_general < priceAlert.price;
          if (onSale) {
            nodemail.sendSalePrice(priceAlert, currentInfo);
          }
          resolve({ onSale: onSale, title: currentInfo.title });
        })();
      }))
    );
    return await Promise.all(processes);
  } catch (e) {
    console.error(e);
  }
};

const updateInfoAndInformUsers = () => {
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
};

// Called from Heroku Scheduler
updateInfoAndInformUsers()
  .then(status => console.log(status));


module.exports = {
  updateInfoAndInformUsers,
  handleExpiredAlerts,
  handleCurrentAlerts
};
