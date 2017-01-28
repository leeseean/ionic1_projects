/**
 * Created by zjf on 2015/7/6.
 */
/*===========================待办流程====================================================================*/
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;

var queryParam = {};
var page = {begin: 0, length: 100, isCount: true};
var inf;

ionicApp.controller('showTodoControl',function($http,$scope, $ionicModal,$window,$state,$timeout,showAlert,$ionicLoading,localStorageService,$ionicPopup){
   // queryParam.userCode = userCode;
    //alert(userCode);
   /* $scope.showLoading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android" class="spinner spinner-android"></ion-spinner>'
        });
    };
    $scope.hideLoading = function(){
        $ionicLoading.hide();
    };
    $scope.showLoading();*/

    var userCode = localStorageService.get("userid")
    //showAlert(userCode);
    $http.post(
            serverUrl+"com.smap.wfajax.disp.query.queryTodoEx1.biz.ext",
        {
       /* "queryParam": queryParam, "page": page*/
            "userCode":userCode
    }).success(function(data){
       /* $scope.hideLoading();*/
        $scope.items = data.items;
        /*===========================到达时间====================================================================*/
        var items=$scope.items;
        var  itemss=[];
        $scope.items=[];

        for(var x in items){

            var dateTimeStamp=items[x].starttime;
            var arr=dateTimeStamp.split(/[- :]/); /* 在ios上使用Date.parse*/
            var dateSplit = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
            var arriveTime = Date.parse(dateSplit);
            var now = new Date().getTime();
            var diffValue = now - arriveTime;
            var monthC =diffValue/month;
            var halfamonthC=diffValue/halfamonth;
            var weekC =diffValue/(7*day);
            var dayC =diffValue/day;
            var hourC =diffValue/hour;
            var minC =diffValue/minute;
            if(monthC>=1){
                result= parseInt(monthC) + "个月前到达";
            }
            else if(halfamonthC>=1){
                result= "半个月前到达";
            }
            else if(weekC>=1){
                result= parseInt(weekC) + "周前到达";
            }
            else if(dayC>=1){
                result= parseInt(dayC) +"天前到达";
            }
            else if(hourC>=1){
                result=parseInt(hourC) +"小时前到达";
            }
            else if(minC>=1){
                result= parseInt(minC) +"分钟前到达";
            }else
                result="刚刚到达";

            var item={};
            item.arriveTimes=result;
            item.PROCESSCHNAME=items[x].processinstname;
            item.ACTIVITYINSTNAME=items[x].activityinstname;
            item.PROCESSINSTDESC=items[x].processinstdesc;
            item.WORKITEMNAME=items[x].workitemname;
            item.OPERATORNAME=items[x].creatorname;
            item.BUSINESSSTATE=items[x].businessstate;
            item.CURRENTSTATE=items[x].currentstate;
            item.STARTTIME=items[x].starttime;
            item.ACTIVITYINSTID=items[x].activityinstid;
            item.WORKITEMID=items[x].workitemid;
            item.PROCESSINSTID=items[x].processinstid;
            item.EXTEND1=items[x].extend1;
            itemss.push(item);

            var itemsLength=items.length;
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

                    if (FinancList &&itemsLength>=10) {

                        var amount;
                        var digit =itemsLength-10*n;
                        n=n+1;
                        if(digit<10){
                            amount=digit;
                        }else{
                            amount=10;
                        }
                        for(var i=0 ; i < amount ; i++){

                            $scope.items.push(itemss[y]);
                            y=y+1;
                        }
                        if($scope.items.length>=itemsLength){
                            FinancList = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    }else if(FinancList &&itemsLength<10){
                        for(var i=0 ; i < itemsLength ; i++){

                            $scope.items.push(itemss[y]);
                            y=y+1;
                        }
                        if($scope.items.length>=itemsLength){
                            FinancList = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                },500)
            };
          /*  if(itemsLength==0||itemsLength==null){
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }*/
        }
        /* $state.go('pgAuditAdvise',{listDatas:JSON.stringify(data)},{reload:true});*/
    })
        .error(function(data){
            showAlert('网络请求失败，请检查网络');
        });
   
    $scope.clickTask=function(data){
        inf = {activityinstid:data.ACTIVITYINSTID,workitemId:data.WORKITEMID,id:data.PROCESSINSTID,businessState:data.BUSINESSSTATE};
        localStorage.setItem("audit",JSON.stringify(data));
        var transdata = {list:JSON.stringify(inf)};
       /* document.getElementById("afterFont").style.color = 'red';*/
        $state.go('detail',transdata);
    };
/*    $scope.back =function(){
      *//*  if(isWX())  WeixinJSBridge.invoke('closeWindow',{},function(res){});
        else wpt.exitWebApp();*//*
       // $window.history.back();

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
        $http.post(
                serverUrl+"com.smap.wfajax.disp.query.queryTodoEx1.biz.ext",
            {
                /* "queryParam": queryParam, "page": page*/
                "userCode":userCode

            }).success(function(data){
                $scope.items = data.items;
                var items=$scope.items;
                $scope.items=[];
                for(var x in items){
                    var dateTimeStamp=items[x].starttime;
                    var arr=dateTimeStamp.split(/[- :]/);  //在ios上使用Date.parse
                    var dateSplit = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
                    var arriveTime = Date.parse(dateSplit);
                    var now = new Date().getTime();
                    var diffValue = now - arriveTime;
                    var monthC =diffValue/month;
                    var halfamonthC=diffValue/halfamonth;
                    var weekC =diffValue/(7*day);
                    var dayC =diffValue/day;
                    var hourC =diffValue/hour;
                    var minC =diffValue/minute;
                    if(monthC>=1){
                        result= parseInt(monthC) + "个月前到达";
                    }
                    else if(halfamonthC>=1){
                        result= "半个月前到达";
                    }
                    else if(weekC>=1){
                        result= parseInt(weekC) + "周前到达";
                    }
                    else if(dayC>=1){
                        result= parseInt(dayC) +"天前到达";
                    }
                    else if(hourC>=1){
                        result=parseInt(hourC) +"小时前到达";
                    }
                    else if(minC>=1){
                        result= parseInt(minC) +"分钟前到达";
                    }else
                        result="刚刚到达";

                    var item={};
                    item.arriveTimes=result;
                    item.PROCESSCHNAME=items[x].processinstname;
                    item.ACTIVITYINSTNAME=items[x].activityinstname;
                    item.PROCESSINSTDESC=items[x].processinstdesc;
                    item.WORKITEMNAME=items[x].workitemname;
                    item.OPERATORNAME=items[x].creatorname;
                    item.BUSINESSSTATE=items[x].businessstate;
                    item.CURRENTSTATE=items[x].currentstate;
                    item.STARTTIME=items[x].starttime;
                    item.ACTIVITYINSTID=items[x].activityinstid;
                    item.WORKITEMID=items[x].workitemid;
                    item.PROCESSINSTID=items[x].processinstid;
                    item.EXTEND1=items[x].extend1;
                    $scope.items.push(item);
                }
                $scope.$broadcast('scroll.refreshComplete');

            }).error(function(data){
            $scope.$broadcast('scroll.refreshComplete');
            showAlert('网络请求失败，请检查网络');
        })
        /*$timeout( function() {
        }, 1000);*/
    };
});