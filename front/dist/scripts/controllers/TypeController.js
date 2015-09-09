Class("TypeController",{
    TypeController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {

        // retrieving all types ( cane, gatto.. )
        $scope.types = [[""]];
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

        // creating a new animal
        $scope.newType = function() {
            console.log(this);

            // trying to read form values
            var type = $('#raceType').val();

            API.newType(type).then(function(response) {
                console.log(response);
                if (response.data.status == "ok") {
                    // showing success dialog
                    swal("Success!", "A new type has been created.", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "Something went wrong while creating new type", "error");
                }
            }, function(error) {
                swal("Error! (bad request)", "Something went wrong while creating new type", "error");
            });
        };

        // deleting animal
        $scope.deleteType = function(data) {
            var typeId = data.type[0];
            API.deleteType(typeId).then(function(response) {
                if (response.data.status == "ok") {
                    // we managed to destroy this animal
                    swal("Success!", "type deleted", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "We couldn't delete type " + typeId, "error");
                }
            }, function(error) {
                swal("Error!", "An error occurred while deleting this type", "error");
            })
        }

    }
})._extends("Controller");

razze = new TypeController("Veterinario.Controllers", "TypeController", ['$scope', '$route', '$routeParams', 'API'], []);