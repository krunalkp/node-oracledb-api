
// Query constructor
// --------------------
function Query(value, dbConnection) {
    this.string = value || "";
    this.dbConnection = dbConnection;
}

// from
Query.prototype.from = function(tablename) {
    this.string += " FROM "+ tablename + " ";
    return this;
};

// where
Query.prototype.where = function(field, condition, value) {
    this.string += " WHERE " + field + " " + condition + " " + value;
    return this;
}

// order by
Query.prototype.order = function(orderby) {
    this.string += " ORDER BY " + orderby;
    return this;
}

// execute
Query.prototype.execute = function(callback) {
    if (this.dbConnection) {
        this.dbConnection.execute( this.string, {}, function (err, result) {
            if (err) {
                // throwing error and closing connection
                this.dbConnection.release(function(err) {
                    if (err) {
                        // error even while trying to close db
                        throw new Error("error while closing connection");
                    }
                });
            } else {
                // no errors, closing db and passing results to callback
                this.dbConnection.release(function(err) {
                    if (err) {
                        // error even while trying to close db
                        throw new Error("error while closing connection");
                    }
                });
                // sending values to callback
                if (callback) {
                    callback(result);
                }
            }
        });
    } else {
        throw new Error("nothing to close");
    }
};

// DB CONSTRUCTOR
// --------------------
function DB() {
    // getting oracledb module
    this.oracledb = require("oracledb");
    // getting config
    this.config = require("./dbconfig");
    // promises
    this.Promise = require("promise");
    // temporary holding connection to db
    this.connection = undefined;
}

// connecting to db
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
                // temporary storing connection
                self.connection = connection;
                // resolving promise
                resolve("connection ok");
            }
        });
    });

    // returning the promise
    return promise;
};

// releasing connection to database
DB.prototype.close = function() {
    if (self.connection) {
        self.connection.release(function(err) {
            if (err) {
                throw new Error("error while closing connection");
            }
        });
    } else {
        throw new Error("nothing to close");
    }
};

// perform command
DB.prototype.execute = function(command, callback) {
    if (this.connection) {
        this.connection.execute(command, function(err, result) {
            if (err) {
                callback("ERROR", err);
            } else {
                if (callback) {
                    callback(result);
                }
            }
        });
    } else {
        callback("no connection to db");
    }
}

// insert
DB.prototype.insert = function(tablename, params) {
    if (this.connection) {
        var query = "INSERT INTO " + tablename + " VALUES ("
        for (var i in params) {
            query += ":" + i + ", ";
        }
        query = query.slice(0, query.length-2) + ")";
        this.connection.execute(query, params, function(err, result) {
            if (callback) {
                callback(result);
            }
        });
    } else {
        callback("no connection to db");
    }
};

// select
DB.prototype.select = function(tablename, fields) {
    if (this.connection) {
        // creating querystring
        var queryString = "SELECT ";
        for (var i in fields) {
            queryString += fields[i] + ", ";
        }
        queryString = queryString.slice(0, queryString.length-2);
        var query = new Query(queryString, this.connection);
        // returning created query
        return query;
    } else {
        callback("no connection to db");
    }
};

// select all
DB.prototype.selectAll = function(tablename, callback) {
    if (this.connection) {
        this.connection.execute("SELECT * FROM " + tablename, function(err, result) {
            if (callback) {
                callback(result);
            }
        });
    } else {
        callback("no connection to db");
    }
};

// update
DB.prototype.update = function() {};


module.exports.DB = DB;
module.exports.Query = Query;