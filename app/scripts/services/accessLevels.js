"use strict";
angular.module('webAppV2App')
    .constant('AccessLevels', {
		bloqueado: -2,
		banido: -1,
        anon: 0,
        publicador: 1,
        user: 2,
        revisor: 3,
		admin: 4
    });