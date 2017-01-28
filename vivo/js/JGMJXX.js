/**
 * Created by GZW on 2015/8/3.
 */
appMain.controller('JGMJXXCtrl',function($scope,simplePopUp,approvalFactory,$state,$ionicLoading,linkDatas,bpmCommonFunc) {
    $scope.cnNumber = cnNumber;
    var jgmjxx_selectColumn =all_selectColumn+";sel_FMachineType;sel_FMouldManufacturer;txt_FReason;sel_FPriceConfirmation;txt_FRemark;txt_FQuotationSuggest;txt_FAuthor_text;txt_FManager_text;txt_FManager2_text;txt_FApprove_text;txt_FRelease_text;txt_FReaders_text;txt_FContractConfirmation_text";
    var param = {
        selectColumn: jgmjxx_selectColumn,
        encryptionColumnn:"",
        isGetList:false
    };
    linkDatas.getKeyAndForm(param, function (newitem) {
        newitem.sel_FMachineType=getSelectVal(newitem.sel_FMachineType);
        newitem.sel_FMouldManufacturer=getSelectVal(newitem.sel_FMouldManufacturer);
        newitem.sel_FPriceConfirmation=getSelectVal(newitem.sel_FPriceConfirmation);
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
                case "审核1":$scope.item.txt_FManager_value =  val;break;
                case "审核2":$scope.item.txt_FManager2_value =  val;break;
                case "批准":$scope.item.txt_FApprove_value =  val;break;
                case "发布":$scope.item.txt_FRelease_value =  val;break;
                case "合同确认":$scope.item.txt_FContractConfirmation_value = val;break;
                default:break;
            }
        }
        switch ($scope.item.txt_FDocCurrentStatus){
            case "重新提交":$scope.item.txt_FAuthor_value =  "";break;
            case "审核1":$scope.item.txt_FManager_value =  "";break;
            case "审核2":$scope.item.txt_FManager2_value =  "";break;
            case "批准":$scope.item.txt_FApprove_value =  "";break;
            case "发布":$scope.item.txt_FRelease_value =  "";break;
            case "合同确认":$scope.item.txt_FContractConfirmation_value =  "";break;
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
    $scope.togglSignText =function(){
        $scope.isShowSignText = !$scope.isShowSignText;
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
            if(isUpdateSignInfor||isUpdateReplyInfor){
                var affPara = [];
                if(isUpdateSignInfor){
                    var hidVontainer1 = encodeURIComponent($scope.item.hidVontainer1);
                    affPara.push({"FName":"hidVontainer1","FText":hidVontainer,"FValue":hidVontainer,"FType":""});
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
                affPara.push({"FName":"hidVontainer1","FText":hidVontainer,"FValue":hidVontainer,"FType":""});
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
