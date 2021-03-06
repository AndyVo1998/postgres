const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [process.argv[2]], (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        let count = 1;
        console.log("Searching ... ")
        console.log("Found " + result.rows.length + " person(s) by the name '" + process.argv[2] + "':")
        result.rows.forEach(function(e) {
            let birthday = e.birthdate.toISOString().slice(0, 10)
            console.log("-" + count + ": " + e.first_name + " " + e.last_name + ", born " + "'" + birthday + "'");
            count++;
        })
        client.end();
    });
});