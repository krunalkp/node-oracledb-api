Class("VisiteDetailController",{
    VisiteDetailController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
        // we are inside animali detail controller
        // we need animalid
        var visitId = $routeParams.id;
        $scope.visitId = visitId;
        // recupero informazioni sulla visita

        API.getVisit(visitId).then(function(response) {
            if (response.data.status == "ok") {
                // retrieving animal informations
                $scope.code = response.data.message.rows[0][0];
                $scope.data = response.data.message.rows[0][1];
                $scope.note = response.data.message.rows[0][2];
                $scope.animal = response.data.message.rows[0][3];

            } else {
                $scope.note = "Visita non trovata";
            }
        }, function(error) {
            $scope.note = "Visita non trovata ( errore sul server ).";
        });

        // retrieving all animals
        $scope.animals = [["", "", "", "", ""]];
        $scope.noAnimals = false;
        API.getAllAnimals().then(function(response) {
            if (response.data.status == "ok") {
                $scope.animals = response.data.message.rows;
                console.log($scope.animals);
                if ($scope.animals.length == 0) {
                    $scope.animals = [["ancora", "nessun", "animale", "è stato", "registrato" ]];
                    $scope.noAnimals = true;
                }
            } else {
                // we didn't retrieve animals, using empty list.
                $scope.animals = [["ancora", "nessun", "animale", "è stato", "registrato" ]];
                $scope.noAnimals = true;
            }
        }, function(error) {
            // displaying error inside table
            $scope.animals = [["Error while connecting to server.", "", "", "", ""]];
        });

        // inserire la modifica dei dati di un animale
        // quando clicco su modifica, scende un form come per la creazione, pre impostato con i valori di prima.
        // dopo aver fatto invia sul form, cambio i dati e ricarico la pagina.
        // mi serve sapere l'elenco dei padroni.
        // creating a new owner
        $scope.modifyVisit = function() {

            if ($scope.noAnimals) {
                swal("Error!", "Non dovresti nemmeno essere qui.", "error");
                return;
            }
            var visitId = $scope.visitId;
            // trying to read form values
            var date = $('#visitDate').val();
            var animal = $('#visitAnimal').val();
            var notes = $('#visitNotes').val();

            API.setVisit(visitId, date, animal, notes).then(function(response) {
                console.log(response);
                if (response.data.status == "ok") {
                    // showing success dialog
                    swal("Success!", "Visita modificata correttamente", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "Qualcosa è andato storto modificando la visita.", "error");
                }
            }, function(error) {
                console.log(error);
                swal("Error! (bad request)", "Errore del server durante la modifica della visita", "error");
            });
        };
    }
})._extends("Controller");

home = new VisiteDetailController("Veterinario.Controllers", "VisiteDetailController", ['$scope', '$route', '$routeParams', 'API'], []);