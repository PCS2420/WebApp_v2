"use strict";
angular.module('webAppV2App')
.controller('BuscarCtrl', function($scope, $http, URI){
	angular.element("#texto_header").html("Sinestesia - Buscar");
	console.log("@TODO BuscarCtrl controller");
	
	$scope.search = function(formData){
		if ($scope.loggedUser().tipo === 'Revisor' || $scope.loggedUser().tipo === 'DescritorRevisor') {
			var isDescricao = $scope.formData.radio === "descrever";
			if (isDescricao) {
				fetchDescricaoLivrosByQuery(formData.query);
			} else {
				fetchRevisaoLivrosByQuery(formData.query);
			}
		} else {
			fetchDescricaoLivrosByQuery(formData.query);
		}


	};
	
	function clearList() {
		$scope.livrosDesc = [];
		$scope.livrosRev = [];
	}
	
	function fetchDescricaoLivrosByQuery(q) {
		$scope.loading = true;
		clearList();
		$http.get(URI.api + 'livro/busca?query='+q).then(function(response) {
			console.log(response.data);
			$scope.livrosDesc = response.data;
			$scope.loading = false;
		});
	}
	
	function fetchRevisaoLivrosByQuery(q) {
		clearList();
		$http.get(URI.api + 'livro/buscaRevisor?query='+q).then(function(response) {
			console.log(response.data);
			$scope.livrosDesc = response.data;
			$scope.loading = false;
		});
	}
});

angular.module('webAppV2App').
directive('clickWhenLoaded', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
			void(scope);
            void(attrs); //Evitar erro de 'nao utilizado'
			angular.element(element).click();
        }
    };
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
