"use strict";
angular.module('webAppV2App')
.factory('ListaLivro', function($http, $rootScope, URI){
    return {
        getLivros: function(curso_id, estado_livro) {
        
            return $http.get(URI.api + "livro?curso=" + curso_id + "&estado=" + estado_livro + "&sort=prioridade");
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

        uploadCapa: function(livro_id, file) {
            var fd = new FormData();
            fd.append('imagem', file);
            return $http.post(URI.api + "livro/" + livro_id + "/capa", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        },

        updateLivro: function(livro) {
            return $http.put(URI.api + "livro/" + livro.id, livro);
        }
    };
});
