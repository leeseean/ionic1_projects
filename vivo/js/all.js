/**
 * Created by GZW on 2015/8/26.
 */
//var vivo_url="http://127.0.0.1:8080/eos-default/";//本地测试
var service_url = "http://172.20.119.104:8020/BpmAppService.asmx?wsdl";//测试服务器
var vivo_file_url="http://221.4.142.106:8088/vivobpm/";
var vivo_url="https://172.20.123.109:8443/vivobpm/";//内网
//var vivo_url="https://221.4.142.106:8443/vivobpm/";//外网
var attachUrl="ftp://172.20.119.104/";

/*var service_url = "http://172.20.114.20:8020/BpmAppService.asmx?wsdl";//正式服务器
 var vivo_url="https://vchat.vivo.com.cn:8443/vivobpm/";
 var vivo_file_url="http://vchat.vivo.com.cn:8088/vivobpm/";
 var attachUrl="ftp://file.bpm.vivo.xyz/";*/

var cnNumber = ["一","二","三","四","五","六","七","八","九","十"];//中文的序号

var PwdValidationApprove_url="com.wpt.vivoHttp.webService.PwdValidationApprove.biz.ext";//审批密码验证接口
var ApprovalOpinion_url="com.wpt.vivoHttp.webService.ApprovalOpinion.biz.ext";//处理用户对流程的同意、不同意和意见审批操作
var ToDispatch_url="com.wpt.vivoHttp.webService.ToDispatch.biz.ext";//重新分派接口

var getBPMdetail_url="com.wpt.vivoHttp.webService.getBPMdetail.biz.ext";//获取详细接口(新)
var CheckDownload_url="com.wpt.vivoHttp.webService.CheckDownload.biz.ext";//检查是否可下载
var DeleteBpmFile_url="com.wpt.vivoHttp.webService.deleteBpmFile.biz.ext";//删除附件

var PwdAndApprove_url="com.wpt.vivoHttp.webService.PwdAndApprove.biz.ext";//审批密码验证接口
var EditApprovaler_url="com.wpt.vivoHttp.webService.EditApprovaler.biz.ext";//修改审批人接口
var queryDept_url="com.wpt.vivoHttp.webService.queryDept.biz.ext";//查询部门列表接口

//所有流程详情的头部
var all_selectColumn ="Header_formSubTitle;txt_FDocCurrentStatus_value;Header_CreateUserName;txt_FDocDate;txt_FDocUnit_text;txt_FDocCurrentStatus;txt_FCurrentUser;sel_FSecurityLevel;txt_FVersion";
/**
 * Created by GZW on 2015/12/21.
 */
/**
 * 获取用户信息
 * @param _fun成功的返回函数
 */
function getUserInfor(_fun){
    if (window.cordova) {
        wpt.getUsersInfo(
            function (userStr){
                var user = eval('('+userStr+')');
                userName = user.userCode;
                wpt.DataLoadOver();
                if(_fun){
                    _fun();
                }
            },
            function(){
                alert("获取用户失败");
                appexit(0);
            }
        );

    } else {
        try{
            userName = window.wpt.getUsersInfo();
        }catch (e){
            //alert("获取用户失败");
            userName = "10990620";
            //userName = "10916835";
            //userName = "10937695";

        }

        if(_fun){
            _fun();
        }
    }
}

/**
 * 选择人员
 * @param _fun成功的返回函数；_errorFunc失败返回函数
 */
function selectContacts(_fun,_errorFunc){
    if (window.cordova) {
        wpt.selectContacts(
            "com.sie.mp.activity.SelectContactsActivity",
            "true",
            {
                'requestCode':1, //回调eventCode,如是startForResult是true，则requestCode必须传入，否则不用传入
                'requestTip':'0,1,2', //显示那几个标签页，0组织、1岗位、2联系人、3群组、4公众号,默认全部
                'isCheckBox':false, //是否带CheckBox框 true带   false
                'scopePublicNO':'ALL', //公众号:ALL-查询所有公众号、SYS--系统级、MINE--我订阅的、OTHER--未订阅的
                'scopeGroup':'ALL'// MINE--只查询我所在的群 OTHER--我没有加入的群  什么都不传，或者ALL都是查询所有群
            },
            function(users){
                var usersData = eval('('+users+')');
                if(usersData.length>0){
                    _fun(usersData[0]);
                }
            }
            ,
            _errorFunc
        );
    }else{
        window['selectUserRet']=_fun;
        window.wpt.selectContacts();
    }
}
/**
 * android的选择人员后执行事件
 * @param
 */
