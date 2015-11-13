"use strict";
angular.module('webAppV2App')
.controller('LoginCtrl', function($scope, $state, Auth, LocalService, flash){
    angular.element("#texto_header").html("Sinestesia - Login");
    $scope.$state = $state;
    $scope.flash = flash;
    $scope.userLogin = {
        username: "",
        password: ""
    };

    $scope.errors = [];
    $scope.falha = false;
    $scope.submit = function(userLogin){
		$scope.loading = true;
        if(userLogin.username && userLogin.password)
        {
            var loginResult = Auth.login(userLogin);
            loginResult.then(
            function(result) {
                if('token' in result.data){
                    var user = angular.fromJson(LocalService.get('auth_token')).user;
                    console.log(user);
					if (user.tipo === 'Banido') {
						 $scope.banido = true;
					} else if (user.tipo === 'Descritor') {
                        flash.setAlert({msg : 'Bem vindo(a),'+user.nome+' , à página de Descrição', type : 'success'});
                        $state.go('user.home_descrever');
                    } else if (user.tipo === 'Revisor') {
                        flash.setAlert({msg : 'Bem vindo(a),'+user.nome+' , à página de Revisão', type : 'success'});
                        $state.go('revisor.home_revisar');
                    } else if (user.tipo === 'DescritorRevisor') {
                        flash.setAlert({msg : 'Bem vindo(a),'+user.nome+' , à página de Descrição', type : 'success'});
                        $state.go('user.home_descrever');
                    } else if (user.tipo === 'Administrador') {
                        flash.setAlert({msg : 'Bem vindo(a),'+user.nome+' , à página de Administração', type : 'success'});
                        $state.go('admin.lista_livro');
                    } else {
                        $scope.falha = true;
                    }
					$scope.loading = false;
                }
                else
                {
                    $scope.falha = true;
					$scope.loading = false;
                }
            },function(err) {
                $scope.falha = true;
                $scope.errors.push(err);
				$scope.loading = false;
            });
        }
        else{
            $scope.falha = true;
        }
    };
    $scope.register = function(){
        $state.go('anon.register');
    };
});
