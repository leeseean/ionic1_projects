/**
 * Created by Boyz.X on 2015/7/1.
 */
ionicApp.controller('formlistCtrl',function($scope,$http,$state,showAlert,localStorageService,$ionicPopup){
    var showList = [];
    var PARENTSNAME = [];
    var ListInf = [];
    $scope.PARENTSNAME = [];
    $scope.MENULABEL = [];
    var count = 0 ;
    var row = 0 ;
    var column = 0 ;
    var userCode = localStorageService.get("userid")
    $http.get(serverUrl+"com.cms.formpatch.formMobile.queryMobileShowList.biz.ext?userCode="+userCode
    ).success(function(data){
            showList = data.showList;
            PARENTSNAME.push(showList[0].PARENTSNAME);
            $scope.PARENTSNAME[0] = [];
            ListInf[0] = [];
            for(var i = 0 ; i < showList.length ; i++ ){
                for(var j = 0; j < PARENTSNAME.length ; j++){
                    if((showList[i].PARENTSNAME != PARENTSNAME[j])&& (j >= PARENTSNAME.length-1)){
                        PARENTSNAME.push(showList[i].PARENTSNAME);
                        count ++;
                        ListInf[count] = [];
                    };
                };
                ListInf[count].push({MENULABEL:showList[i].MENULABEL,FORM_ID:showList[i].FORM_ID})
            };
            $scope.PARENTSNAME = PARENTSNAME;
            $scope.MENULABEL = ListInf[0];
        }).error(function(){
            showAlert('error');
        });
    $scope.number = function(i){
        column = i ;
        $scope.MENULABEL = [];
        $scope.MENULABEL = ListInf[i];
    };
    $scope.goform = function(i){
        row = i ;
        $state.go('formdetial',{MENULABEL:JSON.stringify(ListInf[column][row])});
    }
 /*   $scope.backOut = function(){
       *//* if(isWX())  WeixinJSBridge.invoke('closeWindow',{},function(res){});
        else wpt.exitWebApp();*//*
        $state.go('login');
    }*/
    $scope.backOut = function() {
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
});
