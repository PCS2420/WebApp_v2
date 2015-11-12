angular.module('webAppV2App')
.controller('AdminImageCtrl', function($scope, $timeout, $modalInstance, imagem, livro_id, Imagem){
    $scope.isSuccess = false;
    $scope.isError = false;
    $scope.arquivos = {};
    var imagemCopy = {};
    if (imagem) {
        $scope.imagem = imagem;
        $scope.imagem_id = imagem.id;
        imagemCopy = $.extend(true, {}, imagem);
    }
    else {
        $scope.imagem = {};
    }

    $scope.submit = function () {
        $scope.isSaving = true;
        var imagem = $scope.imagem;
        if ($scope.imagem_id) {
            Imagem.updateImagem(imagem).then(function () {
                $scope.isSaving = false;
                success();
            }, function (err) {
                error();
            });
        }
        else {
            imagem.estado = "Aberto";
            imagem.livro = livro_id
            Imagem.createImagem(imagem).then(function (res) {
                $scope.imagem_id = res.data.id;
                $scope.imagem.id = res.data.id;
                console.log($scope.arquivo);
                return Imagem.uploadImagem($scope.imagem_id, $scope.arquivos.arquivo);
            }).then(function (res) {
                if (imagem.tipoDeContexto == "imagem") {
                    console.log($scope.contextoFile);
                    return Imagem.uploadContexto($scope.imagem_id, $scope.arquivos.contextoFile);
                }
                else {
                    return res;
                }
            }).then(function () {
                success();
                $scope.isSaving = false;
            }, function (err) {
                error();
            });
        }
    }

    $scope.rollback = function () {
        $scope.imagem = $.extend(true, {}, imagemCopy);
        $scope.close();
    }

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    }

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