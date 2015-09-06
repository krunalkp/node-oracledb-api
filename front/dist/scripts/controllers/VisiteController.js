Class("VisiteController",{
    VisiteController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $routeParams, API) {
        
    }
})._extends("Controller");

home = new VisiteController("Veterinario.Controllers", "VisiteController", ['$scope', '$routeParams', 'API'], []);