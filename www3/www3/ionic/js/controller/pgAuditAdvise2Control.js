/**
 * Created by zjf on 2015/7/6.
 */
/*====================================驳回==============================================*/
ionicApp.controller('pgAuditAdvise2Control',function($scope,$http,$stateParams,$state,$window,showAlert,$ionicLoading,localStorageService){
    var inf = eval("("+$stateParams.list+")");
    var list2activity=eval("("+$stateParams.list2activity+")");
    var list4=eval("("+$stateParams.list4+")");

    var rollbackstrategy;
    $scope.back =function(){
        $window.history.back();
    };
    $scope.choose = function(){
        $state.go('lookUp2',{list2:JSON.stringify(inf)});
    };

    $scope.activityinstnameData=[];
    for(var i in list2activity){
        var item2={};
        item2=list2activity[i].activityinstname;
        $scope.activityinstnameData.push(item2);
    }

    var activityinstNData=$scope.activityinstnameData;
    var activityinstNDataString=activityinstNData.join(",");
    $scope.activityinstNDataString=activityinstNDataString;

    var mySelect=document.getElementById("select");
    var index=mySelect.selectedIndex;
    var myselectValue=mySelect.options[index].value;
    if(myselectValue==1){
         rollbackstrategy="1";

    }else{
         rollbackstrategy="2";
    }
    var userCode = localStorageService.get("userid");
    $scope.reject=function() {
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
        $http.post(serverUrl+"com.smap.wfajax.std.handle.rejectEx2.biz.ext",{

            "currentactinstid": list4.activityinstid,
            "destactdefid": list2activity[0].activitydefid,
            "destactdefname": list2activity[0].activityinstname,
            "opiontext":opiontext,
            "processinstid": list4.processinstid,
            "rollbackstrategy": rollbackstrategy,
            "workitemid": list4.workitemId,
            "userCode": userCode
        }).success(function (data) {
            $http.post(serverUrl+"com.cms.formpatch.formMobile.getMobilePermission.biz.ext",{
                "actId":list4.workitemId,"userCode":userCode
            }).success(function(data){
                $http.post(serverUrl+"com.cms.formpatch.formMobile.getFormMobileDetail.biz.ext",{
                    "processInstId":list4.processinstid
                }).success(function(data){
                    $http.post(serverUrl+"com.smap.wfajax.disp.query.queryAuditHisEx.biz.ext",{
                        "processinstid":list4.processinstid
                    }).success(function(data){
                        $state.go('home.showTodo',{reload:true});
                        $scope.hideLoading();
                        showAlert("驳回成功");
                    })
                })
            }).error(function(data){
                $scope.hideLoading();
                showAlert('网络请求失败，请检查网络');
            })
        })
    }
});
