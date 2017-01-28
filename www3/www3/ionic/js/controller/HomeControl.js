/**
 * Created by zjf on 2015/7/6.
 */

ionicApp.controller('HomeControl', function($scope,$state,$http,showAlert,$stateParams) {
    if(isWX()){
        userCode=$stateParams.userCode;
    }
    /*$http.post(serverUrl+"com.smap.smapmain.login.loginEx.biz.ext",{
        user:{
            "userid":userCode
        }
    }).success(function(data) {
        var errCode=data.errCode;
        if(errCode=="Y"){
           // alert(errCode);
         *//*   $http.post(serverUrl+"com.smap.wfajax.disp.query.queryTodoEx.biz.ext",{
                "queryParam": queryParam, "page": page
            }).success(function(data){
                var items=data.items;
                var itemsLength=items.length;
                if(itemsLength>99){
                    $scope.badgeShow=true;
                    $scope.itemsLength="99+";
                }else if(itemsLength=="0"||itemsLength==null){
                    $scope.badgeShow=false;
                }else{
                    $scope.badgeShow=true;
                    $scope.itemsLength=itemsLength;
                }
            })*//*
        }else{
            showAlert("登录失败");
        }
    });*/


});