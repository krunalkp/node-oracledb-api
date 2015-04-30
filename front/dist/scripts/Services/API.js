new Service("Veterinario.Services", "API", "http", function($http) {

    var API = {};
    var BASE_URL = "http://10.13.248.234:10000/api"

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
    };

    API.getAnimal = function(animalId) {
        // get animalId animal
    };

    API.newAnimal = function() {
        // creating a new animal
    };

    API.setAnimal = function() {
        // updating animal
    };

    API.deleteAnimal = function() {
        //deleting an animal.
    };

    /*------------------------------------
        ownerS
    ------------------------------------*/
    API.getAllOwners = function() {
        // get all owners from db
    };

    API.getOwner = function(ownerId) {
        // get ownerId owner
    };

    API.newOwner = function() {
        // creating a new owner
    };

    API.setOwner = function() {
        // updating owner
    };

    API.deleteOwner = function() {
        //deleting an owner.
    };

    return API;

}, []);