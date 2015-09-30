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
                $scope.code = response.data.message.rows[0][0];
                $scope.name = response.data.message.rows[0][1];
                $scope.date = response.data.message.rows[0][2];
                $scope.genre = response.data.message.rows[0][3];
                $scope.owner = response.data.message.rows[0][5];
                $scope.race = response.data.message.rows[0][4];
                $scope.type = response.data.message.rows[0][6];

                // recuperare i dati del padrone. uso il codice fiscale in $scope.owner per recuperare il padrone
                $scope.animalOwner = {};
                API.getOwner($scope.owner).then(function(response) {
                    if (response.data.status == "ok") {
                        $scope.animalOwner = {
                            cf : response.data.message.rows[0][0],
                            name : response.data.message.rows[0][1],
                            surname : response.data.message.rows[0][2]
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
                API.getVisitById($scope.code).then(function(response) {
                    if (response.data.status == "ok") {
                        $scope.visits = response.data.message.rows;
                        if ($scope.visits.length == 0) {
                            $scope.visits = [["Nessuna visita inserita", "", "", ""]];
                        }
                    } else {
                        $scope.visits = [["Nessuna visita inserita", "", "", ""]];
                    }
                }, function(error) {
                    $scope.visits = [["Errore nel recupero visite", "", "", ""]];
                });


            } else {
                $scope.name = "Animale non trovato";
            }
        }, function(error) {
            $scope.name = "Si è verificato un errore."
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

            
            API.setAnimal(animalId, name, date, race.split('-')[0], genre, owner).then(function(response) {
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