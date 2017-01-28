/**
 * Created by zjf on 2015/7/6.
 */
ionicApp.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $stateProvider
        .state('login',{
            url:'/login',
            cache:false,
            templateUrl:'login.html',
            controller:'loginControl'
        })

        .state('home', {
            url: '/home/?userCode',
            abstract:true,
            /*cache:false,*/
            templateUrl: 'home.html',
            controller: 'HomeControl'
        })

        .state('home.showTodo', {
            url: '/showTodo',
            cache:'false',
            views:{
              'showTodo-tab':{
                  templateUrl: 'showTodo.html',
                  controller: 'showTodoControl'
              }
          }
        })
        .state('home.showHis', {
            url: '/showHis',
            cache:'false',
            views:{
                'showHis-tab':{
                    templateUrl: 'showHis.html',
                    controller: 'showHisControl'
                }
            }
        })
        .state('home.showStartup', {
            url: '/showStartup',
            cache:'false',
            views:{
                'showStartup-tab':{
                    templateUrl: 'showstartup.html',
                    controller: 'showStartupControl'
                }
            }
        })
        .state('home.formList',{
            url: '/formList',
           /* cache:'false',*/
            views:{
                'formList-tab':{
                    templateUrl: 'FormList.html',
                    controller: 'formlistCtrl'
                }
            }
        })


        .state('detail',{
            url: '/detail/?list?activityInstId&workitemId&id&businessState&chatId',

            templateUrl: 'detail.html',//待办流程的详细跳转页面
            controller: 'detailControl',
            cache:"false"
        })

        .state('auditHis',{
            url: '/auditHis/?list',

            templateUrl: 'auditHis.html',//待办流程的审批历史页面
            controller: 'auditHisControl',
            cache:"false"
        })

        .state('auditType',{
            url: '/auditType/?list?Url',

            templateUrl: 'auditType.html',
            controller: 'auditTypeControl',
            cache:"false"
        })
        .state('auditFormDetial',{
            url: '/auditFormDetial/?list?Url',
            templateUrl: 'auditFormDetial.html',
            controller: 'auditFormDetialControl',
            cache:"false"
        })
        .state('auditFormDetial2',{
            url: '/auditFormDetial2/?id?itemLineData?Url',
            templateUrl: 'auditFormDetial2.html',
            controller: 'auditFormDetialControl2',
            cache:"false"
        })
        .state('auditFormDetial3',{
            url: '/auditFormDetial3/?id?itemLineData?Url',
            templateUrl: 'auditFormDetial3.html',
            controller: 'auditFormDetialControl3',
            cache:"false"
        })

        .state('auditHis2',{
            url: '/auditHis2/?id?itemLineData',

            templateUrl: 'auditHis2.html',
            controller: 'auditHis2Control',
            cache:"false"
        })

        .state('auditType2',{
            url: '/auditType2/?id?itemLineData?Url',

            templateUrl: 'auditType2.html',
            controller: 'auditType2Control',
            cache:false
        })

        .state('detail2',{
            url: '/detail2/?id?itemLineData',

            templateUrl: 'detail2.html',//已办流程详细跳转页面
            controller: 'detail2Control',
            cache:false
        })
        .state('auditHis3',{
            url: '/auditHis3/?id?itemLineData',

            templateUrl: 'auditHis3.html',
            controller: 'auditHis3Control',
            cache:"false"
        })

        .state('auditType3',{
            url: '/auditType3/?id?itemLineData?Url',

            templateUrl: 'auditType3.html',
            controller: 'auditType3Control',
            cache:false
        })

        .state('detail3',{
            url: '/detail3/?id?itemLineData',

            templateUrl: 'detail3.html',//已办流程详细跳转页面
            controller: 'detail3Control',
            cache:false
        })

        .state('pgAuditAdvise',{
            url:'/pgAuditAdvise?list',

            templateUrl:'pgAuditAdvise.html',
            controller:'pgAuditAdviseControl'
        })

        .state('pgAuditAdvise2',{
            url:'/pgAuditAdvise2?list?list2?list2activity?list4',

            templateUrl:'pgAuditAdvise2.html',
            controller:'pgAuditAdvise2Control'
        })

        .state('pgAuditAdvise3',{
            url:'/pgAuditAdvise3?list3?list3realname?list4',

            templateUrl:'pgAuditAdvise3.html',
            controller:'pgAuditAdvise3Control'
        })

        .state('pgAuditAdvise4',{
            url:'/pgAuditAdvise4?list3?list3realname?list4',

            templateUrl:'pgAuditAdvise4.html',
            controller:'pgAuditAdvise4Control'
        })

        .state('lookUp',{
            url:"/lookUp?list4",
            templateUrl:"lookUp.html",
            controller:'lookUpControl'

        })
        .state('lookUp2',{
            url:"/lookUp2?list2?transdata2",
            templateUrl:"lookUp2.html",
            controller:'lookUp2Control'

        })
        .state('lookUp4',{
            url:"/lookUp4?list4",
            templateUrl:"lookUp4.html",
            controller:'lookUp4Control'

        })


   /*     .state('popover',{
            url:"/popover",
            templateUrl:"popover.html"

        })*/

        .state('pgFormLineInfo',{
            url:'/pgFormLineInfo?itemLineData?pgFormDedtialData',
            templateUrl:'pgFormLineInfo.html',
            controller:'pgFormLineInfoControl'

        })
        .state('pgFormDetail',{
            url:'/pgFormDetail?parent_index?index',
            templateUrl:'pgFormDetail.html',
            controller:'pgFormDetailControl'

        })
        .state('formdetial',{
            url:'/formdetial?MENULABEL?savedata?choosen?backupDisplay?backupgroup?instance?formData?FIELD_NAME?Multiselect?backupDefault?firstChoosen?hideDisplayname?backuphideDisplayname',
            templateUrl:'formdetial.html',
            cache:false,
            controller:'formdetialCtrl'
        })
        .state('formline',{
            url:'/formline?datalist?list?savedata?title?backupDisplay?backupgroup?instance?formData?backupDefault?state?fieldName?hideDisplayname',
            templateUrl:'Formline.html',
            cache:false,
            controller:'formlineCtrl'
        })
        .state('formlineinput',{
            url:'/formlineinput?datalist?savedata?title?backupDisplay?backupgroup?instance?formData?choosen?MENULABEL?formId?Selectlist?backupDefault?fieldName?formLineId?hideDisplayname?backuphideDisplayname',
            templateUrl:'FormlineInput.html',
            cache:false,
            controller:'formlineinputCtrl'
        })
        .state('listChoosen',{
            url:'/listChoosen?ListID?ID?formId?title?backupDisplay?backupgroup?instance?formData?savedata?backupDefault?fieldName?firstChoosen?hideDisplayname?backuphideDisplayname',
            templateUrl:'ListChoosen.html',
            cache:false,
            controller:'listChoosenCtrl'
        })
        .state('FormlineChoosen',{
            url:'/FormlineChoosen?ListID?ID?formId?title?backupDisplay?backupgroup?instance?formData?choosen?MENULABEL?datalist?Selectlist?savedata?backupDefault?fieldName?formLineId?hideDisplayname?backuphideDisplayname',
            templateUrl:'FormlineChoosen.html',
            cache:false,
            controller:'FormlineChoosenCtrl'
        })
        .state('listChooseMore',{
            url:'/listChooseMore?ListID?ID?formId?title?backupDisplay?backupgroup?instance?formData?FIELD_NAME?fieldName',
            templateUrl:'listChooseMore.html',
            cache:false,
            controller:'listChooseMoreCtrl'
        })
        .state('formDetialIos',{  //ios下打开表单详细
            url:'/formDetialIos?Url',
            templateUrl:'formDetialIos.html',
            cache:false,
            controller:'formDetialIosCtrl'
        })
	.state('formAttach',{  //ios下打开表单详细
            url:'/formAttach?Url',
            templateUrl:'formAttach.html',
            cache:false,
            controller:'formAttachCtrl'
        });
	if(!isWX()){
		//$urlRouterProvider.otherwise('/home//showTodo');
		$urlRouterProvider.otherwise('/login');
	}
        $ionicConfigProvider.platform.android.tabs.position("bottom");
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.views.swipeBackEnabled(false);
    }
);