/**
 * Created by Administrator on 2016/3/11 0011.
 */
app.factory('util',['$ionicLoading','$timeout',function($ionicLoading,$timeout){
    return{
        showLoading:function(msg){
            $ionicLoading.show({
                template: msg
            });
            $timeout(function(){
                $ionicLoading.hide();
            },2000);
        }
    }
}]);