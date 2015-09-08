Class("OperationController",{
    OperationController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
        // retrieving all animals
        $scope.animals = [["", "", "", "", ""]];

        API.getAllAnimals().then(function(response) {
            if (response.data.status == "ok") {
                $scope.animals = response.data.message.rows;
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

        // retrieving all owners
        $scope.owners = [];
        $scope.noOwners = false;
        API.getAllOwners().then(function(response) {
            if (response.data.status == "ok") {
                $scope.owners = response.data.message.rows;
                if ($scope.owners.length == 0) {
                    $scope.owners = [["No owners in DB, please create one"]];
                    $scope.noOwners = true;
                }
            } else {
                // no owners in our db
                $scope.owners = [["No owners in DB, please create one"]];
                $scope.noOwners = true;
            }
        }, function(error) {
            $scope.owners = [["ERROR"]];
        });
        // retrieving all types ( cane, gatto.. )
        $scope.types = [];
        API.getAllTypes().then(function(response) {
            if (response.data.status == "ok") {
                $scope.types = response.data.message.rows;
                if ($scope.types.length == 0) {
                    $scope.types = [["No animal types in DB, please create one"]];
                }
            } else {
                // no types in our db
                $scope.types = [["No animal types in DB, please create one"]];
            }
        }, function(error) {
            $scope.types = [["ERROR"]];
        });

        // retrieving all races ( razze di cane, razze di gatto..)
        $scope.races = [];
        $scope.noRaces = false;
        API.getAllRaces().then(function(response) {
            if (response.data.status == "ok") {
                $scope.races = response.data.message.rows;
                if ($scope.races.length == 0) {
                    $scope.races = [["No races in our db, please create one"]];
                    $scope.noRaces = true;
                }
            } else {
                // no races in our db
                $scope.races = [["No races in our db, please create one"]];
                $scope.noRaces = true;
            }
        }, function(error) {
            $scope.races = [["ERROR"]];
        });

        // creating a new animal
        $scope.newAnimal = function() {
            console.log(this);
            if ($scope.noRaces || $scope.noOwners) {
                swal("Error!", "Please ensure you created both races and owner.", "error");
                return;
            }
            // trying to read form values
            var name = $('#animalName').val();
            var date = $('#animalDate').val();
            var genre = $('#animalGenre').val();
            var race = $('#animalRace').val();
            var owner = $('#animalOwner').val();
            API.newAnimal(name, date, genre, race, owner).then(function(response) {
                if (response.data.status == "ok") {
                    // showing success dialog
                    swal("Success!", "A new animal has been created.", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "Something went wrong while creating new animal", "error");
                }
            }, function(error) {
                swal("Error! (bad request)", "Something went wrong while creating new animal", "error");
            });
        };

        // deleting animal
        $scope.deleteAnimal = function(data) {
            var animalId = data.animal[5];
            API.deleteAnimal(animalId).then(function(response) {
                if (response.data.status == "ok") {
                    // we managed to destroy this animal
                    swal("Success!", "Animal deleted", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "We couldn't delete animal " + animalId, "error");
                }
            }, function(error) {
                swal("Error!", "An error occurred while deleting this animal", "error");
            })
        }
    }
})._extends("Controller");

razze = new OperationController("Veterinario.Controllers", "OperationController", ['$scope', '$route', '$routeParams', 'API'], []);