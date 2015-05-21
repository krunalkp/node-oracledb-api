function Type(type) {
    /*
        tipo

        + type
    */
    this.type = String(type);
}

// converting this object to json
Type.prototype.tojson = function() {
    return JSON.stringify(this);
};

Type.prototype.toarray = function() {
    return [this.type];
};

// creating table inside db
var OracleDB = require("../DB").DB;
var db = new OracleDB();

db.connect().then(function(connection) {
    var query = "DROP TABLE vet_types PURGE";

    console.log("about to create table vet_types");
    db.execute(connection, query, function(connection, result, err) {

        if (err) {
            console.log(err);
            db.close(connection);
            return;
        }

        query = "CREATE TABLE vet_types (";
        query += "type VARCHAR2(20) NOT NULL, ";
        query += "CONSTRAINT vet_types_pk PRIMARY KEY (type))"

        db.execute(connection, query, function(connection, result, err) {
            if (err) {
                console.log(err);
                db.close(connection);
                return;
            }
            // closing db
            db.close(connection);
        });
    });
});

// exporting type module
module.exports = Type;