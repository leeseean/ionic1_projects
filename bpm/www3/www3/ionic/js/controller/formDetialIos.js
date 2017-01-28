ionicApp.controller('formDetialIosCtrl',function($scope,$stateParams,$sce,$window,$ionicLoading){
    $scope.back =function(){
         $window.history.back();
    };
    $scope.showLoading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android" class="spinner spinner-android"></ion-spinner>'
        });
    };
    $scope.hideLoading = function(){
        $ionicLoading.hide();
    };
    $scope.showLoading();

    var toUrl=eval('('+$stateParams.Url+')');
    $scope.targetUrl = $sce.trustAsResourceUrl(toUrl);
    $scope.hideLoading();
});