const sql = require('mysql2');

const db = sql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '2005',
  database: 'mydb'
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to mySql:", err);
    return;
  }
  console.log("Connected to mySql dataBase");
})
module.exports = db;