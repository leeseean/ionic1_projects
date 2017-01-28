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
document.write('<script type="text/javascript"  src="'+sshFileUrl+'js/detail.js?r='+t+'"></scr'+'ipt>');
