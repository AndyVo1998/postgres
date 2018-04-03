const settings = require("./settings");
const pg = require("pg");

const knex = require("knex")({
    client: 'pg',
    connection: {
        user: settings.user,
        password: settings.password,
        database: settings.database,
        host: settings.hostname,
        port: settings.port,
        ssl: settings.ssl
    }
});

const name = [process.argv[2]];

knex.select().from('famous_people')
    .where('first_name', `${name}`)
    .orWhere('last_name', `${name}`)
    .asCallback(function(err, rows) {
        if (err) {
            console.error(err);
        } else {
            let count = 1;
            console.log("Searching ...");
            console.log("Found " + rows.length + " person(s) by the name '" + name + "':");
            rows.forEach(function(e) {
                let birthday = e.birthdate.toISOString().slice(0, 10);
                console.log("-" + count + ": " + e.first_name + " " + e.last_name + ", born " + "'" + birthday + "'");
                count++;
            })
        }
        process.exit();
    })