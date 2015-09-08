Class("PadroniDetailController",{
    PadroniDetailController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
        // we are inside animali detail controller
        // we need animalid
        var ownerId = $routeParams.id;

        // recupero informazioni su animale
        $scope.name = "";
        $scope.surname = "";
        $scope.cf = "";

        API.getOwner(ownerId).then(function(response) {
            if (response.data.status == "ok") {
                // retrieving animal informations
                $scope.cf = response.data.message.rows[0][0];
                $scope.name = response.data.message.rows[0][1];
                $scope.surname = response.data.message.rows[0][2];

                // recuperare i dati del padrone. uso il codice fiscale in $scope.owner per recuperare il padrone
                $scope.animals = [];
                API.getAnimalById($scope.cf).then(function(response) {
                    if (response.data.status == "ok") {
                        $scope.animals = response.data.message.rows;
                        if ($scope.animals.length == 0) {
                            $scope.animals = [["ancora", "nessun", "animale", "è stato", "registrato"]];
                        }
                    } else {
                        $scope.animals = [["ancora", "nessun", "animale", "è stato", "registrato"]];
                    }
                }, function(error) {
                    $scope.animals = [["Errore durante recupero degli animali", "", "", "", ""]];
                });
            } else {
                $scope.name = "Proprietario non trovato";
            }
        }, function(error) {
            $scope.name = "Si è verificato un errore."
        });

        // inserire la modifica dei dati di un animale
        // quando clicco su modifica, scende un form come per la creazione, pre impostato con i valori di prima.
        // dopo aver fatto invia sul form, cambio i dati e ricarico la pagina.
        // mi serve sapere l'elenco dei padroni.
        $scope.modifyOwner = function() {
            var ownerId = $scope.cf;
            // trying to read form values
            var name = $('#ownerName').val();
            var surname = $('#ownerSurname').val();

            API.setOwner(ownerId, name, surname).then(function(response) {
                if (response.data.status == "ok") {
                    // showing success dialog
                    swal("Success!", "This owner has been modified.", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    console.log(response);
                    swal("Error!", "Something went wrong while modifying this owner", "error");
                }
            }, function(error) {
                swal("Error! (bad request)", "Something went wrong while modifying this owner", "error");
            });
        }
    }
})._extends("Controller");

home = new PadroniDetailController("Veterinario.Controllers", "PadroniDetailController", ['$scope', '$route', '$routeParams', 'API'], []);