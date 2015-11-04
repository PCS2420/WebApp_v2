angular.module('webAppV2App')
.controller('LoginCtrl', function($scope, $state, Auth){
	$scope.$state = $state;
    $scope.userLogin = {
        username: "",
        password: ""
    }

    $scope.errors = [];
    $scope.falha = false;
    $scope.submit = function(userLogin){
        if(userLogin.username && userLogin.password)
        {
            var loginResult = Auth.login(userLogin);
            loginResult.then(
            function(result) {
                if('token' in result.data){
                    $state.go('user.home');
                }
                else
                {
                    $scope.falha = true;
                }
            },function(err) {
                $scope.falha = true;
                $scope.errors.push(err);
            });
        }
        else{
            $scope.falha = true;
        }
    };
    $scope.register = function(){
        $state.go('anon.register');
    }
});
