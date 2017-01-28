/**
 * Created by GZW on 2015/8/3.
 */
appMain.controller('XMRWXDCtrl',function($scope,simplePopUp,approvalFactory,$state,$ionicLoading,linkDatas,bpmCommonFunc) {
    $scope.cnNumber = cnNumber;
    var selectColumn = all_selectColumn+";select_classify;select_classifySon;select_EffectStatus;" +
        "txt_FAuthor_text;txt_FManager_text;txt_FCFGManager_text;txt_FReaders_text;txt_FDrawUpSign_text;txt_FDrawUpanswer_text;" +
        "txt_FAudit_text;txt_FReadersAnswer_text;txt_FConfirAudit_text";
    var encryptionColumn="hidVontainer01;hidVontainer02;hidVontainer03;hidVontainer04";
    $scope.controlApproval={isCanApproval:true,controlID:"",approvaler:""};
    var param = {
        selectColumn: selectColumn+";"+encryptionColumn,
        encryptionColumnn:encryptionColumn,
        isGetList:false
    };
    linkDatas.getKeyAndForm(param, function (newitem) {
        newitem.select_classify=getSelectVal(newitem.select_classify);
        newitem.select_classifySon=getSelectVal(newitem.select_classifySon);
        newitem.select_EffectStatus=getSelectVal(newitem.select_EffectStatus);

        var hidVontainer01 = decodeURIComponent(newitem.hidVontainer01);
        var hidVontainer02 = decodeURIComponent(newitem.hidVontainer02);
        var hidVontainer03 = decodeURIComponent(newitem.hidVontainer03);
        var hidVontainer04 = decodeURIComponent(newitem.hidVontainer04);
        newitem.hidVontainer01 = hidVontainer01.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.hidVontainer02 = hidVontainer02.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.hidVontainer03 = hidVontainer03.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.hidVontainer04 = hidVontainer04.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        window.document.getElementById("hidVontainer01").innerHTML=newitem.hidVontainer01;
        window.document.getElementById("hidVontainer02").innerHTML=newitem.hidVontainer02;
        window.document.getElementById("hidVontainer03").innerHTML=newitem.hidVontainer03;
        window.document.getElementById("hidVontainer04").innerHTML=newitem.hidVontainer04;
        newitem.hidVontainer01="";
        newitem.hidVontainer02="";
        newitem.hidVontainer03="";
        newitem.hidVontainer04="";

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
        $scope.isShowMenu4 = true;
        $scope.isShowFooterInput = false;
        $scope.isShowAuditInformation = false;
        $scope.item.optionInput = "";
        $scope.item.FSign_list = [];

        for(var i= 0,l=$scope.item.approvalRecord.length;i<l;i++){
            if($scope.item.approvalRecord[i].HandleUserID=="")continue;
            var val = $scope.item.approvalRecord[i].HandleUserName+"，"
                +$scope.item.approvalRecord[i].HandleTime+"，"
                +$scope.item.approvalRecord[i].HandleOpinion;
            switch ($scope.item.approvalRecord[i].ApprovalNodeName){
                case "拟制":$scope.item.txt_FAuthor_value =  val;break;
                case "重新提交":$scope.item.txt_FAuthor_value =  val;break;
                case "审核":$scope.item.txt_FManager_value =  val;break;
                case "批准":$scope.item.txt_FCFGManager_value =  val;break;
                case "签收拟制":$scope.item.txt_FDrawUpSign_value =  val;break;
                case "回复拟制":$scope.item.txt_FDrawUpanswer_value =  val;break;
                case "回复审核":$scope.item.txt_FAudit_value =  val;break;
                case "确认审核":$scope.item.txt_FConfirAudit_value =  val;break;
                default:break;
            }
        }
        switch ($scope.item.txt_FDocCurrentStatus){
            case "重新提交":$scope.item.txt_FAuthor_value =  "";break;
            case "审核":$scope.item.txt_FManager_value =  "";break;
            case "批准":$scope.item.txt_FCFGManager_value =  "";break;
            case "签收拟制":
                $scope.item.txt_FDrawUpSign_value =  "";
                $scope.controlApproval.controlID="txt_FDrawUpanswer";
                if($scope.item.txt_FDrawUpanswer_text==null||$scope.item.txt_FDrawUpanswer_text==""
                ||$scope.item.txt_FAudit_text==null||$scope.item.txt_FAudit_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "回复拟制":
                $scope.item.txt_FDrawUpanswer_value =  "";break;
            case "回复审核":
                $scope.item.txt_FAudit_value =  "";
                $scope.controlApproval.controlID="txt_FConfirAudit";
                if($scope.item.txt_FConfirAudit_text==null||$scope.item.txt_FConfirAudit_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "确认审核":$scope.item.txt_FConfirAudit_value =  "";break;
            default:break;
        }
        initImgOnClick(["hidVontainer01","hidVontainer02","hidVontainer03","hidVontainer04"]);
        initScroll();
    };
    $scope.scrollTop = function(){
        scrollToTop();
    };
    $scope.scrollBottom = function(){
        scrollToBottom();
    };

    $scope.toggleMainText =function(){
        $scope.isShowMainText = !$scope.isShowMainText;
    };
    $scope.togglSignText =function(){
        $scope.isShowSignText = !$scope.isShowSignText;
    };
    $scope.toggleReplyText =function(){
        $scope.isShowReplyText = !$scope.isShowReplyText;
    };
    $scope.togglMenu4 =function(){
        $scope.isShowMenu4 = !$scope.isShowMenu4;
    };
    $scope.toggleAuditInformation =function(){
        $scope.isShowAuditInformation = !$scope.isShowAuditInformation;
    };
    $scope.toggleFooterInput = function(){
        $scope.isShowFooterInput = !$scope.isShowFooterInput;
    };
    $scope.clickAttach = function(data){
        simplePopUp.confirmDownload(data.FAttachmentName,data.FAttachmentSize,function(){
            var fileName = data.DownFtpUrl.substr(attachUrl.length,data.DownFtpUrl.length);
            bpmCommonFunc.checkDownLoad(fileName,data.FAttachmentName,data.FAttachmentSize,data.FFormInsID,data.FID,data.FFormControlID);
        });
    };
    var isUpdateSignInfor = false;
    $scope.updateSignInfor = function(){
        simplePopUp.areaPopup("签收信息",$scope.item.hidVontainer1,function(text){
            $scope.item.hidVontainer1 = text;
            isUpdateSignInfor = true;
        });

    };
    var isUpdateReplyInfor = false;
    $scope.updateReplyInfor = function(){
        simplePopUp.areaPopup("回复信息",$scope.item.hidVontainer2,function(text){
            $scope.item.hidVontainer2 = text;
            isUpdateReplyInfor = true;
        });
    };
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
            if($scope.controlApproval.controlID=="txt_FDrawUpanswer"){
                simplePopUp.showPopup("回复拟制流程和回复审核审批人不能为空，请选择！");
            }else{
                simplePopUp.showPopup("下一流程审批人为空，请选择！");
            }
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
        if($scope.controlApproval.controlID=="txt_FDrawUpanswer"){
            simplePopUp.showPopup("回复拟制流程和回复审核审批人不能为空，请选择！");
        }else{
            simplePopUp.showPopup("下一流程审批人为空，请选择！");
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
        if($scope.controlApproval.controlID=="txt_FDrawUpanswer"){
            simplePopUp.showPopup("回复拟制流程和回复审核审批人不能为空，请选择！");
        }else{
            simplePopUp.showPopup("下一流程审批人为空，请选择！");
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
    $scope.clickAddApprovaler = function(num){
        selectContacts(function(selectUser){
                //var selectUser = {targetName:"陈浩珍",targetId:"24"};
                simplePopUp.confirmPopup("是否确定选择 "+selectUser.targetName+" 为该流程审批人？",function(){
                    var controlId = num==1?"txt_FAudit":$scope.controlApproval.controlID;
                    approvalFactory.EditApprovaler(hrefdocumentId,selectUser.targetId,controlId,function(){
                        simplePopUp.showPopup("设置成功！");
                        $scope.item[controlId+"_text"]=selectUser.targetName;
                        if($scope.controlApproval.controlID=="txt_FDrawUpanswer"&&($scope.item.txt_FDrawUpanswer_text==null||$scope.item.txt_FDrawUpanswer_text==""
                            ||$scope.item.txt_FAudit_text==null||$scope.item.txt_FAudit_text=="")){
                            $scope.controlApproval.isCanApproval= false;
                        }else{
                            $scope.controlApproval.isCanApproval= true;
                        }
                    });
                });
            },
            function(){
                simplePopUp.showPopup("获取联系人异常！");
            });
    };
    //点击增加审批人
    $scope.clickRemoveApprovaler = function(num){
        simplePopUp.confirmPopup("是否删除该流程审批人？",function(){
            var controlId = num==1?"txt_FAudit":$scope.controlApproval.controlID;
            approvalFactory.EditApprovaler(hrefdocumentId,"",controlId,function(){
                simplePopUp.showPopup("删除成功！");
                $scope.controlApproval.isCanApproval= false;
                $scope.item[controlId+"_text"]="";
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
