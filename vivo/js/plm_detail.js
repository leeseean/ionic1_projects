/**
 * Created by GZW on 2015/8/3.
 */
appMain.controller('plmCtrl',function($scope,simplePopUp,approvalFactory,$state,$ionicLoading,linkDatas,bpmCommonFunc) {
    $scope.cnNumber = cnNumber;
    //plm流程获取详细的字段
    var plm_selectColumn =all_selectColumn+
        ";txt_FDocType;txt_FPLMVersion;txt_FProjectActivity;txt_BTLCode;txt_FVersionRemark"
            //+";txt_FProjectActivity;txt_BTLCode;txt_FVersionRemark;sel_FNewSoftwareReq;sel_FSoftwareAdvise;sel_FHardwareCompatibility;txt_FHardRemark;sel_FSaleSwitch"
        +";txt_FDocType_value"
            //以下是v001
        +";sel_FNewSoftwareReq;txt_FOthersDes;sel_FHardwareCompatibility;sel_FIsSwitching;txt_FHardRemark;sel_FSaleSwitch;sel_FSoftwareAdvise;txt_FSaleSwitchRemark"
            //以下是v002
        +";chk_FProductType;chk_FTechnicalField;chk_FTechnicalStage;chk_FailureMode;txt_FMaterialDes"
            //以下是v003
        +";sel_FPolicy;txt_FPolicyRemark"
            //以下是v004
        +";sel_FTechType;sel_FDocType"
            //以下是v005
        +";sel_FEleType;txt_FShapeNo"
        +";div_FIsSign;txt_FAuthor_text;txt_FManager_text;txt_FSign_text;txt_FMinister_text;txt_FReaders_text"
        +";txt_FCFGManager_text;txt_FSELPDTUser_text;sel_FApprovalProcess";
    var plm_encryptionColumn = "txt_BTLCode";

    var param = {
        selectColumn: plm_selectColumn,
        encryptionColumnn:plm_encryptionColumn,
        isGetList:false
    };
    linkDatas.getKeyAndForm(param, function (newitem) {
        var txt_BTLCode = decodeURIComponent(newitem.txt_BTLCode);
        newitem.txt_BTLCode = txt_BTLCode.replace(/\+/g," ");
        newitem.sel_FApprovalProcess = getSelectVal(newitem.sel_FApprovalProcess);
        switch (newitem.txt_FDocType_value){
            case "v001":
                newitem.sel_FNewSoftwareReq=getSelectVal(newitem.sel_FNewSoftwareReq);
                newitem.sel_FHardwareCompatibility=getSelectVal(newitem.sel_FHardwareCompatibility);
                newitem.sel_FIsSwitching=getSelectVal(newitem.sel_FIsSwitching);
                newitem.sel_FSaleSwitch=getSelectVal(newitem.sel_FSaleSwitch);
                newitem.sel_FSoftwareAdvise=getSelectVal(newitem.sel_FSoftwareAdvise);
                break;
            case "v002":
                newitem.chk_FProductType=getCheckBoxVal(newitem.chk_FProductType);
                newitem.chk_FTechnicalField=getCheckBoxVal(newitem.chk_FTechnicalField);
                newitem.chk_FTechnicalStage=getCheckBoxVal(newitem.chk_FTechnicalStage);
                newitem.chk_FailureMode=getCheckBoxVal(newitem.chk_FailureMode);
                break;
            case "v003":newitem.sel_FPolicy=getSelectVal(newitem.sel_FPolicy);break;
            case "v004":
                newitem.sel_FTechType=getSelectVal(newitem.sel_FTechType);
                newitem.sel_FDocType=getSelectVal(newitem.sel_FDocType);
                break;
            case "v005":newitem.sel_FEleType=getSelectVal(newitem.sel_FEleType);break;
            default :break;
        }
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
        //$scope.isBuyer = false;
        $scope.isShowFooterInput = false;
        $scope.isShowAuditInformation = false;
        $scope.item.optionInput = "";
        $scope.item.showFAuthor3 = false;
        $scope.item.FSign_list =[];
        for(var i= 0,l=$scope.item.approvalRecord.length;i<l;i++){
            if($scope.item.approvalRecord[i].HandleUserID!=""){
                var val = $scope.item.approvalRecord[i].HandleUserName+"，"
                    +$scope.item.approvalRecord[i].HandleTime+"，"
                    +$scope.item.approvalRecord[i].HandleOpinion;
                switch ($scope.item.approvalRecord[i].ApprovalNodeName){
                    case "拟制":$scope.item.txt_FAuthor_value =  val;break;
                    case "重新提交":$scope.item.txt_FAuthor_value =  val;break;
                    case "拟制人主管审核":$scope.item.txt_FManager_value =  val;break;
                    case "配置管理员审核":$scope.item.txt_FCFGManager_value =  val;break;
                    case "相关单位会签":
                        $scope.item.txt_FSign_value =  val;
                        $scope.item.FSign_list.push($scope.item.approvalRecord[i]);
                        if($scope.item.approvalRecord[i].HandleOpinion.indexOf("不同意")){
                            $scope.item.showFAuthor3=true;
                        }
                        break;
                    case "拟制人确认":$scope.item.txt_FAuthor_value3 =  val;break;
                    case "拟制者部长审核":$scope.item.txt_FMinister_value =  val;break;
                    case "SE/LPDT审批":$scope.item.txt_FSELPDTUser_value =  val;break;
                    default:break;
                }
            }
        }
        switch ($scope.item.txt_FDocCurrentStatus){
            case "重新提交":$scope.item.txt_FAuthor_value =  "";break;
            case "拟制人主管审核":$scope.item.txt_FManager_value =  "";break;
            case "配置管理员审核":$scope.item.txt_FCFGManager_value =  "";break;
            case "相关单位会签":$scope.item.txt_FSign_value =  "";break;
            case "拟制人确认":$scope.item.txt_FAuthor_value3 =  "";break;
            case "拟制者部长审核":$scope.item.txt_FMinister_value =  "";break;
            case "SE/LPDT审批":$scope.item.txt_FSELPDTUser_value =  "";break;
            default:break;
        }
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
    $scope.toggleAuditInformation =function(){
        $scope.isShowAuditInformation = !$scope.isShowAuditInformation;
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
    $scope.getContentBottom=function(){
        var ret = "";
        if($scope.isTodo=="0"){
            if($scope.isShowFooterInput){
                ret='has-footer1';
            }else{
                ret='has-footer';
            }
        }
        /*if($scope.isByList=="0"){
            ret+=' has-header';
        }*/
        return ret;
    };
    //点击提交事件
    $scope.clickSubmit = function(){
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
            approvalFactory.PwdAndApprove(auditFlag,auditPwd,documentId,$scope.item.optionInput,"",function(){
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
        approvalFactory.Approval(auditFlag,documentId,$scope.item.optionInput,"",function(){
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
