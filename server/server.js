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

})

app.post('/user', function(req, res) {
  console.log(req.body);
  User.create({
    name: req.body.id,
    password: req.body.pass
  })
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
