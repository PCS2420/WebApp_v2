angular.module('webAppV2App')
.controller('LivroCtrl', function($scope, $filter, $state, $stateParams, ListaImagem, Auth, preloader){
	$scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
	
	var livro_id = $stateParams.livro_id
	var isDescricao = $state.includes('user.desclivro');
	console.log("isDescricao?", $state.includes('user.desclivro'));
	
	var myDataPromise = ListaImagem.getImagens(livro_id, isDescricao);

	// I keep track of the state of the loading images.
	$scope.isLoading = true;
	$scope.isSuccessful = false;
	$scope.percentLoaded = 0;
	
	myDataPromise.then(function(response){
		//filtra por id do curso.
        //$scope.livros = $filter('filter')(response.data, {curso : {id: $scope.loggedUser().curso}});
		$scope.imagens = response.data;
		console.log(response.data);
		var preloaded_images = new Array();
		for(var i in $scope.imagens) {
			preloaded_images.push($scope.uri+"/"+$scope.imagens[i].local);
		}
		$scope.preloaded_images = preloaded_images;
    }).then(function() {
		// Preload the images; then, update display when returned.
		preloader.preloadImages( $scope.preloaded_images ).then(
			function handleResolve( imageLocations ) {
				// Loading was successful.
				$scope.isLoading = false;
				$scope.isSuccessful = true; // tem o $watch na HomeCtrl
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

	$scope.statego = function(imagem_id){

		if (isDescricao)
		{
			$state.go("user.imagem" , { imagem_id: imagem_id});
		}
		else 
		{
			$state.go("user.revisao" , { imagem_id: imagem_id});
		}
	};

	$scope.w = window.innerWidth;
    $scope.h = window.innerHeight;
    $scope.uri = "http://localhost:1337"; 
});