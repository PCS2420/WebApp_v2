"use strict";
angular.module('webAppV2App')
.factory('Auth', function($http, LocalService, AccessLevels, URI) {
    return {
      authorize: function(access, userType) {
        var permission;
		
    		if (userType === 'Banido') {
    			permission = AccessLevels.banido;
    		}
        else if (userType === 'Bloqueado') {
          permission = AccessLevels.banido;
        }
        else if(userType === 'Publicador') {
          permission = AccessLevels.publicador;
        }
        else if(userType === 'Descritor') {
          permission = AccessLevels.user;
        }
        else if(userType === 'DescritorRevisor') {
          permission = AccessLevels.revisor;
        }
        else if(userType === 'Revisor') {
          permission = AccessLevels.revisor;
        }
        else if(userType === 'Administrador') {
          permission = AccessLevels.admin;
        }
        else{
          permission = AccessLevels.anon;
        }

        if(access === 0){
          return true;
        }
        else if (access <= permission) {
          return this.isAuthenticated();
        } else {
          return false;
        }
      },
      isAuthenticated: function() {
        if(LocalService.get('auth_token') === null){
          return false;
        }
        else{
          return true;
        }
      },
      login: function(credentials) {
        var login = $http.post(URI.api+'auth/authenticate', credentials);

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
        var register = $http.post(URI.api+'usuario/cadastro', formData);
        register.success(function(result) {
          LocalService.set('auth_token', JSON.stringify(result));
        });
        return register;
      }
    };
  })
  .factory('AuthInterceptor', function($q, $injector) {
    var LocalService = $injector.get('LocalService');

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

        if (response.status === 401 || response.status === 403) {
          LocalService.unset('auth_token');
          $injector.get('$state').go('anon.login');
        }
        return $q.reject(response);
      }
    };
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });