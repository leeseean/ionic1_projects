/*====================================表单行信息==============================================*/

ionicApp.controller('pgFormDetailControl',function($scope, $ionicModal,$http,$stateParams,$window,$state,showAlert){
    $scope.parent_index = parseInt($stateParams.parent_index);
    $scope.index = parseInt($stateParams.index);
    $scope.itemLineData=eval("(" + localStorage.getItem("itemLineData") + ")");
    $scope.itemLineDataName=[];
    $scope.itemLineDataDetail = eval("(" + localStorage.getItem("itemLineDataDetail") + ")");
    $scope.itemLineDisPlayName = eval("(" + localStorage.getItem("itemLineDisPlayName") + ")");
    for(i=0;i<$scope.itemLineData.length;i++){
        var obj = {};
        var fieldName = [];
        var displayName = [];
        for(var objName in  $scope.itemLineData[i]){
            fieldName.push(objName);
            displayName.push($scope.itemLineData[i][objName].displayName);
        }
        obj.fieldName = fieldName;
        obj.displayName = displayName;
        $scope.itemLineDataName.push(obj);
    }
    $scope.back =function(){
        $window.history.back();
    };

    $scope.goNext=function(){
        if($scope.index==($scope.itemLineDataDetail[$scope.parent_index].length)-1){
         showAlert("这是最后一个了，不能再往后了");
        }else{
            $scope.index++;
        }
    }
    $scope.goBefore=function(){
        if($scope.index==0){
            showAlert("这是第一个，不能再向前了");
        }else{
            $scope.index--;
        }
    }
});