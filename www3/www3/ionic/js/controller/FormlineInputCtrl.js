/**
 * Created by Boyz.X on 2015/7/10.
 */
ionicApp.controller('formlineinputCtrl',function($scope,$http,$state,$stateParams,$window,DateTimePicker){

   // var group = [];
    var count = 0;
    var instance = [];

    var LABLE5_ID;
    var formInstanceID;
    var formData;
    var choosen = eval("("+$stateParams.choosen+")");
    var title = eval("("+$stateParams.title+")");

    var backupDisplay = eval("("+$stateParams.backupDisplay+")");
    var backupgroup = eval("("+$stateParams.backupgroup+")");
    var Multiselect = eval("("+$stateParams.Multiselect+")");
    var FIELD_NAME = eval("("+$stateParams.FIELD_NAME+")");
    var Selectlist = eval("("+$stateParams.Selectlist+")");
    var hideDisplayname=eval("("+$stateParams.hideDisplayname+")");
    var backuphideDisplayname=eval("("+$stateParams.backuphideDisplayname+")");

    var myDate=new Date();

    $scope.mSelectTime = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+ myDate.getHours() +":"+myDate.getMinutes()+":"+myDate.getSeconds();
    $scope.datalist = eval("("+$stateParams.datalist+")");
     var savedata = eval("("+$stateParams.savedata+")");
  /*      $scope.data = [];
        for(var i = 0 ; i < datalist.length; i++){
            if(i<datalist.length-1){
                $scope.data.push(datalist[i]);
                $scope.data[i].Value = "";
            }else{
                $scope.id = datalist[i].ID;
            }
        }*/




    if(backuphideDisplayname==null){
        backuphideDisplayname=[];
    }
    if(hideDisplayname!=null){
        backuphideDisplayname.push(hideDisplayname);
    }


  if(backupDisplay != null){
        $scope.groupDisplay = backupDisplay ;
        //$scope.group = backupgroup;
        // formData = eval("("+$stateParams.formData+")");
    }else{

      if($scope.datalist != null){
          $scope.groupDisplay = [];
          for (var i = 0; i < $scope.datalist.length; i++) {    //判断scope.group的长度进行一层循环


              var flag = $scope.datalist[i].DEFAULT_VALUE;      //设立标记，记录groupN里面某个字段是否有默认值
              var flag2 = $scope.datalist[i].SOURCE_LIST_ID;
              var FIELD_NAME = $scope.datalist[i].FIELD_NAME;
              instance = instance + "," + FIELD_NAME;     //用fildName建立新的数组instance

              if (flag != null) {                                   //判断是否有默认值
                  var DEFAULT_VALUE = $scope.datalist[i].DEFAULT_VALUE;   //有默认值，在gDefaultVal里面寻找相应的默认值
                  var DEFAULT_Data = data.gDefaultVal[DEFAULT_VALUE];


                  $scope.groupDisplay.push({                     //将相应要显示的字段送到groupDisplay里面
                      FIELD_DESC: backupDisplay[i].FIELD_DESC ? backupDisplay[i].FIELD_DESC : $scope.datalist[i].FIELD_DESC,
                      DISPLAY_TYPE: backupDisplay[i].DISPLAY_TYPE ? backupDisplay[i].DISPLAY_TYPE : $scope.datalist[i].DISPLAY_TYPE,
                      FIELD_NAME: $scope.datalist[i].FIELD_NAME,
                      DEFAULT_VALUE: DEFAULT_Data,
                      LABLE_TYPE: $scope.datalist[i].LABLE_TYPE,
                      ID: $scope.datalist[i].FORM_CELL_ID,
                      FORM_ID:$scope.datalist[i].FORM_ID,
                      formLineId: $scope.datalist[i].FORM_CELL_LINE_ID,
                      ISREADONLY: $scope.datalist[i].ISREADONLY,
                      SOURCE_LIST_ID: $scope.datalist[i].SOURCE_LIST_ID,
                      Value: DEFAULT_Data
                  });
              } else if ($scope.datalist[i].LABLE_TYPE == 15) {

                  $scope.groupDisplay.push({                     //将相应要显示的字段送到groupDisplay里面
                      FIELD_DESC: $scope.datalist[i].FIELD_DESC,
                      DISPLAY_TYPE: $scope.datalist[i].DISPLAY_TYPE,
                      FIELD_NAME: $scope.datalist[i].FIELD_NAME,
                      LABLE_TYPE: $scope.datalist[i].LABLE_TYPE,
                      ID: $scope.datalist[i].FORM_CELL_ID,
                      FORM_ID:$scope.datalist[i].FORM_ID,
                      formLineId: $scope.datalist[i].FORM_CELL_LINE_ID,
                      Value: false
                  });
              } else if (flag2 != null) {

                  $scope.groupDisplay.push({                     //将相应要显示的字段送到groupDisplay里面
                      FIELD_DESC: $scope.datalist[i].FIELD_DESC,
                      DISPLAY_TYPE: $scope.datalist[i].DISPLAY_TYPE,
                      FIELD_NAME: $scope.datalist[i].FIELD_NAME,
                      LABLE_TYPE: $scope.datalist[i].LABLE_TYPE,
                      ID: $scope.datalist[i].FORM_CELL_ID,
                      FORM_ID:$scope.datalist[i].FORM_ID,
                      formLineId: $scope.datalist[i].FORM_CELL_LINE_ID,
                      SOURCE_LIST_ID: $scope.datalist[i].SOURCE_LIST_ID,
                      Value: "",
                      ISREADONLY: $scope.datalist[i].ISREADONLY,
                      Selectlist: ""
                  });
              } else {

                  $scope.groupDisplay.push({
                      FIELD_DESC: $scope.datalist[i].FIELD_DESC,
                      DISPLAY_TYPE: $scope.datalist[i].DISPLAY_TYPE,
                      FIELD_NAME: $scope.datalist[i].FIELD_NAME,
                      ID: $scope.datalist[i].FORM_CELL_ID,
                      FORM_ID:$scope.datalist[i].FORM_ID,
                      formLineId: $scope.datalist[i].FORM_CELL_LINE_ID,
                      LABLE_TYPE: $scope.datalist[i].LABLE_TYPE,
                      ISREADONLY: $scope.datalist[i].ISREADONLY,
                      Value: ""
                  });
              }
              if (flag2 != null && ($scope.datalist[i].LABLE_TYPE == 3 || $scope.datalist[i].LABLE_TYPE == 17)) {
                  $http.post(serverUrl + "com.cms.formpatch.instance.queryComboFieldSource.biz.ext",
                      {selectId: flag2})
                      .success(function (selectlist) {
                          for (var i = 0; i < $scope.datalist.length; i++) {

                              if ($scope.groupDisplay[i].Selectlist == "" && ($scope.datalist[i].LABLE_TYPE == 3 || $scope.datalist[i].LABLE_TYPE == 17)) {
                                  for (var j = 0; j < selectlist.src.length; j++) {
                                      $scope.Selectlist = selectlist.src;
                                      break;
                                  }
                              }
                          }
                      })
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

      }
    }
    if(choosen!=null){
        for(var i = 0 ; i < choosen.length ; i++){
            for(var j = 0 ; j < $scope.groupDisplay.length ; j++){

                if((choosen[i].FIELDNAME == "姓名"&&$scope.groupDisplay[j].FIELD_DESC=="人员姓名")||(choosen[i].FIELDNAME == "人员姓名"&&$scope.groupDisplay[j].FIELD_DESC=="项目经理")||choosen[i].FIELDNAME==$scope.groupDisplay[j].FIELD_DESC)
                        $scope.groupDisplay[j].Value = choosen[i].Value;

            }
        }

        $scope.Selectlist=Selectlist;
    }
    if(Multiselect!=null){
        for(var j = 0 ; j < $scope.groupDisplay.length ; j++){
            for(var z = 0 ; z < $scope.groupDisplay[j].length ; z++){
                if(FIELD_NAME == $scope.groupDisplay[j][z].FIELD_NAME)
                    $scope.groupDisplay[j][z].Value = Multiselect;
            }
        }
    }


    $scope.toggle1 = function(DISPLAY_TYPE,ISREADONLY){
        if(DISPLAY_TYPE==1 && ISREADONLY == "T"){
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle2 = function(DISPLAY_TYPE,ISREADONLY){
        if((DISPLAY_TYPE==1 && ISREADONLY == "F")||(DISPLAY_TYPE==41 && ISREADONLY == "F")){
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle3 = function(LABLE_TYPE,ISREADONLY){
        if(LABLE_TYPE == 2 && ISREADONLY == "F"){
            return true;
        }else{
            return false;
        }
    };
    $scope.toggle4 = function(DEFAULT_VALUE,DISPLAY_TYPE,ISREADONLY){
        if(DISPLAY_TYPE==4 && DEFAULT_VALUE != null && ISREADONLY =="T"){
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
    $scope.toggle7 = function(LABLE_TYPE,ISREADONLY){
        if(LABLE_TYPE==4 && ISREADONLY == "F"){

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




    $scope.selectone = function(SOURCE_LIST_ID,ID,formLineId){
        backupDisplay = JSON.stringify($scope.groupDisplay);
        Selectlist=JSON.stringify($scope.Selectlist);
       // backupgroup = JSON.stringify($scope.group);
        formData = JSON.stringify(formData);
        console.log("instance="+instance);
        $state.go('FormlineChoosen',{fieldName:$stateParams.fieldName,ListID:JSON.stringify(SOURCE_LIST_ID),ID:JSON.stringify(ID),formLineId:JSON.stringify(formLineId),formId:JSON.stringify(title.FORM_ID),title:JSON.stringify(title),backupDisplay:backupDisplay,backupgroup:$stateParams.backupgroup,instance:$stateParams.instance,formData:$stateParams.formData,Selectlist:Selectlist,datalist:$stateParams.datalist,savedata:$stateParams.savedata,backupDefault:$stateParams.backupDefault,hideDisplayname:$stateParams.hideDisplayname,backuphideDisplayname:JSON.stringify(backuphideDisplayname)});
    }
    $scope.selectmore = function(SOURCE_LIST_ID,ID,FIELD_NAME){
        backupDisplay = JSON.stringify($scope.groupDisplay);
        backupgroup = JSON.stringify($scope.group);
        formData = JSON.stringify(formData);
        console.log("instance="+instance);
        $state.go('listChooseMore',{fieldName:$stateParams.fieldName,FIELD_NAME:JSON.stringify(FIELD_NAME),ListID:JSON.stringify(SOURCE_LIST_ID),ID:JSON.stringify(ID),formId:JSON.stringify($scope.title.FORM_ID),title:JSON.stringify($scope.title),backupDisplay:backupDisplay,backupgroup:backupgroup,instance:$stateParams.instance,formData:formData});
    }

    $scope.selectTime = function(index){
        DateTimePicker(function(time){
            selectTime = time;
            for(var i=0 ; i<$scope.groupDisplay.length; i++){
                if($scope.groupDisplay[i].FIELD_DESC == index||$scope.groupDisplay[i].FIELD_DESC=="进场时间"){
                    $scope.groupDisplay[i].Value = selectTime;
                }
            }
        },selectTime);
        return selectTime;
    };

       var list = [];
       $scope.save = function() {
         $scope.data=$scope.groupDisplay;
         for(var i = 0; i < $scope.data.length ; i++){
           list.push({FIELD_DESC:$scope.data[i].FIELD_DESC,VALUE:$scope.data[i].Value,FIELD_NAME:$scope.data[i].FIELD_NAME});
         /*$scope.list.push({FIELD_DESC:$scope.data.FIELD_DESC,Value:($scope[i].FORM_CELL_LINE_ID)});*/
         }

         /*  for(var each in backuphideDisplayname){
               list.push({FIELD_DESC:"",VALUE:"",FIELD_NAME:backuphideDisplayname[each].FIELDNAME});
           }*/


           for(var i=0;i<backuphideDisplayname.length;i++){
               for(var y=0;y<backuphideDisplayname[i].length;y++){
                   list.push({FIELD_DESC:backuphideDisplayname[i][y].DISPLAYNAME,VALUE:backuphideDisplayname[i][y].value,FIELD_NAME:backuphideDisplayname[i][y].SETFIELD});

               }
           }
           /*var bhd=eval("(" + sessionStorage.getItem("backuphideDisplayname1") + ")");
           for(var each in bhd){
               bhd.push(bhd[each.valueOf()]);
           }
           sessionStorage.clear();*/

           list.push({FIELD_DESC:"",VALUE:"",FIELD_NAME:$stateParams.fieldName});
           list.push({FIELD_DESC:"",VALUE:"mobile",FIELD_NAME:"SOURCE_CODE"});
            if(savedata==null){
                savedata = [];
                //console.log(JSON.stringify(list));
                savedata.push(list);
            }else{
                savedata.push(list);
            }
            $state.go('formline',{fieldName:$stateParams.fieldName,state:"2",list:JSON.stringify(list),datalist:$stateParams.datalist,savedata:JSON.stringify(savedata),title:$stateParams.title,backupDisplay:$stateParams.backupDisplay,backupgroup:$stateParams.backupgroup,formData:$stateParams.formData,backupDefault:$stateParams.backupDefault,instance:$stateParams.instance});
        }
        $scope.back = function(){
            $window.history.back();
         // $state.go('formline',{state:"2",list:JSON.stringify(list),datalist:JSON.stringify($scope.id),title:$stateParams.title,backupDisplay:$stateParams.backupDisplay,backupgroup:$stateParams.backupgroup,formData:$stateParams.formData});
        };
})