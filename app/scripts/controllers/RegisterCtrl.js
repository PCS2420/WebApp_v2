angular.module('webAppV2App')
    .controller('RegisterCtrl', function($scope, $state, Auth, ListaCurso){
	$scope.$state = $state;
    $scope.falha = false;
    $scope.sucesso = false;
	ListaCurso.getCursos().then(function(response) {
		$scope.cursos = response.data;
	});
	
    $scope.register = function(userInfo) {
        $scope.dataLoading = true;
        userInfo['tipo'] = "Descritor";

        Auth.register(userInfo)
        .then(
            function(response){
                $scope.sucesso = true;
                $state.go('anon.login');
            },
            function(error){
                $scope.falha = true;
                $scope.dataLoading = false;
        })
    };

});