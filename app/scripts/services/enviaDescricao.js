"use strict";
angular.module('webAppV2App')
.service('EnviaDescricao', function EnviaDescricao($http, URI){

    EnviaDescricao.enviar = function(formData){
        return $http.post(URI.api+"descricao/descreve", formData);
    };
    
    //quando uma descrição se inicia, seu estado é atualizado para EmAndamento
    EnviaDescricao.emAndamento = function(imagem_id, formData){
        return $http.put(URI.api+"imagem/" + imagem_id + "/emAndamento", formData);
    };
    
    //caso descrição seja interrompida por mudança de rota, volta para estado Aberto
    EnviaDescricao.intDescricao = function(imagem_id, formData){
        return $http.put(URI.api+"imagem/" + imagem_id + "/intDescricao", formData);
    };

    EnviaDescricao.aceita = function(descricao_id, formData){
        return $http.put(URI.api+"descricao/" + descricao_id + "/aceita", formData);
    };

    EnviaDescricao.editada = function(descricao_id, formData){
        return $http.put(URI.api+"imagem/" + descricao_id + "/editada", formData);
    };

    EnviaDescricao.rejeitada = function(descricao_id, formData){
        return $http.put(URI.api+"descricao/" + descricao_id + "/rejeitada", formData);
    };

});
