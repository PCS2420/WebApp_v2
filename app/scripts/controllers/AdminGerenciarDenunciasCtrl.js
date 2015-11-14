"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarDenunciasCtrl', function($scope, $state, $http, ListaUsuario, ListaCurso, URI, flash) {
	angular.element("#texto_header").html("Admin - Denúncias");
	$scope.$state = $state;
	$scope.loading = true;
	var promise = $http.get(URI.api + "denuncia");
	promise.then(function(response) {
		$scope.loading = false;
		console.log("Here's some reports ", response.data);
		$scope.denuncias = response.data;
	})
});