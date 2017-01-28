/**
 * Created by zjf on 2015/7/6.
 */
/*====================================审批功能==============================================*/

var processinstInfo={};

ionicApp.controller('pgAuditAdviseControl',function($scope,$http,$stateParams,$window,$state,showAlert,$ionicLoading,localStorageService){
    var inf = eval("("+$stateParams.list+")");
    $scope.back =function(){
        $window.history.back();
    };
    var userCode = localStorageService.get("userid");
    $scope.approval=function() {
        $scope.showLoading = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner spinner-android"></ion-spinner>'
            });
        };
        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };
        $scope.showLoading();
        var opiontext = document.getElementById("opiontext").value;
        $http.post(serverUrl+"com.smap.wfajax.std.handle.approveEx2.biz.ext",{"processinstInfo":{

            "activityinstid":inf.activityinstid,
            "opiniontext":opiontext,
            "workitemId":inf.workitemId,
            "userCode":userCode
        }}).success(function (data) {

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
                        $scope.hideLoading();
                        showAlert("审批成功");

                    })
                })
            })

        }).error(function(data){
            $scope.hideLoading();
            showAlert('网络请求失败，请检查网络');
        })
    }
});