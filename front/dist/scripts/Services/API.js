new Service("Veterinario.Services", "API", "http", function($http) {

    var API = {};
    var BASE_URL = "http://192.168.0.108:10000/api";//"http://10.13.246.169:10000/api"

    API.testConnection = function() {
        return $http({
            //method: 'JSONP', 
            url: BASE_URL
        });
    };

    /*------------------------------------
        ANIMALS
    ------------------------------------*/
    API.getAllAnimals = function() {
        // get all animals from db
        var url = BASE_URL + "/animal"
        return $http.get(url);
    };

    API.getAnimal = function(animalId) {
        // get animalId animal
        var url = BASE_URL + "/animal/" + animalId;
        return $http.get(url);
    };

    API.getAnimalById = function(ownerId) {
        // get all the animals with this ownerid
        var url = BASE_URL + "/animalby/" + ownerId;
        return $http.get(url);
    }

    API.newAnimal = function(name, date, race, genre, owner) {
        // creating a new animal
        var url = BASE_URL + "/animal";
        var params = {
            name: name,
            date: date,
            race: race,
            genre: genre,
            owner: owner
        }
        return $http.post(url, params);
    };

    API.setAnimal = function(animalId, name, date, race, genre, owner) {
        // updating animal
        var url = BASE_URL + "/animal/" + animalId
        var params = {
            name: name,
            date: date,
            race: race,
            genre: genre,
            owner: owner
        }
        return $http.put(url, params);
    };

    API.deleteAnimal = function(animalId) {
        //deleting an animal.
        var url = BASE_URL + "/animal/" + animalId
        return $http.delete(url);
    };

    /*------------------------------------
        ownerS
    ------------------------------------*/
    API.getAllOwners = function() {
        // get all owners from db
        var url = BASE_URL + "/owner"
        return $http.get(url);
    };

    API.getOwner = function(ownerId) {
        // get ownerId owner
        var url = BASE_URL + "/owner/" + ownerId;
        return $http.get(url);
    };

    API.newOwner = function(name, surname) {
        // creating a new owner
        var url = BASE_URL + "/owner";
        var params = {
            name: name,
            surname: surname
        }
        return $http.post(url, params);
    };

    API.setOwner = function(ownerId, name, surname) {
        // updating owner
        var url = BASE_URL + "/owner/" + ownerId;
        var params = {
            name: name,
            surname: surname
        }
        return $http.put(url, params);
    };

    API.deleteOwner = function(ownerId) {
        //deleting an owner.
        var url = BASE_URL + "/owner/"+ownerId;
        return $http.delete(url);
    };

    /*------------------------------------
        raceS
    ------------------------------------*/
    API.getAllRaces = function() {
        // get all races from db
        var url = BASE_URL + "/race"
        return $http.get(url);
    };

    API.getRace = function(raceId) {
        // get raceId race
        var url = BASE_URL + "/race/" + raceId;
        return $http.get(url);
    };

    API.newRace = function(race, type) {
        // creating a new race
        var url = BASE_URL + "/race";
        var params = {
            race: race,
            type: type
        }
        return $http.post(url, params)
    };

    API.setRace = function(raceId, race, type) {
        // updating race
        var url = BASE_URL + "/race/" + raceId;
        var params = {
            race: race,
            type: type
        }
        return $http.put(url, params)
    };

    API.deleteRace = function(raceId) {
        //deleting an race.
        var url = BASE_URL + "/race/" + raceId;
        return $http.delete(url);
    };

    /*------------------------------------
        TypeS
    ------------------------------------*/
    API.getAllTypes = function() {
        // get all Types from db
        var url = BASE_URL + "/type"
        return $http.get(url);
    };

    API.newType = function(type) {
        // creating a new Type
        var url = BASE_URL + "/type";
        var params = {
            type: type
        }
        return $http.post(url, params);
    };

    /*------------------------------------
        operationS
    ------------------------------------*/
    API.getAllOperations = function() {
        // get all operations from db
        var url = BASE_URL + "/operation"
        return $http.get(url);
    };

    API.getOperation = function(operationId) {
        // get operationId operation
        var url = BASE_URL + "/operation/" + operationId;
        return $http.get(url);
    };

    API.newOperation = function(type) {
        // creating a new operation
        var url = BASE_URL + "/operation";
        var params = {
            type: type
        }
        return $http.post(url, params);
    };

    API.setOperation = function(operationId, type) {
        // updating operation
        var url = BASE_URL + "/operation/" + operationId;
        var params = {
            type: type
        }
        return $http.put(url, params);
    };

    API.deleteOperation = function(operationId) {
        //deleting an operation.
        var url = BASE_URL + "/operation/" + operationId;
        return $http.delete(url);
    };

    /*------------------------------------
        VisitS
    ------------------------------------*/
    API.getAllVisits = function() {
        // get all Visits from db
        var url = BASE_URL + "/visit"
        return $http.get(url);
    };

    API.getVisit = function(visitId) {
        // get VisitId Visit
        var url = BASE_URL + "/visit/" + VisitId
        return $http.get(url);
    };

    API.getVisitById = function(animalId) {
        // get all visits of animalID
        var url = BASE_URL + "/visitby/" + animalId;
        return $http.get(url);
    }

    API.newVisit = function(date, animal, owner) {
        // creating a new Visit
        var url = BASE_URL + "/visit";
        var params = {
            date: date,
            animal: animal,
            note: note
        }
        return $http.post(url, params);
    };

    API.setVisit = function(visitId, date, animal, owner) {
        // updating Visit
        var url = BASE_URL + "/visit/" + visitId
        var params = {
            date: date,
            animal: animal,
            note: note
        }
        return $http.put(url, params);
    };

    API.deleteVisit = function(visitId) {
        //deleting a visit.
        var url = BASE_URL + "/visit/" + visitId
        return $http.delete(url);
    };

    return API;

}, []);