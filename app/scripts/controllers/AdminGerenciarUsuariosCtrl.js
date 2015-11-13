"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarUsuariosCtrl', function($scope, $state, $http, ListaUsuario, ListaCurso, URI, flash) {
	angular.element("#texto_header").html("Admin - Gerenciar Usuários");
	$scope.$state = $state;
	$scope.sucesso_update = false;
	$scope.sucesso_ban = false;
	$scope.falha = false;
	
	ListaCurso.getCursos().then(function(response) {
	  $scope.cursos = response.data;
	  ListaUsuario.getUsuarios().then(function(response) {
		console.log(response.data);
		$scope.usuarios = response.data;
	  });
	});

	$scope.fillEdit = function(user_id) {
		var line = angular.element('#'+user_id).find("td");
		var curso = angular.element('#'+user_id).find("input")[0].value;
		angular.element("#user_nome").val($(line[0]).html());
		angular.element("#user_login").val($(line[1]).html());
		angular.element("#user_cpf").val($(line[2]).html());
		angular.element("#user_curso").val(curso);
		angular.element("#user_tipo").val($(line[4]).html());
		angular.element("#user_pontuacao").val($(line[5]).html());
		$scope.updateUser = {id:user_id, 
							nome: $(line[0]).html(), 
							login: $(line[1]).html(),
							cpf: $(line[2]).html(),
							curso: curso,
							tipo: $(line[4]).html(),
							pontuacao: $(line[5]).html()};
	}
	
	$scope.fillBan = function(user_id) {
		console.log(user_id);
		angular.element("#ban_user_id").val(user_id);
		$scope.banUser = {id:user_id};
	};
	
	$scope.fillDelete = function(user_id) {
		console.log(user_id);
		$scope.deleteUser = {id:user_id};
		angular.element("#delete_user_id").val(user_id);
	};
	
	$scope.update = function(formData) {
		console.log(formData);
		var promise = $http.put(URI.api+'usuario/'+formData.id, formData);
		promise.then(function(response){
			console.log(response);
			angular.element("#edit").modal('hide');
			$scope.sucesso_update = true;
			
		  ListaUsuario.getUsuarios().then(function(response) {
			$scope.usuarios = response.data;
			$('html, body').animate({ scrollTop: 0 }, 'fast');
		  });
		});
	}
	
	$scope.ban = function(formData) {
		console.log(formData);
		formData['tipo'] = 'Banido';
		var promise = $http.put(URI.api+'usuario/'+formData.id, formData);
		promise.then(function(response) {
			angular.element("#delete").modal('hide');
			$scope.sucesso_ban = true;
			
		  ListaUsuario.getUsuarios().then(function(response) {
			$scope.usuarios = response.data;
			$('html, body').animate({ scrollTop: 0 }, 'fast');
		  });
		});
	}
	
	$scope.delete = function(formData) {
		console.log(formData);
		var promise = $http.delete(URI.api+'usuario/'+formData.id);
		promise.then(function(response) {
			angular.element("#delete").modal('hide');
			$scope.sucesso_delete = true;
			
		  ListaUsuario.getUsuarios().then(function(response) {
			$scope.usuarios = response.data;
			$('html, body').animate({ scrollTop: 0 }, 'fast');
		  });
		});
	}
});