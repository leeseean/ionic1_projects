
var app = angular.module('myApp', ['ionic']);
app.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
      $stateProvider
      .state('index', {
          url: '/index',
          abstract: true,
          templateUrl: 'index.html'
      })
      .state('toDo', {
          url: '/toDo',
          templateUrl: 'templates/toDo.html',
      })
      .state('sheet1', {
          url: '/sheet1',
          templateUrl: 'templates/sheet1.html',
      })
      .state('sheet2', {
          url: '/sheet2',
          templateUrl: 'templates/sheet2.html',
      });
      // $ionicConfigProvider.platform.ios.backButton.previousTitleText(false);
      // $ionicConfigProvider.platform.android.backButton.previousTitleText(false);
      $ionicConfigProvider.backButton.previousTitleText(false);
})    
      .controller('appController', function($state,$scope){
        $state.go('toDo');
    }) 
 

