var userName="",key="",isLoaded=true;
//封装简单的提示效果
appMain.factory("simplePopUp",function($ionicPopup,$rootScope){
    var alertPopup;
    return{
        showPopup:function(msg,_fun){
            alertPopup = $ionicPopup.alert({
                title: '提示',
                template:msg
            });
            alertPopup.then(_fun);
        },
        confirmPopup:function(msg,_fun,cancelFunc){
            var confirmPopup = $ionicPopup.confirm({
                title: '',
                subTitle: msg,
                template:" ",
                buttons: [
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: _fun
                    },{ text: '取消',
                        type: 'button-stable',
                        onTap: cancelFunc
                    }
                ]
            });
            confirmPopup.then(function(res) { });
        },
        confirmDownload:function(fileName,fileSize,_fun,cancelFunc){
            if(fileSize>1024&&fileSize<1024*1024){
                fileSize = (Number(fileSize)/1024).toFixed(2)+"MB";
            }else if(fileSize>1024*1024){
                fileSize = (Number(fileSize)/(1024*1024)).toFixed(2)+"GB";
            }else{
                fileSize = fileSize+"KB";
            }

            var confirmPopup = $ionicPopup.confirm({
                title: '',
                subTitle: "是否下载附件？",
                template:"文件名："+fileName+"<br>大小："+fileSize,
                buttons: [
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: _fun
                    },{ text: '取消',
                        type: 'button-stable',
                        onTap: cancelFunc
                    }
                ]
            });
            confirmPopup.then(function(res) { });
        },
        confirmPopupShowMsg:function(title,msg,_fun,cancelFunc){
            var confirmPopup = $ionicPopup.confirm({
                title: '',
                subTitle: title,
                template:"<div class='confirm-option-div'><span class='confirm-option-span'>意见：</span>"+msg+"</div>",
                buttons: [
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: _fun
                    },{ text: '取消',
                        type: 'button-stable',
                        onTap: cancelFunc
                    }
                ]
            });
            confirmPopup.then(function(res) { });
        },
        inputPopup:function(msg,_fun,cancelFunc,placeholder){
            $rootScope.popupdata = {inputval:""};
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="popupdata.inputval" placeholder="'+placeholder+'">' +
                    '<a class="icon ion-close-circled button-stable button-small" ng-click="popupdata.inputval=\'\'"></a>',
                title: '',
                subTitle:msg,
                buttons: [
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if($rootScope.popupdata.inputval==""&&placeholder!=""){
                                e.preventDefault();
                            }else{
                                _fun($rootScope.popupdata.inputval);
                            }
                        }
                    },
                    { text: '取消',
                        type: 'button-stable',
                        onTap:cancelFunc
                    }
                ]
            });
            myPopup.then(function(res) { });
        },
        areaPopup:function(msg,val,_fun,cancelFunc,placeholder){
            $rootScope.popupdata = {areaval:val};
            var myPopup = $ionicPopup.show({
                template: '<textarea ng-model="popupdata.areaval"></textarea>',
                title: '',
                subTitle:msg,
                buttons: [
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if($rootScope.popupdata.areaval==""&&placeholder!=""){
                                e.preventDefault();
                            }else{
                                _fun($rootScope.popupdata.areaval);
                            }
                        }
                    },
                    { text: '取消',
                        type: 'button-stable',
                        onTap:cancelFunc
                    }
                ]
            });
            myPopup.then(function(res) { });
        }
    }

});

