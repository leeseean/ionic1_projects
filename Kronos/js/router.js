// var myApp=angular.module('kronos', ['ionic','onezone-datepicker','locals','LocalStorageModule']);
myApp
.run(function ($rootScope, $state, $stateParams, $location, $timeout, $ionicHistory) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  // $ionicPlatform.ready(function ($rootScope) {  
  //           // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard  
  //           // for form inputs)  
  //           if (window.cordova && window.cordova.plugins.Keyboard) {  
  //               cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);  
  //           }  
  //           if (window.StatusBar) {  
  //               // org.apache.cordova.statusbar required  
  //               StatusBar.styleDefault();  
  //           }  
  //           console.log("-----------------------1");  
  //       });  
  //       //双击退出  
  //       $ionicPlatform.registerBackButtonAction(function (e) {  
  //           //判断处于哪个页面时双击退出  
  //           if ($location.path() == '/home') {  
  //               if ($rootScope.backButtonPressedOnceToExit) {  
  //                   ionic.Platform.exitApp();  
  //               } else {  
  //                   $rootScope.backButtonPressedOnceToExit = true;  
  //                   $cordovaToast.showShortTop('再按一次退出系统');  
  //                   setTimeout(function () {  
  //                       $rootScope.backButtonPressedOnceToExit = false;  
  //                   }, 2000);  
  //               }  
  //               console.log("-----------------------2");  
  //           }  
  //           else if ($ionicHistory.backView()) {  
  //               console.log("-----------------------3");  
  //               $ionicHistory.goBack();  
                  
  //           } else {  
  //               $rootScope.backButtonPressedOnceToExit = true;  
  //               $cordovaToast.showShortTop('再按一次退出系统');  
  //               setTimeout(function () {  
  //                   $rootScope.backButtonPressedOnceToExit = false;  
  //               }, 2000);  
  //               console.log("-----------------------4");  
  //           }  
  //           e.preventDefault();  
  //           return false;  
  //       }, 101);  
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('page1', {
    url: "page1",
    templateUrl: "templates/page1.html",
    controller:'ctrl-1'
  })
    .state('page2', {
    url: "page2",
    templateUrl: "templates/page2.html",
    controller:'ctrl-2'
  })
    .state('page3', {
    url: "page3",
    templateUrl: "templates/page3.html",
    controller:'ctrl-3'
  })
    .state('page4', {
    url: "page4",
    templateUrl: "templates/page4.html",
    controller:'ctrl-4'
  })
    .state('page5', {
    url: "page5",
    templateUrl: "templates/page5.html",
    controller:'ctrl-5'
  })
    .state('page6', {
    url: "page6",
    templateUrl: "templates/page6.html",
    controller:'ctrl-6'
  })
    .state('page7', {
    url: "page7",
    templateUrl: "templates/page7.html",
    controller:'ctrl-7'
  })
    .state('page8', {
    url: "page8",
    templateUrl: "templates/page8.html",
    controller:'ctrl-8'
  })
    .state('page9', {
    url: "page9",
    templateUrl: "templates/page9.html",
    controller:'ctrl-9'
  })
    .state('page10', {
    url: "page10",
    templateUrl: "templates/page10.html",
    controller:'ctrl-10'
  })
    .state('page11', {
    url: "page11",
    templateUrl: "templates/page11.html",
    controller:'ctrl-11'
  })
    .state('page12', {
    url: "page12",
    templateUrl: "templates/page12.html",
    controller:'ctrl-12'
  })
    .state('page13', {
    url: "page13",
    templateUrl: "templates/page13.html",
    controller:'ctrl-13'
  })
    .state('page15', {
    url: "page15",
    templateUrl: "templates/page15.html",
    controller:'ctrl-15'
  })
    .state('page16', {
    url: "page16",
    templateUrl: "templates/page16.html",
    controller:'ctrl-16'
  })
    .state('page17', {
    url: "page17",
    templateUrl: "templates/page17.html",
    controller:'ctrl-17'
  })
    .state('home', {
    url: "home",
    templateUrl: "home.html",
    controller:'ctrl-home'
  });
  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/page1');
})
.controller('appCtrl',function($state,$scope){
  $state.go('home');
})

