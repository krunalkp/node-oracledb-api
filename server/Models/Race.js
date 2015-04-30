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

// exporting race module
module.exports = Race();