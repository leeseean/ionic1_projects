/*====================================流程审批记录==============================================*/

/*var processInstId = {};*/
ionicApp.controller('auditHis3Control',function($scope,$http,$stateParams,$state,$window,$ionicPopover,$ionicGesture) {

    var id = $stateParams.id;
    $scope.hisList = [];
    $scope.back = function () {
       $state.go("home.showStartup");
        //$window.history.back();
    };
    $http.get(serverUrl + "com.smap.wfajax.disp.query.queryAuditHisEx.biz.ext?processinstid="+id).success(function (data) {
        $scope.hisList = data.auditHis;
    })
    $scope.element = angular.element(document.querySelector('#auditHis3'));
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
                    $state.go('detail3',{id:$stateParams.id});
                });
            }else if(obj.event == "swipeleft"){
                $scope.$apply(function(){
                    $state.go('auditType3',{id:$stateParams.id});
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
                count = 0;
            }
        }
        return strbak;
    };
});
