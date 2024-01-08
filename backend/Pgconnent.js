
// node.js와 postgreSQL을 연결

var {Client} = require('pg');

const client = new Client({
    user : "postgres",
    host : "localhost",
    database : "postgres",
    password : "4485",
    port : 5432,
});

client.connect()

