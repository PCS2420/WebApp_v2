"use strict";
angular.module('webAppV2App')
.controller('BuscarCtrl', function($scope, $http, URI){
	angular.element("#texto_header").html("Sinestesia - Buscar");
	console.log("@TODO BuscarCtrl controller");
	
	$scope.search = function(formData){
		$scope.loading = true;
		console.log(formData.radio);
		var myDataPromise = $http.get(URI.api + "livro");
		myDataPromise.then(function(response){
			$scope.resultados = [];
			console.log(response.data);
			for (var i in response.data){
				if (response.data[i].titulo.indexOf(formData.query) !== -1){
					$scope.resultados.push(response.data[i]);
				}
			}
			$scope.isDescricao = formData.radio === 'descrever';
			$scope.loading = false;
		});
	};
	$scope.URI = URI.api;
});