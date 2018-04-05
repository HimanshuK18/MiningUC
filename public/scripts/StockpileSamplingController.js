
'use strict';
angular.module('MiningUseCase')
    .controller('StockpileSamplingController', ['$scope', '$http', '$location', '$compile', '$rootScope', function ($scope, $http, $location, $compile, $rootScope) {
        $('#toplabel').text('Stockpile Sampling & its Volumteric Survey Data');
        var refreshStockpileSampling = function () {
            
            $('#divtableddata').hide();
            $('#divtablereport').hide();
            $('#divtabled').show();
            $http.get($scope.baseurl + '/ContractsList/' + $scope.uid).then(function (response) {
                $scope.ContractsList = response.data;
                $scope.StockpileSamplingData = {};
                $scope.contractid = '';
            }, function (response) { return "Something went wrong." });
        };
        refreshStockpileSampling();
        $scope.GetGrade = function(){
            if ($scope.StockpileSamplingData.oregrade > 12.5)
            {$scope.StockpileSamplingData.oregradetype = 'HIGH';}
            if ($scope.StockpileSamplingData.oregrade <= 12.5 && $scope.StockpileSamplingData.oregrade > 8)
            {$scope.StockpileSamplingData.oregradetype = 'MEDIUM';}
            if ($scope.StockpileSamplingData.oregrade >= 2 && $scope.StockpileSamplingData.oregrade <= 8)
            {$scope.StockpileSamplingData.oregradetype = 'LOW';}
        }
        $scope.CreateStockpileSamplingData = function (id) {
            $scope.contractid = id;
            $('#divtabled').hide();
            $('#divtableddata').show();
            $('#divtablereport').hide();
        }
        $scope.CancelstockpilesamplingReport = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();
        }
        $scope.CreateReportStockpileSampling = function (id) {
            ShowWait(true);
            $http.get($scope.baseurl + '/GetReport/StockpileSampling/' + id + '/' + $scope.uid).then(function (response) {
                var lable1 = 'Mineral Must be ' + response.data.Miniral;
                var label2 = 'Ore Grade be in Range ± 1% of ' + response.data.OreGrade;
                var label3 = 'Dilution should be in Range ± 1% of ' + response.data.Dilution;
                var label4 = 'Moisture Content should be in Range ± 1% of ' + response.data.Moisture;
                var label5 = 'Is Stockpile Tonnage equals to Excavation Tonnage?';
                var label6 = 'Grade Reconciliation?';
                $scope.ReportDataStockpileSampling = {
                    "r1": { "label": lable1, "output": response.data.MiniralReport },
                    "r2": { "label": label2, "output": response.data.OreGradeReport },
                    "r3": { "label": label3, "output": response.data.DilutionReport },
                    "r4": { "label": label4, "output": response.data.MoistureReport },
                    "r5": { "label": label5, "output": response.data.TonnageReport },
                    "r6": { "label": label6, "output": response.data.GradeReconciliationReport }
                };
                ShowWait(false);
                $('#divtabled').hide();
                $('#divtableddata').hide();
                $('#divtablereport').show();
            }, function (response) { return "Something went wrong." });

        }

        $scope.CancelStockpileSamplingData = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();
        }

        $scope.SaveStockpileSamplingData = function (form) {
            if (form.$valid) {
                ShowWait(true);
                $scope.StockpileSamplingData["miniralStockpileSampling"] = "Zinc";
                $http.put($scope.baseurl + '/SaveStockpileSampling/' + $scope.contractid, $scope.StockpileSamplingData).then(function (response) {
                    if (response.data == "OK") {
                        ShowWait(false);
                        refreshStockpileSampling();
                        $('#divtabled').show();
                        $('#divtableddata').hide();
                        $('#divtablereport').hide();
                        $rootScope.message = "StockpileSampling Data Saved";
                        $('#myModal').modal({ show: true });
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);