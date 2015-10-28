'use strict';

/* Controllers */






var descricaoControllers=angular.module('descricaoControllers', ['ngAnimate', 'ui.bootstrap']);

descricaoControllers.controller('DescricaoCtrl', function($scope,$route, $http, $routeParams, $location, $rootScope,$uibModal, $log, MostraImagem, enviaDescricao){

	$scope.formData = {}

	$scope.alerts = [];

	$scope.addAlert = function() {
	   $scope.alerts.push({ type: 'success', msg: 'Descrição enviada com sucesso!' });
	};

	$scope.closeAlert = function(index) {
	   $scope.alerts.splice(index, 1);
	};
	$scope.exit = function(){
		$rootScope.logged = false;
		$rootScope.usuario = undefined;
		$rootScope.username = undefined;
		$rootScope.password = undefined;
		$location.path("/");	
	};
	
	$scope.montaPagina = function(){
		var myDataPromise = MostraImagem.getImagem($routeParams.imagem_id);
		myDataPromise.then(function(response){
            $scope.imagem= response.data; 

			console.log($scope.imagem);
         })	
	};

	$scope.enviar= function() {
		var formData = $scope.formData
		formData.imagem = $scope.imagem.id
		formData.estado = "Pronto"
        enviaDescricao.enviar($scope.formData)
        .then(
            function(response){
                $scope.sucesso = true;
                $scope.addAlert()
                //$location.path('/login');
            },
            function(error){
        })
    };
	
  });
  

descricaoControllers.factory('MostraImagem', function($http, $rootScope){
	var getImagem = function(imagem_id){
		return $http.get("http://localhost:1337/imagem/" + imagem_id)
		.success(function(response){
			return response;
		})
		.error(function(error){
			console.log(error);
		});
	};
	return { getImagem: getImagem };
});



app.service('enviaDescricao', function enviaDescricao($http, $q){

	var enviaDescricao = this;

	enviaDescricao.enviar = function(formData){
		console.log(formData)
		var defer = $q.defer();
		return $http.post("http://localhost:1337/descricao", formData)
		.success(function(response){
			console.log(response);
			defer.resolve(response);
		})
		.error(function(error){
			console.log(error);
			defer.reject(error);
		})
	return defer.promise;
	}
});

