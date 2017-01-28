/**
 * Created by Administrator on 2016/1/6 0006.
 */
app.factory('dataService',['dataUtil','$http','util',function(dataUtil,$http,util){

    var self =this;
    return {
        getTodoList:function(callback){
            //var option ={};
            //option.url='../localJson/list.json';
            //    option.callback =function(data){
            //        if(data.errCode=='S'){
            var data ={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"pId":"111",
                        "pType":"expense",
                        "pTypeName":"费用报销",
                        "title":"JT3033集团费用报销流程",
                        "createBy":"钟落海",
                        "creatByOrgName":"移动产品事业部",
                        "createTime":"2010-11-12 15:30"
                    },
                    {"pId":"110",
                        "pType":"planChange",
                        "pTypeName":"设计变更",
                        "title":"JT3033集团实际变更流程",
                        "createBy":"钟落涌",
                        "creatByOrgName":"火星研发部",
                        "createTime":"2010-11-12 15:35"
                    },
                    {"pId":"111",
                        "pType":"expense",
                        "pTypeName":"费用报销",
                        "title":"JT3033集团费用报销流程",
                        "createBy":"钟落海",
                        "creatByOrgName":"移动产品事业部",
                        "createTime":"2010-11-12 15:30"
                    },
                    {"pId":"110",
                        "pType":"planChange",
                        "pTypeName":"设计变更",
                        "title":"JT3033集团实际变更流程",
                        "createBy":"钟落涌",
                        "creatByOrgName":"火星研发部",
                        "createTime":"2010-11-12 15:35"
                    },
                    {"pId":"111",
                        "pType":"expense",
                        "pTypeName":"费用报销",
                        "title":"JT3033集团费用报销流程",
                        "createBy":"钟落海",
                        "creatByOrgName":"移动产品事业部",
                        "createTime":"2010-11-12 15:30"
                    },
                    {"pId":"110",
                        "pType":"planChange",
                        "pTypeName":"设计变更",
                        "title":"JT3033集团实际变更流程",
                        "createBy":"钟落涌",
                        "creatByOrgName":"火星研发部",
                        "createTime":"2010-11-12 15:35"
                    },
                    {"pId":"111",
                        "pType":"expense",
                        "pTypeName":"费用报销",
                        "title":"JT3033集团费用报销流程",
                        "createBy":"钟落海",
                        "creatByOrgName":"移动产品事业部",
                        "createTime":"2010-11-12 15:30"
                    },
                    {"pId":"110",
                        "pType":"planChange",
                        "pTypeName":"设计变更",
                        "title":"JT3033集团实际变更流程",
                        "createBy":"钟落涌",
                        "creatByOrgName":"火星研发部",
                        "createTime":"2010-11-12 15:35"
                    }
                ]
            };
            callback(data.dataList);
                    //}else{
                    //    util.showLoading(data.errMsg);
                    //}

            //dataUtil.getLocalJson(option);
        },
        getDetailInfo:function(pId,callback){
            var option ={};
            if(pId=='110'){
                var data ={
                    "errCode":"S",
                    "errMsg":"",
                    "data":{
                        "pId":"110",
                        "projectName":"12集团股份有限公司改造",
                        "dept":"移动产品事业部",
                        "createBy":"证件包",
                        "manager":"证件宝",
                        "onChargeDept":"负责人1",
                        "buildName":"星河大厦",
                        "buildArea":"东城",
                        "createDate":"2012-11-18",
                        "changeCode":"11020034"
                    }
                };
                callback(data.data);
                //option.url='../localJson/detail.json';
            }else{
                var data ={
                    "errCode":"S",
                    "errMsg":"",
                    "data":{
                        "pId":"110",
                        "companyName":"12集团股份有限公司",
                        "deptName":"移动产品事业部",
                        "createBy":"证件包",
                        "manager":"证件宝",
                        "onChargeDept":"负责人1",
                        "tel":"12332111445",
                        "category":"类别2333",
                        "createTime":"2012-11-18 11:12:23",
                        "account":"11020034",
                        "bank":"农民银行"
                    }
                };
                callback(data.data);
                //option.url='../localJson/detail2.json';
            }
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            //        callback(data.data);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
        getExamineList:function(pId,callback){
            //var option ={};
            //option.url='../localJson/examineList.json';
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            //        callback(data.data);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
            var data ={
                "errCode":"S",
                "errMsg":"",
                "data":{
                    "pId":"110",
                    "title":"JT3033集团实际变更流程",
                    "examineList":[
                        {"name":"证件宝","position":"部门经理","examineTime":"2013-11-12 13:20:00","comments":"时代发生的离开过就死定了开工建设的离开过喝了多少看过了空间"},
                        {"name":"证件宝1","position":"独裁","examineTime":"2013-11-12 13:20:00","comments":"时代发生的离开过就死定了开工建设的离开过喝了多少看过了空间"},
                        {"name":"证件宝2","position":"总裁","examineTime":"2013-11-12 13:20:00","comments":"时代发生的离开过就死定了开工建设的离开过喝了多少看过了空间"},
                        {"name":"证件宝3","position":"会计","examineTime":null,"comments":null}
                    ]
                }
            };
            callback(data.data);
        },
        getCompanyList:function(callback){
            //var option ={};
            //option.url ="../localJson/companyList.json";
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            var data ={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"name":"公司甲","id":"1"},
                    {"name":"公司乙","id":"2"},
                    {"name":"公司丙","id":"3"},
                    {"name":"公司丁","id":"4"}]
            };
                    callback(data.dataList);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
        getDeptList:function(callback,id){
            //var option ={};
            //option.url ="../localJson/deptList.json";
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            var data ={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"name":"部门甲","id":"1"},
                    {"name":"部门乙","id":"2"},
                    {"name":"部门丙","id":"3"},
                    {"name":"部门丁","id":"4"}]
            }
                    callback(data.dataList);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
        getOnChargeList:function(callback,id){
            //var option ={};
            //option.url ="../localJson/onChargeList.json";
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            var data ={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"name":"包1","id":"1"},
                    {"name":"包2","id":"2"},
                    {"name":"包3","id":"3"},
                    {"name":"包4","id":"4"}]
            };
                    callback(data.dataList);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
        getManagerList:function(callback,id){
            //var option ={};
            //option.url ="../localJson/managerList.json";
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            var data ={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"name":"包1","id":"1"},
                    {"name":"包2","id":"2"},
                    {"name":"包3","id":"3"},
                    {"name":"包4","id":"4"}]
            };
                    callback(data.dataList);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
        getBankList:function(callback){
            //var option ={};
            //option.url ="../localJson/bankList.json";
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            var data ={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"name":"光大银行","id":"1"},
                    {"name":"农业银行","id":"2"},
                    {"name":"工商银行","id":"3"},
                    {"name":"招商银行","id":"4"}]
            };
                    callback(data.dataList);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
        getCategoryList:function(callback){
            //var option ={};
            //option.url ="../localJson/categoryList.json";
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            var data ={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"name":"类别1","id":"1"},
                    {"name":"类别2","id":"2"},
                    {"name":"类别3","id":"3"},
                    {"name":"类别4","id":"4"}]
            }
                    callback(data.dataList);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
        getCreateByList:function(callback){
            //var option ={};
            //option.url ="../localJson/createByList.json";
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            var data ={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"name":"郑健宝","id":"1"},
                    {"name":"证件宝","id":"2"},
                    {"name":"证件包","id":"3"},
                    {"name":"整件包","id":"4"}]
            };
                    callback(data.dataList);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
        getProjectList:function(callback){
            //var option ={};
            //option.url ="../localJson/projectList.json";
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            var data={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"name":"杀虫项目1","id":"1"},
                    {"name":"盖楼项目2","id":"2"},
                    {"name":"打地鼠项目2333","id":"3"},
                    {"name":"存钱计划244","id":"4"}]
            };
                    callback(data.dataList);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
        getChangeCodeList:function(callback){
            //var option ={};
            //option.url ="../localJson/changeCodeList.json";
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            var data ={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"name":"CH-Z001","id":"1"},
                    {"name":"CH-Z002","id":"2"},
                    {"name":"CH-Z003","id":"3"},
                    {"name":"CH-Z004","id":"4"}]
            };
                    callback(data.dataList);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
        getkindList:function(callback){
            //var option ={};
            //option.url ="../localJson/kindList.json";
            //option.callback =function(data){
            //    if(data.errCode=='S'){
            var data ={
                "errCode":"S",
                "errMsg":"",
                "dataList":[
                    {"name":"餐饮费用","id":"1"},
                    {"name":"差旅费","id":"2"},
                    {"name":"住房费","id":"3"},
                    {"name":"电话费","id":"4"}]
            }
                    callback(data.dataList);
            //    }else{
            //        util.showLoading(data.errMsg);
            //    }
            //}
            //dataUtil.getLocalJson(option);
        },
    }
}]);