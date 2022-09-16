var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'deepakjain.mysql.database.azure.com',
  user: 'deepakjain@deepakjain',
  password: 'samar132@',
  database: 'backend'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected!');
});

module.exports = connection;