// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var db         = new require("./DB")();

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = 10000;//process.env.PORT || 8080; // set our port

// getting models
var Animal = require("./Models/Animal"),
    Operation = require("./Models/Operation"),
    Owner = require("./Models/Owner"),
    Race = require("./Models/Race"),
    Type = require("./Models/Type"),
    Visit = require("./Models/Visit");

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ status: true, msg: 'Connected!'});
});

// on routes that end in /animal
// ----------------------------------------------------
router.route('/animal')

    // create a bear (accessed at POST http://localhost:8080/animal)
    .post(function(req, res) {
        // creating a 
    })

    // get all the animal (accessed at GET http://localhost:8080/api/animal)
    .get(function(req, res) {
        // getting all
        console.log("trying to connect to db using promises");
        db.connect().then(function(value) {
            console.log(value);
        }).catch(function() {
            console.log("errore");
        });
    });

// on routes that end in /animal/:bear_id
// ----------------------------------------------------
router.route('/animal/:_id')

    // get the bear with that id
    .get(function(req, res) {
        // req.params._id
        // req.body.param
    })

    // update the bear with this id
    .put(function(req, res) {
        // aggiornamento
    })

    // delete the bear with this id
    .delete(function(req, res) {
        // rimozione 
    });


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);