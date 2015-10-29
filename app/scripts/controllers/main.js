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
    'authModule',
	'homeControllers'
]);

app.config(function($routeProvider, AccessLevels) {
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
		controller: 'HomeCtrl',
        access: AccessLevels.user
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
        return $http.post("http://localhost:1337/auth/process", {username: user, password: senha})
		// return $http.get("http://localhost:1337/auth/process?login=" + user + "&senha=" + senha)
		.success(function(response){
            if('tipo' in response.user){
                return response.user.tipo;
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
        console.log("USUER")
        console.log(user)
		return $http.post("http://localhost:1337/usuario/cadastro", user)
		.success(function(response){
            console.log("response");
			console.log(response);
			defer.resolve(response);
		})
		.error(function(error){
            console.log("error");
			console.log(error);
			defer.reject(error);
		})
	return defer.promise;
	}
});

app.controller('loginCtrl', function($scope, $location, $rootScope, usuarioTipoService, Auth){
    $scope.user = {
        username: "",
        password: ""
    }

	$scope.falha = false;
    $scope.submit = function(user){
        if(user.username && user.password)
        {

            $scope.errors = [];
            var loginResult = Auth.login($scope.user);
            loginResult.then(function(result) {
                if('token' in result.data){
                    $location.path('/home');
                    $rootScope.logged = true;
                }
                else
                {
                    $scope.falha = true;
                }
            },function(err) {
                $scope.falha = true;
                $scope.errors.push(err);
            });



            // var myDataPromisse = usuarioTipoService.getUserTipo(user.username, user.password);
            // myDataPromisse.then(
            //     function(response){
            //         console.log(response);
            //         $rootScope.usuario = response.data.user;
            //         if(response.data['length'] === 0){
            //             $scope.falha = true;
            //         }
            //         else if($rootScope.usuario.tipo === 'Descritor'){
            //             $rootScope.logged = true;
            //             $location.path('/home');
            //         }
            //     },
            //     function(error){
            //         $scope.falha = true;
            //     }
            // )
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

    $scope.falha = false;
    $scope.sucesso = false;

    $scope.register = function(userInfo) {

        $scope.dataLoading = true;
        userInfo['tipo'] = "Descritor";

        userService.cadastraUser(userInfo)
        .then(
            function(response){
                $scope.sucesso = true;
                $location.path('/login');
            },
            function(error){
                $scope.falha = true;
                $scope.dataLoading = false;
        })
    };

});

app.run(function($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

    if(Auth.isAuthenticated()){
        $rootScope.logged = true;
    }
    else
    {
        $rootScope.logged = false;
    }

      if (!Auth.authorize(next.access)) {

        event.preventDefault();

        $location.path('/login');
      }
    });
  });
