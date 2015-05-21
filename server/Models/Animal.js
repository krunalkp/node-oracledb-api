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

db.connect().then(function(value) {
    var query = "DROP TABLE vet_animals PURGE";

    console.log("about to create table vet_animals");
    db.execute(query, function(result, err) {

        if (err) {
            console.log(err);
            db.close();
            return;
        }

        query = "CREATE TABLE vet_animals (";
        query += "type varchar2(20) NOT NULL, ";
        query += "CONSTRAINT vet_animals_pk PRIMARY KEY (type))"

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

// exporting animal module
module.exports = Animal;