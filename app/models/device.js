// app/models/device.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DeviceSchema   = new Schema({
    name: String,
    type: String,
    os: String,
    version: String,
    model: String,
    checkout: Date,
    checkin: Date,
    user: String
});

module.exports = mongoose.model('Device', DeviceSchema);