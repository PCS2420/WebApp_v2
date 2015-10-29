angular.module('webAppV2App')
  .config(function($stateProvider, $urlRouterProvider, AccessLevels) {
   $stateProvider
      .state('anon', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.anon
        }
      })
      .state('anon.login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('anon.register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      });

    $stateProvider
      .state('user', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.user
        }
      })
      .state('user.home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      // .state('user.messages', {
      //   url: '/messages',
      //   templateUrl: 'user/messages.html',
      //   controller: 'MessagesController'
      // })
      ;

    $urlRouterProvider.otherwise('/');
  });