function setSelectUser(param) {
    window['selectUserRet'](param);
}
function appexit(isApproval){
    if (window.cordova) {
        wpt.exitBPM(isApproval);
    }else{
        //isApproval : 0或空无变化，1删除行
        window.wpt.exit(isApproval);
    }
}
/**
 *打开附件
 * @param _fun成功的返回函数
 */
function openFile(url,size,_fun){
    if (window.cordova) {
        wpt.openFile(url,size,_fun,_fun);
    }else{
        window['openFileRet']=_fun;
        window.wpt.openFile(url);
        window.wpt.openFile2(url,size);
    }
}
/**
 * 安卓的选择附件后执行返回函数
 */
function setFileDone(){
    window['openFileRet']();
}
function showImg(allSrc,src){
    var currentIndex = 0;
    for(var i= 0,l=allSrc.length;i<l;i++){
        if(allSrc[i]==src){
            currentIndex = i;
            break;
        }
    }
    var param = JSON.stringify({allSrc:allSrc,currentIndex:currentIndex});
    if (window.cordova) {
        wpt.openImage(param);
    }else{
        window.wpt.openImage(param);
    }
}
/*function initImgOnClick(s){
 window.setTimeout(function(){
 var allSrc = [];
 for(var i= 0;i< s.length;i++){
 var oUl = document.getElementById(s[i]);        //加上它的上级元素，可以避免我们筛选出许多无用的节点出来
 var aLi = oUl.getElementsByTagName("img");
 for(var j = 0,k=aLi.length;j<k;j++){
 if(aLi[j].clientWidth>80||aLi[j].clientHeight>80){
 allSrc.push(aLi[j].src);
 aLi[j].onclick=function(e){
 showImg(allSrc,this.src);
 }
 }

 }
 }


 },1000);
 }*/
/**
 * 初始化富文本里面的图片点击效果，调用原生控件
 * @param s是富文本框的id数组
 */
function initImgOnClick(s){
    var ids=s;
    function clickImg(src) {
        var allSrc=[];
        for (var i = 0; i < ids.length; i++) {
            var oUl = document.getElementById(ids[i]);        //加上它的上级元素，可以避免我们筛选出许多无用的节点出来
            var aLi = oUl.getElementsByTagName("img");
            for (var j = 0, k = aLi.length; j < k; j++) {
                if(aLi[j].clientWidth>80||aLi[j].clientHeight>80){
                    allSrc.push(aLi[j].src);
                }
            }
        }
        showImg(allSrc,src);
    }
    window.setTimeout(function(){
        for(var i= 0;i< ids.length;i++){
            var oUl = document.getElementById(ids[i]);        //加上它的上级元素，可以避免我们筛选出许多无用的节点出来
            var aLi = oUl.getElementsByTagName("img");
            for(var j = 0,k=aLi.length;j<k;j++){
                aLi[j].onclick=function(e){
                    if(this.clientWidth>80||this.clientHeight>80){
                        clickImg(this.src);
                    }
                }
            }
        }
    },1000);

}

/**
 * 初始化滚动时候，滚到最上和最低的按钮
 */
