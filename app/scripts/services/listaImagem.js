angular.module('webAppV2App')
.factory('ListaImagem', function($http, $rootScope){
   	return {
    	getImagens: function(livro_id) {
            return $http.get("http://localhost:1337/imagem?livro=" + livro_id);
		}
	}
});
