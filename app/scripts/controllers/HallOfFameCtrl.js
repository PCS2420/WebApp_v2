"use strict";
angular.module('webAppV2App')
.controller('HallOfFameCtrl', function($scope, URI){
    angular.element("#texto_header").html("Melhores Descrições");
	console.log("Se precisar de alguma coisa dinamica, temos o controller do HoF aqui");
	$scope.uri = URI.api;
});
