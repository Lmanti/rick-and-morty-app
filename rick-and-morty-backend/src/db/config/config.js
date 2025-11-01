const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

module.exports = {
    development: {
        username: DB_USER || 'postgres',
        password: DB_PASS || 'postgres',
        database: DB_NAME || 'rickmorty',
        host: DB_HOST || '127.0.0.1',
        port: DB_PORT || 5432,
        dialect: 'postgres'
    },
    production: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres'
    }
};