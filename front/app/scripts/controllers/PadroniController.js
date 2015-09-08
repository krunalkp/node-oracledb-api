Class("PadroniController",{
    PadroniController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
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

        // creating a new owner
        $scope.newOwner = function() {
            console.log(this);
            // trying to read form values
            var name = $('#ownerName').val();
            var surname = $('#ownerSurname').val();

            API.newOwner(name, surname).then(function(response) {
                console.log(response);
                if (response.data.status == "ok") {
                    // showing success dialog
                    swal("Success!", "A new owner has been created.", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "Something went wrong while creating new owner", "error");
                }
            }, function(error) {
                console.log(error);
                swal("Error! (bad request)", "Something went wrong while creating new owner", "error");
            });
        };

        // deleting animal
        $scope.deleteOwner = function(data) {
            var ownerId = data.owner[0];
            API.deleteOwner(ownerId).then(function(response) {
                if (response.data.status == "ok") {
                    // we managed to destroy this owner
                    swal("Success!", "owner deleted", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "We couldn't delete owner " + ownerId, "error");
                }
            }, function(error) {
                swal("Error!", "An error occurred while deleting this owner", "error");
            })
        }
    }
})._extends("Controller");

owners = new PadroniController("Veterinario.Controllers", "PadroniController", ['$scope', '$route', '$routeParams', 'API'], []);