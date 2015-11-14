"use strict";
angular.module('webAppV2App')
.controller('RevisaoCtrl', function($scope, $filter, $http, $state, $stateParams, MostraImagem, EnviaDescricao, Auth, flash, URI){
    $scope.$state = $state;
    $scope.flash = flash;

    var imagem_id = $stateParams.imagem_id;
    var myDataPromise = MostraImagem.getImagem(imagem_id);

    myDataPromise.then(function(response) {
        console.log(response.data);
        $scope.imagem = response.data;
        $scope.descritor = response.data.descricao.descritor;
        $scope.formData.texto = $scope.imagem.descricao.texto;
        $scope.descricaoOriginal = $scope.imagem.descricao.texto;
        console.log(response.data);
    });

    $scope.formData = {};

    $scope.cancela = function() {
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
                function(response) {
                    void(response); //Evitar erro de 'nao utilizado'
                    flash.setAlert({msg : 'Descrição aceita com sucesso!', type : 'success'});
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
            EnviaDescricao.editada($scope.imagem.descricao.id, $scope.formData)
            .then(
                function(response) {
                    void(response); //Evitar erro de 'nao utilizado'
                    flash.setAlert({msg : 'Descrição aceita com sucesso!', type : 'success'});
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

        //Rejeita descricao
        EnviaDescricao.rejeitada($scope.imagem.descricao.id, $scope.formData)
        .then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                flash.setAlert({msg : 'Descrição rejeitada com sucesso.', type : 'success'});
                $state.go("revisor.home_revisar");
            },
            function(error) {
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
