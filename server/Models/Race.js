function Race(race, type) {
    /*
        razza
        
        + razza
        > tipo
    */
    this.race = race;
    this.type = type;
}

// converting this object to json
Race.prototype.tojson = function() {
    return JSON.stringify(this);
}

// converting this object to array
Race.prototype.toarray = function() {
    return [this.race, this.type];
}

// creating table inside db
var OracleDB = require("../DB").DB;
var db = new OracleDB();

db.connect().then(function(connection) {
    var query = "DROP TABLE vet_races PURGE";

    console.log("about to create table vet_races");
    db.execute(connection, query, function(connection, result, err) {

        if (err) {
            console.log(err);
            db.close(connection);
            return;
        }

        query = "CREATE TABLE vet_races (";
        query += "race VARCHAR2(20) NOT NULL, ";
        query += "type VARCHAR2(20) NOT NULL, ";
        query += "CONSTRAINT vet_races_pk PRIMARY KEY (race), ";
        query += "CONSTRAINT fk_vet_races FOREIGN KEY (type) REFERENCES vet_types(type) ON DELETE CASCADE)";

            /*
        query = "CREATE TABLE vet_races(";
        query += "race VARCHAR2(20) PRIMARY KEY, ";
        query += "type VARCHAR2(20) NOT NULL CONSTRAINT fk_vet_races REFERENCES vet_types(type) ON UPDATE CASCADE ON DELETE CASCADE)";
*/
        console.log(query);

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

// exporting race module
module.exports = Race;