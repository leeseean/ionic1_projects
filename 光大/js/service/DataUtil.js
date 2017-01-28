/**
 * Created by Administrator on 2016/3/9 0009.
 */
app.factory('dataUtil',function($http,$ionicLoading,$timeout){
    return{
        eosDataService:function(options){
            $ionicLoading.show({
                template: '正在拼命加载，请稍后'
            });
            options.data.userId =user.userId;
            $http({
                url:url+options.serviceUrl+'.biz.ext',
                method:"post",
                data:options.data,
                timeout:30000
            }).success(function(data){
                $ionicLoading.hide();
                //if(data.errCode=='S'){
                options.callback(data);
                //}else{
                //
                //}
            }).error(function(data){
                $ionicLoading.hide();
                $ionicLoading.show({
                    template: '网络连接失败，请检查网络'
                });
                $timeout(function(){
                    $ionicLoading.hide();
                },2000);
            })
        },
        getLocalJson:function(options){
            $ionicLoading.show({
                template: '正在拼命加载，请稍后'
            });
            $http.post(options.url)//本地json文件
                .success(function(data){
                    $ionicLoading.hide();
                    options.callback(data);
                }).error(function(data){
                    $ionicLoading.hide();
                    $ionicLoading.show({
                        template: '网络连接失败，请检查网络'
                    });
                    $timeout(function(){
                        $ionicLoading.hide();
                    },2000);
                });
        }
    }
});