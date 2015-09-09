Class("VisiteController",{
    VisiteController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
        // retrieving all animals
        $scope.visits = [["", "", "", ""]];

        API.getAllVisits().then(function(response) {
            console.log(response.data.message.rows);
            if (response.data.status == "ok") {
                console.log(response.data);
                $scope.visits = response.data.message.rows;
                if ($scope.visits.length == 0) {
                    $scope.visits = [["Nessuna visita inserita", "", "", ""]];
                }
            } else {
                // we didn't retrieve visits, using empty list.
                $scope.visits = [["Nessuna visita inserita", "", "", ""]];
            }
        }, function(error) {
            // displaying error inside table
            $scope.visits = [["ERROR WHILE CONNECTING TO SERVER","", ""]];
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

        // creating a new owner
        $scope.newVisit = function() {
            console.log(this);
            // trying to read form values
            var date = $('#visitDate').val();
            var animal = $('#visitAnimal').val();
            var notes = $('#visitNotes').val();

            API.newVisit(date, animal, notes).then(function(response) {
                console.log(response);
                if (response.data.status == "ok") {
                    // showing success dialog
                    swal("Success!", "A new visit has been created.", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "Something went wrong while creating new visit", "error");
                }
            }, function(error) {
                console.log(error);
                swal("Error! (bad request)", "Something went wrong while creating new visit", "error");
            });
        };

        // deleting animal
        $scope.deleteVisit = function(data) {
            var visitId = data.visit[0];
            API.deleteVisit(visitId).then(function(response) {
                if (response.data.status == "ok") {
                    // we managed to destroy this visit
                    swal("Success!", "visit deleted", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "We couldn't delete visit " + visitId, "error");
                }
            }, function(error) {
                swal("Error!", "An error occurred while deleting this owner", "error");
            })
        }
    }
})._extends("Controller");

visite = new VisiteController("Veterinario.Controllers", "VisiteController", ['$scope', '$route', '$routeParams', 'API'], []);