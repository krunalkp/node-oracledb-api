function Visit(date, animal, notes) {
    /*
        visita

        + codice visita
        - data
        - annotazioni
        > animale id
    */
    this.date = date;
    this.notes = notes;
    this.animal = animal;
    this.code = new Date().getTime();
}

// converting this object to json
Visit.prototype.tojson = function() {
    return JSON.stringify(this);
};

// exporting Visit module
module.exports = Visit;