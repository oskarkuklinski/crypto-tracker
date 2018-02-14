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

// Catch 404 error
app.use((req, res, next) => {
    const err = new Error('File not found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(8080, () => console.log('localhost:8080'));