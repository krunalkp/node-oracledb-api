new Service("Veterinario.Services", "API", "http", function($http) {

    var API = {};
    var BASE_URL = "http://localhost:8080/api"

    API.testConnection = function() {
        return $http({
            //method: 'JSONP', 
            url: BASE_URL
        });
    };

    return API;

}, []);