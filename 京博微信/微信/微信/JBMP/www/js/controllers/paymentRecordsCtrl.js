/**
 * Created by Heycz on 2016/5/18.
 */
"use strict";
app.controller('PaymentRecordsCtrl', ['$scope', 'Api', 'JingboServer', '$stateParams', '$timeout',
    function ($scope, Api, JingboServer, $stateParams, $timeout) {

        $scope.showLoading = true;
        $scope.pageIndex = 0;
        $scope.pageRow = 10;
        $scope.pageCount = 0;
        $scope.canLoadMore = false;

        $scope.getEcpPaymentRecord = function (refresh) {
            var msg = 'scroll.infiniteScrollComplete';
            if (refresh) {
                $scope.pageIndex = 0;
                msg = 'scroll.refreshComplete';
            } else {
                $scope.canLoadMore = false;
            }
            var params = {varCustomerId: '4747'};
            JingboServer.getData(
                Api.getEcpPaymentRecord,
                'POST',
                {
                    params: JSON.stringify(params),
                    pageIndex: 1,
                    pageRows: 10
                },
                function (res) {
                    if (refresh) {
                        $scope.records = res.data;
                    } else {
                        $scope.records = $scope.records.concat(res.data);
                    }
                    $scope.canLoadMore = res.data.length >= $scope.pageRow;
                },
                function (err) {

                },
                function () {
                    if ($scope.showLoading) {
                        $scope.showLoading = false;
                    } else {
                        $scope.$broadcast(msg);
                    }
                }
            );
        };

        $scope.getEcpPaymentRecord(true);

        //$scope.canLoadMore = function () {
        //    return !$scope.loadingMore && (pageIndex < pageCount);
        //};

    }]);