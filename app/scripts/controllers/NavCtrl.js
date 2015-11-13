"use strict";
angular.module('webAppV2App')
.controller('NavCtrl', function($scope, $state, Auth, CurrentUser) {
    $scope.$state = $state;
    $scope.auth = Auth;
    $scope.loggedUser = CurrentUser.user;
});