angular.module('webAppV2App')
.controller('RevisaoCtrl', function($scope, $filter, $state, $stateParams, MostraImagem, EnviaDescricao, Auth, flash, URI){
	$scope.$state = $state;
	$scope.flash = flash;

	var imagem_id = $stateParams.imagem_id
	var myDataPromise = MostraImagem.getImagem(imagem_id);

	myDataPromise.then(function(response){
		$scope.imagem = response.data;
		$scope.formData = response.data;
		$scope.descricaoOriginal = $scope.imagem.descricao
		console.log(response.data)
    });

    $scope.formData = {}


	$scope.exit = function(){
		$scope.loggedUser = undefined;
		Auth.logout();
		$state.go("anon.login");
	};

	$scope.cancela = function(){
		flash.setAlert({msg : 'A revisão foi cancelada.', type : 'info'});
		$state.go("revisor.home_revisar");
	};

	$scope.aceitar= function() {
		var formData = $scope.formData
		formData.estado = "Revisado"


		if (formData.descricao == $scope.descricaoOriginal)
		{
			//Aceita descricao sem editar
			EnviaDescricao.aceita($scope.imagem.id, $scope.formData)
        	.then(
	            function(response){
					flash.setAlert({msg : 'Descrição aceita com sucesso!', type : 'success'});
					$state.go("revisor.home_revisar");
	            },
	            function(error){
					flash.setAlert({msg : 'Ocorreu algum erro ao aceitar a descrição.', type : 'error'});
					$state.go("revisor.home_revisar");
				}
			)
		}
		else
		{
			//Aceita descricao com correcao
			EnviaDescricao.editada($scope.imagem.id, $scope.formData)
        	.then(
	            function(response){
					flash.setAlert({msg : 'Descrição aceita com sucesso!', type : 'success'});
					$state.go("revisor.home_revisar");
	            },
	            function(error){
					flash.setAlert({msg : 'Ocorreu algum erro ao aceitar a descrição.', type : 'error'});
					$state.go("revisor.home_revisar");
				}
			)
		}

    };

	$scope.rejeitar = function(){
		var formData = $scope.formData
		formData.estado = "Aberto"

		//Rejeita descricao
		EnviaDescricao.rejeitada($scope.imagem.id, $scope.formData)
		.then(
			function(response){
				flash.setAlert({msg : 'Descrição rejeitada com sucesso.', type : 'success'});
				$state.go("revisor.home_revisar");
			},
			function(error){
				flash.setAlert({msg : 'Ocorreu algum erro ao rejeitar a descrição.', type : 'error'});
				$state.go("revisor.home_revisar");
			}
		)
	};


	$scope.w = window.innerWidth;
    $scope.h = window.innerHeight;
    $scope.uri = URI.api;
});
