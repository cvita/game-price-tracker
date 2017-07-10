const MongoClient = require('mongodb').MongoClient;
const database = require('../db/database').url;
const scrapeSony = require('./scrape');
const email = require('./email');


function checkPriceForEachGameInDatabase() {
    console.log('schedule.js: beginning script');

    MongoClient.connect(database, (err, db) => {
        if (err) {
            return console.error(new Error(err));
        }
        const today = new Date().getTime();
        
    });
};
