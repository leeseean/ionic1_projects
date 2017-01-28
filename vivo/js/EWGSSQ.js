/**
 * Created by GZW on 2015/8/3.
 */
appMain.controller('EWGSSQCtrl',function($scope,simplePopUp,approvalFactory,$state,$ionicLoading,linkDatas,bpmCommonFunc,$ionicScrollDelegate) {
    $scope.cnNumber = cnNumber;
    $scope.searchdata = {isEdit:false,inputval:"",retData:[],selectedDatas:[],isLoad:false,count:10,pageId:0,isLoading:false,imgSrc:sshFileUrl+"img/default_avatar.png"};
    var selectColumn = all_selectColumn+";sel_FExceptionClass;sel_FExceptionType;txt_FSupportFile;txt_FSupplierCode;txt_FDescription;txt_FPeopleNumber;txt_FSingleTime;" +
        "txt_FBeat;txt_FExceptionDate;txt_FResponsiblePerson_text;txt_FProjectReason;txt_FReponsibLeDepart_text;txt_FReponsibLeDepart_value;div_FIsSign" +
        ";txt_FAuthor_text;txt_FApprove_text;txt_FReaders_text;" +
        "txt_F2Number;txt_F2BadProportion;txt_F2UseTime;txt_F2Remark;txt_F2Author_text;txt_F2Manager_text;txt_F2Readers_text;" +
        "txt_SSignAuthor_text;txt_SReaders_text;div_RIsDeduct;txt_RFiction_text;txt_RCheck_text;txt_RReaders_text;txt_DAuthor_text;txt_DReaders_text";
    var encryptionColumn="div_FContainer;div_F2Container;div_SContainer;div_RContainer;div_DContainer";
    $scope.controlApproval={isCanApproval:true,controlID:"",approvaler:""};
    var param = {
        selectColumn: selectColumn+";"+encryptionColumn,
        encryptionColumnn:encryptionColumn,
        isGetList:false
    };
    linkDatas.getKeyAndForm(param, function (newitem) {
        newitem.sel_FExceptionClass=getSelectVal(newitem.sel_FExceptionClass);
        newitem.sel_FExceptionType=getSelectVal(newitem.sel_FExceptionType);
        var div_FContainer = decodeURIComponent(newitem.div_FContainer);
        var div_F2Container = decodeURIComponent(newitem.div_F2Container);
        var div_SContainer = decodeURIComponent(newitem.div_SContainer);
        var div_RContainer = decodeURIComponent(newitem.div_RContainer);
        var div_DContainer = decodeURIComponent(newitem.div_DContainer);
        newitem.div_FContainer = div_FContainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.div_F2Container = div_F2Container.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.div_SContainer = div_SContainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.div_RContainer = div_RContainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        newitem.div_DContainer = div_DContainer.replace(/\+/g," ").replace(/\<table/g,'<div class="ViceText-scroll"><table').replace(/\<\/table>/g,'</table></div>');
        window.document.getElementById("div_FContainer").innerHTML=newitem.div_FContainer;
        window.document.getElementById("div_F2Container").innerHTML=newitem.div_F2Container;
        window.document.getElementById("div_SContainer").innerHTML=newitem.div_SContainer;
        window.document.getElementById("div_RContainer").innerHTML=newitem.div_RContainer;
        window.document.getElementById("div_DContainer").innerHTML=newitem.div_DContainer;
        newitem.div_FContainer="";
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
        //setTimeout($scope.updateDept,1000);
    });

    //初始化页面，点击下一页上一页的时候会重复调用
    $scope.init = function(){
        $scope.isShowMainText = true;
        $scope.isShowMainText2 = true;
        $scope.isShowSignText = true;
        $scope.isShowSignText2 = true;
        $scope.isShowReplyText = true;
        $scope.isShowFooterInput = false;
        $scope.isShowAuditInformation = false;
        $scope.isShowSelect = false;
        $scope.item.optionInput = "";

        for(var i= 0,l=$scope.item.approvalRecord.length;i<l;i++){
            if($scope.item.approvalRecord[i].HandleUserID=="")continue;
            var val = $scope.item.approvalRecord[i].HandleUserName+"，"
                +$scope.item.approvalRecord[i].HandleTime+"，"
                +$scope.item.approvalRecord[i].HandleOpinion;
            switch ($scope.item.approvalRecord[i].ApprovalNodeName){
                case "拟制":$scope.item.txt_FAuthor_value =  val;break;
                case "重新提交":$scope.item.txt_FAuthor_value =  val;break;
                case "审批":$scope.item.txt_FApprove_value =  val;break;
                case "正文2拟制":$scope.item.txt_F2Author_value =  val;break;
                case "正文2审核":$scope.item.txt_F2Manager_value =  val;break;
                case "签收":$scope.item.txt_SSignAuthor_value =  val;break;
                case "回复拟制":$scope.item.txt_RFiction_value =  val;break;
                case "回复审核":$scope.item.txt_RCheck_value =  val;break;
                case "扣款签收":$scope.item.txt_DAuthor_value =  val;break;
                default:break;
            }
        }
        switch ($scope.item.txt_FDocCurrentStatus){
            case "重新提交":$scope.item.txt_FAuthor_value =  "";break;
            case "审批":$scope.item.txt_FApprove_value =  "";break;
            case "正文2拟制":
                $scope.item.txt_F2Author_value =  "";
                $scope.controlApproval.controlID="txt_F2Manager";
                if($scope.item.txt_F2Manager_text==null||$scope.item.txt_F2Manager_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "正文2审核":
                $scope.item.txt_F2Manager_value =  "";
                $scope.controlApproval.controlID="txt_SSignAuthor";
                if($scope.item.txt_SSignAuthor_text==null||$scope.item.txt_SSignAuthor_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "签收":
                $scope.item.txt_SSignAuthor_value =  "";
                $scope.controlApproval.controlID="txt_RFiction";
                if($scope.item.txt_RFiction_text==null||$scope.item.txt_RFiction_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "回复拟制":
                $scope.item.txt_RFiction_value =  "";
                $scope.controlApproval.controlID="txt_RCheck";
                if($scope.item.txt_RCheck_text==null||$scope.item.txt_RCheck_text==""){
                    $scope.controlApproval.isCanApproval= false;
                }
                break;
            case "回复审核":$scope.item.txt_RCheck_value =  "";break;
            case "扣款签收":$scope.item.txt_DAuthor_value =  "";break;
            default:break;
        }
        initImgOnClick(["div_FContainer","div_F2Container","div_SContainer","div_RContainer","div_DContainer"]);
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
    $scope.toggleMainText2 =function(){
        $scope.isShowMainText2 = !$scope.isShowMainText2;
    };
    $scope.togglSignText =function(){
        $scope.isShowSignText = !$scope.isShowSignText;
    };
    $scope.togglSignText2 =function(){
        $scope.isShowSignText2 = !$scope.isShowSignText2;
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
    $scope.clickAttach = function(data){
        simplePopUp.confirmDownload(data.FAttachmentName,data.FAttachmentSize,function(){
            var fileName = data.DownFtpUrl.substr(attachUrl.length,data.DownFtpUrl.length);
            bpmCommonFunc.checkDownLoad(fileName,data.FAttachmentName,data.FAttachmentSize,data.FFormInsID,data.FID,data.FFormControlID);
        });
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
    //-----------------------------------------------修改部门-----------------------------------------------------------
    $scope.updateDept = function(){
        if($scope.item["txt_FReponsibLeDepart_value"]!=""){
            var regSplitor = /[,;]/;
            var vals=$scope.item["txt_FReponsibLeDepart_value"].split(regSplitor);
            var names = $scope.item["txt_FReponsibLeDepart_text"].split(regSplitor);
            for(var i=0;i<vals.length;i++){
                $scope.searchdata.selectedDatas[i] = {FDepartmentID:vals[i],FChinaName:names[i]};
            }
        }
        $scope.isShowSelect = true;
        $scope.searchdata.isLoad = false;
        $scope.searchdata.pageId = 0;
        window.document.getElementById("spinnerDiv").style.display="block";
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        $scope.queryMore();

        var oUl = document.getElementById("query_content");
        oUl.onscroll=function(event) {
            if($scope.searchdata.isLoad){
                if (oUl.scrollTop + oUl.clientHeight+10 > oUl.scrollHeight) {
                    window.document.getElementById("spinnerDiv2").style.display="block";
                    $scope.queryMore();
                }
            }
        }
    };
    $scope.hideSelect = function(isSure){
        $scope.isShowSelect = false;
    };
    $scope.clearSelectInput = function(){
        $scope.searchdata.inputval='';
        $scope.searchdata.pageId = 0;
        $scope.searchdata.retData=[];
        $scope.searchdata.isLoad=false;
        window.document.getElementById("spinnerDiv").style.display="block";
        window.document.getElementById("spinnerDiv2").style.display="none";
        $scope.queryMore();
    };
    $scope.doSearch = function(){
        if( $scope.searchdata.inputval==''){
            $scope.isShowSelect = false;
            $scope.searchdata.isLoad=false;
            $scope.searchdata.retData=[];
        }else{
            $scope.searchdata.pageId = 0;
            $scope.searchdata.retData=[];
            $scope.searchdata.isLoad=false;
            window.document.getElementById("spinnerDiv").style.display="block";
            window.document.getElementById("spinnerDiv2").style.display="none";
            $scope.queryMore();

        }

    };
    $scope.queryMore = function(){
        if($scope.searchdata.isLoading){
            return;
        }
        $scope.searchdata.isLoading = true;

        approvalFactory.queryDept($scope.searchdata.pageId,$scope.searchdata.count,$scope.searchdata.inputval,function(ret){
            window.document.getElementById("spinnerDiv").style.display="none";
            window.document.getElementById("spinnerDiv2").style.display="none";
            $scope.searchdata.isLoading = false;
            var datas = ret;
            for(var j = 0,k=datas.length;j<k;j++){
                for(var i= 0,l=$scope.searchdata.selectedDatas.length;i<l;i++){
                    if(datas[j].FDepartmentID==$scope.searchdata.selectedDatas[i].FDepartmentID){
                        datas[j].selected = true;
                    }
                }
                $scope.searchdata.retData.push(datas[j]);
            }
            if(ret.length>=$scope.searchdata.count-1){
                $scope.searchdata.pageId++;
                $scope.searchdata.isLoad=true;

            }else{
                $scope.searchdata.isLoad=false;
            }

        },
        function(ret){
            $scope.searchdata.isLoading = false;
            if($scope.isShowSelect){
                simplePopUp.showPopup(ret);
            }
            $scope.searchdata.isLoad=false;
            window.document.getElementById("spinnerDiv2").style.display="none";
            window.document.getElementById("spinnerDiv").style.display="none";
        });
    };
    $scope.selectItem = function(data){
        if(!data.selected){
            data.selected = true;
            $scope.searchdata.selectedDatas.push(data);
        }else{
            for(var i= 0,l=$scope.searchdata.selectedDatas.length;i<l;i++){
                if(data.FDepartmentID==$scope.searchdata.selectedDatas[i].FDepartmentID){
                    $scope.searchdata.selectedDatas.splice(i,1);
                    data.selected = false;
                    break;
                }
            }
        }
    };
    $scope.deleteItem = function(num){
        for(var i= 0,l=$scope.searchdata.retData.length;i<l;i++){
            if($scope.searchdata.retData[i].FDepartmentID==$scope.searchdata.selectedDatas[num].FDepartmentID){
                $scope.searchdata.retData[i].selected=false;
                break;
            }
        }
        $scope.searchdata.selectedDatas.splice(num,1);
    };
    $scope.selectSubmit = function(){
        $scope.searchdata.isEdit=true;
        $scope.isShowSelect = false;
        $scope.item["txt_FReponsibLeDepart_value"]="";
        $scope.item["txt_FReponsibLeDepart_text"]="";
        for(var i=0;i<$scope.searchdata.selectedDatas.length;i++){
            $scope.item["txt_FReponsibLeDepart_value"] += $scope.searchdata.selectedDatas[i].FDepartmentID+";";
            $scope.item["txt_FReponsibLeDepart_text"] += $scope.searchdata.selectedDatas[i].FChinaName+";";
        }
        if($scope.searchdata.selectedDatas.length>0){
            $scope.item["txt_FReponsibLeDepart_value"] = $scope.item["txt_FReponsibLeDepart_value"].substr(0,$scope.item["txt_FReponsibLeDepart_value"].length-1);
            $scope.item["txt_FReponsibLeDepart_text"] = $scope.item["txt_FReponsibLeDepart_text"].substr(0,$scope.item["txt_FReponsibLeDepart_text"].length-1);
        }
        $scope.searchdata.inputval='';
        $scope.searchdata.pageId = 0;
        $scope.searchdata.retData=[];
        $scope.searchdata.isLoad=false;
    };
    //-----------------------------------------------修改部门end-----------------------------------------------------------
    $scope.updateRadio = function(code){
        $scope.item[code] = $scope.item[code]=="是"?"否":"是";
        if(!updateVals[code]){
            updateCodes.push(code);
        }
        updateVals[code] = $scope.item[code];
    };

    var isUpdateReplyInfor = false;
    $scope.updateReplyInfor = function(){
        simplePopUp.areaPopup("回复信息",$scope.item.hidVontainer2,function(text){
            $scope.item.hidVontainer2 = text;
            window.document.getElementById("hidVontainer2").innerHTML=text;
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
        if($scope.item.txt_FDocCurrentStatus=="正文2拟制"){
            if($scope.item.txt_F2Number==""){
                simplePopUp.showPopup("正文2数量不能为空！");
                return;
            }else if($scope.item.txt_F2BadProportion==""){
                simplePopUp.showPopup("正文2不良比例不能为空！");
                return;
            }else if($scope.item.txt_F2UseTime==""){
                simplePopUp.showPopup("正文2耗费的工时不能为空！");
                return;
            }
        }
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
        if($scope.item.txt_FDocCurrentStatus=="审批"){
            if($scope.item.txt_FProjectReason==""){
                simplePopUp.showPopup("工程原因不能为空！");
                return;
            }else if($scope.item.txt_FReponsibLeDepart_text==""){
                simplePopUp.showPopup("责任部门不能为空，但是移动系统暂不支持选择部门，请到电脑系统审批，谢谢！");
                return;
            }
        }
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
        //selectContacts(function(selectUser){
                var selectUser = {targetName:"陈浩珍",targetId:"24"};
                simplePopUp.confirmPopup("是否确定选择 "+selectUser.targetName+" 为该流程审批人？",function(){
                    approvalFactory.EditApprovaler(hrefdocumentId,selectUser.targetId,$scope.controlApproval.controlID,function(){
                        simplePopUp.showPopup("设置成功！");
                        $scope.controlApproval.isCanApproval= true;
                        $scope.item[$scope.controlApproval.controlID+"_text"]=selectUser.targetName;
                    });
                });
            /*},
            function(){
                simplePopUp.showPopup("获取联系人异常！");
            });*/
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
            if(updateCodes.length>0){
                affPara = [];
                for(var i= 0,l=updateCodes.length;i<l;i++){
                    var updateVal = encodeURIComponent(updateVals[updateCodes[i]]);
                    affPara.push({"FName":updateCodes[i],"FText":updateVal,"FValue":updateVal,"FType":""});
                }
            }
            if($scope.searchdata.isEdit){
                var updateVal = encodeURIComponent($scope.item["txt_FReponsibLeDepart_value"].replace(",",";"));
                var updateText = encodeURIComponent( $scope.item["txt_FReponsibLeDepart_text"].replace(",",";"));
                if(affPara){
                    affPara.push({"FName":"txt_FReponsibLeDepart","FText":updateText,"FValue":updateVal,"FType":"MultiDept"});
                }else{
                    affPara = [
                        {"FName":"txt_FReponsibLeDepart","FText":updateText,"FValue":updateVal,"FType":"MultiDept"}
                    ];
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
        if($scope.searchdata.isEdit){
            var updateVal = encodeURIComponent($scope.item["txt_FReponsibLeDepart_value"].replace(",",";"));
            var updateText = encodeURIComponent( $scope.item["txt_FReponsibLeDepart_text"].replace(",",";"));
            if(affPara){
                affPara.push({"FName":"txt_FReponsibLeDepart","FText":updateText,"FValue":updateVal,"FType":"MultiDept"});
            }else{
                affPara = [
                    {"FName":"txt_FReponsibLeDepart","FText":updateText,"FValue":updateVal,"FType":"MultiDept"}
                ];
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
