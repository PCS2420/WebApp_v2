"use strict";
angular.module('webAppV2App')
.controller('DescricaoCtrl', function($scope, $http, $filter, $state, $stateParams, MostraImagem, EnviaDescricao, Auth, flash, URI){
    angular.element("#texto_header").html("Sinestesia - Descrever");
    $scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
    $scope.flash = flash;

	$scope.descId = "-1";
	
    var imagem_id = $stateParams.imagem_id;
    var myDataPromise = MostraImagem.getDescricao(imagem_id);

    myDataPromise.then(function(response){
        $scope.imagem = response.data;
        console.log($scope.imagem);
        $scope.update = response.data;
        console.log(response.data);
		check($scope.imagem, $scope.loggedUser());
    });
    $scope.formData = {};
	
	function check(imagem, usuario){
		if(imagem.estado == "Aberto"){
			console.log("Estado aberto, pode descrever");
			var promise = $http.get(URI.api + "imagem/estado/EmAndamento?descritor=" + usuario.id);
			promise.then(function(response){
				if (response.data.length == 0)
					ocupado();
				else{
						flash.setAlert({msg : 'O usuario já se encontra descrevendo outra imagem', type : 'error'});
						$scope.mantemEstado = true;
						$state.go("user.home_descrever");
				}
			})
			
		}
		else if (imagem.estado == "EmAndamento" && usuario.id == imagem.descritor){
			console.log("Estado EmAndamento, mas também pode descrever");
			if ($scope.imagem.histDescricoes !== undefined){
				var hist = $scope.imagem.histDescricoes;
				$scope.formData.texto = hist[hist.length - 1].texto;
			}
		}			
		else{
			$scope.mantemEstado = true;
			$state.go("user.home_descrever");
			console.log("Erro: usuário não pode descrever imagem");
		}
	}

    //atualiza o status do livro para EmAndamento, para reserva-lo ao usuario
    function ocupado() {
        var update = $scope.update;
        update.estado = "EmAndamento";
		update.descritor = $scope.loggedUser().id;
        var promise = EnviaDescricao.emAndamento(update.id, update);
        promise.then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                console.log("VOCE ESTA SUJANDO O BANCO DE DADOS, NAO ESQUECA DE DESSUJA-LO");    
                flash.setAlert({msg : 'Você é o único descrevendo', type : 'success'});
            },
            function(error){
                void(error); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg : 'Ocorreu algum erro ao reservar a descrição', type : 'error'});
                $state.go("user.home_descrever");
            }
        );
    }
    
    //caso descricao seja interrompida por mudança de rota, voltar ao estado inicial
    $scope.intDescricao = function (){ 
        var update = $scope.update;
        update.estado = "Aberto";
		update.descritor = "";
        EnviaDescricao.intDescricao($scope.imagem.id, $scope.update)
        .then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg : 'Mudou rota', type : 'success'});
            },
            function(error){
                void(error); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg : 'Ocorreu algum erro ao realizar a descrição', type : 'error'});
                $state.go("user.home_descrever");
            }
        );
    };
    
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

    $scope.cancela = function () {
        flash.setAlert({msg: 'A descrição foi cancelada.', type: 'info'});
        $state.go("user.home_descrever");
    };
	
	$scope.salva = function() {
        var formData = $scope.formData;
		formData.imagem = $stateParams.imagem_id;
        formData.descritor = $scope.loggedUser().id;
		
		$scope.formData.descId = $scope.descId;

        EnviaDescricao.salvar($scope.formData)
        .then(
            function (response) {
                void(response); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg: 'A descrição foi salva com sucesso!', type: 'success'});
				$scope.descId = response.data.id;
            },
            function (error) {
                void(error); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg: 'Ocorreu algum erro ao salvar a descrição', type: 'error'});
            }
        );
    };
	
    $scope.enviar = function() {
        var formData = $scope.formData;
        formData.imagem = $stateParams.imagem_id;
        formData.descritor = $scope.loggedUser().id;

        EnviaDescricao.enviar($scope.formData)
        .then(
            function (response) {
                void(response); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg: 'A descrição foi feita com sucesso!', type: 'success'});
                $scope.mantemEstado = true;
                $state.go("user.home_descrever");
            },
            function (error) {
                void(error); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg: 'Ocorreu algum erro ao realizar a descrição', type: 'error'});
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
