"use strict";
angular.module('webAppV2App')
.controller('AdminRegistrarCtrl', function($scope, $state, $stateParams, $timeout, $uibModal, $window, ListaCurso, ListaLivro){
    angular.element("#texto_header").html("Admin - Incluir Livro");
    $scope.$state = $state;
    ListaCurso.getCursos().then(function (res) {
        $scope.listaCursos = res.data;
    });
    $scope.livro_id = $stateParams.livro_id;
    $scope.isSuccess = false;
    $scope.isError = false;
    var livroCopy = {};
    if ($scope.livro_id) {
        $scope.isEditing = false;
        ListaLivro.getLivro($scope.livro_id).then(function (res) {
            $scope.livro = res.data;
            livroCopy = $window.jQuery.extend(true, {}, $scope.livro);
        });
    }
    else {
        $scope.isEditing = true;
        $scope.livro = {};
    }

    $scope.submit = function () {
        $scope.isSaving = true;
        var livro = $scope.livro;
        if ($scope.livro_id) {
            ListaLivro.updateLivro(livro)
            .then(function (){
                return ListaLivro.uploadCapa($scope.livro_id, document.getElementById('capaFile').files[0]);
            })
            .then(function () {
                $scope.isSaving = false;
                $scope.isEditing = false;
                success();
            }, function (err) {
                void(err);//Evitar erro de 'nao utilizado'
                $scope.isSaving = false;
                error();
            });
        }
        else {
            ListaLivro.createLivro(livro).then(function (res) {
                $scope.livro_id = res.data.id;
                $scope.livro.id = res.data.id;
                return ListaLivro.uploadCapa($scope.livro_id, document.getElementById('capaFile').files[0]);
            })
            .then(function () {
                $scope.isSaving = false;
                $scope.isEditing = false;
                success();
            }, function (err) {
                void(err); //Evitar erro de 'nao utilizado'
                error();
            });
        }
    };

    $scope.rollback = function () {
        $scope.livro = $window.jQuery.extend(true, {}, livroCopy);
        $scope.isEditing = false;
    };

    $scope.finishiEdit = function () {
        $scope.isNotFinished = true;
        $timeout(function () {
            $scope.isNotFinished = false;
        }, 3000);
    };

    $scope.openModal = function (imagem) {
        var modal = $uibModal.open({
            animation: true,
            templateUrl: 'views/admin_image_form.html',
            controller: 'AdminImageCtrl',
            resolve: {
                imagem: function () {
                    return imagem;
                },
                livro_id: function () {
                    return $scope.livro_id;
                }
            }
        });
		
		modal.result.then(function(imagem){
			console.log('adiciona imagem');
			$scope.livro.imagens.push(imagem);
		});
    };

    function success () {
        $scope.isSuccess = true;
        $timeout(function () {
            $scope.isSuccess = false;
        }, 3000);
    }

    function error () {
        $scope.isError = true;
        $timeout(function () {
            $scope.isError = false;
        }, 3000);
    }
});
