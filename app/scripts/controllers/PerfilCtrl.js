"use strict";
angular.module('webAppV2App')
.controller('PerfilCtrl', function($scope, $state, $http, flash, ListaLivro, URI){
    angular.element("#texto_header").html("Sinestesia - Perfil");
    $scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
    $scope.flash = flash;
    
    var avatar;
	var faltam;
	var myPromise = $http.get(URI.api + "pontuacao");
    $scope.pontos = $scope.loggedUser().pontuacao;
	var color = ["success", "info", "warning", "danger"];

	myPromise.then(function(response){
		var pontosDB = response.data[0];
		var lp = parseInt(pontosDB.limiarPositivo);
		var ln = parseInt(pontosDB.limiarNegativo);
		var pt = parseInt($scope.pontos);
                void(ln); //Evitar mensagem de 'nao utilizado'		
		if (pt >= 0 && pt < lp){
			faltam = parseInt(pontosDB.limiarPositivo)-$scope.pontos;	
			$scope.aviso = "Faltam "+faltam+" ponto(s) para voce ser um descritor revisor.";
		}
		else if (pt<0) {
			faltam = Math.abs($scope.pontos - parseInt(pontosDB.limiarNegativo));
			$scope.aviso = "Cuidado! Voce sera bloqueado se perder mais "+faltam+" ponto(s).";
		}
		else if (pt >= lp) {
			$scope.aviso = "Voce e um descritor revisor =D";			
		}
		$scope.limiar = parseInt(pontosDB.limiarPositivo);
		$scope.limiarNegativo = parseInt(pontosDB.limiarNegativo);
		if ($scope.pontos>=0){
				$scope.color = color[0];
				$scope.barText = "Pontos no level atual:";
			}
			else{
				$scope.color = color[3];
				$scope.pontos = -$scope.pontos;
				$scope.limiar = -$scope.limiarNegativo;
				$scope.barText = "Pontos negativos:";
			}
		    $scope.isDescritor = ($scope.loggedUser().tipo === "Descritor" || $scope.loggedUser().tipo === "DescritorRevisor");
			var intervalo = Math.floor(parseInt(pontosDB.limiarPositivo)/4);
			var resto = parseInt(pontosDB.limiarPositivo)%4;
			if (!$scope.isDescritor) {
				avatar = "GoldenRetriever";
			} else if ($scope.pontos<intervalo +resto){
				avatar = "boxer";
			}
			else if (intervalo +resto<=$scope.pontos && $scope.pontos<2*intervalo +resto){
				avatar = "BorderCollie";
			}
			else if (2*intervalo +resto<=$scope.pontos && $scope.pontos<3*intervalo +resto){
				avatar = "PastorAlemao";
			}    
			else if (3*intervalo +resto<=$scope.pontos && $scope.pontos<4*intervalo +resto){
				avatar = "GoldenRetriever";
			}    
			else if ($scope.pontos>=parseInt(pontosDB.limiarPositivo)){
				avatar = "Labrador";
    }
    $scope.end = URI.api + "images/avatares/"+avatar+".PNG";
	});

    var myPro = $http.get(URI.api + "curso/" + $scope.loggedUser().curso);
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

    
});
