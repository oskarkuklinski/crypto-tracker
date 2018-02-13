const request = require('request');

exports.crypto_list = function(req, res) {
    request({
        url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
        json: true,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.render('index', {title: "Check your cryptocurrency!", cryptos: body });
        } else {
            console.log('error' + response.statusCode);   
        }
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
        if (!error && response.statusCode == 200) {
            res.render('crypto', {title: 'Crypto | ' + body[0].name, crypto: body[0] });   
        } else {
            console.log('error' + response.statusCode);   
        }
    });
};