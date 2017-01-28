/*====================================流程属性==============================================*/

/*var processInstId = {};*/
ionicApp.controller('auditType3Control',function($scope,$http,$stateParams,$state,$window,$ionicPopover,$ionicGesture) {

    var id = $stateParams.id;
    $scope.back = function () {
        $state.go("home.showStartup");
        //$window.history.back();
    };
    $scope.data=eval("(" + localStorage.getItem("audit") + ")");
    $scope.element = angular.element(document.querySelector('#auditType3'));
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
                    $state.go('auditHis3',{id:$stateParams.id});
                });
            }
            else if(obj.event == "swipeleft"){ //注释表单详细页面
                $scope.$apply(function(){

                    $http.post(serverUrl+"com.cms.formpatch.formMobile.queryFormWFInst.biz.ext", {
                        "processInstId": $stateParams.id
                    }).success(function(data){
                        var menus = data.menus;
                        /* $scope.menus=eval('('+data.menus+')');
                        var data =menus.formId;*/
                        var formCode = menus[0].formCode;
                        var formId = menus[0].formId;
                        var hid = menus[0].hid;

                        var toUrl = serverUrl+"com.cms.formpatch.formPrintFlow.flow?actionType=P&formInstanceId="+hid+"&formId="+formId;

                       /* var u = navigator.userAgent;
                        var isAndroid = u.indexOf('Android') > 1 || u.indexOf('Linux') > 1;
                        if (isAndroid){
                            navigator.app.loadUrl(toUrl, { openExternal:true });
                        }
                        else{*/
                            $state.go('auditFormDetial3',{Url:JSON.stringify(toUrl),id:$stateParams.id});
                       // }
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
