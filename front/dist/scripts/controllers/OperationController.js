Class("OperationController", {
    OperationController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {

        // retrieving all operation ( cane, gatto.. )
        $scope.operations = [[""]];
        API.getAllOperations().then(function(response) {
            if (response.data.status == "ok") {
                $scope.operations = response.data.message.rows;
                if ($scope.operations.length == 0) {
                    $scope.operations = [["No operation in DB, please create one"]];
                }
            } else {
                // no operation in our db
                $scope.operations = [["No operation in DB, please create one"]];
            }
        }, function(error) {
            $scope.operations = [["ERROR"]];
        });

        // creating a new operation
        $scope.newOperation = function() {
            console.log(this);

            // trying to read form values
            var operation = $('#operation').val();

            API.newOperation(operation).then(function(response) {
                console.log(response);
                if (response.data.status == "ok") {
                    // showing success dialog
                    swal("Success!", "A new operation has been created.", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "Something went wrong while creating new operation", "error");
                }
            }, function(error) {
                swal("Error! (bad request)", "Something went wrong while creating new operation", "error");
            });
        };

        // deleting animal
        $scope.deleteOperation = function(data) {
            var operationId = data.operation[0];
            API.deleteOperation(operationId).then(function(response) {
                if (response.data.status == "ok") {
                    // we managed to destroy this animal
                    swal("Success!", "operation deleted", "success");
                    // reloading the current view
                    $route.reload();
                } else {
                    swal("Error!", "We couldn't delete operation " + operationId, "error");
                }
            }, function(error) {
                swal("Error!", "An error occurred while deleting this operation", "error");
            })
        }

    }
})._extends("Controller");

operazioni = new OperationController("Veterinario.Controllers", "OperationController", ['$scope', '$route', '$routeParams', 'API'], []);