// var myApp=angular.module('kronos', ['ionic','onezone-datepicker','locals','LocalStorageModule']);
angular.module('locals', [])
.factory('localdata', ['$window', function($window){
	return {
		set: function(key,value){
			$window.localStorage[key] = value;
		},
		get: function(key,defaultValule){
            return $window.localStorage[key]||defaultValule;
		},
		setObject: function(key,value){
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key){
			return JSON.parse($window.localStorage[key]||'{}');
		}	
	};
}]);
myApp.factory('util',['$ionicLoading','$timeout',function($ionicLoading,$timeout){
    return{
        showLoading:function(msg){
            $ionicLoading.show({
                template: msg
            });
            $timeout(function(){
                $ionicLoading.hide();
            },2000);
        }
    }
}]);