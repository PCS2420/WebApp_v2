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
      .state('user.home_descrever', { // caso ele esteja logado e requisitando /home/descrever
        url: '/home/descrever',
        templateUrl: 'views/home_descricao.html',
        controller: 'HomeCtrl',
      })
	  .state('user.home_revisar', { // caso ele esteja logado e requisitando /home/revisar
        url: '/home/revisar',
        templateUrl: 'views/home_revisao.html',
        controller: 'HomeCtrl',
      })
      .state('user.desclivro', { // caso ele esteja logado e selecionando livro
        url: '/selecionaLivroDescrever/:livro_id',
        templateUrl: 'views/selecionaLivro.html',
        controller: 'LivroCtrl'        
      })
      .state('user.revlivro', { // caso ele esteja logado e selecionando livro
        url: '/selecionaLivroRevisar/:livro_id',
        templateUrl: 'views/selecionaLivro.html',
        controller: 'LivroCtrl'        
      })
      .state('user.imagem', { // caso ele esteja logado e requisitando uma imagem especifica do livro
        url: '/selecionaImagem/:imagem_id',
        templateUrl: 'views/selecionaImagem.html',
        controller: 'DescricaoCtrl'        
      })
	  .state('user.revisao', { // caso ele esteja logado e requisitando /revisaImagem
		url: '/revisaImagem/:imagem_id',
		templateUrl:'views/revisaImagem.html',
		controller: 'RevisaoCtrl'
	  
	  })
      ;

    $urlRouterProvider.otherwise('/'); // caso a rota nao seja encontrada, envia para login
  });