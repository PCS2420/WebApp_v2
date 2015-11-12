angular.module('webAppV2App')
.service('MostraImagem', function MostraImagem($http, $q, URI){

	var MostraImagem = this;
	
	MostraImagem.getImagem = function (imagem_id){
		var defer = $q.defer();
		return $http.get(URI.api + "imagem/" + imagem_id)
		.success(function(response){
			console.log(response);
			defer.resolve(response);
		})
		.error(function(error){
			console.log(error);
			defer.reject(error);
		})
		return defer.promise;
	},

	MostraImagem.getDescricao = function(imagem_id){
		var defer = $q.defer();
		return $http.get(URI.api + "imagem?id=" + imagem_id + "&estado=Aberto")
		.success(function(response){
			console.log(response);
			defer.resolve(response);
		})
		.error(function(error){
			console.log(error);
			defer.reject(error);
		})
		return defer.promise;
	}
});
