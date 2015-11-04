# AppSinestesia

Frontend do sistema baseado em crowdsourcing para descrição de livros.
Construído em torno da biblioteca Javascript Angular.JS.

## Requisitos

É necessário ter o bower, grunt e git instalados.
Para instalar o bower, executar `npm install -g bower`.
Para instalar o grunt, executar `npm install grunt-npm-install --save-dev`
Para instalar o Git@WIN: baixar o client e executar a instalação. Se possível,
adicionar git ao PATH. Se o git já tiver sido instalado e ele não está no PATH,
seguir esse tutorial : http://www.chambaud.com/2013/07/08/adding-git-to-path-when-using-github-for-windows/
Para instalar o Git@LX: `sudo apt-get install git`

## Desenvolvimento

Após realizar o `pull` do branch, será necessário baixar todas as bibliotecas
e módulos. São 4 passos simples no cmd/terminal: 
1) `$ npm install`. Esse comando instalará todos módulos dependentes da aplicação.
2) `$ bower install`. Ele instalará pacotes especificados no arquivo bower.json.
3) `$ grunt` para fazer build do servidor.
4) `$ grunt serve` para executar o servidor e visualizar a página inicial!

## Problemas na instalacão em ambiente Windows

Alguns problemas podem acontecer na instalação (node-gyp). Se após realizar todas as
etapas ainda não foi possível executar o servidor, faça como a seguir:
-> Instale Python v2.7
-> Instale Microsoft Visual Studio 2013/2015
-> Execute `$ npm config set msvs_version 2013 --global`  (ou 2015)
-> Execute `$ npm config set python python2.7`

## Testes

Para executar testes com karma, `$ grunt test`.