function initScroll(){
    window.setTimeout(function(){
        var bheight=document.body.scrollHeight;
        var oUl = document.getElementById("bpm-detail-content");
        var oldscroll=0;
        oUl.onscroll=function(event){

            if(Math.abs(oUl.scrollTop-oldscroll)<10)return;
            if(oUl.scrollTop>oldscroll){
                //if(this.scrollTop>oldscroll){
                document.getElementById("btn-scroll-top").style.display="none";
                document.getElementById("btn-scroll-bottom").style.display="block";
            }else{
                document.getElementById("btn-scroll-top").style.display="block";
                document.getElementById("btn-scroll-bottom").style.display="none";
            }
            oldscroll = oUl.scrollTop;
            if(oUl.scrollTop==0||oUl.scrollTop+bheight+10>oUl.scrollHeight){
                document.getElementById("btn-scroll-top").style.display="none";
                document.getElementById("btn-scroll-bottom").style.display="none";
            }
        }
    },1000);
}
/**
 *  滚到顶部
 */
function scrollToTop(){
    var oUl = document.getElementById("bpm-detail-content");
    oUl.scrollTop=0;
    window.setTimeout(function(){
        document.getElementById("btn-scroll-top").style.display="none";
    });
}
/**
 *  滚到底部
 */
function scrollToBottom(){
    var oUl = document.getElementById("bpm-detail-content");
    oUl.scrollTop=oUl.scrollHeight;
    window.setTimeout(function(){
        document.getElementById("btn-scroll-bottom").style.display="none";
    });
}

