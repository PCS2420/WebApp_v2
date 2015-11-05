angular.module('webAppV2App')
	.config(function($stateProvider, $urlRouterProvider, AccessLevels) {
	$stateProvider
      .state('anon', {  // classe abstrata, nao existe instancia de estado apenas anon
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.anon
        }
      })
      .state('anon.login', { // usuario desconhecido requisitando '/'
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('anon.register', { // usuario desconhecido requisitando '/register'
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
	  .state('anon.about', { // usuario desconhecido requisitando '/register'
        url: '/',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });
	  
    $stateProvider
      .state('user', { // para o usuario que é conhecido, também nao pode ser instanciado
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.user
        }
      })
      .state('user.home', { // caso ele esteja logado e requisitando /home
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .state('user.livro', { // caso ele esteja logado e requisitando /home
        url: '/selecionaLivro/:livro_id',
        templateUrl: 'views/selecionaLivro.html',
        controller: 'LivroCtrl'        
      })
      .state('user.imagem', { // caso ele esteja logado e requisitando /home
        url: '/selecionaImagem/:imagem_id',
        templateUrl: 'views/selecionaImagem.html',
        controller: 'ImagemCtrl'        
      })
	  .state('user.revisao', { // caso ele esteja logado e requisitando /revisaImagem
		url: '/revisaImagem/:imagem_id',
		templateUrl:'views/revisaImagem.html',
		controller: 'RevisaoCtrl'
	  
	  })
      ;

    $urlRouterProvider.otherwise('/'); // caso a rota nao seja encontrada, envia para login
  });