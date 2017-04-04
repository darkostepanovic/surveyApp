meanPersonApp.controller('mainController', ['$scope', 'apiService', function($scope, apiService) {
    
    var persons = apiService.getAllPersons();
    
    persons.then(function(res) {
        $scope.persons = res.data;
    })
    
}]);