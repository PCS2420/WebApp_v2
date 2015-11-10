angular.module('webAppV2App')
.controller('AdminAdicionarUsuariosCtrl', function($scope, $state, Auth, ListaCurso){
	console.log("@TODO AdminAdicionarUsuariosCtrl controller");
	$scope.$state = $state;
    $scope.falha = false;
    $scope.sucesso = false;
	
	ListaCurso.getCursos().then(function(response) {
		$scope.cursos = response.data;
	});
	
    $scope.register = function(userInfo) {

        $scope.dataLoading = true;
        userInfo['tipo'] = "Revisor";

        Auth.register(userInfo)
        .then(
            function(response){
                $scope.sucesso = true;
                $state.go('admin.adicionar_usuarios');
            },
            function(error){
                $scope.falha = true;
                $scope.dataLoading = false;
        })
    };
});