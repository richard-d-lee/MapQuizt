const express = require('express');
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', { name: String, password: String, score: Number });

const app = express();

const PORT = 3005;

var getIndexBelowMaxForKey = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

app.use(express.static(path.join(__dirname, '/../dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/user', function(req, res) {
  User.findOne({ name: req.query.id })
  .then((data) => {
    if (data !== null) {
      if (data.password === getIndexBelowMaxForKey(req.query.password, 5000000).toString()) {
        res.send('logged')
      } else {
        res.send('passInvalid')
      }
    } else {
      res.send('nonexistent')
    }
  })
})

app.put('/user', function (req, res) {
  console.log(req.body)
  User.findOneAndUpdate({ name: req.body.body.id }, { score: req.body.body.score })
  .then(() => {
    res.send('updated')
  })
})

app.get('/leaderboard', function (req, res) {
  User.find()
  .then((data) => {
    console.log(data);
    let scoreArr = [];
    for (let i = 0; i < data.length; i++) {
      scoreArr.push([data[i].name, data[i].score])
    }
    res.send(scoreArr);
  })
})

app.post('/user', function(req, res) {
  console.log(req.body)
  User.findOne({ name: req.body.body.id })
  .then((data) => {
    if (data !== null) {
      res.send('error')
    } else {
      User.create({
        name: req.body.body.id,
        password: getIndexBelowMaxForKey(req.body.body.pass, 5000000),
        score: 0
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
