function Animal(name, date, genre, race, owner) {
    /*
        animale
        
        + codice
        - nome
        - data di nascita
        - genere (gatto, cane, cavallo)
        > razza (persiano, alano)
        > owner (codice fiscale del proprietario)
    */
    this.name = name;
    this.date = date;
    this.genre = genre;
    this.race = race;
    this.owner = owner;
    this.code = new Date().getTime();
}

// converting this object to json
Animal.prototype.tojson = function() {
    return JSON.stringify(this);
};

// converting this object to array
Animal.prototype.toarray = function() {
    return [this.code, this.name, this.date, this.genre, this.race, this.owner];
}

// creating table inside db
var OracleDB = require("../DB").DB;
var db = new OracleDB();

db.connect().then(function(connection) {
    var query = "DROP TABLE vet_animals PURGE";

    console.log("about to create table vet_animals");
    db.execute(connection, query, function(connection, result, err) {

        if (err) {
            console.log(err);
            db.close(connection);
            return;
        }

        query = "CREATE TABLE vet_animals (";
        query += "code NUMBER NOT NULL, "
        query += "name VARCHAR2(20) NOT NULL, "
        query += "date VARCHAR2(20) NOT NULL, "
        query += "genre VARCHAR2(20) NOT NULL, "
        query += "race VARCHAR2(20) NOT NULL, "
        query += "owner VARCHAR2(20) NOT NULL, "
        query += "type VARCHAR2(20) NOT NULL, ";
        query += "CONSTRAINT vet_animals_pk PRIMARY KEY (code), "
        query += "CONSTRAINT fk_vet_animals FOREIGN KEY (owner) REFERENCES vet_owners(cf) ON UPDATE CASCADE ON DELETE CASCADE, "
        query += "CONSTRAINT fk_vet_animals FOREIGN KEY (race) REFERENCES vet_races(race) ON UPDATE CASCADE ON DELETE CASCADE)"

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


// exporting animal module
module.exports = Animal;