Class("HomeController",{
    HomeController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
       // retrieving all animals
        $scope.animals = [["", "", "", "", ""]];

        API.getAllAnimals().then(function(response) {
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

        // retrieving all animals
        $scope.owners = [];

        API.getAllOwners().then(function(response) {
            if (response.data.status == "ok") {
                console.log(response.data);
                $scope.owners = response.data.message.rows;
            } else {
                // we didn't retrieve owners, using empty list.
                $scope.owners = [["Nessun proprietario inserito", "", ""]];
            }
        }, function(error) {
            // displaying error inside table
            $scope.owners = [["ERROR WHILE CONNECTING TO SERVER","", ""]];
        });
    }
})._extends("Controller");

home = new HomeController("Veterinario.Controllers", "HomeController", ['$scope', '$route', '$routeParams', 'API'], []);