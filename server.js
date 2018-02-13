const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const app = express();

// require a file with CryptoMarketCap API
const crypto = require('./cryptoController.js');

// set pug as a view engine
app.set('view engine', 'pug');

// path for static client files
app.use(express.static('public'));

app.get('/', crypto.crypto_list);

app.get('/:cryptoId', crypto.crypto_details);

app.listen(8080, () => console.log('localhost:8080'));