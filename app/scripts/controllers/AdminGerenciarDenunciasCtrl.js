"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarDenunciasCtrl', function($scope, $state, $http, ListaUsuario, ListaCurso, URI, flash) {
	angular.element("#texto_header").html("Admin - Denúncias");
	$scope.$state = $state;

});