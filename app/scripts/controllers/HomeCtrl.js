angular.module('webAppV2App')
.controller('HomeCtrl', function($scope, $filter, $state, ListaLivro, Auth){
	var myDataPromise = ListaLivro.getLivros();

	myDataPromise.then(function(response){
		//filtra por id do curso.
        $scope.livros = $filter('filter')(response.data, {curso : {id: $scope.loggedUser().curso}});
     })
	$scope.exit = function(){
		$scope.loggedUser = undefined;
		Auth.logout();
		$state.go("anon.login");
	};
  });