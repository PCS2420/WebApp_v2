// angular.module('webAppV2App')
// .factory('usuarioTipoService', function($http, $rootScope){
//     var getUserTipo = function(user, senha){
//         return $http.post("http://localhost:1337/auth/process", {username: user, password: senha})
//         .success(function(response){
//             if('tipo' in response.user){
//                 return response.user.tipo;
//             }
//             return null;
//         });
//     };
//     return { getUserTipo: getUserTipo };
// });

// .service('userService', function userService($http, $q){

//     var userService = this;

//     userService.cadastraUser = function(user){
//         var defer = $q.defer();
//         return $http.post("http://localhost:1337/usuario/cadastro", user)
//         .success(function(response){
//             defer.resolve(response);
//         })
//         .error(function(error){
//             defer.reject(error);
//         })
//     return defer.promise;
//     }
// });
