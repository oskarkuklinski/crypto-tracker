require('dotenv').load();
const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// require a file with the API
const crypto = require('./cryptoController.js');

// Connect to MongoDB
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds145881.mlab.com:45881/crypto-tracker`, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('MongoDB connected!');   
    }
});

// set pug as a view engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// path for static client files
app.use(express.static(path.join(__dirname, './public')));

app.get('/', crypto.crypto_list);

app.get('/crypto/:cryptoId', crypto.crypto_details);

app.get('/register', function(req, res) {
    console.log('register page');
});

app.get('/login', function(req, res) {
    console.log('login page');
});

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