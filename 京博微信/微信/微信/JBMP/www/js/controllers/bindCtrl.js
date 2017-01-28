/**
 * Created on 2016/6/16.
 */
"use strict";
app.controller('bindCtrl', ['$scope','$state', 'Api', 'JingboServer', '$stateParams', '$timeout','$ionicPopup', '$ionicLoading',
    function ($scope,$state, Api, JingboServer, $stateParams, $timeout, $ionicPopup, $ionicLoading) {
      $scope.openId = $stateParams.open_id;
      $scope.checkBind = function(){
        //var openId = $scope.openId.length? $scope.openId : "test01";
        var openId = 'uat01';
        var params = {'openId':'uat01'};
        JingboServer.getData(
          Api.getOpenIdLogin,
          'POST',
          {
            params:JSON.stringify(params),
            pageIndex:1,
            pageRows:10
          },
          function(res){
            if(params['openId'] == openId){
              $state.go('sucBind');
            }
            
          },
          function(err){
            $state.go('registerCtrl');
          },
          function(){

          }
          );
      };
      $scope.checkBind();
    }]
);
