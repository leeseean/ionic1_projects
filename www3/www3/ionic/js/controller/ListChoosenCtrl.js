/**
 * Created by Boyz.X on 2015/7/14.
 */
ionicApp.controller('listChoosenCtrl',function($scope,$http,$stateParams,$state,$window,showAlert){
        var ListID = eval("("+ $stateParams.ListID+")");     //将Fromdetial中传过来的lookupid进行解释
        var ID = eval("("+$stateParams.ID+")");             //将formdetial中传过来的fieldId进行解释
        var formId = eval("("+$stateParams.formId+")");     //将formdetial仲传过来的formId进行解释       以上三个数据用于查询时使用
        var displayname = [];
        var hideDisplayname=[];//iskey="T"
        var counter = 0;
        $scope.display=[];                                //用于保存显示字段的内容
        $scope.listinf = [];
        var empName;
        var searchConditionData;

        $scope.searchCondition=[];

        $http.post(serverUrl+"com.cms.formpatch.pubLookup.queryFormLookup.biz.ext",
            {
                lookupId:ListID,
                formId:formId,
                fieldId:ID
            }).success(function(data){
                for(var i=0;i<data.fieldsInfo.length;i++){
                   /* if(data.fieldsInfo[i].ISKEY=="T"){
                        data.fieldsInfo[i].SETFIELD=data.fieldsInfo[i].FIELDNAME;
                    }*/
                    if(data.fieldsInfo[i].ISKEY=="T"&&data.fieldsInfo[i].ISDISPLAY == "F"){

                        hideDisplayname.push(data.fieldsInfo[i]);
                    }
                    if (data.fieldsInfo[i].ISDISPLAY == "T") {
                        displayname.push(data.fieldsInfo[i]);
                        if(data.fieldsInfo[i].ISQUERY=="T"&&(data.fieldsInfo[i].FIELDNAME)){
                            var searchCondition1={};
                            searchCondition1.FIELDNAME=data.fieldsInfo[i].FIELDNAME;
                            searchCondition1.DISPLAYNAME=data.fieldsInfo[i].DISPLAYNAME;
                            $scope.searchCondition.push(searchCondition1);

                            //string1 = string1 + '{"EMP_NAME":empName,"_op":"like"},';
                        }
                    }
                }
            });

/*        $http.post(serverUrl+"com.cms.formpatch.pubLookup.queryFormLookupDataInfo.biz.ext",
            {lookupId:ListID})
            .success(function(data){
                for(var i = 0 ; i<data.lookupInfo[0].fields.length ; i++) {
                    if(data.lookupInfo[0].fields[i].ISKEY=="T"){
                       data.lookupInfo[0].fields[i].SETFIELD  =  data.lookupInfo[0].fields[i].FIELDNAME;
                    }
                    if (data.lookupInfo[0].fields[i].ISDISPLAY == "T") {
                        displayname.push(data.lookupInfo[0].fields[i]);
                       if(data.lookupInfo[0].fields[i].ISQUERY=="T"&&(data.lookupInfo[0].fields[i].FIELDNAME)){
                            var searchCondition1={};
                              searchCondition1.FIELDNAME=data.lookupInfo[0].fields[i].FIELDNAME;
                              searchCondition1.DISPLAYNAME=data.lookupInfo[0].fields[i].DISPLAYNAME;
                              $scope.searchCondition.push(searchCondition1);

                           //string1 = string1 + '{"EMP_NAME":empName,"_op":"like"},';
                       }
                    }
                }

            });*/

        $scope.search = function(){
            empName=document.getElementById("search").value;
            searchConditionData=document.getElementById("searchCondition").value.trim();
            for(var x in $scope.searchCondition){
                if(searchConditionData==$scope.searchCondition[x].DISPLAYNAME){
                    var fieldName=$scope.searchCondition[x].FIELDNAME;
                    var string1 = "[";
                    string1 = string1 + '{"' + fieldName + '":empName,"_op":"like"},';
                }
            }


            string1 = string1 + "]";

            var x = "self.criteria={_expr: " + string1 + ",_entity: 'com.wfdemo.newdataset.AC_APPLICATION'}";
            eval("self.criteria={_expr: " + string1 + ",_entity: 'com.wfdemo.newdataset.AC_APPLICATION'}");
            var page = {pageIndex:0,pageSize:5}
            var thedata = {
                criteria:self.criteria,
                fieldId:ID,
                formId:formId,
                formLineId:"",
                instanceId:"",
                lookupId:ListID,
                page:page,
                pageIndex:"",
                pageSize:"",
                sortField:"",
                sortOrder:""
            };
            $http.post(serverUrl+"cmspublish/com.cms.formpatch.pubLookup.queryLookupSource.biz.ext",
                JSON.stringify(thedata)
           /* {
                lookupId:ListID,
                formId:formId,
                fieldId:ID
            }*/)
                .success(function(data){
                    if(data.lookupData==""){
                        showAlert("查找结果不存在，请输入其他条件");
                    }
                    displayname = [];
                    for(var i = 0 ; i<data.lookupInfo.fields.length ; i++) {
                        if (data.lookupInfo.fields[i].ISDISPLAY == "T") {
                            displayname.push(data.lookupInfo.fields[i]);
                        }
                    }
                    for(var i = 0 ; i < data.lookupData.length; i++){
                        $scope.display[i] = [];
                        counter = 0;
                        for(each in data.lookupData[i]){
                            counter++;
                            for(var j = 0 ; j< displayname.length ; j++){
                                if (displayname[j].FIELDNAME == each && each!="MJKBGR") {//each!="MJKBGR"不直接返回保管人

                                        $scope.display[i].push({FIELDNAME:displayname[j].DISPLAYNAME,Value:data.lookupData[i][each],MarkValue:displayname[j].SETFIELD});

                                }
                            }
                        }
                    }

                    for(var i = 0 ; i < data.lookupData.length; i++){

                        for(each in data.lookupData[i]){

                            for(var j = 0 ; j< hideDisplayname.length ; j++){
                                if (hideDisplayname[j].FIELDNAME == each ) {
                                    hideDisplayname[j].value=data.lookupData[i][each];
                                }
                            }
                        }
                    }
                })
        }
        $scope.chose = function(index){
            var i = $scope.display[index];
            $state.go('formdetial',{fieldName:$stateParams.fieldName,choosen:JSON.stringify($scope.display[index]),MENULABEL:$stateParams.title,instance:$stateParams.instance,firstChoosen:$stateParams.firstChoosen,backupgroup:$stateParams.backupgroup,backupDisplay:$stateParams.backupDisplay,hideDisplayname:JSON.stringify(hideDisplayname),backuphideDisplayname:$stateParams.backuphideDisplayname});
        }
        $scope.back = function(){
           // $state.go('formdetial');
            $window.history.back();
        }
})