/**
 * Created by Administrator on 2015/6/19.
 */

// var app =angular.module('kronos', ['ionic']);
var myApp=angular.module('kronos', ['ionic','onezone-datepicker','locals','LocalStorageModule']);
function checkTime(){
    if(!/^[0-5]{1}[0-9]{1}:[0-5]{1}[0-5]{1}$/.test(this.value))
        {alert('时间格式不正确,正确的格式为 00:00');
        this.value=''};
};
var user ={
    //userId:'702',
    //userId:'666',
    userId:'702',
    //userId:'20420',
    name:'张三',
    tel:'',
    userCode:''
};
function loadTheApp() {
// Hide splash screen if any
    // alert(3234234234);
    if (navigator && navigator.splashscreen) {
        navigator.splashscreen.hide();
    }
    try{
        cordova.exec(function(data) {
            var tempdata =JSON.parse(data);
            setTimeout(function(){
                user.userId =tempdata.userId;
                user.tel =tempdata.telNo;
                user.name =tempdata.userName;
                user.userCode =tempdata.userCode;
                //Boot AngularJS
                try {
                    angular.bootstrap(document, ['kronos']);
                } catch (e) {
                    console.log('errrrrrrrrrrrrrr! ' + e);
                }
            },50)

        }, function(e) {
            //alert(e);
            if(e){
                alert(e);
            }else{
                alert("获取用户信息失败");
            }

            console.log("Error: "+e);
        }, "","",[]);
    }catch (e){
        //alert(e);
    }
    // Initiate FastClick
    //FastClick.attach(document.body);
    //     Boot AngularJS
    //     try {
    //     angular.bootstrap(document, ['kronos']);
    // } catch (e) {
    //     console.log('errrrrrrrrrrrrrr! ' + e);
    // }
}
// Listen to device ready
angular.element(document).ready(function() {
    // alert(1);
    if (window.cordova) {
        //alert(1)
        document.addEventListener('deviceready', loadTheApp, false);
    } else {
        loadTheApp();
    }
});

//app.config(function($stateProvider,$urlProvider,$ionicConfigProvider){
//    $ionicConfigProvider.scrolling.jsScrolling(true);
//})

// app.directive("imgfocus",['$ionicPosition','$timeout',function($ionicPosition,$timeout){
//     return{
//         restrict: 'E,A',
//         link: function(scope, element,attributes) {
//             if(scope.read){
//                 return;
//             }
//             var el =document.querySelector('body');

//             function appendDelete(buttonOffset,index){
//                 var child =createElement('div','mask');
//                 var deleteButton =createElement('div');
//                 var cssText ='position: fixed;background:rgba(255, 255, 255, 0.3);';
//                 cssText +='left:'+buttonOffset.left+'px;';
//                 cssText +='top:'+buttonOffset.top+'px;';
//                 deleteButton.style.cssText =cssText;
//                 //deleteButton.src='../style/imageseMap.png';
//                 deleteButton.style.height =""+buttonOffset.height+"px";
//                 deleteButton.style.width =""+buttonOffset.width+"px";
//                 //deleteButton.style.opacity =0.3;
//                 deleteButton.style.zIndex =1000;
//                 var icon =createElement('img');
//                 icon.src ='../style/images/delete.png';
//                 icon.style.marginTop =''+(buttonOffset.height-50)/2+'px';
//                 icon.style.marginLeft=''+(buttonOffset.width-50)/2+'px';
//                 icon.style.position ='relative';
//                 deleteButton.appendChild(icon);
//                 deleteButton.addEventListener('click',function(event){
//                     scope.$emit('to-deleteImage',index);
//                     child.parentNode.removeChild(child);
//                     deleteButton.parentNode.removeChild(deleteButton);
//                     event.stopPropagation();
//                 });
//                 child.addEventListener('click',function(event){
//                     child.parentNode.removeChild(child);
//                     deleteButton.parentNode.removeChild(deleteButton);
//                     event.stopPropagation();
//                 });
//                 el.appendChild(deleteButton);
//                 el.appendChild(child);
//             }
//             function createElement(tagName, className, innerText) {
//                 var element = document.createElement(tagName);
//                 if (className) {
//                     element.className = className;
//                 }
//                 if (innerText) {
//                     element.innderText = element.textContent = innerText;
//                 }
//                 return element;
//             }
//             var events = scope.events;
//             events.on('onhold', function(index){
//                 var buttonOffset = $ionicPosition.offset(element);
//                 //alert(element.getBoundingClientRect().left+"---"+element.getBoundingClientRect().top);
//                 appendDelete(buttonOffset,index);
//             });
//         },
//         controller:function($scope){
//             $scope.events = new SimplePubSub();
//             $scope.onHold =function(index){
//                 $scope.events.trigger("onhold",index);
//             }
//         }
//     }
// }]);

// function SimplePubSub() {
//     var events = {};
//     return {
//         on: function(names, handler) {
//             names.split(' ').forEach(function(name) {
//                 if (!events[name]) {
//                     events[name] = [];
//                 }
//                 events[name].push(handler);
//             });
//             return this;
//         },
//         trigger: function(name, args) {
//             angular.forEach(events[name], function(handler) {
//                 handler.call(null, args);
//             });
//             return this;
//         }
//     };
// };
// myApp.config(function($ionicConfigProvider) {
//     $ionicConfigProvider.views.swipeBackEnabled(false);
// });
// myApp.run(['$ionicPlatform','$rootScope','$location','$ionicPopup','$state','$ionicHistory', function ($ionicPlatform, $rootScope, $location,$ionicPopup,$state,$ionicHistory) {

//     $rootScope.$on('$ionicView.enter', function () {
//         if($state.current.name=='addCustomer'){
//             $rootScope.$broadcast('selectLoc');
//         }
//     });
//     $rootScope.$on('$ionicView.afterEnter', function () {
//        if($rootScope.refreshFollow){
//            $rootScope.$broadcast('refreshFollow');
//            $rootScope.refreshFollow =false;
//        }
//        if($rootScope.refreshIntroduce){
//            $rootScope.$broadcast('refreshIntroduce');
//            $rootScope.refreshIntroduce =false;
//        }
//        if($rootScope.refreshCustomerList){
//            $rootScope.$broadcast('refreshCustomerList');
//            $rootScope.refreshCustomerList=false;
//        }

//     });
    // document.addEventListener("backbutton", onBackKeyDown, false);
    // function onBackKeyDown(){
    //     //if($state.current.name =='main'){
    //     //    var confirmPopup = $ionicPopup.confirm({
    //     //        template: '确定退出该程序？',
    //     //        okText:'是',
    //     //        cancelText:'否'
    //     //    });
    //     //    confirmPopup.then(function(res) {
    //     //        if(res) {
    //     //            $rootScope.$broadcast('backButton',{flag:true});
    //     //        } else {
    //     //        }
    //     //    });
    //     //}else{
    //         $rootScope.$broadcast('backButton');
        //}
    // }
// }]);

