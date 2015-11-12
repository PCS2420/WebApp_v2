"use strict";
angular.module('webAppV2App')
.controller('RevisaoCtrl', function($scope, $filter, $state, $stateParams, MostraImagem, EnviaDescricao, Auth, flash, URI){
	angular.element("#texto_header").html("Sinestesia - Revisar");
    $scope.$state = $state;
    $scope.flash = flash;

    	var imagem_id = $stateParams.imagem_id;
	var myDataPromise = MostraImagem.getDescricao(imagem_id);

    myDataPromise.then(function(response){
        $scope.imagem = response.data;
	console.log($scope.imagem);
        $scope.formData.texto = $scope.imagem.descricao.texto;
        $scope.descricaoOriginal = $scope.imagem.descricao.texto;
        console.log(response.data);
    });

    $scope.formData = {};


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
        var formData = $scope.formData;
        formData.revisor = $scope.loggedUser().id;

        if (formData.texto === $scope.descricaoOriginal)
        {
            //Aceita descricao sem editar
            EnviaDescricao.aceita($scope.imagem.descricao.id, $scope.formData)
            .then(
                function(response){
                    void(response); //Evitar erro de 'nao utilizado'
                    flash.setAlert({msg : 'Descrição aceita com sucesso!', type : 'success'});
                    $state.go("revisor.home_revisar");
                },
                function(error){
                    void(error); //Evitar erro de 'nao utilizado'
                    flash.setAlert({msg : 'Ocorreu algum erro ao aceitar a descrição.', type : 'error'});
                    $state.go("revisor.home_revisar");
                }
            );
        }
        else
        {
            //Aceita descricao com correcao
            EnviaDescricao.editada($scope.imagem.descricao.id, $scope.formData)
            .then(
                function(response){
                    void(response); //Evitar erro de 'nao utilizado'
                    flash.setAlert({msg : 'Descrição aceita com sucesso!', type : 'success'});
                    $state.go("revisor.home_revisar");
                },
                function(error){
                    void(error); //Evitar erro de 'nao utilizado'
                    flash.setAlert({msg : 'Ocorreu algum erro ao aceitar a descrição.', type : 'error'});
                    $state.go("revisor.home_revisar");
                }
            );
        }

    };

    $scope.rejeitar = function(){
        var formData = $scope.formData;
        formData.revisor = $scope.loggedUser().id;

        //Rejeita descricao
        EnviaDescricao.rejeitada($scope.imagem.descricao.id, $scope.formData)
        .then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg : 'Descrição rejeitada com sucesso.', type : 'success'});
                $state.go("revisor.home_revisar");
            },
            function(error){
                void(error); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg : 'Ocorreu algum erro ao rejeitar a descrição.', type : 'error'});
                $state.go("revisor.home_revisar");
            }
        );
    };

  // Adiciona a funcionalidade de ouvir a descricao que esta presente no form
  $scope.ouvir= function() {
    var formData = $scope.formData.texto;
    console.log( formData );
    var voice = 'Brazilian Portuguese Female';
    setTimeout(responsiveVoice.speak( formData, voice),15000); // jshint ignore:line
  };


    $scope.w = window.innerWidth;
    $scope.h = window.innerHeight;
    $scope.uri = URI.api;
});
