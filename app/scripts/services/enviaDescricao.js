angular.module('webAppV2App')
.service('EnviaDescricao', function EnviaDescricao($http, $q){

	var EnviaDescricao = this;

	EnviaDescricao.enviar = function(imagem_id, formData){
		console.log(formData)
		var defer = $q.defer();
		return $http.put(URI.api+"imagem/" + imagem_id, formData)
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

	EnviaDescricao.aceita = function(imagem_id, formData){
		console.log(formData)
		var defer = $q.defer();
		return $http.put(URI.api+"imagem/" + imagem_id + "/aceita", formData)
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

	EnviaDescricao.editada = function(imagem_id, formData){
		console.log(formData)
		var defer = $q.defer();
		return $http.put(URI.api+"imagem/" + imagem_id + "/editada", formData)
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

	EnviaDescricao.rejeitada = function(imagem_id, formData){
		console.log(formData)
		var defer = $q.defer();
		return $http.put(URI.api+"imagem/" + imagem_id + "/rejeitada", formData)
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
