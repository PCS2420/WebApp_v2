angular.module('webAppV2App')
.service('EnviaDescricao', function EnviaDescricao($http, $q, URI){

	var EnviaDescricao = this;

	EnviaDescricao.enviar = function(formData){
		console.log(formData)
		var defer = $q.defer();
		return $http.post(URI.api+"descricao/descreve", formData)
		.success(function(response){
			console.log(response);
			defer.resolve(response);
		})
		.error(function(error){
			console.log(error);
			defer.reject(error);
		})
	return defer.promise;
	},

	EnviaDescricao.aceita = function(descricao_id, formData){
		console.log(formData)
		var defer = $q.defer();
		return $http.put(URI.api+"descricao/" + descricao_id + "/aceita", formData)
		.success(function(response){
			console.log(response);
			defer.resolve(response);
		})
		.error(function(error){
			console.log(error);
			defer.reject(error);
		})
	return defer.promise;
	},

	EnviaDescricao.editada = function(descricao_id, formData){
		console.log(formData)
		var defer = $q.defer();
		return $http.put(URI.api+"imagem/" + descricao_id + "/editada", formData)
		.success(function(response){
			console.log(response);
			defer.resolve(response);
		})
		.error(function(error){
			console.log(error);
			defer.reject(error);
		})
	return defer.promise;
	},

	EnviaDescricao.rejeitada = function(descricao_id, formData){
		console.log(formData)
		var defer = $q.defer();
		return $http.put(URI.api+"descricao/" + descricao_id + "/rejeitada", formData)
		.success(function(response){
			console.log(response);
			defer.resolve(response);
		})
		.error(function(error){
			console.log(error);
			defer.reject(error);
		})
	return defer.promise;
	}

});
