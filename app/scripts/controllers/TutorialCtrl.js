angular.module('webAppV2App')
  .controller('TutorialCtrl', function($scope, $state, Auth, CurrentUser, $timeout) {
    $scope.$state = $state;
    $scope.interface = {};

    $scope.$on('$videoReady', function videoReady() {

      $scope.interface.options.setAutoplay(true);

      $scope.interface.sources.add('http://www.w3schools.com/html/mov_bbb.mp4');

    });
  });
