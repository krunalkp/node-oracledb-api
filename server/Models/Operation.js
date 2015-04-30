function Operation(type) {
    /*
        operazione

        + type
    */
    this.type = type;
}

// converting this object to json
Operation.prototype.tojson = function() {
    return JSON.stringify(this);
};

// exporting operation module
module.exports = Operation;