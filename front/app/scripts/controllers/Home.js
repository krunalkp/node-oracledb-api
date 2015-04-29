Class("HomeController",{
    HomeController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, API) {
        //this._control($scope);
        $scope.name = "Marco";
        $scope.names = ["marco", "michael", "giulio"];
        API.getStuff().success(function(response) {
            $scope.list = response.MRData.StandingsTable.StandingsList[0].DriverStandings;
        });
        /*
            cosa dobbiamo mostrare?

            - numero di visite compiute
            - numero di interventi
            - numero di animali
            - numero di padroni

            - nuova visita
            - nuovo intervendo
            - nuovo cliente

            - non posso aggiungere un animale senza un padrone
            - se voglio aggiungere un nuovo animale, devo andare nella scheda del
            - cliente e aggiungere un animale.
        */
    }
})._extends("Controller");

home = new HomeController("Veterinario.Controllers", "HomeController", ['$scope', 'API'], []);