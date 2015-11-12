angular.module('webAppV2App')
.factory('ListaLivro', function($http, $rootScope, URI){
    return {
        getLivros: function(curso_id) {
            //teoricamente esta errado pois nao retorna uma lista de livros e sim um curso que contem uma lista de livros
            return $http.get(URI.api + "curso/" + curso_id);
        },

        getAllLivros: function() {
            return $http.get(URI.api + "livro");
        },

        getLivro: function(livro_id) {
            return $http.get(URI.api + "livro/" + livro_id);
        },


        createLivro: function(livro) {
            return $http.post(URI.api + "livro", livro);
        },

        updateLivro: function(livro) {
            return $http.put(URI.api + "livro/" + livro.id, livro);
        }
    }
});
