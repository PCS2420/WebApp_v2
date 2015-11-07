angular.module('webAppV2App')
.service('MudarSenha', function MudarSenha($http){

	var MudarSenha = this;

	MudarSenha.mudar = function(login, senha){

		console.log(login)

		return $http.post("http://localhost:1337/mudarsenha/" + login+"/"+senha )
		.success(function(response){
			console.log(response);
		})
		.error(function(error){
			console.log(error);
		})
	return ;
	}
});
