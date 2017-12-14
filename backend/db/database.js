import { Client, Pool } from 'pg';


const connectionString = process.env.DATABASE_URL || require('../local-dev-creds').DATABASE_URL;
const pool = new Pool({
    connectionString,
    idleTimeoutMillis: 30000,
    max: 10
});

pool.on('error', (err, client) => console.error(getPoolStatus('error'), err));
pool.on('connect', client => console.log(getPoolStatus('connect')));
pool.on('acquire', client => console.log(getPoolStatus('acquire')));
pool.on('remove', client => console.log(getPoolStatus('remove')));

const getPoolStatus = event => ({
    event,
    total: pool.totalCount,
    idle: pool.idleCount,
    waiting: pool.waitingCount
});

// Ensure pool gets drained
process.on('SIGINT', () => {
    pool.end(); // Wait for all checked-out clients to be returned and then shut down all the clients and the pool timers
    console.log('PostgreSQL disconnected on app termination');
    process.exit(0);
});


// Run a query on the first available idle client and return its result
module.exports = {
    query: (text, params) => pool.query(text, params)
}
