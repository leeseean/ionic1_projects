/*====================================流程属性==============================================*/

/*var processInstId = {};*/
ionicApp.controller('auditTypeControl',function($scope,$http,$stateParams,$state,$window,$ionicGesture,$ionicLoading,showAlert) {

    var inf = eval("(" + $stateParams.list + ")");
    var list = {activityinstid: inf.activityinstid, workitemId: inf.workitemId, processinstid: inf.id};
    var list3 = {workitemId: inf.workitemId, processinstid: inf.id};
    $scope.back = function () {
        $state.go("home.showTodo");
    };
    $scope.isTodo = localStorage.getItem("isTodo")==="true";
    $scope.data=eval("(" + localStorage.getItem("audit") + ")");


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
        /* $scope.popover.hide();*/
    };
    $scope.reject = function () {
        $state.go('pgAuditAdvise2', listdata);
        /*$scope.popover.hide();*/
    };
    $scope.turnTodo = function () {
        $state.go('pgAuditAdvise3', listdata3);
        /*$scope.popover.hide();*/
    };
    $scope.communicate = function () {
        $state.go('pgAuditAdvise4', listdata3);
        /* $scope.popover.hide();*/
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
    $scope.element = angular.element(document.querySelector('#auditType'));
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
                    $state.go('auditHis',{list:JSON.stringify(inf)});
                });
            }else if(obj.event == "swipeleft"){
                $scope.$apply(function(){
                    $http.post(serverUrl + "com.cms.formpatch.formMobile.queryFormWFInst.biz.ext", {
                        "processInstId": list.processinstid
                    }).success(function (data) {
                        var menus = data.menus;
                        /* $scope.menus=eval('('+data.menus+')');*/
                        /*var data =menus.formId;*/
                        var formCode = menus[0].formCode;
                        var formId = menus[0].formId;
                        var hid = menus[0].hid;

                        var toUrl = serverUrl + "com.cms.formpatch.formPrintFlow.flow?actionType=P&formInstanceId=" + hid + "&formId=" + formId;

                   /*     var u = navigator.userAgent;
                        var isAndroid = u.indexOf('Android') > 1 || u.indexOf('Linux') > 1;
                        if (isAndroid){
                            navigator.app.loadUrl(toUrl, { openExternal:true });
                        }
                        else{*/

                            $state.go('auditFormDetial',{Url:JSON.stringify(toUrl),list:JSON.stringify(inf)});
                      /*  }*/
                    });
                });
            }
        }, $scope.element);
    });
    $scope.gWFStatus = {
        businessstate:{
            s10:"草稿",
            s12:"待审",
            s13:"撤回",
            s14:"驳回",
            s17:"审批通过",
            s18:"废弃"
        },
        processstate:{
            s2:"运行",
            s3:"挂起",
            s7:"完成",
            s8:"终止"
        },
        itemstate:{
            s10:"运行",
            s12:"完成",
            s13:"终止"
        },
        getStatusDesc:function(type, val){
            return $scope.gWFStatus[type]["s" + val] || "";
        }
    };
});
