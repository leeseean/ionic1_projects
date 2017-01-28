/**
 * Created by zjf on 2015/7/6.
 */
/*====================================流程详细==============================================*/

/*var processInstId = {};*/
ionicApp.controller('detailControl',function($scope,$http,$stateParams,$state,$window,$ionicPopover,$ionicGesture,$ionicLoading,showAlert,localStorageService) {


    var inf = eval("(" + $stateParams.list + ")");
    var list = {activityinstid: inf.activityinstid, workitemId: inf.workitemId, processinstid: inf.id};
    var list3 = {workitemId: inf.workitemId, processinstid: inf.id};
    $scope.isTodo = false;
    $scope.back = function () {
        $state.go('home.showTodo');
        //$window.history.back();
    };

    var userCode = localStorageService.get("userid");
    $http.get(serverUrl + "com.cms.formpatch.formMobile.queryWorkStatus.biz.ext?workItemId="+inf.workitemId+"&userCode="+userCode).success(function(data){
        if(data.wkstatus[0].WKSTATE==10&&data.wkstatus[0].BUSINESSSTATE==12) $scope.isTodo = true;
        else if(data.wkstatus[0].BUSINESSSTATE==14&&data.wkstatus[0].CURRENTSTATE==2) $scope.isTodo = true;
        else if(data.wkstatus[0].BUSINESSSTATE==10&&data.wkstatus[0].CURRENTSTATE==2) $scope.isTodo = true;
        else if(data.wkstatus[0].BUSINESSSTATE==13&&data.wkstatus[0].CURRENTSTATE==2) $scope.isTodo = true;
        localStorage.setItem("isTodo",$scope.isTodo);
    });
    $http.post(serverUrl + "com.cms.formpatch.formMobile.getMobilePermission.biz.ext", {
        "actId": list.workitemId,"userCode":userCode
    }).success(function (data) {
        $http.post(serverUrl + "com.cms.formpatch.formMobile.getFormMobileDetail.biz.ext", {

            "processInstId": inf.id
        }).success(function (data) {
            $scope.data = data.data;
            $scope.mobileMeta = eval('(' + data.mobileMeta + ')');
            $scope.attachments = data.attaches;
            var data1 = $scope.mobileMeta;
            var data = $scope.data;

            var jsonValue = data;

            $scope.tagName1 = [];
            $scope.tagName1group1=[];
            $scope.itemLineData = [];
            $scope.itemLineDisPlayName = [];
            $scope.itemLineDataDetail = [];
            for(var objName in data1){
                if(objName=="group1"){
                    var jsondata1group1 = data1[objName];
                    for (var x in jsondata1group1) {
                        var item1group1 = {};
                        var itemLine = {};

                        if (!jsondata1group1[x].isLine) {

                            item1group1.name = jsondata1group1[x].displayName;
                            item1group1.value = jsonValue[x];
                            $scope.tagName1group1.push(item1group1);
                           // document.getElementById("displayButton").style.backgroundColor = "#000000";
                        } else {
                            //document.getElementById("displayButton").disabled = false;//取消禁用
                            //document.getElementById("displayButton").style.backgroundColor = "rgb(244, 176, 42)";
                            $scope.name = jsondata1group1[x].displayName;
                            $scope.itemLineData.push(jsondata1group1[x].lines);
                            $scope.itemLineDisPlayName.push(jsondata1group1[x].displayName);
                            $scope.itemLineDataDetail.push(data[x]);
                            $scope.itemLineButton=true;

                        }
                    }
                }else{
                    var jsondata1 = data1[objName];
                    for (var x in jsondata1) {
                        var item1 = {};
                        var itemLine = {};

                        if (!jsondata1[x].isLine) {

                            item1.name = jsondata1[x].displayName;
                            var description = jsonValue[x];
                            if(description!=null){
                                description = description.replace(/&nbsp;/ig,"");//去除富文本&nbsp
                                description = description.replace(/<[^>]+>/g,"");//去除富文本HTML标签
                            }
                            item1.value=description;
                            $scope.tagName1.push(item1);
                           // document.getElementById("displayButton").style.backgroundColor = "#000000";
                        } else {
                           // document.getElementById("displayButton").disabled = false;//取消禁用
                            //document.getElementById("displayButton").style.backgroundColor = "rgb(244, 176, 42)";
                            $scope.name = jsondata1[x].displayName;
                            $scope.itemLineData.push(jsondata1[x].lines);
                            $scope.itemLineDisPlayName.push(jsondata1[x].displayName);
                            $scope.itemLineDataDetail.push(data[x]);
                            $scope.itemLineButton=true;

                        }
                    }
                }
                document.getElementById("display1").style.display ="";
                document.getElementById("display2").style.display ="";
		document.getElementById("display").style.display ="";
            }

            /*===========================表单行信息================*/

            $scope.parent_index = 0;
            // $scope.index = 1;

            $scope.itemLineDataName=[];
            for(i=0;i<$scope.itemLineData.length;i++){
                var obj = {};
                var fieldName = [];
                var displayName = [];
                for(var objName in  $scope.itemLineData[i]){
                    fieldName.push(objName);
                    displayName.push($scope.itemLineData[i][objName].displayName);
                }
                obj.fieldName = fieldName;
                obj.displayName = displayName;
                $scope.itemLineDataName.push(obj);
            }

            /*=========================附件下载================*/

            
            var attachments= $scope.attachments;
                $scope.fileOut=[];
                for(var x in attachments){
                    var item = {};
		    
                    item.fileName=  x +"："+attachments[x].fileName;
                    item.filePath=attachments[x].url;
                    item.downloadUrl=serverUrl+"com.cms.formpatch.formDownLoadAttach.flow?attachId="+attachments[x].attachId;
                    $scope.fileOut.push(item);
                }

           

            $scope.downLoad=function(item){
	    var u=navigator.userAgent;
	    var isAndroid = u.indexOf('Android') > 1 || u.indexOf('Linux') > 1;
	   
	       if (!isAndroid){
 	            $state.go('formAttach',{Url:JSON.stringify(item.downloadUrl)});
        	    return;	
		}else{
		    navigator.app.loadUrl(item.downloadUrl, { openExternal:true });
		    return;		
		}
	
            }
        })
    })




    /*===========================审批意见================*/
    var listdata = {list: JSON.stringify(list)};
    var listdata3 = {list3: JSON.stringify(list3)};
    if(inf.businessState=='14'||inf.businessState=='13'){
        $scope.html = "sb";
    }else{
        $scope.html = "sp";
    }
    $scope.approval = function () {
        $state.go('pgAuditAdvise', listdata);
    };
    $scope.reject = function () {
        $state.go('pgAuditAdvise2', listdata);
    };
    $scope.turnTodo = function () {
        $state.go('pgAuditAdvise3', listdata3);
    };
    $scope.communicate = function () {
        $state.go('pgAuditAdvise4', listdata3);
    };

    /*===========================提交================*/
    $scope.Submit=function() {
        $scope.showLoading = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner spinner-android"></ion-spinner>'
            });
        };
        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };
        $scope.showLoading();
       // var opiontext = document.getElementById("opiontext").value;
        $http.post(serverUrl+"com.smap.wfajax.std.handle.approveEx2.biz.ext",{"processinstInfo":{

            "activityinstid":inf.activityinstid,
            "opiniontext":"提交",
            "workitemId":inf.workitemId,
            "userCode":userCode
        }}).success(function (data) {

            $http.post(serverUrl+"com.cms.formpatch.formMobile.getMobilePermission.biz.ext",{
                "actId":inf.workitemId,"userCode":userCode
            }).success(function(data){
                $http.post(serverUrl+"com.cms.formpatch.formMobile.getFormMobileDetail.biz.ext",{
                    "processInstId":inf.processinstid
                }).success(function(data){
                    $http.post(serverUrl+"com.smap.wfajax.disp.query.queryAuditHisEx.biz.ext",{
                        "processinstid":inf.processinstid
                    }).success(function(data){
                        $state.go('home.showTodo',{reload:true});
                        $scope.hideLoading();
                        showAlert("提交成功");

                    })
                })
            })

        }).error(function(data){
            $scope.hideLoading();
            showAlert('网络请求失败，请检查网络');
        })
    }

    /*===========================表单详细信息================*/

    $scope.clickTask = function () {
        $scope.showLoading = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner spinner-android"></ion-spinner>'
            });
        };
        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };
        $scope.showLoading();
        $http.post(serverUrl + "com.cms.formpatch.formMobile.queryFormWFInst.biz.ext", {
            "processInstId": list.processinstid
        }).success(function (data) {
            $scope.hideLoading();
            var menus = data.menus;
            /* $scope.menus=eval('('+data.menus+')');*/
            /*var data =menus.formId;*/
            var formCode = menus[0].formCode;
            var formId = menus[0].formId;
            var hid = menus[0].hid;

            var toUrl = serverUrl + "com.cms.formpatch.formPrintFlow.flow?actionType=P&formInstanceId=" + hid + "&formId=" + formId;


      /*    var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > 1 || u.indexOf('Linux') > 1;
            if (!isWX()&&isAndroid){
                navigator.app.loadUrl(toUrl, { openExternal:true });
            }
            else{*/
                $state.go('formDetialIos',{Url:JSON.stringify(toUrl)});
            /*}*/
        });
    };

    $scope.element = angular.element(document.querySelector('#detail'));
    $scope.events = [{
        event: 'swipeup'
    }, {
        event: 'swipedown'
    }, {
        event: 'swipeleft'
    }, {
        event: 'swiperight'
    }];
    angular.forEach($scope.events, function (obj) {
        $ionicGesture.on(obj.event, function () {
            if(obj.event == "swipeleft"){
                $scope.$apply(function(){
                    $state.go('auditHis',{list:JSON.stringify(inf)});
                });
            }
        }, $scope.element);
    });
});
