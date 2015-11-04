angular.module('webAppV2App')
.controller('HomeCtrl', function($scope, $filter, $state, ListaLivro, Auth){
	$scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
	var myDataPromise = ListaLivro.getLivros();

	myDataPromise.then(function(response){
		//filtra por id do curso.
        $scope.livros = $filter('filter')(response.data, {curso : {id: $scope.loggedUser().curso}});
		
    });
	$scope.exit = function(){
		$scope.loggedUser = undefined;
		Auth.logout();
		$state.go("anon.login");
	};
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
				}, 900);
			});
		
			scope.$on('$destroy', function(){
				
			});
	   }
	};
});