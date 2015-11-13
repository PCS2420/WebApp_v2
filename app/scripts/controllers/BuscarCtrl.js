"use strict";
angular.module('webAppV2App')
<<<<<<< HEAD
.controller('BuscarCtrl', function($scope, $http, URI){
	angular.element("#texto_header").html("Sinestesia - Buscar");
	console.log("@TODO BuscarCtrl controller");
	$scope.search = function(formData){
		console.log(formData.radio);
		var myDataPromise = $http.get(URI.api + "livro");
		myDataPromise.then(function(response){
			$scope.resultados = [];
			console.log(response.data);
			for (var i in response.data){
				if (response.data[i].titulo.indexOf(formData.query) != -1){
					$scope.resultados.push(response.data[i]);
				}
			}
			$scope.isDescricao = formData.radio == 'descrever';
		})
		
	}
	
	$scope.URI = URI.api;
});
=======
.controller('BuscarCtrl', function($scope){
        void($scope); //Evitar erro de 'nao utilizado'
	angular.element("#texto_header").html("Sinestesia - Buscar");
	console.log("@TODO BuscarCtrl controller");
});
>>>>>>> origin/master
