Class("PadroniDetailController",{
    PadroniDetailController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $routeParams, API) {
        
    }
})._extends("Controller");

home = new PadroniDetailController("Veterinario.Controllers", "PadroniDetailController", ['$scope', '$routeParams', 'API'], []);