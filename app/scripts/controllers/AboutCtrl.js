angular.module('webAppV2App')
  .controller('AboutCtrl', function ($scope, $state, Auth, CurrentUser) {
	angular.element("#texto_header").html("Sinestesia - Sobre");
    $scope.$state = $state;
  });
