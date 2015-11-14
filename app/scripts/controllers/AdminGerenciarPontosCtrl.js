"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarPontosCtrl', function($scope, $http, URI, ListaPontuacao){
    angular.element("#texto_header").html("Admin - Configurar Pontos");
    updatePontuacao();
	
	function updatePontuacao() {
		$scope.loading = true;
	    ListaPontuacao.getPontuacao('563b8932673f34e357b32120').then(function(response){
			$scope.pontuacao = response.data;
			console.log($scope.pontuacao);
			$scope.loading = false;
		});
	};

	function clearAllFields() {
		angular.element("input").val("");
		updatePontuacao();
	};
	
    $scope.limiarPositivoChange = function(lim, conf){
		$scope.changeDataLoadingLimiarPositivo = true;
        if (lim === conf) {
			$http.post(URI.api + 'pontuacao/mudarLimiarPositivo', {newLimiarPositivo1: lim,newLimiarPositivo2: lim})
			.then(function(response){
				void(response); //Evitar erro de 'nao utilizado'
				$scope.changeDataLoadingLimiarPositivo = false;
				$scope.sucesso = true;
				clearAllFields();
			}, function(error){
				void(error); //Evitar erro de 'nao utilizado'
				$scope.falha = true;
				$scope.changeDataLoadingLimiarPositivo = false;
			});
		} else {
			$scope.falha_confirmacao = true;
			$scope.changeDataLoadingLimiarPositivo = false;
		}
    };
    
    $scope.limiarNegativoChange = function(lim, conf){
		$scope.changeDataLoadingLimiarNegativo = true;
		if (lim === conf) {
			$http.post(URI.api + 'pontuacao/mudarLimiarNegativo', {newLimiarNegativo1: lim,newLimiarNegativo2: lim})
			.then(function(response){
				void(response); //Evitar erro de 'nao utilizado'
				$scope.changeDataLoadingLimiarNegativo = false;
				$scope.sucesso = true;
				clearAllFields();
			}, function(error){
				void(error); //Evitar erro de 'nao utilizado'
				$scope.falha = true;
				$scope.changeDataLoadingLimiarNegativo = false;
			});
		} else {
			$scope.falha_confirmacao = true;
			$scope.changeDataLoadingLimiarNegativo = false;
		}
    };
    
    $scope.descricaoAceitaChange = function(pto, conf){
        $scope.changeDataLoadingDescricaoAceita = true;
		if (pto === conf) {
			$http.post(URI.api + 'pontuacao/mudarDescricaoAceita', {newDescricaoAceita1: pto,newDescricaoAceita2: pto}).then(
				function(response){
					void(response); //Evitar erro de 'nao utilizado'
					$scope.changeDataLoadingDescricaoAceita = true;
					$scope.sucesso = true;
					clearAllFields();
				},
				function(error){
					void(error); //Evitar erro de 'nao utilizado'
					$scope.falha = true;
					$scope.changeDataLoadingDescricaoAceita = true;
			}); 
		} else {
			$scope.falha_confirmacao = true;
			$scope.changeDataLoadingDescricaoAceita = true;
		}	
    };
    
    $scope.descricaoEditadaChange = function(pto, conf){
        $scope.changeDataLoadingDescricaoEditada = true;
		if (pto === conf) {
			$http.post(URI.api + 'pontuacao/mudarDescricaoEditada', {newDescricaoEditada1: pto,newDescricaoEditada2: pto})
			.then(function(response){
				void(response); //Evitar erro de 'nao utilizado'
				$scope.sucesso = true;
				$scope.changeDataLoadingDescricaoEditada = false;
				clearAllFields();
			}, function(error){
				void(error); //Evitar erro de 'nao utilizado'
				$scope.falha = true;
				$scope.changeDataLoadingDescricaoEditada = false;
			});        
		} else {
			$scope.falha_confirmacao = true;
			$scope.changeDataLoadingDescricaoEditada = true;
		}	
    };
    
    $scope.descricaoRejeitadaChange = function(newDescricaoRejeitada1, newDescricaoRejeitada2){
        $scope.changeDataLoadingDescricaoRejeitada = true;
        if (pto === conf) {
			$http.post(URI.api + 'pontuacao/mudarDescricaoRejeitada', {newDescricaoRejeitada1: pto,newDescricaoRejeitada2: pto})
			.then(function(response) {
				void(response); //Evitar erro de 'nao utilizado'
				$scope.sucesso = true;
				$scope.changeDataLoadingDescricaoRejeitada = false;
				clearAllFields();
			}, function(error){
				void(error); //Evitar erro de 'nao utilizado'
				$scope.falha = true;
				$scope.changeDataLoadingDescricaoRejeitada = false;
			});        
		} else {
			$scope.falha_confirmacao = true;
			$scope.changeDataLoadingDescricaoRejeitada = true;
		}	
    };
	
});
