angular.module('webAppV2App')
.factory('ListaLivro', function($http, $rootScope){
    return {
        getLivros: function(curso){
            return $http.get("http://localhost:1337/livro");
            }
        }
    });