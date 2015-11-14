"use strict";
angular.module('webAppV2App')
.controller('DescricaoCtrl', function($scope, $filter, $state, $stateParams, MostraImagem, EnviaDescricao, Auth, flash, URI){
    angular.element("#texto_header").html("Sinestesia - Descrever");
    $scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
    $scope.flash = flash;

    var imagem_id = $stateParams.imagem_id;
    var myDataPromise = MostraImagem.getDescricao(imagem_id);

    myDataPromise.then(function(response){
        $scope.imagem = response.data;
        console.log($scope.imagem);
        $scope.update = response.data;
        console.log(response.data);
        ocupado();
    });
    $scope.formData = {};

    //atualiza o status do livro para EmAndamento, para reserva-lo ao usuario
    function ocupado() {
        var update = $scope.update;
        update.estado = "EmAndamento";
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
        if($scope.enviou) {
            console.log("Descrição enviada");
        } else {
            console.log("a descricao foi interrompida");
            $scope.intDescricao();
        }
    });

    $scope.cancela = function () {
        flash.setAlert({msg: 'A descrição foi cancelada.', type: 'info'});
        $state.go("user.home_descrever");
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
                $scope.enviou = true;
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
