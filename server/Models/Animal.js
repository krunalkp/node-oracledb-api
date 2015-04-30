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

// exporting animal module
module.exports = Animal;