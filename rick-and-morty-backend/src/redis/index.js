const Redis = require('ioredis');
const { REDIS_HOST, REDIS_PORT, REDIS_PREFIX } = process.env;

const redis = new Redis({
    host: REDIS_HOST || 'localhost',
    port: REDIS_PORT || 6379
});

const PREFIX = REDIS_PREFIX || 'rm:';
const CACHE_TTL = 60 * 60;

function cacheKeyForFilters(filters) {
    const parts = Object.keys(filters || {}).sort().map(k => `${k}=${filters[k]}`);
    return PREFIX + 'chars:' + parts.join('|');
}

async function setToRedis(key, data) {
    return await redis.set(key, JSON.stringify(data), 'EX', CACHE_TTL);
}

async function getFromRedis(key) {
    return await redis.get(key);
}

module.exports = {
    cacheKeyForFilters,
    setToRedis,
    getFromRedis
};