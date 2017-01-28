// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'tabSlideBox'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {

        });
    });

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.scrolling.jsScrolling(true);

    $stateProvider
        //行业资讯
        .state('news', {
            url: '/news/:open_id',
            templateUrl: 'templates/news.html',
            controller: 'NewsCtrl'
        })
        //价格查询
        .state('product_query', {
            url: '/product_query/:open_id',
            templateUrl: 'templates/product_query.html',
            controller: 'CategoryCtrl'
        })
        //活动列表
        .state('activity', {
            url: '/activity/:open_id',
            templateUrl: 'templates/activity_list.html',
            controller: 'ActivityListCtrl'
        })
        //活动详情
        .state('activity_detail', {
            url: '/activity_detail/:open_id/:activity_id',
            templateUrl: 'templates/activity_detail.html',
            controller: 'ActivityDetailCtrl'
        })
        //积分商品列表
        .state('ex-product_list', {
            url: '/ex-product_list/:open_id',
            templateUrl: 'templates/ex-product_list.html',
            controller: 'ExProductListCtrl'
        })
        //预付款信息
        .state('advanced_payment', {
            url: '/advanced_payment/:open_id',
            templateUrl: 'templates/advanced_payment.html',
            controller: 'AdvancedPaymentCtrl'
        })
        //付款记录
        .state('payment_record_list', {
            url: '/payment_record_list/:open_id',
            templateUrl: 'templates/payment_record_list.html',
            controller: 'PaymentRecordsCtrl'
        })
      //注册绑定
      .state('registerCtrl', {
        url: '/register/:open_id',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      })
      //绑定成功 add2016.6.16
      .state('sucBind', {
        params:{'dataParams':null},
        url: '/sucBind/:open_id',
        templateUrl: 'templates/sucBind.html',
        controller: 'sucBindCtrl'
      })
      //绑定入口 add2016.6.16
      .state('bind', {
        url: '/bind/:open_id',
        templateUrl: 'templates/bind.html',
        controller: 'bindCtrl'
      })
    ;
    $urlRouterProvider.otherwise('/news/:open_id');

});

app.constant('Api', {
    getProductMiddleCategory: 'http://222.134.52.35:7070/JBEcpExApp/wsAction?name=getProductMiddleCategory',
    getProductInterface: 'http://222.134.52.35:7070/JBEcpExApp/exAction?name=getProductInterface',
    getActivity: 'http://222.134.52.35:7070/JBEcpExApp/wsAction?name=getActivity',
    getActivityDetail: 'http://222.134.52.35:7070/JBEcpExApp/wsAction?name=getActivityDetail',
    getSatisfyStatus: 'http://222.134.52.35:7070/JBEcpExApp/wsAction?name=getSatisfyStatus',
    searchSysItem: 'http://222.134.52.35:7070/JBEcpExApp/wsAction?name=searchSysItem',
    getEcpExPaymentSumInfo: 'http://222.134.52.35:7070/JBEcpExApp/wsAction?name=getEcpExPaymentSumInfo',
    getEcpPaymentRecord: 'http://222.134.52.35:7070/JBEcpExApp/wsAction?name=getEcpPaymentRecord',
    getEcpExLzNews: 'http://222.134.52.35:7070/JBEcpExApp/wsAction?name=getEcpExLzNews',
    bindWechatOpenId:'http://222.134.52.35:7070/JBEcpInServiceApp/inAction?name=createWechatRelation',
    getOpenIdLogin:'http://222.134.52.35:7070/JBEcpInServiceApp/inAction?name=loginWechat',//add 2016.6.15
    RemoveBinding:'http://127.0.0.1:7101/JBEcpInServiceApp/inAction?name=endWechatRelation',//add 2016.6.15
    ShoppingMall:'http://127.0.0.1:7101/JBEcpInServiceApp/inAction?name=searchEcpExDeliveryHeaders',//add 2016.6.15
    newsData:'http://127.0.0.1:7101/JBEcpInServiceApp/inAction?name=getEcpExLzNews',//2016.6.17
});
