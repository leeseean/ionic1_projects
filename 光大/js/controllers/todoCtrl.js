/**
 * Created by Administrator on 2016/4/27 0027.
 */
app.controller('todoCtrl',['$scope','$state','dataService','$rootScope',function($scope,$state,dataService,$rootScope){
    $scope.doRefresh =function(){
        dataService.getTodoList(function(data){
            $scope.list =data;
            $rootScope.$broadcast('scroll.refreshComplete');
        })
    };
    $scope.doRefresh();
    $scope.click =  function(item){
        $state.go('toDoDetail',{pId:item.pId,pType:item.pType,pTypeName:item.pTypeName});
    }
}]);