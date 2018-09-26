const request = require('request');
const session = require('express-session');

exports.crypto_list = function(req, res) {
    let reg_success = req.session.reg_session;
    // coinmarketcap.com API request to get a list of cryptocurrencies
    request({
        url: 'https://api.coinmarketcap.com/v1/ticker/?limit=100',
        json: true,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, (error, response, body) => {
        if (error) {
            return console.error('upload failed: ', error);
        }
        // Uploaded successfully
        var cryptos = body;
        var cryptoSymbols = [];
        cryptos.forEach(function(crypto) {
            cryptoSymbols.push(crypto.symbol);
        });
        
        res.render('index', {title: "Check your cryptocurrency!", message: "Check current top 100 cryptocurrencies", cryptos});
    });
};

exports.crypto_details = function(req, res) {
    // coinmarketcap.com request to get information about a specific coin
    request({
        url: 'https://api.coinmarketcap.com/v1/ticker/' + req.params.cryptoId + '/',
        json: true,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, (error, response, body) => {
        if (error) {
            return console.error('upload failed: ', error);
        }
        // Uploaded successfully
        res.render('crypto', {title: 'Crypto | ' + body[0].name, crypto: body }); 
    });
};