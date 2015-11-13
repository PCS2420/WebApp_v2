angular.module('webAppV2App')
.controller('HistoricoCtrl', function($scope, $http, URI, ListaLivro, CurrentUser){
	angular.element("#texto_header").html("Sinestesia - Historico");
	
	console.log("@TODO HistoricoCtrl controller");
	
	$scope.uri = URI.api;
	var myDataPromise;
	var user = $scope.loggedUser();
	angular.element("#texto_header").html("Sinestesia - Historico");
	
	
	var descImagens;
	var capas = [];
	
	myDataPromise = $http.get(URI.api + "descricao?descritor=" + user.id);
	
	myDataPromise.then(function(response){
		// console.log(response.data);
		
		var imagens = response.data;
		console.log(response.data);
		var myDataPromise2 = $http.get(URI.api + "imagem/")
		myDataPromise2.then(function(response){
			
			var capas = []
			for(img in response.data){
				for(descImg in imagens){
					if(response.data[img].id == imagens[descImg].imagem.id){
						// console.log(response.data[img]);
						// console.log(imagens[descImg]);
						capas.push(response.data[img]);
						// capas.push(imagens[descImg]);
					}
				}
			}
			
			// capas.sort();
			// for(var i = 1; i < capas.length; ){
				// if(capas[i-1].id == capas[i].id){
					// capas.splice(i, 1);
				// } else {
					// i++;
				// }
			// }
			
			capas.sort();
			for(var i = 1; i < capas.length; ){
				if(capas[i-1].livro.id == capas[i].livro.id){
					capas.splice(i, 1);
				} else {
					i++;
				}
			}
			console.log(capas);
			
			
			
			var preloaded_images = [];
			for(var img in capas) {
				preloaded_images.push($scope.uri+"/"+ capas[img].livro.capa);
			}
			$scope.preloaded_images = preloaded_images;
			$scope.capas = capas;
			
		});
		
	});
	
	
	
	
});