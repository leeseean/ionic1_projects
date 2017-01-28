/**
 * Created by zjf on 2015/7/6.
 */
/*====================================流程启动==============================================*/
ionicApp.controller('showFormControl',function($scope, $ionicModal,$http,$state,$window){
    /*$http.post('http://siedev.chinasie.com:8189/siebpm/com.smap.wfajax.disp.query.queryStartupHisEx.biz.ext', {

     "queryParam": queryParam, "page": page
     }).success(function(data){
     $scope.processes = data.processes;

     });

     $scope.clickTask=function(data){
     //console.log(JSON.stringify(data));
     $state.go('detail',{id:data.processinstid});
     };*/
    $scope.back =function(){


        //$ionicHistory.goBack();
        $window.history.back();
    };

});
