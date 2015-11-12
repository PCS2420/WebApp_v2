"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarUsuariosCtrl', function($scope, $state, ListaUsuario) {
	angular.element("#texto_header").html("Admin - Gerenciar Usuários");
	$scope.$state = $state;
	ListaUsuario.getUsuarios().then(function(response) {
		console.log(response.data);
		$scope.usuarios = response.data;
	});
});
