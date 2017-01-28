/**
 * Created by GZW on 2015/8/3.
 */
appMain.controller('LWKZSPCtrl',function($scope,simplePopUp,approvalFactory,$state,$ionicLoading,linkDatas,bpmCommonFunc) {
    $scope.cnNumber = cnNumber;
    $scope.controlApproval={isCanApproval:true,controlID:"",approvaler:""};
    var lwkzsp_selectColumn =all_selectColumn+";sel_FBusinessType;txt_reason;txt_ResponsibleUser_text;txt_FAuthor_text;txt_FManager_text;txt_FApprove_text;txt_FReaders_text;txt_SSignAuthor_text;txt_RFiction_text;txt_RCheck_text;txt_RReaders_text";
    var lwkzsp_encryptionColumn = "txt_FContainer;txt_SContainer;txt_RContainer";
    var param = {
        selectColumn: lwkzsp_selectColumn+";"+lwkzsp_encryptionColumn,
        encryptionColumnn:lwkzsp_encryptionColumn,
        isGetList:false
    };
    linkDatas.getKeyAndForm(param, function (newitem) {
        newitem.sel_FBusinessType=getSelectVal(newitem.sel_FBusinessType);
        var txt_FContainer = decodeURIComponent(newitem.txt_FContainer);
        var txt_SContainer = decodeURIComponent(newitem.txt_SContainer);
        var txt_RContainer = decodeURIComponent(newitem.txt_RContainer);
        newitem.txt_FContainer = txt_FContainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.txt_SContainer = txt_SContainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.txt_RContainer = txt_RContainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        window.document.getElementById("txt_FContainer").innerHTML=newitem.txt_FContainer;
        window.document.getElementById("txt_SContainer").innerHTML=newitem.txt_SContainer;
        window.document.getElementById("txt_RContainer").innerHTML=newitem.txt_RContainer;
        newitem.txt_FContainer="";
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
                case "批准":$scope.item.txt_FApprove_value =  val;break;
                case "签收拟制":$scope.item.txt_SSignAuthor_value =  val;break;
                case "回复拟制":$scope.item.txt_RFiction_value =  val;break;
                case "回复审核":$scope.item.txt_RCheck_value =  val;break;
                default:break;
            }
        }
        switch ($scope.item.txt_FDocCurrentStatus){
            case "重新提交":$scope.item.txt_FAuthor_value =  "";break;
            case "审核":$scope.item.txt_FManager_value =  "";break;
            case "批准":$scope.item.txt_FApprove_value =  "";break;
            case "签收拟制":
                $scope.item.txt_SSignAuthor_value =  "";
                $scope.controlApproval.controlID="txt_RFiction";
                if($scope.item.txt_RFiction_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "回复拟制":
                $scope.item.txt_RFiction_value =  "";
                $scope.controlApproval.controlID="txt_RCheck";
                if($scope.item.txt_RCheck_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "回复审核":$scope.item.txt_RCheck_value =  "";break;
            default:break;
        }
        initImgOnClick(["txt_FContainer","txt_SContainer","txt_RContainer"]);
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
    $scope.toggleAuditInformation =function(){
        $scope.isShowAuditInformation = !$scope.isShowAuditInformation;
    };
    $scope.toggleFooterInput = function(){
        $scope.isShowFooterInput = !$scope.isShowFooterInput;
    };
    var updateCodes=[],updateVals={};
    $scope.updateInfor = function(title,code,isVontainer){
        simplePopUp.areaPopup(title,$scope.item[code],function(text){
            if(isVontainer){
                window.document.getElementById(code).innerHTML=text;
            }
            $scope.item[code] = text;
            if(!updateVals[code]){
                updateCodes.push(code);
            }
            updateVals[code] = text;

        });
    };

    $scope.clickAttach = function(data){
        simplePopUp.confirmDownload(data.FAttachmentName,data.FAttachmentSize,function(){
            var fileName = data.DownFtpUrl.substr(attachUrl.length,data.DownFtpUrl.length);
            bpmCommonFunc.checkDownLoad(fileName,data.FAttachmentName,data.FAttachmentSize,data.FFormInsID,data.FID,data.FFormControlID);
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
    //点击增加审批人
    $scope.clickAddApprovaler = function(){
        selectContacts(function(selectUser){
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

    //验证审批密码
    $scope.PwdValidationApprove = function(auditFlag,auditPwd,documentId,toUserName){
        if(toUserName==null){
            var affPara;
            if(updateCodes.length>0){
                affPara = [];
                for(var i= 0,l=updateCodes.length;i<l;i++){
                    var updateVal = encodeURIComponent(updateVals[updateCodes[i]]);
                    affPara.push({"FName":updateCodes[i],"FText":updateVal,"FValue":updateVal,"FType":""});
                }
            }
            if(affPara){
                affPara = JSON.stringify(affPara);
            }
            approvalFactory.PwdAndApprove(auditFlag,auditPwd,documentId,$scope.item.optionInput,affPara,function(){
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
        var affPara;
        if(updateCodes.length>0){
            affPara = [];
            for(var i= 0,l=updateCodes.length;i<l;i++){
                var updateVal = encodeURIComponent(updateVals[updateCodes[i]]);
                affPara.push({"FName":updateCodes[i],"FText":updateVal,"FValue":updateVal,"FType":""});
            }
        }
        if(affPara){
            affPara = JSON.stringify(affPara);
        }
        approvalFactory.Approval(auditFlag,documentId,$scope.item.optionInput,affPara,function(){
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
