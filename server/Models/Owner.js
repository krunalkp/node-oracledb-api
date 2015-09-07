function Owner(name, surname) {
    /*
        proprietario di animale

        - CF
        - nome
        - cognome
        - possiede animali
    */
    this.name = name;
    this.surname = surname;
    this.CF = new Date().getTime() + name + surname;
    this.CF = this.CF.slice(0, 20);
}

// converting this object to json
Owner.prototype.tojson = function() {
    return JSON.stringify(this);
};

// converting this object to array
Owner.prototype.toarray = function() {
    return [this.CF, this.name, this.surname];
}

// creating table inside db
//var OracleDB = require("../DB").DB;
//var db = new OracleDB();
Owner.create = function(db, callback) {
    db.connect().then(function(connection) {
        var query = "DROP TABLE vet_owners PURGE";

        console.log("about to create table vet_owners");
        db.execute(connection, query, function(connection, result, err) {

            if (err) {
                console.log(err);
                db.close(connection);
                return;
            }

            query = "CREATE TABLE vet_owners (";
            query += "cf VARCHAR2(20) PRIMARY KEY, ";
            query += "name VARCHAR2(20) NOT NULL, ";
            query += "surname VARCHAR2(20) NOT NULL)";

            db.execute(connection, query, function(connection, result, err) {
                if (err) {
                    console.log(err);
                    db.close(connection);
                    return;
                }
                // closing db
                db.close(connection);
                callback();
            });
        });
    });
}


// exporting owner module
module.exports = Owner;