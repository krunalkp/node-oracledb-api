/*
    DB handler class
*/
function DB() {
    // getting oracledb module
    this.oracledb = require("oracledb");
    // getting config
    this.config = require("./dbconfig");
}

DB.prototype.connect = function() {
    //connecting to db using oracledb.getconnection
    this.oracledb.getConnection({
        // user informations
        user          : dbConfig.user,
        password      : dbConfig.password,
        connectString : dbConfig.connectString
    }, function(err, connection) {
        if (err) {
            console.log("si è verificato un errore");
            console.log(err);
            console.error(err.message);
            return;
        }
        console.log('Connection was successful!');

        connection.release(function(err) {
            if (err) {
                console.error(err.message);
                return;
            }
        });
    });
}