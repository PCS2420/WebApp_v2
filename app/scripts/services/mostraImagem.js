angular.module('webAppV2App')
.factory('MostraImagem', function($http, $rootScope){
   	return {
    	getImagem: function(imagem_id) {
            return $http.get("http://localhost:1337/imagem/" + imagem_id);
		}
	}
});
