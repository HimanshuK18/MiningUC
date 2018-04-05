
'use strict';
angular.module('MiningUseCase')
    .controller('TransportationToCrusherController', ['$scope', '$http', '$location', '$compile', '$rootScope', function ($scope, $http, $location, $compile, $rootScope) {
        $('#toplabel').text('Transportation To Crusher Data');
        var refreshTransportationToCrusher = function () {
            $('#divtableddata').hide();
            $('#divtablereport').hide();
            $('#divtabled').show();
            $http.get($scope.baseurl + '/ContractsList/' + $scope.uid).then(function (response) {
                $scope.ContractsList = response.data;
                $scope.TransportationToCrusherData = {};
                $scope.contractid = '';
            }, function (response) { return "Something went wrong." });
        };
        refreshTransportationToCrusher();
        $scope.GetGrade = function(){
            if ($scope.TransportationToCrusherData.oregrade > 10)
            {$scope.TransportationToCrusherData.oregradetype = 'HIGH';}
            if ($scope.TransportationToCrusherData.oregrade <= 10 && $scope.TransportationToCrusherData.oregrade >= 5)
            {$scope.TransportationToCrusherData.oregradetype = 'MEDIUM';}
            if ($scope.TransportationToCrusherData.oregrade >= 2 && $scope.TransportationToCrusherData.oregrade < 5)
            {$scope.TransportationToCrusherData.oregradetype = 'LOW';}
        }
        $scope.CreateTransportationToCrusherData = function (id) {
            $scope.contractid = id;
            $('#divtabled').hide();
            $('#divtableddata').show();
            $('#divtablereport').hide();
        }
        $scope.CancelTransportationToCrusherReport = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();

        }
        $scope.CreateReportTransportationToCrusher = function (id) {
            ShowWait(true);
            $http.get($scope.baseurl + '/GetReport/TransportationToCrusher/' + id + '/' + $scope.uid).then(function (response) {
                var lable1 = 'Mineral Must be ' + response.data.Miniral;
                var label2 = 'Tonnage Transported per day must be minimum  ' + response.data.Tonnage ;
                var label3 = 'Minimum Trips Must Be ' + response.data.Trips;
                $scope.ReportDataTransportationToCrusher = {
                    "r1": { "label": lable1, "output": response.data.MiniralReport },
                    "r2": { "label": label2, "output": response.data.TonnageReport },
                    "r3": { "label": label3, "output": response.data.TripsReport }
                };
                ShowWait(false);
                $('#divtabled').hide();
                $('#divtableddata').hide();
                $('#divtablereport').show();
            }, function (response) { return "Something went wrong." });

        }

        $scope.CancelTransportationToCrusherData = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();
        }

        $scope.SaveTransportationToCrusherData = function (form) {
            if (form.$valid) {
                ShowWait(true);
                $scope.TransportationToCrusherData["miniralTransportationToCrusher"] = "Zinc";
                $http.put($scope.baseurl + '/SaveTransportationToCrusher/' + $scope.contractid, $scope.TransportationToCrusherData).then(function (response) {
                    if (response.data == "OK") {
                        ShowWait(false);
                        refreshTransportationToCrusher();
                        $('#divtabled').show();
                        $('#divtableddata').hide();
                        $('#divtablereport').hide();
                        $rootScope.message = "TransportationToCrusher Data Saved";
                        $('#myModal').modal({ show: true });
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);