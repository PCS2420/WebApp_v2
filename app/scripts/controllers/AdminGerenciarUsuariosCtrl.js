"use strict";
angular.module('webAppV2App')
.controller('AdminGerenciarUsuariosCtrl', function($scope, $state, $http, ListaUsuario, ListaCurso, URI, Auth) {
    angular.element("#texto_header").html("Admin - Gerenciar Usuários");
    $scope.$state = $state;
    $scope.sucesso_update = false;
    $scope.sucesso_ban = false;
    $scope.falha = false;
    $scope.loading = true;
    
    ListaCurso.getCursos().then(function(response) {
      $scope.cursos = response.data;
      loadUsuarios();
    });

    function loadUsuarios() {
      $scope.loading = true;
      ListaUsuario.getUsuarios().then(function(response) {
        console.log(response.data);
        $scope.usuarios = response.data;
        $scope.loading = false;
      });
    }
    
    $scope.fillEdit = function(user_id) {
        var line = angular.element('#'+user_id).find("td");
        var curso = angular.element('#'+user_id).find("input")[0].value;
        angular.element("#user_nome").val(angular.element(line[0]).html());
        angular.element("#user_login").val(angular.element(line[1]).html());
        angular.element("#user_cpf").val(angular.element(line[2]).html());
        angular.element("#user_curso").val(curso);
        angular.element("#user_tipo").val(angular.element(line[4]).html());
        angular.element("#user_pontuacao").val(angular.element(line[5]).html());
        $scope.updateUser = {id:user_id, 
                            nome: angular.element(line[0]).html(), 
                            login: angular.element(line[1]).html(),
                            cpf: angular.element(line[2]).html(),
                            curso: curso,
                            tipo: angular.element(line[4]).html(),
                            pontuacao: angular.element(line[5]).html()};
    };
    
    $scope.fillBan = function(user_id) {
        console.log(user_id);
        angular.element("#ban_user_id").val(user_id);
        $scope.banUser = {id:user_id};
    };
    
    $scope.fillDelete = function(user_id) {
        console.log(user_id);
        $scope.deleteUser = {id:user_id};
        angular.element("#delete_user_id").val(user_id);
    };
    
    $scope.update = function(formData) {
        console.log(formData);
        $scope.loading = true;
        angular.element("#edit").modal('hide');
        var promise = $http.put(URI.api+'usuario/'+formData.id, formData);
        promise.then(function(response){
          void(response); //Evitar erro de 'nao utilizado'
          ListaUsuario.getUsuarios().then(function(response) {
            $scope.sucesso_update = true;
            $scope.loadList(response.data);
          });
        });
    };
    
    $scope.ban = function(formData) {
        console.log(formData);
        formData.tipo = 'Banido';
        $scope.loading = true;
        angular.element("#ban").modal('hide');
        
        var promise = $http.put(URI.api+'usuario/'+formData.id, formData);
        promise.then(function(response) {
          void(response); //Evitar erro de 'nao utilizado'
          ListaUsuario.getUsuarios().then(function(response) {
            $scope.sucesso_ban = true;
            $scope.loadList(response.data);
          });
        });
    };
    
    $scope.delete = function(formData) {
        console.log(formData);
        $scope.loading = true;
        angular.element("#delete").modal('hide');
        
        var promise = $http.delete(URI.api+'usuario/'+formData.id);
        promise.then(function(response) {
          void(response); //Evitar erro de 'nao utilizado'
          ListaUsuario.getUsuarios().then(function(response) {
            $scope.sucesso_delete = true;
            $scope.loadList(response.data);
          });
        });
    };
    
    $scope.registerAdmin = function(userInfo) {
        angular.element("#adicionar").modal('hide');
        $scope.loading = true;
        userInfo.tipo = "Revisor";
        userInfo.senha = userInfo.login; // same pass as uname
        
        Auth.register(userInfo)
        .then(
            function(response){
                void(response); // Para nao dar erro de nao utilizado
                $scope.sucesso_adicionar = true;
                $scope.loading = false;
                $scope.user = null;
                $scope.loadList(response.data);
           },
            function(error){
                void(error); // Para nao dar erro de nao utilizado
                $scope.falha = true;
                $scope.loading = false;
        });
    };
    
    $scope.loadList = function(data) {
        $scope.usuarios = data;
        angular.element('html, body').animate({ scrollTop: 0 }, 'fast');
        $scope.loading = false;
    };
});