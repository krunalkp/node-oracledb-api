Class("OperationDetailController", {
    OperationDetailController: function(module, name, dependencies) {
        Controller.call(this, module, name, dependencies);
    },

    control: function($scope, $route, $routeParams, API) {

        var operationid = $routeParams.id;
        $scope.operationId = operationId;

        // retrieving all visit ( cane, gatto.. )
        $scope.visits = [[""]];
        API.getVisitByOperation(operationid).then(function(response) {
            if (response.data.status == "ok") {
                $scope.visits = response.data.message.rows;
                if ($scope.visits.length == 0) {
                    $scope.visits = [["No visit with this operation in DB, please create one"]];
                }
            } else {
                // no visit in our db
                $scope.visits = [["No visit with this operation in DB, please create one"]];
            }
        }, function(error) {
            $scope.visits = [["ERROR"]];
        });
    }
})._extends("Controller");

operazioni = new OperationDetailController("Veterinario.Controllers", "OperationDetailController", ['$scope', '$route', '$routeParams', 'API'], []);