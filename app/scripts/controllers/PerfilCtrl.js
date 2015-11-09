angular.module('webAppV2App')
.controller('PerfilCtrl', function($scope, $http){

    $scope.showForm = false;

    $scope.changePassword = function(oldPassword, newPassword){
        $scope.changeDataLoading = true;
        $scope.changeFalha = false;
        $scope.changeSucesso = false;

        var passwordChange = {
            login: $scope.loggedUser().login,
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        var changed = $http.post('http://localhost:1337/usuario/mudarSenha', passwordChange);

        changed.then(
            function(response){
                $scope.changeSucesso = true;
                $scope.changeDataLoading = false;

            },
            function(error){
                $scope.changeFalha = true;
                $scope.changeDataLoading = false;
            });

    }

	console.log("@TODO PerfilCtrl controller");
});