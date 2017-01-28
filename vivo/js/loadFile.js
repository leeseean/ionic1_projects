/**
 * Created by GZW on 2015/9/16.
 */
document.write('<link href="'+sshFileUrl+'css/all.css?r='+t+'" rel="stylesheet">');
document.write('<script type="text/javascript"  src="'+sshFileUrl+'js/all.min.js?r='+t+'"></scr'+'ipt>');
var hrefdocumentId = GetQueryString("documentId");
var documentType = GetQueryString("documentType");
if(documentType){
    documentType = documentType.replace("\\","");
    documentType = documentType.replace("\\","");
}
var jsName = "";
switch (documentType){
    case "VivoBPMFlowPLM_DocReleaseChange":jsName="plm_detail";break;
    case "ComDocManageProcess_ComDocManage":jsName="Process_ComDocManage";break;
    case "ComDocProductProcess_ComDocProduct":jsName="Process_ComDocManage";break;
    case "CompanyInstitutionCompanyInstitution":jsName="CompanyInstitution";break;
    case "MeetingResolutionMeetingResolution":jsName="MeetingResolution";break;
    case "K2Workflow_GZLLD0process_GZLLD0":jsName="process_GZLLD0";break;
    case "TXBMZDTXBMZD":jsName="TXBMZD";break;
    case "AystemicAuditAystemicAuditFile":jsName="AystemicAudit";break;
    case "RewardPunishmentFlowPunishmentNoticeFlow":jsName="PunishmentNoticeFlow";break;
    case "RewardPunishmentFlowRewardNoticeFlow":jsName="RewardNoticeFlow";break;
    case "LYTDRMLYTDRM":jsName="LYTDRM";break;
    case "SMZZFGSMZZFG":jsName="SMZZFG";break;
    case "ProdouctPlanningProdouctPlanning":jsName="ProdouctPlanning";break;
    case "ZDSXIPZDSXIP":jsName="ZDSXIP";break;
    case "HYJYIPHYJYIP":jsName="HYJYIP";break;
    case "CompanyOrganizationFlowCompanyOrganizationFlow":jsName="CompanyOrganizationFlow";break;
    case "SMZZFGXZFG00":jsName="XZFG00";break;
    case "DZJSGHDZJSGH":jsName="DZJSGH";break;
    case "XMXMTZXMXMTZ":jsName="XMXMTZ";break;
    case "LWKZSPLWKZSP":jsName="LWKZSP";break;
    case "JGMJXXJGMJXX":jsName="JGMJXX";break;
    case "TSQKZCTSQKZC":jsName="TSQKZC";break;
    case "XMBGKZJHBG":jsName="JHBG";break;
    case "XMBGKZBGTZ":jsName="BGTZ";break;
    case "GSZCQLWLQLWM":jsName="WLQLWM";break;
    case "GSZCQLLDZC00":jsName="LDZC00";break;
    case "GSZCQLGDZC00":jsName="GDZC00";break;
    case "GSZCQLDZYHP0":jsName="DZYHP0";break;
    case "XMRWXDXMRWXD":jsName="XMRWXD";break;
    case "GWGZSCGWGZSC":jsName="GWGZSC";break;
    case "ZYZDGLZYZDGL":jsName="ZYZDGL";break;
    case "ZYZDCZZYZDCZ":jsName="ZYZDCZ";break;
    case "CXWJMKCXWJMK":jsName="CXWJMK";break;
    case "TXZYGFTXZYGF":jsName="TXZYGF";break;
    case "EWGSSQEWGSSQ":jsName="EWGSSQ";break;
    case "YWBGYWBG":jsName="YWBG";break;
    case "YYSYJJJDYYSYJJJD":jsName="YYSYJJJD";break;
    case "YYSYJJJDYYSYJBGH":jsName="YYSYJBGH";break;
    case "YYSYJJJDYYSYJGH":jsName="YYSYJGH";break;
    case "WGYBZMWGYBZM":jsName="WGYBZM";break;
    default :break;
}
if(jsName != "")document.write('<script type="text/javascript"  src="'+sshFileUrl+'js/'+jsName+'.js?r='+t+'"></scr'+'ipt>');
