angular.module('webAppV2App')
.factory('ListaImagem', function($http, $rootScope){
   	return {
    	getImagens: function(livro_id, descricao) {
    		if(descricao) 
    		{
    			return $http.get("http://localhost:1337/imagem?livro=" + livro_id + "&estado=Aberto");
    		} else
    		{
    			return $http.get("http://localhost:1337/imagem?livro=" + livro_id + "&estado=Pronto");
    		}
            
		}
	}
});
