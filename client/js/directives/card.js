meanPersonApp.directive('singleCard',['$http', '$location', '$route', 'apiService', function($http, $location, $route, apiService) {
    
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
                $route.reload();
            };
            
        }
    }
    
}]);