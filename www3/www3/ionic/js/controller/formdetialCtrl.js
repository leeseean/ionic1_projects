/**
* Created by Boyz.X on 2015/7/3.
*/
var selectTime;
var selectDate;
ionicApp.controller('formdetialCtrl',function($scope,$http,$stateParams,$state,$timeout,showAlert,TimePicker,DatePicker){

    var group = [];
    var count = 0;
    var instance = [];
    var datalist;
    var LABLE5_ID;
    var formInstanceID;
    var formData;
    var choosen = eval("("+$stateParams.choosen+")");
    var savedata = eval("("+$stateParams.savedata+")");
    var backupDisplay = eval("("+$stateParams.backupDisplay+")");
    var backupgroup = eval("("+$stateParams.backupgroup+")");
    var Multiselect = eval("("+$stateParams.Multiselect+")");
    var FIELD_NAME = eval("("+$stateParams.FIELD_NAME+")");

    var hideDisplayname=eval("("+$stateParams.hideDisplayname+")");
    var backuphideDisplayname=eval("("+$stateParams.backuphideDisplayname+")");

    //selectTimeplug();

    var myDate=new Date();

    $scope.mSelectTime = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+ myDate.getHours() +":"+myDate.getMinutes()+":"+myDate.getSeconds();

    $scope.group = [];
    $scope.selID = [];
    $scope.groupDisplay = [];
    $scope.isShow = false;
    $scope.title = eval("("+$stateParams.MENULABEL+")");

    if(backuphideDisplayname==null){
        backuphideDisplayname=[];
    }
    if(hideDisplayname!=null){
        backuphideDisplayname.push(hideDisplayname);
    }


    if(backupDisplay != null){
        $scope.groupDisplay = backupDisplay ;
        $scope.group = backupgroup;
        formData = eval("("+$stateParams.formData+")");
        if(formData!=null&&$stateParams.backupDefault!=null){
            $scope.groupDisplay=eval("("+$stateParams.backupDefault+")");
        }
    }else{
        //$scope.groupDisplay=eval("(" + localStorage.getItem("firstChoosen") + ")");
        $http.post(serverUrl+"com.cms.formpatch.formMobile.getFormDataByFormId.biz.ext",
            {formId:$scope.title.FORM_ID,userCode:userCode})
            .success(function(data){
                group = data.mobileMeta;
                formData = data.formData;
                for(var each in group){
/*                  $scope.group[count.valueOf()] = [];*/
                    $scope.group.push(group[each.valueOf()]);       //将group1到groupN里面的数值取出放到新变量scope.group里
                    count++;
                };
                for(var i = 0 ; i < $scope.group.length ; i++){    //判断scope.group的长度进行一层循环
                    $scope.groupDisplay[i] = [];
                    for(var j = 0 ; j < $scope.group[i].length ; j++) {   //判断scope.group[i]里面的长度进行二层循环
                        var flag = $scope.group[i][j].DEFAULT_VALUE;      //设立标记，记录groupN里面某个字段是否有默认值
                        var flag2 = $scope.group[i][j].SOURCE_LIST_ID;
                        var FIELD_NAME = $scope.group[i][j].FIELD_NAME.valueOf();
                        instance = instance + "," + FIELD_NAME;     //用fildName建立新的数组instance
                        if(flag != null) {                                   //判断是否有默认值
                            var DEFAULT_VALUE = $scope.group[i][j].DEFAULT_VALUE.valueOf();   //有默认值，在gDefaultVal里面寻找相应的默认值
                            var DEFAULT_Data = data.gDefaultVal[DEFAULT_VALUE.valueOf()];
                            $scope.groupDisplay[i].push({                     //将相应要显示的字段送到groupDisplay里面
                                DISPLAY_NAME: $scope.group[i][j].DISPLAY_NAME,
                                DISPLAY_TYPE: $scope.group[i][j].DISPLAY_TYPE,
                                FIELD_NAME: $scope.group[i][j].FIELD_NAME,
                                DEFAULT_VALUE:DEFAULT_Data,
                                LABLE_TYPE: $scope.group[i][j].LABLE_TYPE,
                                ID:$scope.group[i][j].ID,
                                REFDATASOURCE:$scope.group[i][j].REFDATASOURCE,
                                SOURCE_LIST_ID: $scope.group[i][j].SOURCE_LIST_ID,
                                Value:DEFAULT_Data,
                                Selectlist:""
                            });
                        }else if($scope.group[i][j].LABLE_TYPE == 15){
                            $scope.groupDisplay[i].push({                     //将相应要显示的字段送到groupDisplay里面
                                DISPLAY_NAME: $scope.group[i][j].DISPLAY_NAME,
                                DISPLAY_TYPE: $scope.group[i][j].DISPLAY_TYPE,
                                FIELD_NAME: $scope.group[i][j].FIELD_NAME,
                                LABLE_TYPE: $scope.group[i][j].LABLE_TYPE,
                                ID:$scope.group[i][j].ID,
                                Value:false
                            });
                        }else if(flag2 != null){
                            $scope.groupDisplay[i].push({                     //将相应要显示的字段送到groupDisplay里面
                                DISPLAY_NAME: $scope.group[i][j].DISPLAY_NAME,
                                DISPLAY_TYPE: $scope.group[i][j].DISPLAY_TYPE,
                                FIELD_NAME: $scope.group[i][j].FIELD_NAME,
                                LABLE_TYPE: $scope.group[i][j].LABLE_TYPE,
                                ID: $scope.group[i][j].ID,
                                SOURCE_LIST_ID: $scope.group[i][j].SOURCE_LIST_ID,
                                Value:"",
                                REFDATASOURCE:$scope.group[i][j].REFDATASOURCE,
                                Selectlist:""
                            });
                        }else{
                            $scope.groupDisplay[i].push({
                                DISPLAY_NAME: $scope.group[i][j].DISPLAY_NAME,
                                DISPLAY_TYPE: $scope.group[i][j].DISPLAY_TYPE,
                                FIELD_NAME: $scope.group[i][j].FIELD_NAME,
                                ID:$scope.group[i][j].ID,
                                LABLE_TYPE: $scope.group[i][j].LABLE_TYPE,
                                REFDATASOURCE:$scope.group[i][j].REFDATASOURCE,
                                Value:""
                            });
                        }
                        if(flag2 != null && ($scope.group[i][j].LABLE_TYPE == 3||$scope.group[i][j].LABLE_TYPE == 17)){
                            $http.post(serverUrl+"com.cms.formpatch.instance.queryComboFieldSource.biz.ext",
                                {selectId:flag2})
                                .success(function(selectlist){
                                    for(var i = 0 ; i < $scope.group.length ; i++){
                                        for(var j = 0 ; j < $scope.group[i].length ; j++){
                                            if($scope.groupDisplay[i][j].Selectlist == "" && ($scope.group[i][j].LABLE_TYPE == 3||$scope.group[i][j].LABLE_TYPE == 17)) {
                                                $scope.groupDisplay[i][j].Selectlist = selectlist.src;
                                                break;
                                            }
                                        }
                                    }
                                })
                        }
                    }
                }
                if(choosen!=null){
                    for(var i = 0 ; i < choosen.length ; i++){
                        for(var j = 0 ; j < $scope.groupDisplay.length ; j++){
                            for(var z = 0 ; z < $scope.groupDisplay[j].length ; z++){
                                if(choosen[i].MarkValue == $scope.groupDisplay[j][z].FIELD_NAME)
                                    $scope.groupDisplay[j][z].Value = choosen[i].Value;
                            }
                        }
                    }
                }
            }
        )}
    if(choosen!=null){
        for(var i = 0 ; i < choosen.length ; i++){
            for(var j = 0 ; j < $scope.groupDisplay.length ; j++){
                for(var z = 0 ; z < $scope.groupDisplay[j].length ; z++){
                    if(choosen[i].MarkValue == $scope.groupDisplay[j][z].FIELD_NAME)
                        $scope.groupDisplay[j][z].Value = choosen[i].Value;
                }
            }
        }
    }
    if(Multiselect!=null){
            for(var j = 0 ; j < $scope.groupDisplay.length ; j++){
                for(var z = 0 ; z < $scope.groupDisplay[j].length ; z++){
                    if(FIELD_NAME == $scope.groupDisplay[j][z].FIELD_NAME)
                        $scope.groupDisplay[j][z].Value = Multiselect;
                }
            }
    }
    $scope.back = function(){
        $state.go('home.formList');
    };
    $scope.toggle1 = function(DISPLAY_TYPE,REFDATASOURCE){
        if(DISPLAY_TYPE==1 && REFDATASOURCE == "T"){
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle2 = function(DISPLAY_TYPE,REFDATASOURCE){
        if((DISPLAY_TYPE==1 && REFDATASOURCE == "F")||(DISPLAY_TYPE==41 && REFDATASOURCE == "F")){
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle3 = function(LABLE_TYPE,REFDATASOURCE){
        if(LABLE_TYPE == 2 && REFDATASOURCE == "F"){
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle4 = function(DEFAULT_VALUE,DISPLAY_TYPE,REFDATASOURCE){
        if(DISPLAY_TYPE==4 && DEFAULT_VALUE != null && REFDATASOURCE =="T"){
            return true;
        }else{
            return false;
        }
    }
    $scope.toggle5 = function(DISPLAY_TYPE,ID){
        if(DISPLAY_TYPE==5){
            LABLE5_ID = ID;
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle6 = function(LABLE_TYPE){
        if(LABLE_TYPE==3||LABLE_TYPE==17){
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle7 = function(LABLE_TYPE,REFDATASOURCE){
        if(LABLE_TYPE==4 && REFDATASOURCE == "F"){

            return true;
        }else{
            return false;
        }
    };
    $scope.toggle11 = function(LABLE_TYPE){
        if(LABLE_TYPE==11){
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle15 = function(DISPLAY_TYPE){
        if(DISPLAY_TYPE==15){
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle16 = function(LABLE_TYPE){
        if(LABLE_TYPE==16){
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle17 = function(LABLE_TYPE,REFDATASOURCE){
        if(LABLE_TYPE == 105 && REFDATASOURCE == "F"){
            return true;
        }else{
            return false;
        }
    };
   /* $scope.fromline = function(field_name){
       var  backupDefault = JSON.stringify($scope.groupDisplay);
        backupgroup = JSON.stringify($scope.group);
        formData = JSON.stringify(formData);
        $state.go('formline',{fieldName:field_name,state:"1",datalist:JSON.stringify(LABLE5_ID),savedata:JSON.stringify(savedata),title:JSON.stringify($scope.title),backupDisplay:JSON.stringify(backupDisplay),backupgroup:backupgroup,instance:instance,formData:formData,backupDefault:backupDefault});
    };*/

  /*  $scope.showSelect = function(){
        $scope.isShow = true;

    };
    $scope.hideSelect = function(){
        $scope.isShow = false;
    };
    $scope.getClass=function() {
        if ($scope.isShow) {
            return "listPicker-show";
        } else {
            return "";
        }
    };
    $scope.setSelected = function(e){
        if($scope.showType==2)return;
        var scrollTop = e.detail.scrollTop, x,y;
        if(scrollTop<0){
            x=0;
        }else if(scrollTop>300){
            x=$scope.datas.length-1;
        }else{
            x= parseInt(scrollTop/50);
            y = parseInt(scrollTop%50);
            if(y>30)x+=1;
        }

        if(x!=$scope.selectIndex){
            document.getElementsByName("listPicker-item")[$scope.selectIndex].style.color="black";
            document.getElementsByName("listPicker-item")[x].style.color="#33cd5f";
            $scope.selectIndex = x;
        }
    };*/
    $scope.selectone = function(SOURCE_LIST_ID,ID){
        backupDisplay = JSON.stringify($scope.groupDisplay);
        backupgroup = JSON.stringify($scope.group);
        formData = JSON.stringify(formData);
        var firstChoosen=JSON.stringify(choosen);
        if($stateParams.instance!=null){
            instance=$stateParams.instance;
        }
        localStorage.setItem("firstChoosen",JSON.stringify(choosen));
        $state.go('listChoosen',{fieldName:$stateParams.fieldName,ListID:JSON.stringify(SOURCE_LIST_ID),ID:JSON.stringify(ID),formId:JSON.stringify($scope.title.FORM_ID),title:JSON.stringify($scope.title),backupDisplay:backupDisplay,backupgroup:backupgroup,instance:instance,formData:formData,firstChoosen:firstChoosen});
    }
    $scope.selectmore = function(SOURCE_LIST_ID,ID,FIELD_NAME){
        backupDisplay = JSON.stringify($scope.groupDisplay);
        backupgroup = JSON.stringify($scope.group);
        formData = JSON.stringify(formData);
        $state.go('listChooseMore',{fieldName:$stateParams.fieldName,FIELD_NAME:JSON.stringify(FIELD_NAME),ListID:JSON.stringify(SOURCE_LIST_ID),ID:JSON.stringify(ID),formId:JSON.stringify($scope.title.FORM_ID),title:JSON.stringify($scope.title),backupDisplay:JSON.stringify(backupDisplay),backupgroup:backupgroup,instance:instance,formData:formData});
    }


    $scope.selectTime = function(index){
        TimePicker(function(time){
            selectTime = time;
                for(var i=0 ; i<$scope.groupDisplay.length; i++){
                    for(var j=0 ; j<$scope.groupDisplay[i].length; j++){
                        if($scope.groupDisplay[i][j].DISPLAY_NAME == index){
                            //$scope.groupDisplay[i][j].Value = $scope.mSelectTime;
                            $scope.groupDisplay[i][j].Value = selectTime;
                        }
                    }
                }
            },selectTime);
            return selectTime;
    };
    $scope.selectDate = function(index){
        DatePicker(function(time){
            selectDate = time;
            for(var i=0 ; i<$scope.groupDisplay.length; i++){
                for(var j=0 ; j<$scope.groupDisplay[i].length; j++){
                    if($scope.groupDisplay[i][j].DISPLAY_NAME == index){
                        //$scope.groupDisplay[i][j].Value = $scope.mSelectTime;
                        $scope.groupDisplay[i][j].Value = selectDate;
                    }
                }
            }
        },selectDate);
        return selectDate;
    };



   
    $scope.formcommit = function(){
        var listdata = [];
        for(var i = 0 ; i < $scope.group.length ; i++){
            for(var j = 0 ; j < $scope.group[i].length ; j++){
                listdata.push($scope.groupDisplay[i][j].Value);
            }
        }


        if(instance.length == 0){
            instance = $stateParams.instance;
        }

        if(backuphideDisplayname!=null){
            for(var i=0;i<backuphideDisplayname.length;i++){
                for(var j=0;j<backuphideDisplayname[i].length;j++){
                    listdata.push(backuphideDisplayname[i][j].value);
                    instance=instance+","+backuphideDisplayname[i][j].FIELDNAME;
                    formData.push(backuphideDisplayname[i][j]);
                }
            }
        }
        
        instance = instance.split(",");       //将相应要显示的字段送到groupDisplay里面
        $scope.instance = "{" ;

        //console.log("formData="+JSON.stringify(formData));
        //console.log("instance="+JSON.stringify(instance));
        for(var i = 1 ; i < instance.length; i++){
               // console.log("3");
                if(formData[i-1].LABLE_TYPE  == 5){
                   // console.log("1");
                    for(var j = 0; j < savedata.length ; j++) {
                       // console.log("2");
                        var fieldName = "";
                        for(x=0;x< savedata[j].length ; x++){
                            if(savedata[j][x].FIELD_DESC==""&&savedata[j][x].VALUE=="") fieldName = savedata[j][x].FIELD_NAME;
                        }
                       // console.log("fieldName="+fieldName);
                        //console.log("fieldName2="+formData[i-1].FIELD_NAME);
                       var count = 0;
                        if(fieldName==formData[i-1].FIELD_NAME){
                           // console.log("fieldName="+fieldName);
                           // console.log("fieldName2="+formData[i-1].FIELD_NAME);
                            if(count==0){
                                $scope.instance = $scope.instance + '"' + instance[i] + '"' + ":" ;
                                count++;
                            }
                            $scope.instance = $scope.instance + "[" + "{" ;
                            for(var x = 0 ; x < savedata[j].length ; x++) {
                                    $scope.instance = $scope.instance + '"' + savedata[j][x].FIELD_NAME + '"' + ":" + '"' + savedata[j][x].VALUE + '"' + ",";
                            }
                        }
                        if(count!=0){
                            $scope.instance = $scope.instance.substr(0,$scope.instance.length-1);
                            $scope.instance =  $scope.instance + "}" + "]" + ",";
                        }
                    }
                }else if(listdata[i-1] == true && (typeof listdata[i-1] == "boolean")){
                    $scope.instance = $scope.instance + '"' + instance[i] + '"' + ":" + '"' + "Y" + '"' + ",";
                }else if(listdata[i-1] == false && (typeof listdata[i-1] == "boolean")){
                    $scope.instance = $scope.instance + '"' + instance[i] + '"' + ":" + '"' + "N" + '"' + ",";
                }else{
                    $scope.instance = $scope.instance + '"' + instance[i] + '"' + ":" + '"' + listdata[i-1] + '"' + ",";
                }
        }
        datalist = $scope.instance + "}";
        var data = eval("("+datalist+")");
        $http.post(serverUrl+"com.cms.formpatch.instance.getValidates.biz.ext",
            {checkPoint:"C",formId:$scope.title.FORM_ID})
            .success(function(){
        $http.post(serverUrl+"com.cms.formpatch.instance.insertEX.biz.ext",
            {formId:$scope.title.FORM_ID,instance:data})
            .success(function(backinf){
                formInstanceID = backinf.instance.HID;
                $http.post(serverUrl+"com.cms.formpatch.instance.submitFormEX2.biz.ext",
                    {formID:$scope.title.FORM_ID,formInstanceID:formInstanceID,userCode:userCode})
                    .success(function(success){
                        showAlert(success.errMsg);
                        $state.go('home.showTodo');
                    })
                })
            })
    }
})



