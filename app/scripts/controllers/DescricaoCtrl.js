angular.module('webAppV2App')
  .controller('DescricaoCtrl', function ($scope, $filter, $state, $stateParams, MostraImagem, EnviaDescricao, Auth, flash) {
    $scope.$state = $state; // http://stackoverflow.com/questions/21696104/how-to-ng-hide-and-ng-show-views-using-angular-ui-router
    $scope.flash = flash;

    var imagem_id = $stateParams.imagem_id
    var myDataPromise = MostraImagem.getImagem(imagem_id);

    myDataPromise.then(function (response) {
      //filtra por id do curso.
      //$scope.imagens = $filter('filter')(response.data, {curso : {id: $scope.loggedUser().curso}});
      $scope.imagem = response.data;
      console.log(response.data);
    });

    $scope.formData = {}


    $scope.exit = function () {
      $scope.loggedUser = undefined;
      Auth.logout();
      $state.go("anon.login");
    };

    $scope.cancela = function () {
      flash.setAlert({msg: 'A descrição foi cancelada.', type: 'info'});
      $state.go("user.home_descrever");
    };

    $scope.enviar = function () {
      var formData = $scope.formData
      formData.estado = "Pronto"
      EnviaDescricao.enviar($scope.imagem.id, $scope.formData)
        .then(
          function (response) {
            flash.setAlert({msg: 'A descrição foi feita com sucesso!', type: 'success'});
            $state.go("user.home_descrever");
          },
          function (error) {
            flash.setAlert({msg: 'Ocorreu algum erro ao realizar a descrição', type: 'error'});
            $state.go("user.home_descrever");
          }
        )
    };

    // Adiciona a funcionalidade de ouvir a descricao que esta presente no form
    $scope.ouvir= function() {
      var formData = $scope.formData

      console.log( formData );

      var voice = 'Brazilian Portuguese Female';

      setTimeout(responsiveVoice.speak( formData.descricao, voice),15000);
    };

    $scope.w = window.innerWidth;
    $scope.h = window.innerHeight;
    $scope.uri = "http://localhost:1337";
  });
