/**
 * Created by zjf on 2015/7/6.
 */
/*===========================我的流程====================================================================*/
var queryParam = {};
//var page = {begin: 0, length: 10, isCount: true};
ionicApp.controller('showStartupControl',function($scope, $ionicModal,$http,$state,$window,$timeout,showAlert,$ionicLoading,localStorageService,$ionicPopup){
   /* $scope.showLoading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android" class="spinner spinner-android"></ion-spinner>'
        });
    };
    $scope.hideLoading = function(){
        $ionicLoading.hide();
    };
   $scope.showLoading();*/
    var userCode = localStorageService.get("userid");
    queryParam.userCode = userCode;

    var processess=[];
    $scope.processes=[];
    $http.post(serverUrl+"com.smap.wfajax.disp.query.queryStartupHisEx.biz.ext", {
        "queryParam": queryParam, "page":  {begin: 0, length: 100, isCount: true}
    }).success(function(data){
       //$scope.hideLoading();
       // $scope.processes = data.processes;
        processess= data.processes;

        var itemsLength=data.processes.length;
        var FinancList = true;
        var y=0;
        var n=0;
        $scope.moreDataCanBeLoaded = function(){
            return FinancList;
        };
        $scope.moreDataCanBeLoadedtext = function(){
            return !FinancList;
        };

        $scope.loadMore = function(){
            $timeout(function() {

                if (FinancList&&itemsLength>=10) {
                    var amount;
                    var digit =itemsLength-10*n;
                    n=n+1;
                    if(digit<10){
                        amount=digit;
                    }else{
                        amount=10;
                    }
                    for(var i=0 ; i < amount ; i++){

                        $scope.processes.push(processess[y]);
                        y=y+1;
                    }
                    if($scope.processes.length>=itemsLength){
                        FinancList = false;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');

                }else if(FinancList &&itemsLength<10){
                    for(var i=0 ; i < itemsLength ; i++){

                        $scope.processes.push(processess[y]);
                        y=y+1;
                    }
                    if($scope.processes.length>=itemsLength){
                        FinancList = false;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            },500)
        };

    }) .error(function(data){
        showAlert('网络请求失败，请检查网络');
    });
    $scope.clickTask=function(data){
        localStorage.setItem("audit",JSON.stringify(data));
        $state.go('detail3',{id:data.processinstid});
    };
/*    $scope.back =function(){
       *//* if(isWX())  WeixinJSBridge.invoke('closeWindow',{},function(res){});
        else wpt.exitWebApp();*//*
        $state.go('login');
    };*/
    $scope.back = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '确认退出登录?',
            /* template: '确认退出登录?',*/
            buttons: [
                { text: '取消',
                    onTap: function(e) {
                        /*  $scope.showval="";*/
                    }
                },
                {
                    text: '<b>确定</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $state.go('login');
                    }
                }
            ]
        });
        confirmPopup.then(function(res) {
            /*if(!res) {
             $scope.showval="";
             } */
        });
    };
    $scope.doRefresh = function() {
        $http.post(serverUrl+"com.smap.wfajax.disp.query.queryStartupHisEx.biz.ext", {
            "queryParam": queryParam, "page": {begin: 0, length: 100, isCount: true}
        }).success(function(data){
            $scope.processes = data.processes;
            $scope.$broadcast('scroll.refreshComplete');

        }) .error(function(data){
            $scope.$broadcast('scroll.refreshComplete');
            showAlert('网络请求失败，请检查网络');
        });
       /* $timeout( function() {
        }, 1000);*/
    };
});