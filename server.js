// server.js
// =============================================================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Device     = require('./app/models/device');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CONNECT TO DATABASE
// =============================================================================
mongoose.connect('mongodb://test:test@ds017862.mlab.com:17862/armoury-db'); // connect to our database

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open.');
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log("Something is happening");
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here



router.route('/devices')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var device = new Device();      // create a new instance of the Bear model
        device.name = req.body.name;  // set the devices name (comes from the request)
        device.type = req.body.type;
        device.os = req.body.os;
        device.version = req.body.version;
        device.model = req.body.model;
        device.checkout = req.body.checkout || new Date();
        device.checkin = req.body.checkin || new Date();
        device.user = req.body.user || null;

        // save the device and check for errors
        device.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Device created!' });
        });

    })
    .get(function(req, res){
    	res.json({message: 'here ya go'});
    });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);