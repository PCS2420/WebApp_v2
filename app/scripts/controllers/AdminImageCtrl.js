"use strict";
angular.module('webAppV2App')
.controller('AdminImageCtrl', function($scope, $timeout, $modalInstance, imagem, livro_id, Imagem, JQuery){
    window.scope = $scope;
    $scope.isSuccess = false;
    $scope.isError = false;
    $scope.arquivos = {};
    var imagemCopy = {};
    if (imagem) {
        $scope.imagem = imagem;
        $scope.imagem_id = imagem.id;
        imagemCopy = JQuery.extend(true, {}, imagem);
    }
    else {
        $scope.imagem = {};
    }

    $scope.submit = function () {
        $scope.isSaving = true;
        console.log($scope.arquivos.arquivo);
        var imagem = $scope.imagem;
        if ($scope.imagem_id) {
            Imagem.updateImagem(imagem).then(function () {
                return Imagem.uploadImagem($scope.imagem_id, document.getElementById('arquivo').files[0]);
            }).then(function (res) {
                if (imagem.tipoDeContexto === "imagem") {
                    return Imagem.uploadContexto($scope.imagem_id, document.getElementById('contextoFile').files[0]);
                }
                else {
                    return res;
                }
            }).then(function () {
                success();
                $scope.isSaving = false;
                $scope.close();
            }, function (err) {
                void(err); //Evitar erro de 'nao utilizado'
                error();
                $scope.isSaving = false;
            });
        }
        else {
            imagem.estado = "Aberto";
            imagem.livro = livro_id;
            Imagem.createImagem(imagem).then(function (res) {
                $scope.imagem_id = res.data.id;
                $scope.imagem.id = res.data.id;
                return Imagem.uploadImagem($scope.imagem_id, document.getElementById('arquivo').files[0]);
            }).then(function (res) {
                if (imagem.tipoDeContexto === "imagem") {
                    return Imagem.uploadContexto($scope.imagem_id, document.getElementById('contextoFile').files[0]);
                }
                else {
                    return res;
                }
            }).then(function () {
                success();
                $scope.isSaving = false;
                $scope.close();
            }, function (err) {
                void(err); //Evitar erro de 'nao utilizado'
                error();
                $scope.isSaving = false;
            });
        }
    };

    $scope.rollback = function () {
        $scope.imagem = JQuery.extend(true, {}, imagemCopy);
        $scope.close();
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
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
