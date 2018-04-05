
'use strict';
angular.module('MiningUseCase')
    .controller('BlastingController', ['$scope', '$http', '$location', '$compile', '$rootScope', function ($scope, $http, $location, $compile, $rootScope) {
        $('#toplabel').text('Blasting Data');
        var refreshDrilling = function () {
            $('#divtableddata').hide();
            $('#divtablereport').hide();
            $('#divtabled').show();
            $http.get($scope.baseurl + '/ContractsList/' + $scope.uid).then(function (response) {
                $scope.ContractsList = response.data;
                $scope.BlastingData = {};
                $scope.contractid = '';
            }, function (response) { return "Something went wrong." });
        };
        refreshDrilling();
        $scope.CreateBlastingData = function (id) {
            $scope.contractid = id;
            $('#divtabled').hide();
            $('#divtableddata').show();
            $('#divtablereport').hide();
        }
        $scope.CancelDrillingReport = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();
        }
        $scope.CreateReportBlasting = function (id) {
            ShowWait(true);
            $http.get($scope.baseurl + '/GetReport/Blasting/' + id + '/' + $scope.uid).then(function (response) {
                var lable1 = 'Mineral Must be ' + response.data.Miniral;
                var label2 = 'Tonnage should be minimum ' + response.data.Tonnage + ' kg per blast';
                var label3 = 'Dilution should be in Range ± 1% of ' + response.data.Dilution;
                $scope.ReportDataBlasting = {
                    "r1": { "label": lable1, "output": response.data.MiniralReport },
                    "r2": { "label": label2, "output": response.data.TonnageReport },
                    "r3": { "label": label3, "output": response.data.DilutionReport }
                };
                ShowWait(false);
                $('#divtabled').hide();
                $('#divtableddata').hide();
                $('#divtablereport').show();
            }, function (response) { return "Something went wrong." });
        }
        $scope.CancelBlastingData = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();
        }
        $scope.SaveBlastingData = function (form) {
            if (form.$valid) {
                ShowWait(true);
                $scope.BlastingData["miniralblasting"] = "Zinc";
                $http.put($scope.baseurl + '/SaveBlasting/' + $scope.contractid, $scope.BlastingData).then(function (response) {
                    if (response.data == "OK") {
                        ShowWait(false);
                        refreshDrilling();
                        $('#divtabled').show();
                        $('#divtableddata').hide();
                        $('#divtablereport').hide();
                        $rootScope.message = "Blasting Data Saved";
                        $('#myModal').modal({ show: true });
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);