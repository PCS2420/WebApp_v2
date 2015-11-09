'use strict';

/**
 * @ngdoc function
 * @name webAppV2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webAppV2App
 */

var app = angular.module('webAppV2App',['ngResource', 'ui.bootstrap', 'ui.router']);

app.run(function($rootScope, $state, CurrentUser, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        var userType;

        if(CurrentUser.user().tipo){
            userType = CurrentUser.user().tipo;
        }
        else{
            userType = 'anon';
        }

        var isAuthorized = Auth.authorize(toState.data.access, userType);

		if (!isAuthorized) {
			event.preventDefault();

            if(typeof fromState === 'undefined'){
    			$state.go('anon.login');
            }
		}
    });
});
