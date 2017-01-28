/**
 * Created by GZW on 2015/12/21.
 */
/**
 * 获取用户信息
 * @param _fun成功的返回函数
 */
function getUserInfor(_fun){
    if (window.cordova) {
        wpt.getUsersInfo(
            function (userStr){
                var user = eval('('+userStr+')');
                userName = user.userCode;
                wpt.DataLoadOver();
                if(_fun){
                    _fun();
                }
            },
            function(){
                alert("获取用户失败");
                appexit(0);
            }
        );

    } else {
        try{
            userName = window.wpt.getUsersInfo();
        }catch (e){
            //alert("获取用户失败");
            userName = "10990620";
            //userName = "10916835";
            //userName = "10937695";

        }

        if(_fun){
            _fun();
        }
    }
}

/**
 * 选择人员
 * @param _fun成功的返回函数；_errorFunc失败返回函数
 */
function selectContacts(_fun,_errorFunc){
    if (window.cordova) {
        wpt.selectContacts(
            "com.sie.mp.activity.SelectContactsActivity",
            "true",
            {
                'requestCode':1, //回调eventCode,如是startForResult是true，则requestCode必须传入，否则不用传入
                'requestTip':'0,1,2', //显示那几个标签页，0组织、1岗位、2联系人、3群组、4公众号,默认全部
                'isCheckBox':false, //是否带CheckBox框 true带   false
                'scopePublicNO':'ALL', //公众号:ALL-查询所有公众号、SYS--系统级、MINE--我订阅的、OTHER--未订阅的
                'scopeGroup':'ALL'// MINE--只查询我所在的群 OTHER--我没有加入的群  什么都不传，或者ALL都是查询所有群
            },
            function(users){
                var usersData = eval('('+users+')');
                if(usersData.length>0){
                    _fun(usersData[0]);
                }
            }
            ,
            _errorFunc
        );
    }else{
        window['selectUserRet']=_fun;
        window.wpt.selectContacts();
    }
}
/**
 * android的选择人员后执行事件
 * @param
 */
function setSelectUser(param) {
    window['selectUserRet'](param);
}
function appexit(isApproval){
    if (window.cordova) {
        wpt.exitBPM(isApproval);
    }else{
        //isApproval : 0或空无变化，1删除行
        window.wpt.exit(isApproval);
    }
}
/**
 *打开附件
 * @param _fun成功的返回函数
 */
function openFile(url,size,_fun){
    if (window.cordova) {
        wpt.openFile(url,size,_fun,_fun);
    }else{
        window['openFileRet']=_fun;
        window.wpt.openFile(url);
        window.wpt.openFile2(url,size);
    }
}
/**
 * 安卓的选择附件后执行返回函数
 */
function setFileDone(){
    window['openFileRet']();
}
function showImg(allSrc,src){
    var currentIndex = 0;
    for(var i= 0,l=allSrc.length;i<l;i++){
        if(allSrc[i]==src){
            currentIndex = i;
            break;
        }
    }
    var param = JSON.stringify({allSrc:allSrc,currentIndex:currentIndex});
    if (window.cordova) {
        wpt.openImage(param);
    }else{
        window.wpt.openImage(param);
    }
}
/*function initImgOnClick(s){
    window.setTimeout(function(){
        var allSrc = [];
        for(var i= 0;i< s.length;i++){
            var oUl = document.getElementById(s[i]);        //加上它的上级元素，可以避免我们筛选出许多无用的节点出来
            var aLi = oUl.getElementsByTagName("img");
            for(var j = 0,k=aLi.length;j<k;j++){
                if(aLi[j].clientWidth>80||aLi[j].clientHeight>80){
                    allSrc.push(aLi[j].src);
                    aLi[j].onclick=function(e){
                        showImg(allSrc,this.src);
                    }
                }

            }
        }


    },1000);
}*/
/**
 * 初始化富文本里面的图片点击效果，调用原生控件
 * @param s是富文本框的id数组
 */
function initImgOnClick(s){
    var ids=s;
    function clickImg(src) {
        var allSrc=[];
        for (var i = 0; i < ids.length; i++) {
            var oUl = document.getElementById(ids[i]);        //加上它的上级元素，可以避免我们筛选出许多无用的节点出来
            var aLi = oUl.getElementsByTagName("img");
            for (var j = 0, k = aLi.length; j < k; j++) {
                if(aLi[j].clientWidth>80||aLi[j].clientHeight>80){
                    allSrc.push(aLi[j].src);
                }
            }
        }
        showImg(allSrc,src);
    }
    window.setTimeout(function(){
        for(var i= 0;i< ids.length;i++){
            var oUl = document.getElementById(ids[i]);        //加上它的上级元素，可以避免我们筛选出许多无用的节点出来
            var aLi = oUl.getElementsByTagName("img");
            for(var j = 0,k=aLi.length;j<k;j++){
                aLi[j].onclick=function(e){
                    if(this.clientWidth>80||this.clientHeight>80){
                        clickImg(this.src);
                    }
                }
            }
        }
    },1000);

}

/**
 * 初始化滚动时候，滚到最上和最低的按钮
 */
function initScroll(){
    window.setTimeout(function(){
        var bheight=document.body.scrollHeight;
        var oUl = document.getElementById("bpm-detail-content");
        var oldscroll=0;
        oUl.onscroll=function(event){

            if(Math.abs(oUl.scrollTop-oldscroll)<10)return;
            if(oUl.scrollTop>oldscroll){
            //if(this.scrollTop>oldscroll){
                document.getElementById("btn-scroll-top").style.display="none";
                document.getElementById("btn-scroll-bottom").style.display="block";
            }else{
                document.getElementById("btn-scroll-top").style.display="block";
                document.getElementById("btn-scroll-bottom").style.display="none";
            }
            oldscroll = oUl.scrollTop;
            if(oUl.scrollTop==0||oUl.scrollTop+bheight+10>oUl.scrollHeight){
                document.getElementById("btn-scroll-top").style.display="none";
                document.getElementById("btn-scroll-bottom").style.display="none";
            }
        }
    },1000);
}
/**
 *  滚到顶部
 */
function scrollToTop(){
    var oUl = document.getElementById("bpm-detail-content");
    oUl.scrollTop=0;
    window.setTimeout(function(){
        document.getElementById("btn-scroll-top").style.display="none";
    });
}
/**
 *  滚到底部
 */
function scrollToBottom(){
    var oUl = document.getElementById("bpm-detail-content");
    oUl.scrollTop=oUl.scrollHeight;
    window.setTimeout(function(){
        document.getElementById("btn-scroll-bottom").style.display="none";
    });
}

