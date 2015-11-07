angular.module('webAppV2App')
.controller('MudarSenhaCtrl', function($scope, $state, mudarSenha){
	$scope.$state=$state;
	$scope.user = {
        login: "",
        senha: ""
    }
	
	$scope.update = function(userN){
		console.log(userN);
		mudarSenha.mudar(userN.login, userN.senha);
	}


});





