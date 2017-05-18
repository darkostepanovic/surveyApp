meanPersonApp.controller('mainController', ['$scope', '$location', 'apiService', function($scope, $location, apiService) {
    
    var persons = apiService.getAllPersons();
    
    persons.then(function(res) {
        $scope.persons = res.data;
    });
    
}]);