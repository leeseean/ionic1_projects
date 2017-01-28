/**
 * Created by Simonydsu on 2016/6/12.
 */
"use strict";
app.controller('RegisterCtrl', ['$scope','$state', 'Api', 'JingboServer', '$stateParams', '$timeout','$ionicPopup', '$ionicLoading',
    function ($scope,$state, Api, JingboServer, $stateParams, $timeout, $ionicPopup, $ionicLoading) {
      $scope.openId = $stateParams.open_id;

      $scope.checkBind = function(){
        var openId = $scope.openId.length? $scope.openId : "test01";
       // var openId = 'uat01';
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
              $state.go('sucBind',{});
          },
          function(err){
            $state.go('registerCtrl');
          },
          function(){

          }
          );
      };
      // $scope.checkBind();
      $scope.signIn = function(u){
        $ionicLoading.show({
          template: '验证中...'
        });
        //alert(hex_sha1(u.password));
        var openId = $scope.openId.length? $scope.openId : "test01";
        //var openId = $scope.openId;
        //alert(openId);
        //var params = {varQueryUserName: u.username, varQueryEncrytedPassword: '1f82c942befda29b6ed487a51da199f78fce7f05', varOpenId: '4'};

        //if(u.username)

        var params = {varQueryUserName: u.username, varQueryEncrytedPassword: hex_sha1(u.password), varOpenId: openId };
        JingboServer.getData(
          Api.bindWechatOpenId,
          'POST',
          {
            params: JSON.stringify(params),
            pageIndex: 1,
            pageRows: 10
          },
          function (res) {
            $ionicPopup.alert({
              title: '绑定成功',
              template: 'res.msg'
            });
          },
          function (err) {
            //CommonUtils.showAlert(err);
            $ionicPopup.alert({
              title: '绑定失败',
              template: err
            });
          },
          function () {
            $ionicLoading.hide();
            $state.go('sucBind');  //add 6.16
          }
        );
      };
    }]
);
