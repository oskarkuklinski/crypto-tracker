const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const app = express();

const crypto = require('./cryptodata.js');

app.set('view engine', 'pug');

app.get('/', crypto.crypto_list);

app.listen(8080, () => console.log('localhost:8080'));