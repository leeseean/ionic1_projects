/**
 * Created by Heycz on 2016/5/17.
 */
"use strict";
app.controller('NewsCtrl', ['$scope', 'Api', 'JingboServer', '$timeout',
    function ($scope, Api, JingboServer, $timeout) {

        $scope.showLoading = true;
        $scope.pageIndex = 0;
        $scope.pageRow = 10;
        $scope.pageCount = 0;
        $scope.canLoadMore = false;

        $scope.getEcpExLzNews = function (refresh) {
            var msg = 'scroll.infiniteScrollComplete';
            if (refresh) {
                $scope.pageIndex = 0;
                msg = 'scroll.refreshComplete';
            } else {
                $scope.canLoadMore = false;
            }
            var params = {varNewId: '', varLzTitle: '', varLzKeyword: ''};
            JingboServer.getData(
                Api.getEcpExLzNews,
                'POST',
                {
                    params: JSON.stringify(params),
                    pageIndex: ++$scope.pageIndex,
                    pageRows: $scope.pageRow
                },
                function (res) {
                    if (refresh) {
                        $scope.marketNews = res.data;
                    } else {
                        //$scope.marketNews = $scope.marketNews.concat(res.data);
                        angular.forEach(res.data, function (value) {
                            $scope.marketNews.push(value);
                        });
                    }
                    $timeout(function () {
                        $scope.canLoadMore = res.data.length >= $scope.pageRow;
                    }, 1000);

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

        $scope.getEcpExLzNews(true);

    }]);