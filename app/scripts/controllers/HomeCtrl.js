angular.module('webAppV2App')
.controller('HomeCtrl', function($scope, $state, $rootScope, ListaLivro, Auth){
	var myDataPromise = ListaLivro.getLivros();
	myDataPromise.then(function(response){
        $scope.livros = response.data;
     })
	$scope.exit = function(){
		// $rootScope.usuario = undefined;
		// $rootScope.username = undefined;
		// $rootScope.password = undefined;
		Auth.logout();
		$state.go("anon.login");
	};
  });