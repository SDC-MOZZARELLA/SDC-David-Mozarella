const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(express.static('public'));

app.get('/api/movie', (req, res) => {
  const { id } = req.query;
  db.getCasts(id)
    .then(data => {
      if (data.length === 0) {
        res.sendStatus(404);
      } else {
        data[0].casts.sort((a, b) => a.role - b.role);
        res.send(data[0].casts);
      }
    })
    .catch(err => {
      console.error('>>>', err);
      res.sendStatus(500);
    });
});

app.post('/api/movie', (req, res) => {
  console.log(req.body);
  db.saveMovie(req.body);
  res.sendStatus(200);
});

app.put('/api/movie', (req, res) => {
  console.log(req.query);
  db.modifyMovie(req.query);
  res.sendStatus(200);
});

app.delete('/api/movie', (req, res) => {
  console.log(req.query);
  db.deleteMovie(req.query.id);
  res.sendStatus(200);
});

module.exports = app;
