/**
 * Created by zjf on 2015/7/6.
 */
/*====================================沟通==============================================*/
ionicApp.controller('pgAuditAdvise4Control',function($scope,$http,$stateParams,$state,$window,showAlert,$ionicLoading,localStorageService){
    var inf3 = eval("("+$stateParams.list3+")");
    var list3realname = eval("("+$stateParams.list3realname+")");//选择沟通人传过来的数据
    var inf4=eval("("+$stateParams.list4+")");
    $scope.back =function(){
        $window.history.back();
    };

    $scope.choose = function(){
        $state.go('lookUp4',{list4:JSON.stringify(inf3)});
    };

    $scope.realName=[];

    for(var i in list3realname){
        var item2={};
        item2=list3realname[i].name;
        $scope.realName.push(item2);
    }

    var realN=$scope.realName;
    var realNstring=realN.join(",");
    $scope.realNstring=realNstring;

    $scope.delegatelist=[];
    /*   for(var x in list3realname){
     var item1={};
     item1.name=list3realname[x].name;
     item1.id=list3realname[x].id;

     $scope.delegatelist.push(item1);

     }*/

    for(var y in list3realname){
        var item3={};
        item3= {"id":list3realname[y].id,"name":list3realname[y].name,"typeCode":"person"};

        $scope.delegatelist.push(item3);

    }

    var delegatelist1=$scope.delegatelist;

    $scope.communicate=function() {
        $scope.showLoading = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner spinner-android"></ion-spinner>'
            });
        };
        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };
        $scope.showLoading();

        var advise = document.getElementById("advise").value;
        var userCode = localStorageService.get("userid");
        $http.post(serverUrl+"com.smap.wfajax.std.handle.communicateEx.biz.ext",
            {
                "advise":advise,
                "delegatelist":delegatelist1,
                "workitmeid":inf4.workitemId,
                "userCode":userCode
            }).success(function (data) {
                $http.post(serverUrl+"com.cms.formpatch.formMobile.getMobilePermission.biz.ext",{
                    "actId":inf4.workitemId,"userCode":userCode
                }).success(function(data){
                    $http.post(serverUrl+"com.cms.formpatch.formMobile.getFormMobileDetail.biz.ext",{
                        "processInstId":inf4.processinstid
                    }).success(function(data){
                        $http.post(serverUrl+"com.smap.wfajax.disp.query.queryAuditHisEx.biz.ext",{
                            "processinstid":inf4.processinstid
                        }).success(function(data){
                            $state.go('home.showTodo',{reload:true});
                            $scope.hideLoading();
                            showAlert("沟通成功");
                        })
                    })
                })
            }).error(function(data){
                $scope.hideLoading();
                showAlert('网络请求失败，请检查网络');
            })
    }
});