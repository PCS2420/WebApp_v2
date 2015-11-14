# AppSinestesia

Frontend do sistema baseado em crowdsourcing para descrição de livros.
Construído em torno da biblioteca Javascript Angular.JS.

## Requisitos

É necessário ter: grunt-cli, grunt e git instalados:
  1. Para instalar o grunt-cli, executar `$ npm install -g grunt-cli`
  2. Para instalar o grunt, executar `$ npm install grunt --save-dev`
  3. Para instalar o Git
    1. Windows: baixar o client e executar a instalação. Se possível,
adicionar git ao PATH. Se o git já tiver sido instalado e ele não está no PATH,
seguir esse tutorial: http://www.chambaud.com/2013/07/08/adding-git-to-path-when-using-github-for-windows/
    2. Linux: `sudo apt-get install git`

## Desenvolvimento

Após realizar o `pull` do branch, será necessário baixar todas as bibliotecas
e módulos. São 3 passos simples no cmd/terminal: 
  1. `$ npm install`. Esse comando instalará todos módulos dependentes da aplicação.
  3. `$ grunt` para fazer build do servidor.
  4. `$ grunt serve --force` para executar o servidor e visualizar a página inicial!

## Problemas na instalacão em ambiente Windows

Alguns problemas podem acontecer na instalação (node-gyp). Se após realizar todas as
etapas ainda não foi possível executar o servidor, faça como a seguir:
  1. Instale Python v2.7
  2. Instale Microsoft Visual Studio 2013/2015
  3. Execute `$ npm config set msvs_version 2013 --global`  (ou 2015)
  4. Execute `$ npm config set python python2.7`
  5. Execute novamente o comando que deu erro.

Caso o erro ainda exista, tente passar os parâmetros para o comando como a seguir:
(aqui o erro acontece na hora de instalar o sails, por exemplo)

    `npm install sails -g --python="C:\Program Files (x86)\Python\python.exe" --msvs_version=2013`
