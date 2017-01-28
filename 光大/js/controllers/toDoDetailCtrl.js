/**
 * Created by Administrator on 2016/4/27 0027.
 */
app.controller('todoDetailCtrl',["$scope","$state","$ionicHistory","$stateParams","dataService",'$ionicPopup','util',function($scope,$state,$ionicHistory,$stateParams,dataService,$ionicPopup,util){
    $scope.pId =$stateParams.pId;
    $scope.pType =$stateParams.pType;
    $scope.pTypeName =$stateParams.pTypeName;
    $scope.viewForm =true;//当前tab是否在查看表单,true:查看表单,false:查看进度
    $scope.temlateUrl ='';
    $scope.showDetailFlag =false;//是否显示详细
    $scope.signButtonFlag =false;//是否显示签字按钮
    dataService.getDetailInfo($scope.pId,function(data){
        $scope.data =data;
    });
    dataService.getExamineList($scope.pId,function(data){
       $scope.data2 =data;
    });
    $scope.toggleDetail =function(){
        $scope.showDetailFlag =!$scope.showDetailFlag;
    };
    $scope.switchTemplateUrl = function(){
        if($scope.viewForm){
            switch ($scope.pType){
                case'expense':{
                    $scope.templateUrl ='templates/expense.html'
                }break;
                case'planChange':{
                    $scope.templateUrl ='templates/planChange.html'
                }break;
                default :break;
            }
            $scope.titleName =$scope.pTypeName;
            $scope.signButtonFlag =true;
        }else{
            $scope.templateUrl ='templates/detail_process.html';
            $scope.signButtonFlag =false;
        }
    };
    $scope.switchTemplateUrl();
    $scope.toggleView =function(flag){
        //if(flag){
        //    $scope.viewForm=flag;
        //}else{
        //    $scope.viewForm=flag;
        //    $scope.templateUrl ='templates/detail_process.html';
        //}
        $scope.viewForm =flag;
        $scope.switchTemplateUrl();
    };
    $scope.addRemark =function(){
        $scope.commentPopUp = $ionicPopup.show({
            template: '<textarea type="text" style="height: 150px" ng-model="data.comments"></textarea>',
            title: '请输入意见',
            //subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                { text: '取消' },
                {
                    text: '<b>保存</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if ($scope.data.comment=='') {
                            e.preventDefault();
                        } else {
                            $scope.data.comment='';
                            util.showLoading('提交成功');
                            $scope.back()
                        }
                    }
                },
            ]
        });
        $scope.commentPopUp.then(function(res) {
        });
    };
    $scope.back = function(){
        $ionicHistory.goBack();
    };
    /*返回键广播*/
    $scope.$on('backButton',function(event,data){
        $scope.back();
    });
}]);