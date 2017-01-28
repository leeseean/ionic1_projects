/**
 * Created by zjf on 2015/7/6.
 */
var ionicApp = angular.module('ionicApp', ['ionic','factoryUtil','LocalStorageModule','ui.bootstrap','ngIOS9UIWebViewPatch']);
//var userId;
//var userName;
//var userAvator;
var workitemid;
var userCode;
var serverUrl;

function loadTheApp() {
 try {
  angular.bootstrap(document, ['ionicApp']);
 } catch (e) {
  console.log(e);
 }
}

angular.element(document).ready(function() {
    if(isWX()){
        loadTheApp();
    }else if(!window.wpt) {   //1、放在微平台上使用,去掉“!”
            document.addEventListener("deviceready", function () {
                try {
                    wpt.getUsersInfo(
                        function (msg) {
                            var user = eval('(' + msg + ')');
                            userCode = user.userCode;
                            //alert(userCode);
                            loadTheApp();
                        });
                } catch (e) {
                    console.log(e);
                }
            }, false)
        } else {
            userCode="sie_liushaohua";//2、放在PC端测试上使用
            loadTheApp();
        }

});

if(!isWX()){
    serverUrl="http://saip.chinasie.com:8089/siebpm/";//正式环境
}else{
    serverUrl="http://"+location.host+"/siebpm/";//微信环境
}

function isWX(){
    var urlstr=navigator.userAgent.toLowerCase();
    if(urlstr.indexOf("micromessenger")==-1) return false;
    else return true;
}
