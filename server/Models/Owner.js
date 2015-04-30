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
}

// converting this object to json
Owner.prototype.tojson = function() {
    return JSON.stringify(this);
};

// exporting owner module
module.exports = Owner;