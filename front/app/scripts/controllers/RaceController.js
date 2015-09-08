Class("RaceController",{
    RaceController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
        // retrieving all animals

        console.log("i'm inside race controller scope");
        $scope.races = [["", ""]];

        API.getAllRaces().then(function(response) {
            if (response.data.status == "ok") {
                $scope.races = response.data.message.rows;
                if ($scope.races.length == 0) {
                    $scope.races = [["Nessuna razza", "registrata"]];
                }
            } else {
                // we didn't retrieve races, using empty list.
                $scope.races = [["Nessuna razza", " registrata"]];
            }
        }, function(error) {
            // displaying error inside table
            $scope.races = [["Error while connecting to server.", ""]];
        });

        // retrieving all types ( cane, gatto.. )
        $scope.types = [];
        $scope.noTypes = false;
        API.getAllTypes().then(function(response) {
            if (response.data.status == "ok") {
                $scope.types = response.data.message.rows;
                if ($scope.types.length == 0) {
                    $scope.types = [["No animal types in DB, please create one"]];
                    $scope.noTypes = true;
                }
            } else {
                // no types in our db
                $scope.types = [["No animal types in DB, please create one"]];
                $scope.noTypes = true;
            }
        }, function(error) {
            $scope.types = [["ERROR"]];
            $scope.noTypes = true;
        });

        // creating a new animal
        $scope.newRace = function() {
            console.log(this);
            if ($scope.noTypes) {
                swal("Error!", "Please ensure you created at least one type of animal.", "error");
                return;
            }
            // trying to read form values
            var type = $('#raceType').val();
            var race = $('#raceName').val();
            API.newRace(race, type).then(function(response) {
                console.log(response);
                if (response.data.status == "ok") {
                    // showing success dialog
                    swal("Success!", "A new race has been created.", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "Something went wrong while creating new race", "error");
                }
            }, function(error) {
                swal("Error! (bad request)", "Something went wrong while creating new race", "error");
            });
        };

        // deleting animal
        $scope.deleteRace = function(data) {
            var raceId = data.race[0];
            API.deleteRace(raceId).then(function(response) {
                if (response.data.status == "ok") {
                    // we managed to destroy this animal
                    swal("Success!", "race deleted", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "We couldn't delete race " + raceId, "error");
                }
            }, function(error) {
                swal("Error!", "An error occurred while deleting this race", "error");
            })
        }

    }
})._extends("Controller");

razze = new RaceController("Veterinario.Controllers", "RaceController", ['$scope', '$route', '$routeParams', 'API'], []);