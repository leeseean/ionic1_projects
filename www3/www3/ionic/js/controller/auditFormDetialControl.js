/*====================================流程审批记录==============================================*/

/*var processInstId = {};*/
ionicApp.controller('auditFormDetialControl',function($scope,$http,$stateParams,$state,$window,$ionicPopover,$ionicGesture,$sce) {
    var inf = eval("(" + $stateParams.list + ")");
    var list = {activityinstid: inf.activityinstid, workitemId: inf.workitemId, processinstid: inf.id};
    var list3 = {workitemId: inf.workitemId, processinstid: inf.id};
    $scope.isTodo = localStorage.getItem("isTodo")==="true";
    $scope.back = function () {
      //  $state.go("home");
        $state.go('auditType',{list:JSON.stringify(inf)});
    };
    var toUrl=eval('('+$stateParams.Url+')');
    $scope.targetUrl = $sce.trustAsResourceUrl(toUrl);
    $scope.element = angular.element(document.querySelector('#auditFormDetial'));
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
