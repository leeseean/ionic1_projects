jingboApp
         .controller('indexCtrl', function(){
         	
         })
         .controller('rangesCtrl', function($scope){
         	$scope.rangesData = [
              {t1:'鲁BDX009X',t2:'201604210261',t3:'ZY1604210675',t4:'青岛是午汲镇下白石中北石油加油中心',t5:'WT0000000',t6:'16-04-18'+'\n'+'17：26：21',t7:'多委托',t8:'取消'},
              {t1:'鲁BDX009X',t2:'201604210261',t3:'ZY1604210675',t4:'青岛是午汲镇下白石中北石油加油中心',t5:'WT0000000',t6:'16-04-18'+'\n'+'17：26：21',t7:'多委托',t8:'取消'},
         	  {t1:'鲁BDX009X',t2:'201604210261',t3:'ZY1604210675',t4:'青岛是午汲镇下白石中北石油加油中心',t5:'WT0000000',t6:'16-04-18'+'\n'+'17：26：21',t7:'多委托',t8:'取消'}
         	];
            $scope.add = function(){
            	var obj = {t1:'鲁BDX009X',t2:'201604210261',t3:'ZY1604210675',t4:'青岛是午汲镇下白石中北石油加油中心',t5:'WT0000000',t6:'16-04-18'+'\n'+'17：26：21',t7:'多委托',t8:'取消'};
            	$scope.rangesData.push(obj);
            };
            $scope.cancel = function($index){
            	$scope.rangesData.splice($index,1);
            };
            $scope.rangesData1 = [
              {r1:'93#车用汽油',r2:'吨',r3:'15:00',r4:'描述述多委托',r5:'',r6:'',r7:'',r8:'删除'}
            ];
            $scope.add1 = function(){
            	var obj1 = {r1:'93#车用汽油',r2:'吨',r3:'15:00',r4:'描述述多委托',r5:'',r6:'',r7:'',r8:'删除'};
            	$scope.rangesData1.push(obj1);
            };
            $scope.del = function($index){
            	$scope.rangesData1.splice($index,1);
            };
         })
         .controller('cranesCtrl', function(){
         	
         })
         .controller('cranes1Ctrl', function(){
         	
         })
         .controller('cranes2Ctrl', function(){
         	
         })
         .controller('statusCtrl', function($scope){
         	$scope.status1 = true;
         	$scope.status2 = false;
         	$scope.status3 = false;
         	$scope.register = function(){
                $scope.status1 = true;
	         	$scope.status2 = false;
	         	$scope.status3 = false;
         	};
         	$scope.pending = function(){
	         	$scope.status1 = false;
	         	$scope.status2 = true;
	         	$scope.status3 = false;
         	};
         	$scope.print = function(){
	         	$scope.status1 = false;
	         	$scope.status2 = false;
	         	$scope.status3 = true;
         	};
         })
         .controller('trackCtrl', function(){
         	
         })
         .controller('importCtrl', function(){
         	
         })
         .controller('import-1Ctrl', function($scope,$ionicPopup,$ionicLoading,$timeout){
         	$scope.remark = function(){
         		var remarkPop = $ionicPopup.show({
	         		template:'<textarea rows="15"></textarea>',
	         		title:'备注',
	         		// subTitle:'112233',
	         		scope:$scope,
	         		buttons:[
	                  {
	                  	text:'取消',
	                  	type:'button-clear'
	                  },
	                  {
	                  	text:'确定',
	                  	type:'button-clear',
	                  	onTap:function(e){
	                    // e.preventDefault();
	                  	},
	                  }
	         		]
	         	});
	         	remarkPop.then(function(res){

         	    });
            };
            $scope.import = function(){
         	var importLoading = $ionicLoading.show({
         		template:'导入成功'
         	    });
            $timeout($ionicLoading.hide,3000)
         	};
         	$scope.flag = true;
         	$scope.delete = function(){
         		$scope.flag = false;
         	};
         	$scope.flag1 = true;
         	$scope.delete1 = function(){
         		$scope.flag1 = false;
         	}
         })
         .controller('inputCtrl', function(){
         	
         })
         .controller('input-1Ctrl', function($scope,$ionicPopup){
         	$scope.remark = function(){
         		var remarkPop = $ionicPopup.show({
	         		template:'<textarea rows="15"></textarea>',
	         		title:'备注',
	         		// subTitle:'112233',
	         		scope:$scope,
	         		buttons:[
	                  {
	                  	text:'取消',
	                  	type:'button-clear'
	                  },
	                  {
	                  	text:'确定',
	                  	type:'button-clear',
	                  	onTap:function(e){
	                    // e.preventDefault();
	                  	},
	                  }
	         		]
	         	});
	         	remarkPop.then(function(res){

         	    });
            };
            $scope.correct = function(){
         		var correctPop = $ionicPopup.show({
	         		template:'<textarea rows="15"></textarea>',
	         		title:'纠错',
	         		// subTitle:'112233',
	         		scope:$scope,
	         		buttons:[
	                  {
	                  	text:'取消',
	                  	type:'button-clear'
	                  },
	                  {
	                  	text:'确定',
	                  	type:'button-clear',
	                  	onTap:function(e){
	                    // e.preventDefault();
	                  	},
	                  }
	         		]
	         	});
	         	correctPop.then(function(res){

         	    });
            };
         })
         .controller('ordersCtrl', function($scope,$ionicPopover){
         	$ionicPopover.fromTemplateUrl('ordersPopover.html',{
         		scope:$scope
         	}).then(function(popover){
         		$scope.popover = popover;
         	});
         	$scope.popOrders = function($event){
         		$scope.popover.show($event);
         	};
         })
         .controller('orders-1Ctrl', function(){
         	
         })
         .controller('homeCtrl', function($location){
         	
         })
         .controller('indexCtrl', function($scope,$ionicHistory){
         	$scope.back = function(){
         		$ionicHistory.goBack();
         	}
         });