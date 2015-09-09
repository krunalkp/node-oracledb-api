
// Query constructor
// --------------------
function Query(value, dbConnection) {
    this.string = value || "";
    this.dbConnection = dbConnection;
}

// from
Query.prototype.from = function(tablename) {
    this.string += " FROM "+ tablename;
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
    var self = this;
    if (this.dbConnection) {
        console.log(this.string);
        this.dbConnection.execute( this.string, function (err, result) {
            if (err) {
                // throwing error and closing connection
                self.dbConnection.release(function(err) {
                    if (err) {
                        // error even while trying to close db
                        if (callback) {
                            callback({status: "notok", message: "errore while closing connection"});
                        }
                    }
                });
            } else {
                // no errors, closing db and passing results to callback
                self.dbConnection.release(function(err) {
                    if (err) {
                        // error even while trying to close db
                        if (callback) {
                            callback({status: "notok", message: "errore while closing connection"});
                        }
                    } else {
                         // sending values to callback
                        if (callback) {
                            callback({status: "ok", message: result});
                        }
                    }
                });
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
                reject()
            } else {
                // temporary storing connection
                self.connection = true;
                // resolving promise
                resolve(connection);
            }
        });
    });

    // returning the promise
    return promise;
};

// releasing connection to database
DB.prototype.close = function(connection) {
    if (this.connection) {
        connection.release(function(err) {
            if (err) {
                throw new Error("error while closing connection");
            }
        });
    } else {
        throw new Error("nothing to close");
    }
};

// perform command
DB.prototype.execute = function(connection, command, callback) {
    if (this.connection) {
        connection.execute(command, function(err, result) {
            if (err) {
                callback(connection, {status: "notok", message: err});
            } else {
                if (callback) {
                    callback(connection, {status: "ok", message: result});
                }
            }
        });
    } else {
        callback(connection, {status: "notok", message: "no connection to db"});
    }
}

// insert
DB.prototype.insert = function(connection, tablename, params, callback) {
    if (this.connection) {
        var p = [];
        var query = "insert into " + tablename + " values("
        for (var i in params) {
            query += ":v" + i + ", ";
            //p['v'+i] = params[i];
            /*
            if (typeof(params[i]) == "string") {
                query += "'" + params[i] + "', ";
            } else {
                query += "" + params[i] + ", ";
            }*/
        }
        query = query.slice(0, query.length-2) + ")";
        console.log(query);
        console.log(p);
        try {
            connection.execute(query, params, {autoCommit: true, isAutoCommit: true}, function(err, result) {
                if (err) {
                    console.log("ERROR in executing insert for " + tablename +  " eerror: " + err);
                    if (callback) {
                        callback(connection, {status: "notok", message: err});
                    }
                } else {
                    if (callback) {
                        console.log("sending to callback for  " + tablename);
                        callback(connection, {status: "ok", message: result});
                    }
                }
            });
        } catch(e) {
            console.log("errore nell'inserimento in " + tablename);
            console.log(e);
        }
    } else {
        callback(connection, {status: "notok", message: "no connection to db"});
    }
};

// select
DB.prototype.select = function(connection, fields) {
    if (this.connection) {
        // creating querystring
        var queryString = "SELECT ";
        for (var i in fields) {
            queryString += fields[i] + ", ";
        }
        queryString = queryString.slice(0, queryString.length-2);
        var query = new Query(queryString, connection);
        // returning created query
        return query;
    } else {
        callback(connection, {status: "notok", message: "no connection to db"});
    }
};

// select all
DB.prototype.selectAll = function(connection, tablename, callback) {
    if (this.connection) {
        console.log("select * from " + tablename);
        connection.execute("select * from " + tablename, function(err, result) {
            if (err) {
                callback(connection, {status: "notok", message: err});
            } else {
                if (callback) {
                    callback(connection, {status: "ok", message: result});
                }
            }
        });
    } else {
        callback(connection, {status: "notok", message: "no connection to db"});
    }
};

// update
DB.prototype.update = function(connection, tablename, where_condition, fields, callback) {
    /*
        {
            "name": "newvalue",
            "cognome": "altrovalore"

        }
    */
    if (this.connection) {
        // creating query string
        var queryString = "UPDATE " + tablename + " SET ";
        var parseField = function(field) {
            if (typeof(field) == "number") return field;
            else return "'"+field+"'";
        }
        for (var k in fields) {
            queryString += "" + k + " = " + parseField(fields[k]) + ", ";
        }
        queryString = queryString.slice(0, queryString.length-2);
        queryString += " WHERE " + where_condition;
        
        console.log(queryString);
        connection.execute(queryString, {}, {autoCommit: true, isAutoCommit: true}, function(err, result) {
            console.log(err);
            console.log(result);
            if (err) {
                callback(connection, {status: "notok", message: err});
            } else {
                if (callback) {
                    callback(connection, {status: "ok", message: result});
                }
            }
        });
    } else {
        callback(connection, {status: "notok", message: "no connection to db"});
    }
};

// delete
DB.prototype.delete = function(connection, tablename, condition, callback) {
    if (this.connection) {
        // creating query string
        var queryString = "DELETE FROM " + tablename + " WHERE " + condition;
        console.log(queryString);
        connection.execute(queryString, {}, {autoCommit: true, isAutoCommit: true}, function(err, result) {
            if (err) {
                callback(connection, {status: "notok", message: err});
            } else {
                if (callback) {
                    callback(connection, {status: "ok", message: result});
                }
            }
        });
    } else {
        callback(connection, {status: "notok", message: "no connection to db"});
    }
}

module.exports.test = DB.prototype.update;
module.exports.DB = DB;
module.exports.Query = Query;