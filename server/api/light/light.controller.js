/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lights              ->  index
 */

'use strict';

var _ = require('lodash');
var Device = require('../device/device.model');
var http = require("http");
var https = require("https");

// Gets a list of Lights
exports.show = function(req, res) {

    Device.find({
        deviceId: req.params.id
    }, function(err, device) {
        if (err) {
            return handleError(res, err);
        }
        if (!device) {
            return res.status(404).send('Not Found');
        } else {

            getWeather(device[0].lat, device[0].lng, function(weather) {
                return res.status(200).json(weather.currently);
            });
        }
    });
}

function getWeather(lat, lng, callback) {

	//https://developer.forecast.io/docs/v2
    var options = {
        host: 'api.forecast.io',
        port: 443,
        path: '/forecast/b290219f260ca3a384400c3a019b21fd/',
        method: 'GET',
        json: true
    };

    options.path += lat + "," + lng + "?units=si&exclude=daily,flags";

    getJson(options, function(statusCode, result) {
        callback(result);
    });
}


function getJson(options, onResult) {

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res) {

        // Buffer the body entirely for processing as a whole.
        var data = [];
        res.on('data', function(chunk) {
            data.push(chunk);
        }).on('end', function() {
            onResult(res.statusCode, JSON.parse(data.join('')));
        });

    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();

};