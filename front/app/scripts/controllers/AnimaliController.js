Class("AnimaliController",{
    AnimaliController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
        // retrieving all animals
        $scope.animals = [];

        API.getAllAnimals().then(function(response) {
            if (response.status == "ok") {
                $scope.animals = response.message;
            } else {
                // we didn't retrieve animals, using empty list.
                $scope.animals = [{
                    name: "ancora",
                    date: "nessun",
                    genre: "animale",
                    race: "è stato",
                    owner: "registrato"
                }];
            }
        }, function(error) {
            // displaying error inside table
            $scope.animals = [{
                name: "ERROR",
                date: "WHILE",
                genre: "CONNECTING",
                race: "TO",
                owner: "SERVER",
                code: "CIAO" // @TODO remove this codes, we don't need this.
            }];
        });

        // retrieving all owners
        $scope.owners = [];
        API.getAllOwners().then(function(response) {
            if (response.status == "ok") {
                $scope.owners = response.message;
            } else {
                // no owners in our db
                $scope.owners = ["No owners in DB, please create one"];
            }
        }, function(error) {
            $scope.owners = ["ERROR"];
        });
        // retrieving all types ( cane, gatto.. )
        $scope.types = [];
        API.getAllTypes().then(function(response) {
            if (response.status == "ok") {
                $scope.types = response.message;
            } else {
                // no types in our db
                $scope.types = ["No animal types in DB, please create one"];
            }
        }, function(error) {
            $scope.types = ["ERROR"];
        });

        // retrieving all races ( razze di cane, razze di gatto..)
        $scope.races = [];
        API.getAllRaces().then(function(response) {
            if (response.status == "ok") {
                $scope.races = response.races;
            } else {
                // no races in our db
                $scope.races = ["No races in our db, please create one"];
            }
        }, function(error) {
            $scope.races = ["ERROR"];
        });

        // creating a new animal
        $scope.newAnimal = function() {
            console.log(this);
            // trying to read form values
            var name = $('#animalName').val();
            var date = $('#animalDate').val();
            var genre = $('#animalGenre').val();
            var race = $('#animalRace').val();
            var owner = $('#animalOwner').val();
            API.newAnimal(name, date, genre, race, owner).then(function(response) {
                if (response.status == "ok") {
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
        $scope.deleteAnimal = function(animalId) {
            API.deleteAnimal(animalId).then(function(response) {
                if (response.status == "ok") {
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

animali = new AnimaliController("Veterinario.Controllers", "AnimaliController", ['$scope', '$route', '$routeParams', 'API'], []);