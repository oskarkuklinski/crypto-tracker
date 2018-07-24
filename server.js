require('dotenv').load();
const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const app = express();

// require a file with the API
const crypto = require('./cryptoController.js');
const User = require('./User.js');

// Connect to MongoDB
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds145881.mlab.com:45881/crypto-tracker`, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('MongoDB connected!');   
    }
});

// configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false
    })
);

// use express-flash
app.use(flash());

// middleware to save session messages
app.use(function(req, res, next) {
  res.locals.messages = req.session.messages
  next()
})

// set pug as a view engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// path for static client files
app.use(express.static(path.join(__dirname, './public')));

// 0. Main page with a list of cryptocurrencies
// ----------------------------------------
app.get('/', crypto.crypto_list);

// 1. GET Register page
// ----------------------------------------
app.get('/register', function(req, res) {
    res.render('register', { title: "Crypto Tracker | Register", message: req.flash('fail') } );
});

// 2. POST Register page
// -----------------------------------------
app.post('/register', function(req, res) {
    let {email, username, password, passwordConfirm} = req.body;
    
    if (password == passwordConfirm) {
        let userData = {
            email,
            username,
            // password values are hashed before saving into database
            password: bcrypt.hashSync(password, 5),
        };

        let newUser = new User(userData);
        newUser.save().then((error) => {
            if (error) {
                // go to the main page and send a message if everything was ok
                req.flash('success', 'Registration complete! You can log in now.');
                return res.status(201).redirect('/');
            } else {
                if (error.code === 11000) { // if that record already exists
                    return res.status(409).send('user already exists!');
                } else {
                    // any other error returns this
                    console.log(JSON.stringify(error, null, 2));
                    return res.status(500).send('error registering user');
                }
            }
        })
    } else {
        // create a fail message and redirect back to the register page
        req.flash('fail', 'Both fields should contain the same password.');
        res.redirect('/register');
    }
});

// 3. Login page
// -----------------------------------------
app.get('/login', function(req, res) {
    res.render('login', { title: "Crypto Tracker | Log In" } );
});

// 4. Page with the details of a single cryptocurrency
// -------------------------------------------
app.get('/crypto/:cryptoId', crypto.crypto_details);

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