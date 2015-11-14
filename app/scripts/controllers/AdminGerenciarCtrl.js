"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarCtrl', function($scope, $state, $http, ListaUsuario, ListaCurso, URI, flash) {
    void(flash); //Evitar erro de 'nao utilizado'
    void(URI); //Evitar erro de 'nao utilizado'
    void(ListaCurso); //Evitar erro de 'nao utilizado'
    void(ListaUsuario); //Evitar erro de 'nao utilizado'
    void($http); //Evitar erro de 'nao utilizado'
    
    angular.element("#texto_header").html("Admin - Gerenciar");
    $scope.$state = $state;
    console.log("Nada a fazer aqui");
});