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

    var minHour,
        maxHour;

    Device.find({
        deviceId: req.params.id
    }, function(err, device) {
        if (err) {
            return handleError(res, err);
        }
        if (!device) {
            return res.status(404).send('Not Found');
        } else {

            minHour = device[0].minHour;
            maxHour = device[0].maxHour;
            console.log(new Date().getTime())
            getWeather(device[0].lat, device[0].lng, function(weather) {

                var json = {
                    minHour : {
                        probability : 0,
                        intensity : 0,
                    },
                    maxHour : {
                        probability : 0,
                        intensity : 0,
                    }
                };

                json.minHour.probability = weather.hourly.data[minHour].precipProbability;
                json.maxHour.probability = weather.hourly.data[maxHour].precipProbability;
                json.minHour.icon = weather.hourly.data[minHour].icon;
                json.maxHour.icon = weather.hourly.data[maxHour].icon;
                json.minHour.intensity = weather.hourly.data[minHour].precipIntensity;
                json.maxHour.intensity = weather.hourly.data[maxHour].precipIntensity;

                return res.status(200).json(json);
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

    options.path += lat + "," + lng + "," + Math.floor(new Date().getTime() / 1000) + "?units=si&exclude=daily,flags";

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