function Type(type) {
    /*
        tipo

        + type
    */
    this.type = type;
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

db.connect().then(function(value) {
    var query = "DROP TABLE vet_types PURGE";

    console.log("about to create table vet_types");
    db.execute(query, function(result, err) {

        if (err) {
            console.log(err);
            db.close();
            return;
        }

        query = "CREATE TABLE vet_types (";
        query += "type varchar2(20) NOT NULL, ";
        query += "CONSTRAINT vet_types_pk PRIMARY KEY (type))"

        db.execute(query, function(result, err) {
            if (err) {
                console.log(err);
                db.close();
                return;
            }
            // closing db
            db.close();
        });
    });
});

// exporting type module
module.exports = Type;