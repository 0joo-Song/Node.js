const maria = require('mysql');

const conn = maria.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'dudwn12#$',
    database: 'nodebird'
});

module.exports = conn;