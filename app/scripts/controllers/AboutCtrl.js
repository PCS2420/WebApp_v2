"use strict";
angular.module('webAppV2App')
  .controller('AboutCtrl', function ($scope, $state, Auth, CurrentUser) {
        void(Auth); //Para nao dar erro de nao utilizado
        void(CurrentUser); //Para nao dar erro de nao utilizado
	angular.element("#texto_header").html("Sinestesia - Sobre");
    $scope.$state = $state;
  });
