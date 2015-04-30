Class("Vet", {
    Vet: function(nome, dep) {
        Application.call(this, nome, dep);
        this.module.config(['$routeProvider', this.route])
        //this.config(this.route);
    },

    route: function($routeProvider) {
        $routeProvider
        .when('/', {
            // Use the same partial views for for all languages
            templateUrl: '../views/home.html',
            controller: 'HomeController',
            controlerAs: 'homeCtrl'
        }).when('/about', {
            // Use the same partial views for for all languages
            templateUrl: '../views/about.html',
            controller: 'AboutController',
            controlerAs: 'aboutCtrl'
        }).otherwise({
            templateUrl: '../views/404.html'
        });
    }
})._extends("Application");


var dependencies = [
    'Veterinario.Controllers',
    'Veterinario.Services',
    'ngRoute'
];

var app = new Vet("Veterinario", dependencies);



