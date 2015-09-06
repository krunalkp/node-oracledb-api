Class("VisitController",{
    VisitController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $routeParams, API) {
        
    }
})._extends("Controller");

home = new VisitController("Veterinario.Controllers", "VisitController", ['$scope', '$routeParams', 'API'], []);