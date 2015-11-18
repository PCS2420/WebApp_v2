"use strict";
angular.module('webAppV2App')
.controller('DescricaoCtrl', function($scope, $http, $filter, $state, $stateParams, MostraImagem, EnviaDescricao, Auth, flash, URI){
    angular.element("#texto_header").html("Sinestesia - Descrever");
    $scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
    $scope.flash = flash;
	$scope.descId = "-1";
	$scope.loading = true;
	$scope.formData = {}; // limpa o formulario

    MostraImagem.getDescricao($stateParams.imagem_id).then(function(response){
        $scope.imagem = response.data;
        console.log($scope.imagem);
		check($scope.imagem, $scope.loggedUser()); //verifica se o usuario pode mesmo entrar aqui
    });
	
	function check(imagem, usuario){
		if(imagem.estado == "Aberto") {
			console.log("Estado aberto, pode descrever");
			var promise = $http.get(URI.api + "imagem/estado/EmAndamento?descritor=" + usuario.id); // pesquisa por todas imagens em andamento com o usuario bla
			promise.then(function(response){
				if (response.data.length == 0) {// se nao tem nenhuma, ocupa imagem
					console.log("Ocupando a imagem");
					ocupado();
				} else {
					console.log({msg : 'O usuario já se encontra descrevendo outra imagem', type : 'error'});
					$scope.mantemEstado = true;
					$state.go("user.home_descrever");
				}
			});
		}
		else if (imagem.estado == "EmAndamento" && usuario.id == imagem.descritor) {
			console.log("Estado EmAndamento, mas também pode descrever");
			if ($scope.imagem.histDescricoes !== undefined){
				var hist = $scope.imagem.histDescricoes;
				$scope.formData.texto = hist[hist.length - 1].texto;
			}
			$scope.loading = false;
		}			
		else {
			$scope.mantemEstado = true;
			$state.go("user.home_descrever");
			console.log("Erro: usuário não pode descrever imagem");
		}
	}

    //atualiza o status do livro para EmAndamento, para reserva-lo ao usuario
    function ocupado() {
        var imagem = $scope.imagem;
        imagem.estado = "EmAndamento";
		imagem.descritor = $scope.loggedUser().id;
		
        EnviaDescricao.emAndamento(imagem.id, imagem).then(function(response){
			void(response); //Evitar erro de 'nao utilizado'
			console.log("VOCE ESTA SUJANDO O BANCO DE DADOS, NAO ESQUECA DE DESSUJA-LO");    
			console.log({msg : 'Você é o único descrevendo', type : 'success'});
			
			// Pega os dados para salvar a descricao
			var descricaoAtual = $scope.formData; // so o texto
			descricaoAtual.imagem = $stateParams.imagem_id;
			descricaoAtual.descritor = $scope.loggedUser().id;
			descricaoAtual.estado = "Salvo";
			descricaoAtual.descId = "-1"; // precisa ser -1, pois a descricao nao existe ainda
			// agora que a imagem foi atualizada, criar descricao
			EnviaDescricao.salvar(descricaoAtual)
			.then(function (response) {
				void(response); //Evitar erro de 'nao utilizado'
				console.log({msg: 'A descricao foi criada pela primeira vez com sucesso!', type: 'success'});
				$scope.descId = response.data.id;
				$scope.loading = false;
			}, function (error) {
				flash.setAlert({msg : 'Ocorreu algum erro ao realizar a descrição', type : 'error', e: error});
				$state.go("user.home_descrever");
			});
			
		}, function(error){
			flash.setAlert({msg : 'Ocorreu algum erro ao realizar a descrição', type : 'error', e: error});
			$state.go("user.home_descrever");
		});
    }
    
    //caso descricao seja interrompida por mudança de rota, voltar ao estado inicial
    $scope.intDescricao = function (){ 
		interrompeDescricao();
    };
	
	function interrompeDescricao() {
		console.log("esperando para interromper descricao");
		var imagem = $scope.imagem;
		imagem.descId = $scope.descId;
		$scope.loading = true;
		
        EnviaDescricao.intDescricao(imagem.id, imagem)
        .then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
				$scope.loading = false;
				$state.go("user.home_descrever");
            },
            function(error){
				$scope.loading = false;
                flash.setAlert({msg : 'Ocorreu algum erro ao realizar a descrição', type : 'error', e: error});
                $state.go("user.home_descrever");
            }
        );
	}
    
    //listener do evento de mudança de rota
    $scope.$on('$stateChangeStart', function () {
        if($scope.mantemEstado) {
            console.log("Descrição enviada");
        } 
		else {
            console.log("a descricao foi interrompida");
            $scope.intDescricao();
        }
    });

    $scope.cancela = function () { //@todo destruir tudo
        flash.setAlert({msg: 'A descrição foi cancelada.', type: 'info'});
		interrompeDescricao();
    };
	
	$scope.salva = function() {
        var formData = $scope.formData;
		formData.imagem = $stateParams.imagem_id;
        formData.descritor = $scope.loggedUser().id;
		formData.descId = $scope.descId; // deve estar preenchido
		formData.estado = "Salvo";
		
        EnviaDescricao.salvar(formData)
        .then(
            function (response) {
                void(response); //Evitar erro de 'nao utilizado'
				$scope.descId = response.data.id;
            },
            function (error) {
                flash.setAlert({msg : 'Ocorreu algum erro ao realizar a descrição', type : 'error', e: error});
            }
        );
    };
	
    $scope.enviar = function() {
		$scope.loading = true;
        var formData = $scope.formData; //pegando so o texto
        formData.imagem = $stateParams.imagem_id;
        formData.descritor = $scope.loggedUser().id;
		formData.descId = $scope.descId;

        EnviaDescricao.enviar(formData)
        .then(
            function (response) {
                void(response); //Evitar erro de 'nao utilizado'
				$scope.loading = false;
                flash.setAlert({msg: 'A descrição foi feita com sucesso!', type: 'success'});
                $scope.mantemEstado = true;
                $state.go("user.home_descrever");
            },
            function (error) {
				flash.setAlert({msg : 'Ocorreu algum erro ao realizar a descrição', type : 'error', e: error});
                $state.go("user.home_descrever");
            }
        );
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

angular.module('webAppV2App').
directive('backupAutomatico', function($rootScope) {
    void($rootScope); //Evitar erro de 'nao utilizado'
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {   
            void(element); //Evitar erro de 'nao utilizado'
            void(attrs); //Evitar erro de 'nao utilizado'
			var count = 0;
            scope.$watch("formData.texto", function(newValue, oldValue) {
                void(newValue); //Evitar erro de 'nao utilizado'
                void(oldValue); //Evitar erro de 'nao utilizado'
				count++;
				if (count >= 10){
					scope.salva();
					count = 0;
					console.log("backup automatico!");
				}
            });
        }
    };
});
