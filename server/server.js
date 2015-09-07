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
    Operation = require("./Models/Operation");


// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    //res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
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
        db.connect().then(function(connection) {
            db.select(connection, "*").from("vet_animals").where("code", "=", "'" + req.params._id + "'").execute(function(data) {
                res.send(data);
            });
        });
    })

    // update the bear with this id
    .put(function(req, res) {
        // aggiornamento
        db.connection().then(function(connection) {
            db.update(connection, "vet_animals", req.body, function() {
                db.close(connection);
                res.send(data);
            });
        });
    })

    // delete the bear with this id
    .delete(function(req, res) {
        // rimozione 
        db.connect().then(function(connection) {
            db.delete(connection, "vet_animals", "code = " + req.params._id, function(data) {
                db.close(connection);
                res.send(data)
            });
        })
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

// on routes that end in /owner
// ----------------------------------------------------
router.route('/owner')

    // create a bear (accessed at POST http://localhost:8080/owner)
    .post(function(req, res) {
        // creating an owner
        var owner = new Owner(
            req.body.name,
            req.body.surname
        );
        console.log(owner.toarray());
        // creating connection to db
        db.connect().then(function(connection) {
            // performing insert
            db.insert(connection, "vet_owners", owner.toarray(), function(connection, data) {
                console.log("data received");
                console.log(data);
                res.send(data);
                db.close(connection);
            });
        }).catch(function() {
            // something bad happened
            console.log("Error in post owner to db");
            res.send("Error in post owner to db");
        });
    })

    // get all the owner (accessed at GET http://localhost:8080/api/owner)
    .get(function(req, res) {
        // getting all
        db.connect().then(function(connection) {
            // querying for all the types
            db.selectAll(connection, "vet_owners", function(connection, data) {
                db.close(connection)
                res.send(data);
            });
        }).catch(function() {
            // error handling
            console.log("Error connecting to db");
            res.send("Error connecting to db");
        });
    });

// on routes that end in /owner/:bear_id
// ----------------------------------------------------
router.route('/owner/:_id')

    // get the bear with that id
    .get(function(req, res) {
        // req.params._id
        // req.body.param
        db.connect().then(function(connection) {
            db.select(connection, "*").from("vet_owners").where("cf", "=", "'" + req.params._id + "'").execute(function(data) {
                res.send(data);
            });
        });
    })

    // update the bear with this id
    .put(function(req, res) {
        // aggiornamento
        db.connect().then(function(connection) {
            db.update(connection, "vet_owners", req.body, function(connection, data) {
                db.close(connection);
                res.send(data);
            });
        });
    })

    // delete the bear with this id
    .delete(function(req, res) {
        // rimozione 
        db.connect().then(function(connection) {
            db.delete(connection, "vet_owners", "cf = '" + req.params._id + "'", function(connection, data) {
                db.close(connection);
                console.log(data);
                res.send(data);
            });
        })
    });

// on routes that end in /race
// ----------------------------------------------------
router.route('/race')

    // create a bear (accessed at POST http://localhost:8080/race)
    .post(function(req, res) {
        // creating an race
        var race = new Race(
            req.body.race,
            req.body.type
        );

        // creating connection to db
        db.connect().then(function(connection) {
            // performing insert
            db.insert(connection, "vet_races", race.toarray(), function(connection, data) {
                res.send(data);
                db.close(connection);
            });
        }).catch(function() {
            // something bad happened
            console.log("Error in post race to db");
            res.send("Error in post race to db");
        });
    })

    // get all the race (accessed at GET http://localhost:8080/api/race)
    .get(function(req, res) {
        // getting all
        db.connect().then(function(connection) {
            // querying for all the types
            db.selectAll(connection, "vet_races", function(connection, data) {
                db.close(connection)
                res.send(data);
            });
        }).catch(function() {
            // error handling
            console.log("Error connecting to db");
            res.send("Error connecting to db");
        });
    });

// on routes that end in /race/:bear_id
// ----------------------------------------------------
router.route('/race/:_id')

    // get the bear with that id
    .get(function(req, res) {
        // req.params._id
        // req.body.param
        db.connect().then(function(connection) {
            db.select(connection, "*").from("vet_races").where("race", "=", "'" + req.params._id + "'").execute(function(data) {
                res.send(data);
            });
        });
    })

    // update the bear with this id
    .put(function(req, res) {
        // aggiornamento
        db.connection().then(function(connection) {
            db.update(connection, "vet_races", req.body, function() {
                db.close(connection);
                res.send(data);
            });
        });
    })

    // delete the bear with this id
    .delete(function(req, res) {
        // rimozione 
        db.connect().then(function(connection) {
            db.delete(connection, "vet_races", "race = " + req.params._id, function(data) {
                db.close(connection);
                res.send(data);
            });
        })
    });

// on routes that end in /operation
// ----------------------------------------------------
router.route('/operation')

    // create a bear (accessed at POST http://localhost:8080/operation)
    .post(function(req, res) {
        // creating an operation
        var operation = new Operation(
            req.body.type
        );

        // creating connection to db
        db.connect().then(function(connection) {
            // performing insert
            db.insert(connection, "vet_operations", operation.toarray(), function(connection, data) {
                res.send(data);
                db.close(connection);
            });
        }).catch(function() {
            // something bad happened
            console.log("Error in post operation to db");
            res.send("Error in post operation to db");
        });
    })

    // get all the operation (accessed at GET http://localhost:8080/api/operation)
    .get(function(req, res) {
        // getting all
        db.connect().then(function(connection) {
            // querying for all the types
            db.selectAll(connection, "vet_operations", function(connection, data) {
                db.close(connection)
                res.send(data);
            });
        }).catch(function() {
            // error handling
            console.log("Error connecting to db");
            res.send("Error connecting to db");
        });
    });

// on routes that end in /operation/:bear_id
// ----------------------------------------------------
router.route('/operation/:_id')

    // get the bear with that id
    .get(function(req, res) {
        // req.params._id
        // req.body.param
        db.connect().then(function(connection) {
            db.select(connection, "*").from("vet_operations").where("type", "=", "'" + req.params._id + "'").execute(function(data) {
                res.send(data);
            });
        });
    })

    // update the bear with this id
    .put(function(req, res) {
        // aggiornamento
        db.connection().then(function(connection) {
            db.update(connection, "vet_operations", req.body, function() {
                db.close(connection);
                res.send(data);
            });
        });
    })

    // delete the bear with this id
    .delete(function(req, res) {
        // rimozione 
        db.connect().then(function(connection) {
            db.delete(connection, "vet_operations", "type = " + req.params._id, function(data) {
                db.close(connection);
                res.send(data);
            });
        })
    });

// on routes that end in /visit
// ----------------------------------------------------
router.route('/visit')

    // create a bear (accessed at POST http://localhost:8080/visit)
    .post(function(req, res) {
        // creating an visit
        var visit = new Visit(
            req.body.date,
            req.body.animal,
            req.body.notes
        );

        // creating connection to db
        db.connect().then(function(connection) {
            // performing insert
            db.insert(connection, "vet_visits", visit.toarray(), function(connection, data) {
                res.send(data);
                db.close(connection);
            });
        }).catch(function() {
            // something bad happened
            console.log("Error in post visit to db");
            res.send("Error in post visit to db");
        });
    })

    // get all the visit (accessed at GET http://localhost:8080/api/visit)
    .get(function(req, res) {
        // getting all
        db.connect().then(function(connection) {
            // querying for all the types
            db.selectAll(connection, "vet_visits", function(connection, data) {
                db.close(connection)
                res.send(data);
            });
        }).catch(function() {
            // error handling
            console.log("Error connecting to db");
            res.send("Error connecting to db");
        });
    });

// on routes that end in /visit/:bear_id
// ----------------------------------------------------
router.route('/visit/:_id')

    // get the bear with that id
    .get(function(req, res) {
        // req.params._id
        // req.body.param
        db.connect().then(function(connection) {
            db.select(connection, "*").from("vet_visits").where("code", "=", "'" + req.params._id + "'").execute(function(data) {
                res.send(data);
            });
        });
    })

    // update the bear with this id
    .put(function(req, res) {
        // aggiornamento
        db.connection().then(function(connection) {
            db.update(connection, "vet_visits", req.body, function() {
                db.close(connection);
                res.send(data);
            });
        });
    })

    // delete the bear with this id
    .delete(function(req, res) {
        // rimozione 
        db.connect().then(function(connection) {
            db.delete(connection, "vet_visits", "code = " + req.params._id, function(data) {
                db.close(connection);
                res.send(data);
            });
        })
    });

// on routes that end in /visit/:bear_id
// ----------------------------------------------------
router.route('/visitby/:_id')

    // get the bear with that id
    .get(function(req, res) {
        // req.params._id
        // req.body.param
        db.connect().then(function(connection) {
            db.select(connection, "*").from("vet_visits").where("animal", "=", "'" + req.params._id + "'").execute(function(data) {
                res.send(data);
            });
        });
    })

// on routes that end in /visit/:bear_id
// ----------------------------------------------------
router.route('/animalby/:_id')

    // get the bear with that id
    .get(function(req, res) {
        // req.params._id
        // req.body.param
        db.connect().then(function(connection) {
            db.select(connection, "*").from("vet_animals").where("owner", "=", "'" + req.params._id + "'").execute(function(data) {
                res.send(data);
            });
        });
    })

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);