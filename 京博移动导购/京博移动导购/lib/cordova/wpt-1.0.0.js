var wpt = function () { };

wpt.checkPlatform = function()
{
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > 1 || u.indexOf('Linux') > 1;
    if (isAndroid)
    {
        document.write('<script src="js\/cordova\/cordova-android.3.5.0.js"><\/script>')
    }
    else
    {
        document.write('<script src="js\/cordova\/cordova-ios.3.5.0.js"><\/script>')
    }
}

/**
 * 注册Action
 * @param cfg
 * @param success
 * @param fail
 */

wpt.registerActions = function(cfg, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "registerActions",
        [cfg]
    );
}

/**
 * 修改标题
 * @param actionId
 * @param actionTitle
 * @param success
 * @param fail
 */
wpt.setActionTitleById = function(actionId, actionTitle, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionTitleById",
        [actionId, actionTitle]
    );
}

/**
 * 修改标题
 * @param actions
 * @param success
 * @param fail
 */
wpt.setActionTitleBatch = function(actions, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionTitleBatch",
        [actions]
    );
}


/**
 * 设置action是否可见
 * @param actionId
 * @param visible
 * @param success
 * @param fail
 */
wpt.setActionVisibleById = function(actionId, visible, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionVisibleById",
        [actionId, visible]
    );
}

/**
 * 设置action是否可见
 * @param actions
 * @param success
 * @param fail
 */
wpt.setActionVisibleBatch = function(actions, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionVisibleBatch",
        [actions]
    );
}

/**
 * 设置action是否可用
 * @param actionId
 * @param enabled
 * @param success
 * @param fail
 */
wpt.setActionEnableById = function(actionId, enabled, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionEnableById",
        [actionId, enabled]
    );
}

/**
 * 设置按钮是否可用
 * @param actions
 * @param success
 * @param fail
 */
wpt.setActionEnableBatch = function(actions, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionEnableBatch",
        [actions]
    );
}

/**
 * 设置图标
 * @param actionId
 * @param icon
 * @param success
 * @param fail
 */
wpt.setActionIconById = function(actionId, icon, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionIconById",
        [actionId, icon]
    );
}

/**
 * 批量设置图标
 * @param actions
 * @param success
 * @param fail
 */
wpt.setActionIconBatch = function(actions, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionIconBatch",
        [actions]
    );
}

/**
 * 重置某个/某几个部分布局
 * @param actions
 * @param success
 * @param fail
 */
wpt.resetNavigatorLayout = function(actions, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "resetNavigators",
        [actions]
    );
}

/**
 * 设置Action是否选中
 * @param actionId
 * @param checked
 * @param success
 * @param fail
 */
wpt.setActionCheckedById = function(actionId, checked, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionCheckedById",
        [actionId, checked]
    );
}

/**
 * 设置Action是否选中
 * @param actions
 * @param success
 * @param fail
 */
wpt.setActionCheckedBatch = function(actions, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionCheckedBatch",
        [actions]
    );
}


/**
 * 设置按钮的回调函�?
 * @param actionId
 * @param callback
 * @param success
 * @param fail
 */
wpt.setActionCallbackById = function(actionId, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionCallbackById",
        [actionId, callback]
    );
}

/**
 * 设置按钮的回调函�?
 * @param actions
 * @param success
 * @param fail
 */
wpt.setActionCallbackBatch = function(actions, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setActionCallbackBatch",
        [actions]
    );
}

/**
 * 显示或隐藏ActionBar
 * @param isShow
 * @param success
 * @param fail
 */
wpt.showActionBar = function(isShow, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "showActionBar",
        [isShow]
    );
}


/**
 * 显示或隐藏ActionBar
 * @param isShow
 * @param success
 * @param fail
 */
wpt.setBrowserTitle = function(title, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "setBrowserTitle",
        [title]
    );
}

/**
 * 刷新Actionbar
 * @param titles
 * @param visibles
 * @param enables
 * @param callbacks
 * @param success
 * @param fail
 */
wpt.refreshAction = function(titles, visibles, enables, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "refreshAction",
        [titles, visibles, enables, callbacks]
    );
}

/**
 *
 * @param sectionId
 * @param params
 * @param callbacks
 * @param success
 * @param fail
 */
wpt.registerSection = function(sectionId, className, params, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "registerSection",
        [sectionId, className, params]
    );
}

/**
 * 刷新�?
 * @param sectionId
 * @param params
 * @param callbacks
 * @param success
 * @param fail
 */
