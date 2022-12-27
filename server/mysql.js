const mysql = require("mysql2");
const db = require("./database.json");

const connection = mysql.createConnection({
  host: "localhost",
  user: db.dev.user,
  database: db.dev.database,
  password: db.dev.password,
  port: db.dev.port
});

connection.connect(function(err){
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

module.exports = connection
