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
        })
        /*
            ANIMALI
        */
        .when('/animal', {
            // Use the same partial views for for all languages
            templateUrl: '../views/animali.html',
            controller: 'AnimaliController',
            controlerAs: 'animaliCtrl'
        })

        .when('/animal/:id', {
            // Use the same partial views for for all languages
            templateUrl: '../views/animalidetail.html',
            controller: 'AnimaliDetailController',
            controlerAs: 'animaliDetailCtrl'
        })

        /*
            PADRONI
        */
        .when('/owner', {
            // Use the same partial views for for all languages
            templateUrl: '../views/padroni.html',
            controller: 'PadroniController',
            controlerAs: 'padroniCtrl'
        })

        .when('/owner/:id', {
            // Use the same partial views for for all languages
            templateUrl: '../views/padronidetail.html',
            controller: 'PadroniDetailController',
            controlerAs: 'padroniDetailCtrl'
        })

        /*
            VISITE
        */
        .when('/visit', {
            // Use the same partial views for for all languages
            templateUrl: '../views/visite.html',
            controller: 'VisiteController',
            controlerAs: 'visiteCtrl'
        })

        .when('/visit/:id', {
            // Use the same partial views for for all languages
            templateUrl: '../views/visitedetail.html',
            controller: 'VisiteDetailController',
            controlerAs: 'visiteDetailCtrl'
        })

        .when('/race', {
            // Use the same partial views for for all languages
            templateUrl: '../views/razze.html',
            controller: 'RaceController',
            controlerAs: 'razzeCtrl'
        })

        .when('/type', {
            // Use the same partial views for for all languages
            templateUrl: '../views/tipi.html',
            controller: 'TypeController',
            controlerAs: 'tipiCtrl'
        })

        .when('/operation', {
            // Use the same partial views for for all languages
            templateUrl: '../views/operazioni.html',
            controller: 'OperationController',
            controlerAs: 'operazioniCtrl'
        })

        /*
            404 NOT FOUND
        */
        .otherwise({
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