wpt.refreshSection = function(sectionId, params, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "refreshSection",
        [sectionId, params]
    );
}

/**
 * 删除一�?
 * @param sectionId
 * @param callbacks
 * @param success
 * @param fail
 */
wpt.removeSection = function(sectionId, success, fail){
    cordova.exec(
        success,
        fail,
        "WPTBrowserCfg",
        "removeSection",
        [sectionId]
    );
}

/**
 * 获取当前用户信息
 * @param success 返回{'userId':22354718,'userName':'xxx','gender':'M','telNo':'13630040970','userCode':'sie_maiwanyi','avatar':'头像网址'}
 * @param fail
 */
wpt.getUsersInfo = function(success, fail){
    cordova.exec(
        success,
        fail,
        "UsersInfo",
        "getUsersInfo",
        []
    );
}
wpt.DataLoadOver = function(success, fail){
    cordova.exec(
        success,
        fail,
        "HideTheLoadingAnimation",
        "dataLoadOver",
        []
    );
}



/**
 * 拍照
 * @param params
 * @param success 返回{'filePath':'/storage/sdcard0/com.sie.mp/image/20150416034031.jpg','fileSize':41234,'fileName':'20150416034031.jpg'}
 * @param fail
 */
wpt.takePhoto = function(params,success, fail){
    cordova.exec(
        success,
        fail,
        "Camera",
        "takePhoto",
        [params]
    );
}

/**
 * 从相册选择图片
 * @param params
 * @param success 返回{'filePath':'/storage/sdcard0/com.sie.mp/image/20150416034031.jpg','fileSize':41234,'fileName':'20150416034031.jpg'}
 * @param fail
 */
wpt.selectPhoto = function(params,success, fail){
    cordova.exec(
        success,
        fail,
        "Camera",
        "selectPhoto",
        [params]
    );
}

/**
 * 拍照并上传照�?
 * @param params
 * @param success 返回{'fileId':10001,'filePath':'/storage/sdcard0/com.sie.mp/image/20150416034031.jpg','fileSize':41234,'fileName':'20150416034031.jpg','serverPath':'服务器路�?}
 * @param fail
 */
wpt.takePhotoAndUpload = function(params,success, fail){
    cordova.exec(
        success,
        fail,
        "Camera",
        "takePhotoAndUpload",
        [params]
    );
}

/**
 * 拍摄
 * @param params
 * @param success 返回{'filePath':'/storage/sdcard0/com.sie.mp/image/20150416034031.mp4','fileSize':41234,'fileName':'20150416034031.mp4'}
 * @param fail
 */
wpt.takeVideo = function(params,success, fail){
    cordova.exec(
        success,
        fail,
        "Camera",
        "takeVideo",
        [params]
    );
}

/**
 * 从相册选择视频
 * @param params
 * @param success 返回{'filePath':'/storage/sdcard0/com.sie.mp/image/20150416034031.mp4','fileSize':41234,'fileName':'20150416034031.mp4'}
 * @param fail
 */
wpt.selectVideo = function(params,success, fail){
    cordova.exec(
        success,
        fail,
        "Camera",
        "selectVideo",
        [params]
    );
}

/**
 * 选择联系�?
 * @param params
 * @param success
 * @param fail
 */
wpt.selectContacts = function(className,startForResult,params,success, fail){
    cordova.exec(
        success,
        fail,
        "Activity",
        "startActivity",
        [className,startForResult,params]
    );
}

/**
 * 调用扫一�?
 * @param params
 * @param success
 * @param fail
 */
wpt.scanCode = function(params,success, fail){
    cordova.exec(
        success,
        fail,
        "CodeInfo",
        "scanCode",
        [params]
    );
}

/**
 * 选择地理位置
 * @param params
 * @param success
 * @param fail
 */
wpt.queryLoc = function(params,success, fail){
    cordova.exec(
        success,
        fail,
        "LocInfo",
        "queryLoc",
        [params]
    );
}

/**
 * 选择时间插件
 * @param success
 * @param fail
 */
wpt.selectTime = function(success, fail){
    cordova.exec(
        success,
        fail,
        "SelectTime",
        "selectTime",
        []
    );
}

/**
 * 选择日期插件
 * @param success
 * @param fail
 */
wpt.selectDate = function(success, fail){
    cordova.exec(
        success,
        fail,
        "SelectTime",
        "selectDate",
        []
    );
}

/**
 * 选择月份插件
 * @param success
 * @param fail
 */
wpt.selectMonth = function(success, fail){
    cordova.exec(
        success,
        fail,
        "SelectTime",
        "selectMonth",
        []
    );
}

