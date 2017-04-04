meanPersonApp.directive('singleCard', function() {
    
    return {
        restrict: 'E',
        templateUrl: 'views/card.html',
        replace: true,
        scope: {
            osoba: '='
        }
    }
    
});