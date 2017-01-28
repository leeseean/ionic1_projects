/**
 * Created by Heycz on 2016/5/17.
 */
app.controller('ActivityListCtrl', ['$scope', 'Api', 'JingboServer', '$stateParams',
    function ($scope, Api, JingboServer, $stateParams) {

        $scope.openId = $stateParams.open_id;

        $scope.showLoading = true;
        $scope.pageIndex = 0;
        $scope.pageRow = 10;
        $scope.pageCount = 0;
        $scope.canLoadMore = false;

        $scope.getActivity = function (refresh) {
            var msg = 'scroll.infiniteScrollComplete';
            if (refresh) {
                $scope.pageIndex = 0;
                msg = 'scroll.refreshComplete';
            } else {
                $scope.canLoadMore = false;
            }
            var params = {varContentType: 'QT'};
            JingboServer.getData(
                Api.getActivity,
                'POST',
                {
                    params: JSON.stringify(params),
                    pageIndex: ++$scope.pageIndex,
                    pageRows: $scope.pageRow
                },
                function (res) {
                    if (refresh) {
                        $scope.activities = res.data;
                    } else {
                        $scope.activities = $scope.activities.concat(res.data);
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
        $scope.getActivity(true);

    }]);