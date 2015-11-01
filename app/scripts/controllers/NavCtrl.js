angular.module('webAppV2App')
  .controller('NavCtrl', function($scope, Auth, CurrentUser) {

    console.log("NAV CTRL");

    $scope.auth = Auth;
    $scope.loggedUser = CurrentUser.user;
  });