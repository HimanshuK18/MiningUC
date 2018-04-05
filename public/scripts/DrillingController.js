
'use strict';
angular.module('MiningUseCase')
    .controller('DrillingController', ['$scope', '$http', '$location', '$compile', '$rootScope', function ($scope, $http, $location, $compile, $rootScope) {
        $('#toplabel').text('Drilling Data');
        var refreshDrilling = function () {
            $('#divtableddata').hide();
            $('#divtablereport').hide();
            $('#divtabled').show();
            $http.get($scope.baseurl + '/ContractsList/' + $scope.uid).then(function (response) {
                $scope.ContractsList = response.data;
                $scope.DrillingData = {};
                $scope.contractid = '';
            }, function (response) { return "Something went wrong." });
        };
        refreshDrilling();

        $scope.CreateDrillingData = function (id) {
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
        $scope.CreateReport = function (id) {
            ShowWait(true);
            $http.get($scope.baseurl + '/GetReport/Drilling/' + id + '/' + $scope.uid).then(function (response) {
            $('#divtabled').hide();
            $('#divtableddata').hide();
            $('#divtablereport').show();
            var lable1 = 'Mineral Must be '  + response.data.Miniral;
            var label2 = 'Atleast ' + response.data.SampleSize + ' grams must be drilled for sampling';
            var Grade;
            if (response.data.OreGrade > 12.5)
            {Grade = 'HIGH';}
            if (response.data.OreGrade <= 12.5 && response.data.OreGrade > 8)
            {Grade = 'MEDIUM';}
            if (response.data.OreGrade >= 2 && response.data.OreGrade <= 8)
            {Grade = 'LOW';}
             $scope.ReportData = { 
             "r1" : {"label" : lable1,"output": response.data.MiniralReport},
             "r2" : {"label" : label2,"output" : response.data.SamplingReport},
             "r3" : {"label":"Ore Grade Classification","output": Grade}
            };
             ShowWait(false);
            }, function (response) { return "Something went wrong." });
        }

        $scope.CancelDrillingData = function () {
            $('#divtabled').show();
            $('#divtableddata').hide();
            $('#divtablereport').hide();
        }
        $scope.GetGrade = function(){
            if ($scope.DrillingData.oregrade > 12.5)
            {$scope.DrillingData.oregradetype = 'HIGH';}
            if ($scope.DrillingData.oregrade <= 12.5 && $scope.DrillingData.oregrade > 8)
            {$scope.DrillingData.oregradetype = 'MEDIUM';}
            if ($scope.DrillingData.oregrade >= 2 && $scope.DrillingData.oregrade <= 8)
            {$scope.DrillingData.oregradetype = 'LOW';}
        }

        $scope.SaveDrillingData = function (form) {
            if (form.$valid) {
                ShowWait(true);
                $scope.DrillingData["miniraldrilling"] = "Zinc";
                $http.put($scope.baseurl + '/SaveDrilling/' + $scope.contractid, $scope.DrillingData).then(function (response) {
                    if (response.data == "OK") {
                        ShowWait(false);                        
                        refreshDrilling();
                        $('#divtabled').show();
                        $('#divtableddata').hide();
                        $('#divtablereport').hide();
                        $rootScope.message = "Drilling Sample Data saved."
                        $('#myModal').modal({ show: true });
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);