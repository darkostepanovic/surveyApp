meanPersonApp.service('apiService', ['$http', function($http) {
    
    return {
        
        getAllPersons: function() {
            
            var persons = $http({
               
                method: "GET",
                url: "../api/persons"
                
            });
            
            return persons;

        }
        
    }
    
}]);