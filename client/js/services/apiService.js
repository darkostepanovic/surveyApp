meanPersonApp.service('apiService', ['$http', function($http) {
    
    return {
        
        getAllPersons: function() {
            var persons = $http({
                method: "GET",
                url: "../api/persons"
            });
            
            return persons;
        },
        
        deletePerson: function(id) {
            var url = "api/person/" + id;
            
            $http({
                method: "DELETE",
                url: url
            });
        }
        
    }
    
}]);