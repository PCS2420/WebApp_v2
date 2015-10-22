'use strict';

/**
 * @ngdoc function
 * @name webAppV2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webAppV2App
 */
var app=angular.module('webAppV2App');

app.controller('bookCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('http://localhost:1337/livro/56205dc6d45ee0cb103e80cc')
      .then(function(response){
        $scope.bookData=response.data;
        $scope.debug=JSON.stringify(response.data);
      },function(){$scope.bookTitle='testBookName';});
    // Book id is hardcoded until now.


    // Hardcoded for test presentation

    // $scope.bookTitle= 'testBookName';
    // $scope.bookEditor='testEditor';
    // $scope.bookEdition='testEdition';
    // $scope.bookYear='testYear';
    // $scope.bookAuthor='testAuthor';
    // $scope.bookImages=['http://www.femmeactuelle.fr/var/femmeactuelle/storage/images/cuisine/news-cuisine/vive-la-fete-du-pain-!-15199/11742777-1-fre-FR/vive-la-fete-du-pain.jpg',
    //                    'http://imaginaire.passioncereales.fr/sites/default/files/field/image/PAINS.jpg'];
}]);
