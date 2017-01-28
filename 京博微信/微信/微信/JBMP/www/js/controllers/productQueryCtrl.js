/**
 * Created by Heycz on 2016/5/17.
 */
"use strict";
app.controller('CategoryCtrl', ['$scope', 'JingboServer', 'Api', function ($scope, JingboServer, Api) {

    $scope.showLoading = false;
    $scope.pageIndex = 0;
    $scope.pageRow = 10;
    $scope.pageCount = 0;
    $scope.canLoadMore = false;

    $scope.getProductMiddleCategory = function () {
        $scope.showLoading = true;
        JingboServer.getData(
            Api.getProductMiddleCategory,
            'GET',
            '',
            function (res) {
                $scope.middleCategoryData = res.data;
            },
            function (err) {

            },
            function () {
                $scope.showLoading = false;
            }
        );
    };

    $scope.getProductMiddleCategory();

    var middleCategoryCode;

    $scope.getProductList = function (varMiddleCategoryCode, loadMore) {
        middleCategoryCode = varMiddleCategoryCode;
        var params = {
            "varKeyProductName": '',
            "varMiddleCategoryCode": varMiddleCategoryCode,
            "varSmallCategoryCode": '',
            "varCustomerId": '-999999'
        };
        if (!loadMore) {
            $scope.showLoading = true;
            $scope.pageIndex = 0;
            $scope.pageRow = 10;
            $scope.pageCount = 0;
            $scope.canLoadMore = false;
        }
        JingboServer.getData(
            Api.getProductInterface,
            'POST',
            {
                params: JSON.stringify(params),
                pageIndex: ++$scope.pageIndex,
                pageRows: $scope.pageRow
            },
            function (res) {
                if (loadMore) {
                    $scope.productList = $scope.productList.concat(res.data);
                } else {
                    $scope.productList = res.data;
                }
                $scope.canLoadMore = res.data.length >= $scope.pageRow;
            },
            function (err) {

            },
            function () {
                $scope.showLoading = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        );
    };

    $scope.loadMore = function () {
        $scope.getProductList(middleCategoryCode, true);
    }

}]);