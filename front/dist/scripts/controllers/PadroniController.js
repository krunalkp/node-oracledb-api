Class("PadroniController",{
    PadroniController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {
        // retrieving all animals
        $scope.owners = [];

        API.getAllOwners().then(function(response) {
            if (response.status == "ok") {
                $scope.owners = response.message;
            } else {
                // we didn't retrieve owners, using empty list.
                $scope.owners = [{
                    name: "Nessun proprietario inserito",
                    surname: "",
                    cf: ""
                }];
            }
        }, function(error) {
            // displaying error inside table
            $scope.owners = [{
                name: "ERROR WHILE CONNECTING TO SERVER",
                surname: "",
                cf: "CIAO" // @TODO remove this codes, we don't need this.
            }];
        });

        // creating a new owner
        $scope.newOwner = function() {
            console.log(this);
            // trying to read form values
            var name = $('#ownerName').val();
            var surname = $('#ownerSurname').val();

            API.newOwner(name, surname).then(function(response) {
                if (response.status == "ok") {
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
        $scope.deleteOwner = function(ownerId) {
            API.deleteOwner(ownerId).then(function(response) {
                if (response.status == "ok") {
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

animali = new PadroniController("Veterinario.Controllers", "PadroniController", ['$scope', '$route', '$routeParams', 'API'], []);