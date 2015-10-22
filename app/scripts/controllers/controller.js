'use strict';

var app = angular.module('mainApp',[
  'ngRoute',
  'ngResource',  
  'ui.bootstrap',
  'phonecatAnimations',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices']);

// Routes!

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.logged){
					$location.path("/phones");
				}		
			}
		},
		templateUrl: 'login.html'
	})
	.when('/dashboard', {
		resolve: {
			"check": function($location, $rootScope) {
				if(!$rootScope.logged){
					$location.path("/");
				}		
			}
		},
		redirectTo: '/phones'
	})
	.when('/phones', {
		resolve: {
			"check": function($location, $rootScope) {
				if(!$rootScope.logged){
					$location.path("/");
				}		
			}
		},
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
    })
    .when('/phones/:phoneId', {
    	resolve: {
			"check": function($location, $rootScope) {
				if(!$rootScope.logged){
					$location.path("/");
				}		
			}
		},
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
    })
    .when('/register', {
        templateUrl: 'register.view.html',
    })
	.otherwise({
		redirectTo: '/'
	});
});

// End Routes!

// Factorys!

app.factory('usuarioTipoService', function($http, $rootScope){
	var getUserTipo = function(user, senha){
		return $http.get("http://localhost:1337/usuario?login=" + user + "&senha=" + senha)
		.success(function(response){
			return response[0].tipo;
		});
	};
	return { getUserTipo: getUserTipo };
});

app.service('userService', function userService($http, $q){

	var userService = this;

	userService.cadastraUser = function(user){
		var defer = $q.defer();
		return $http.post("http://localhost:1337/usuario/cadastro", user)
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

// End Factorys!
// Controllers!

app.controller('loginCtrl', function($scope, $location, $rootScope, usuarioTipoService){
	$scope.submit = function(){
		var myDataPromisse = usuarioTipoService.getUserTipo($scope.username, $scope.password);
		myDataPromisse.then(function(response){
			//console.log(response.data[0].tipo);
			$rootScope.usuario = response.data[0];
			if(response.data[0].tipo === 'Descritor'){
			$rootScope.logged = true;
			$location.path('/dashboard');
			}
			else{
				alert("nop");
			}
		})
	};
	$scope.register = function(){
		$location.path('/register');
	}
});

app.controller('registerCtrl', function($scope, $location, userService){


    $scope.register = function() {

        $scope.falha = false;
        $scope.sucesso = false;
        $scope.user.tipo = "Descritor"
        $scope.dataLoading = true;
        userService.cadastraUser($scope.user)
        .then(
            function(response){
                $scope.sucesso = true;
                $location.path('/login');
            },
            function(error){
        })
    };

});

// End Controllers!