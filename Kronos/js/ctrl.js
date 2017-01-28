// var myApp=angular.module('kronos', ['ionic','onezone-datepicker','locals','LocalStorageModule']);
myApp
.controller('ctrl-17',function(){
    
})
.controller('ctrl-16',function(){
    
})
.controller('ctrl-15', function($scope,$state, $ionicModal, localStorageService, $ionicPopover){
    $scope.schedulesTable = {
            date:{year:'2016',curMonth:'五月',nextMonth:'六月'},
            details:[{date:'02/四',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'},
                     {date:'03/五',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'},
                     {date:'04/六',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'},
                     {date:'05/日',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'},
                     {date:'06/一',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'},
                     {date:'07/二',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'}]    
    };
    $ionicPopover.fromTemplateUrl('page15-pop.html', {  
                 scope: $scope })
                 .then(function(popover) {  
                 $scope.popover = popover;  
    }); 
    $scope.showPop = function($event){
        $scope.popover.show($event);
    };
    $scope.selectPop1 = function(){
        $scope.popover.hide();
        $state.go('page1');
    };
    $scope.selectPop2 = function(){
        $scope.popover.hide();
        $state.go('page2');
    }
})
.controller('ctrl-13', function ($scope, $ionicModal, localStorageService) {
    var currentDate = new Date();
    var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    $scope.date = date;
  
    // $scope.myFunction = function (date) {
    //     alert(date);
    // };

    $scope.onezoneDatepicker = {
        date: date,
        mondayFirst: false,
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        daysOfTheWeek: ["日", "一", "二", "三", "四", "五", "六"],
        startDate: new Date(1989, 1, 26),
        endDate: new Date(2024, 1, 26),
        disablePastDays: false,
        disableSwipe: false,
        disableWeekend: false,
       // disableDates: [new Date(date.getFullYear(), date.getMonth(), 15), new Date(date.getFullYear(), date.getMonth(), 16), new Date(date.getFullYear(), date.getMonth(), 17)],
        showDatepicker: true,
        showTodayButton: true,
        calendarMode: false,
        hideCancelButton: false,
        hideSetButton: false,
        //callback: $scope.myFunction
    };
    $scope.showDatepicker = function () {
        $scope.onezoneDatepicker.showDatepicker = !$scope.onezoneDatepicker.showDatepicker;
    };
    $scope.schedules = [
        {
            name:'林少生',
            num:'6602201',
            order:'A班',
            time:'6:00 - 14:00'
        },
        {
            name:'王熙凤',
            num:'6601298',
            order:'P班',
            time:'14:00 - 22:00'
        },
        {
            name:'贾宝云',
            num:'6602201',
            order:'N班',
            time:'22:00 - 6:00'
        }
    ];
    $scope.selectDate = function(n, a) {
            a || (e.selectedDate = n, e.month = e.createDatepicker(e.selectedDate), e.currentMonth = angular.copy(n), e.selectedYearSlide = t.getActiveYearSlide(e.yearSlides, e.currentMonth.getFullYear()), (d.calendarMode || d.hideSetButton) && i(e, d))
    };
    // $scope.ShowDiv = "No1";
 
    // $scope.ChangeShow = function(No){
    //     $scope.ShowDiv = No;
    // };
    localStorageService.set('schedules',$scope.schedules);
})
.controller('ctrl-12', function($scope, $ionicModal, localStorageService){
    $scope.LulinAlyLeave = [
        {
            title:'卢琳的请假申请',
            leaveType:'年假',
            start:'2016/05/05上午',
            end:'2016/05/12上午',
            days:'5.5',
            reason:'老家有紧急事处理'
        }
    ];
    localStorageService.set('lulin',$scope.LulinAlyLeave);
    // var leaveData = localStorageService.get('lulin');
    // alert(leaveData);
})
.controller('ctrl-11', function($scope, $ionicModal, localStorageService){
     $scope.todoPros = [
        {
            title:'出差申请流程-中间审批节点',
            instruction:'说明：1282|出差申请表',
            person:'卢琳',
            time:'17分钟前到达',
        },
        {
            title:'请假申请流程-中间审批节点',
            instruction:'说明：1225|请假申请表',
            person:'卢琳',
            time:'半个月前到达',
        }
    ];
    localStorageService.set('todoPros',$scope.todoPros);
})
.controller('ctrl-10', function($scope, $ionicModal, localStorageService){
    $scope.holidays = [
        {
            total:'5',
            surplus:'5',
        },
        {
            total:'5',
            surplus:'5',
        }
    ];
    localStorageService.set('holidays',$scope.holidays);
})
.controller('ctrl-9', function($scope, $ionicModal, localStorageService,util,$ionicHistory,$timeout,$ionicPopup){
    $scope.abnormals = {
            name:'黎明',
            ID:'6602220',
            fillDate:'2016年5月3日',
            sign:'是',
            actualUp:'09:12',
            correctUp:'09:30',
            actualDown:'18:12',
            correctDown:'18:30',
            reason:'清洁',
            status:'审批中'
    };
    $scope.submitData={};
    $scope.selectTime =function(){
        cordova.exec(
            function(data){
                $timeout(function(){
                    $scope.submitData.createDate = moment(data).format('YYYY-MM-DD');
                    $scope.abnormals.fillDate = $scope.submitData.createDate;
                },50)

            },
            function(data){
                alert(data);
            },
            "SelectTime",
            "selectDate",
            []
        );
    };
    $scope.submit = function(){
        localStorageService.set('abnormals',$scope.abnormals);
        // alert('提交成功');
        util.showLoading('提交成功');
        $timeout($scope.back,2000);
    };
    $scope.back = function(){
        $ionicHistory.goBack();
    };
    // localStorageService.set('abnormals',$scope.abnormals);
})
.controller('ctrl-8', function($scope, $ionicModal, localStorageService){
    $scope.attendances = {
            date:{year:'2016',curMonth:'五月',nextMonth:'六月'},
            forLeaves:[{day:'08-05',week:'周一',instruction:'3'}
                     ,{day:'08-18',week:'周二',instruction:'0.5'}],
            details:[{date:'02/四',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'迟到'},
                     {date:'03/五',amStart:'',amEnd:'',pmStart:'',pmEnd:'',amount:'',remark:'旷工'},
                     {date:'04/六',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:00',amount:7,remark:'早退'},
                     {date:'05/日',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'17:30',amount:7,remark:'早退'},
                     {date:'06/一',amStart:'',amEnd:'',pmStart:'',pmEnd:'',amount:'',remark:''},
                     {date:'07/二',amStart:'',amEnd:'',pmStart:'',pmEnd:'',amount:'',remark:''}]    
    };
    localStorageService.set('attendances',$scope.attendances);
})
.controller('ctrl-7', function($scope, $ionicModal, localStorageService,$ionicPopup,util,$timeout,$ionicHistory){
    $scope.overtime = {
            name:'黎明',
            ID:'6602220',
            overDate:'2016年5月3日',
            start:'08:30',
            end:'18:30',
            total:'8',
            reason:'清洁',
            status:'审批中'
    };
    $scope.submitData={};
    $scope.selectTime =function(){
        cordova.exec(
            function(data){
                $timeout(function(){
                    $scope.submitData.createDate = moment(data).format('YYYY-MM-DD');
                    $scope.overtime.overDate = $scope.submitData.createDate;
                },50)

            },
            function(data){
                alert(data);
            },
            "SelectTime",
            "selectDate",
            []
        );
    };
    // localStorageService.set('overtime',$scope.overtime);
    $scope.submit = function(){
        localStorageService.set('overtime',$scope.overtime);
        util.showLoading('提交成功');
        $timeout($scope.back,2000);
    };
    $scope.back = function(){
        $ionicHistory.goBack();
    };
})
.controller('ctrl-6', function($scope, $ionicModal, localStorageService,util,$ionicHistory,$timeout,$ionicPopup){
    $scope.askforleaves = {
            name:'黎明',
            ID:'6602220',
            startDate:'2016年5月3日',
            start:'08:30',
            endDate:'2016年5月10日',
            end:'18:30',
            type:'年假',
            reason:'清洁',
            status:'审批中'
    };
    $scope.submitData={};
    $scope.selectTime1 =function(){
        cordova.exec(
            function(data){
                $timeout(function(){
                    $scope.submitData.createDate1 = moment(data).format('YYYY-MM-DD');
                    $scope.askforleaves.startDate = $scope.submitData.createDate1;
                },50)

            },
            function(data){
                alert(data);
            },
            "SelectTime",
            "selectDate",
            []
        );
    };
    $scope.selectTime2 =function(){
        cordova.exec(
            function(data){
                $timeout(function(){
                    $scope.submitData.createDate2 = moment(data).format('YYYY-MM-DD');
                    $scope.askforleaves.endDate = $scope.submitData.createDate2;
                },50)

            },
            function(data){
                alert(data);
            },
            "SelectTime",
            "selectDate",
            []
        );
    };
    $scope.submit = function(){
        localStorageService.set('askforleaves',$scope.askforleaves);
        util.showLoading('提交成功');
        $timeout($scope.back,2000);
    };
    $scope.back = function(){
        $ionicHistory.goBack();
    };
    // localStorageService.set('askforleaves',$scope.askforleaves);
})
.controller('ctrl-5', function($scope, $ionicModal, localStorageService){
    $scope.myPros = [
        {
            title:'请假申请流程-中间审批节点',
            instruction:'说明：1263|请假申请单',
            status:'待审',
            time:'2016-5-10 11:04:11--',
        },
        {
            title:'出差申请流程-中间审批节点',
            instruction:'说明：1262|出差申请表',
            status:'待审',
            time:'2016-5-10 10:59:26--',
        },
        {
            title:'请假申请流程-中间审批节点',
            instruction:'说明：1225|请假申请表',
            status:'待审',
            time:'2016-4-11 10:23:40--',
        }
    ];
    localStorageService.set('myPros',$scope.myPros);
})
.controller('ctrl-4', function($scope, $ionicModal, localStorageService){
    $scope.schedulesTable = {
            date:{year:'2016',curMonth:'五月',nextMonth:'六月'},
            details:[{date:'02/四',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'},
                     {date:'03/五',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'},
                     {date:'04/六',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'},
                     {date:'05/日',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'},
                     {date:'06/一',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'},
                     {date:'07/二',amStart:'8:30',amEnd:'11:30',pmStart:'13:30',pmEnd:'18:30',amount:7,remark:'出差'}]    
    };
    localStorageService.set('schedulesTable',$scope.schedulesTable);
})
.controller('ctrl-3', function($scope, $ionicModal, localStorageService,$ionicPopup,$timeout){
    $scope.demo = {
            name:'黎明',
            ID:'6602220',
            startDate:'2016年5月3日',
            endDate:'2016年5月10日'
    };
    $scope.submit = function(){
        localStorageService.set('demo',$scope.demo);
    };
    $scope.submitData={};
    $scope.selectTime1 =function(){
        cordova.exec(
            function(data){
                try{ $timeout(function(){
                   $scope.submitData.createDate1 = moment(data).format('YYYY-MM-DD');
                   $scope.demo.startDate = $scope.submitData.createDate1;
                },50)}catch(e){alert("1"+e)}

            },
            function(data){
                alert(data);
            },
            "SelectTime",
            "selectDate",
            []
        );
    };
    $scope.selectTime2 =function(){
        cordova.exec(
            function(data){
                try{ $timeout(function(){
                   $scope.submitData.createDate2 = moment(data).format('YYYY-MM-DD');
                   $scope.demo.endDate = $scope.submitData.createDate2;
                },50)}catch(e){alert("1"+e)}

            },
            function(data){
                alert(data);
            },
            "SelectTime",
            "selectDate",
            []
        );
    };
    // localStorageService.set('demo',$scope.demo);
})
.controller('ctrl-2', function($scope, $ionicModal, localStorageService,util,$timeout,$ionicHistory,$ionicPopup){
    $scope.batchHours = {
            name:'黎明',
            ID:'6602220',
            startDate:'2016年5月3日',
            start:'8:30',
            endDate:'2016年5月10日',
            end:'18:30',
            type:'出差',
            content:'清洁',
            status:'审批中'
    };
    // $scope.batchHours.start = new Date($scope.batchHours.start);
    // $scope.batchHours.end = new Date($scope.batchHours.end);
    $scope.submit = function(){
        localStorageService.set('batchHours',$scope.batchHours);
        util.showLoading('提交成功');
        $timeout($scope.back,2000);
    };
    $scope.back = function(){
        $ionicHistory.goBack();
    };
    $scope.submitData={};
    // $scope.selectHours1 =function(){
    //     cordova.exec(
    //         function(data){
    //             $timeout(function(){
    //                 $scope.submitData.createHours1 = moment(data).format('YYYY-MM-DD HH:mm:ss');
    //             },50)

    //         },
    //         function(data){
    //             alert(data);
    //         },
    //         "SelectTime",
    //         "selectDate",
    //         []
    //     );
    // };
    $scope.selectTime1 =function(){
        cordova.exec(
            function(data){
                $timeout(function(){
                    $scope.submitData.createDate1 = moment(data).format('YYYY-MM-DD');
                    $scope.batchHours.startDate = $scope.submitData.createDate1;
                },50)

            },
            function(data){
                alert(data);
            },
            "SelectTime",
            "selectDate",
            []
        );
    };
    $scope.selectTime2 =function(){
        cordova.exec(
            function(data){
                $timeout(function(){
                    $scope.submitData.createDate2 = moment(data).format('YYYY-MM-DD');
                    $scope.batchHours.endDate = $scope.submitData.createDate2;
                },50)

            },
            function(data){
                alert(data);
            },
            "SelectTime",
            "selectDate",
            []
        );
    };
    // localStorageService.set('batchHours',$scope.batchHours);
})
.controller('ctrl-1', function($scope, $ionicModal, localStorageService,util,$ionicHistory,$timeout,$ionicPopup){
    $scope.workHours = {
            name:'黎明',
            ID:'6602220',
            startDate:'2016年5月3日',
            type:'出差',
            total:'8小时',
            content:'清洁',
            status:'审批中'
    };
    $scope.submit = function(){
        localStorageService.set('workHours',$scope.workHours);
        // alert(JSON.stringify($scope.workHours));
        util.showLoading('提交成功');
        $timeout($scope.back,2000);
    };
    $scope.back = function(){
        $ionicHistory.goBack();
    };
    // $scope.date = null;
    // $scope.arrows = {
    //     year: {
    //         left: './img/white_arrow_left.svg',
    //         right: './img/white_arrow_right.svg'
    //     },
    //     month: {
    //         left: './img/grey_arrow_left.svg',
    //         right: './img/grey_arrow_right.svg'
    //     }
    // }
    // $scope.header = {
    //     monday: 'Mon',
    //     tuesday: 'Tue',
    //     wednesday: 'Wed',
    //     thursday: 'Thu',
    //     friday: 'Fri',
    //     saturday: 'Sat',
    //     sunday: 'Sun',
    // }
    $scope.submitData={};//提交数据
    $scope.selectTime =function(){
           cordova.exec(
                function(data){
                    $timeout(function(){
                        try{$scope.submitData.createDate =moment(data).format('YYYY-MM-DD');}
                        catch(e){alert("1"+e)}
                        $scope.workHours.startDate = $scope.submitData.createDate;
                    },50)

                },
                function(data){
                    alert(data);
                },
                "SelectTime",
                "selectDate",
                []
            );
            
    };

    // localStorageService.set('workHours',$scope.workHours);
})
.controller('ctrl-home', function($scope,$state,$stateParams,$ionicModal,localStorageService,$ionicHistory,$ionicPopup,util){
    // $scope.custom_close= function(){
    //     if
    //     (confirm("您确定要退出吗？")){
    //     window.opener=null;
    //     window.open('','_self');
    //     window.close();
    //     }
    //     else{}
    // }
    $scope.exit =function(){
            // alert(111);
            try{
            cordova.exec(function() {

            }, function(e) {console.log("Error: "+e);
            }, "Activity","exitWebApp",[]);
        }catch(e){
            // alert("1"+e)
        };}

});