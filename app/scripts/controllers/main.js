'use strict';

/**
 * @ngdoc function
 * @name webAppV2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webAppV2App
 */
var app=angular.module('webAppV2App',[
	'ngRoute',
	'ngResource',
	'ui.bootstrap',
	'homeControllers'
]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		resolve: {
			"check": function($location, $rootScope) {
				if($rootScope.logged){
					$location.path("/home");
				}
			}
		},
		templateUrl: 'views/login.html',
		controller: 'loginCtrl'
	})
	.when('/home', {
		resolve: {
			"check": function($location, $rootScope) {
				if(!$rootScope.logged){
					$location.path("/");
				}
			}
		},
        templateUrl: 'views/home.html',
		controller: 'HomeCtrl'
    })
    .when('/register', {
        templateUrl: 'views/register.html',
		controller: 'registerCtrl'
    })
	.otherwise({
		redirectTo: '/'
	});
});

app.factory('usuarioTipoService', function($http, $rootScope){
	var getUserTipo = function(user, senha){
		return $http.get("http://localhost:1337/usuario?login=" + user + "&senha=" + senha)
		.success(function(response){
            if('tipo' in response){
                return response[0].tipo;
            }
            return null;
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

app.controller('loginCtrl', function($scope, $location, $rootScope, usuarioTipoService){
	$scope.falha = false;
    $scope.naoDescritor = false;
    $scope.submit = function(){
        if($scope.username && $scope.password)
        {
            var myDataPromisse = usuarioTipoService.getUserTipo($scope.username, $scope.password);
            myDataPromisse.then(
                function(response){
                    console.log(response);
                    $rootScope.usuario = response.data[0];
                    if(response.data['length'] === 0){
                        $scope.falha = true;
                    }
                    else if(response.data[0].tipo === 'Descritor'){
                        $rootScope.logged = true;
                        $location.path('/home');
                    }
                    else{
                        $scope.naoDescritor = true;
                    }
                },
                function(error){
                    $scope.falha = true;
                }
            )
        }
        else{
            $scope.falha = true;
        }
	};
	$scope.register = function(){
		$location.path('/register');
	}
});

app.controller('registerCtrl', function($scope, $location, userService){


    $scope.register = function() {

        $scope.falha = false;
        $scope.sucesso = false;
        $scope.dataLoading = true;
        $scope.user['tipo'] = "Descritor";

        userService.cadastraUser($scope.user)
        .then(
            function(response){
                $scope.sucesso = true;
                $location.path('/login');
            },
            function(error){
                $scope.causa = error;
                $scope.falha = true;
                $scope.dataLoading = false;
        })
    };

});

