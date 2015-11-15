"use strict";
angular.module('webAppV2App')
.controller('HistoricoCtrl', function($scope, $http, URI, ListaLivro, CurrentUser){
        void(ListaLivro); //Evitar erro de 'nao utilizado'
        void(CurrentUser); //Evitar erro de 'nao utilizado'
	angular.element("#texto_header").html("Sinestesia - Historico");
		
	$scope.uri = URI.api;
	$scope.loading = true;
	var myDataPromise;
	var user = $scope.loggedUser();
	angular.element("#texto_header").html("Sinestesia - Historico");
	myDataPromise = $http.get(URI.api + "descricao?descritor=" + user.id);
	
	myDataPromise.then(function(response){
		// console.log(response.data);
		var imagens = response.data;
		var myDataPromise2 = $http.get(URI.api + "imagem/");
		myDataPromise2.then(function(response){
		        var img, descImg, i;	
			var capas = [];
			for(img in response.data){
				for(descImg in imagens){
					if(response.data[img].id === imagens[descImg].imagem.id){
						// console.log(response.data[img]);
						// console.log(imagens[descImg]);
						capas.push(response.data[img]);
						// capas.push(imagens[descImg]);
					}
				}
			}

			for(i = 1; i < capas.length; ){
				if(capas[i-1].livro.id === capas[i].livro.id){
					capas.splice(i, 1);
				} else {
					i++;
				}
			}
			
			var preloaded_images = [];
			for(img in capas) {
				preloaded_images.push($scope.uri+"/"+ capas[img].livro.capa);
			}
			$scope.preloaded_images = preloaded_images;
			$scope.loading = false;
			$scope.capas = capas;
		});
	});
});
