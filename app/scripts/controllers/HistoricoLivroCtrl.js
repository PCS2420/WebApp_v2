angular.module('webAppV2App')
.controller('HistoricoLivroCtrl', function($scope, $filter, $state, $stateParams, $http, ListaLivro, URI){
	angular.element("#texto_header").html("Sinestesia - @todo");
	$scope.$state = $state;
	$scope.uri = URI.api;
	
	var livro_id = $stateParams.livro_id;
	var user = $scope.loggedUser();
	myDataPromise = $http.get(URI.api + "descricao?descritor=" + user.id);
	var imagens = [];
	
	myDataPromise.then(function(response){
		console.log(response.data);
		var usr = response.data;
		for(img in usr){
			if(usr[img].imagem.livro == livro_id){
				imagens.push(
					{
						src: URI.api + usr[img].imagem.local,
						estado: usr[img].estado,
						descricao: usr[img].texto
					});
			}
		}
		console.log(imagens);
	});
	
	$scope.imagens = imagens;
	$scope.populaModal = function(descricao) {
		angular.element("#descricao_modal").html(descricao);
	}

});