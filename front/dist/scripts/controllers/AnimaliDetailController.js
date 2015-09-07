Class("AnimaliDetailController",{
    AnimaliDetailController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
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
            if (response.data.status == "ok") {
                // retrieving animal informations
                $scope.name = response.data.message.name;
                $scope.date = response.data.message.date;
                $scope.genre = response.data.message.genre;
                $scope.owner = response.data.message.owner;
                $scope.race = response.data.message.race;
                $scope.code = response.data.message.code;

                // recuperare i dati del padrone. uso il codice fiscale in $scope.owner per recuperare il padrone
                $scope.animalOwner = {};
                API.getOwner($scope.owner).then(function(response) {
                    if (response.data.status == "ok") {
                        $scope.animalOwner = {
                            name: response.data.message.name,
                            surname: response.data.message.surname,
                            cf: response.data.message.cf
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
                    if (response.data.status == "ok") {
                        $scope.visits = response.data.message;
                    } else {
                        $scope.visits = [{
                            date: "",
                            notes: "Could not find any visit for this animal",
                            animal: "",
                            code: "",
                        }];
                    }
                }, function(error) {
                    $scope.visits = [{
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
            API.setAnimal(animalId, name, date, genre, race, owner).then(function(response) {
                if (response.data.status == "ok") {
                    // showing success dialog
                    swal("Success!", "THe animal has been modified.", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "Something went wrong while modifying animal", "error");
                }
            }, function(error) {
                swal("Error! (bad request)", "Something went wrong while modifying animal", "error");
            });
        }
    }
})._extends("Controller");

home = new AnimaliDetailController("Veterinario.Controllers", "AnimaliDetailController", ['$scope', '$route', '$routeParams', 'API'], []);