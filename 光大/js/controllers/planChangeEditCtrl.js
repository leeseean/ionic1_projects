/**
 * Created by Administrator on 2016/4/27 0027.
 */
app.controller('planChangeEditCtrl',['$scope','$ionicHistory',"dataService",'$ionicPopup','util','$timeout',function($scope,$ionicHistory,dataService,$ionicPopup,util,$timeout){
    $scope.tabs =[
        {name:'基本信息',active:true,templateUrl:'templates/planChangeEdit_1.html'}
        ,{name:'合同明细',active:false,templateUrl:'templates/planChangeEdit_2.html'}
        ,{name:'转扣明细',active:false,templateUrl:'templates/planChangeEdit_3.html'}];
    $scope.lastTab =null;
    $scope.submitData={};//提交数据
    $scope.changeTab =function(index){
        if($scope.lastTab!=null){
            $scope.tabs[$scope.lastTab].active =false;
        }
        $scope.lastTab =index;
        $scope.tabs[index].active =true;
        $scope.template =$scope.tabs[index].templateUrl;
    };
    $scope.changeTab(0);
    dataService.getDeptList(function(data){
        $scope.deptList =data;
    });
    dataService.getCreateByList(function(data){
       $scope.createByList =data;
    });
    dataService.getProjectList(function(data){
        $scope.projectList =data;
    });
    dataService.getChangeCodeList(function(data){
        $scope.changeCodeList =data;
    });
/*数据获取---部门*/
    /*变更编码*/
    $scope.popChangeCodeList =function(){
        var data =$scope.changeCodeList;
        var token ='<div class="list">';
        for(i=0;i<$scope.changeCodeList.length;i++){
            token+='<li class="item" ng-click="selectChangeCode('+i+')">'+data[i].name+'</li>';
        }
        token+="</div>";
        $scope.listChangeCode =$ionicPopup.show({
            title:'请选择',
            template:token,
            scope:$scope,
            buttons:[{
                text:'取消'
            }]
        })
    };
    $scope.selectChangeCode =function(i){
        $scope.submitData.changeCode =$scope.changeCodeList[i].name;
        $scope.submitData.changeCodeId=$scope.changeCodeList[i].id;
        $scope.listChangeCode.close();
    };
    /*变更编码end*/
    /*选择创建人*/
    $scope.popCreateByList =function(){
        var data =$scope.createByList;
        var token ='<div class="list">';
        for(i=0;i<$scope.createByList.length;i++){
            token+='<li class="item" ng-click="selectCreateBy('+i+')">'+data[i].name+'</li>';
        }
        token+="</div>";
        $scope.listCreateBy =$ionicPopup.show({
            title:'请选择',
            template:token,
            scope:$scope,
            buttons:[{
                text:'取消'
            }]
        })
    };
    $scope.selectCreateBy =function(i){
        $scope.submitData.createBy =$scope.createByList[i].name;
        $scope.submitData.createById=$scope.createByList[i].id;
        $scope.listCreateBy.close();
    };
    /*选择创建人end*/
    /*选择项目*/
    $scope.popProjectList =function(){
        var data =$scope.projectList;
        var token ='<div class="list">';
        for(i=0;i<$scope.projectList.length;i++){
            token+='<li class="item" ng-click="selectProject('+i+')">'+data[i].name+'</li>';
        }
        token+="</div>";
        $scope.listProject =$ionicPopup.show({
            title:'请选择',
            template:token,
            scope:$scope,
            buttons:[{
                text:'取消'
            }]
        })
    };
    $scope.selectProject =function(i){
        $scope.submitData.projectName =$scope.projectList[i].name;
        $scope.submitData.projectId=$scope.projectList[i].id;
        $scope.listProject.close();
    };
    /*选择项目end*/
    /*选择部门*/
    $scope.popDeptList =function(){
        var data =$scope.deptList;
        var token ='<div class="list">';
        for(i=0;i<$scope.deptList.length;i++){
            token+='<li class="item" ng-click="selectDept('+i+')">'+data[i].name+'</li>';
        }
        token+="</div>";
        $scope.listDept =$ionicPopup.show({
            title:'请选择',
            template:token,
            scope:$scope,
            buttons:[{
                text:'取消'
            }]
        })
    };
    $scope.selectDept =function(i){
        $scope.submitData.deptName =$scope.deptList[i].name;
        $scope.submitData.deptId =$scope.deptList[i].id;
        $scope.submitData.onChargeDept ='';
        $scope.submitData.onChargeDeptId='';
        $scope.submitData.manager ='';
        $scope.submitData.managerId='';
        dataService.getManagerList(function(data){
            $scope.managerList =data;
        },$scope.submitData.deptId);
        dataService.getOnChargeList(function(data){
            $scope.onChargeDeptList =data;
        },$scope.submitData.deptId);
        $scope.listDept.close();
    };
    /*部门end*/
    /*负责人*/
    $scope.popOnChargeDeptList =function(){
        if(!$scope.submitData.deptId){
            util.showLoading('请先选择部门');
            return;
        }
        var data =$scope.onChargeDeptList;
        var token ='<div class="list">';
        for(i=0;i<$scope.onChargeDeptList.length;i++){
            token+='<li class="item" ng-click="selectOnChargeDept('+i+')">'+data[i].name+'</li>';
        }
        token+="</div>";
        $scope.listOnChargeDept =$ionicPopup.show({
            title:'请选择',
            template:token,
            scope:$scope,
            buttons:[{
                text:'取消'
            }]
        })
    };
    $scope.selectOnChargeDept =function(i){
        $scope.submitData.onChargeDept =$scope.onChargeDeptList[i].name;
        $scope.submitData.onChargeDeptId=$scope.onChargeDeptList[i].id;
        $scope.listOnChargeDept.close();
    };
    /*负责人end*/
    /*直属上司*/
    $scope.popManagerList =function(){
        if(!$scope.submitData.deptId){
            util.showLoading('请先选择部门');
            return;
        }
        var data =$scope.managerList;
        var token ='<div class="list">';
        for(i=0;i<$scope.managerList.length;i++){
            token+='<li class="item" ng-click="selectManager('+i+')">'+data[i].name+'</li>';
        }
        token+="</div>";
        $scope.listManager =$ionicPopup.show({
            title:'请选择',
            template:token,
            scope:$scope,
            buttons:[{
                text:'取消'
            }]
        })
    };
    $scope.selectManager =function(i){
        $scope.submitData.manager =$scope.managerList[i].name;
        $scope.submitData.managerId=$scope.managerList[i].id;
        $scope.listManager.close();
    };
    /*直属上司end*/
    /*数据获取部门end*/
    /*选择时间*/
        $scope.selectTime =function(){
            cordova.exec(
                function(data){
                    $timeout(function(){
                        $scope.submitData.createDate =moment(data).format('YYYY-MM-DD');
                    },50)

                },
                function(data){
                    alert(data);
                },
                "SelectTime",
                "selectDate",
                []
            );

        };
    $scope.submit =function(){
        $scope.submitData={};
        util.showLoading('提交成功');
        $scope.back()
    };

    $scope.back = function(){
        $ionicHistory.goBack();
    };
    /*返回事件广播*/
    $scope.$on('backButton',function(event,data){
        $scope.back();
    });
}]);