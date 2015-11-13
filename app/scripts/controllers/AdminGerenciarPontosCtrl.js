"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarPontosCtrl', function($scope, $http, URI, ListaPontuacao){
    angular.element("#texto_header").html("Admin - Configurar Pontos");
    updatePontuacao();
	
	function updatePontuacao() {
		$scope.loading = true;
		var myDataPromise = ListaPontuacao.getPontuacao('563b8932673f34e357b32120');
	    myDataPromise.then(function(response){
			$scope.pontuacao = response.data;
			console.log($scope.pontuacao);
			$scope.loading = false;
		});
	};

	function clearAllFields() {
		angular.element("input").val("");
		updatePontuacao();
	};
	
    $scope.limiarPositivoChange = function(newLimiarPositivo1, newLimiarPositivo2){
        $scope.changeDataLoadingLimiarPositivo = true;
        $scope.changeFalhaLimiarPositivo = false;
        $scope.changeSucessoLimiarPositivo = false;
        
        var atualizaLimiarPositivo = {
            newLimiarPositivo1: newLimiarPositivo1,
            newLimiarPositivo2: newLimiarPositivo2
        };
        
        var changed = $http.post(URI.api + 'pontuacao/mudarLimiarPositivo', atualizaLimiarPositivo);
        changed.then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                $scope.sucesso = true;
                $scope.changeDataLoadingLimiarPositivo = false;
				clearAllFields();
            },
            function(error){
                void(error); //Evitar erro de 'nao utilizado'
                $scope.falha = true;
                $scope.changeDataLoadingLimiarPositivo = false;
        });        
    };
    
    $scope.limiarNegativoChange = function(newLimiarNegativo1, newLimiarNegativo2){
        $scope.changeDataLoadingLimiarNegativo = true;
        $scope.changeFalhaLimiarNegativo = false;
        $scope.changeSucessoLimiarNegativo = false;
        
        var atualizaLimiarNegativo = {
            newLimiarNegativo1: newLimiarNegativo1,
            newLimiarNegativo2: newLimiarNegativo2
        };
        
        var changed = $http.post(URI.api + 'pontuacao/mudarLimiarNegativo', atualizaLimiarNegativo);
        changed.then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                $scope.sucesso = true;
                $scope.changeDataLoadingLimiarNegativo = false;
				clearAllFields();
            },
            function(error){
                void(error); //Evitar erro de 'nao utilizado'
                $scope.falha = true;
                $scope.changeDataLoadingLimiarNegativo = false;
        });        
    };
    
    $scope.descricaoAceitaChange = function(newDescricaoAceita1, newDescricaoAceita2){
        $scope.changeDataLoadingDescricaoAceita = true;
        $scope.changeFalhaDescricaoAceita = false;
        $scope.changeSucessoDescricaoAceita = false;
        
        var atualizaDescricaoAceita = {
            newDescricaoAceita1: newDescricaoAceita1,
            newDescricaoAceita2: newDescricaoAceita2
        };
        
        var changed = $http.post(URI.api + 'pontuacao/mudarDescricaoAceita', atualizaDescricaoAceita);
        changed.then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                $scope.sucesso = true;
                $scope.changeDataLoadingDescricaoAceita = false;
				clearAllFields();
            },
            function(error){
                void(error); //Evitar erro de 'nao utilizado'
                $scope.falha = true;
                $scope.changeDataLoadingDescricaoAceita = false;
        });        
    };
    
    $scope.descricaoEditadaChange = function(newDescricaoEditada1, newDescricaoEditada2){
        $scope.changeDataLoadingDescricaoEditada = true;
        $scope.changeFalhaDescricaoEditada = false;
        $scope.changeSucessoDescricaoEditada = false;
        
        var atualizaDescricaoEditada = {
            newDescricaoEditada1: newDescricaoEditada1,
            newDescricaoEditada2: newDescricaoEditada2
        };
        
        var changed = $http.post(URI.api + 'pontuacao/mudarDescricaoEditada', atualizaDescricaoEditada);
        changed.then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                $scope.sucesso = true;
                $scope.changeDataLoadingDescricaoEditada = false;
				clearAllFields();
            },
            function(error){
                void(error); //Evitar erro de 'nao utilizado'
                $scope.falha = true;
                $scope.changeDataLoadingDescricaoEditada = false;
        });        
        
    };
    
    $scope.descricaoRejeitadaChange = function(newDescricaoRejeitada1, newDescricaoRejeitada2){
        $scope.changeDataLoadingDescricaoRejeitada = true;
        $scope.changeFalhaDescricaoRejeitada = false;
        $scope.changeSucessoDescricaoRejeitada = false;
        
        var atualizaDescricaoRejeitada = {
            newDescricaoRejeitada1: newDescricaoRejeitada1,
            newDescricaoRejeitada2: newDescricaoRejeitada2
        };
        
        var changed = $http.post(URI.api + 'pontuacao/mudarDescricaoRejeitada', atualizaDescricaoRejeitada);
        changed.then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
                $scope.sucesso = true;
                $scope.changeDataLoadingDescricaoRejeitada = false;
				clearAllFields();
            },
            function(error){
                void(error); //Evitar erro de 'nao utilizado'
                $scope.falha = true;
                $scope.changeDataLoadingDescricaoRejeitada = false;
            });        
        
    };
	
});
