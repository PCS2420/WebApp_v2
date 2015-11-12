"use strict";
angular.module('webAppV2App')
  .config(function ($stateProvider, $urlRouterProvider, AccessLevels) {
    //-----ANONYMOUS ROUTES------
    //---------------------------
    $stateProvider
      .state('anon', {  // classe abstrata, nao existe instancia de estado apenas anon
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.anon
        },
        views: { // adicionando header e footer para todas as paginas anonimas
          'header': {
            templateUrl: 'views/header_deslogado.html'
          },
          'footer': {
            templateUrl: 'views/footer_deslogado.html'
          }
        }
      })
      .state('anon.login', { // usuario desconhecido requisitando '/login'
        url: '/login',
        views: {
          'content@': {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('anon.register', { // usuario desconhecido requisitando '/register'
        url: '/register',
        views: {
          'content@': {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
          }
        }
      })
      .state('anon.about', { // usuario desconhecido requisitando '/'
        url: '/',
        views: {
          'content@': {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
          }
        }
      });

	//-----ADMIN ROUTES------
	//-----------------------
	$stateProvider
		.state('admin', {  // admin abstrato
			abstract: true,
			template: '<ui-view/>',
			data: {
				access: AccessLevels.admin
			},
			views: { // adicionando header e footer para todas as paginas logadas como administrador
				'header': {
					templateUrl: 'views/header_admin.html'
				},
				'footer': {
					templateUrl: 'views/footer_admin.html'
				}
			}
		})
		.state('admin.lista_livro', { // usuario desconhecido requisitando '/registrarLivro'
			url: '/books',
			views: {
				'content@': {
					templateUrl: 'views/admin_livros.html',
					controller: 'AdminBooksCtrl'
				}
			}
		})
		.state('admin.form_livro', { // usuario desconhecido requisitando '/registrarLivro'
			url: '/books/form/:livro_id',
			views: {
				'content@': {
					templateUrl: 'views/admin_registrarLivro.html',
					controller: 'AdminRegistrarCtrl'
				}
			}
		})
		.state('admin.adicionar_usuarios', { // usuario desconhecido requisitando '/adicionarUsuario'
			url: '/adicionarUsuario',
			views: {
				'content@': {
					templateUrl: 'views/admin_adicionarUsuarios.html',
					controller: 'AdminAdicionarUsuariosCtrl'
				}
			}
		})
		.state('admin.gerenciar_usuarios', { // usuario desconhecido requisitando '/gerenciarUsuarios'
			url: '/gerenciarUsuarios',
			views: {
				'content@': {
					templateUrl: 'views/admin_gerenciarUsuarios.html',
					controller: 'AdminGerenciarUsuariosCtrl'
				}
			}
		})
		.state('admin.buscar', { // usuario desconhecido requisitando '/adminBuscar'
			url: '/adminBuscar',
			views: {
				'content@': {
					templateUrl: 'views/adminBuscar.html',
					controller: 'AdminBuscarCtrl'
				}
			}
		})
		.state('admin.config', { // usuario desconhecido requisitando '/adminConfig'
			url: '/adminConfig',
			views: {
				'content@': {
					templateUrl: 'views/adminConfig.html',
					controller: 'AdminConfigCtrl'
				}
			}
		});

    //------USER ROUTES-------
    //------------------------
    $stateProvider
      .state('user', { // para o usuario que é conhecido, também nao pode ser instanciado
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.user
        },
        views: {
          'header': {
            templateUrl: 'views/header.html'
          },
          'footer': {
            templateUrl: 'views/footer.html'
          }
        }
      })
      .state('user.home_descrever', { // caso ele esteja logado e requisitando /home/descrever
        url: '/home/descrever',
        views: {
          'content@': {
            templateUrl: 'views/home_descricao.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('user.desclivro', { // caso ele esteja logado e selecionando livro
        url: '/selecionaLivroDescrever/:livro_id',
        views: {
          'content@': {
            templateUrl: 'views/selecionaLivro.html',
            controller: 'LivroCtrl'
          }
        }
      })
      .state('user.imagem', { // caso ele esteja logado e requisitando uma imagem especifica do livro
        url: '/selecionaImagem/:imagem_id',
        views: {
          'content@': {
            templateUrl: 'views/selecionaImagem.html',
            controller: 'DescricaoCtrl'
          }
        }
      })
      .state('user.historico', { // caso ele esteja logado e requisitando historico
        url: '/historico',
        views: {
          'content@': {
            templateUrl: 'views/historico.html',
            controller: 'HistoricoCtrl'
          }
        }
      })
	  .state('user.historico.livro', { // caso ele esteja logado e requisitando historico
		url: '/historico/livro/:livro_id',
		views: {
		  'content@': {
			templateUrl:'views/historico_livro.html',
			controller: 'HistoricoLivroCtrl'
	      }
		}
	  })
      .state('user.perfil', { // caso ele esteja logado e requisitando perfil
        url: '/perfil',
        views: {
          'content@': {
            templateUrl: 'views/perfil.html',
            controller: 'PerfilCtrl'
          }
        }
      })
      .state('user.buscar', { // caso ele esteja logado e requisitando busca
        url: '/buscar',
        views: {
          'content@': {
            templateUrl: 'views/buscar.html',
            controller: 'BuscarCtrl'
          }
        }
      })
      .state('user.tutorial', { // caso ele esteja logado e  requisitando tutorial
        url: '/tutorial',
        views: {
          'content@': {
            templateUrl: 'views/tutorial.html',
            controller: 'TutorialCtrl'
          }
        }
      });
    //------REVISOR ROUTES-------
    //------------------------
    $stateProvider
      .state('revisor', { // para o usuario que é conhecido, também nao pode ser instanciado
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.revisor
        },
        views: {
          'header': {
            templateUrl: 'views/header.html'
          },
          'footer': {
            templateUrl: 'views/footer.html'
          }
        }
      })
      .state('revisor.home_revisar', { // caso ele esteja logado e requisitando /home/revisar
        url: '/home/revisar',
        views: {
          'content@': {
            templateUrl: 'views/home_revisao.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('revisor.revlivro', { // caso ele esteja logado e selecionando livro
        url: '/selecionaLivroRevisar/:livro_id',
        views: {
          'content@': {
            templateUrl: 'views/selecionaLivro.html',
            controller: 'LivroCtrl'
          }
        }
      })
      .state('revisor.revisao', { // caso ele esteja logado e requisitando /revisaImagem
        url: '/revisaImagem/:imagem_id',
        views: {
          'content@': {
            templateUrl: 'views/revisaImagem.html',
            controller: 'RevisaoCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/'); // caso a rota nao seja encontrada, envia para login
  });
