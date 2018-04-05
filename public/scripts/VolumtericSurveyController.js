
'use strict';
angular.module('MiningUseCase')
    .controller('VolumtericSurveyController', ['$scope', '$http', '$location', '$compile', '$rootScope', function ($scope, $http, $location, $compile, $rootScope) {
        $('#toplabel').text('Waste Dump & its Volumteric Survey Data');
        var refreshVolumetricsurvey = function () {
            $('#divtableddata').hide();
            $('#divtablereport').hide();
            $('#divtabled').show();
            $http.get($scope.baseurl + '/WasteDumpContractsList/' + $scope.uid).then(function (response) {
                $scope.ContractsList = response.data;
                $scope.VolumetricsurveyData = {};
                $scope.contractid = '';
            }, function (response) { return "Something went wrong." });
        };
        refreshVolumetricsurvey();
        $scope.GetGrade = function(){
            if ($scope.VolumetricsurveyData.oregrade > 10)
            {$scope.VolumetricsurveyData.oregradetype = 'HIGH';}
            if ($scope.VolumetricsurveyData.oregrade <= 10 && $scope.VolumetricsurveyData.oregrade >= 5)
            {$scope.VolumetricsurveyData.oregradetype = 'MEDIUM';}
            if ($scope.VolumetricsurveyData.oregrade >= 2 && $scope.VolumetricsurveyData.oregrade < 5)
            {$scope.VolumetricsurveyData.oregradetype = 'LOW';}
        }
        $scope.CreateVolumetricsurveyData = function (id) {
            $scope.contractid = id;
            $('#divtabled').hide();
            $('#divtableddata').show();
            $('#divtablereport').hide();
        }
        $scope.CancelvolumetricsurveyReport = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();

        }
        $scope.CreateReportVolumetricsurvey = function (id) {
            ShowWait(true);
            $http.get($scope.baseurl + '/GetReport/Volumetricsurvey/' + id + '/' + $scope.uid).then(function (response) {
                var lable1 = 'Mineral Must be ' + response.data.Miniral;
                var label2 = 'Tonnage should be minimum ' + response.data.Tonnage + ' kg Or per blast';
                var label3 = 'Dilution should be in Range ± 1% of ' + response.data.Dilution;
                $scope.ReportDataVolumetricsurvey = {
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

        $scope.CancelVolumetricsurveyData = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();
        }

        $scope.SaveVolumetricsurveyData = function (form) {
            if (form.$valid) {
                ShowWait(true);
                $scope.VolumetricsurveyData["miniralVolumetricsurvey"] = "Zinc";
                $http.put($scope.baseurl + '/SaveVolumetricsurvey/' + $scope.contractid, $scope.VolumetricsurveyData).then(function (response) {
                    if (response.data == "OK") {
                        ShowWait(false);
                        refreshVolumetricsurvey();
                        $('#divtabled').show();
                        $('#divtableddata').hide();
                        $('#divtablereport').hide();
                        $rootScope.message = "Volumetricsurvey Data Saved";
                        $('#myModal').modal({ show: true });
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);