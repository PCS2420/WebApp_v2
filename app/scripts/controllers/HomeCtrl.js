"use strict";
angular.module('webAppV2App')
.controller('HomeCtrl', function($scope, $http, $filter, $state, $stateParams, EnviaDescricao, ListaLivro, Auth, flash, preloader, URI){
    $scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
    
    var pergunta = "precisaRevisar";
    if ($state.includes('user.home_descrever')) {
		angular.element("#texto_header").html("Portal Descrição");
		pergunta = "precisaDescrever";
	} else {
		angular.element("#texto_header").html("Portal Revisão");
	}

    var curso = $scope.loggedUser().curso;
	var notificacaoRebaixado =  $scope.loggedUser().notificacaoRebaixado;
	var notificacaoPromovido =  $scope.loggedUser().notificacaoPromovido;
	var notificacaoBloqueio =  $scope.loggedUser().notificacaoBloqueio;
	var notificacaoDescricaoAceita =  $scope.loggedUser().notificacaoDescricaoAceita;
	var notificacaoDescricaoEditada =  $scope.loggedUser().notificacaoDescricaoEditada;
	var notificacaoDescricaoRejeitada =  $scope.loggedUser().notificacaoDescricaoRejeitada;
    var myDataPromise = ListaLivro.getLivros(curso, pergunta);
    $scope.flash = flash;
    
	console.log('notificacaoRebaixado: '+notificacaoRebaixado);
	console.log('notificacaoPromovido: '+notificacaoPromovido);
	console.log('notificacaoBloqueio: '+notificacaoBloqueio);
	console.log('notificacaoDescricaoAceita: '+notificacaoDescricaoAceita);
	console.log('notificacaoDescricaoEditada: '+notificacaoDescricaoEditada);
	console.log('notificacaoDescricaoRejeitada: '+notificacaoDescricaoRejeitada);

	if (notificacaoRebaixado){
		$scope.showNotificacaoRebaixado = true;
		notificacaoRebaixado = false;
	} else {
		$scope.showNotificacaoRebaixado = false;	
	}
	
	if (notificacaoPromovido){
		$scope.showNotificacaoPromovido = true;
		notificacaoPromovido = false;
	} else {
		$scope.showNotificacaoPromovido = false;	
	}
	
	if (notificacaoBloqueio){
		$scope.showNotificacaoBloqueio = true;	
		notificacaoBloqueio = false;
	} else {
		$scope.showNotificacaoBloqueio = false;	
	}
	
	if (notificacaoDescricaoAceita){
		$scope.showNotificacaoDescricaoAceita = true;	
		notificacaoDescricaoAceita = false;
	} else {
		$scope.showNotificacaoDescricaoAceita = false;	
	}
	
	if (notificacaoDescricaoEditada){
		$scope.showNotificacaoDescricaoEditada = true;
		notificacaoDescricaoEditada = false;
	} else {
		$scope.showNotificacaoDescricaoEditada = false;
	}
	
	if (notificacaoDescricaoRejeitada){
		$scope.showNotificacaoDescricaoRejeitada = true;
		notificacaoDescricaoRejeitada = false;
	} else {	
		$scope.showNotificacaoDescricaoRejeitada = false;
	}
		
	var notificacaoDadosNovos = {
		login: $scope.loggedUser().login,
		newNotificacaoRebaixado: notificacaoRebaixado,
		newNotificacaoPromovido: notificacaoPromovido,
		newNotificacaoBloqueio: notificacaoBloqueio,
		newNotificacaoDescricaoAceita: notificacaoDescricaoAceita,
		newNotificacaoDescricaoEditada: notificacaoDescricaoEditada,
		newNotificacaoDescricaoRejeitada: notificacaoDescricaoRejeitada
	};
	
	console.log('notificacaoRebaixado1: '+notificacaoRebaixado);
	console.log('notificacaoPromovido1: '+notificacaoPromovido);
	console.log('notificacaoBloqueio1: '+notificacaoBloqueio);
	console.log('notificacaoDescricaoAceita1: '+notificacaoDescricaoAceita);
	console.log('notificacaoDescricaoEditada1: '+notificacaoDescricaoEditada);
	console.log('notificacaoDescricaoRejeitada1: '+notificacaoDescricaoRejeitada);

	$http.post(URI.api + 'usuario/updateNotificacao', notificacaoDadosNovos);
	
    // I keep track of the state of the loading images.
    $scope.isLoading = true;
    $scope.isSuccessful = false;
	$scope.emptyList = false;
	$scope.pendenciaDescartada = false;
    $scope.percentLoaded = 0;

	if (pergunta === "precisaDescrever"){
		var promise = $http.get(URI.api + "imagem/estado/EmAndamento?descritor=" + $scope.loggedUser().id);
		promise.then(function(response){
			if (response.data.length !== 0){
				console.log("Pendente: ", response.data);
				angular.element("#pendente").modal();
				$scope.id_imagem = response.data[0].id;
				$scope.descId = response.data[0].descricao;
			}
		});
	}
    
    myDataPromise.then(function(response){
        //filtra por id do curso.
        //$scope.livros = $filter('filter')(response.data, {curso : {id: $scope.loggedUser().curso}});
        $scope.livros = response.data;
        console.log($scope.livros);
		if (response.data[0] === undefined) {
			$scope.isLoading = false;
			
			$scope.isSuccessful = false;
			$scope.emptyList = true;
		}
        var preloaded_images = [];
        for(var img in $scope.livros) {
            preloaded_images.push($scope.uri+"/"+$scope.livros[img].capa);
        }
        $scope.preloaded_images = preloaded_images;
    }).then(function() {
        // Preload the images; then, update display when returned.
        preloader.preloadImages( $scope.preloaded_images ).then(
            function handleResolve( imageLocations ) {
                void(imageLocations); //Evitar erro de 'nao utilizado'
                // Loading was successful.
                $scope.isLoading = false;
                $scope.isSuccessful = true;
                console.info( "Preload Successful" );
            },
            function handleReject( imageLocation ) {
                // Loading failed on at least one image.
                $scope.isLoading = false;
                $scope.isSuccessful = false;
                console.error( "Image Failed", imageLocation );
                console.info( "Preload Failure" );
            },
            function handleNotify( event ) {
                console.info( "Percent loaded:", event.percent );
            }
        );
    });
    
    $scope.exit = function(){
        $scope.loggedUser = undefined;
        Auth.logout();
        $state.go("anon.login");
    };

    $scope.next = function(){
        angular.element('#myCarousel').carousel('next');
    };

    $scope.prev = function(){
        angular.element('#myCarousel').carousel('prev');
    };
	
	$scope.descreverImagem = function(){
		angular.element("#pendente").modal("hide");
		$state.go("user.imagem", {imagem_id: $scope.id_imagem});
	};
	
	$scope.interrompeDescricao = function() {
		console.log("esperando para interromper descricao");
		$scope.isLoading = true;
		angular.element("#pendente").modal("hide");

        EnviaDescricao.intDescricao($scope.id_imagem, {descId: $scope.descId})
        .then(
            function(response){
                void(response); //Evitar erro de 'nao utilizado'
				$scope.isLoading = false;
				$scope.pendenciaDescartada = true;
            },
            function(error){
				$scope.isLoading = false;
                console.log({msg : 'Ocorreu algum erro ao realizar a descrição', type : 'danger', e: error});
            }
        );
	};

    $scope.w = window.innerWidth;
    $scope.h = window.innerHeight;
    $scope.uri = URI.api; 
});

angular.module('webAppV2App').
directive('carouselPreloader', function($rootScope) {
    void($rootScope); //Evitar erro de 'nao utilizado'
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {   
            void(element); //Evitar erro de 'nao utilizado'
            void(attrs); //Evitar erro de 'nao utilizado'
            scope.$watch("isSuccessful", function(newValue, oldValue) {
                void(newValue); //Evitar erro de 'nao utilizado'
                void(oldValue); //Evitar erro de 'nao utilizado'
                if (scope.isSuccessful) {
                    console.log("Images successfully loaded. Starting carousel!");
                    angular.element(document).find("#myCarousel").carousel({interval: false, toughness: 0.5});
                }
            });
        }
    };
});
