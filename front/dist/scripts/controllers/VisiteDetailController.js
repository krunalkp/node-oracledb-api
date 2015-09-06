Class("VisiteDetailController",{
    VisiteDetailController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $routeParams, API) {
        
    }
})._extends("Controller");

home = new VisiteDetailController("Veterinario.Controllers", "VisiteDetailController", ['$scope', '$routeParams', 'API'], []);