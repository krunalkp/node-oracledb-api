/*
    DB handler class
*/
function DB() {
    // getting oracledb module
    this.oracledb = require("oracledb");
    // getting config
    this.config = require("./dbconfig");
    // promises
    this.Promise = require("promise");
}

DB.prototype.connect = function() {
    var self = this;
    var promise = new this.Promise(function(resolve, reject) {
         self.oracledb.getConnection({
            // user informations
            user          : self.config.user,
            password      : self.config.password,
            connectString : self.config.connectString
        }, function(err, connection) {
            if (err) {
                console.log("si è verificato un errore");
                console.log(err);
                console.error(err.message);
                // rejecting promise
                reject("no able to connect to db")
            } else {
                /*
                connection.release(function(err) {
                    if (err) {
                        console.error(err.message);
                        return;
                    }
                });*/
                // resolving promise
                resolve("connection ok");
            }
        });
    });

    // returning the promise
    return promise;
   
};


module.exports = DB;