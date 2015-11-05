angular.module('webAppV2App')
.controller('HomeCtrl', function($scope, $filter, $state, $stateParams, ListaLivro, Auth, flash){
	$scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router

	var curso = $scope.loggedUser().curso
	var myDataPromise = ListaLivro.getLivros(curso);
	$scope.flash = flash;
	$scope.images = [];
	
	myDataPromise.then(function(response){
		//filtra por id do curso.
        //$scope.livros = $filter('filter')(response.data, {curso : {id: $scope.loggedUser().curso}});
		$scope.livros= response.data.livros;
		console.log($scope.livros)
    });
	$scope.exit = function(){
		$scope.loggedUser = undefined;
		Auth.logout();
		$state.go("anon.login");
	};

	$scope.w = window.innerWidth;
    $scope.h = window.innerHeight;
    $scope.uri = "http://localhost:1337"; 
});


angular.module('webAppV2App').
directive('descricaoCarousel', function($rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			//attrs references any attributes on the directive element in html
			
			angular.element(document).ready(function() {
				//MANIPULATE THE DOM
				setTimeout(function() {
					console.log("init");
					$(element).carousel({interval: false, toughness: 0.5});
					$(".footer_nav>li").click(function(evt) {
						$(".footer_nav>li").removeClass("active_footer");
						$(this).addClass("active_footer");
					});
				}, 1440);
			});
		
			scope.$on('$destroy', function(){
				
			});
	   }
	};
});

angular.module('webAppV2App').
directive('revisaoCarousel', function($rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			angular.element(document).ready(function() {
				setTimeout(function() {
					$(element).carousel({interval: false, toughness: 0.5});
					$(".footer_nav>li").click(function(evt) {
						$(".footer_nav>li").removeClass("active_footer");
						$(this).addClass("active_footer");
					});
				}, 1440);
			});
		}
	};
});