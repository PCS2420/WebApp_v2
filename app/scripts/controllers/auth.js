'use strict';

var authModule=angular.module('authModule', []);

authModule.constant('AccessLevels', {
    anon: 0,
    user: 1
  });

authModule.factory('CurrentUser', function(LocalService) {
  return {
    user: function() {
      if (LocalService.get('auth_token')) {
        return angular.fromJson(LocalService.get('auth_token')).user;
      } else {
        return {};
      }
    }
  };
});

authModule.factory('LocalService', function() {
    return {
      get: function(key) {
        return localStorage.getItem(key);
      },
      set: function(key, val) {
        return localStorage.setItem(key, val);
      },
      unset: function(key) {
        return localStorage.removeItem(key);
      }
    }
  });

authModule.factory('Auth', function($http, LocalService, AccessLevels) {
    return {
      authorize: function(access) {
        if (access === AccessLevels.user) {
          return this.isAuthenticated();
        } else {
          return true;
        }
      },
      isAuthenticated: function() {
        return LocalService.get('auth_token');
      },
      login: function(credentials) {
        var login = $http.post('http://localhost:1337/auth/process', credentials);

        login.success(function(result) {
            LocalService.set('auth_token', JSON.stringify(result));
        });
        return login;
      },
      logout: function() {
        // The backend doesn't care about logouts, delete the token and you're good to go.
        LocalService.unset('auth_token');
      },
      register: function(formData) {
        LocalService.unset('auth_token');
        var register = $http.post('/auth/register', formData);
        register.success(function(result) {
          LocalService.set('auth_token', JSON.stringify(result));
        });
        return register;
      }
    }
  })
  .factory('AuthInterceptor', function($q, $injector) {
    var LocalService = $injector.get('LocalService');

    console.log("Interceptor");

    return {
      request: function(config) {
        var token;
        if (LocalService.get('auth_token')) {
          token = angular.fromJson(LocalService.get('auth_token')).token;
        }
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function(response) {

        console.log("Interceptor responseError");
        console.log($injector.get('$route'));
        if (response.status === 401 || response.status === 403) {
          LocalService.unset('auth_token');
          $injector.get('$route').path('/login');
        }
        return $q.reject(response);
      }
    }
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });