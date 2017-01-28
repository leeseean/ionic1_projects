/**
 * Created by Heycz on 2016/5/18.
 */
"use strict";
app.controller('ActivityDetailCtrl', ['$scope', 'Api', 'JingboServer', '$stateParams',
    function ($scope, Api, JingboServer, $stateParams) {

        $scope.showLoading = true;
        var async = false;

        $scope.getActivityDetail = function () {
            var params = {'varContentType': 'XX', 'varActivityId': $stateParams.activity_id};
            JingboServer.getData(
                Api.getActivityDetail,
                'POST',
                {
                    params: JSON.stringify(params),
                    pageIndex: 1,
                    pageRows: 10
                },
                function (res) {
                    $scope.activityDetailData = res.data[0];
                },
                function (err) {

                },
                function () {
                    if (async) {
                        $scope.showLoading = false;
                    } else {
                        async = true;
                    }
                }
            );
        };

        $scope.getActivityDetail();

        $scope.getSatisfyStatus = function () {
            var params = {
                'varUserId': '1157',
                'varCustomerId': '4747',
                'varActivityId': $stateParams.activity_id,
                'varDeliverySourceType': 'PC'
            };
            JingboServer.getData(
                Api.getSatisfyStatus,
                'POST',
                {
                    params: JSON.stringify(params),
                    pageIndex: 1,
                    pageRows: 99
                },
                function (res) {
                    $scope.products = res.data;
                    $scope.activityCount = res.data[0].Attribute1;
                },
                function (err) {

                },
                function () {
                    if (async) {
                        $scope.showLoading = false;
                    } else {
                        async = true;
                    }
                }
            );
        };
        $scope.getSatisfyStatus();

    }]);