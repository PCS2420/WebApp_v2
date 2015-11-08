angular.module('webAppV2App')
.factory('ListaLivro', function($http, $rootScope){
   	return {
    	getLivros: function(curso_id) {
            return $http.get("http://localhost:1337/curso/" + curso_id);
		}
	}
});
