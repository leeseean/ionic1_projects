/**
 * Created by GZW on 2015/8/3.
 */
appMain.controller('process_GZLLD0Ctrl',function($scope,simplePopUp,approvalFactory,$state,$ionicLoading,linkDatas,bpmCommonFunc) {
    $scope.cnNumber = cnNumber;//显示中文的数字
    //下面两个参数是对应获取详细的接口，第一个是页面显示的值跟pc上面页面的id对应，第二个是复文本的id，
    var process_GZLLD0_selectColumn = all_selectColumn+";txt_FAuthor_text;txt_FManager_text;txt_FReaders_text;txt_FAuthor1_text;txt_FAuthor2_text;txt_FManager2_text;txt_FReaders2_text";
    var process_GZLLD0_encryptionColumn="hidVontainer;hidVontainer1;hidVontainer2";
    //下面参数是控制页面选择下一流程审批人用的，isCanApproval=true表示可以审批，controlID对应当前那个流程的审批人可以选择，approvaler是记录当前选择人，不过后来改了不怎么用
    $scope.controlApproval={isCanApproval:true,controlID:"",approvaler:""};
    var param = {
        selectColumn: process_GZLLD0_selectColumn+";"+process_GZLLD0_encryptionColumn,
        encryptionColumnn:process_GZLLD0_encryptionColumn,
        isGetList:false//有些流程会有子列表在里面，这时候就需要设为true，但是目前只有奖励处罚流程有用，其他需要跟BPM人员沟通
    };
    linkDatas.getKeyAndForm(param, function (newitem) {
        //复文本框的内容需要转码处理
        var hidVontainer = decodeURIComponent(newitem.hidVontainer);
        newitem.hidVontainer = hidVontainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        var hidVontainer1 = decodeURIComponent(newitem.hidVontainer1);
        newitem.hidVontainer1 = hidVontainer1.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        var hidVontainer2 = decodeURIComponent(newitem.hidVontainer2);
        newitem.hidVontainer2 = hidVontainer2.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        window.document.getElementById("hidVontainer").innerHTML=newitem.hidVontainer;
        window.document.getElementById("hidVontainer1").innerHTML=newitem.hidVontainer1;
        window.document.getElementById("hidVontainer2").innerHTML=newitem.hidVontainer2;
        newitem.hidVontainer="";
        $scope.item = newitem;
        $scope.init();
        if(newitem.isShowAgreeButton== "1"
            ||newitem.isShowDisagreeButton== "1"
            ||newitem.isShowOptionButton=="1"
            ||newitem.isShowSubmitButton== "1"){
            $scope.isTodo = "0";
        }else{
            $scope.isTodo = "1";
        }
    });

    //初始化页面，点击下一页上一页的时候会重复调用
    $scope.init = function(){
        $scope.isShowMainText = true;
        $scope.isShowSignText = true;
        $scope.isShowReplyText = true;
        //$scope.isBuyer = false;
        $scope.isShowFooterInput = false;
        $scope.isShowAuditInformation = false;
        $scope.item.optionInput = "";

        for(var i= 0,l=$scope.item.approvalRecord.length;i<l;i++){
            if($scope.item.approvalRecord[i].HandleUserID=="")continue;
            var val = $scope.item.approvalRecord[i].HandleUserName+"，"
                +$scope.item.approvalRecord[i].HandleTime+"，"
                +$scope.item.approvalRecord[i].HandleOpinion;
            switch ($scope.item.approvalRecord[i].ApprovalNodeName){
                case "拟制":$scope.item.txt_FAuthor_value =  val;break;
                case "重新提交":$scope.item.txt_FAuthor_value =  val;break;
                case "审核":$scope.item.txt_FManager_value =  val;break;
                case "签收":$scope.item.txt_FAuthor1_value =  val;break;
                case "回复拟制":$scope.item.txt_FAuthor2_value =  val;break;
                case "回复审核":$scope.item.txt_FManager2_value =  val;break;
                default:break;
            }
        }
        switch ($scope.item.txt_FDocCurrentStatus){
            case "重新提交":$scope.item.txt_FAuthor_value =  "";break;
            case "审核":$scope.item.txt_FManager_value =  "";break;
            case "签收":
                $scope.item.txt_FAuthor1_value =  "";
                $scope.controlApproval.controlID="txt_FAuthor2";
                if($scope.item.txt_FAuthor2_text==null||$scope.item.txt_FAuthor2_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "回复拟制":$scope.item.txt_FAuthor2_value =  "";
                $scope.controlApproval.controlID="txt_FManager2";
                if($scope.item.txt_FManager2_text==null||$scope.item.txt_FManager2_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "回复审核":$scope.item.txt_FManager2_value =  "";break;
            default:break;
        }
        initImgOnClick(["hidVontainer","hidVontainer1","hidVontainer2"]);
        initScroll();
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
    //修改流程内容，这里的处理方式不够通用，更好的方式可参考BGTZ.js
    var isUpdateSignInfor = false;
    $scope.updateSignInfor = function(){
        simplePopUp.areaPopup("签收信息",$scope.item.hidVontainer1,function(text){
            $scope.item.hidVontainer1 = text;
            window.document.getElementById("hidVontainer1").innerHTML=text;
            isUpdateSignInfor = true;
        });

    };
    var isUpdateReplyInfor = false;
    $scope.updateReplyInfor = function(){
        simplePopUp.areaPopup("回复信息",$scope.item.hidVontainer2,function(text){
            $scope.item.hidVontainer2 = text;
            window.document.getElementById("hidVontainer2").innerHTML=text;
            isUpdateReplyInfor = true;
        });
    };
    //判断是否有底部，控制content样式
    $scope.getContentBottom=function(){
        var ret = "";
        if($scope.isTodo=="0"){
            if($scope.isShowFooterInput){
                ret='has-footer1';
            }else{
                ret='has-footer';
            }
        }
        return ret;
    };
    //点击提交事件
    $scope.clickSubmit = function(){
        if(!$scope.controlApproval.isCanApproval){
            simplePopUp.showPopup("下一流程审批人为空，请选择！");
            return;
        }
        var msg = $scope.item.optionInput==""?"无":$scope.item.optionInput;
        if($scope.item.FEnablePassword=="0"){
            simplePopUp.confirmPopup("是否确认提交？",function(){
                $scope.Approval(1,hrefdocumentId);
            });
        }else{
            simplePopUp.inputPopup("请输入审批密码",function(psw){
                $scope.PwdValidationApprove(1,psw,hrefdocumentId,null);
            },null,"密码不能为空");
        }
    };

    //点击同意事件
    $scope.clickAgree = function(){
        if(!$scope.controlApproval.isCanApproval){
            simplePopUp.showPopup("下一流程审批人为空，请选择！");
            return;
        }
        if($scope.item.FEnablePassword=="0"){
            var msg = $scope.item.optionInput==""?"无":$scope.item.optionInput;
            simplePopUp.confirmPopupShowMsg("是否确认审批同意？",msg,function(){
                $scope.Approval(1,hrefdocumentId);
            });
        }else{
            simplePopUp.inputPopup("请输入审批密码",function(psw){
                $scope.PwdValidationApprove(1,psw,hrefdocumentId,null);
            },null,"密码不能为空");

        }

    };
    //点击不同意事件
    $scope.clickdisagree = function(){
        if(!$scope.controlApproval.isCanApproval){
            simplePopUp.showPopup("下一流程审批人为空，请选择！");
            return;
        }
        if($scope.item.optionInput==""){
            simplePopUp.showPopup("请输入审批意见",function(){
                $scope.isShowFooterInput = true;
            });
            return;
        }
        if($scope.item.FEnablePassword=="0"){
            var msg = $scope.item.optionInput==""?"无":$scope.item.optionInput;
            simplePopUp.confirmPopupShowMsg("是否确认审批不同意？",msg,function(){
                $scope.Approval(0,hrefdocumentId);
            });
        }else{
            simplePopUp.inputPopup("请输入审批密码",function(psw){
                $scope.PwdValidationApprove(0,psw,hrefdocumentId,null);
            },null,"密码不能为空");

        }
    };
    //点击重新分派
    $scope.clickToDispatch = function(){
        selectContacts(function(selectUser){
                if($scope.item.FEnablePassword=="0"){
                    simplePopUp.confirmPopup("是否确定重派给"+selectUser.targetName+"？",function(){
                        $scope.ToDispatch(hrefdocumentId,selectUser.targetId);
                    });
                }else{
                    simplePopUp.inputPopup("请输入审批密码",function(psw){
                        $scope.PwdValidationApprove(0,psw,hrefdocumentId,selectUser.targetId);
                    },null,"密码不能为空");

                }
            },
            function(){
                simplePopUp.showPopup("获取联系人异常！");
            });
    };
    //点击增加审批人
    $scope.clickAddApprovaler = function(){
        selectContacts(function(selectUser){
        //var selectUser = {targetName:"陈浩珍",targetId:"24"};
                simplePopUp.confirmPopup("是否确定选择 "+selectUser.targetName+" 为该流程审批人？",function(){
                    approvalFactory.EditApprovaler(hrefdocumentId,selectUser.targetId,$scope.controlApproval.controlID,function(){
                        simplePopUp.showPopup("设置成功！");
                        $scope.controlApproval.isCanApproval= true;
                        $scope.item[$scope.controlApproval.controlID+"_text"]=selectUser.targetName;
                    });
                });
            },
            function(){
                simplePopUp.showPopup("获取联系人异常！");
            });
    };
    //点击增加审批人
    $scope.clickRemoveApprovaler = function(){
        simplePopUp.confirmPopup("是否删除该流程审批人？",function(){
            approvalFactory.EditApprovaler(hrefdocumentId,"",$scope.controlApproval.controlID,function(){
                simplePopUp.showPopup("删除成功！");
                $scope.controlApproval.isCanApproval= false;
                $scope.item[$scope.controlApproval.controlID+"_text"]="";
            });
        });
    };

    //验证审批密码
    $scope.PwdValidationApprove = function(auditFlag,auditPwd,documentId,toUserName){
        if(toUserName==null){
            if(isUpdateSignInfor||isUpdateReplyInfor){
                var affPara = [];
                if(isUpdateSignInfor){
                    var hidVontainer1 = encodeURIComponent($scope.item.hidVontainer1);
                    affPara.push({"FName":"hidVontainer1","FText":hidVontainer1,"FValue":hidVontainer1,"FType":""});
                }
                if(isUpdateReplyInfor){
                    var hidVontainer2 = encodeURIComponent($scope.item.hidVontainer2);
                    affPara.push({"FName":"hidVontainer2","FText":hidVontainer2,"FValue":hidVontainer2,"FType":""});
                }
            }
            approvalFactory.PwdAndApprove(auditFlag,auditPwd,documentId,$scope.item.optionInput,JSON.stringify(affPara),function(){
                appexit(1);
            });
        }else{
            approvalFactory.PwdValidationApprove(auditFlag,auditPwd,documentId,function(){
                $scope.ToDispatch(documentId,toUserName);
            });
        }

    };
    //提交审批操作，成功后删除列表改行数据
    $scope.Approval = function(auditFlag,documentId){
        if(isUpdateSignInfor||isUpdateReplyInfor){
            var affPara = [];
            if(isUpdateSignInfor){
                var hidVontainer1 = encodeURIComponent($scope.item.hidVontainer1);
                affPara.push({"FName":"hidVontainer1","FText":hidVontainer1,"FValue":hidVontainer1,"FType":""});
            }
            if(isUpdateReplyInfor){
                var hidVontainer2 = encodeURIComponent($scope.item.hidVontainer2);
                affPara.push({"FName":"hidVontainer2","FText":hidVontainer2,"FValue":hidVontainer2,"FType":""});
            }
        }
        approvalFactory.Approval(auditFlag,documentId,$scope.item.optionInput,JSON.stringify(affPara),function(){
            appexit(1);
        });
    };
    //重派操作，成功后删除列表改行数据
    $scope.ToDispatch = function(documentId,toUserName){
        approvalFactory.ToDispatch(documentId,toUserName,function(){
            appexit(1);
        });
    };

});