//封装重复的数据访问格式
appMain.factory("linkDatas",function($http,simplePopUp,$ionicLoading){
    return {
        getStatus:function(successFunc){
            var linkUrl = service_url + getWorkStatus_url;
            var param = {
                userCode:userName,
                workItemId:workItemId
            };
            $http.post(linkUrl,param
            ).success(
                function(data){
                    if(data.exception){
                        $ionicLoading.show({
                            duration: 1500,
                            noBackdrop: true,
                            template:"连接网络失败"

                        });
                    }else{
                        var retData={};
                        try{
                            if(data.wkstatus[0].WKSTATE==10&&data.wkstatus[0].BUSINESSSTATE==12) retData.isTodo = true;
                            else if(data.wkstatus[0].BUSINESSSTATE==14&&data.wkstatus[0].CURRENTSTATE==2) retData.isTodo = true;
                            else if(data.wkstatus[0].BUSINESSSTATE==10&&data.wkstatus[0].CURRENTSTATE==2) retData.isTodo = true;
                            else if(data.wkstatus[0].BUSINESSSTATE==13&&data.wkstatus[0].CURRENTSTATE==2) retData.isTodo = true;
                            if(successFunc){
                                successFunc(retData);
                            }
                        }catch (e){
                            simplePopUp.showPopup("数据异常！",function(){});
                        }
                    }
                }
            ).error(function(e){
                $ionicLoading.show({
                    duration: 1500,
                    noBackdrop: true,
                    template: "连接网络失败"

                });
            });
        },
        getDetail: function (successFunc) {
            $ionicLoading.show({template: 'Loading...'});
            $http.post(service_url + getMobilePermission_url,{
                    actId: workItemId,
                    userCode: userName
            }
            ).success(function(ret){
                $http.post(service_url + getDetail_url,{processInstId:processInstId}
                ).success(
                    function(data){
                        $ionicLoading.hide();
                        if(data.exception){
                            $ionicLoading.show({
                                duration: 1500,
                                noBackdrop: true,
                                template:"连接网络失败"

                            });
                        }else{
                            try{
                               data.mobileMeta = eval('(' + data.mobileMeta + ')');
                                if(successFunc){
                                    successFunc(data);
                                }
                            }catch (e){
                                $ionicLoading.hide();
                                simplePopUp.showPopup("数据异常！",function(){});
                            }
                        }
                    }
                ).error(function(e){
                    $ionicLoading.show({
                        duration: 1500,
                        noBackdrop: true,
                        template: "连接网络失败"

                    });
                });
            }).error(function(e){
                $ionicLoading.show({
                    duration: 1500,
                    noBackdrop: true,
                    template: "连接网络失败"

                });
            });
        },
        linkAndLoading: function (url,param,successFunc,errorFunc) {
            $ionicLoading.show({template: 'Loading...'});
            $http.post(url,param
            ).success(
                function(data){
                    $ionicLoading.hide();
                    if(data.exception||data.ret==""){
                        $ionicLoading.show({
                            duration: 1500,
                            noBackdrop: true,
                            template:"服务器异常"

                        });
                        if(errorFunc){
                            errorFunc("服务器异常");
                        }
                    }else{
                        var ret = eval("("+data.ret+")");
                        if(ret.errorCode=="0"){
                            if(successFunc){
                                successFunc(ret);
                            }
                        }else{
                            $ionicLoading.show({
                                duration: 1500,
                                noBackdrop: true,
                                template:ret.errorContent

                            });
                            if(errorFunc){
                                errorFunc(ret.errorContent);
                            }
                        }
                    }


                }
            ).error(function(e){
                    $ionicLoading.show({
                        duration: 1500,
                        noBackdrop: true,
                        template: "连接网络失败"

                    });
                    if(errorFunc){
                        errorFunc("连接网络失败");
                    }
            });
        },
        linkNoLoading: function (url,param,successFunc,errorFunc) {
            $http.post(url,param
            ).success(
                function(data){
                    if(data.exception||data.ret==""){
                        $ionicLoading.show({
                            duration: 1500,
                            noBackdrop: true,
                            template:"服务器异常"

                        });
                        if(errorFunc){
                            errorFunc("服务器异常");
                        }
                    }else {
                        var ret = eval("("+data.ret+")");
                        if(ret.errorCode=="0"){
                            if(successFunc){
                                successFunc(ret);
                            }
                        }else{
                            $ionicLoading.show({
                                duration: 1500,
                                noBackdrop: true,
                                template:ret.errorContent

                            });
                            if(errorFunc){
                                errorFunc(ret.errorContent);
                            }
                        }
                    }
                }
            ).error(function(e){
                    $ionicLoading.show({
                        duration: 1500,
                        noBackdrop: true,
                        template: "连接网络失败"

                    });
                    if(errorFunc){
                        errorFunc("连接网络失败");
                    }
                });
        }
    }
});

