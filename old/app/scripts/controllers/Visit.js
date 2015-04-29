Class("VisitController", {
    VisitController: function(module, name) {
        Controller.call(this, module, name);
    },

    control: function($scope) {

    }
})._extends("Controller");

var visit = new VisitController("Veterinario", "VisitController");