'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  deviceId : String,
  name: String,
  description: String,
  status: Boolean,
  lat: Number,
  lng: Number,
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Device', DeviceSchema);