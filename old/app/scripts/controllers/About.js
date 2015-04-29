Class("AboutController", {
    AboutController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope) {

    }
})._extends("Controller");

var about = new AboutController("Veterinario.Controllers", "AboutController", []);