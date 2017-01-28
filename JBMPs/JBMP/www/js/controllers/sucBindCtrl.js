// add 2016.6.16 p.m
"use strict";
app.controller('sucBindCtrl', ['$state', '$scope','$http','$stateParams',function($state,$scope,$http,$stateParams){
	// alert($stateParams.dataParams.CustomerName)
	$scope.UserName = $stateParams.dataParams.UserName;
	$scope.customerName = $stateParams.dataParams.CustomerName;
}]);