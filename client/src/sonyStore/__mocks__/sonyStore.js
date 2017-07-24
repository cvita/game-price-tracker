import model from '../model';
const fs = require('fs');


function findGameById(gameId) {
  return new Promise((resolve, reject) => {
    if (typeof gameId !== 'string') {
      reject('gameId must be a string');
    }
    // Called: https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP0082-CUSA05532_00-FFXIIGAMEPS400NA
    // 7/24/2017
    fs.readFile('./src/sonyStore/__mockData__/sonyStoreApiSearchById.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      model.processSingleResultGameInfo(JSON.parse(data)).then(data => resolve(data))
        .catch(err => reject(err));
    });
  });
}

function findGameByTitle(title, maxResults = 15) {
  return new Promise((resolve, reject) => {
    // Called: https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/US/en/19/final%20fantasy%20XII?suggested_size=5&mode=game&mode=film&mode=tv&mode=live_event
    // 7/24/2017
    fs.readFile('./src/sonyStore/__mockData__/sonyStoreApiSearchByTitle.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      model.processMultipleResultGameInfo(JSON.parse(data)).then(data => resolve(data))
        .catch(err => reject(err));
    });
  });
}

function findNewGames(maxResults = 25) {
  return new Promise((resolve, reject) => {
    // Called: https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/STORE-MSF77008-NEWGAMESGRID?size=25
    // 7/24/2017
    fs.readFile('./src/sonyStore/__mockData__/sonyStoreApiFindNewGames.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      model.processMultipleResultGameInfo(JSON.parse(data)).then(data => resolve(data))
        .catch(err => reject(err));
    });
  });
}


export default {
  findGameById,
  findGameByTitle,
  findNewGames
};
