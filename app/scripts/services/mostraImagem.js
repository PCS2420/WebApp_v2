"use strict";
angular.module('webAppV2App')
.service('MostraImagem', function MostraImagem($http, URI){
    MostraImagem.getImagem = function (imagem_id){
        return $http.get(URI.api + "imagem/" + imagem_id);
    };

    MostraImagem.getDescricao = function(imagem_id){
        return $http.get(URI.api + "imagem?id=" + imagem_id + "&estado=Aberto");
    };
});
