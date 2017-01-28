/**
 * Created by Administrator on 2016/4/27 0027.
 */
app.controller('expenseEditCtrl',['$scope','$ionicHistory','dataService','$ionicPopup','util',function($scope,$ionicHistory,dataService,$ionicPopup,util){
    $scope.tabs =[
            {name:'基本信息',active:true,templateUrl:'templates/expenseEdit_1.html'}
            ,{name:'报销明细',active:false,templateUrl:'templates/expenseEdit_2.html'}
            ,{name:'借款明细',active:false,templateUrl:'templates/expenseEdit_3.html'}];
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
    /*数据获取---单位列表，类别，银行Orz*/
    dataService.getCompanyList(function(data){
        $scope.companyList =data;
    });
    dataService.getBankList(function(data){
       $scope.bankList =data;
    });
    dataService.getCategoryList(function(data){
       $scope.categoryList =data;
    });
    dataService.getkindList(function(data){
       $scope.kindList =data;
    });
    /*选择单位*/
    $scope.popCompanyList =function(){
        var data =$scope.companyList;
        var token ='<div class="list">';
        for(i=0;i<$scope.companyList.length;i++){
            token+='<li class="item" ng-click="selectCompany('+i+')">'+data[i].name+'</li>';
        }
        token+="</div>";
        $scope.listCompany =$ionicPopup.show({
            title:'请选择',
            template:token,
            scope:$scope,
            buttons:[{
                text:'取消'
            }]
        })
    };
    $scope.selectCompany =function(i){
        $scope.submitData.companyName =$scope.companyList[i].name;
        $scope.submitData.companyId =$scope.companyList[i].id;
        $scope.submitData.deptName ='';
        $scope.submitData.deptId ='';
        $scope.submitData.onChargeDept ='';
        $scope.submitData.onChargeDeptId='';
        $scope.submitData.manager ='';
        $scope.submitData.managerId='';
        dataService.getDeptList(function(data){
            $scope.deptList =data;
        },$scope.submitData.companyId);
        $scope.listCompany.close();
    };
    /*选择单位end*/

    /*选择部门*/
    $scope.popDeptList =function(){
        if(!$scope.submitData.companyId){
            util.showLoading('请先选择单位');
            return;
        }
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
            util.showLoading('请先选择单位');
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
            util.showLoading('请先选择单位');
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

    /*银行*/
    $scope.popBankList =function(){
        var data =$scope.bankList;
        var token ='<div class="list">';
        for(i=0;i<$scope.bankList.length;i++){
            token+='<li class="item" ng-click="selectBank('+i+')">'+data[i].name+'</li>';
        }
        token+="</div>";
        $scope.listBank =$ionicPopup.show({
            title:'请选择',
            template:token,
            scope:$scope,
            buttons:[{
                text:'取消'
            }]
        })
    };
    $scope.selectBank =function(i){
        $scope.submitData.bank =$scope.bankList[i].name;
        $scope.submitData.bankId=$scope.bankList[i].id;
        $scope.listBank.close();
    };
    /*银行end*/

    /*类别*/
    $scope.popCategoryList =function(){
        var data =$scope.categoryList;
        var token ='<div class="list">';
        for(i=0;i<$scope.categoryList.length;i++){
            token+='<li class="item" ng-click="selectCategory('+i+')">'+data[i].name+'</li>';
        }
        token+="</div>";
        $scope.listCategory =$ionicPopup.show({
            title:'请选择',
            template:token,
            scope:$scope,
            buttons:[{
                text:'取消'
            }]
        })
    };
    $scope.selectCategory =function(i){
        $scope.submitData.category =$scope.categoryList[i].name;
        $scope.submitData.categoryId=$scope.categoryList[i].id;
        $scope.listCategory.close();
    };
    /*类别end*/
    /*类别*/
    $scope.popKindList =function(){
        var data =$scope.kindList;
        var token ='<div class="list">';
        for(i=0;i<$scope.kindList.length;i++){
            token+='<li class="item" ng-click="selectKind('+i+')">'+data[i].name+'</li>';
        }
        token+="</div>";
        $scope.listKind =$ionicPopup.show({
            title:'请选择',
            template:token,
            scope:$scope,
            buttons:[{
                text:'取消'
            }]
        })
    };
    $scope.selectKind =function(i){
        $scope.submitData.kind =$scope.kindList[i].name;
        $scope.submitData.kindId=$scope.kindList[i].id;
        $scope.listKind.close();
    };
    $scope.selectTime =function(){
        cordova.exec(
            function(data){
                $timeout(function(){
                    $scope.submitData.createTime =moment(data).format('YYYY-MM-DD HH:mm:ss');
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