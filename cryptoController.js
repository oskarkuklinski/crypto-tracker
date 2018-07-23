const request = require('request');

exports.crypto_list = function(req, res) {
    // coinmarketcap.com API request to get a list of cryptocurrencies
    request({
        url: 'https://api.coinmarketcap.com/v1/ticker/?limit=200',
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
        
        // Another request for a cryptocompare.com to get the logos of cryptocurrencies
        request({
            url: 'https://www.cryptocompare.com/api/data/coinlist/',
            json: true,
            method: "GET",
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10
        },(error, response, body) => {
            if (error) {
                return console.error('upload failed: ', error);
            }
            // Uploaded successfully
            // Take an image link from each of the crypto symbols listed
            // eval() changes string to an expression that allows for reaching the image link
            var cryptoSymbolUrls = [];
            cryptoSymbols.forEach(function(symbol) {
                if (eval("body.Data."+symbol) != undefined) {
                    cryptoSymbolUrls.push(eval("body.Data."+symbol+".ImageUrl"));
                } else {
                    cryptoSymbolUrls.push("No existing logo");
                }
            });
            res.render('index', {title: "Check your cryptocurrency!", cryptos, cryptoSymbolUrls });
        });
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
        res.render('crypto', {title: 'Crypto | ' + body.name, crypto: body }); 
    });
};