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

// converting this object to array
Operation.prototype.toarray = function() {
    return [this.type];
}

// creating table inside db
//var OracleDB = require("../DB").DB;
//var db = new OracleDB();

Operation.create = function(db, callback) {

    function createVisitOperationsTable() {
        db.connect().then(function(connection) {
            var query = "DROP TABLE vet_visit_operations PURGE";

            console.log("about to create table vet_visit_operations");
            db.execute(connection, query, function(connection, result, err) {

                if (err) {
                    console.log(err);
                    db.close(connection);
                    return;
                }

                query = "CREATE TABLE vet_visit_operations (";
                query += "visit VARCHAR2(20) NOT NULL, ";
                query += "operation VARCHAR2(20) NOT NULL, ";
                query += "CONSTRAINT fk_vet_visit_operations FOREIGN KEY (visit) REFERENCES vet_visits(code) ON DELETE CASCADE, "
                query += "CONSTRAINT fk_vet_visit_operations FOREIGN KEY (operation) REFERENCES vet_operations(type) ON DELETE CASCADE, "
                query += "CONSTRAINT vet_visit_operations_pk PRIMARY KEY (visit, operation))"

                db.execute(connection, query, function(connection, result, err) {
                    if (err) {
                        console.log(err);
                        db.close(connection);
                        return;
                    }
                    // closing db
                    db.close(connection);
                    callback();
                });
            });
        });
    }

    db.connect().then(function(connection) {
        var query = "DROP TABLE vet_operations PURGE";

        console.log("about to create table vet_operations");
        db.execute(connection, query, function(connection, result, err) {

            if (err) {
                console.log(err);
                db.close(connection);
                return;
            }

            query = "CREATE TABLE vet_operations (";
            query += "type VARCHAR2(20) NOT NULL, ";
            query += "CONSTRAINT vet_operations_pk PRIMARY KEY (type))"

            db.execute(connection, query, function(connection, result, err) {
                if (err) {
                    console.log(err);
                    db.close(connection);
                    return;
                }
                // closing db
                db.close(connection);

                // we now must create the vet_visits_operations table
                createVisitOperationsTable();
            });
        });
    });
}


// exporting operation module
module.exports = Operation;