var userName="",key="",isLoaded=true;
appMain.factory("bpmCommonFunc",function($ionicLoading,$state,simplePopUp,linkDatas,$http) {
    return{
        //检查附件是否能打开，能的情况，请打开
        checkDownLoad:function(fileName,newName,size,FFormInsID,FID,FFormControlID,successFunc,errorFunc){
            var self =this;
            //fileName = escape(fileName);
            if(fileName.lastIndexOf("/")>0){
                var path = fileName.substring(0,fileName.lastIndexOf("/")+1);
                var tempName = fileName.substring(fileName.lastIndexOf("/")+1);
                fileName = path+encodeURI(tempName);
            }else{
                fileName = encodeURI(tempName);
            }
            var linkUrl=vivo_url+CheckDownload_url;
            var param={
                userName:userName,
                fileName:fileName,
                newName:newName,
                FFormInsID:FFormInsID,
                FID:FID,
                FFormControlID:FFormControlID
            };
            $ionicLoading.show({template: 'Loading...'});
            $http.post(linkUrl,param
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
                        if(data.isDownLaod){
                            openFile(vivo_file_url+"bpm_attachment/"+newName,size,function(){
                                /*setTimeout(function(){
                                 self.deleteFile(newName);
                                 },3000);*/
                            });
                        }else{
                            var ret = eval("("+data.ret+")");
                            if(ret.errorCode=="0"){
                                var s = ret.Data.split(";");
                                if(s.length==2&&(s[0].indexOf("True")>=0||s[1].indexOf("True")>=0)){
                                    $ionicLoading.show({
                                        duration: 1500,
                                        noBackdrop: true,
                                        template:"服务器下载附件异常！"

                                    });
                                }else{
                                    $ionicLoading.show({
                                        duration: 1500,
                                        noBackdrop: true,
                                        template:"当前用户没有权限查看该附件！"

                                    });
                                }
                                /**/
                            }else{
                                $ionicLoading.show({
                                    duration: 1500,
                                    noBackdrop: true,
                                    template:ret.errorContent

                                });
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
        deleteFile:function(fileName){
            var linkUrl = vivo_url + DeleteBpmFile_url;
            var param = {fileName: fileName};
            $http.post(linkUrl, param);
        }
    }
});
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
//获取几天后的日期
appMain.factory("dateService",function(){
    return{
        GetDateStr :function (AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth()+1;//获取当前月份的日期
            var d = dd.getDate();
            return y+"-"+(m>9?m:"0"+m)+"-"+(d>9?d:"0"+d);
        }
    }
});
//封装重复的数据访问格式
appMain.factory("linkDatas",function($http,simplePopUp,$ionicLoading){
    return {
        getKeyAndForm: function (param,successFunc,errorFunc) {
            var linkUrl = vivo_url + getBPMdetail_url;
            //param.url=service_url;
            param.userName=userName;
            param.documentId=hrefdocumentId;
            $ionicLoading.show({template: 'Loading...'});
            $http.post(linkUrl,param
            ).success(
                function(data){
                    $ionicLoading.hide();
                    if(data.exception){
                        $ionicLoading.show({
                            duration: 1500,
                            noBackdrop: true,
                            template:"连接网络失败"

                        });
                        if(errorFunc){
                            errorFunc("连接网络失败");
                        }
                    }else{
                        if(data.key){
                            key = data.key;
                            try{
                                var ret = eval("("+data.ret+")");
                                if(ret.errorCode=="0"){
                                    //格式化form
                                    var result=ret.Data;
                                    var item = eval("("+result+")"),newitem={},files =ret.Files==""?[]:eval("("+ret.Files+")");
                                    if(item.Datas.length>0){
                                        newitem = item.Datas[0];
                                    }
                                    newitem.typeName = document.title;
                                    newitem.files = files;

                                    //格式化审批记录
                                    var retLog = eval("("+data.retLog.replace("Start","拟制")+")");
                                    if(retLog.errorCode=="0"){
                                        newitem.approvalRecord = retLog.Data;
                                    }else{
                                        $ionicLoading.show({
                                            duration: 1500,
                                            noBackdrop: true,
                                            template:retLog.errorContent

                                        });
                                        if(errorFunc){
                                            errorFunc(ret.errorContent);
                                        }
                                        return;
                                    }
                                    //格式化行表
                                    if(data.retList){
                                        var retList = eval("("+data.retList+")");
                                        if(retList.errorCode=="0"){
                                            newitem.lineList = retList.Data;
                                        }else{
                                            $ionicLoading.show({
                                                duration: 1500,
                                                noBackdrop: true,
                                                template:retLog.errorContent

                                            });
                                            if(errorFunc){
                                                errorFunc(ret.errorContent);
                                            }
                                            return;
                                        }
                                    }

                                    if(successFunc){
                                        successFunc(newitem);
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
                            }catch (e){
                                simplePopUp.showPopup("数据异常！",function(){
                                    if(errorFunc){
                                        errorFunc(data.ret);
                                    }
                                });

                            }

                        }else{
                            simplePopUp.showPopup("数据异常！",function(){
                                if(errorFunc){
                                    errorFunc(data.ret);
                                }
                            });
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
    switch (documentType){
        case "VivoBPMFlowPLM_DocReleaseChange":
            document.title="PLM流程";
            $stateProvider
                .state('plm', {
                    url: '/plm',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/plm_detail.html?r=" + t,
                    controller: "plmCtrl"
                });
            $urlRouterProvider.otherwise('/plm');break;
        case "ComDocManageProcess_ComDocManage":
            document.title="公司文件 管理类";
            $stateProvider
                .state('Process_ComDocManage', {
                    url: '/Process_ComDocManage',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/Process_ComDocManage.html?r=" + t,
                    controller: "comDocCtrl"
                });
            $urlRouterProvider.otherwise('/Process_ComDocManage');break;
        case "ComDocProductProcess_ComDocProduct":
            document.title="公司文件 产品类";
            $stateProvider
                .state('Process_ComDocManage', {
                    url: '/Process_ComDocManage',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/Process_ComDocManage.html?r=" + t,
                    controller: "comDocCtrl"
                });
            $urlRouterProvider.otherwise('/Process_ComDocManage');break;
        case "CompanyInstitutionCompanyInstitution":
            document.title="公司制度";
            $stateProvider
                .state('CompanyInstitution', {
                    url: '/CompanyInstitution',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/CompanyInstitution.html?r=" + t,
                    controller: "CompanyInstitutionCtrl"
                });
            $urlRouterProvider.otherwise('/CompanyInstitution');break;
        case "MeetingResolutionMeetingResolution":
            document.title="会议决议";
            $stateProvider
                .state('MeetingResolution', {
                    url: '/MeetingResolution',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/MeetingResolution.html?r=" + t,
                    controller: "MeetingResolutionCtrl"
                });
            $urlRouterProvider.otherwise('/MeetingResolution');break;
        case "K2Workflow_GZLLD0process_GZLLD0":
            document.title="工作联络单";
            $stateProvider
                .state('process_GZLLD0', {
                    url: '/process_GZLLD0',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/process_GZLLD0.html?r=" + t,
                    controller: "process_GZLLD0Ctrl"
                });
            $urlRouterProvider.otherwise('/process_GZLLD0');break;
        case "TXBMZDTXBMZD":
            document.title="部门制度";
            $stateProvider
                .state('TXBMZD', {
                    url: '/TXBMZD',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/TXBMZD.html?r=" + t,
                    controller: "TXBMZDCtrl"
                });
            $urlRouterProvider.otherwise('/TXBMZD');break;
        case "AystemicAuditAystemicAuditFile":
            document.title="体系审批文件";
            $stateProvider
                .state('AystemicAudit', {
                    url: '/AystemicAudit',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/AystemicAudit.html?r=" + t,
                    controller: "AystemicAuditCtrl"
                });
            $urlRouterProvider.otherwise('/AystemicAudit');break;
        case "RewardPunishmentFlowPunishmentNoticeFlow":
            document.title="处罚通告";
            $stateProvider
                .state('PunishmentNoticeFlow', {
                    url: '/PunishmentNoticeFlow',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/PunishmentNoticeFlow.html?r=" + t,
                    controller: "PunishmentNoticeFlowCtrl"
                });
            $urlRouterProvider.otherwise('/PunishmentNoticeFlow');break;
        case "RewardPunishmentFlowRewardNoticeFlow":
            document.title="奖励通告";
            $stateProvider
                .state('RewardNoticeFlow', {
                    url: '/RewardNoticeFlow',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/RewardNoticeFlow.html?r=" + t,
                    controller: "RewardNoticeFlowCtrl"
                });
            $urlRouterProvider.otherwise('/RewardNoticeFlow');break;
        case "LYTDRMLYTDRM":
            document.title="跨领域团队任命";
            $stateProvider
                .state('LYTDRM', {
                    url: '/LYTDRM',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/LYTDRM.html?r=" + t,
                    controller: "LYTDRMCtrl"
                });
            $urlRouterProvider.otherwise('/LYTDRM');break;
        case "SMZZFGSMZZFG":
            document.title="使命职责与人员分工";
            $stateProvider
                .state('SMZZFG', {
                    url: '/SMZZFG',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/SMZZFG.html?r=" + t,
                    controller: "SMZZFGCtrl"
                });
            $urlRouterProvider.otherwise('/SMZZFG');break;
        case "ProdouctPlanningProdouctPlanning":
            document.title="产品规划流程";
            $stateProvider
                .state('ProdouctPlanning', {
                    url: '/ProdouctPlanning',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/ProdouctPlanning.html?r=" + t,
                    controller: "ProdouctPlanningCtrl"
                });
            $urlRouterProvider.otherwise('/ProdouctPlanning');break;
        case "ZDSXIPZDSXIP":
            document.title="指导思想";
            $stateProvider
                .state('ZDSXIP', {
                    url: '/ZDSXIP',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/ZDSXIP.html?r=" + t,
                    controller: "ZDSXIPCtrl"
                });
            $urlRouterProvider.otherwise('/ZDSXIP');break;
        case "HYJYIPHYJYIP":
            document.title="会议决议";
            $stateProvider
                .state('HYJYIP', {
                    url: '/HYJYIP',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/HYJYIP.html?r=" + t,
                    controller: "HYJYIPCtrl"
                });
            $urlRouterProvider.otherwise('/HYJYIP');break;
        case "CompanyOrganizationFlowCompanyOrganizationFlow":
            document.title="公司组织架构";
            $stateProvider
                .state('CompanyOrganizationFlow', {
                    url: '/CompanyOrganizationFlow',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/CompanyOrganizationFlow.html?r=" + t,
                    controller: "CompanyOrganizationFlowCtrl"
                });
            $urlRouterProvider.otherwise('/CompanyOrganizationFlow');break;
        case "SMZZFGXZFG00":
            document.title="小组分工";
            $stateProvider
                .state('XZFG00', {
                    url: '/XZFG00',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/XZFG00.html?r=" + t,
                    controller: "XZFG00Ctrl"
                });
            $urlRouterProvider.otherwise('/XZFG00');break;
        case "DZJSGHDZJSGH":
            document.title="技术规划";
            $stateProvider
                .state('DZJSGH', {
                    url: '/DZJSGH',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/DZJSGH.html?r=" + t,
                    controller: "DZJSGHCtrl"
                });
            $urlRouterProvider.otherwise('/DZJSGH');break;
        case "XMXMTZXMXMTZ":
            document.title="项目通知";
            $stateProvider
                .state('XMXMTZ', {
                    url: '/XMXMTZ',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/XMXMTZ.html?r=" + t,
                    controller: "XMXMTZCtrl"
                });
            $urlRouterProvider.otherwise('/XMXMTZ');break;
        case "LWKZSPLWKZSP":
            document.title="例外开支审批";
            $stateProvider
                .state('LWKZSP', {
                    url: '/LWKZSP',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/LWKZSP.html?r=" + t,
                    controller: "LWKZSPCtrl"
                });
            $urlRouterProvider.otherwise('/LWKZSP');break;
        case "JGMJXXJGMJXX":
            document.title="模具信息";
            $stateProvider
                .state('JGMJXX', {
                    url: '/JGMJXX',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/JGMJXX.html?r=" + t,
                    controller: "JGMJXXCtrl"
                });
            $urlRouterProvider.otherwise('/JGMJXX');break;
        case "TSQKZCTSQKZC":
            document.title="特殊情况支出说明";
            $stateProvider
                .state('TSQKZC', {
                    url: '/TSQKZC',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/TSQKZC.html?r=" + t,
                    controller: "TSQKZCCtrl"
                });
            $urlRouterProvider.otherwise('/TSQKZC');break;
        case "XMBGKZJHBG":
            document.title="计划变更";
            $stateProvider
                .state('JHBG', {
                    url: '/JHBG',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/JHBG.html?r=" + t,
                    controller: "JHBGCtrl"
                });
            $urlRouterProvider.otherwise('/JHBG');break;
        case "XMBGKZBGTZ":
            document.title="变更通知";
            $stateProvider
                .state('BGTZ', {
                    url: '/BGTZ',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/BGTZ.html?r=" + t,
                    controller: "BGTZCtrl"
                });
            $urlRouterProvider.otherwise('/BGTZ');break;
        case "GSZCQLWLQLWM":
            document.title="物料清理外卖";
            $stateProvider
                .state('WLQLWM', {
                    url: '/WLQLWM',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/WLQLWM.html?r=" + t,
                    controller: "WLQLWMCtrl"
                });
            $urlRouterProvider.otherwise('/WLQLWM');break;
        case "GSZCQLLDZC00":
            document.title="流动资产";
            $stateProvider
                .state('LDZC00', {
                    url: '/LDZC00',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/LDZC00.html?r=" + t,
                    controller: "LDZC00Ctrl"
                });
            $urlRouterProvider.otherwise('/LDZC00');break;
        case "GSZCQLGDZC00":
            document.title="固定资产";
            $stateProvider
                .state('GDZC00', {
                    url: '/GDZC00',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/GDZC00.html?r=" + t,
                    controller: "GDZC00Ctrl"
                });
            $urlRouterProvider.otherwise('/GDZC00');break;
        case "GSZCQLDZYHP0":
            document.title="低值易耗品";
            $stateProvider
                .state('DZYHP0', {
                    url: '/DZYHP0',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/DZYHP0.html?r=" + t,
                    controller: "DZYHP0Ctrl"
                });
            $urlRouterProvider.otherwise('/DZYHP0');break;
        case "XMRWXDXMRWXD":
            document.title="IPMT任务下达";
            $stateProvider
                .state('XMRWXD', {
                    url: '/XMRWXD',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/XMRWXD.html?r=" + t,
                    controller: "XMRWXDCtrl"
                });
            $urlRouterProvider.otherwise('/XMRWXD');break;
        case "GWGZSCGWGZSC":
            document.title="岗位工作手册";
            $stateProvider
                .state('GWGZSC', {
                    url: '/GWGZSC',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/GWGZSC.html?r=" + t,
                    controller: "GWGZSCCtrl"
                });
            $urlRouterProvider.otherwise('/GWGZSC');break;
        case "ZYZDGLZYZDGL":
            document.title="作业指导(管理类)";
            $stateProvider
                .state('ZYZDGL', {
                    url: '/ZYZDGL',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/ZYZDGL.html?r=" + t,
                    controller: "ZYZDGLCtrl"
                });
            $urlRouterProvider.otherwise('/ZYZDGL');break;
        case "ZYZDCZZYZDCZ":
            document.title="作业指导(操作类)";
            $stateProvider
                .state('ZYZDCZ', {
                    url: '/ZYZDCZ',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/ZYZDCZ.html?r=" + t,
                    controller: "ZYZDCZCtrl"
                });
            $urlRouterProvider.otherwise('/ZYZDCZ');break;
        case "CXWJMKCXWJMK":
            document.title="程序文件";
            $stateProvider
                .state('CXWJMK', {
                    url: '/CXWJMK',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/CXWJMK.html?r=" + t,
                    controller: "CXWJMKCtrl"
                });
            $urlRouterProvider.otherwise('/CXWJMK');break;
        case "TXZYGFTXZYGF":
            document.title="作业规范";
            $stateProvider
                .state('TXZYGF', {
                    url: '/TXZYGF',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/TXZYGF.html?r=" + t,
                    controller: "TXZYGFCtrl"
                });
            $urlRouterProvider.otherwise('/TXZYGF');break;
        case "EWGSSQEWGSSQ":
            document.title="额外工时申请";
            $stateProvider
                .state('EWGSSQ', {
                    url: '/EWGSSQ',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/EWGSSQ.html?r=" + t,
                    controller: "EWGSSQCtrl"
                });
            $urlRouterProvider.otherwise('/EWGSSQ');break;
        case "YWBGYWBG":
            document.title="业务报告";
            $stateProvider
                .state('YWBG', {
                    url: '/YWBG',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/YWBG.html?r=" + t,
                    controller: "YWBGCtrl"
                });
            $urlRouterProvider.otherwise('/YWBG');break;
        case "YYSYJJJDYYSYJJJD":
            document.title="运营商样机交接单";
            $stateProvider
                .state('YYSYJJJD', {
                    url: '/YYSYJJJD',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/YYSYJJJD.html?r=" + t,
                    controller: "YYSYJJJDCtrl"
                });
            $urlRouterProvider.otherwise('/YYSYJJJD');break;
        case "YYSYJJJDYYSYJBGH":
            document.title="运营商样机不归还";
            $stateProvider
                .state('YYSYJBGH', {
                    url: '/YYSYJBGH',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/YYSYJBGH.html?r=" + t,
                    controller: "YYSYJBGHCtrl"
                });
            $urlRouterProvider.otherwise('/YYSYJBGH');break;
        case "YYSYJJJDYYSYJGH":
            document.title="运营商样机归还";
            $stateProvider
                .state('YYSYJGH', {
                    url: '/YYSYJGH',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/YYSYJGH.html?r=" + t,
                    controller: "YYSYJGHCtrl"
                });
            $urlRouterProvider.otherwise('/YYSYJGH');break;
        case "WGYBZMWGYBZM":
            document.title="外观样板账目明细";
            $stateProvider
                .state('WGYBZM', {
                    url: '/WGYBZM',
                    cache: false,
                    templateUrl: sshFileUrl+"pages/WGYBZM.html?r=" + t,
                    controller: "WGYBZMCtrl"
                });
            $urlRouterProvider.otherwise('/WGYBZM');break;
        default :
            document.title="暂不支持流程类型";
            $stateProvider
                .state('error', {
                    url: '/error',
                    cache: true,
                    templateUrl: "templates/error.html"
                });
            $urlRouterProvider.otherwise('/error');break;
    }

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

