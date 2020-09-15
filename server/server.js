const express = require('express');
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', { name: String, password: String });

const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, '/../dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/user', function(req, res) {
  console.log(req.query)
  User.findOne({ name: req.query.id })
  .then((data) => {
    if (data !== null) {
      console.log(data)
      if (data.password === req.query.password) {
        res.send('logged')
      } else {
        res.send('passInvalid')
      }
    } else {
      res.send('nonexistent')
    }
  })
})

app.post('/user', function(req, res) {
  User.findOne({ name: req.body.body.id })
  .then((data) => {
    if (data !== null) {
      res.send('error')
    } else {
      User.create({
        name: req.body.body.id,
        password: req.body.body.pass
      })
      .then(() => {
        console.log('created');
        res.send('created')
      })
    }
  })
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
