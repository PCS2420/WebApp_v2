'use strict';

/* Controllers */

var booksControllers=angular.module('booksControllers', ['ngAnimate', 'ui.bootstrap']);

booksControllers.controller('booksCtrl', function($scope,$route, $http, $routeParams, $location, $rootScope,$uibModal, $log, MostraLivros) {
    $scope.images = [];
    $scope.montaPagina = function(){
        var myDataPromise = MostraLivros.getBooks($routeParams.curso_id);
        myDataPromise.then(function(response){
            $scope.books= response.data.livros;
            var count=0;
            angular.forEach($scope.books, function(value){
              $scope.images.push(count);
              count++;
            })
            console.log($scope.books);
            console.log($scope.images)
         });
    };

    $scope.goToLivro = function(){

    };

    $scope.w = window.innerWidth;
    $scope.h = window.innerHeight-20;
    $scope.uri = "http://localhost:1337";    
});

booksControllers.factory('MostraLivros', function($http, $rootScope){
    var getBooks = function(curso_id){
        return $http.get("http://localhost:1337/curso/" + curso_id)
        .success(function(response){
            return response;
        })
        .error(function(error){
            console.log(error);
        });
    };
    return {getBooks: getBooks};
});