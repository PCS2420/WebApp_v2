angular.module('webAppV2App')
.factory('ListaPontuacao', function($http, $rootScope, URI){
   	return {
    	getPontuacao: function(pontuacao_id) {
            return $http.get(URI.api + "pontuacao/" + pontuacao_id);
		}
	}
});
