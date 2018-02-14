const request = require('request');

exports.crypto_list = function(req, res) {
    request({
        url: 'https://api.coinmarketcap.com/v1/ticker/?limit=50',
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
        res.render('index', {title: "Check your cryptocurrency!", cryptos: body });
    });
};

exports.crypto_details = function(req, res) {
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
        res.render('crypto', {title: 'Crypto | ' + body.name, crypto: body }); 
    });
};