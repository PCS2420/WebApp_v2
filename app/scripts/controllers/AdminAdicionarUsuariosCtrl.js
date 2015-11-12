angular.module('webAppV2App')
.controller('AdminAdicionarUsuariosCtrl', function($scope, $state, Auth, ListaCurso){
	angular.element("#texto_header").html("Admin - Incluir Revisores");
	$scope.$state = $state;
    $scope.falha = false;
    $scope.sucesso = false;
	
	ListaCurso.getCursos().then(function(response) {
		$scope.cursos = response.data;
	});
	
    $scope.registerAdmin = function(userInfo) {

        $scope.dataLoading = true;
        userInfo['tipo'] = "Revisor";
		userInfo['senha'] = userInfo['login']; // same pass as uname

		Auth.register(userInfo)
		.then(
			function(response){
				$scope.sucesso = true;
				$scope.dataLoading = false;
				$scope.user = null;
		   },
			function(error){
				$scope.falha = true;
				$scope.dataLoading = false;
		});
    };
});