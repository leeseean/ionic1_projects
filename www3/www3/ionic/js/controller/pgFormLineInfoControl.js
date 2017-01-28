/**
 * Created by zjf on 2015/7/6.
 */
/*====================================表单行信息==============================================*/

ionicApp.controller('pgFormLineInfoControl',function($scope, $ionicModal,$http,$stateParams,$window,$state){
/*
    var sdata = JSON.stringify(data.CGSQ_L);

    console.log(sdata);
    var dataArray = [];
    dataArray = sdata.split("},");
    for (i = 0; i < 3; i++) {
        console.log(dataArray[i] + "}");
        var tag = dataArray[i].split('"');
        console.log("tagName:" + tag[15]);
        var json = [];
        json.push(tag[15]);


    }
*/
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
    console.log(JSON.stringify($scope.itemLineDataName));
    $scope.back =function(){
        $window.history.back();
    };
    $scope.goPgFormDetail=function(parent_index,index){
        $state.go('pgFormDetail',{parent_index:parent_index,index:index});
    }
});