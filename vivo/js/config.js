/**
 * Created by GZW on 2015/8/26.
 */
//var vivo_url="http://127.0.0.1:8080/eos-default/";//本地测试
var service_url = "http://172.20.119.104:8020/BpmAppService.asmx?wsdl";//测试服务器
var vivo_file_url="http://221.4.142.106:8088/vivobpm/";
//var vivo_url="https://172.20.123.109:8443/vivobpm/";//内网
var vivo_url="http://221.4.142.106:8088/vivobpm/";//外网
var attachUrl="ftp://172.20.119.104/";


var cnNumber = ["一","二","三","四","五","六","七","八","九","十"];//中文的序号

var PwdValidationApprove_url="com.wpt.vivoHttp.webService.PwdValidationApprove.biz.ext";//审批密码验证接口
var ApprovalOpinion_url="com.wpt.vivoHttp.webService.ApprovalOpinion.biz.ext";//处理用户对流程的同意、不同意和意见审批操作
var ToDispatch_url="com.wpt.vivoHttp.webService.ToDispatch.biz.ext";//重新分派接口

var getBPMdetail_url="com.wpt.vivoHttp.webService.getBPMdetail.biz.ext";//获取详细接口(新)
var CheckDownload_url="com.wpt.vivoHttp.webService.CheckDownload.biz.ext";//检查是否可下载
var DeleteBpmFile_url="com.wpt.vivoHttp.webService.deleteBpmFile.biz.ext";//删除附件

var PwdAndApprove_url="com.wpt.vivoHttp.webService.PwdAndApprove.biz.ext";//审批密码验证接口
var EditApprovaler_url="com.wpt.vivoHttp.webService.EditApprovaler.biz.ext";//修改审批人接口
var queryDept_url="com.wpt.vivoHttp.webService.queryDept.biz.ext";//查询部门列表接口

//所有流程详情的头部
var all_selectColumn ="Header_formSubTitle;txt_FDocCurrentStatus_value;Header_CreateUserName;txt_FDocDate;txt_FDocUnit_text;txt_FDocCurrentStatus;txt_FCurrentUser;sel_FSecurityLevel;txt_FVersion";
