angular.module('webAppV2App')
.controller('AdminBooksCtrl', function($scope, $state, ListaLivro){
	angular.element("#texto_header").html("Admin - Gerenciar Livros");
    $scope.$state = $state;
    
    var myDataPromise = ListaLivro.getAllLivros();
     
    // I keep track of the state of the loading images.
    $scope.isLoading = true;
    $scope.isError = false;
    $scope.percentLoaded = 0;
    
    myDataPromise.then(function(response){
        $scope.livros = response.data;
        $scope.isLoading = false;
    }, function (err){
        console.log(err);
        $scope.isLoading = false;
        $scope.isError = true;
    });

    $scope.describedImages = function (booksList) {
        return booksList.reduce(function (prev, livro) {
            if (livro.estado == "Revisado"){
                return prev + 1;
            }
            else {
                return prev;
            }
        }, 0);
    }
});