/**
 * 上传文件
 * @param params [{'filePath':'/storage/sdcard0/com.sie.mp/image/20150416034031.jpg','fileSize':41234,'fileName':'20150416034031.jpg'},{'filePath':'/storage/sdcard0/com.sie.mp/image/20150416034457.jpg','fileSize':41873,'fileName':'20150416034457.jpg'},{'filePath':'/storage/sdcard0/com.sie.mp/image/20150416034900.jpg','fileSize':44361,'fileName':'20150416034900.jpg'}]
 * @param success
 * @param fail
 */
wpt.uploadFile = function(params,success, fail){
    cordova.exec(
        success,
        fail,
        "Upload",
        "uploadFile",
        [params]
    );
}

/**
 * 录音
 * @param params
 * @param success
 * @param fail
 */
wpt.takeVoice = function(params,success, fail){
    cordova.exec(
        success,
        fail,
        "Voice",
        "takeVoice",
        [params]
    );
}

/**
 * 退出app
 * @param params
 * @param success
 * @param fail
  */
wpt.exitWebApp = function(success, fail){
    cordova.exec(
        success,
        fail,
        "Activity",
        "exitWebApp",
        []
    );
};
wpt.exitBPM = function(success, fail,params){
    cordova.exec(
        success,
        fail,
        "TerminateWebApp",
        "exitWebApp",
        [params]
    );
};


/**
 * 退出app
 * @param success
 * @param fail
  */
wpt.exitWebApp = function (success, fail) {
    cordova.exec(
        success,
        fail,
        "Activity",
        "exitWebApp",
        []
    );
}

/**
 * activity跳转
 * @param className
 * @param startForResult
 * @param params
 * @param success
 * @param fail
  */
wpt.startActivity=function(className,startForResult,params,success, fail){
    cordova.exec(
        success,
        fail,
        "Activity",
        "startActivity",
        [className, startForResult,params]
    );
}


/**
 * 发送事件广�?
 * @param className
 * @param startForResult
 * @param params
 * @param success
 * @param fail
  */
wpt.sendEvent = function (code, params, success, fail) {
    cordova.exec(
        success,
        fail,
        "Activity",
        "sendEvent",
        [code, params]
    );
}

/**
 * 发送广�?
 * @param className
 * @param startForResult
 * @param params
 * @param success
 * @param fail
  */
wpt.sendBroadcast = function (action, params, success, fail) {
    cordova.exec(
        success,
        fail,
        "Activity",
        "sendBroadcast",
        [action, params]
    );
}

/**
 * �����ȥ
 * @param params
 * @param success
 * @param fail
  */
wpt.shareOutside = function (params, success, fail) {
    cordova.exec(
        success,
        fail,
        "Share",
        "shareOutside",
        [params]
    );
}

/**
 * ��绰
 * @param tel
 * @param success
 * @param fail
  */
wpt.takeTel = function (tel, success, fail) {
    cordova.exec(
        success,
        fail,
        "Tel",
        "takeTel",
        [tel]
    );
}


/**
 * 分享出去
 * @param params
 * @param success
 * @param fail
  */
wpt.shareOutside = function (params, success, fail) {
    cordova.exec(
        success,
        fail,
        "Share",
        "shareOutside",
        [params]
    );
}


/**
 * 检测网络状态
 * @param success 返回值，如果有网络：{'netStatus':'Y','netTypeName':'xxx','netSubtypeName':'xxx'},没网络：{'netStatus':'N'}
 * @param fail
  */
wpt.checkNetStatus = function (success, fail) {
    cordova.exec(
        success,
        fail,
        "UsersInfo",
        "checkNetStatus",
        []
    );
}


/**
 * 检测设备信息
 * @param success 返回值，出错返回null否则返回：{'osName':'ANDROID','osVersion':'xxx','phoneVendor':'xxx','phoneModel':'xxx','sysVersion':'xxx','uuid':'xxx'}
 * @param fail
  */
wpt.checkPhoneInfo = function (success, fail) {
    cordova.exec(
        success,
        fail,
        "UsersInfo",
        "checkPhoneInfo",
        []
    );
}


wpt.openFile = function(downloadUrl,size,success, fail){
    cordova.exec(
        success,
        fail,
        "viewTheFiles",
        "openFile",
        [downloadUrl,size]
    );
}
wpt.openImage  = function(param,success, fail){
    cordova.exec(
        success,
        fail,
        "ScanImages",
        "openImage",
        [param]
    );
}