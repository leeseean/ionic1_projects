/**
 * Created by Administrator on 2015/6/19.
 */
app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
    //$ionicConfigProvider.scrolling.jsScrolling(true);
    $stateProvider.state('main',{
        url:'/main',
        abstract: true,
        templateUrl:'templates/main.html',
        //controller:'mainCtrl'
    }).state('main.todo',{
            url: "/todo",
            views: {
                'todo-tab': {
                    templateUrl: "templates/todo.html",
                    controller: 'todoCtrl'
                }
            }
    }).state('main.launch',{
        url: "/launch",
        views: {
            'launch-tab': {
                templateUrl: "templates/launch.html",
                controller: 'launchCtrl'
            }
        }
    }).state('main.done',{
        url: "/done",
        views: {
            'done-tab': {
                templateUrl: "templates/done.html",
                //controller: 'HomeTabCtrl'
            }
        }
    }).state('main.personal',{
        url: "/personal",
        views: {
            'personal-tab': {
                templateUrl: "templates/personal.html",
                //controller: 'HomeTabCtrl'
            }
        }
    }).state('toDoDetail',{
        url:'/toDoDetail/?pId&pType&pTypeName',
        templateUrl:'templates/toDoDetail.html',
        controller:'todoDetailCtrl'
    }).state('expenseEdit',{
        url:'/expenseEdit',
        templateUrl:'templates/expenseEdit.html'
    }).state('planChangeEdit',{
        url:'/planChangeEdit',
        templateUrl:'templates/planChangeEdit.html'
    });
    $urlRouterProvider.otherwise('/main/todo');
});