/**
 * Created by Boyz.X on 2015/7/23.
 */
ionicApp.controller('listChooseMoreCtrl',function($scope,$http,$stateParams,$state){
    var SOURCE_LIST_ID = eval("("+$stateParams.ListID+")");
    $scope.tagName = [];
    var Multiselect ="";
    $http.post(serverUrl+"com.cms.formpatch.instance.queryComboFieldSource.biz.ext",
        {selectId:SOURCE_LIST_ID})
        .success(function(selectlist){
                for(var i=0 ; i<selectlist.src.length ; i++){
                    $scope.tagName.push(selectlist.src[i]);
                    $scope.tagName[i].isCheck = false;
                }
        });
    $scope.save = function(){
        for(var i=0 ; i<$scope.tagName.length ; i++){
            if($scope.tagName[i].isCheck == true){
                Multiselect = $scope.tagName[i].VALUENAME + "," + Multiselect;
            }
        }
        $state.go('formdetial',{fieldName:$stateParams.fieldName,Multiselect:JSON.stringify(Multiselect),MENULABEL:$stateParams.title,instance:$stateParams.instance,FIELD_NAME:$stateParams.FIELD_NAME})
    }
});