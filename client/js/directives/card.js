meanPersonApp.directive('singleCard',['$http', 'apiService', function($http, apiService) {
    
    return {
        restrict: 'E',
        templateUrl: 'views/card.html',
        replace: true,
        scope: {
            osoba: '='
        },
        link: function($scope) {
            
            $scope.deletePerson = function(id) {
                apiService.deletePerson(id);
            }
            
        }
    }
    
}]);