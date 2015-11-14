"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarEtcCtrl', function($scope, $state, $http, ListaUsuario, ListaCurso, URI, Auth, flash) {
    void(flash); //Evitar erro de 'nao utilizado'
    void(Auth); //Evitar erro de 'nao utilizado'
    void(URI); //Evitar erro de 'nao utilizado'
    void(ListaCurso); //Evitar erro de 'nao utilizado'
    void(ListaUsuario); //Evitar erro de 'nao utilizado'
    void($http); //Evitar erro de 'nao utilizado'
    angular.element("#texto_header").html("Admin - Gerenciar Etc");
    $scope.$state = $state;
    console.log("@todo controller etc");
});