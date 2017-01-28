/**
 * Created by Administrator on 2016/4/27 0027.
 */
app.controller('launchCtrl',['$scope','$state',function($scope,$state){
    $scope.pTypeList =[
        {name:'费用报销',id:'1'},
        {name:'设计变更',id:'2'}
    ];
    $scope.click =function(item){
        if(item.id=='1'){
            $state.go('expenseEdit');
        }else{
            $state.go('planChangeEdit');
        }
    }
}]);