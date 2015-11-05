angular.module('webAppV2App')
.controller('LivroCtrl', function($scope, $filter, $state, $stateParams, ListaImagem, Auth){
	$scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
	
	var livro_id = $stateParams.livro_id
	var isDescricao = $state.includes('user.desclivro');
	console.log("isDescricao?", $state.includes('user.desclivro'));
	
	var myDataPromise = ListaImagem.getImagens(livro_id, isDescricao);

	myDataPromise.then(function(response){
		$scope.imagens = response.data;
		console.log(response.data)
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

angular.module('webAppV2App').
directive('carouselLivro', function($rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			angular.element(document).ready(function() {
				setTimeout(function() {
					console.log("init2");
					$(element).carousel({interval: false, toughness: 0.5});
					$(".footer_nav>li").click(function(evt) {
						$(".footer_nav>li").removeClass("active_footer");
						$(this).addClass("active_footer");
					});
				}, 1000);
			});
	   }
	};
});