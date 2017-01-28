/**
 * Created by zjf on 2015/7/6.
 */
/*====================================沟通__查找==============================================*/

ionicApp.controller('lookUp4Control',function($scope,$http,$state,$stateParams,$window,$timeout,showAlert){

    $scope.back =function(){

        $window.history.back();
    };
    $scope.queryPeople=function(){
        var s=document.getElementById("search").value;
        if(""==s){
            showAlert("请先输入人员姓名、或者姓名关键字");
        }else {
            $scope.tagName = [];

            var ALLCOND = "";
            var page = {begin: 0, length: 3000, isCount: true};
            $http.post(serverUrl + "com.smap.wfajax.std.query.queryOperatorsWithPage.biz.ext", {
                "ALLCOND": ALLCOND,
                "page": page

            }).success(function (data) {
                $scope.operators = data.operators;
                var operators = data.operators;


                var FinancList = true;
                $scope.moreDataCanBeLoaded = function () {
                    return FinancList;
                };
                $scope.moreDataCanBeLoadedtext = function () {
                    return !FinancList
                };
                $scope.loadMore = function () {
                    $timeout(function () {
                        if (FinancList) {
                            for (var x in operators) {
                                var item = {};
                                item.realname = operators[x].realname;
                                item.orgname = operators[x].orgname;
                                item.operatorid = operators[x].operatorid;

                                $scope.tagName.push(item);


                            }

                            if ($scope.tagName.length >= 15) {
                                FinancList = false;
                            }
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    }, 1000)
                };


            })

        }
    };
    $scope.ensure=function(){
        /* var transdata2 = {list2:JSON.stringify(realnameData)};
         $state.go('pgAuditAdvise3',transdata2);*/

        /*$scope.item = true;*/
        $scope.inf3s = [] ;
        for(var i=0;i<$scope.tagName.length;i++){

           if($scope.tagName[i].checked==true){
               var item={};
               item.name=$scope.tagName[i].realname;
               item.id = $scope.tagName[i].operatorid;
              $scope.inf3s.push(item);
               var realnameData= $scope.inf3s;
              var transdata3 = {list3realname:JSON.stringify(realnameData),list4:$stateParams.list4};
              $state.go('pgAuditAdvise4',transdata3);

            }


        }



    };






});