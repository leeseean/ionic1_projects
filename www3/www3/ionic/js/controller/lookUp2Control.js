/**
 * Created by zjf on 2015/7/6.
 */
/*====================================驳回__查找==============================================*/


ionicApp.controller('lookUp2Control',function($scope,$http,$state,$stateParams,$window){
    var inf2=eval("("+$stateParams.list2+")");

    $scope.back =function(){

        $window.history.back();
    };

    $scope.tagName=[];


        $http.post(serverUrl+"com.smap.wfajax.std.query.queryBackActivities.biz.ext",{

            "processinstid":inf2.processinstid

        }).success(function (data) {
            /*$scope.resultList=data.resultList;*/
           /*   $scope.resultList=eval('('+resultList+')');*/

            var resultList = data.resultList;

            for(var x in resultList){
                var item={};
                item.activityinstname=resultList[x].activityinstname;
                item.activitydefid=resultList[x].activitydefid;

                $scope.tagName.push(item);
            }

        })
  /*  $scope.queryPoint=function(){
    };*/
    $scope.ensure=function(){

        $scope.inf2s = [] ;
        for(var i=0;i<$scope.tagName.length;i++){

           if($scope.tagName[i].checked==true){
               var item={};
               item.activityinstname=$scope.tagName[i].activityinstname;
               item.activitydefid=$scope.tagName[i].activitydefid;

              $scope.inf2s.push(item);
               var activityData= $scope.inf2s;

              $state.go('pgAuditAdvise2',{list2activity:JSON.stringify(activityData),list4:JSON.stringify(inf2)});

            }


        }



    };






});