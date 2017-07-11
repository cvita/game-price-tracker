const ObjectID = require('mongodb').ObjectID;


function findAllGames(collection) {
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, docs) => {
            handleError(err, reject);
            resolve(docs);
        });
    });
}

function findOneGame(collection, url, _id) {
    return new Promise((resolve, reject) => {
        const details = url !== null ?
            { "url": url } :
            { "_id": _id };
        collection.findOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc);
        });
    });
}

function createOrUpdateGame(collection, gameInfo) {
    return new Promise((resolve, reject) => {
        const details = [
            { _id: gameInfo._id },
            gameInfo,
            { upsert: true },
        ];
        collection.update(...details, (err, doc) => {
            handleError(err, reject);
            resolve(doc);
        });
    });
}

function findOnePriceAlert(collection, _id) {
    return new Promise((resolve, reject) => {
        const details = { _id: ObjectID(_id) };
        collection.findOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc);
        })
    });
}

function createOrUpdatePriceAlert(collection, priceAlertInfo) {
    return new Promise((resolve, reject) => {
        const details = [
            { game_id: priceAlertInfo.game_id, userEmail: priceAlertInfo.userEmail },
            priceAlertInfo,
            {
                upsert: true,
                returnNewDocument: true
            }
        ];
        collection.findOneAndUpdate(...details, (err, response) => {
            handleError(err, reject)
            resolve(response);
        });
    });
}

function deletePriceAlert(collection, userInfo) {
    return new Promise((resolve, reject) => {
        const details = { userEmail: userInfo.userEmail, game_id: userInfo.game_id };
        collection.deleteOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc);
        });
    });
}

function checkIfUserIsOnBlacklist(collection, userEmail) {
    return new Promise((resolve, reject) => {
        const details = { _id: userEmail };
        collection.findOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc !== null);
        });
    });
}

function addToBlacklist(collection, userEmail) {
    return new Promise((resolve, reject) => {
        const details = {
            _id: userEmail,
            dateAdded: new Date().getTime()
        };
        collection.insertOne(details, (err, doc) => {
            handleError(err, reject);
            resolve(doc !== null);
        });
    });
}

function handleError(err, reject) {
    if (err) {
        console.error(new Error(err));
        reject(err);
    }
}



module.exports = {
    findAllGames,
    findOneGame,
    createOrUpdateGame,
    findOnePriceAlert,
    createOrUpdatePriceAlert,
    deletePriceAlert,
    checkIfUserIsOnBlacklist,
    addToBlacklist
};