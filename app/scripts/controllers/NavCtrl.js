angular.module('webAppV2App')
.controller('NavCtrl', function($scope, $state, Auth, CurrentUser, flash) {
	$scope.$state = $state;
    $scope.auth = Auth;
    $scope.loggedUser = CurrentUser.user;
});