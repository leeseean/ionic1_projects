/*====================================流程审批记录==============================================*/

/*var processInstId = {};*/
ionicApp.controller('auditHisControl',function($scope,$http,$stateParams,$state,$window,$ionicLoading,$ionicGesture,showAlert) {

    var inf = eval("(" + $stateParams.list + ")");
    var list = {activityinstid: inf.activityinstid, workitemId: inf.workitemId, processinstid: inf.id};
    var list3 = {workitemId: inf.workitemId, processinstid: inf.id};
    $scope.hisList = [];
    $scope.isTodo = localStorage.getItem("isTodo")==="true";
    $scope.back = function () {
        $state.go("home.showTodo");
    };
    $http.get(serverUrl + "com.smap.wfajax.disp.query.queryAuditHisEx.biz.ext?processinstid="+inf.id).success(function (data) {
        $scope.hisList = data.auditHis;
    })



    /*===========================审批意见================*/
    var listdata = {list: JSON.stringify(list)};
    var listdata3 = {list3: JSON.stringify(list3)};
    if(inf.businessState=='14'||inf.businessState=='13'){
        $scope.html = "sb";
    }else{
        $scope.html = "sp";
    }
    $scope.approval = function () {
        $state.go('pgAuditAdvise', listdata);
    };
    $scope.reject = function () {
        $state.go('pgAuditAdvise2', listdata);
    };
    $scope.turnTodo = function () {
        $state.go('pgAuditAdvise3', listdata3);
    };
    $scope.communicate = function () {
        $state.go('pgAuditAdvise4', listdata3);
    };
    /*===========================提交================*/
    $scope.Submit=function() {
        $scope.showLoading = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner spinner-android"></ion-spinner>'
            });
        };
        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };
        $scope.showLoading();

        $http.post(serverUrl+"com.smap.wfajax.std.handle.approveEx2.biz.ext",{"processinstInfo":{

            "activityinstid":inf.activityinstid,
            "opiniontext":"提交",
            "workitemId":inf.workitemId,
            "userCode":userCode
        }}).success(function (data) {
            if(data.retMsg!=null &&data.retMsg!="yes"){
                $state.go('home.showTodo');
                $scope.hideLoading();
                if(data.retMsg=="notrunning"){
                    showAlert("提交未成功");
                }
                else{
                    showAlert(data.retMsg);
                }

            }else if(data.exception){
                $state.go('home.showTodo');
                $scope.hideLoading();
                showAlert(data.exception.message);
            }
            else{
                $http.post(serverUrl+"com.cms.formpatch.formMobile.getMobilePermission.biz.ext",{
                    "actId":inf.workitemId,"userCode":userCode
                }).success(function(data){
                    $http.post(serverUrl+"com.cms.formpatch.formMobile.getFormMobileDetail.biz.ext",{
                        "processInstId":inf.processinstid
                    }).success(function(data){
                        $http.post(serverUrl+"com.smap.wfajax.disp.query.queryAuditHisEx.biz.ext",{
                            "processinstid":inf.processinstid
                        }).success(function(data){
                            $state.go('home.showTodo',{reload:true});
                            // $window.location.reload(true);
                            $scope.hideLoading();
                            showAlert("提交成功");
                        })
                    })
                })
            }
        })
    }
    $scope.element = angular.element(document.querySelector('#auditHis'));
    $scope.events = [{
        event: 'swipeup'
    }, {
        event: 'swipedown'
    }, {
        event: 'swipeleft'
    }, {
        event: 'swiperight'
    }];

    angular.forEach($scope.events, function (obj) {
        $ionicGesture.on(obj.event, function () {
            if(obj.event == "swiperight"){
                $scope.$apply(function(){
                    $state.go('detail',{list:JSON.stringify(inf)});
                });
            }else if(obj.event == "swipeleft"){
                $scope.$apply(function(){
                    $state.go('auditType',{list:JSON.stringify(inf)});
                });
            }
        }, $scope.element);
    });
    $scope.setbr = function(str){
        var count = 0;
        var strbak = "";
        for(i=0;i<str.length;i++){
            count++;
            strbak+=str[i];
            if(count==3&&i!=(str.length-1)){
                strbak+="";
                count = 0;
            }
        }
        return strbak;
    };
});
