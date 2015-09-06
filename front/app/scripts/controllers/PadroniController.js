Class("PadroniController",{
    PadroniController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $routeParams, API) {
        
    }
})._extends("Controller");

home = new PadroniController("Veterinario.Controllers", "PadroniController", ['$scope', '$routeParams', 'API'], []);