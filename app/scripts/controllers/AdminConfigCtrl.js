angular.module('webAppV2App')
.controller('AdminConfigCtrl', function($scope, $http, URI, ListaPontuacao){
	angular.element("#texto_header").html("Admin - Configurar Sistema");
    $scope.showFormLimiarPositivo = false;
    $scope.showFormLimiarNegativo = false;
    $scope.showFormDescricaoAceita = false;
    $scope.showFormDescricaoEditada = false;
    $scope.showFormDescricaoRejeitada = false;
	
	var myDataPromise = ListaPontuacao.getPontuacao('563b8932673f34e357b32120');

	myDataPromise.then(function(response){
		//filtra por id do curso.
        //$scope.livros = $filter('filter')(response.data, {curso : {id: $scope.loggedUser().curso}});
		$scope.pontuacao = response.data;
		console.log($scope.pontuacao)
	});
	
	$scope.limiarPositivoChange = function(newLimiarPositivo1, newLimiarPositivo2){
        $scope.changeDataLoadingLimiarPositivo = true;
        $scope.changeFalhaLimiarPositivo = false;
        $scope.changeSucessoLimiarPositivo = false;
		
		var atualizaLimiarPositivo = {
			newLimiarPositivo1: newLimiarPositivo1,
			newLimiarPositivo2: newLimiarPositivo2
		}
		
		var changed = $http.post(URI.api + 'pontuacao/mudarLimiarPositivo', atualizaLimiarPositivo);
        changed.then(
            function(response){
                $scope.changeSucessoLimiarPositivo = true;
                $scope.changeDataLoadingLimiarPositivo = false;
				location.reload(true);
            },
            function(error){
                $scope.changeFalhaLimiarPositivo = true;
                $scope.changeDataLoadingLimiarPositivo = false;
            });		
		
	}
	
	$scope.limiarNegativoChange = function(newLimiarNegativo1, newLimiarNegativo2){
        $scope.changeDataLoadingLimiarNegativo = true;
        $scope.changeFalhaLimiarNegativo = false;
        $scope.changeSucessoLimiarNegativo = false;
		
		var atualizaLimiarNegativo = {
			newLimiarNegativo1: newLimiarNegativo1,
			newLimiarNegativo2: newLimiarNegativo2
		}
		
		var changed = $http.post(URI.api + 'pontuacao/mudarLimiarNegativo', atualizaLimiarNegativo);
        changed.then(
            function(response){
                $scope.changeSucessoLimiarNegativo = true;
                $scope.changeDataLoadingLimiarNegativo = false;
				location.reload(true);
            },
            function(error){
                $scope.changeFalhaLimiarNegativo = true;
                $scope.changeDataLoadingLimiarNegativo = false;
            });		
		
	}
	
	$scope.descricaoAceitaChange = function(newDescricaoAceita1, newDescricaoAceita2){
        $scope.changeDataLoadingDescricaoAceita = true;
        $scope.changeFalhaDescricaoAceita = false;
        $scope.changeSucessoDescricaoAceita = false;
		
		var atualizaDescricaoAceita = {
			newDescricaoAceita1: newDescricaoAceita1,
			newDescricaoAceita2: newDescricaoAceita2
		}
		
		var changed = $http.post(URI.api + 'pontuacao/mudarDescricaoAceita', atualizaDescricaoAceita);
        changed.then(
            function(response){
                $scope.changeSucessoDescricaoAceita = true;
                $scope.changeDataLoadingDescricaoAceita = false;
				location.reload(true);
            },
            function(error){
                $scope.changeFalhaDescricaoAceita = true;
                $scope.changeDataLoadingDescricaoAceita = false;
            });		
		
	}
	
	$scope.descricaoEditadaChange = function(newDescricaoEditada1, newDescricaoEditada2){
        $scope.changeDataLoadingDescricaoEditada = true;
        $scope.changeFalhaDescricaoEditada = false;
        $scope.changeSucessoDescricaoEditada = false;
		
		var atualizaDescricaoEditada = {
			newDescricaoEditada1: newDescricaoEditada1,
			newDescricaoEditada2: newDescricaoEditada2
		}
		
		var changed = $http.post(URI.api + 'pontuacao/mudarDescricaoEditada', atualizaDescricaoEditada);
        changed.then(
            function(response){
                $scope.changeSucessoDescricaoEditada = true;
                $scope.changeDataLoadingDescricaoEditada = false;
				location.reload(true);
            },
            function(error){
                $scope.changeFalhaDescricaoEditada = true;
                $scope.changeDataLoadingDescricaoEditada = false;
            });		
		
	}
	
	$scope.descricaoRejeitadaChange = function(newDescricaoRejeitada1, newDescricaoRejeitada2){
        $scope.changeDataLoadingDescricaoRejeitada = true;
        $scope.changeFalhaDescricaoRejeitada = false;
        $scope.changeSucessoDescricaoRejeitada = false;
		
		var atualizaDescricaoRejeitada = {
			newDescricaoRejeitada1: newDescricaoRejeitada1,
			newDescricaoRejeitada2: newDescricaoRejeitada2
		}
		
		var changed = $http.post(URI.api + 'pontuacao/mudarDescricaoRejeitada', atualizaDescricaoRejeitada);
        changed.then(
            function(response){
                $scope.changeSucessoDescricaoRejeitada = true;
                $scope.changeDataLoadingDescricaoRejeitada = false;
				location.reload(true);
            },
            function(error){
                $scope.changeFalhaDescricaoRejeitada = true;
                $scope.changeDataLoadingDescricaoRejeitada = false;
            });		
		
	}
	
});
