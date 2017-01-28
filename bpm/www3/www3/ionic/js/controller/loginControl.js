/**
 * Created by zjf on 2015/7/11.
 */

ionicApp.controller('loginControl', function($scope, $state,$http,$window,showAlert,localStorageService) {
    var userid;
    var uname;
    var pwd;
    var rememberData;

    $scope.userInfo={uname:'',pwd:''};
    $scope.setting = {checked: true };

    var rememberPwd = localStorageService.get("rememberPwd")
    //localStorage.clear()
    if(rememberPwd!=null&&rememberPwd.uname!=null&&rememberPwd.pwd!=null){
        $scope.userInfo.uname=rememberPwd.uname;
        uname= $scope.userInfo.uname;
        $scope.userInfo.pwd=rememberPwd.pwd;
        pwd =$scope.userInfo.pwd;
    }
    $scope.$watchCollection('userInfo', function(){


            uname= $scope.userInfo.uname;
            pwd =$scope.userInfo.pwd;
            rememberData={uname:uname,pwd:pwd}
            localStorageService.set("rememberPwd", rememberData);

    });

    $scope.signIn=function(){
        if($scope.setting.checked==false){
            rememberData={uname:'',pwd:''}
            localStorageService.set("rememberPwd", rememberData);
        }
        if(uname==null ||uname==''&&(pwd==null || pwd=='')){
            showAlert("请输入用户名和密码")

        }else if(uname==null ||uname==''){
            showAlert("用户名不能为空")
        }else if (pwd==null || pwd==''){
            showAlert("密码不能为空")
        }else{
            $http.post(
                    serverUrl+"com.smap.smapmain.login.simpleLogin.biz.ext",
                //serverUrl+"com.smap.smapmain.login.loginEx.biz.ext",
                {
                    user:{
                        "userid":uname,
                        "password": pwd
                    }
                }).success(function(data) {
                    var errCode=data.errCode;
                    if(errCode=="Y"){
                        //alert(errCode);
                        // document.cookie="name="+userid;
                        localStorageService.set("userid", uname);
                        $state.go('home.showTodo');
                    }else{
                        showAlert(data.errMsg);
                    }
                });
        }


  /*  $http.post(serverUrl+"com.smap.smapmain.login.loginEx.biz.ext",{
        user:{
            "userid":userCode
        }
        }).success(function(data) {
            var errCode=data.errCode;
            if(errCode=="Y"){
                alert(errCode);
                $state.go('home');
            }else{
                alert("登录失败");
            }
        });*/
    }
    $scope.back =function(){
        //$window.history.back();
        wpt.exitWebApp();
    };
});