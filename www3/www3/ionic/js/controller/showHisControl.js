/**
 * Created by zjf on 2015/7/6.
 */
/*===========================已办流程====================================================================*/
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;

var queryParam = {};
//var page = {begin: 0, length: 100, isCount: true};

ionicApp.controller('showHisControl',function($scope, $ionicModal,$http,$state,$window,$timeout,$ionicLoading,showAlert,localStorageService,$ionicPopup){

/*    $scope.showLoading = function() {
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
    $http.post(serverUrl+"com.smap.wfajax.disp.query.queryHisEx.biz.ext", {
        "queryParam": queryParam, "page":{begin: 0, length: 100, isCount: true}
    }).success(function(data){
        //$scope.hideLoading();
        $scope.workitems = data.workitems;

        /*===========================到达时间====================================================================*/

        var workitems=$scope.workitems;
        var workitemss=[];

        $scope.workitems=[];
        for(var x in workitems) {

            var dateTimeStamp = workitems[x].endtime;
            var arr=dateTimeStamp.split(/[- :]/);/* 在ios上使用Date.parse*/
            var dateSplit=new Date(arr[0],arr[1]-1,arr[2],arr[3],arr[4],arr[5]);
            var arriveTime = Date.parse(dateSplit);
            var now = new Date().getTime();
            var diffValue = now - arriveTime;

            var monthC = diffValue / month;
            var halfamonthC=diffValue/halfamonth;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;
            if (monthC >= 1) {
                result = parseInt(monthC) + "个月前处理";
            }
            else if (halfamonthC >= 1) {
                result = "半个月前处理";
            }
            else if (weekC >= 1) {
                result = parseInt(weekC) + "周前处理";
            }
            else if (dayC >= 1) {
                result = parseInt(dayC) + "天前处理";
            }
            else if (hourC >= 1) {
                result = parseInt(hourC) + "小时前处理";
            }
            else if (minC >= 1) {
                result = parseInt(minC) + "分钟前处理";
            } else
                result = "刚刚处理";

            var workitem={};
            workitem.arriveTimes=result;
            workitem.processinstname=workitems[x].processinstname;
            workitem.activityinstname=workitems[x].activityinstname;
            workitem.processinstdesc=workitems[x].processinstdesc;
            workitem.creatorname=workitems[x].creatorname;
            workitem.businessstate=workitems[x].businessstate;
            workitem.currentstate=workitems[x].currentstate;
            workitem.starttime=workitems[x].starttime;
            workitem.endtime=workitems[x].endtime;
            workitem.processinstid=workitems[x].processinstid;
            workitem.ACTIVITYINSTID=workitems[x].ACTIVITYINSTID;
            workitem.extend1=workitems[x].extend1;

            workitemss.push(workitem);
            var itemsLength=workitems.length;
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

                            $scope.workitems.push(workitemss[y]);
                            y=y+1;
                        }
                        if($scope.workitems.length>=itemsLength){
                            FinancList = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    }else if(FinancList &&itemsLength<10){
                        for(var i=0 ; i < itemsLength ; i++){

                            $scope.workitems.push(workitemss[y]);
                            y=y+1;
                        }
                        if($scope.workitems.length>=itemsLength){
                            FinancList = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                },500)
            };
        }
    }).error(function(data){
        showAlert('网络请求失败，请检查网络');
    });
    $scope.clickTask=function(data){
        //console.log(JSON.stringify(data));
        /*inf = {activityinstid:data.ACTIVITYINSTID,workitemId:data.WORKITEMID,id:data.PROCESSINSTID};
         var transdata = {list:JSON.stringify(inf)};
         $state.go('detail',transdata);*/
        localStorage.setItem("audit",JSON.stringify(data));
        $state.go('detail2',{id:data.processinstid});
    };
/*    $scope.back =function(){
    *//*    if(isWX())  WeixinJSBridge.invoke('closeWindow',{},function(res){});
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
        $http.post(serverUrl+"com.smap.wfajax.disp.query.queryHisEx.biz.ext", {
            "queryParam": queryParam, "page": {begin: 0, length: 100, isCount: true}
        }).success(function(data){
            //$scope.hideLoading();
            $scope.workitems = data.workitems;
            var workitems=$scope.workitems;
            $scope.workitems=[];
            for(var x in workitems) {
                var dateTimeStamp = workitems[x].endtime;
                var arr=dateTimeStamp.split(/[- :]/);/* 在ios上使用Date.parse*/
                var dateSplit=new Date(arr[0],arr[1]-1,arr[2],arr[3],arr[4],arr[5]);
                var arriveTime = Date.parse(dateSplit);
                var now = new Date().getTime();
                var diffValue = now - arriveTime;
                var monthC = diffValue / month;
                var halfamonthC=diffValue/halfamonth;
                var weekC = diffValue / (7 * day);
                var dayC = diffValue / day;
                var hourC = diffValue / hour;
                var minC = diffValue / minute;
                if (monthC >= 1) {
                    result = parseInt(monthC) + "个月前处理";
                }
                else if (halfamonthC >= 1) {
                    result = "半个月前处理";
                }
                else if (weekC >= 1) {
                    result = parseInt(weekC) + "周前处理";
                }
                else if (dayC >= 1) {
                    result = parseInt(dayC) + "天前处理";
                }
                else if (hourC >= 1) {
                    result = parseInt(hourC) + "小时前处理";
                }
                else if (minC >= 1) {
                    result = parseInt(minC) + "分钟前处理";
                } else
                    result = "刚刚处理";
                var workitem={};
                workitem.arriveTimes=result;
                workitem.processinstname=workitems[x].processinstname;
                workitem.activityinstname=workitems[x].activityinstname;
                workitem.processinstdesc=workitems[x].processinstdesc;
                workitem.creatorname=workitems[x].creatorname;
                workitem.businessstate=workitems[x].businessstate;
                workitem.currentstate=workitems[x].currentstate;
                workitem.starttime=workitems[x].starttime;
                workitem.endtime=workitems[x].endtime;
                workitem.processinstid=workitems[x].processinstid;
                workitem.ACTIVITYINSTID=workitems[x].ACTIVITYINSTID;
                workitem.extend1=workitems[x].extend1;
                $scope.workitems.push(workitem);
            }
            $scope.$broadcast('scroll.refreshComplete');
        }).error(function(data){
            $scope.$broadcast('scroll.refreshComplete');
            showAlert('网络请求失败，请检查网络');
        });
        /*$timeout( function() {*/
       /* }, 500);*/
    };
});