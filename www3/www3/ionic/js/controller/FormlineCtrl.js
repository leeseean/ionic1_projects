/**
 * Created by Boyz.X on 2015/7/10.
 */
ionicApp.controller('formlineCtrl',function($scope,$http,$state,$stateParams,$window){
    $scope.ID = eval("("+$stateParams.datalist+")");
/*    var lineinput = eval("("+$stateParams.list+")");*/
    var savedata = eval("("+$stateParams.savedata+")");
    var state = $stateParams.state;
    //var savedata = eval("("+$stateParams.choosen+")");
    console.log("savedata="+JSON.stringify(savedata));
    $scope.inputdata = [];
    $scope.setData = function(list1,name){
        console.log(JSON.stringify(list1)+",name="+name);
        if(list1==null) return null;
        var list2 = [];
        for(i=0;i<list1.length;i++) for(j=0;j<list1[i].length;j++) if(list1[i][j].FIELD_DESC==""&&list1[i][j].VALUE==""&&list1[i][j].FIELD_NAME==name) list2.push(list1[i]);
        return list2;
    };
    if(state=="2") {
        $scope.inputdata = $scope.setData(savedata,$stateParams.fieldName)||[];
        $scope.data=[];

        $scope.data=$scope.ID;


    }else if(state=="1"){
        $scope.inputdata = $scope.setData(savedata,$stateParams.fieldName)||[];
        $scope.data=[];
        $http.post(serverUrl+"com.cms.formpatch.formMobile.getFormLineDataByLineId.biz.ext",
            {formLineId:$scope.ID})
            .success(function(data){
                for(var i = 0; i < data.formLineHead.length;i++){
                    $scope.data.push(data.formLineHead[i]);
                }
            });
    }

    $scope.creat = function(){
        $stateParams.backupDisplay=null; //在formline点击增加进入formlineinput,将列表数据设置为空
        $state.go('formlineinput',{fieldName:$stateParams.fieldName,datalist:JSON.stringify($scope.data),savedata:JSON.stringify(savedata),title:$stateParams.title,backupgroup:$stateParams.backupgroup,instance:$stateParams.instance,formData:$stateParams.formData,backupDefault:$stateParams.backupDefault,backupDisplay:$stateParams.backupDisplay})
    };
    $scope.save = function(){
        $state.go('formdetial',{savedata:JSON.stringify(savedata),MENULABEL:$stateParams.title,backupDisplay:$stateParams.backupDisplay,backupgroup:$stateParams.backupgroup,instance:$stateParams.instance,formData:$stateParams.formData,backupDefault:$stateParams.backupDefault})
    };
    $scope.back = function(){
        $window.history.back();
    };

});