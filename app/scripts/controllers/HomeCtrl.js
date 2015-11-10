angular.module('webAppV2App')
.controller('HomeCtrl', function($scope, $filter, $state, $stateParams, ListaLivro, Auth, flash, preloader, URI){
	$scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
	
	var curso = $scope.loggedUser().curso
	var myDataPromise = ListaLivro.getLivros(curso);
	$scope.flash = flash;
	
	// I keep track of the state of the loading images.
	$scope.isLoading = true;
	$scope.isSuccessful = false;
	$scope.percentLoaded = 0;
	
	myDataPromise.then(function(response){
		//filtra por id do curso.
        //$scope.livros = $filter('filter')(response.data, {curso : {id: $scope.loggedUser().curso}});
		$scope.livros = response.data.livros;
		console.log($scope.livros);
		var preloaded_images = new Array();
		for(var img in $scope.livros) {
			preloaded_images.push($scope.uri+"/"+$scope.livros[img].capa);
		}
		$scope.preloaded_images = preloaded_images;
    }).then(function() {
		console.log("after promises!");
		// Preload the images; then, update display when returned.
		preloader.preloadImages( $scope.preloaded_images ).then(
			function handleResolve( imageLocations ) {
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
				$scope.percentLoaded = event.percent;
				console.info( "Percent loaded:", event.percent );
			}
		);
	});
	
	$scope.exit = function(){
		$scope.loggedUser = undefined;
		Auth.logout();
		$state.go("anon.login");
	};

	$scope.w = window.innerWidth;
    $scope.h = window.innerHeight;
    $scope.uri = URI.api; 
});

angular.module('webAppV2App').
directive('carouselPreloader', function($rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {	
			scope.$watch("isSuccessful", function(newValue, oldValue) {
				if (scope.isSuccessful) {
					console.log("LOADED");
					angular.element(document).find("#myCarousel").carousel({interval: false, toughness: 0.5});
					$(".footer_nav>li").click(function(evt) {
						$(".footer_nav>li").removeClass("active_footer");
						$(this).addClass("active_footer");
					});
				}
			});
		}
	};
});