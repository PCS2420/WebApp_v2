angular.module('webAppV2App')
.factory('ListaUsuario', function($http, $rootScope, URI){
   	return {
		getUsuarios: function(id) {
			return id !== undefined ? $http.get(URI.api+"usuario/"+id) : $http.get(URI.api+"usuario");
		}
	};
});
