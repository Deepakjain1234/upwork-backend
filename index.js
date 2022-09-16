const express = require('express');
// const mailer = require('./modules/mailer')
var db = require('./db/db');
const app = express();
const cors = require('cors');
const config = require('./config.json');
var bodyParser = require('body-parser');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.use(bodyParser.json());


// api for user
app.post('/register', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  var data={name:name,email:email,password:password}

  var sql = `INSERT INTO users SET ? `;
  db.query(sql,data,function(err, result) {
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success'})
  })
});

app.get("/", (req, res) => {
  res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
});

app.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  var sql = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;
    db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'invalid' })
    }
    // res.json(rows)
    res.json({rows})
  })
});

app.post('/loginwithgoogle', function(req, res, next) {
  var email = req.body.email;

  var sql = `SELECT * FROM users WHERE email='${email}'`;
    db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'invalid' })
    }
    // res.json(rows)
    res.json({rows})
  })
});





app.listen(8000, () => {
    console.log('server start at http://127.0.0.1:8000/');
})
