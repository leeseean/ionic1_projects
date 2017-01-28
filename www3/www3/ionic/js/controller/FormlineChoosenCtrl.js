/**
 * Created by Boyz.X on 2015/7/14.
 */
ionicApp.controller('FormlineChoosenCtrl',function($scope,$http,$stateParams,$state,$window,showAlert){
        var ListID = eval("("+ $stateParams.ListID+")");
        var ID = eval("("+$stateParams.ID+")");
        var formId = eval("("+$stateParams.formId+")");
        var formLineId = eval("("+$stateParams.formLineId+")");
        var displayname = [];
        var hideDisplayname=[];//iskey="T"
        var string1 = "[";
        var counter = 0;

        var checkLookupdata;
        //var fieldNameIsQuery=[];
        $scope.searchCondition=[];

        $scope.display=[];                                //用于保存显示字段的内容
        $scope.listinf = [];
        var empName;
        var searchConditionData;

        $http.post(serverUrl+"com.cms.formpatch.pubLookup.queryFormLookup.biz.ext",
            {
                lookupId:ListID,
                formId:formId,
                formLineId:formLineId
            }).success(function(data){
                for(var i=0;i<data.fieldsInfo.length;i++){
                   /* if(data.fieldsInfo[i].ISKEY=="T"){
                        data.fieldsInfo[i].SETFIELD=data.fieldsInfo[i].FIELDNAME;
                       // data.fieldsInfo[i].FIELDNAME=data.fieldsInfo[i].SETFIELD;
                    }*/
                    if(data.fieldsInfo[i].ISKEY=="T"&&data.fieldsInfo[i].ISDISPLAY == "F"){
                       // var a=data.fieldsInfo[i].FIELDNAME;

                       // var value=data.lookupData[0].a;
                       // var jsonstr=data.fieldsInfo[i];
                        //jsonstr.value=111;

                        //jsonstr.parse({value:value});
                        hideDisplayname.push(data.fieldsInfo[i]);
                    }

                    if (data.fieldsInfo[i].ISDISPLAY == "T") {
                        displayname.push(data.fieldsInfo[i]);
                        if(data.fieldsInfo[i].ISQUERY=="T"&&(data.fieldsInfo[i].FIELDNAME)){//&&(data.lookupInfo[0].fields[i].FIELDNAME=="EMP_NAME"||data.lookupInfo[0].fields[i].FIELDNAME=="FIELD4")
                            //fieldNameIsQuery.push(data.lookupInfo[0].fields[i]);
                            var searchCondition1={};
                            searchCondition1.FIELDNAME=data.fieldsInfo[i].FIELDNAME;
                            searchCondition1.DISPLAYNAME=data.fieldsInfo[i].DISPLAYNAME;
                            $scope.searchCondition.push(searchCondition1);
                        }
                    }
                  /*  if(data.fieldsInfo[i].ISKEY=="T"||data.fieldsInfo[i].ISDISPLAY == "T"){
                        displayname.push(data.fieldsInfo[i]);
                    }*/

                }

            });
       /* $http.post(serverUrl+"com.cms.formpatch.pubLookup.queryFormLookupDataInfo.biz.ext",
            {lookupId:ListID})
                 .success(function(data){
                for(var i = 0 ; i<data.lookupInfo[0].fields.length ; i++) {
                if(data.lookupInfo[0].fields[i].ISKEY=="T"){
                    data.lookupInfo[0].fields[i].SETFIELD  =  data.lookupInfo[0].fields[i].FIELDNAME;
                }
                if (data.lookupInfo[0].fields[i].ISDISPLAY == "T") {
                    displayname.push(data.lookupInfo[0].fields[i]);
                    if(data.lookupInfo[0].fields[i].ISQUERY=="T"&&(data.lookupInfo[0].fields[i].FIELDNAME)){//&&(data.lookupInfo[0].fields[i].FIELDNAME=="EMP_NAME"||data.lookupInfo[0].fields[i].FIELDNAME=="FIELD4")
                        //fieldNameIsQuery.push(data.lookupInfo[0].fields[i]);
                        var searchCondition1={};
                        searchCondition1.FIELDNAME=data.lookupInfo[0].fields[i].FIELDNAME;
                        searchCondition1.DISPLAYNAME=data.lookupInfo[0].fields[i].DISPLAYNAME;
                        $scope.searchCondition.push(searchCondition1);
                    }
                }
            }
        });*/


/*    $http.post(serverUrl+"com.cms.formpatch.pubLookup.queryLookupSourceEx2.biz.ext",
        {
            lookupId:4126,
            formId:504,
            fieldId:4127
        }).success(function(data){
            var dat=data;
        });*/
/*
    $http.post(serverUrl+"com.cms.formpatch.pubLookup.queryLookupSourceEx2.biz.ext",
        {
            lookupId:ListID,
            formId:formId,
            fieldId:ID
        }).success(function(data){
            var dat=data;
        });
*/
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
               // var x="self.criteria={_expr: " + string1 + ",_entity: 'com.wfdemo.newdataset.AC_APPLICATION'}";
                eval("self.criteria={_expr: " +string1+ ",_entity: 'com.wfdemo.newdataset.AC_APPLICATION'}");
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
                    JSON.stringify(thedata))
                    .success(function(data){
                        checkLookupdata=data.lookupData;
                        if(checkLookupdata==""){
                            showAlert("查找结果不存在，请输入其他条件");
                        }
                   /*     displayname = [];
                        for(var i = 0 ; i<data.lookupInfo.fields.length ; i++) {
                            if (data.lookupInfo.fields[i].ISDISPLAY == "T") {
                                displayname.push(data.lookupInfo.fields[i]);
                            }
                        }*/
                        for(var i = 0 ; i < data.lookupData.length; i++){
                            $scope.display[i] = [];
                            counter = 0;
                            for(each in data.lookupData[i]){
                                counter++;
                                for(var j = 0 ; j< displayname.length ; j++){
                                    if (displayname[j].FIELDNAME == each && each!="MJKBGR") {//each!="MJKBGR"不直接返回保管人

                                        $scope.display[i].push({FIELDNAME:displayname[j].DISPLAYNAME,Value:data.lookupData[i][each],MarkValue:displayname[j].FIELDNAME});

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

        };
        $scope.chose = function(index){
            var i = $scope.display[index];
          //  $state.go('formline',{list:JSON.stringify(list),datalist:JSON.stringify($scope.id),savedata:JSON.stringify(savedata),title:$stateParams.title,backupDisplay:$stateParams.backupDisplay,backupgroup:$stateParams.backupgroup,formData:$stateParams.formData});
                $state.go('formlineinput',{fieldName:$stateParams.fieldName,choosen:JSON.stringify(i),title:$stateParams.title,MENULABEL:$stateParams.title,instance:$stateParams.instance,datalist:$stateParams.datalist,backupDisplay:$stateParams.backupDisplay,Selectlist:$stateParams.Selectlist,savedata:$stateParams.savedata,backupgroup:$stateParams.backupgroup,formData:$stateParams.formData,backupDefault:$stateParams.backupDefault,hideDisplayname:JSON.stringify(hideDisplayname),backuphideDisplayname:$stateParams.backuphideDisplayname});

        }
        $scope.back = function(){
           // $state.go('formdetial');
            $window.history.back();
           // $state.go('formline',{list:JSON.stringify(list),datalist:JSON.stringify($scope.id),title:$stateParams.title,backupDisplay:$stateParams.backupDisplay,backupgroup:$stateParams.backupgroup,formData:$stateParams.formData});

        }
})