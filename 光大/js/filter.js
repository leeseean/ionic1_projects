/**
 * Created by Administrator on 2016/1/5 0005.
 */
app.filter('myfilter',function(x){
    return function(inputArray){
        var name = [];
        for(var i=0;i<inputArray.length;i++){
            if(array[i].DICTID==x){
                name =x;
                break;
            }
        }
        return name;
    }
});