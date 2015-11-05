angular.module('webAppV2App')
.controller('RevisaoCtrl', function($scope, $filter, $state, $stateParams, MostraImagem, EnviaDescricao, Auth, flash){
	$scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
	$scope.flash = flash;
	
	var imagem_id = $stateParams.imagem_id
	var myDataPromise = MostraImagem.getImagem(imagem_id);

	myDataPromise.then(function(response){
		//filtra por id do curso.
        //$scope.imagens = $filter('filter')(response.data, {curso : {id: $scope.loggedUser().curso}});
		$scope.imagem = response.data;
		$scope.formData = response.data;
		console.log(response.data)		
    });

    $scope.formData = {}
	
	$scope.alerts = [];

	$scope.addAlert = function() {
	   $scope.alerts.push({ type: 'success', msg: 'Descrição revisada com sucesso!' });
	};

	$scope.closeAlert = function(index) {
	   $scope.alerts.splice(index, 1);
	};

	$scope.exit = function(){
		$scope.loggedUser = undefined;
		Auth.logout();
		$state.go("anon.login");
	};

	$scope.cancela = function(){
		flash.setAlert({msg : 'A revisão foi cancelada.', type : 'info'});
		$state.go("user.home_revisar");
	};

	$scope.mostraContexto = function(){
		//$state.go("anon.login");
	};

	$scope.aceitar= function() {
		var formData = $scope.formData
		formData.estado = "Revisado"
        EnviaDescricao.enviar($scope.imagem.id, $scope.formData)
        .then(
            function(response){
				flash.setAlert({msg : 'Descrição aceita com sucesso!', type : 'success'});
				$state.go("user.home_revisar");
            },
            function(error){
				flash.setAlert({msg : 'Ocorreu algum erro ao aceitar a descrição.', type : 'error'});
				$state.go("user.home_revisar");
			}
		)
    };
	
	$scope.rejeitar = function(){
		var formData = $scope.formData
		formData.estado = "Aberto"
		formData.descricao = ""
		EnviaDescricao.enviar($scope.imagem.id, $scope.formData)
		.then(
			function(response){
				flash.setAlert({msg : 'Descrição rejeitada com sucesso.', type : 'success'});
				$state.go("user.home_revisar");
			},
			function(error){
				flash.setAlert({msg : 'Ocorreu algum erro ao rejeitar a descrição.', type : 'error'});
				$state.go("user.home_revisar");
			}
		)
	};
	

	$scope.w = window.innerWidth;
    $scope.h = window.innerHeight;
    $scope.uri = "http://localhost:1337"; 
});