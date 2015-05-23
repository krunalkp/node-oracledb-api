// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var multer     = require('multer');
var app        = express();
var morgan     = require('morgan');
var OracleDB   = require("./DB").DB;

var db = new OracleDB();

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer());

var port     = 10000;//process.env.PORT || 8080; // set our port

// getting models
var Type = require("./Models/Type"),
    Owner = require("./Models/Owner"),
    Race = require("./Models/Race"),
    Animal = require("./Models/Animal"),
    Visit = require("./Models/Visit"),
    Operation = require("./Models/Operation"),


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
    console.log(req.body);
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
        // creating an animal
        var animal = new Animal(
            req.body.name,
            req.body.date,
            req.body.genre,
            req.body.race,
            req.body.owner
        );

        // creating connection to db
        db.connect().then(function(connection) {
            // performing insert
            db.insert(connection, "vet_animals", animal.toarray(), function(connection, data) {
                res.send(data);
                db.close(connection);
            });
        }).catch(function() {
            // something bad happened
            console.log("Error in post animal to db");
            res.send("Error in post animal to db");
        });
    })

    // get all the animal (accessed at GET http://localhost:8080/api/animal)
    .get(function(req, res) {
        // getting all
        db.connect().then(function(connection) {
            // querying for all the types
            db.selectAll(connection, "vet_animals", function(connection, data) {
                db.close(connection)
                res.send(data);
            });
        }).catch(function() {
            // error handling
            console.log("Error connecting to db");
            res.send("Error connecting to db");
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


// on routes that end in /type
// ----------------------------------------------------
router.route('/type')

    // create a bear (accessed at POST http://localhost:8080/type)
    .post(function(req, res) {
        // creating an type
        var type = new Type(
            req.body.type
        );
        console.log(type.toarray());
        // creating connection to db
        db.connect().then(function(connection) {
            // performing insert
            db.insert(connection, "vet_types", type.toarray(), function(connection, data) {
                res.send(data);
                db.close(connection);
            });
        }).catch(function() {
            // something bad happened
            console.log("Error in post type to db");
            res.send("Error in post type to db");
        });
    })

    // get all the type (accessed at GET http://localhost:8080/api/type)
    .get(function(req, res) {
        // getting all
        db.connect().then(function(connection) {
            // querying for all the types
            db.selectAll(connection, "vet_types", function(connection, data) {
                db.close(connection)
                res.send(data);
            });
        }).catch(function() {
            // error handling
            console.log("Error connecting to db");
            res.send("Error connecting to db");
        });
    });


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);