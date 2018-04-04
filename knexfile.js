// Update with your config settings.
const settings = require("./settings");
const pg = require("pg");

module.exports = {

    development: {
        client: 'pg',
        connection: {
            filename: 'settings',
            user: settings.user,
            password: settings.password,
            database: settings.database,
            host: settings.hostname,
            port: settings.port,
            ssl: settings.ssl
        }
    }
};