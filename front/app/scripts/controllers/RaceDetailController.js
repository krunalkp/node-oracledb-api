Class("RaceDetailController",{
    RaceDetailController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
        // we are inside animali detail controller
        // we need animalid
        var Race = $routeParams.id;
        $scope.race = Race;

        // retrieving all animals
        $scope.animals = [["", "", "", "", ""]];

        API.getAllAnimalsByRace(Race).then(function(response) {
            if (response.data.status == "ok") {
                $scope.animals = response.data.message.rows;
                console.log($scope.animals);
                if ($scope.animals.length == 0) {
                    $scope.animals = [["ancora", "nessun", "animale", "è stato", "registrato" ]];
                }
            } else {
                // we didn't retrieve animals, using empty list.
                $scope.animals = [["ancora", "nessun", "animale", "è stato", "registrato" ]];
            }
        }, function(error) {
            // displaying error inside table
            $scope.animals = [["Error while connecting to server.", "", "", "", ""]];
        });
    }
})._extends("Controller");

typeDetail = new RaceDetailController("Veterinario.Controllers", "RaceDetailController", ['$scope', '$route', '$routeParams', 'API'], []);