/**
 * Created by GZW on 2015/8/3.
 */
appMain.controller('detailCtrl',function($scope,simplePopUp,approvalFactory,$state,$ionicLoading,linkDatas) {
    $scope.cnNumber = ["一","二","三","四","五","六","七","八","九","十"];
    linkDatas.getStatus(function (ret) {
        $scope.isTodo = ret.isTodo;
    });
    linkDatas.getDetail(function(newitem){
        $scope.attachments = newitem.attachments;

        $scope.tagName1 = [];
        $scope.tagName1group1=[];
        $scope.itemLineData = [];
        $scope.itemLineDisPlayName = [];
        $scope.itemLineDataDetail = [];
        for(var objName in newitem.mobileMeta){
            if(objName=="group1"){
                var jsondata1group1 = newitem.mobileMeta[objName];
                for (var x in jsondata1group1) {
                    var item1group1 = {};
                    var itemLine = {};

                    if (!jsondata1group1[x].isLine) {

                        item1group1.name = jsondata1group1[x].displayName;//把mobileMeta中的名字存入
                        item1group1.value = newitem.data[x];//把data中数据存入
                        $scope.tagName1group1.push(item1group1);//[{},{},{}]
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
                var jsondata1 = newitem.mobileMeta[objName];
                for (var x in jsondata1) {
                    var item1 = {};
                    var itemLine = {};

                    if (!jsondata1[x].isLine) {

                        item1.name = jsondata1[x].displayName;
                        var description = newitem.data[x];
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
            /*document.getElementById("display1").style.display ="";
            document.getElementById("display2").style.display ="";
            document.getElementById("display").style.display ="";*/
        }
        $scope.init();
    });

    //初始化页面，点击下一页上一页的时候会重复调用
    $scope.init = function(){
        $scope.isShowMainText = true;
        $scope.isShowDetailText = true;
    };
    //滚动到顶部
    $scope.scrollTop = function(){
        scrollToTop();
    };
    //滚动到底部
    $scope.scrollBottom = function(){
        scrollToBottom();
    };
    //控制正文的收缩和展开
    $scope.toggleMainText =function(){
        $scope.isShowMainText = !$scope.isShowMainText;
    };
    $scope.toggleDetailText =function(){
        $scope.isShowDetailText = !$scope.isShowDetailText;
    };
    $scope.togglSignText =function(){
        $scope.isShowSignText = !$scope.isShowSignText;
    };
    $scope.toggleReplyText =function(){
        $scope.isShowReplyText = !$scope.isShowReplyText;
    };
    $scope.toggleAuditInformation =function(){
        $scope.isShowAuditInformation = !$scope.isShowAuditInformation;
    };
    $scope.toggleFooterInput = function(){
        $scope.isShowFooterInput = !$scope.isShowFooterInput;
    };
    //点击附件下载
    $scope.clickAttach = function(data){
        simplePopUp.confirmDownload(data.FAttachmentName,data.FAttachmentSize,function(){
            var fileName = data.DownFtpUrl.substr(attachUrl.length,data.DownFtpUrl.length);
            bpmCommonFunc.checkDownLoad(fileName,data.FAttachmentName,data.FAttachmentSize,data.FFormInsID,data.FID,data.FFormControlID);
        });
    };

});
