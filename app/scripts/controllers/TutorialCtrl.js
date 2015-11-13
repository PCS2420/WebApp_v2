"use strict";
angular.module('webAppV2App')
  .controller('TutorialCtrl', function ($scope, $state, Auth, CurrentUser) {
    void(Auth); //Evitar erro de 'nao utilizado'
    void(CurrentUser); //Evitar erro de 'nao utilizado'
    angular.element("#texto_header").html("Sinestesia - Tutorial");
    $scope.$state = $state;
  });


//.controller('TutorialCtrl', function($scope, $state, Auth, CurrentUser, $timeout) {
//  $scope.$state = $state;
//  $scope.interface = {};
//
//  $scope.$on('$videoReady', function videoReady() {
//
//    $scope.interface.options.setAutoplay(true);
//
//    $scope.interface.sources.add('http://www.w3schools.com/html/mov_bbb.mp4');
//
//  });
//});
// Se for usar video por Angular (ng-video), incluir no index.html:
//<script type="text/javascript" src="scripts/libs/Common.js"></script> e adicionar o arquivo
// Adicionar também 'ngVideo', no app.js
