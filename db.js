const mysql = require("mysql");

const connection = mysql.createConnection({
  host: 'airportdb.cwymmiuclozc.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: '12345678',
  database: 'airportdb'
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ', err);
    } else {
      console.log('Connected to database successfully');
    }
});

module.exports = connection;