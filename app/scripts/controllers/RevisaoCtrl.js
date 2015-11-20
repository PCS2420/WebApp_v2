"use strict";
angular.module('webAppV2App')
.controller('RevisaoCtrl', function($scope, $filter, $http, $state, $stateParams, MostraImagem, EnviaDescricao, Auth, flash, URI){
    $scope.$state = $state;
    $scope.flash = flash;
	$scope.loading = true;
	$scope.formData = {};
	
    MostraImagem.getImagem($stateParams.imagem_id).then(function(response) {
        console.log(response.data);
        $scope.imagem = response.data;
        $scope.descritor = response.data.descricao.descritor;
        $scope.formData.texto = $scope.imagem.descricao.texto;
        $scope.descricaoOriginal = $scope.imagem.descricao.texto;
		check($scope.imagem, $scope.loggedUser());
        console.log(response.data);
    });

    
	function check(imagem, usuario){
		if(imagem.estado === "Pronto") {
			console.log("Estado pronto, pode revisar");
			var promise = $http.get(URI.api + "imagem/emRevisao/EmRevisao?revisor=" + usuario.id); // pesquisa por todas imagens em revisao com o usuario que quer revisar essa
			promise.then(function(response){
				console.log(response.data);
				if (response.data.length === 0) {// se nao tem nenhuma, ocupa imagem
					console.log("Ocupando a imagem para revisar");
					ocupado();
				} else {
					console.log({msg : 'O usuario já se encontra revisando outra imagem', type : 'error'});
					$scope.mantemEstado = true;
					$state.go("revisor.home_revisar");
				}
			});
		}
		else if (imagem.estado === "EmRevisao" && usuario.id === imagem.revisor) {
			console.log("Estado EmRevisao, mas também pode descrever");
			$scope.loading = false;
		}			
		else {
			$scope.mantemEstado = true;
			$state.go("revisor.home_revisar");
			console.log("Erro: usuário não pode revisar esta imagem");
		}
	}
	
	
	function ocupado() {//Quando revisor começa a analisar a descrição, ela deve ser reservada dos outros revisores
		var imagem = $scope.imagem;
		imagem.estado = "EmRevisao";
		imagem.revisor = $scope.loggedUser().id;
		
		EnviaDescricao.emRevisao(imagem.id, imagem).then(function(response){
			void(response); //Evitar erro de 'nao utilizado'
			console.log("Voce é o único a fazer a revisão");  
			
		}, function(error){//erro para reservar a revisão
			flash.setAlert({msg : 'Ocorreu algum erro ao realizar a revisão', type : 'error', e: error});
			$state.go("revisor.home_revisar");
		});
	}
	
	$scope.intRevisao = function (){ 
		interrompeRevisao();
    };
	
	function interrompeRevisao() {
		console.log("esperando para interromper revisao");
		var imagem = $scope.imagem;
		$scope.loading = true;
		
        EnviaDescricao.intRevisao(imagem.id, imagem)
        .then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
				$scope.loading = false;
				$state.go("revisor.home_revisar");
            },
            function(error){
				$scope.loading = false;
                flash.setAlert({msg : 'Ocorreu algum erro ao realizar a revisão', type : 'error', e: error});
                $state.go("revisor.home_revisar");
            }
        );
	}
	
	//listener do evento de mudança de rota
    $scope.$on('$stateChangeStart', function () {
        if($scope.mantemEstado) {
            console.log("Descrição enviada");
        } 
		else {
            console.log("a revisao foi interrompida");
            $scope.intRevisao();
        }
    });

    $scope.cancela = function() {
		angular.element("#cancelar").modal('hide');
        flash.setAlert({msg : 'A revisão foi cancelada.', type : 'info'});
        interrompeRevisao();
    };

    $scope.aceitar= function() {
        var formData = $scope.formData;
        formData.revisor = $scope.loggedUser().id;
		angular.element("#aceitar").modal('hide');
        if (formData.texto === $scope.descricaoOriginal)
        {
            //Aceita descricao sem editar
            EnviaDescricao.aceita($scope.imagem.descricao.id, formData)
            .then(
                function(response) {
                    void(response); //Evitar erro de 'nao utilizado'
                    flash.setAlert({msg : 'Descrição aceita com sucesso!', type : 'success'});
					$scope.mantemEstado = true;
                    $state.go("revisor.home_revisar");
                },
                function(error) {
                    void(error); //Evitar erro de 'nao utilizado'
                    flash.setAlert({msg : 'Ocorreu algum erro ao aceitar a descrição.', type : 'error'});
                    $state.go("revisor.home_revisar");
                }
            );
        }
        else
        {
            //Aceita descricao com correcao
            EnviaDescricao.editada($scope.imagem.descricao.id, formData)
            .then(
                function(response) {
                    void(response); //Evitar erro de 'nao utilizado'
                    flash.setAlert({msg : 'Descrição aceita com sucesso!', type : 'success'});
					$scope.mantemEstado = true;
                    $state.go("revisor.home_revisar");
                },
                function(error) {
                    void(error); //Evitar erro de 'nao utilizado'
                    flash.setAlert({msg : 'Ocorreu algum erro ao aceitar a descrição.', type : 'error'});
                    $state.go("revisor.home_revisar");
                }
            );
        }

    };

    $scope.rejeitar = function() {
        var formData = $scope.formData;
        formData.revisor = $scope.loggedUser().id;
		angular.element("#rejeitar").modal('hide');
        //Rejeita descricao
        EnviaDescricao.rejeitada($scope.imagem.descricao.id, formData)
        .then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg : 'Descrição rejeitada com sucesso.', type : 'success'});
				$scope.mantemEstado = true;
                $state.go("revisor.home_revisar");
            },
            function(error) {
				console.log(error);
                void(error); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg : 'Ocorreu algum erro ao rejeitar a descrição.', type : 'error'});
                $state.go("revisor.home_revisar");
            }
        );
    };

    $scope.denunciar = function(formData) {
        formData.descricao = $scope.formData.texto;
        formData.denunciado = $scope.descritor;
        formData.revisor = $scope.loggedUser().id;
        angular.element("#denunciar_modal").modal('hide');
        console.log(formData);
        
        $http.post(URI.api + "denuncia", formData)
        .then(function(response) {
            void(response); //Evitar erro de 'nao utilizado'
            var formData = $scope.formData;
            formData.revisor = $scope.loggedUser().id;

            //Rejeita descricao
            EnviaDescricao.rejeitada($scope.imagem.descricao.id, formData)
            .then(function(response) {
                void(response); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg : 'Descrição denunciada com sucesso.', type : 'success'});
				$scope.mantemEstado = true;
                $state.go("revisor.home_revisar");
            },function(error) {
                void(error);
                flash.setAlert({msg : 'Ocorreu algum erro ao denunciar a descrição.', type : 'error'});
                $state.go("revisor.home_revisar");
            });
        }, function(error) {
            void(error);
            flash.setAlert({msg : 'Ocorreu algum erro ao denunciar a descrição. Cod2', type : 'error'});
            $state.go("revisor.home_revisar");
        });
    };
    
    // Adiciona a funcionalidade de ouvir a descricao que esta presente no form
    $scope.ouvir = function() {
      var formData = $scope.formData.texto;
      console.log( formData );
      var voice = 'Brazilian Portuguese Female';
      setTimeout(responsiveVoice.speak( formData, voice),15000); // jshint ignore:line
    };


    $scope.w = window.innerWidth;
    $scope.h = window.innerHeight;
    $scope.uri = URI.api;
});
