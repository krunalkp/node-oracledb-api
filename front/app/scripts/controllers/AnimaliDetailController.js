Class("AnimaliDetailController",{
    AnimaliDetailController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $routeParams, API) {
        // we are inside animali detail controller
        // we need animalid
        var animalId = $routeParams.id;

        // recupero informazioni su animale
        $scope.name = "";
        $scope.date = "";
        $scope.genre = "";
        $scope.owner = "";
        $scope.race = "";
        $scope.code = "";
        API.getAnimal(animalId).then(function(response) {
            if (response.status == "ok") {
                // retrieving animal informations
                $scope.name = response.message.name;
                $scope.date = response.message.date;
                $scope.genre = response.message.genre;
                $scope.owner = response.message.owner;
                $scope.race = response.message.race;
                $scope.code = response.message.code;

                // recuperare i dati del padrone. uso il codice fiscale in $scope.owner per recuperare il padrone
                $scope.animalOwner = {};
                API.getOwner($scope.owner).then(function(response) {
                    if (response.status == "ok") {
                        $scope.animalOwner = {
                            name: response.message.name,
                            surname: response.message.surname,
                            cf: response.message.cf
                        }
                    } else {
                        $scope.animalOwner = {
                            name: "No owner with this CF found.",
                            surname: "",
                            cf: ""
                        }
                    }
                }, function(error) {
                    $scope.animalOwner = {
                        name: "An error occurred while retrieving owner.",
                        surname: "",
                        cf: ""
                    }
                });

                // recupero informazioni su operazioni di questo animale
                $scope.visits = [];
                API.getVisitsById($scope.code).then(function(response) {
                    if (response.status == "ok") {
                        $response.visits = response.message;
                    } else {
                        $response.visit = [{
                            date: "",
                            notes: "Could not find any visit for this animal",
                            animal: "",
                            code: "",
                        }];
                    }
                }, function(error) {
                    $response.visit = [{
                        date: "",
                        notes: "Error while retrieving visits for this animal",
                        animal: "",
                        code: "",
                    }];
                });
            } else {
                $scope.name = "Animale non trovato";
            }
        }, function(error) {
            $scope.name = "Si è verificato un errore."
        });

        // inserire la modifica dei dati di un animale
        // quando clicco su modifica, scende un form come per la creazione, pre impostato con i valori di prima.
        // dopo aver fatto invia sul form, cambio i dati e ricarico la pagina.
        // mi serve sapere l'elenco dei padroni.
        $scope.modifyAnimal = function() {
            var animalId = $scope.code;
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
        }
    }
})._extends("Controller");

home = new AnimaliDetailController("Veterinario.Controllers", "AnimaliDetailController", ['$scope', '$route', '$routeParams', 'API'], []);