"use strict";
angular.module('webAppV2App')
.controller('PerfilCtrl', function($scope, $state, $http, flash, ListaLivro, URI){
    angular.element("#texto_header").html("Sinestesia - Perfil");
    $scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
    $scope.flash = flash;
    
    var IDcurso =  $scope.loggedUser().curso;
    var myPro = ListaLivro.getLivros(IDcurso);
    var avatar;
    //var avatar = $scope.loggedUser().nomePersonagem; //puxar do banco
    $scope.pontos =  $scope.loggedUser().pontuacao;
    $scope.isDescritor = ($scope.loggedUser().tipo === "Descritor" || $scope.loggedUser().tipo === "DescritorRevisor");
    if (!$scope.isDescritor) {
        avatar = "GoldenRetriever";
    } else if ($scope.pontos<20){
        avatar = "boxer";
    }
    else if (20<=$scope.pontos<40){
        avatar = "BorderCollie";
    }
    else if (40<=$scope.pontos<60){
        avatar = "PastorAlemao";
    }    
    else if (60<=$scope.pontos<80){
        avatar = "GoldenRetriever";
    }    
    else if ($scope.pontos>=80){
        avatar = "Labrador";
    }
    $scope.end = "http://localhost:1337/images/avatares/"+avatar+".PNG";
    
    myPro.then(function(response){
        $scope.curso = response.data.nome;
        
    });
    
    $scope.nome =  $scope.loggedUser().nome;
    $scope.nusp =  $scope.loggedUser().cpf;
    console.log($scope.pontos);
    
    $scope.showForm = false;

    $scope.changePassword = function(oldPassword, newPassword){
        $scope.changeDataLoading = true;
        $scope.changeFalha = false;
        $scope.changeSucesso = false;

        var passwordChange = {
            login: $scope.loggedUser().login,
            oldPassword: oldPassword,
            newPassword: newPassword
        };

        var changed = $http.post(URI.api + 'usuario/mudarSenha', passwordChange);

        changed.then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                $scope.changeSucesso = true;
                $scope.changeDataLoading = false;

            },
            function(error){
                void(error); //Evitar erro de 'nao utilizado'
                $scope.changeFalha = true;
                $scope.changeDataLoading = false;
            });

    };

    console.log("@TODO PerfilCtrl controller");
});
