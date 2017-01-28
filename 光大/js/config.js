/**
 * Created by Administrator on 2015/6/24.
 */
var user ={
    //userId:'702',
    //userId:'666',
    userId:'702',
    //userId:'20420',
    name:'张三',
    tel:'',
    userCode:''
};
//var url ='http://192.168.169.57:8080/HN_WPT/';//测试
//var url ='http://61.145.96.125:8018/wpt/';
var url ='http://crm.china-honor.com:8080/wpt/';//华耐正式
var colorList =[{color:'#fe0217'},
                {color:'#1DB1F1'},
                {color:'#7EE071'},
                {color:'#f9b67d'},
                {color:'#64c9e3'},
                {color:'#b273da'},
                {color:'#C2EF5D'},
                {color:'#7456DF'}];
function daysBetween(DateOne,DateTwo)
{
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));

    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));

    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
    return Math.abs(cha);
}

function daysBetween2(date){
    if(date==null||date==undefined||date==''){
        return ''
    }
    var a =moment(date).format('YYYY-MM-DD');
    var b =moment().format('YYYY-MM-DD');
    return daysBetween(b,a);
}