'use strict';

/* Controllers */

var homeControllers=angular.module('homeControllers', []);

homeControllers.controller('HomeCtrl', function($scope, $location, $rootScope, ListaLivro){
	$scope.exit = function(){
		$rootScope.logged = false;
		$rootScope.usuario = undefined;
		$rootScope.username = undefined;
		$rootScope.password = undefined;
		$location.path("/");	
	};
	
	$scope.montaHome = function(){
		var myDataPromise = ListaLivro.getLivros();
		myDataPromise.then(function(response){
            $scope.livros = response.data;   
			console.log($scope.livros);
         })	
	};
	
  });
  
  
homeControllers.factory('ListaLivro', function($http, $rootScope){
	var getLivros = function(){
		return $http.get("http://localhost:1337/livro")
		.success(function(response){
			return response;
		})
		.error(function(error){
			console.log(error);
		});
	};
	return { getLivros: getLivros };
});