angular.module('webAppV2App')
.factory('Imagem', function($http, $rootScope, URI){
    return {
        createImagem: function(imagem) {
            return $http.post(URI.api + "imagem", imagem);
        },
        updateImagem: function(imagem) {
            return $http.post(URI.api + "imagem/" + iamgem.id, imagem);
        },
        donwloadImagem: function(imagem_id) {
            return $http.get(URI.api + "imagem/" + imagem_id + "imagem");
        },
        donwloadContexto: function(imagem_id) {
            return $http.get(URI.api + "imagem/" + imagem_id + "imagem");
        },
        uploadImagem: function(imagem_id, file) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.post(URI.api + "imagem/" + imagem_id + "/imagem", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        },
        uploadContexto: function(imagem_id, file) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.post(URI.api + "imagem/" + imagem_id + "/contexto", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        },
    }
});
