Class("AnimaliDetailController",{
    AnimaliDetailController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $routeParams, API) {
        // we are inside animali detail controller
        // we need animalid
        console.log($routeParams);
    }
})._extends("Controller");

home = new AnimaliDetailController("Veterinario.Controllers", "AnimaliDetailController", ['$scope', '$routeParams', 'API'], []);