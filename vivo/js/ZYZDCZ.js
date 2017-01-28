/**
 * Created by GZW on 2015/12/21.
 */
/**
 * Created by GZW on 2015/8/3.
 */
appMain.controller('ZYZDCZCtrl',function($scope,simplePopUp,approvalFactory,$state,$ionicLoading,linkDatas,bpmCommonFunc) {
    $scope.cnNumber = cnNumber;
    $scope.controlApproval={isCanApproval:true,controlID:"",approvaler:""};
    var selectColumn=all_selectColumn+";sel_Train;" +
        "txt_FAuthor_text;txt_FSignAudit_text;txt_FSystemAudit_text;txt_FApproval_text;txt_FReaders_text" +
        ";txt_FTranFiction_text;txt_FTranAudit_text;txt_FTranReaders_text";
    var encryptionColumn = "hidVontainer01;hidVontainer02;hidQCHtmlContext";
    var param = {
        selectColumn: selectColumn+";"+encryptionColumn,
        encryptionColumnn:encryptionColumn,
        isGetList:false
    };
    linkDatas.getKeyAndForm(param, function (newitem) {
        newitem.sel_Train=getSelectVal(newitem.sel_Train);
        var hidVontainer = decodeURIComponent(newitem.hidVontainer01);
        var hidVontainer2 = decodeURIComponent(newitem.hidVontainer02);
        var hidQCHtmlContext = decodeURIComponent(newitem.hidQCHtmlContext);
        newitem.hidVontainer01 = hidVontainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.hidVontainer02 = hidVontainer2.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.hidQCHtmlContext = hidQCHtmlContext.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.hidQCHtmlContext='<table class="VTable bordered AttachmentPermission" id="QCHtmlContext" style="width: 100%;">'+newitem.hidQCHtmlContext+'</table>';
        window.document.getElementById("hidVontainer01").innerHTML=newitem.hidVontainer01;
        window.document.getElementById("hidVontainer02").innerHTML=newitem.hidVontainer02;
        window.document.getElementById("hidQCHtmlContext").innerHTML=newitem.hidQCHtmlContext;
        newitem.hidVontainer01="";
        newitem.hidQCHtmlContext="";
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
                case "会签":$scope.item.txt_FSignAudit_value=$scope.item.txt_FSignAudit_value?$scope.item.txt_FSignAudit_value+"<br/>"+val+"；":val+"；";break;
                case "体系审核":$scope.item.txt_FSystemAudit_value =  val;break;
                case "批准":$scope.item.txt_FApproval_value =  val;break;
                case "培训拟制":$scope.item.txt_FTrainAuthor_value =  val;break;
                case "培训审核":$scope.item.txt_FTrainAuthor_value =  val;break;
                default:break;
            }
        }
        switch ($scope.item.txt_FDocCurrentStatus){
            case "重新提交":$scope.item.txt_FAuthor_value =  "";break;
            case "体系审核":$scope.item.txt_FSystemAudit_value =  "";break;
            case "批准":$scope.item.txt_FApproval_value =  "";break;
            case "培训拟制":
                $scope.item.txt_FTrainAuthor_value =  "";
                break;
            case "培训审核":$scope.item.txt_FTranAudit_value =  "";break;
            default:break;
        }
        initImgOnClick(["hidVontainer01","hidVontainer02"]);
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
    $scope.togglChangeFileText =function(){
        $scope.isShowChangeFileText = !$scope.isShowChangeFileText;
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
    var isUpdateChange = false;
    $scope.updateChange = function(){
        simplePopUp.areaPopup("培训记录",$scope.item.hidVontainer02,function(text){
            $scope.item.hidVontainer02 = text;
            window.document.getElementById("hidVontainer02").innerHTML=text;
            isUpdateChange = true;
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
            if(isUpdateChange){
                var affPara = [];
                var hidVontainer = encodeURI($scope.item.hidVontainer02);
                affPara.push({"FName":"hidVontainer02","FText":hidVontainer,"FValue":hidVontainer,"FType":""});
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
        if(isUpdateChange){
            var affPara = [];
            var hidVontainer = encodeURI($scope.item.hidVontainer02);
            affPara.push({"FName":"hidVontainer02","FText":hidVontainer,"FValue":hidVontainer,"FType":""});
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
