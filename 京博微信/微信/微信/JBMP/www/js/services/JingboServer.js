/**
 * Created by Heycz on 2016/1/19.
 */
"use strict";
app.factory('JingboServer', ['$http', function ($http) {
    var service = {};
    service.getData = function (url, method, params, suc, err, final) {
        $http({
            url: url,
            method: method,
            data: $.param(params),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            timeout: 3000
        }).success(function (res) {
            if (res.status == 'S') {
                suc(res);
            } else {
                if (res.msg);
                    err(res.msg);
            }
        }).error(function (res) {
            err(res);
        }).finally(final)
    };
    return service;
}]);
