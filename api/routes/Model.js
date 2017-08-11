const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const databaseUrl = require('../../db/database').url;


function connectToDb(collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(databaseUrl, (err, db) => {
            if (err) {
                reject(err.message);
                return;
            }
            resolve(db.collection(collectionName));
        });
    });
}


function findAllGames() {
    return new Promise((resolve, reject) => {
        connectToDb('games').then(collection => {
            collection.find().toArray((err, docs) => {
                handleResponse(err, docs, resolve);
            });
        });
    });
}

function findOneGame(id) {
    return new Promise((resolve, reject) => {
        const details = { '_id': id };
        connectToDb('games').then(collection => {
            collection.findOne(details, (err, doc) => {
                handleResponse(err, doc, resolve);
            });
        });
    });
}

function createOrUpdateGame(gameInfo) {
    return new Promise((resolve, reject) => {
        const details = [
            { _id: gameInfo._id },
            gameInfo,
            { upsert: true },
        ];
        connectToDb('games').then(collection => {
            collection.update(...details, (err, doc) => {
                handleResponse(err, doc, resolve);
            });
        });
    });
}

function deleteGame(game_id) {
    return new Promise((resolve, reject) => {
        const details = { _id: game_id };
        connectToDb('games').then(collection => {
            collection.deleteOne(details, (err, doc) => {
                handleResponse(err, doc, resolve);
            });
        });
    });
}

function addToPriceHistory(info) {
    return new Promise((resolve, reject) => {
        const details = [
            { _id: info._id },
            { $push: { history: { date: info.date, price: info.price } } },
            { upsert: true },
        ];
        connectToDb('priceHistory').then(collection => {
            collection.update(...details, (err, doc) => {
                handleResponse(err, doc, resolve);
            });
        });
    });
}

function findAllPriceAlerts(relationToExpiration, date) {
    return new Promise((resolve, reject) => {
        const details = { expiration: { [relationToExpiration]: date } };
        connectToDb('priceAlerts').then(collection => {
            collection.find(details).toArray((err, docs) => {
                handleResponse(err, docs, resolve);
            });
        });
    });
}

function findOnePriceAlert(_id) {
    return new Promise((resolve, reject) => {
        const details = { _id: ObjectID(_id) };
        connectToDb('priceAlerts').then(collection => {
            collection.findOne(details, (err, doc) => {
                handleResponse(err, doc, resolve);
            });
        });
    });
}

function createOrUpdatePriceAlert(priceAlertInfo) {
    return new Promise((resolve, reject) => {
        priceAlertInfo._id = ObjectID(priceAlertInfo._id);
        const details = [
            { game_id: priceAlertInfo.game_id, userEmail: priceAlertInfo.userEmail },
            priceAlertInfo,
            { upsert: true, returnNewDocument: true }
        ];
        connectToDb('priceAlerts').then(collection => {
            collection.findOneAndUpdate(...details, (err, doc) => {
                handleResponse(err, doc, resolve);
            });
        });
    });
}

function deletePriceAlert(userEmail, game_id) {
    return new Promise((resolve, reject) => {
        const details = { userEmail: userEmail, game_id: game_id };
        connectToDb('priceAlerts').then(collection => {
            collection.deleteOne(details, (err, doc) => {
                handleResponse(err, doc, resolve);
            });
        });
    });
}

function deleteAllPriceAlertsForUser(userEmail) {
    return new Promise((resolve, reject) => {
        const details = { userEmail: userEmail };
        connectToDb('priceAlerts').then(collection => {
            collection.remove(details, (err, doc) => {
                handleResponse(err, doc, resolve);
            });
        });
    });
}

function checkIfUserIsOnBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        const details = { _id: userEmail };
        connectToDb('blacklist').then(collection => {
            collection.findOne(details, (err, doc) => {
                handleResponse(err, doc !== null, resolve);
            });
        });
    });
}

function addToBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        const details = { _id: userEmail, dateAdded: new Date().getTime() };
        connectToDb('blacklist').then(collection => {
            collection.insertOne(details, (err, doc) => {
                handleResponse(err, doc !== null, resolve);
            });
        });
    });
}

function deleteUserFromBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        const details = { _id: userEmail };
        connectToDb('blacklist').then(collection => {
            collection.deleteOne(details, (err, doc) => {
                handleResponse(err, doc, resolve);
            });
        });
    });
}

function handleResponse(err, resp, resolve) {
    if (err) {
        throw err;
    } else {
        resolve(resp);
    }
}


module.exports = {
    findAllGames,
    findOneGame,
    createOrUpdateGame,
    deleteGame,
    addToPriceHistory,
    findAllPriceAlerts,
    findOnePriceAlert,
    createOrUpdatePriceAlert,
    deletePriceAlert,
    deleteAllPriceAlertsForUser,
    checkIfUserIsOnBlacklist,
    addToBlacklist,
    deleteUserFromBlacklist
};
