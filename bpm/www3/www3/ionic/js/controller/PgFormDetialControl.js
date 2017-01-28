/**
 * Created by zjf on 2015/7/6.
 */
/*====================================流程行详细信息==============================================*/

ionicApp.controller('PgFormDetialControl',function($scope,$stateParams,$window){

   var pgFormDedtialData=eval("("+$stateParams.pgFormDedtialData+")") ;
    $scope.pgFormDedtialData=pgFormDedtialData;

    $scope.back =function(){
        $window.history.back();
    };


});