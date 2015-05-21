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
}

// exporting type module
module.exports = Type;