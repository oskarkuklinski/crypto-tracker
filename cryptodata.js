const request = require('request');

exports.crypto_list = function(req, res) {
    request('https://api.coinmarketcap.com/v1/ticker/', {json: true}, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.render('index', {title: "Hello", cryptos: body });
        }
    });
};