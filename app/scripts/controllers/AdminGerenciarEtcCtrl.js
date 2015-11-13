"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarEtcCtrl', function($scope, $state, $http, ListaUsuario, ListaCurso, URI, Auth, flash) {
	angular.element("#texto_header").html("Admin - Gerenciar Etc");
	$scope.$state = $state;
	console.log("@todo controller etc");
});