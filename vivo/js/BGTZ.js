/**
 * Created by GZW on 2015/8/3.
 */
appMain.controller('BGTZCtrl',function($scope,simplePopUp,approvalFactory,$state,$ionicLoading,linkDatas,bpmCommonFunc) {
    $scope.cnNumber = cnNumber;
    var selectColumn = all_selectColumn+";sel_FProjectNo;sel_FGenerateStage;sel_FReasonType;txt_FChangeReason;txt_FChangeContent;div_FChangeLevel;" +
        "div_FImpactScope;div_FImpactDelivery;div_FCCBMeeting;div_FBeginIsShipment;txt_FRiskImpact;txt_FCostAndSchedule;txt_FValidation;txt_FLossAccounting;div_FBigAabnormal;" +
        "txt_FMarketing_text;txt_FAdvertisement_text;txt_FStructure_text;txt_FPackaging_text;txt_FUE_text;txt_FInstructions_text;txt_FElectronSE_text;" +
        "txt_FElectronLeader_text;txt_FMaterial_text;txt_FSoftwareLeader_text;txt_FSoftwareEngineer_text;txt_FStructureSE_text;txt_FStructureLeader_text;" +
        "txt_FLogistics_text;txt_FManufacture_text;txt_FTest_text;txt_FCustomerSupport_text;txt_FCostCommissioner_text;txt_FNetworkEngineer_text;txt_FOperatorElectron_text;" +
        "txt_FOperatorSoftware_text;txt_FSQA_text;txt_FProjectAssistant_text;txt_FCustomerService_text;" +
        "txt_FAuthor_text;txt_FQAManager_text;txt_FFinanceManager_text;" +
        "txt_FProcessing_text;txt_FApprove_text;txt_FIPMTAudit_text;txt_FReaders_text;div_TValidPass;div_TDocUpdate;txt_TSQA;txt_TTracePerson_text;txt_TReaders_text;" +
        "div_ARootContainer;div_APreventContainer;txt_ARemark;txt_AProcessing_text;txt_AMagnege_text;txt_AReaders_text;div_CMeasureValid;div_CMeasureImplement;" +
        "txt_CContractSpecification;txt_CConfirm_text;txt_CReaders_text";
    var encryptionColumn="div_FContainer";
    $scope.controlApproval={isCanApproval:true,controlID:"",approvaler:""};
    var param = {
        selectColumn: selectColumn+";"+encryptionColumn,
        encryptionColumnn:encryptionColumn,
        isGetList:false
    };
    linkDatas.getKeyAndForm(param, function (newitem) {
        newitem.sel_FProjectNo=getSelectVal(newitem.sel_FProjectNo);
        newitem.sel_FGenerateStage=getSelectVal(newitem.sel_FGenerateStage);
        newitem.sel_FReasonType=getSelectVal(newitem.sel_FReasonType);

        var div_FContainer = decodeURIComponent(newitem.div_FContainer);
        var div_ARootContainer = decodeURIComponent(newitem.div_ARootContainer);
        var div_APreventContainer = decodeURIComponent(newitem.div_APreventContainer);
        newitem.div_FContainer = div_FContainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.div_ARootContainer = div_ARootContainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.div_APreventContainer = div_APreventContainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        window.document.getElementById("div_FContainer").innerHTML=newitem.div_FContainer;
        window.document.getElementById("div_ARootContainer").innerHTML=newitem.div_ARootContainer;
        window.document.getElementById("div_APreventContainer").innerHTML=newitem.div_APreventContainer;
        newitem.div_FContainer="";
        newitem.div_ARootContainer="";
        newitem.div_APreventContainer="";
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
                case "QA审核":$scope.item.txt_FQAManager_value =  val;break;
                case "财务审核":$scope.item.txt_FFinanceManager_value =  val;break;
                case "处理":$scope.item.txt_FProcessing_value =  val;break;
                case "批准":$scope.item.txt_FApprove_value =  val;break;
                case "IPMT审核":$scope.item.txt_FIPMTAudit_value =  val;break;
                case "跟踪":$scope.item.txt_TTracePerson_value =  val;break;
                case "异常处理":$scope.item.txt_AProcessing_value =  val;break;
                case "异常审核":$scope.item.txt_AMagnege_value =  val;break;
                case "确认":$scope.item.txt_CConfirm_value =  val;break;
                case "多人会签":$scope.item.FSign_list.push($scope.item.approvalRecord[i]);break;
                default:break;
            }
        }
        switch ($scope.item.txt_FDocCurrentStatus){
            case "重新提交":$scope.item.txt_FAuthor_value =  "";break;
            case "QA审核":$scope.item.txt_FQAManager_value =  "";break;
            case "财务审核":$scope.item.txt_FFinanceManager_value =  "";break;
            case "处理":$scope.item.txt_FProcessing_value =  "";break;
            case "批准":$scope.item.txt_FApprove_value =  "";break;
            case "IPMT审核":$scope.item.txt_FIPMTAudit_value =  "";break;
            case "跟踪":$scope.item.txt_TTracePerson_value =  "";break;
            case "异常处理":
                $scope.item.txt_AProcessing_value =  "";
                $scope.controlApproval.controlID="txt_AMagnege";
                if($scope.item.txt_AMagnege_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "异常审核":
                $scope.item.txt_AMagnege_value =  "";
                $scope.controlApproval.controlID="txt_CConfirm";
                if($scope.item.txt_CConfirm_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "确认":$scope.item.txt_CConfirm_value =  "";break;
            default:break;
        }
        initImgOnClick(["div_FContainer","div_ARootContainer","div_APreventContainer"]);
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
            var affPara;
            if(isUpdateSignInfor||isUpdateReplyInfor){
                affPara = [];
                if(isUpdateSignInfor){
                    var hidVontainer1 = encodeURIComponent($scope.item.hidVontainer1);
                    affPara.push({"FName":"hidVontainer1","FText":hidVontainer1,"FValue":hidVontainer1,"FType":""});
                }
                if(isUpdateReplyInfor){
                    var hidVontainer2 = encodeURIComponent($scope.item.hidVontainer2);
                    affPara.push({"FName":"hidVontainer2","FText":hidVontainer2,"FValue":hidVontainer2,"FType":""});
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
        if(isUpdateSignInfor||isUpdateReplyInfor){
            affPara= [];
            if(isUpdateSignInfor){
                var hidVontainer1 = encodeURIComponent($scope.item.hidVontainer1);
                affPara.push({"FName":"hidVontainer1","FText":hidVontainer1,"FValue":hidVontainer1,"FType":""});
            }
            if(isUpdateReplyInfor){
                var hidVontainer2 = encodeURIComponent($scope.item.hidVontainer2);
                affPara.push({"FName":"hidVontainer2","FText":hidVontainer2,"FValue":hidVontainer2,"FType":""});
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
