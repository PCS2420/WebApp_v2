angular.module('webAppV2App')
.factory('ListaCurso', function($http, $rootScope, URI){
   	return {
		getCursos: function(curso_id) {
			return curso_id !== undefined ? $http.get(URI.api+"curso/"+curso_id) : $http.get(URI.api+"curso");
		}
	};
});
