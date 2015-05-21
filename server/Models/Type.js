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
};

// creating table inside db
var db = require("../DB").DB;
db.connect().then(function(value) {
    var query = "DROP TABLE vet_types;"
    query += "CREATE TABLE vet_types (type TEXT(20) NOT NULL PRIMARY KEY);";
    query += "COMMIT";

    console.log("about to create table vet_types");
    db.execute(query, function(result) {
        console.log(result);
    });
});

// exporting type module
module.exports = Type;