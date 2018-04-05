
'use strict';
angular.module('MiningUseCase')
    .controller('LoadingController', ['$scope', '$http', '$location', '$compile', '$rootScope', function ($scope, $http, $location, $compile, $rootScope) {
        $('#toplabel').text('Loading & Transportation Data');
        var refreshLoading = function () {
            $('#divtableddata').hide();
            $('#divtablereport').hide();
            $('#divtabled').show();
            $http.get($scope.baseurl + '/ContractsList/' + $scope.uid).then(function (response) {
                $scope.ContractsList = response.data;
                $scope.LoadingData = {};
                $scope.contractid = '';
            }, function (response) { return "Something went wrong." });
        };
        refreshLoading();
        $scope.GetGrade = function(){
            if ($scope.LoadingData.oregrade > 10)
            {$scope.LoadingData.oregradetype = 'HIGH';}
            if ($scope.LoadingData.oregrade <= 10 && $scope.LoadingData.oregrade >= 5)
            {$scope.LoadingData.oregradetype = 'MEDIUM';}
            if ($scope.LoadingData.oregrade >= 2 && $scope.LoadingData.oregrade < 5)
            {$scope.LoadingData.oregradetype = 'LOW';}
        }
        $scope.CreateLoadingData = function (id) {
            $scope.contractid = id;
            $('#divtabled').hide();
            $('#divtableddata').show();
            $('#divtablereport').hide();
        }
        $scope.CancelLoadingReport = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();

        }
        $scope.CreateReportLoading = function (id) {
            ShowWait(true);
            $http.get($scope.baseurl + '/GetReport/Loading/' + id + '/' + $scope.uid).then(function (response) {
                
                var lable1 = 'Mineral Must be '  + response.data.Miniral;
                var lable2 = 'Tonnage Transported per day must be minimum ' + response.data.Tonnage   + ' Kg';                
                var label3 = 'Minimum Trips Must Be ' +  response.data.Trips;
                $scope.ReportDataLoading = { 
                    "r1" : {"label" : lable1,"output": response.data.MiniralReport},
                    "r2" : {"label" : lable2,"output" : response.data.TonnageReport},
                    "r3" : {"label" : label3,"output": response.data.TripsReport}
                   };
                ShowWait(false);
                $('#divtabled').hide();
                $('#divtableddata').hide();
                $('#divtablereport').show();
            }, function (response) { return "Something went wrong." });
        }

        $scope.CancelLoadingData = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();
        }

        $scope.SaveLoadingData = function (form) {
            if (form.$valid) {
                ShowWait(true);
                $scope.LoadingData["miniralLoading"] = "Zinc";
                $http.put($scope.baseurl + '/SaveLoading/' + $scope.contractid, $scope.LoadingData).then(function (response) {
                    if (response.data == "OK") {
                        ShowWait(false);
                        refreshLoading();
                        $('#divtabled').show();
                        $('#divtableddata').hide();
                        $('#divtablereport').hide();
                        $rootScope.message = "Loading Data Saved";
                        $('#myModal').modal({ show: true });
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);