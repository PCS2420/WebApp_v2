angular.module('webAppV2App')
.factory('MostraImagem', function($http, $rootScope, URI){
   	return {
    	getImagem: function(imagem_id) {
            return $http.get(URI.api + "imagem/" + imagem_id);
		}
	}
});
