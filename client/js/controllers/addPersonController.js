meanPersonApp.controller('addPersonController', ['$scope', '$location', 'apiService', function($scope, $location, apiService) {
    
    $scope.personFirstName = "";
    $scope.personLastName = "";
    $scope.personAddress = "";
    $scope.personPhone = "";
    $scope.personCompany = "";
    
    $scope.submitPerson = function(firstName, lastName, address, phone, company) {
        var osoba = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            company: company
        };
        
        apiService.addPerson(osoba);
    }
    
    $scope.back = function() {
        $location.path('/');
    }
    
}]);