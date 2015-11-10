angular.module('webAppV2App')
.factory('ListaImagem', function($http, $rootScope, URI){
   	return {
    	getImagens: function(livro_id, descricao) {
    		if(descricao) 
    		{
    			return $http.get(URI.api + "imagem?livro=" + livro_id + "&estado=Aberto");
    		} else
    		{
    			return $http.get(URI.api + "imagem?livro=" + livro_id + "&estado=Pronto");
    		}
            
		}
	}
});
