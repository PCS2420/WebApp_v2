"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarCtrl', function($scope, $state, $http, ListaUsuario, ListaCurso, URI, flash) {
	angular.element("#texto_header").html("Admin - Gerenciar");
	$scope.$state = $state;
	console.log("Nada a fazer aqui");
});