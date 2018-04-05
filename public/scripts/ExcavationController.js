
'use strict';
angular.module('MiningUseCase')
    .controller('ExcavationController', ['$scope', '$http', '$location', '$compile', '$rootScope', function ($scope, $http, $location, $compile, $rootScope) {
        $('#toplabel').text('Excavation Data');
        var refreshExcavation = function () {
            $('#divtableddata').hide();
            $('#divtablereport').hide();
            $('#divtabled').show();
            $http.get($scope.baseurl + '/ContractsList/' + $scope.uid).then(function (response) {
                $scope.ContractsList = response.data;
                $scope.ExcavationData = {};
                $scope.contractid = '';
            }, function (response) { return "Something went wrong." });
        };
        refreshExcavation();
        $scope.GetGrade = function(){
            if ($scope.ExcavationData.oregrade > 12.5)
            {$scope.ExcavationData.oregradetype = 'HIGH';}
            if ($scope.ExcavationData.oregrade <= 12.5 && $scope.ExcavationData.oregrade > 8)
            {$scope.ExcavationData.oregradetype = 'MEDIUM';}
            if ($scope.ExcavationData.oregrade >= 2 && $scope.ExcavationData.oregrade <= 8)
            {$scope.ExcavationData.oregradetype = 'LOW';}
        }
        $scope.CreateExcavationData = function (id) {
            $scope.contractid = id;
            $('#divtabled').hide();
            $('#divtableddata').show();
            $('#divtablereport').hide();
        }
        $scope.CancelExcavationReport = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();

        }
        $scope.CreateReportExcavation = function (id) {
            ShowWait(true);
            $http.get($scope.baseurl + '/GetReport/Excavation/' + id + '/' + $scope.uid).then(function (response) {
                var lable1 = 'Mineral Must be ' + response.data.Miniral;
                var label2 = 'Ore Grade % should be in Range ± 1% of ' + response.data.OreGrade;
                var label3 = 'Dilution should be in Range ± 1% of ' + response.data.Dilution;
                var label4 = 'Excavation Tonnage per day should be Minimum: ' + response.data.Tonnage +' Tons';
                var label5 = 'Face is with Only Ore';
                $scope.ReportDataExcavation = {
                    "r1": { "label": lable1, "output": response.data.MiniralReport },
                    "r2": { "label": label2, "output": response.data.OreGradeReport },
                    "r3": { "label": label3, "output": response.data.DilutionReport },
                    "r4": { "label": label4, "output": response.data.TonnageReport },
                    "r5": { "label": label5, "output": response.data.WasteReport }
                };
                ShowWait(false);
                $('#divtabled').hide();
                $('#divtableddata').hide();
                $('#divtablereport').show();
            }, function (response) { return "Something went wrong." });

        }

        $scope.CancelExcavationData = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();
        }

        $scope.SaveExcavationData = function (form) {
            if (form.$valid) {
                ShowWait(true);
                $scope.ExcavationData["miniralExcavation"] = "Zinc";
                $http.put($scope.baseurl + '/SaveExcavation/' + $scope.contractid, $scope.ExcavationData).then(function (response) {
                    if (response.data == "OK") {
                        ShowWait(false);
                        refreshExcavation();
                        $('#divtabled').show();
                        $('#divtableddata').hide();
                        $('#divtablereport').hide();
                        $rootScope.message = "Excavation Data Saved";
                        $('#myModal').modal({ show: true });
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);