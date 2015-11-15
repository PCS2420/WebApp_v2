"use strict";
angular.module('webAppV2App')
.service('EnviaDescricao', function EnviaDescricao($http, URI){
   	return {
		enviar: function(formData) {
			return $http.post(URI.api+"descricao/descreve", formData);
		},
		salvar: function(formData) {
			return $http.post(URI.api+"descricao/salva", formData);
		},
		//quando uma descrição se inicia, seu estado é atualizado para EmAndamento
		emAndamento: function(imagem_id, formData) {
			return $http.put(URI.api+"imagem/" + imagem_id + "/emAndamento", formData);
		},
		//caso descrição seja interrompida por mudança de rota, volta para estado Aberto
		intDescricao: function(imagem_id, formData) {
			return $http.put(URI.api+"imagem/" + imagem_id + "/intDescricao", formData);
		},
		aceita: function(descricao_id, formData) {
			return $http.put(URI.api+"descricao/" + descricao_id + "/aceita", formData);
		},
		editada: function(descricao_id, formData) {
			return $http.put(URI.api+"imagem/" + descricao_id + "/editada", formData);
		},
		rejeitada: function(descricao_id, formData) {
			return $http.put(URI.api+"descricao/" + descricao_id + "/rejeitada", formData);
		}
	};
});
