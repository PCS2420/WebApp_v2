angular.module('webAppV2App')
.factory('ListaLivro', function($http, $rootScope, URI){
   	return {
    	getLivros: function(curso_id) {
            return $http.get(URI.api + "curso/" + curso_id);
		}
	}
});
