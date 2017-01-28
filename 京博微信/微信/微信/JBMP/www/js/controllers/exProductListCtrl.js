/**
 * Created by Heycz on 2016/5/18.
 */
"use strict";
app.controller('ExProductListCtrl', ['$scope', 'Api', 'JingboServer',
    function ($scope, Api, JingboServer) {

        $scope.showLoading = true;
        $scope.pageIndex = 0;
        $scope.pageRow = 10;
        $scope.pageCount = 0;
        $scope.canLoadMore = false;

        $scope.getExProducts = function (refresh) {
            var msg = 'scroll.infiniteScrollComplete';
            if (refresh) {
                $scope.pageIndex = 0;
                msg = 'scroll.refreshComplete';
            } else {
                $scope.canLoadMore = false;
            }
            var params = {varCatId: '', varItemId: '', varKeyName: ''};
            JingboServer.getData(
                Api.searchSysItem,
                'POST',
                {
                    params: JSON.stringify(params),
                    pageIndex: ++$scope.pageIndex,
                    pageRows: $scope.pageRow
                },
                function (res) {
                    if (refresh) {
                        $scope.exProducts = res.data;
                    } else {
                        $scope.exProducts = $scope.exProducts.concat(res.data);
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
                    $scope.showLoading = false;
                }
            );
        };

        $scope.getExProducts(true);
    }]);