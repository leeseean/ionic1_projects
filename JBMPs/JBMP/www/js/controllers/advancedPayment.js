/**
 * Created by Heycz on 2016/5/18.
 */
"use strict";
app.controller('AdvancedPaymentCtrl', ['$scope', 'Api', 'JingboServer', '$stateParams',
    function ($scope, Api, JingboServer, $stateParams) {

        $scope.openId = $stateParams.open_id;
        $scope.showLoading = true;
        var async = false;

        $scope.getEcpExPaymentSumInfo = function () {
            var params = {varCustomerId: '4747', varQueryHeaderId: ''};
            JingboServer.getData(
                Api.getEcpExPaymentSumInfo,
                'POST',
                {
                    params: JSON.stringify(params)
                },
                function (res) {
                    $scope.sumInfo = res.data[0];
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

        $scope.getEcpExPaymentSumInfo();

        $scope.getEcpPaymentRecord = function () {
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
                    handleChartData(res.data);
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

        $scope.getEcpPaymentRecord();

        function handleChartData(data) {
            var chartData = [], xName = [];
            for (var i = 0, n = data.length; i < n; i++) {
                chartData.push(Number(data[i].Amount / 10000).toFixed(2));
                xName.push(data[i].ReceiptDate);
            }
            drawChart(xName, chartData.reverse());
        }


        /**
         * 绘制图表
         */
        function drawChart(xName, data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart_container'));

            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: '{c}万元'
                },
                grid: {left: '13%', right: '3%', bottom: '15%', top: '8%'},
                xAxis: {
                    data: xName,
                    axisLabel: {
                        rotate: 30,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '金额(万元)'
                },
                series: {
                    name: '金额',
                    type: 'bar',
                    data: data,
                    itemStyle: {
                        normal: {
                            color: '#8CEAFF'
                        }
                    }
                }
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

    }]);