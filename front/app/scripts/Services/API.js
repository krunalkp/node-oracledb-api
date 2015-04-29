new Service("Veterinario.Services", "API", "http", function($http) {

    var API = {};

    API.getStuff = function() {
        return $http({
            method: 'JSONP', 
            url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
        });
    };

    return API;

}, []);