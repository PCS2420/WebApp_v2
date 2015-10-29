'use strict';

/**
 * @ngdoc function
 * @name webAppV2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webAppV2App
 */

var app=angular.module('webAppV2App',['ngResource', 'ui.bootstrap', 'ui.router']);

app.run(function($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (!Auth.authorize(toState.data.access)) {
        event.preventDefault();

        $state.go('anon.login');
      }
    });
  });
