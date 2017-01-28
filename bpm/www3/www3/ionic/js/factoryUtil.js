var factoryUtil = angular.module('factoryUtil', ['ionic','ui.bootstrap']);
factoryUtil.factory('showAlert', ['$ionicPopup', function($ionicPopup) {
    var showAlert = function(str, callback) {
        var alertPopup = $ionicPopup.alert({
            title: '提示',
            okText: '确定',
            template: str
        });
        angular.element(document.querySelector('.popup')).ready(function(){
            angular.element(document.querySelector('.popup')).attr("style","top:"+(document.body.clientHeight-document.querySelector('.popup').clientHeight)/2+"px;left:"+(document.body.clientWidth-document.querySelector('.popup').clientWidth)/2+"px;");
        });
        alertPopup.then(function(res) {
            if (callback) callback();
        });
    };
    return showAlert;
}]);
factoryUtil.factory('showLoad', ['$ionicLoading', function($ionicLoading) {
    var showLoad = function(str) {
        $ionicLoading.show({
            template:'<div style="float: left;margin-top: 5px;margin-left: 20px">' + str || '加载中' + '</div>'
        });
    };
    return showLoad;
}]);
factoryUtil.factory('hideLoad', ['$ionicLoading', function($ionicLoading) {
    var hideLoad = function() {
        $ionicLoading.hide();
    };
    return hideLoad;
}]);

factoryUtil.factory('showLoad', ['$ionicLoading', function($ionicLoading) {
    var showLoad = function(str) {
        $ionicLoading.show({
            template:'<div style="float: left;margin-top: 5px;margin-left: 20px">' + str || '加载中' + '</div>'
        });
    };
    return showLoad;
}]);
factoryUtil.factory('TimePicker', ['$ionicPopup','$rootScope',function($ionicPopup,$rootScope) {
    var TimePicker = function(callback,date) {
        if(date) {
            var arr = ("1111-11-11 "+ date+":11").split(/[- :]/);
            $rootScope.data123 = {
                data : new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5])
            };
        }else{
            $rootScope.data123 = {
                data : new Date()
            };

        }
        var alertPopup = $ionicPopup.alert({
            template:'<div ng-model="data123.data" class="well well-small">' +
                '<timepicker hour-step="1" minute-step="1" show-meridian="true" meridians=["上午","下午"] style="margin-left: auto;margin-right: auto;"></timepicker>' +
                '</div>',
            okText: '确定'
        });
        angular.element(document.querySelector('.popup')).ready(function(){
            angular.element(document.querySelector('.popup-head')).remove();
            angular.element(document.querySelector('.popup-body')).attr("style","padding:0;");
            angular.element(document.querySelector('.popup')).addClass("visible active width-auto ion-show-change");
            angular.element(document.querySelector('.popup')).attr("style","top:"+(document.body.clientHeight-document.querySelector('.popup').clientHeight)/2+"px;left:"+(document.body.clientWidth-document.querySelector('.popup').clientWidth)/2+"px;");
        });
        alertPopup.then(function(res) {
            if (callback) callback(($rootScope.data123.data.getHours()<10?("0"+$rootScope.data123.data.getHours()):$rootScope.data123.data.getHours())+
                ":"+($rootScope.data123.data.getMinutes()<10?("0"+$rootScope.data123.data.getMinutes()):$rootScope.data123.data.getMinutes()));
        });
    };
    return TimePicker;
}]);

factoryUtil.factory('DatePicker', ['$ionicPopup','$rootScope',function($ionicPopup,$rootScope) {
    var DatePicker = function(callback,date) {
        $rootScope.data123 = {
            data : ((date!=undefined)?(new Date(date)):(new Date()))
        };
        var alertPopup = $ionicPopup.alert({
            template:'<div class="well well-small"  ng-model="data123.data">' +
                '<datepicker show-weeks="false" starting-day="1" style="zoom:1;"></datepicker>' +
                '</div>',
            okText: '确定'
        });
        angular.element(document.querySelector('.popup')).ready(function(){
            angular.element(document.querySelector('.popup-head')).remove();
            angular.element(document.querySelector('.popup-body')).attr("style","padding:0;");
            angular.element(document.querySelector('.popup')).addClass("visible active width-auto ion-show-change");
            angular.element(document.querySelector('.popup')).attr("style","top:"+(document.body.clientHeight-document.querySelector('.popup').clientHeight)/2+"px;left:"+(document.body.clientWidth-document.querySelector('.popup').clientWidth)/2+"px;");
        });
        alertPopup.then(function(res) {
            if (callback) callback($rootScope.data123.data.getFullYear()+
                "-"+($rootScope.data123.data.getMonth()<9?("0"+($rootScope.data123.data.getMonth()+1)):($rootScope.data123.data.getMonth()+1))+
                "-"+($rootScope.data123.data.getDate()<10?("0"+$rootScope.data123.data.getDate()):$rootScope.data123.data.getDate()));
        });
    };
    return DatePicker;
}]);

factoryUtil.factory('DateTimePicker', ['$ionicPopup','$rootScope',function($ionicPopup,$rootScope) {
    var DateTimePicker = function(callback,date) {
        $rootScope.data123 = {
            data : ((date!=undefined)?(new Date(date)):(new Date()))
        };
        var alertPopup = $ionicPopup.alert({
            template:'<div class="well well-small"  ng-model="data123.data">' +
                '<datepicker show-weeks="false" starting-day="1" style="zoom:1;"></datepicker>' +
                '</div><div ng-model="data123.data" class="well well-small">' +
                '<timepicker hour-step="1" minute-step="1" show-meridian="true" meridians=["上午","下午"] style="margin-left: auto;margin-right: auto;"></timepicker>' +
                '</div>',
            okText: '确定'
        });
        angular.element(document.querySelector('.popup')).ready(function(){
            angular.element(document.querySelector('.popup-head')).remove();
            angular.element(document.querySelector('.popup-body')).attr("style","padding:0;");
            angular.element(document.querySelector('.popup')).addClass("visible active width-auto ion-show-change");
            angular.element(document.querySelector('.popup')).attr("style","top:"+(document.body.clientHeight-document.querySelector('.popup').clientHeight)/2+"px;left:"+(document.body.clientWidth-document.querySelector('.popup').clientWidth)/2+"px;");
         });
        alertPopup.then(function(res) {
           if (callback) callback($rootScope.data123.data.getFullYear()+
                "-"+($rootScope.data123.data.getMonth()<9?("0"+($rootScope.data123.data.getMonth()+1)):($rootScope.data123.data.getMonth()+1))+
                "-"+($rootScope.data123.data.getDate()<10?("0"+$rootScope.data123.data.getDate()):$rootScope.data123.data.getDate())+
                " "+($rootScope.data123.data.getHours()<10?("0"+$rootScope.data123.data.getHours()):$rootScope.data123.data.getHours())+
                ":"+($rootScope.data123.data.getMinutes()<10?("0"+$rootScope.data123.data.getMinutes()):$rootScope.data123.data.getMinutes()));
        });
    };
    return DateTimePicker;
}]);