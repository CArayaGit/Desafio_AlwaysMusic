const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'alwaysmusic',
    password: 'controlactivo',
    port: 5432,
});

client
    .connect()
    .then(() => console.log('db conectada'))
    .catch((e) => console.log('Error de conexión' + e));

/*
client.query("SELECT NOW()", (err, res) => {
        console.log(err, res);
        client.end();
    });
*/

module.exports = client;