angular.module('webAppV2App')
.controller('LivroCtrl', function($scope, $filter, $state, $stateParams, ListaImagem, Auth){
	$scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router

	var livro_id = $stateParams.livro_id
	var myDataPromise = ListaImagem.getImagens(livro_id);

	myDataPromise.then(function(response){
		//filtra por id do curso.
        //$scope.imagens = $filter('filter')(response.data, {curso : {id: $scope.loggedUser().curso}});
		$scope.imagens = response.data;
		console.log(response.data)
    });
	$scope.exit = function(){
		$scope.loggedUser = undefined;
		Auth.logout();
		$state.go("anon.login");
	};

	$scope.w = window.innerWidth;
    $scope.h = window.innerHeight;
    $scope.uri = "http://localhost:1337"; 
});
