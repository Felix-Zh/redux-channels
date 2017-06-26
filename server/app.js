const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

var corsOptions = {
  credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/channel/Captain%20America', (req, res) => {
  setTimeout(() => {
    res.sendFile(path.resolve(__dirname, './captain-america.js'));
  }, 1000);
});

app.get('/channel/Iron%20Man', (req, res) => {
  setTimeout(() => {
    res.sendFile(path.resolve(__dirname, './iron-man.js'));
  }, 800);
});

app.get('/channel/Thor', (req, res) => {
  setTimeout(() => {
    res.sendFile(path.resolve(__dirname, './thor.js'));
  }, 600);
});

app.listen(4001, () => {
  console.log('Server is running at port 4001...');
});
