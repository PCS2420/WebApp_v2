"use strict";
angular.module('webAppV2App')
.controller('HomeCtrl', function($scope, $filter, $state, $stateParams, ListaLivro, Auth, flash, preloader, URI){
    angular.element("#texto_header").html("Sinestesia - Página Inicial");
    $scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
    
    var estadoLivro = "PrecisaRevisar"
    if ($state.includes('user.home_descrever')) estadoLivro = "PrecisaDescrever"

    var curso = $scope.loggedUser().curso;
    var myDataPromise = ListaLivro.getLivros(curso, estadoLivro);
    $scope.flash = flash;
    
    // I keep track of the state of the loading images.
    $scope.isLoading = true;
    $scope.isSuccessful = false;
	$scope.emptyList = false;
    $scope.percentLoaded = 0;


    
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