appMain.factory("approvalFactory",function(linkDatas,$ionicLoading,$http){
    return{
        PwdAndApprove:function(auditFlag, auditPwd, documentId,content,affPara,_fun){
            var param = {
                userName: userName,
                url: service_url,
                key: key,
                auditFlag:auditFlag,
                documentId: documentId,
                auditPwd: auditPwd,
                content:encodeURI(content),
                affPara:affPara,
                type:1
            };
            var linkUrl = vivo_url + PwdAndApprove_url;
            linkDatas.linkAndLoading(linkUrl, param, function (ret) {
                _fun();
            }, function () {
            });
        },
        PwdValidationApprove: function (auditFlag, auditPwd, documentId,_fun) {
            $ionicLoading.show({template: 'Loading...'});
            var param = {
                userName: userName,
                url: service_url,
                key: key,
                documentId: documentId,
                auditPwd: auditPwd
            };
            var linkUrl = vivo_url + PwdValidationApprove_url;
            linkDatas.linkNoLoading(linkUrl, param, function (ret) {
                $ionicLoading.show({
                    duration: 1500,
                    noBackdrop: true,
                    template: "审批成功"

                });
                if (_fun) {
                    setTimeout(_fun,1500);
                    //_fun();
                }
            }, function () {
            });
        },
        Approval: function (auditFlag, documentId,content,affPara,_fun) {
            $ionicLoading.show({template: 'Loading...'});
            /*var test2= encodeURIComponent("测试123");
            var test = JSON.stringify([{"FName":"hidVontainer1","FValue":test2}]);*/
            var param = {
                userName: userName,
                url: service_url,
                key: key,
                auditFlag: auditFlag,
                documentId: documentId,
                content:encodeURI(content),
                affPara:affPara,
                type:1
            };
            var linkUrl = vivo_url + ApprovalOpinion_url;
            linkDatas.linkNoLoading(linkUrl, param, function (ret) {
                $ionicLoading.show({
                    duration: 1500,
                    noBackdrop: true,
                    template: "审批成功"

                });
                if (_fun) {
                    setTimeout(_fun,1500);
                    //_fun();
                }
            }, function () {

            });
        },
        ToDispatch: function (documentId,toUserName,_fun) {
            $ionicLoading.show({template: 'Loading...'});
            var param = {
                userName: userName,
                url: service_url,
                key: key,
                documentId: documentId,
                toUserName:toUserName
            };
            var linkUrl = vivo_url + ToDispatch_url;
            linkDatas.linkNoLoading(linkUrl, param, function (ret) {
                $ionicLoading.show({
                    duration: 1500,
                    noBackdrop: true,
                    template: "重派成功"

                });
                if (_fun) {
                    setTimeout(_fun,1500);
                    //_fun();
                }
            }, function () {

            });
        },
        EditApprovaler: function (documentId,approvaler,controlID,_fun) {
            var param = {
                userName: userName,
                key: key,
                documentId: documentId,
                approvaler: approvaler,
                controlID:controlID
            };
            var linkUrl = vivo_url + EditApprovaler_url;
            linkDatas.linkAndLoading(linkUrl, param, function (ret) {
                if (_fun) {
                    _fun();
                }
            }, function () {

            });
        },
        queryDept: function (pageIndex,pageCount,departName,_fun,errorFunc) {
            var param = {
                pageIndex: pageIndex,
                pageCount: pageCount,
                departName: departName
            };
            var linkUrl = vivo_url + queryDept_url;
            $http.post(linkUrl,param
            ).success(
                function(data){
                    if(data.exception||data.ret==""){
                        errorFunc("服务器异常");
                    }else {
                        try{
                            var ret = eval("("+data.ret+")");
                            _fun(ret);
                        }catch (e){
                            errorFunc(data.ret);
                        }

                    }
                }
            ).error(function(e){
                errorFunc("连接网络失败");
            });
        }
    }
});


appMain.config(function($stateProvider, $urlRouterProvider) {
    document.title="流程详细";
    $stateProvider
        .state('detail', {
            url: '/detail',
            cache: false,
            templateUrl: sshFileUrl+"pages/detail.html?r=" + t,
            controller: "detailCtrl"
        });
    $urlRouterProvider.otherwise('/detail');
});

angular.element(document).ready(function() {
    var ele=document.getElementsByTagName("html")[0],
        size=document.body.clientWidth/320*16;
    ele.style.fontSize=size+"px";
    //获取用户，启动app
    getUserInfor(function(){
        try {
            angular.bootstrap(document, ['app']);
        } catch (e) {
            console.log(e);
        }
    });
});

